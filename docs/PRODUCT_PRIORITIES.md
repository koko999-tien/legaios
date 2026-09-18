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

## Ưu tiên tiếp theo

| Ưu tiên | Việc cần làm | Điều kiện hoàn thành |
| --- | --- | --- |
| P0 trước merge | Kiểm tra điện thoại thật và phiên có dữ liệu cũ | Header, sidebar, đọc bài, xuất file, cập nhật PWA hoạt động; dữ liệu cũ còn nguyên. CI giả lập không thay thế bước này. |
| P0 trước sử dụng pháp lý | Kiểm định dữ liệu theo Issue #2 | Đối chiếu số hiệu, ngày hiệu lực, quan hệ sửa đổi, nguồn chính thức; từng bản ghi có ngày và bằng chứng kiểm tra. |
| P1 | Sao lưu đầy đủ có phiên bản và xem trước khôi phục | Bao gồm ghi chú nhanh, căn cứ hồ sơ, tiến độ đọc, tùy chọn và file IndexedDB; kiểm thử xuất/nhập trên trình duyệt mới, giới hạn dung lượng và tương thích bản cũ. |
| P1 | Khôi phục sau thao tác xóa | Có hoàn tác hoặc thùng rác cho hồ sơ, ghi chú, căn cứ; hủy/khôi phục không làm mất liên kết dữ liệu. |
| P1 | Phối hợp nhiều tab | Phát hiện thay đổi từ tab khác và xử lý xung đột trước khi ghi đè ghi chú/hồ sơ. |
| P2 | Tìm kiếm và khả năng tiếp cận thực tế | Kiểm tra tiếng Việt không dấu, bàn phím ảo, phóng to chữ, focus trong drawer, VoiceOver/TalkBack trên thiết bị thật. |

## Phạm vi dữ liệu hiện tại

- Workspace JSON: mục đã lưu, lịch sử mở, ghi chú theo văn bản, tiến độ thủ tục, hồ sơ và phiếu chuyên gia.
- Chưa gồm: file tài liệu nhập, ghi chú nhanh, căn cứ hồ sơ, tiến độ đọc, cài đặt giao diện.
- Diagnostics JSON chỉ là thông tin kỹ thuật; không dùng để khôi phục workspace.
- Preview và production có origin khác nhau nên dữ liệu trình duyệt độc lập.
- Chưa có xác nhận kiểm thử điện thoại thật; PR #1 giữ draft và chờ phê duyệt merge riêng.

## Kiểm thử đợt này

`tools/data-safety-smoke.mjs`: từ chối JSON sai; hủy nhập; lỗi quota giữa chừng và khôi phục dữ liệu; cảnh báo và thử lại; xuất/nhập qua reload; lưu cuối kỳ throttle, pagehide và chuyển tài liệu.

Các kiểm thử header, sidebar, article layout, reading progress, IndexedDB, diagnostics, PWA và accessibility tiếp tục chạy trong CI.
