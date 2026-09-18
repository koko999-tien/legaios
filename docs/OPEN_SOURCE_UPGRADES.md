# Căn cứ Pháp lý Môi trường V14 — Open-source upgrade notes

Ngày rà soát: 2026-09-17

Tài liệu này ghi lại các dự án mã nguồn mở được nghiên cứu để nâng cấp Căn cứ Pháp lý Môi trường. Mục tiêu là học pattern/kiến trúc phù hợp, không kéo framework lớn vào ứng dụng nếu chưa cần và không sao chép code có giấy phép không tương thích.

## 1. GOV.UK Frontend — MIT

Nguồn: https://github.com/alphagov/govuk-frontend

Điểm học:
- Progressive enhancement: HTML dùng được trước, JavaScript chỉ nâng cấp trải nghiệm.
- Thiết kế form/nút rõ ràng, ưu tiên màn hình hẹp và assistive technology.
- WCAG 2.2 AA là mục tiêu thực tế; mobile wrapping và focus state phải được test.

Áp dụng vào Căn cứ Pháp lý Môi trường:
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

## 3. Fuse.js / MiniSearch — Apache-2.0 / MIT

Nguồn:
- https://github.com/krisk/Fuse
- https://github.com/lucaong/minisearch

Điểm học:
- Search local trong browser có thể fuzzy/typo tolerant mà không cần backend.
- Tokenization, edit-distance, field boosting và ranking phải tách khỏi phần render UI.
- Fuzzy search cần ngưỡng đủ chặt để không biến mọi truy vấn vô nghĩa thành kết quả hợp lệ.

Áp dụng:
- Thêm `assets/js/search-fuzzy.js`: Unicode tokenization, bounded Levenshtein, fuzzy boost cho tiêu đề/nội dung và ngưỡng tỷ lệ token khớp.
- Không thay legal-specific scoring hiện có: số hiệu, Điều/Khoản/Điểm và chỉ mục cấu trúc vẫn có ưu tiên cao hơn.
- Thêm regression test cho truy vấn có typo, truy vấn vô nghĩa và tra cứu số hiệu chính xác.
- Không thêm Fuse/MiniSearch làm runtime dependency; Căn cứ Pháp lý Môi trường chỉ học pattern và giữ engine nhỏ, kiểm soát được.

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
- Không sao chép source AGPL vào Căn cứ Pháp lý Môi trường ở giai đoạn này.

## 6. DOMPurify — Apache-2.0 / MPL-2.0 dual license

Nguồn: https://github.com/cure53/DOMPurify

Điểm học:
- Sanitization nên dựa trên DOM parser + allow-list, không dựa vào regex để lọc HTML nguy hiểm.
- URI protocol, event-handler, SVG/MathML, DOM clobbering và custom element đều phải được coi là bề mặt tấn công.
- Nội dung import phải coi là untrusted.

Áp dụng:
- Căn cứ Pháp lý Môi trường giữ sanitizer DOM allow-list cho Legal Pack/import.
- Thêm attack-corpus test tự động gồm script, event attribute, `javascript:`, SVG, MathML, iframe/srcdoc, form controls, DOM clobbering và template.
- Link HTTPS hợp lệ vẫn phải được giữ lại và được ép `noopener noreferrer`.

## 7. Dexie.js — Apache-2.0

Nguồn: https://github.com/dexie/Dexie.js

Điểm học:
- IndexedDB nên có một lớp truy cập riêng, connection lifecycle rõ ràng và transaction promise nhất quán.
- Version change/blocking và lỗi persistence cần xử lý thay vì để UI chết im lặng.

Áp dụng:
- Thêm `assets/js/idb-resilience.js`: tái sử dụng một kết nối versioned, transaction wrapper và fallback về bộ nhớ trong phiên nếu IndexedDB lỗi.
- Tự đóng kết nối khi version thay đổi/pagehide.
- Thêm CI round-trip: open → put → get → getAll → delete.
- Chưa thêm Dexie làm runtime dependency vì data layer hiện còn nhỏ.

## 8. Workbox — MIT

Nguồn: https://github.com/GoogleChrome/workbox

Điểm học:
- App shell caching, versioned cache, service-worker lifecycle, offline-first/network-first theo loại request.

