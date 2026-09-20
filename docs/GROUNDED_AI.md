# Grounded AI — hỏi từ căn cứ đã lưu

V16 bổ sung một lớp AI **tùy chọn** trong trang **Căn cứ hồ sơ**. Mục tiêu không phải tạo chatbot pháp lý tổng quát, mà giúp đọc và tổng hợp các Điều/Khoản/Điểm người dùng đã chủ động lưu.

## Ranh giới dữ liệu

Frontend chỉ gửi:

- câu hỏi người dùng nhập;
- tối đa 12 căn cứ đã lưu;
- với mỗi căn cứ: tên văn bản, nhãn Điều/Khoản/Điểm, phần tóm tắt đang có và URL nguồn nếu có.

Không gửi tự động:

- Hồ sơ tuân thủ;
- Sổ nghĩa vụ / giấy phép;
- ghi chú riêng của căn cứ;
- ghi chú chung của workspace;
- file PDF/Word đã nhập;
- lịch sử tìm kiếm;
- dữ liệu từ Search V4 review queue.

## Ranh giới câu trả lời

Server đặt system instruction yêu cầu model:

1. chỉ dùng **CĂN CỨ ĐƯỢC CUNG CẤP**;
2. không dùng kiến thức ngoài để tự suy đoán hiệu lực, sửa đổi, thẩm quyền hoặc phạm vi áp dụng;
3. gắn chỉ dấu `[1]`, `[2]`... cho các nhận định thực chất;
4. nói rõ **“Không đủ căn cứ trong danh sách đã chọn.”** nếu dữ liệu không đủ;
5. không biến câu trả lời thành kết luận tuân thủ hay tư vấn pháp lý thay cơ quan/người có chuyên môn.

## Kiến trúc

- `assets/optional/grounded-ai-loader.js`: loader nhỏ được trang chính gọi; chỉ tải module AI khi người dùng tương tác với ô hỏi.
- `assets/optional/grounded-ai.js`: tạo payload citation-only và hiển thị kết quả bằng `textContent`.
- `netlify/functions/grounded-ai.mjs`: giữ API key server-side, giới hạn kích thước payload và gọi Gemini.
- `tools/grounded-ai-smoke.mjs`: kiểm thử browser về no-source guard và ranh giới privacy.
- `tools/grounded-ai-function-smoke.mjs`: kiểm thử server về prompt/source boundary và key handling.

## Biến môi trường Netlify

- `GEMINI_API_KEY` — bắt buộc để bật AI.
- `GEMINI_MODEL` — tùy chọn; mặc định `gemini-flash-latest`.

Nếu không có `GEMINI_API_KEY`, endpoint trả `ai_not_configured` và giao diện giải thích rằng AI chưa được bật. Mọi phần tra cứu/local workspace vẫn hoạt động bình thường.

## Nhà cung cấp

Tích hợp dùng Gemini **Interactions API** qua `POST https://generativelanguage.googleapis.com/v1beta/interactions`. Đây là lớp provider server-side nên có thể thay nhà cung cấp sau này mà không thay đổi cấu trúc dữ liệu citation-only ở frontend.
