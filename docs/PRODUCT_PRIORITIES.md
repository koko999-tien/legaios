# Căn cứ Pháp lý Môi trường: ưu tiên sản phẩm sau V14

Rà soát ngày 18/09/2026. Đây là kế hoạch phát triển, không phải chứng nhận tính chính xác của nội dung pháp luật.

## Đã bổ sung trên dev

- Diagnostics không xuất nguyên thông báo lỗi hay tên tài liệu từ bản ghi lỗi; có kiểm thử tải JSON trực tiếp từ Settings.
- Nhập workspace kiểm tra dấu nhận diện Căn cứ Pháp lý Môi trường và cấu trúc dữ liệu; JSON không liên quan không được làm trống dữ liệu hiện tại.
- Xác nhận trước khi thay thế workspace, chuẩn hóa trước khi ghi, chỉ thay trạng thái đang mở sau khi toàn bộ lần ghi thành công.
- Nếu một lần ghi thất bại, thử khôi phục các khóa đã ghi trong lần nhập đó. Đây không phải giao dịch bền vững trước sự cố trình duyệt/hệ điều hành; nếu khôi phục cũng thất bại thì cảnh báo vẫn hiển thị.
- Cảnh báo dễ thấy khi localStorage không ghi được; không đưa nội dung riêng tư vào thông báo.
- Lưu nốt vị trí đọc sau lần cuộn cuối, khi chuyển tài liệu, ẩn tab hoặc rời trang.
- Mô tả đúng những gì bản sao lưu workspace có và chưa có; cho phép chọn lại cùng file sau khi hủy hoặc lỗi.
- Kiểm thử hồi quy dữ liệu được gắn vào Browser smoke test.

- Đã bổ sung **Hồ sơ tuân thủ** cho cơ sở/dự án/doanh nghiệp: dữ liệu nền, tín hiệu môi trường, nhánh cần đối chiếu và deadline thủ công.
- Đã nối Phiếu rà soát và Hồ sơ sàng lọc sang Hồ sơ tuân thủ để tránh nhập lại.
- Đã bổ sung **Cập nhật pháp luật theo hồ sơ**; phần cập nhật chỉ ưu tiên văn bản để đọc, không khẳng định văn bản chắc chắn áp dụng.
- Ngày hết hạn GPMT và deadline do người dùng khai báo được phân biệt rõ với thời hạn pháp lý đã được xác minh.
- Workspace JSON v6 đã gồm Hồ sơ tuân thủ, Sổ nghĩa vụ, deadline và tham chiếu bằng chứng; import cũ vẫn được chấp nhận.
- Đã bổ sung **Sổ nghĩa vụ tuân thủ**: trạng thái do người dùng quản lý, căn cứ, người phụ trách, deadline + nguồn deadline, tham chiếu file bằng chứng và xuất báo cáo Markdown.
- Đã bổ sung **Lịch tuân thủ 90 ngày** và chu kỳ theo dõi tháng/quý/năm. Hoàn thành một kỳ ghi lịch sử và đẩy sang kỳ tiếp theo; các kỳ dự kiến được gắn nhãn rõ để không bị hiểu là deadline pháp lý tự động.
- Đã liên kết sâu **Điều/Khoản/Điểm/Phụ lục** trong Sổ nghĩa vụ khi kho dữ liệu có chỉ mục cấu trúc; Cập nhật pháp luật theo hồ sơ giải thích vì sao một văn bản được ưu tiên (đang làm căn cứ, cùng chuỗi pháp lý hoặc khớp nhánh hồ sơ).
- Đã bổ sung **Audit trail + Undo** cho Hồ sơ tuân thủ, nghĩa vụ và deadline thủ công; xóa/sửa gần nhất có thể hoàn tác từ snapshot và lịch sử được mang theo Workspace v6.
- Đã mở rộng **Kho Thuật ngữ** với ĐMC và nhóm viết tắt môi trường/quan trắc phổ biến; ĐMC cũng được nối vào global search synonym.

## Ưu tiên tiếp theo

