# Căn cứ Pháp lý Môi trường: ưu tiên sản phẩm sau V14

Rà soát ngày 20/09/2026. Đây là kế hoạch phát triển, không phải chứng nhận tính chính xác của nội dung pháp luật.

## Đã bổ sung trên dev

- Kiểm tra hệ thống không xuất nguyên thông báo lỗi hay tên tài liệu từ bản ghi lỗi; có kiểm thử tải JSON trực tiếp từ Settings.
- Nhập workspace kiểm tra dấu nhận diện Căn cứ Pháp lý Môi trường và cấu trúc dữ liệu; JSON không liên quan không được làm trống dữ liệu hiện tại.
- Xác nhận trước khi thay thế workspace, chuẩn hóa trước khi ghi, chỉ thay trạng thái đang mở sau khi toàn bộ lần ghi thành công.
- Nếu một lần ghi thất bại, thử khôi phục các khóa đã ghi trong lần nhập đó. Đây không phải giao dịch bền vững trước sự cố trình duyệt/hệ điều hành; nếu khôi phục cũng thất bại thì cảnh báo vẫn hiển thị.
- Cảnh báo dễ thấy khi localStorage không ghi được; không đưa nội dung riêng tư vào thông báo.
- Lưu nốt vị trí đọc sau lần cuộn cuối, khi chuyển tài liệu, ẩn tab hoặc rời trang.
- Mô tả đúng những gì bản sao lưu workspace có và chưa có; cho phép chọn lại cùng file sau khi hủy hoặc lỗi.
- Kiểm thử hồi quy dữ liệu được gắn vào Browser smoke test.

- Đã bổ sung **Hồ sơ tuân thủ** cho cơ sở/dự án/doanh nghiệp: dữ liệu nền, tín hiệu môi trường, nhánh cần đối chiếu và thời hạn thủ công.
- Đã nối Phiếu rà soát và Hồ sơ sàng lọc sang Hồ sơ tuân thủ để tránh nhập lại.
- Đã bổ sung **Cập nhật pháp luật theo hồ sơ**; phần cập nhật chỉ ưu tiên văn bản để đọc, không khẳng định văn bản chắc chắn áp dụng.
- Ngày hết hạn GPMT và thời hạn do người dùng khai báo được phân biệt rõ với thời hạn pháp lý đã được xác minh.
- Workspace JSON v8 đã gồm Hồ sơ tuân thủ, Sổ giấy phép, Sổ nghĩa vụ, thời hạn, tham chiếu bằng chứng và audit trail; import cũ vẫn được chấp nhận.
- Đã bổ sung **Sổ nghĩa vụ tuân thủ**: trạng thái do người dùng quản lý, căn cứ, người phụ trách, thời hạn + nguồn thời hạn, tham chiếu file bằng chứng và xuất báo cáo Markdown.
- Đã bổ sung **Lịch tuân thủ 90 ngày** và chu kỳ theo dõi tháng/quý/năm. Hoàn thành một kỳ ghi lịch sử và đẩy sang kỳ tiếp theo; các kỳ dự kiến được gắn nhãn rõ để không bị hiểu là thời hạn pháp lý tự động.
- Đã liên kết sâu **Điều/Khoản/Điểm/Phụ lục** trong Sổ nghĩa vụ khi kho dữ liệu có chỉ mục cấu trúc; Cập nhật pháp luật theo hồ sơ giải thích vì sao một văn bản được ưu tiên (đang làm căn cứ, cùng chuỗi pháp lý hoặc khớp nhánh hồ sơ).
- Đã bổ sung **Audit trail + Undo** cho Hồ sơ tuân thủ, Sổ giấy phép, nghĩa vụ và thời hạn thủ công; xóa/sửa gần nhất có thể hoàn tác từ snapshot và lịch sử được mang theo Workspace v8.
- Đã nâng tìm kiếm lên **Search V3**: giữ synonym/viết tắt (gồm ĐMC), thêm trọng số theo độ hiếm từ trong kho, hiểu nhiều chủ đề trong cùng câu hỏi, nhận diện mục tiêu tra cứu, loại văn bản mong muốn và tham chiếu rút gọn như `NĐ 08`; kết quả hiển thị chủ đề/mục tiêu đã hiểu và chọn snippet theo ngữ nghĩa. Tất cả chạy cục bộ trong trình duyệt, không gửi câu hỏi tới dịch vụ AI bên ngoài.
- Đã bổ sung **Sổ giấy phép đa giấy phép**: GPMT/giấy phép liên quan, số giấy phép, cơ quan cấp, ngày cấp/hết hạn, mốc rà soát nội bộ, file gốc, điều kiện cần theo dõi và liên kết Sổ nghĩa vụ. Trường GPMT cũ tự migrate một lần vào registry.
- Đã bổ sung **Hàng rà soát văn bản**: theo dõi văn bản cần đọc lại với trạng thái, ngày xem lại nội bộ, ghi chú và liên kết Hồ sơ tuân thủ; có thể chuyển trực tiếp sang Sổ nghĩa vụ và được mang theo Workspace v8.
- Mốc rà soát/hết hạn trong Sổ giấy phép được đưa vào Lịch tuân thủ nhưng vẫn gắn nhãn là dữ liệu người dùng khai báo, không phải thời hạn pháp lý do hệ thống tự suy ra.

## Ưu tiên tiếp theo