Áp dụng:
- Căn cứ Pháp lý Môi trường dùng service worker native nhỏ gọn: cache app shell và network-first cho navigation/static assets với fallback cache.
- Cache version được tăng khi thêm module search/storage mới.
- Không thêm runtime dependency Workbox lúc này để giữ app tĩnh và nhẹ.

## 9. axe-core / @axe-core/playwright — MPL-2.0

Nguồn:
- https://github.com/dequelabs/axe-core
- https://github.com/dequelabs/axe-core-npm

Điểm học:
- Accessibility phải chạy tự động cùng functional browser tests.
- Automated a11y không thay manual test nhưng bắt được nhiều lỗi phổ biến sớm.

Áp dụng:
- Accessibility smoke test chạy trên desktop home/library và mobile home/library/article.
- CI hiện fail nếu axe phát hiện lỗi mức `serious` hoặc `critical`.
- Các lỗi contrast được axe phát hiện đã được sửa bằng lớp `oss-upgrades.css`.

## 10. Lighthouse CI / web-vitals — Apache-2.0

Nguồn:
- https://github.com/GoogleChrome/lighthouse-ci
- https://github.com/GoogleChrome/web-vitals

Điểm học:
- Performance nên có budget và regression gate thay vì chỉ tối ưu bằng cảm giác.
- Core Web Vitals tập trung vào LCP, INP và CLS; CI có thể kiểm soát asset-size trước khi thêm audit nặng hơn.

Áp dụng giai đoạn hiện tại:
- Thêm `tools/performance-budget.mjs` để chặn phình `index.html`, tổng CSS, tổng JS, app shell và file JS lớn nhất.
- Budget được đặt rộng hơn baseline hiện tại để chỉ chặn regression rõ ràng, không ép tối ưu giả tạo.
- Lighthouse CI đầy đủ sẽ được cân nhắc ở stage sau vì chi phí chạy Chromium/audit cao hơn smoke test hiện tại.

## 11. Sentry JavaScript / OpenTelemetry Browser — MIT / Apache-2.0

Nguồn:
- https://github.com/getsentry/sentry-javascript
- https://github.com/open-telemetry/opentelemetry-browser

Điểm học:
- Lỗi trình duyệt cần được bắt ở tầng toàn cục thay vì phụ thuộc vào từng màn hình tự `try/catch`.
- Telemetry trình duyệt nên có schema có cấu trúc để dễ chẩn đoán, nhưng phải kiểm soát dữ liệu nhạy cảm trước khi thu thập hoặc gửi đi.
- Monitoring không nên làm hỏng luồng chính nếu chính monitoring gặp lỗi.

Áp dụng:
- Căn cứ Pháp lý Môi trường không cài SDK telemetry từ xa ở giai đoạn này.
- `assets/js/oss-upgrades.js` bắt `error` và `unhandledrejection`, chỉ giữ tối đa 12 lỗi kỹ thuật gần nhất trong `sessionStorage`.
- Snapshot chẩn đoán chỉ gồm trạng thái trình duyệt, viewport, service worker, storage, thời gian tải và lỗi kỹ thuật; không đọc nội dung hồ sơ, ghi chú, tên tài liệu nhập hoặc lịch sử tìm kiếm.
- Command Palette có lệnh `Xuất chẩn đoán hệ thống` để người dùng chủ động tải JSON khi cần hỗ trợ.
- `tools/diagnostics-smoke.mjs` đặt dữ liệu sentinel riêng tư vào workspace rồi xác minh sentinel không xuất hiện trong snapshot hoặc file chẩn đoán.
- CI chạy test chẩn đoán cùng browser smoke test để khóa yêu cầu privacy này về sau.

## Nguyên tắc triển khai

1. Không merge thẳng vào `main`; mọi thay đổi chạy trên `dev` + Deploy Preview.
2. Không import framework UI lớn chỉ vì đẹp; ưu tiên native HTML/CSS/JS và progressive enhancement.
3. Mỗi dependency phải có lý do, giấy phép rõ và test tự động.
4. Search pháp lý ưu tiên độ chính xác/nguồn/truy vết hơn hiệu ứng UI.
5. Mobile thật vẫn là tiêu chuẩn cuối; emulator/Playwright chỉ là lớp bảo vệ sớm.
6. Mỗi nâng cấp từ dự án nguồn mở phải được viết lại cho nhu cầu Căn cứ Pháp lý Môi trường và có regression test trước khi coi là hoàn thành.