| Ưu tiên | Việc cần làm | Điều kiện hoàn thành |
| --- | --- | --- |
| P0 trước merge | Kiểm tra điện thoại thật và phiên có dữ liệu cũ | Header, sidebar, đọc bài, xuất file, cập nhật PWA hoạt động; dữ liệu cũ còn nguyên. CI giả lập không thay thế bước này. |
| P0 trước sử dụng pháp lý | Kiểm định dữ liệu theo Issue #2 | Đối chiếu số hiệu, ngày hiệu lực, quan hệ sửa đổi, nguồn chính thức; từng bản ghi có ngày và bằng chứng kiểm tra. |
| P1 | Sao lưu đầy đủ có phiên bản và xem trước khôi phục | Workspace v6 đã gồm Hồ sơ tuân thủ/deadline; bước tiếp theo là thêm ghi chú nhanh, căn cứ hồ sơ, tiến độ đọc, tùy chọn và file IndexedDB; kiểm thử trên trình duyệt mới, giới hạn dung lượng và tương thích bản cũ. |
| P1 | Khôi phục sau thao tác xóa | Có hoàn tác hoặc thùng rác cho Hồ sơ tuân thủ, hồ sơ sàng lọc, deadline, ghi chú và căn cứ; hủy/khôi phục không làm mất liên kết dữ liệu. |
| P1 | Phối hợp nhiều tab | Phát hiện thay đổi từ tab khác và xử lý xung đột trước khi ghi đè ghi chú/hồ sơ. |
| P1 | Permit Register | Quản lý GPMT/giấy phép liên quan: số giấy phép, ngày cấp/hết hạn, cơ quan cấp, file gốc, điều kiện, nghĩa vụ phát sinh và lịch rà/gia hạn. |
| P1 | Lịch công việc có nguồn | Đã có lịch 90 ngày + chu kỳ lặp do người dùng cấu hình; bước tiếp theo là liên kết sâu deadline tới Điều/Khoản đã lập chỉ mục, giấy phép/file gốc và hỗ trợ chế độ lịch rộng hơn. |
| P2 | Tìm kiếm và khả năng tiếp cận thực tế | Kiểm tra tiếng Việt không dấu, bàn phím ảo, phóng to chữ, focus trong drawer, VoiceOver/TalkBack trên thiết bị thật. |

## Phạm vi dữ liệu hiện tại

- Workspace JSON v6: Hồ sơ tuân thủ + deadline thủ công, mục đã lưu, lịch sử mở, ghi chú theo văn bản, tiến độ thủ tục, hồ sơ sàng lọc và phiếu rà soát.
- Chưa gồm: file tài liệu nhập, ghi chú nhanh, căn cứ hồ sơ, tiến độ đọc, cài đặt giao diện.
- Diagnostics JSON chỉ là thông tin kỹ thuật; không dùng để khôi phục workspace.
- Preview và production có origin khác nhau nên dữ liệu trình duyệt độc lập.
- Chưa có xác nhận kiểm thử điện thoại thật; PR #1 giữ draft và chờ phê duyệt merge riêng.

## Kiểm thử đợt này

`tools/data-safety-smoke.mjs`: từ chối JSON sai; hủy nhập; lỗi quota giữa chừng và khôi phục dữ liệu; cảnh báo và thử lại; xuất/nhập qua reload; lưu cuối kỳ throttle, pagehide và chuyển tài liệu.

`tools/compliance-smoke.mjs`: tạo Hồ sơ tuân thủ qua UI; ánh xạ tín hiệu thành nhánh cần rà; tạo Sổ nghĩa vụ với người phụ trách, căn cứ, nguồn deadline và file bằng chứng; kiểm tra chu kỳ lặp + lịch dự kiến + hoàn thành kỳ; kiểm tra Cập nhật pháp luật và lý do ảnh hưởng; export workspace v5; reload; kiểm tra overflow mobile.

Các kiểm thử header, sidebar, article layout, reading progress, IndexedDB, diagnostics, PWA và accessibility tiếp tục chạy trong CI.