| Ưu tiên | Việc cần làm | Điều kiện hoàn thành |
| --- | --- | --- |
| P0 trước merge | Kiểm tra điện thoại thật và phiên có dữ liệu cũ | Header, sidebar, đọc bài, xuất file, cập nhật PWA hoạt động; dữ liệu cũ còn nguyên. CI giả lập không thay thế bước này. |
| P0 trước sử dụng pháp lý | Kiểm định dữ liệu theo Issue #2 | Đối chiếu số hiệu, ngày hiệu lực, quan hệ sửa đổi, nguồn chính thức; từng bản ghi có ngày và bằng chứng kiểm tra. |
| P1 | Sao lưu đầy đủ có phiên bản và xem trước khôi phục | Đã có giao diện xem trước khôi phục, đếm hồ sơ/giấy phép/nghĩa vụ/căn cứ/nguồn web chờ rà và cho phép xuất bản hiện tại trước. File IndexedDB vẫn cần nhập lại; bước tiếp theo là đóng gói bytes file nhập trong một gói backup riêng. |
| P1 | Khôi phục sau thao tác xóa | Hồ sơ tuân thủ/Sổ nghĩa vụ/thời hạn có audit + Undo; hồ sơ sàng lọc, căn cứ hồ sơ và ghi chú nhanh có “Đã xóa gần đây”. Bước tiếp theo là thống nhất một màn hình recovery cho toàn bộ loại dữ liệu. |
| P1 | Phối hợp nhiều tab | Hồ sơ tuân thủ đã có revision metadata và merge theo hồ sơ mới hơn; audit trail hợp nhất theo ID. Bước tiếp theo là mở rộng versioned merge cho các loại workspace còn lại. |
| P1 | Lịch công việc có nguồn | Đã có 30 ngày / 90 ngày / 12 tháng, chu kỳ lặp và mở thẳng nghĩa vụ/giấy phép. Bước tiếp theo là xuất .ics và liên kết sâu hơn tới file/căn cứ gốc. |
| P2 | Tìm kiếm và khả năng tiếp cận thực tế | Kiểm tra tiếng Việt không dấu, bàn phím ảo, phóng to chữ, focus trong drawer, VoiceOver/TalkBack trên thiết bị thật. |

## Phạm vi dữ liệu hiện tại

- Workspace JSON v8: Hồ sơ tuân thủ (gồm Sổ giấy phép, Sổ nghĩa vụ, thời hạn và audit trail), hàng rà soát văn bản, mục đã lưu/lịch sử mở, ghi chú theo văn bản, tiến độ thủ tục, hồ sơ sàng lọc/phiếu rà soát, ghi chú nhanh, giỏ căn cứ + metadata memo, tiến độ đọc, tùy chọn giao diện và danh sách “Đã xóa gần đây”.
- Chưa gồm: kho tài liệu nhập trong IndexedDB (metadata và bytes của PDF/Word/tệp nhập). Các tệp này phải được nhập lại sau khi khôi phục workspace.
- Kiểm tra hệ thống JSON chỉ là thông tin kỹ thuật; không dùng để khôi phục workspace.
- Preview và production có origin khác nhau nên dữ liệu trình duyệt độc lập.
- Chưa có xác nhận kiểm thử điện thoại thật; PR #3 giữ draft và chờ phê duyệt merge riêng.

## Kiểm thử đợt này

`tools/data-safety-smoke.mjs`: từ chối JSON sai; hủy nhập; lỗi quota giữa chừng và khôi phục dữ liệu; cảnh báo và thử lại; xuất/nhập qua reload; lưu cuối kỳ throttle, pagehide và chuyển tài liệu.

`tools/compliance-smoke.mjs`: tạo Hồ sơ tuân thủ qua UI; ánh xạ tín hiệu thành nhánh cần rà; tạo Sổ nghĩa vụ với người phụ trách, căn cứ, nguồn thời hạn và file bằng chứng; kiểm tra chu kỳ lặp + lịch dự kiến + hoàn thành kỳ; kiểm tra Cập nhật pháp luật và lý do ảnh hưởng; export workspace v8; reload; kiểm tra overflow mobile.

Các kiểm thử header, sidebar, article layout, reading progress, IndexedDB, diagnostics, PWA và accessibility tiếp tục chạy trong CI.


## V15 đang thử nghiệm trên `feat/v15-search-v4`

- **Search V4:** mở rộng nguồn chính thức theo thao tác chủ động của người dùng; kết quả web tách khỏi corpus đã kiểm định và chỉ cho phép miền chính thức.
- **Khôi phục an toàn hơn:** hiển thị bản xem trước số hồ sơ, giấy phép, nghĩa vụ, căn cứ và tiến độ trước khi thay workspace; có nút xuất bản hiện tại trước.
- **Lịch tuân thủ rộng hơn:** chuyển giữa 30 ngày, 90 ngày và 12 tháng; mốc giấy phép mở thẳng Sổ giấy phép và nghĩa vụ mở thẳng Sổ nghĩa vụ.
- **Phối hợp nhiều tab:** Hồ sơ tuân thủ có revision metadata; khi phát hiện tab khác đã ghi phiên mới, hệ thống hợp nhất theo từng hồ sơ dựa trên `updatedAt` và hợp nhất audit trail theo ID trước khi ghi tiếp. Đây vẫn là local multi-tab coordination, chưa phải cloud sync.
- **Search V4 review queue:** kết quả web chính thức có thể được đưa thủ công vào hàng rà soát, vẫn giữ nhãn chưa kiểm định và được backup/restore riêng khỏi corpus pháp luật.
- **Grounded AI:** hỏi từ tối đa 12 căn cứ đã lưu; frontend chỉ gửi question + citation summaries, API key giữ server-side, thiếu key thì fail closed và các chức năng khác vẫn chạy.
- **CI trên nhánh tính năng:** validate + browser smoke chạy trên `feat/**`; Search V4, review queue và Grounded AI có regression test riêng.

Các mục này chưa phải release production. Search V4 hiện là lớp discovery; liên kết được phát hiện không được coi là xác nhận hiệu lực hay kết luận áp dụng pháp luật.
