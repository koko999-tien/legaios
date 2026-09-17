# LegalOS V14 — Open-source upgrade notes

Ngày rà soát: 2026-09-17

Tài liệu này ghi lại các dự án mã nguồn mở được nghiên cứu để nâng cấp LegalOS. Mục tiêu là học pattern/kiến trúc phù hợp, không kéo framework lớn vào ứng dụng nếu chưa cần và không sao chép code có giấy phép không tương thích.

## 1. GOV.UK Frontend — MIT

Nguồn: https://github.com/alphagov/govuk-frontend

Điểm học:
- Progressive enhancement: HTML dùng được trước, JavaScript chỉ nâng cấp trải nghiệm.
- Thiết kế form/nút rõ ràng, ưu tiên màn hình hẹp và assistive technology.
- WCAG 2.2 AA là mục tiêu thực tế; mobile wrapping và focus state phải được test.

Áp dụng vào LegalOS:
- Bổ sung skip link, focus-visible, trạng thái ARIA cho menu.
- Touch target tối thiểu trên mobile.
- Không để thanh cố định che nội dung.

## 2. U.S. Web Design System — CC0 + thành phần được ghi chú riêng

Nguồn: https://github.com/uswds/uswds

Điểm học:
- Ưu tiên giao diện chính phủ: nhanh, dễ đọc, mobile-friendly, accessible.
- Token hóa khoảng cách/kích thước và kiểm thử accessibility sớm.

Áp dụng:
- Safe-area cho điện thoại.
- Text/form control đủ lớn để tránh zoom ngoài ý muốn.
- Forced-colors/high-contrast fallback.

## 3. MiniSearch — MIT

Nguồn: https://github.com/lucaong/minisearch

Điểm học:
- Search local trong browser, không cần server.
- Field boosting, prefix, fuzzy match, ranking và suggestion.
- Phù hợp dataset vừa/nhỏ và có thể chạy offline.

Áp dụng hiện tại:
- LegalOS đã có legal-specific scoring, synonym, Điều/Khoản/Điểm và field reasoning nên chưa thay engine ngay.
- Roadmap search sẽ học cách tách index/ranking/suggestion thành lớp riêng và benchmark trước khi đổi engine.

## 4. Open Legal Data Platform — MIT

Nguồn: https://github.com/openlegaldata/oldp

Điểm học:
- Tách legal documents, metadata, search và API thành các lớp rõ ràng.
- Faceted search theo metadata và quan hệ pháp lý.
- Nguồn pháp lý cần có provenance/source rõ ràng.

Áp dụng:
- Giữ metadata nguồn chính thức, trạng thái kiểm chứng, loại văn bản, lĩnh vực và hiệu lực thành facet độc lập.
- Chuẩn bị cho backend/search service về sau mà không phá client hiện tại.

## 5. CourtListener — AGPL-3.0

Nguồn: https://github.com/freelawproject/courtlistener

Điểm học:
- UX của kho pháp lý phải ưu tiên search, nguồn, trích dẫn, metadata và khả năng truy vết.
- Hệ thống legal search lớn cần backend/index chuyên dụng.

Lưu ý giấy phép:
- Chỉ tham khảo pattern và kiến trúc/UX.
- Không sao chép source AGPL vào LegalOS ở giai đoạn này.

## 6. DOMPurify — Apache-2.0 / MPL-2.0 dual license

Nguồn: https://github.com/cure53/DOMPurify

Điểm học:
- Sanitization nên dựa trên DOM parser + allow-list, không dựa vào regex để lọc HTML nguy hiểm.
- Nội dung import phải coi là untrusted.

Áp dụng:
- LegalOS hiện đã có sanitizer DOM allow-list cho Legal Pack/import.
- Giữ hướng này; cân nhắc vendor DOMPurify ở một stage riêng sau khi benchmark bundle/CSP.

## 7. Workbox — MIT

Nguồn: https://github.com/GoogleChrome/workbox

Điểm học:
- App shell caching, versioned cache, service-worker lifecycle, offline-first/network-first theo loại request.

Áp dụng:
- LegalOS dùng service worker native nhỏ gọn theo cùng pattern: cache app shell, network-first cho navigation, cache-first + revalidate cho static assets.
- Không thêm runtime dependency Workbox lúc này để giữ app tĩnh và nhẹ.

## 8. axe-core / @axe-core/playwright — MPL-2.0

Nguồn:
- https://github.com/dequelabs/axe-core
- https://github.com/dequelabs/axe-core-npm

Điểm học:
- Accessibility phải chạy tự động cùng functional browser tests.
- Automated a11y không thay manual test nhưng bắt được nhiều lỗi phổ biến sớm.

Áp dụng:
- Thêm accessibility smoke test vào GitHub Actions bằng @axe-core/playwright.
- Stage đầu fail với lỗi critical; serious được report để sửa dần mà không làm CI quá nhiễu.

## Nguyên tắc triển khai

1. Không merge thẳng vào `main`; mọi thay đổi chạy trên `dev` + Deploy Preview.
2. Không import framework UI lớn chỉ vì đẹp; ưu tiên native HTML/CSS/JS và progressive enhancement.
3. Mỗi dependency phải có lý do, giấy phép rõ và test tự động.
4. Search pháp lý ưu tiên độ chính xác/nguồn/truy vết hơn hiệu ứng UI.
5. Mobile thật vẫn là tiêu chuẩn cuối; emulator/Playwright chỉ là lớp bảo vệ sớm.
