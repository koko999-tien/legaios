# Search V4 — mở rộng nguồn chính thức

Search V4 là lớp tìm kiếm web tùy chọn nằm **sau** Search V3 cục bộ. Mục tiêu của lớp này là giúp người dùng phát hiện thêm liên kết trên các cổng văn bản chính thức khi kho dữ liệu tích hợp chưa đủ.

## Nguyên tắc

1. Search V3 vẫn là công cụ xếp hạng dữ liệu có sẵn trong ứng dụng.
2. Search V4 **không tự chạy khi người dùng gõ**. Chỉ khi bấm **Mở rộng nguồn chính thức** thì chuỗi truy vấn mới được gửi tới hàm máy chủ.
3. Không gửi Hồ sơ tuân thủ, ghi chú, tài liệu đã nhập, lịch sử tìm kiếm hoặc dữ liệu workspace.
4. Kết quả web luôn được gắn nhãn **Kết quả web · chưa kiểm định** và không được nhập tự động vào corpus đã rà soát.
5. Chỉ liên kết HTTPS thuộc allowlist nguồn chính thức mới được trả về giao diện:
   - `vbpl.vn`
   - `vanban.chinhphu.vn`
   - `congbao.chinhphu.vn`
   - `chinhphu.vn`
   - `vbpl.moj.gov.vn`
6. Mở được một liên kết chính thức không đồng nghĩa văn bản đó đang áp dụng cho hồ sơ cụ thể. Người dùng vẫn phải kiểm tra hiệu lực, sửa đổi, văn bản hợp nhất và điều khoản chuyển tiếp.

## Kiến trúc

- `assets/js/search-fuzzy.js`: loader của Search V3 + Search V4.
- `assets/lazy/official-search.js`: giao diện Search V4, chỉ tải lười và chỉ gọi mạng khi người dùng yêu cầu.
- `assets/css/v15-search.css`: lớp giao diện riêng cho kết quả nguồn ngoài.
- `netlify/functions/official-search.mjs`: hàm máy chủ phát hiện liên kết và áp allowlist.
- `tools/official-search-smoke.mjs`: kiểm thử ranh giới nguồn và nhãn chưa kiểm định.

Bản V15 thử nghiệm dùng chỉ mục HTML của DuckDuckGo để **phát hiện liên kết** rồi lọc lại theo allowlist. Đây không phải nguồn pháp lý và không được hiển thị như nguồn xác minh. Nếu upstream không khả dụng, giao diện chỉ hiện các cổng chính thức để người dùng mở trực tiếp.

## Hướng nâng cấp tiếp

- Ưu tiên thay lớp discovery bằng API/search endpoint chính thức nếu các cổng cung cấp giao diện ổn định cho máy.
- Bổ sung parser metadata (số hiệu, cơ quan, ngày ban hành, hiệu lực) nhưng giữ trạng thái `candidate` cho tới khi qua legal-data audit.
- Cho phép đưa một ứng viên vào **Hàng rà soát văn bản**, không nhập thẳng vào dữ liệu pháp luật cốt lõi.
- Khi có pipeline cập nhật tự động, mọi thay đổi vào corpus phải đi qua release gate và audit trail.
