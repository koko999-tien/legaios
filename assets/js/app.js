
const T=[
["bvmt","BVMT & TTHC","Luật BVMT, ĐTM, GPMT, ĐKMT, quan trắc và hệ thống QCVN."],
["nuoc","Tài nguyên nước","Luật Tài nguyên nước, cấp phép, khai thác, nước mặt/nước dưới đất."],
["khi","Không khí · ồn · rung","Không khí xung quanh, khí thải công nghiệp, tiếng ồn, độ rung."],
["thai","Chất thải & EPR","CTNH, EPR, tái chế, xử lý chất thải và quy chuẩn liên quan."],
["dat","Đất đai","Luật Đất đai, giá đất, thu hồi, bồi thường, phân cấp và nghị định hướng dẫn."],
["ks","Địa chất & khoáng sản","Luật 54/2024, Luật 147/2025, khai thác nhóm IV, nghị định hướng dẫn."],
["rung","Lâm nghiệp","Luật Lâm nghiệp, rừng đặc dụng/phòng hộ/sản xuất, văn bản hợp nhất."],
["ddsh","Đa dạng sinh học","Khu bảo tồn, loài nguy cấp, nguồn gen và chia sẻ lợi ích."],
["bien","Biển & thủy sản","TNMT biển, giao khu vực biển, Luật Thủy sản và văn bản sửa đổi."],
["thuyloi","Thủy lợi","Luật Thủy lợi và nghị định chi tiết, sửa đổi."],
["thientai","Phòng chống thiên tai","Luật PCTT, văn bản sửa đổi và hướng dẫn thi hành."],
["kttv","Khí tượng thủy văn","Luật KTTV, nghị định chi tiết và văn bản hợp nhất."],
["knk","Khí hậu · KNK · ô-dôn","Kiểm kê KNK, thị trường carbon, tầng ô-dôn, Điều 6 Thỏa thuận Paris."],
["hc","Hóa chất","Luật Hóa chất 2025 và hệ nghị định/thông tư 2026."],
["dl","Điện · năng lượng","Luật Điện lực, NLTT, DPPA và văn bản sửa đổi."],
["phi","Phí & tài chính xanh","Phí BVMT, phân loại xanh và công cụ tài chính liên quan."]
];
const D=[
{id:"l72",t:"bvmt",k:"Luật",ttl:"Luật BVMT 2020 (72/2020/QH14)",b:`<p>HL 01/01/2022. Điều 28: nhóm I–IV theo quy mô, loại hình, diện tích, yếu tố nhạy cảm. Điều 30–38 ĐTM. Điều 39–48 GPMT. Điều 49 ĐKMT. Điều 54–55 EPR. Điều 91 KNK.</p><p>Luật 146/2025/QH15 (HL 01/01/2026) sửa thẩm quyền GPMT: Bộ NN&MT và chính quyền địa phương 2 cấp.</p>`},
{id:"nd08",t:"bvmt",k:"Nghị định",ttl:"NĐ 08/2022/NĐ-CP",b:`<p>Nghị định hướng dẫn chi tiết Luật BVMT, gồm tiêu chí phân nhóm dự án, ĐTM, GPMT, quản lý chất thải, quan trắc và các phụ lục quan trọng.</p><p><b>Không đọc riêng lẻ:</b> NĐ 08 đã được sửa bởi NĐ 05/2025 và tiếp tục được sửa bởi NĐ 48/2026. Khi phân loại dự án phải đối chiếu bản quy định và phụ lục đang áp dụng.</p>`},
{id:"nd05",t:"bvmt",k:"Nghị định",ttl:"NĐ 05/2025/NĐ-CP",b:`<p>Ban hành và có hiệu lực 06/01/2025, sửa đổi NĐ 08/2022 về nhiều nội dung của pháp luật BVMT, trong đó có thủ tục môi trường và phân cấp.</p><p>Từ 29/01/2026 cần đọc tiếp NĐ 48/2026 vì NĐ 48 tiếp tục sửa NĐ 08 đã được NĐ 05 sửa đổi.</p>`},
{id:"nd131",t:"bvmt",k:"Nghị định",ttl:"NĐ 131/2025/NĐ-CP Điều 26",b:`<p>HL 01/07/2025. Chủ tịch UBND tỉnh cấp GPMT khi nước thải SH ≥50 m³/ngày; nước thải CN ≥10 m³/ngày; khí thải ≥2.000 m³/giờ; CTNH ≥100 kg/tháng kèm thải phải xử lý (trong phạm vi nghị định).</p>`},
{id:"tt02",t:"bvmt",k:"Thông tư",ttl:"TT 02/2022 và các văn bản sửa đổi",b:`<p>TT 02/2022/TT-BTNMT là thông tư chi tiết thi hành một số nội dung Luật BVMT, bao gồm hệ thống mẫu và hướng dẫn nghiệp vụ.</p><p>V5 đánh dấu chuỗi sửa đổi gồm TT 07/2025/TT-BTNMT và TT 09/2026/TT-BNNMT; khi dùng mẫu hồ sơ phải đối chiếu bản đang áp dụng.</p>`},
{id:"tt10",t:"bvmt",k:"Thông tư",ttl:"TT 10/2021/TT-BTNMT quan trắc",b:`<p>Kỹ thuật quan trắc và quản lý dữ liệu. Thay TT 24/2017. Không gồm dầu khí ngoài biển (Chương II).</p>`},
{id:"nd45",t:"bvmt",k:"Nghị định",ttl:"NĐ 45/2022/NĐ-CP xử phạt VPHC",b:`<p>HL 25/08/2022. Tăng mức phạt xả thải chưa xử lý, xả trộm.</p>`},
{id:"l28",t:"nuoc",k:"Luật",ttl:"Luật Tài nguyên nước 2023 (28/2023/QH15)",b:`<p>Quản lý, bảo vệ, khai thác, sử dụng nước. TT 03/2024 hướng dẫn. Khai thác nước dưới đất hộ gia đình (khoản 4 Điều 52) từ 01/07/2026.</p>`},
{id:"q40",t:"nuoc",k:"QCVN",ttl:"QCVN 40:2025/BTNMT nước thải CN",b:`<p>TT 06/2025, HL 01/09/2025. Không áp dụng chăn nuôi, sinh hoạt, đô thị. Cơ sở cũ lộ trình đến 31/12/2031.</p>`},
{id:"nd346",t:"phi",k:"Nghị định",ttl:"NĐ 346/2025/NĐ-CP phí nước thải",b:`<p>HL 01/01/2026, thay NĐ 53/2020. Phí SH: 10% giá 1 m³ nước sạch chưa VAT. CN theo lưu lượng và thông số.</p>`},
{id:"q19",t:"khi",k:"QCVN",ttl:"QCVN 19:2024/BTNMT khí thải CN",b:`<p>TT 45/2024, HL 01/07/2025. Thay QCVN 19–23:2009.</p>`},
{id:"q05",t:"khi",k:"QCVN",ttl:"QCVN 05:2023/BTNMT không khí xung quanh",b:`<p>SO2, CO, NO2, O3, TSP, PM10, PM2.5. Không áp dụng không khí trong nhà.</p>`},
{id:"q26",t:"khi",k:"QCVN",ttl:"QCVN 26:2025/BNNMT tiếng ồn",b:`<p>TT 01/2025/TT-BNNMT. Đo tại khu vực bị ảnh hưởng. Không dùng cho ồn nghề nghiệp trong khuôn viên cơ sở tự gây.</p>`},
{id:"nd153",t:"phi",k:"Nghị định",ttl:"NĐ 153/2024/NĐ-CP phí khí thải",b:`<p>HL 05/01/2025. Không quan trắc: 3 triệu đồng/năm. Có quan trắc: phí biến đổi bụi, SOx, NOx, CO.</p>`},
{id:"epr",t:"thai",k:"Hướng dẫn",ttl:"EPR — trách nhiệm tái chế/xử lý",b:`<p>Điều 54–55 Luật BVMT đặt nền tảng trách nhiệm mở rộng của nhà sản xuất, nhập khẩu.</p><p>Từ 25/05/2026, NĐ 110/2026/NĐ-CP là văn bản chuyên biệt quy định chi tiết trách nhiệm tái chế sản phẩm, bao bì và trách nhiệm xử lý chất thải; TT 24/2026/TT-BNNMT hướng dẫn thi hành một số nội dung của nghị định này.</p>`},
{id:"q07",t:"thai",k:"QCVN",ttl:"QCVN 07:2025/BNNMT ngưỡng CTNH",b:`<p>TT 44/2025, HL 09/02/2026. Kết hợp Điều 71 NĐ 08 về khối lượng.</p>`},
{id:"l54",t:"ks",k:"Luật",ttl:"Luật Địa chất và Khoáng sản 2024 (54/2024/QH15)",b:`<p>Luật ban hành 29/11/2024, có hiệu lực 01/07/2025, điều chỉnh hoạt động địa chất và khoáng sản, trong đó có nghĩa vụ bảo vệ môi trường, cải tạo/phục hồi và đóng cửa mỏ.</p><p>Luật 147/2025/QH15 sửa đổi Luật Địa chất và khoáng sản và có hiệu lực 01/01/2026; hồ sơ thực tế cần đọc hai luật cùng nhau.</p>`},
{id:"nd27",t:"phi",k:"Nghị định",ttl:"NĐ 27/2023/NĐ-CP phí khoáng sản",b:`<p>HL 15/07/2023. Phí theo loại khoáng sản; HĐND tỉnh quy định chi tiết.</p>`},
{id:"ln",t:"rung",k:"Luật",ttl:"Luật Lâm nghiệp 2017 (16/2017/QH14)",b:`<p>Rừng đặc dụng, phòng hộ, sản xuất. Dự án trên rừng đặc dụng/phòng hộ là yếu tố nhạy cảm ĐTM.</p>`},
{id:"ddsh",t:"ddsh",k:"Luật",ttl:"Luật Đa dạng sinh học 2008",b:`<p>Cấm săn bắt phân khu bảo vệ nghiêm ngặt; cấm hủy hệ sinh thái, loài ngoại lai xâm hại. Luật 146/2025: Bộ NN&MT với danh mục loài nguy cấp.</p>`},
{id:"l82",t:"bien",k:"Luật",ttl:"Luật TNMT biển và hải đảo 2015 (82/2015/QH13)",b:`<p>HL 01/07/2016. Quản lý tổng hợp tài nguyên biển, đảo. NĐ 40/2016, sửa NĐ 65/2025 (giao khu vực biển).</p>`},
{id:"lts",t:"bien",k:"Luật",ttl:"Luật Thủy sản 2017 (18/2017/QH14)",b:`<p>Cấm hủy nguồn lợi, IUU, lấn khu bảo tồn biển. TT 88/2025/TT-BNNMT.</p>`},
{id:"ldat",t:"dat",k:"Luật",ttl:"Luật Đất đai 2024 (31/2024/QH15)",b:`<p>Luật khung về quản lý và sử dụng đất. Khi xử lý hồ sơ môi trường cần đối chiếu đất lúa, đất rừng, thu hồi/chuyển mục đích sử dụng đất và mối liên hệ với yếu tố nhạy cảm môi trường.</p><p>Luật 43/2024/QH15 đã sửa đổi, bổ sung Luật Đất đai cùng một số luật liên quan.</p>`},
{id:"nd06",t:"knk",k:"Nghị định",ttl:"NĐ 06/2022/NĐ-CP — KNK & tầng ô-dôn",b:`<p>Khung về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn. Hệ thống này đã được sửa bởi NĐ 119/2025/NĐ-CP và tiếp tục được sửa bởi NĐ 83/2026/NĐ-CP.</p><p>TT 01/2022/TT-BTNMT về ứng phó BĐKH cũng đã được TT 08/2025/TT-BNNMT sửa đổi.</p>`},
{id:"lhc",t:"hc",k:"Luật",ttl:"Luật Hóa chất 2025 (69/2025/QH15)",b:`<p>Quản lý vòng đời, hóa chất nguy hiểm trong sản phẩm, xử lý chất thải theo pháp luật BVMT, phòng ngừa sự cố, công bố thông tin.</p>`},
{id:"ldl",t:"dl",k:"Luật",ttl:"Luật Điện lực 2024 (61/2024/QH15)",b:`<p>HL 01/02/2025. Điện tái tạo. NĐ 58/2025 NLTT; NĐ 57/2025 DPPA. Dự án điện không miễn ĐTM/GPMT chỉ vì nguồn tái tạo.</p>`},
{id:"qd21",t:"phi",k:"Quyết định",ttl:"QĐ 21/2025/QĐ-TTg phân loại xanh",b:`<p>04/07/2025, HL 22/08/2025. Tiêu chí xác nhận dự án xanh (tín dụng, trái phiếu xanh).</p>`}
,{id:"l146",t:"bvmt",k:"Luật sửa đổi",ttl:"Luật 146/2025/QH15 — sửa 15 luật nông nghiệp & môi trường",b:`<p>Ban hành 11/12/2025, có hiệu lực 01/01/2026. Đây là luật sửa đổi, bổ sung một số điều của 15 luật trong lĩnh vực nông nghiệp và môi trường, trong đó có Luật Bảo vệ môi trường.</p><p>Đối với LegalOS, văn bản này đặc biệt quan trọng khi đọc lại các quy định về thẩm quyền, thủ tục và tổ chức thực hiện trong bối cảnh chính quyền địa phương 2 cấp.</p>`}
,{id:"nd48",t:"bvmt",k:"Nghị định",ttl:"NĐ 48/2026/NĐ-CP — tiếp tục sửa NĐ 08/2022",b:`<p>Ban hành và có hiệu lực 29/01/2026. Nghị định sửa đổi NĐ 08/2022 sau khi NĐ 08 đã được NĐ 05/2025 sửa đổi.</p><p>Các điểm được Chính phủ giới thiệu gồm phân cấp lại một số thẩm quyền, thẩm định ĐTM, cấp/điều chỉnh GPMT, di sản thiên nhiên, xử lý ô nhiễm đất và hoạt động thanh tra BVMT. Đây là mắt xích bắt buộc phải kiểm tra khi dùng NĐ 08 trong năm 2026.</p>`}
,{id:"tt09",t:"bvmt",k:"Thông tư",ttl:"TT 09/2026/TT-BNNMT — sửa hướng dẫn Luật BVMT",b:`<p>Ban hành và có hiệu lực 29/01/2026. Thông tư sửa đổi, bổ sung TT 02/2022/TT-BTNMT đã được các thông tư năm 2025 sửa đổi.</p><p>Đây là văn bản nên kiểm tra khi sử dụng biểu mẫu/hướng dẫn thủ tục môi trường thay vì chỉ lấy mẫu từ TT 02/2022 bản ban đầu.</p>`}
,{id:"nq6619",t:"bvmt",k:"Nghị quyết",ttl:"NQ 66.19/2026/NQ-CP — đơn giản hóa TTHC lĩnh vực NN&MT",b:`<p>Ban hành và có hiệu lực 18/05/2026. Nghị quyết cắt giảm, phân quyền, đơn giản hóa thủ tục hành chính và điều kiện kinh doanh thuộc phạm vi quản lý của Bộ Nông nghiệp và Môi trường.</p><p>Thông tin trên Cổng văn bản Chính phủ xác nhận nghị quyết về cắt giảm, phân quyền, đơn giản hóa TTHC và điều kiện kinh doanh thuộc phạm vi quản lý của Bộ Nông nghiệp và Môi trường. Khi dùng cho ĐTM, GPMT hoặc thủ tục cụ thể, phải đọc trực tiếp văn bản gốc để xác định phạm vi và thời gian áp dụng.</p>`}
,{id:"nd217",t:"bvmt",k:"Nghị định",ttl:"NĐ 217/2025/NĐ-CP — hoạt động kiểm tra chuyên ngành",b:`<p>Ban hành và có hiệu lực 05/08/2025, quy định về hoạt động kiểm tra chuyên ngành. Trong lĩnh vực BVMT, đây là một căn cứ cần lưu ý cùng Điều 160 Luật BVMT đã được sửa đổi.</p>`}
,{id:"nd110",t:"thai",k:"Nghị định",ttl:"NĐ 110/2026/NĐ-CP — EPR",b:`<p>Ban hành 01/04/2026, có hiệu lực 25/05/2026. Quy định chi tiết thi hành một số điều của Luật BVMT về trách nhiệm tái chế sản phẩm, bao bì và trách nhiệm xử lý chất thải của nhà sản xuất, nhập khẩu.</p><p>Đây là văn bản trọng tâm để xác định đối tượng, tỷ lệ/quy cách tái chế bắt buộc và cơ chế thực hiện EPR trong giai đoạn hiện hành.</p>`}
,{id:"tt24epr",t:"thai",k:"Thông tư",ttl:"TT 24/2026/TT-BNNMT — hướng dẫn EPR",b:`<p>Ban hành và có hiệu lực 25/05/2026. Thông tư hướng dẫn chi tiết một số nội dung của NĐ 110/2026/NĐ-CP về trách nhiệm tái chế sản phẩm, bao bì và xử lý chất thải.</p>`}
,{id:"nd119",t:"knk",k:"Nghị định",ttl:"NĐ 119/2025/NĐ-CP — sửa NĐ 06/2022 về KNK & ô-dôn",b:`<p>Ban hành 09/06/2025, có hiệu lực 01/08/2025. Sửa đổi, bổ sung NĐ 06/2022/NĐ-CP về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn.</p><p>Từ 23/03/2026, cần đọc tiếp NĐ 83/2026/NĐ-CP vì văn bản này tiếp tục sửa hệ thống NĐ 06/2022 — NĐ 119/2025.</p>`}
,{id:"nd83",t:"knk",k:"Nghị định",ttl:"NĐ 83/2026/NĐ-CP — KNK & các chất được kiểm soát",b:`<p>Ban hành và có hiệu lực 23/03/2026, tiếp tục sửa NĐ 06/2022 đã được NĐ 119/2025 sửa đổi.</p><p>Theo giới thiệu của Chính phủ, một hướng sửa đổi quan trọng là đơn giản hóa thủ tục đăng ký sử dụng các chất làm suy giảm tầng ô-dôn, gây hiệu ứng nhà kính được kiểm soát, giảm thời gian xử lý và thành phần hồ sơ.</p>`}
,{id:"l147",t:"ks",k:"Luật sửa đổi",ttl:"Luật 147/2025/QH15 — sửa Luật Địa chất và khoáng sản",b:`<p>Ban hành 11/12/2025, có hiệu lực 01/01/2026. Luật sửa đổi, bổ sung một số điều của Luật Địa chất và khoáng sản 54/2024/QH15.</p><p>Khi xử lý dự án khoáng sản từ năm 2026 phải đọc Luật 54/2024 cùng Luật 147/2025, đồng thời đối chiếu nghĩa vụ môi trường theo hệ thống Luật BVMT.</p>`}

,
{id:"tt07_2025",t:"bvmt",k:"Thông tư",ttl:"TT 07/2025/TT-BTNMT — sửa TT 02/2022",b:`<p>Sửa đổi, bổ sung một số điều của TT 02/2022/TT-BTNMT về chi tiết thi hành Luật BVMT.</p><p><b>Vai trò:</b> phải đọc cùng TT 02/2022 và các sửa đổi sau đó khi sử dụng biểu mẫu, thủ tục và hướng dẫn nghiệp vụ.</p>`}
,
{id:"tt01_2023",t:"bvmt",k:"Thông tư",ttl:"TT 01/2023/TT-BTNMT — chất lượng môi trường xung quanh",b:`<p>Ban hành hệ quy chuẩn kỹ thuật quốc gia về chất lượng môi trường xung quanh, gồm chất lượng đất, không khí, nước mặt, nước dưới đất và nước biển.</p>`}
,
{id:"q03_2023",t:"bvmt",k:"QCVN",ttl:"QCVN 03:2023/BTNMT — chất lượng đất",b:`<p>Quy chuẩn kỹ thuật quốc gia về chất lượng đất, ban hành kèm TT 01/2023/TT-BTNMT.</p>`}
,
{id:"q08_2023",t:"nuoc",k:"QCVN",ttl:"QCVN 08:2023/BTNMT — chất lượng nước mặt",b:`<p>Quy chuẩn kỹ thuật quốc gia về chất lượng nước mặt; dùng cho quản lý, đánh giá và phân loại chất lượng môi trường nước mặt.</p>`}
,
{id:"q09_2023",t:"nuoc",k:"QCVN",ttl:"QCVN 09:2023/BTNMT — chất lượng nước dưới đất",b:`<p>Quy chuẩn kỹ thuật quốc gia về chất lượng nước dưới đất, ban hành kèm TT 01/2023/TT-BTNMT.</p>`}
,
{id:"q10_2023",t:"bien",k:"QCVN",ttl:"QCVN 10:2023/BTNMT — chất lượng nước biển",b:`<p>Quy chuẩn kỹ thuật quốc gia về chất lượng nước biển, ban hành kèm TT 01/2023/TT-BTNMT.</p>`}
,
{id:"tt05_2025",t:"nuoc",k:"Thông tư",ttl:"TT 05/2025/TT-BTNMT — nước thải sinh hoạt & đô thị",b:`<p>Ban hành QCVN 14:2025/BTNMT về nước thải sinh hoạt và nước thải đô thị, khu dân cư tập trung.</p>`}
,
{id:"q14_2025",t:"nuoc",k:"QCVN",ttl:"QCVN 14:2025/BTNMT — nước thải sinh hoạt & đô thị",b:`<p>Quy chuẩn kỹ thuật quốc gia về nước thải sinh hoạt và nước thải đô thị, khu dân cư tập trung; ban hành theo TT 05/2025/TT-BTNMT.</p>`}
,
{id:"tt06_2025",t:"nuoc",k:"Thông tư",ttl:"TT 06/2025/TT-BTNMT — nước thải công nghiệp",b:`<p>Ban hành QCVN 40:2025/BTNMT về nước thải công nghiệp.</p>`}
,
{id:"tt04_2025",t:"nuoc",k:"Thông tư",ttl:"TT 04/2025/TT-BTNMT — nước thải chăn nuôi",b:`<p>Ban hành QCVN 62:2025/BTNMT về nước thải chăn nuôi.</p>`}
,
{id:"q62_2025",t:"nuoc",k:"QCVN",ttl:"QCVN 62:2025/BTNMT — nước thải chăn nuôi",b:`<p>Quy chuẩn kỹ thuật quốc gia về nước thải chăn nuôi; thay hệ quy chuẩn cũ theo lộ trình của TT 04/2025/TT-BTNMT.</p>`}
,
{id:"tt01_2025_bnnmt",t:"khi",k:"Thông tư",ttl:"TT 01/2025/TT-BNNMT — tiếng ồn, độ rung, trầm tích",b:`<p>Ban hành 03 QCVN: QCVN 26:2025/BNNMT về tiếng ồn, QCVN 27:2025/BNNMT về độ rung và QCVN 43:2025/BNNMT về chất lượng trầm tích.</p>`}
,
{id:"q27_2025",t:"khi",k:"QCVN",ttl:"QCVN 27:2025/BNNMT — độ rung",b:`<p>Quy chuẩn kỹ thuật quốc gia về độ rung, ban hành theo TT 01/2025/TT-BNNMT.</p>`}
,
{id:"q43_2025",t:"bvmt",k:"QCVN",ttl:"QCVN 43:2025/BNNMT — chất lượng trầm tích",b:`<p>Quy chuẩn kỹ thuật quốc gia về chất lượng trầm tích, ban hành theo TT 01/2025/TT-BNNMT.</p>`}
,
{id:"tt45_2024",t:"khi",k:"Thông tư",ttl:"TT 45/2024/TT-BTNMT — khí thải công nghiệp",b:`<p>Ban hành QCVN 19:2024/BTNMT về khí thải công nghiệp.</p>`}
,
{id:"tt44_2025",t:"thai",k:"Thông tư",ttl:"TT 44/2025/TT-BNNMT — ngưỡng CTNH",b:`<p>Ban hành QCVN 07:2025/BNNMT về ngưỡng chất thải nguy hại.</p>`}
,
{id:"vbhn55_2026",t:"bvmt",k:"Văn bản hợp nhất",ttl:"55/VBHN-BNNMT (2026) — chi tiết Luật BVMT",b:`<p>Văn bản hợp nhất do Bộ Nông nghiệp và Môi trường ban hành để thuận tiện tra cứu hệ quy định chi tiết Luật BVMT sau các lần sửa đổi.</p>`}
,
{id:"nd53_2024",t:"nuoc",k:"Nghị định",ttl:"NĐ 53/2024/NĐ-CP — chi tiết Luật Tài nguyên nước",b:`<p>Quy định chi tiết thi hành một số điều của Luật Tài nguyên nước 2023.</p>`}
,
{id:"nd54_2024",t:"nuoc",k:"Nghị định",ttl:"NĐ 54/2024/NĐ-CP — khoan, cấp phép & tiền cấp quyền nước",b:`<p>Quy định hành nghề khoan nước dưới đất; kê khai, đăng ký, cấp phép, dịch vụ tài nguyên nước và tiền cấp quyền khai thác tài nguyên nước.</p>`}
,
{id:"tt03_2024",t:"nuoc",k:"Thông tư",ttl:"TT 03/2024/TT-BTNMT — chi tiết Luật Tài nguyên nước",b:`<p>Thông tư quy định chi tiết thi hành một số điều của Luật Tài nguyên nước.</p>`}
,
{id:"vbhn09_water",t:"nuoc",k:"Văn bản hợp nhất",ttl:"09/VBHN-BNNMT (2026) — chi tiết Luật Tài nguyên nước",b:`<p>Văn bản hợp nhất phục vụ tra cứu quy định chi tiết thi hành một số điều của Luật Tài nguyên nước.</p>`}
,
{id:"nd156_2018",t:"rung",k:"Nghị định",ttl:"NĐ 156/2018/NĐ-CP — chi tiết Luật Lâm nghiệp",b:`<p>Nghị định nền tảng quy định chi tiết thi hành một số điều của Luật Lâm nghiệp.</p>`}
,
{id:"nd91_2024",t:"rung",k:"Nghị định",ttl:"NĐ 91/2024/NĐ-CP — sửa NĐ 156/2018",b:`<p>Sửa đổi, bổ sung một số điều của NĐ 156/2018/NĐ-CP về chi tiết thi hành Luật Lâm nghiệp.</p>`}
,
{id:"nd227_2025",t:"rung",k:"Nghị định",ttl:"NĐ 227/2025/NĐ-CP — tiếp tục sửa NĐ 156/2018",b:`<p>Tiếp tục sửa đổi, bổ sung NĐ 156/2018/NĐ-CP trong lĩnh vực lâm nghiệp.</p>`}
,
{id:"vbhn68_forest",t:"rung",k:"Văn bản hợp nhất",ttl:"68/VBHN-VPQH (2026) — Luật Lâm nghiệp",b:`<p>Văn bản hợp nhất Luật Lâm nghiệp do Văn phòng Quốc hội ban hành.</p>`}
,
{id:"vbhn13_forest",t:"rung",k:"Văn bản hợp nhất",ttl:"13/VBHN-BNNMT (2026) — chi tiết Luật Lâm nghiệp",b:`<p>Văn bản hợp nhất quy định chi tiết thi hành một số điều của Luật Lâm nghiệp.</p>`}
,
{id:"vbhn74_forest",t:"rung",k:"Văn bản hợp nhất",ttl:"74/2026/VBHN-TT-BNNMT — thông tư lâm nghiệp & kiểm lâm",b:`<p>Văn bản hợp nhất các quy định chi tiết một số nội dung của Luật Lâm nghiệp và sửa đổi, bổ sung một số thông tư trong lĩnh vực lâm nghiệp, kiểm lâm.</p>`}
,
{id:"nd65_2010",t:"ddsh",k:"Nghị định",ttl:"NĐ 65/2010/NĐ-CP — chi tiết Luật Đa dạng sinh học",b:`<p>Quy định chi tiết và hướng dẫn thi hành một số điều của Luật Đa dạng sinh học.</p>`}
,
{id:"nd160_2013",t:"ddsh",k:"Nghị định",ttl:"NĐ 160/2013/NĐ-CP — loài ưu tiên bảo vệ",b:`<p>Quy định tiêu chí xác định loài và chế độ quản lý loài thuộc danh mục nguy cấp, quý, hiếm được ưu tiên bảo vệ.</p>`}
,
{id:"nd64_2019",t:"ddsh",k:"Nghị định",ttl:"NĐ 64/2019/NĐ-CP — sửa NĐ 160/2013",b:`<p>Sửa Điều 7 NĐ 160/2013/NĐ-CP về loài nguy cấp, quý, hiếm được ưu tiên bảo vệ.</p>`}
,
{id:"nd59_2017",t:"ddsh",k:"Nghị định",ttl:"NĐ 59/2017/NĐ-CP — tiếp cận nguồn gen & chia sẻ lợi ích",b:`<p>Quy định quản lý tiếp cận nguồn gen và chia sẻ lợi ích từ việc sử dụng nguồn gen.</p>`}
,
{id:"vbhn73_bio",t:"ddsh",k:"Văn bản hợp nhất",ttl:"73/VBHN-VPQH (2026) — Luật Đa dạng sinh học",b:`<p>Văn bản hợp nhất Luật Đa dạng sinh học do Văn phòng Quốc hội ban hành.</p>`}
,
{id:"vbhn28_bio",t:"ddsh",k:"Văn bản hợp nhất",ttl:"28/VBHN-BNNMT (2026) — hướng dẫn Luật Đa dạng sinh học",b:`<p>Văn bản hợp nhất quy định chi tiết và hướng dẫn thi hành một số điều của Luật Đa dạng sinh học.</p>`}
,
{id:"nd40_2016_sea",t:"bien",k:"Nghị định",ttl:"NĐ 40/2016/NĐ-CP — chi tiết Luật TNMT biển & hải đảo",b:`<p>Quy định chi tiết thi hành một số điều của Luật Tài nguyên, môi trường biển và hải đảo.</p>`}
,
{id:"nd11_2021_sea",t:"bien",k:"Nghị định",ttl:"NĐ 11/2021/NĐ-CP — giao khu vực biển",b:`<p>Quy định việc giao các khu vực biển nhất định cho tổ chức, cá nhân khai thác, sử dụng tài nguyên biển.</p>`}
,
{id:"nd65_2025_sea",t:"bien",k:"Nghị định",ttl:"NĐ 65/2025/NĐ-CP — sửa NĐ 40/2016 & NĐ 11/2021",b:`<p>Sửa đổi, bổ sung các quy định về Luật TNMT biển và hải đảo và cơ chế giao khu vực biển.</p>`}
,
{id:"vbhn99_sea",t:"bien",k:"Văn bản hợp nhất",ttl:"99/VBHN-VPQH (2026) — Luật TNMT biển & hải đảo",b:`<p>Văn bản hợp nhất Luật Tài nguyên, môi trường biển và hải đảo.</p>`}
,
{id:"vbhn24_sea",t:"bien",k:"Văn bản hợp nhất",ttl:"24/VBHN-BNNMT (2026) — chi tiết Luật TNMT biển & hải đảo",b:`<p>Văn bản hợp nhất quy định chi tiết thi hành một số điều của Luật Tài nguyên, môi trường biển và hải đảo.</p>`}
,
{id:"nd26_2019_fish",t:"bien",k:"Nghị định",ttl:"NĐ 26/2019/NĐ-CP — chi tiết Luật Thủy sản",b:`<p>Quy định chi tiết một số điều và biện pháp thi hành Luật Thủy sản.</p>`}
,
{id:"nd37_2024_fish",t:"bien",k:"Nghị định",ttl:"NĐ 37/2024/NĐ-CP — sửa NĐ 26/2019",b:`<p>Sửa đổi, bổ sung một số điều của NĐ 26/2019/NĐ-CP về thi hành Luật Thủy sản.</p>`}
,
{id:"nd309_2025_fish",t:"bien",k:"Nghị định",ttl:"NĐ 309/2025/NĐ-CP — tiếp tục sửa NĐ 26/2019",b:`<p>Tiếp tục sửa đổi NĐ 26/2019/NĐ-CP sau NĐ 37/2024 trong lĩnh vực thủy sản.</p>`}
,
{id:"vbhn91_fish",t:"bien",k:"Văn bản hợp nhất",ttl:"91/VBHN-VPQH (2026) — Luật Thủy sản",b:`<p>Văn bản hợp nhất Luật Thủy sản do Văn phòng Quốc hội ban hành.</p>`}
,
{id:"nd102_2024_land",t:"dat",k:"Nghị định",ttl:"NĐ 102/2024/NĐ-CP — chi tiết Luật Đất đai",b:`<p>Quy định chi tiết thi hành một số điều của Luật Đất đai 2024.</p>`}
,
{id:"nd103_2024_land",t:"dat",k:"Nghị định",ttl:"NĐ 103/2024/NĐ-CP — tiền sử dụng đất, tiền thuê đất",b:`<p>Quy định về tiền sử dụng đất và tiền thuê đất.</p>`}
,
{id:"nd104_2024_land",t:"dat",k:"Nghị định",ttl:"NĐ 104/2024/NĐ-CP — Quỹ phát triển đất",b:`<p>Quy định về Quỹ phát triển đất.</p>`}
,
{id:"nd88_2024_land",t:"dat",k:"Nghị định",ttl:"NĐ 88/2024/NĐ-CP — bồi thường, hỗ trợ, tái định cư",b:`<p>Quy định về bồi thường, hỗ trợ, tái định cư khi Nhà nước thu hồi đất.</p>`}
,
{id:"nd71_2024_land",t:"dat",k:"Nghị định",ttl:"NĐ 71/2024/NĐ-CP — giá đất",b:`<p>Quy định về giá đất.</p>`}
,
{id:"nd151_2025_land",t:"dat",k:"Nghị định",ttl:"NĐ 151/2025/NĐ-CP — phân quyền lĩnh vực đất đai",b:`<p>Quy định phân định thẩm quyền chính quyền địa phương 2 cấp, phân quyền và phân cấp trong lĩnh vực đất đai.</p>`}
,
{id:"nd226_2025_land",t:"dat",k:"Nghị định",ttl:"NĐ 226/2025/NĐ-CP — sửa các nghị định Luật Đất đai",b:`<p>Sửa đổi, bổ sung một số điều của các nghị định quy định chi tiết thi hành Luật Đất đai.</p>`}
,
{id:"nd291_2025_land",t:"dat",k:"Nghị định",ttl:"NĐ 291/2025/NĐ-CP — sửa NĐ 103/2024 & NĐ 104/2024",b:`<p>Sửa đổi quy định về tiền sử dụng đất, tiền thuê đất và Quỹ phát triển đất.</p>`}
,
{id:"vbhn133_land",t:"dat",k:"Văn bản hợp nhất",ttl:"133/VBHN-VPQH (2025) — Luật Đất đai",b:`<p>Văn bản hợp nhất Luật Đất đai do Văn phòng Quốc hội ban hành.</p>`}
,
{id:"vbhn46_land",t:"dat",k:"Văn bản hợp nhất",ttl:"46/VBHN-BNNMT (2026) — chi tiết Luật Đất đai",b:`<p>Văn bản hợp nhất quy định chi tiết thi hành một số điều của Luật Đất đai.</p>`}
,
{id:"nq29_2026_land",t:"dat",k:"Nghị quyết",ttl:"NQ 29/2026/QH16 — cơ chế xử lý vướng mắc đất đai",b:`<p>Cơ chế, chính sách đặc thù xử lý vi phạm pháp luật đất đai xảy ra trước khi Luật Đất đai 2024 có hiệu lực và tháo gỡ khó khăn cho dự án tồn đọng, kéo dài.</p>`}
,
{id:"l90_2015_kttv",t:"kttv",k:"Luật",ttl:"Luật Khí tượng thủy văn 2015 (90/2015/QH13)",b:`<p>Luật khung về hoạt động khí tượng thủy văn, quan trắc, dự báo, cảnh báo và quản lý thông tin dữ liệu KTTV.</p>`}
,
{id:"nd38_2016_kttv",t:"kttv",k:"Nghị định",ttl:"NĐ 38/2016/NĐ-CP — chi tiết Luật KTTV",b:`<p>Quy định chi tiết một số điều của Luật Khí tượng thủy văn.</p>`}
,
{id:"nd113_2026_kttv",t:"kttv",k:"Nghị định",ttl:"NĐ 113/2026/NĐ-CP — sửa hệ NĐ 38/2016 về KTTV",b:`<p>Sửa đổi, bổ sung NĐ 38/2016/NĐ-CP sau các lần sửa trước, cập nhật hệ thống thi hành Luật Khí tượng thủy văn.</p>`}
,
{id:"vbhn88_kttv",t:"kttv",k:"Văn bản hợp nhất",ttl:"88/VBHN-VPQH (2026) — Luật Khí tượng thủy văn",b:`<p>Văn bản hợp nhất Luật Khí tượng thủy văn.</p>`}
,
{id:"l33_2013_disaster",t:"thientai",k:"Luật",ttl:"Luật Phòng, chống thiên tai 2013 (33/2013/QH13)",b:`<p>Luật khung về phòng ngừa, ứng phó và khắc phục hậu quả thiên tai.</p>`}
,
{id:"l60_2020_disaster",t:"thientai",k:"Luật sửa đổi",ttl:"Luật 60/2020/QH14 — sửa Luật PCTT & Luật Đê điều",b:`<p>Sửa đổi, bổ sung một số điều của Luật Phòng, chống thiên tai và Luật Đê điều.</p>`}
,
{id:"nd66_2021_disaster",t:"thientai",k:"Nghị định",ttl:"NĐ 66/2021/NĐ-CP — chi tiết Luật PCTT",b:`<p>Quy định chi tiết thi hành một số điều của Luật Phòng, chống thiên tai và luật sửa đổi năm 2020.</p>`}
,
{id:"vbhn85_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"85/VBHN-VPQH (2026) — Luật Phòng, chống thiên tai",b:`<p>Văn bản hợp nhất Luật Phòng, chống thiên tai.</p>`}
,
{id:"vbhn29_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"29/VBHN-BNNMT (2026) — chi tiết Luật PCTT",b:`<p>Văn bản hợp nhất quy định chi tiết thi hành Luật Phòng, chống thiên tai và luật sửa đổi liên quan.</p>`}
,
{id:"l08_2017_irrigation",t:"thuyloi",k:"Luật",ttl:"Luật Thủy lợi 2017 (08/2017/QH14)",b:`<p>Luật khung về hoạt động thủy lợi, công trình thủy lợi, dịch vụ thủy lợi và bảo vệ công trình.</p>`}
,
{id:"nd67_2018_irrigation",t:"thuyloi",k:"Nghị định",ttl:"NĐ 67/2018/NĐ-CP — chi tiết Luật Thủy lợi",b:`<p>Quy định chi tiết một số điều của Luật Thủy lợi.</p>`}
,
{id:"nd40_2023_irrigation",t:"thuyloi",k:"Nghị định",ttl:"NĐ 40/2023/NĐ-CP — sửa NĐ 67/2018",b:`<p>Sửa đổi, bổ sung một số điều của NĐ 67/2018/NĐ-CP về thi hành Luật Thủy lợi.</p>`}
,
{id:"vbhn94_irrigation",t:"thuyloi",k:"Văn bản hợp nhất",ttl:"94/VBHN-VPQH (2026) — Luật Thủy lợi",b:`<p>Văn bản hợp nhất Luật Thủy lợi.</p>`}
,
{id:"nd11_2025_mineral",t:"ks",k:"Nghị định",ttl:"NĐ 11/2025/NĐ-CP — khai thác khoáng sản nhóm IV",b:`<p>Quy định chi tiết một số điều của Luật Địa chất và khoáng sản về khai thác khoáng sản nhóm IV.</p>`}
,
{id:"nd193_2025_mineral",t:"ks",k:"Nghị định",ttl:"NĐ 193/2025/NĐ-CP — chi tiết Luật Địa chất & khoáng sản",b:`<p>Quy định chi tiết một số điều và biện pháp thi hành Luật Địa chất và khoáng sản.</p>`}
,
{id:"nd21_2026_mineral",t:"ks",k:"Nghị định",ttl:"NĐ 21/2026/NĐ-CP — sửa NĐ 193/2025",b:`<p>Sửa NĐ 193/2025/NĐ-CP và quy định chi tiết Luật 147/2025 sửa Luật Địa chất và khoáng sản.</p>`}
,
{id:"nq664_2025_mineral",t:"ks",k:"Nghị quyết",ttl:"NQ 66.4/2025/NQ-CP — cơ chế đặc thù địa chất & khoáng sản",b:`<p>Ban hành cơ chế, chính sách đặc thù nhằm tháo gỡ khó khăn trong triển khai Luật Địa chất và khoáng sản 2024.</p>`}
,
{id:"vbhn21_mineral",t:"ks",k:"Văn bản hợp nhất",ttl:"21/VBHN-BNNMT (2026) — chi tiết Luật Địa chất & khoáng sản",b:`<p>Văn bản hợp nhất nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Địa chất và khoáng sản.</p>`}
,
{id:"nd24_2026_chem",t:"hc",k:"Nghị định",ttl:"NĐ 24/2026/NĐ-CP — danh mục hóa chất",b:`<p>Quy định các danh mục hóa chất thuộc phạm vi điều chỉnh của Luật Hóa chất 2025.</p>`}
,
{id:"nd25_2026_chem",t:"hc",k:"Nghị định",ttl:"NĐ 25/2026/NĐ-CP — công nghiệp hóa chất & an toàn, an ninh",b:`<p>Quy định chi tiết Luật Hóa chất về phát triển ngành công nghiệp hóa chất và an toàn, an ninh hóa chất.</p>`}
,
{id:"nd26_2026_chem",t:"hc",k:"Nghị định",ttl:"NĐ 26/2026/NĐ-CP — quản lý hoạt động hóa chất",b:`<p>Quy định chi tiết Luật Hóa chất về quản lý hoạt động hóa chất và hóa chất nguy hiểm trong sản phẩm, hàng hóa.</p>`}
,
{id:"tt01_2026_bct",t:"hc",k:"Thông tư",ttl:"TT 01/2026/TT-BCT — hướng dẫn NĐ 26/2026",b:`<p>Quy định chi tiết và hướng dẫn thi hành Luật Hóa chất và NĐ 26/2026/NĐ-CP về quản lý hoạt động hóa chất.</p>`}
,
{id:"tt02_2026_bct",t:"hc",k:"Thông tư",ttl:"TT 02/2026/TT-BCT — hướng dẫn NĐ 25/2026",b:`<p>Quy định biện pháp thi hành Luật Hóa chất và NĐ 25/2026/NĐ-CP về công nghiệp hóa chất, an toàn và an ninh hóa chất.</p>`}
,
{id:"vbhn33_chem",t:"hc",k:"Văn bản hợp nhất",ttl:"33/VBHN-BCT (2026) — thi hành Luật Hóa chất & NĐ 25/2026",b:`<p>Văn bản hợp nhất các biện pháp thi hành Luật Hóa chất và NĐ 25/2026/NĐ-CP.</p>`}
,
{id:"nd57_2025_power",t:"dl",k:"Nghị định",ttl:"NĐ 57/2025/NĐ-CP — mua bán điện trực tiếp (DPPA)",b:`<p>Quy định cơ chế mua bán điện trực tiếp giữa đơn vị phát điện năng lượng tái tạo và khách hàng sử dụng điện lớn.</p>`}
,
{id:"nd58_2025_power",t:"dl",k:"Nghị định",ttl:"NĐ 58/2025/NĐ-CP — điện NLTT & năng lượng mới",b:`<p>Quy định chi tiết Luật Điện lực về phát triển điện năng lượng tái tạo và điện năng lượng mới.</p>`}
,
{id:"nd243_2026_power",t:"dl",k:"Nghị định",ttl:"NĐ 243/2026/NĐ-CP — sửa NĐ 57 & 58/2025",b:`<p>Sửa đổi, bổ sung cơ chế DPPA và quy định phát triển điện năng lượng tái tạo, năng lượng mới.</p>`}
,
{id:"l10_2026_oil",t:"dl",k:"Luật",ttl:"Luật Dầu khí 2026 (10/2026/QH16)",b:`<p>Luật Dầu khí mới được Quốc hội ban hành ngày 23/08/2026; có hiệu lực từ 01/03/2027.</p>`}
,
{id:"qd13_2024_ghg",t:"knk",k:"Quyết định",ttl:"QĐ 13/2024/QĐ-TTg — danh mục cơ sở kiểm kê KNK",b:`<p>Ban hành danh mục lĩnh vực, cơ sở phát thải khí nhà kính phải thực hiện kiểm kê khí nhà kính (cập nhật).</p>`}
,
{id:"qd232_2025_carbon",t:"knk",k:"Quyết định",ttl:"QĐ 232/QĐ-TTg (2025) — Đề án thị trường các-bon",b:`<p>Phê duyệt Đề án thành lập và phát triển thị trường các-bon tại Việt Nam.</p>`}
,
{id:"nq235_2026_paris",t:"knk",k:"Nghị quyết",ttl:"NQ 235/NQ-CP (2026) — Thỏa thuận Điều 6 Paris Việt Nam–Singapore",b:`<p>Phê duyệt Thỏa thuận thực hiện theo Điều 6 Thỏa thuận Paris giữa Chính phủ Việt Nam và Chính phủ Singapore.</p>`}
,
{id:"vbhn11_climate",t:"knk",k:"Văn bản hợp nhất",ttl:"11/VBHN-BNNMT (2025) — ứng phó biến đổi khí hậu",b:`<p>Văn bản hợp nhất quy định chi tiết thi hành Luật BVMT về ứng phó với biến đổi khí hậu.</p>`}
,
{id:"nd23_2026_water",t:"nuoc",k:"Nghị định",ttl:"NĐ 23/2026/NĐ-CP — sửa các nghị định lĩnh vực tài nguyên nước",b:`<p>Sửa đổi, bổ sung một số điều của các nghị định trong lĩnh vực tài nguyên nước. Khi xử lý thủ tục khai thác, sử dụng nước hoặc nghĩa vụ liên quan, cần đọc cùng Luật Tài nguyên nước 2023 và các nghị định nền đã được sửa.</p>`},
{id:"tt06_2026_water",t:"nuoc",k:"Thông tư",ttl:"TT 06/2026/TT-BNNMT — sửa các thông tư lĩnh vực tài nguyên nước",b:`<p>Sửa đổi, bổ sung một số điều của các thông tư trong lĩnh vực tài nguyên nước, có hiệu lực ngay ngày ban hành 17/01/2026.</p>`},
{id:"vbhn10_water_inspection",t:"nuoc",k:"Văn bản hợp nhất",ttl:"10/VBHN-BNNMT (2026) — kiểm tra chấp hành pháp luật tài nguyên nước",b:`<p>Văn bản hợp nhất phục vụ đọc thuận tiện quy định về kiểm tra chấp hành pháp luật tài nguyên nước và thẩm định, nghiệm thu kết quả hoạt động điều tra cơ bản tài nguyên nước.</p>`},
{id:"tt22_2026_admin",t:"bvmt",k:"Thông tư",ttl:"TT 22/2026/TT-BNNMT — phân cấp, cắt giảm và đơn giản hóa TTHC",b:`<p>Sửa đổi, bổ sung một số thông tư liên quan phân cấp, cắt giảm, đơn giản hóa thủ tục hành chính thuộc phạm vi quản lý nhà nước của Bộ Nông nghiệp và Môi trường.</p>`},
{id:"tt32_2026_bnnmt",t:"bvmt",k:"Thông tư",ttl:"TT 32/2026/TT-BNNMT — bãi bỏ toàn bộ hoặc một phần một số VBQPPL",b:`<p>Văn bản bãi bỏ toàn bộ hoặc một phần một số văn bản quy phạm pháp luật thuộc thẩm quyền ban hành của Bộ trưởng Bộ Nông nghiệp và Môi trường. Có hiệu lực từ 18/09/2026 nên cần kiểm tra khi dùng các thông tư cũ sau mốc này.</p>`},
{id:"nd41_2026_fish",t:"bien",k:"Nghị định",ttl:"NĐ 41/2026/NĐ-CP — chi tiết và biện pháp thi hành Luật Thủy sản",b:`<p>Quy định chi tiết một số điều và biện pháp thi hành Luật Thủy sản. Đây là một văn bản nền quan trọng khi xử lý hoạt động thủy sản trong năm 2026.</p>`},
{id:"tt16_2026_fish",t:"bien",k:"Thông tư",ttl:"TT 16/2026/TT-BNNMT — giống, thức ăn và sản phẩm xử lý môi trường NTTS",b:`<p>Quy định về quản lý giống thủy sản, thức ăn thủy sản và sản phẩm xử lý môi trường nuôi trồng thủy sản.</p>`},
{id:"tt17_2026_fish",t:"bien",k:"Thông tư",ttl:"TT 17/2026/TT-BNNMT — đánh giá rủi ro, cấp phép thủy sản sống nhập khẩu",b:`<p>Sửa đổi hướng dẫn đánh giá rủi ro và cấp phép thủy sản sống nhập khẩu; cần đọc cùng chuỗi thông tư đã được sửa đổi trước đó.</p>`},
{id:"vbhn71_fish",t:"bien",k:"Văn bản hợp nhất",ttl:"71/VBHN-BNNMT (2026) — thủy sản sống nhập khẩu",b:`<p>Văn bản hợp nhất giúp đọc thuận tiện quy định về đánh giá rủi ro và cấp phép thủy sản sống nhập khẩu sau các lần sửa đổi.</p>`},
{id:"vbhn79_fish",t:"bien",k:"Văn bản hợp nhất",ttl:"79/2026/VBHN-TT-BNNMT — bảo vệ và phát triển nguồn lợi thủy sản",b:`<p>Văn bản hợp nhất hệ quy định hướng dẫn về bảo vệ và phát triển nguồn lợi thủy sản.</p>`},
{id:"vbhn80_fish",t:"bien",k:"Văn bản hợp nhất",ttl:"80/2026/VBHN-TT-BNNMT — nhật ký khai thác, cảng cá, nguồn gốc và IUU",b:`<p>Văn bản hợp nhất phục vụ tra cứu các nội dung về nhật ký khai thác, kiểm tra tàu, giám sát sản lượng tại cảng và xác nhận, chứng nhận nguồn gốc thủy sản khai thác.</p>`},
{id:"tt08_2026_irrig",t:"thuyloi",k:"Thông tư",ttl:"TT 08/2026/TT-BNNMT — quy định chi tiết một số điều của Luật Thủy lợi",b:`<p>Quy định chi tiết một số điều của Luật Thủy lợi; có hiệu lực từ 26/01/2026.</p>`},
{id:"nd53_2026_disaster",t:"thientai",k:"Nghị định",ttl:"NĐ 53/2026/NĐ-CP — sửa các nghị định về đê điều và phòng, chống thiên tai",b:`<p>Sửa đổi, bổ sung một số điều của các nghị định trong lĩnh vực đê điều và phòng, chống thiên tai; có hiệu lực từ ngày ban hành 05/02/2026.</p>`},
{id:"nd183_2026_disaster",t:"thientai",k:"Nghị định",ttl:"NĐ 183/2026/NĐ-CP — sửa xử phạt PCTT, thủy lợi và đê điều",b:`<p>Sửa đổi NĐ 03/2022/NĐ-CP về xử phạt vi phạm hành chính trong lĩnh vực phòng, chống thiên tai, thủy lợi và đê điều; hiệu lực 10/07/2026.</p>`},
{id:"vbhn68_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"68/VBHN-BNNMT (2026) — xử phạt PCTT, thủy lợi và đê điều",b:`<p>Văn bản hợp nhất phục vụ tra cứu thuận tiện khung xử phạt hành chính trong lĩnh vực phòng, chống thiên tai, thủy lợi và đê điều.</p>`},
{id:"vbhn33_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"33/VBHN-BNNMT (2026) — kế hoạch phòng, chống thiên tai địa phương",b:`<p>Văn bản hợp nhất hướng dẫn xây dựng và tổ chức thực hiện kế hoạch phòng, chống thiên tai ở địa phương.</p>`},
{id:"vbhn34_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"34/VBHN-BNNMT (2026) — yêu cầu PCTT trong khai thác và hạ tầng",b:`<p>Văn bản hợp nhất về yêu cầu phòng, chống thiên tai trong quản lý, vận hành, sử dụng khu khai thác khoáng sản, đô thị, công nghiệp, giao thông, điện lực và hạ tầng liên quan.</p>`},
{id:"vbhn30_disaster",t:"thientai",k:"Văn bản hợp nhất",ttl:"30/VBHN-BNNMT (2026) — Quỹ phòng, chống thiên tai",b:`<p>Văn bản hợp nhất giúp tra cứu quy định liên quan đến Quỹ phòng, chống thiên tai.</p>`},
{id:"vbhn50_kttv",t:"kttv",k:"Văn bản hợp nhất",ttl:"50/VBHN-BNNMT (2026) — chi tiết Luật Khí tượng thủy văn",b:`<p>Văn bản hợp nhất quy định chi tiết một số điều của Luật Khí tượng thủy văn, phục vụ đọc thuận tiện sau các lần sửa đổi.</p>`},
{id:"tt84_2025_forest",t:"rung",k:"Thông tư",ttl:"TT 84/2025/TT-BNNMT — chi tiết Luật Lâm nghiệp và sửa thông tư lâm nghiệp, kiểm lâm",b:`<p>Ban hành cuối năm 2025 và có hiệu lực 01/01/2026; quy định chi tiết một số nội dung của Luật Lâm nghiệp và sửa đổi, bổ sung một số thông tư trong lĩnh vực lâm nghiệp và kiểm lâm.</p>`},
{id:"vbhn41_land_2026",t:"dat",k:"Văn bản hợp nhất",ttl:"41/VBHN-BNNMT (2026) — thẩm quyền chính quyền địa phương 2 cấp trong đất đai",b:`<p>Văn bản hợp nhất về phân định thẩm quyền của chính quyền địa phương 2 cấp, phân quyền và phân cấp trong lĩnh vực đất đai.</p>`},
{id:"vbhn73_land_2026",t:"dat",k:"Văn bản hợp nhất",ttl:"73/2026/VBHN-NĐ-BNNMT — xử phạt vi phạm hành chính đất đai",b:`<p>Văn bản hợp nhất quy định về xử phạt vi phạm hành chính trong lĩnh vực đất đai; ban hành 27/07/2026.</p>`},
{id:"nd50_2026_land",t:"dat",k:"Nghị định",ttl:"NĐ 50/2026/NĐ-CP — tiền sử dụng đất, tiền thuê đất theo NQ 254/2025/QH15",b:`<p>Quy định chi tiết một số cơ chế, chính sách tháo gỡ khó khăn, vướng mắc trong tổ chức thi hành Luật Đất đai về tiền sử dụng đất và tiền thuê đất.</p>`},
{id:"tt19_2026_land",t:"dat",k:"Thông tư",ttl:"TT 19/2026/TT-BNNMT — đo đạc địa chính, đăng ký đất đai và CSDL đất đai",b:`<p>Quy định kỹ thuật thực hiện lồng ghép đo đạc lập bản đồ địa chính, đăng ký đất đai, lập hồ sơ địa chính và xây dựng cơ sở dữ liệu quốc gia về đất đai.</p>`},
{id:"nq229_land",t:"dat",k:"Nghị quyết",ttl:"NQ 229/NQ-CP (2026) — kế hoạch thực hiện định hướng sửa Luật Đất đai",b:`<p>Ban hành Kế hoạch của Chính phủ thực hiện định hướng sửa đổi Luật Đất đai và các luật có liên quan. Đây là văn bản kế hoạch/chính sách cần theo dõi để dự báo thay đổi, không tự nó thay thế điều kiện pháp lý cụ thể đang có hiệu lực.</p>`},
{id:"nq208_env",t:"bvmt",k:"Nghị quyết",ttl:"NQ 208/NQ-CP (2026) — chương trình hành động về BVMT và ứng phó BĐKH",b:`<p>Ban hành Chương trình hành động của Chính phủ về bảo vệ môi trường và chủ động ứng phó với biến đổi khí hậu trong thời kỳ mới. Dùng để theo dõi định hướng chính sách và nhiệm vụ triển khai, không dùng thay điều kiện cụ thể của Luật, nghị định, thông tư.</p>`},
{id:"vbhn69_rareearth",t:"ks",k:"Văn bản hợp nhất",ttl:"69/VBHN-BNNMT (2026) — kỹ thuật điều tra, đánh giá, thăm dò khoáng sản đất hiếm",b:`<p>Văn bản hợp nhất phục vụ tra cứu quy định kỹ thuật trong điều tra, đánh giá và thăm dò khoáng sản đất hiếm.</p>`},
{id:"tt37_2026_bct",t:"hc",k:"Thông tư",ttl:"TT 37/2026/TT-BCT — sửa QCVN formaldehyt/azo, thủy ngân trong đèn, chì trong sơn",b:`<p>Ban hành các sửa đổi 01:2026 đối với một số quy chuẩn kỹ thuật quốc gia về hóa chất và giới hạn chất nguy hại trong sản phẩm dệt may, đèn huỳnh quang và sơn.</p>`},
{id:"tt38_2026_bct",t:"hc",k:"Thông tư",ttl:"TT 38/2026/TT-BCT — sửa QCVN NaOH, PAC và amôniắc công nghiệp",b:`<p>Ban hành sửa đổi 01:2026 đối với các quy chuẩn kỹ thuật quốc gia về chất lượng Natri hydroxit công nghiệp, Poly aluminium chloride và amôniắc công nghiệp.</p>`}
,{id:"vbhn98",t:"bvmt",k:"Văn bản hợp nhất",ttl:"98/VBHN-VPQH (2026) — hợp nhất Luật Bảo vệ môi trường",b:`<p>Ban hành ngày 10/04/2026 bởi Văn phòng Quốc hội. Đây là bản hợp nhất dùng để tra cứu của Luật Bảo vệ môi trường 72/2020/QH14 sau các lần sửa đổi, trong đó có Luật 146/2025/QH15.</p><p><b>Cách dùng:</b> ưu tiên khi cần đọc nội dung Điều của Luật BVMT theo trạng thái hợp nhất năm 2026; khi viện dẫn chính thức vẫn phải truy được luật gốc và luật sửa đổi.</p>`}
,{id:"vbhn49",t:"bvmt",k:"Văn bản hợp nhất",ttl:"49/VBHN-BNNMT (2026) — hợp nhất NĐ 08/2022 và các sửa đổi",b:`<p>Ban hành 17/04/2026. PDF chính thức thể hiện NĐ 08/2022/NĐ-CP sau sửa đổi bởi NĐ 05/2025/NĐ-CP, NĐ 48/2026/NĐ-CP và các nội dung sửa đổi liên quan từ NĐ 110/2026/NĐ-CP.</p><p><b>Giá trị sử dụng:</b> văn bản nên mở trước cho tiêu chí phân nhóm, ĐTM, GPMT, quản lý chất thải và các quy định chi tiết của NĐ 08 trong năm 2026. VBHN không tạo quy phạm mới.</p>`}
,{id:"vbhn55",t:"bvmt",k:"Văn bản hợp nhất",ttl:"55/VBHN-BNNMT (2026) — hợp nhất TT 02/2022 và các sửa đổi",b:`<p>Ban hành 01/06/2026. PDF chính thức thể hiện TT 02/2022/TT-BTNMT sau các sửa đổi bởi TT 07/2025/TT-BTNMT, TT 09/2026/TT-BNNMT và TT 22/2026/TT-BNNMT.</p><p><b>Giá trị sử dụng:</b> ưu tiên khi tra hướng dẫn nghiệp vụ, biểu mẫu và quy định chi tiết thuộc phạm vi thông tư trong năm 2026.</p>`}

];


/* ===== Bổ sung nguồn chính thức 10/09/2026 ===== */
const OFFICIAL_UPDATE_PACK_20260910=[
 {id:"l43_2024_land",t:"dat",k:"Luật sửa đổi",ttl:"Luật 43/2024/QH15 — sửa Luật Đất đai và 3 luật liên quan",b:`<p>Ban hành 29/06/2024, hiệu lực 01/08/2024. Sửa đổi, bổ sung một số điều của Luật Đất đai 31/2024/QH15, Luật Nhà ở, Luật Kinh doanh bất động sản và Luật Các tổ chức tín dụng.</p>`},
 {id:"vbhn37_2026_dike",t:"thuyloi",k:"Văn bản hợp nhất",ttl:"37/VBHN-BNNMT (2026) — hướng dẫn Luật Đê điều",b:`<p>Văn bản hợp nhất ngày 27/03/2026 về quy định chi tiết và hướng dẫn thi hành một số điều của Luật Đê điều.</p>`},
 {id:"vbhn77_2026_remote",t:"dat",k:"Văn bản hợp nhất",ttl:"77/2026/VBHN-NĐ-BNNMT — hoạt động viễn thám",b:`<p>Văn bản hợp nhất ngày 25/08/2026 về hoạt động viễn thám, phục vụ nhóm dữ liệu tài nguyên và giám sát không gian.</p>`},
 {id:"tt27_2026_risk",t:"bvmt",k:"Thông tư",ttl:"TT 27/2026/TT-BNNMT — danh mục sản phẩm, hàng hóa theo mức độ rủi ro",b:`<p>Ban hành 30/06/2026, hiệu lực 01/07/2026. Ban hành danh mục sản phẩm, hàng hóa có mức độ rủi ro trung bình và cao thuộc trách nhiệm quản lý của Bộ Nông nghiệp và Môi trường.</p>`},
 {id:"tt28_2026_pesticide",t:"hc",k:"Thông tư",ttl:"TT 28/2026/TT-BNNMT — sửa danh mục thuốc bảo vệ thực vật",b:`<p>Ban hành 30/06/2026, hiệu lực 15/08/2026. Sửa đổi danh mục thuốc bảo vệ thực vật được phép sử dụng và danh mục cấm sử dụng tại Việt Nam.</p>`},
 {id:"nd35_2025_bnnmt",t:"bvmt",k:"Nghị định",ttl:"NĐ 35/2025/NĐ-CP — tổ chức Bộ Nông nghiệp và Môi trường",b:`<p>Ban hành 25/02/2025, hiệu lực 01/03/2025. Quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Nông nghiệp và Môi trường.</p>`},
 {id:"tt21_2026_expertise",t:"bvmt",k:"Thông tư",ttl:"TT 21/2026/TT-BNNMT — giám định tư pháp lĩnh vực nông nghiệp & môi trường",b:`<p>Ban hành 24/04/2026, hiệu lực 01/05/2026. Quy định chi tiết một số nội dung của Luật Giám định tư pháp trong lĩnh vực nông nghiệp và môi trường.</p>`}
];
OFFICIAL_UPDATE_PACK_20260910.forEach(x=>{if(!D.some(d=>d.id===x.id))D.push(x)});

const LONG_SUMMARY={
 l72:`<div class="long-summary"><section class="summary-block"><h3>Vai trò của Luật</h3><p>Luật Bảo vệ môi trường 2020 là trục pháp lý nền của LegalOS. Luật tổ chức hệ thống quản lý môi trường theo vòng đời dự án/cơ sở: phân nhóm dự án, đánh giá tác động môi trường, giấy phép môi trường, đăng ký môi trường, quản lý chất thải, quan trắc, trách nhiệm tái chế/xử lý của nhà sản xuất nhập khẩu và quản lý khí nhà kính.</p><p>Từ 01/01/2026, khi đọc Luật cần đặt cạnh Luật 146/2025/QH15 vì một số điều và thẩm quyền trong lĩnh vực nông nghiệp và môi trường đã được sửa đổi.</p></section><section class="summary-block"><h3>Cách dùng khi xử lý hồ sơ</h3><p>Không nên bắt đầu bằng việc hỏi một dự án “bao nhiêu tấn/năm thì thuộc nhóm nào”. Trước hết phải xác định loại hình, giai đoạn, vị trí, quy mô, yếu tố nhạy cảm và nguồn thải; sau đó mới đối chiếu Luật với NĐ 08/2022 cùng các nghị định sửa đổi và phụ lục hiện hành.</p></section><section class="summary-block"><h3>Điểm phải kiểm tra tiếp</h3><p>Luật chỉ là tầng khung. Hồ sơ thực tế thường cần đọc thêm NĐ 08/2022, NĐ 05/2025, NĐ 48/2026, thông tư hướng dẫn và các QCVN chuyên ngành. Với thủ tục năm 2026 còn phải lưu ý cơ chế TTHC có thời hạn nếu thuộc phạm vi áp dụng.</p></section></div>`,
 nd08:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>NĐ 08/2022/NĐ-CP là nghị định chi tiết trọng yếu của Luật BVMT, chứa nhiều tiêu chí, phụ lục và quy định nghiệp vụ mà người làm hồ sơ phải sử dụng. Đây là nơi LegalOS tra các nhánh như phân nhóm dự án, ĐTM, GPMT, quản lý chất thải và quan trắc.</p></section><section class="summary-block"><h3>Không đọc bản gốc một mình</h3><p>NĐ 08 đã được NĐ 05/2025 và NĐ 48/2026 sửa đổi. Vì vậy việc lấy một điều hoặc một phụ lục từ bản năm 2022 rồi áp dụng trực tiếp có thể làm sai kết luận. LegalOS coi “chuỗi sửa đổi” là một phần của dữ liệu, không coi mỗi văn bản là một hòn đảo.</p></section><section class="summary-block"><h3>Cách dùng an toàn</h3><p>Khi phân nhóm hoặc xác định thủ tục, mở đúng phụ lục hiện hành theo loại hình dự án, sau đó mới kiểm tra quy mô và yếu tố nhạy cảm. Với GPMT cần tách ba câu hỏi: có thuộc đối tượng không, nội dung xin phép là gì, và cơ quan nào có thẩm quyền.</p></section></div>`,
 l146:`<div class="long-summary"><section class="summary-block"><h3>Ý nghĩa từ 2026</h3><p>Luật 146/2025/QH15 sửa đổi nhiều luật thuộc lĩnh vực nông nghiệp và môi trường và có hiệu lực từ 01/01/2026. Trong LegalOS, văn bản này được coi là một lớp sửa đổi phải kiểm tra trước khi dùng các quy định cũ về môi trường, tài nguyên và thẩm quyền.</p></section><section class="summary-block"><h3>Cách đọc</h3><p>Không nên hiểu Luật 146 như một “luật môi trường mới” thay toàn bộ Luật 72/2020. Cách đúng là xác định điều nào của luật chuyên ngành đã được sửa, sau đó đọc quy định gốc cùng nội dung sửa đổi và văn bản hướng dẫn tương ứng.</p></section><section class="summary-block"><h3>Tác động nghiệp vụ</h3><p>Đối với thủ tục môi trường, tác động quan trọng nằm ở chuỗi thẩm quyền và tổ chức thực hiện sau thay đổi bộ máy, vì vậy cần đọc cùng NĐ 131/2025, NĐ 48/2026, NQ 66.19/2026 và các thông tư năm 2026 nếu thủ tục thuộc phạm vi của chúng.</p></section></div>`,
 nd48:`<div class="long-summary"><section class="summary-block"><h3>Vai trò trong chuỗi NĐ 08</h3><p>NĐ 48/2026/NĐ-CP tiếp tục sửa đổi NĐ 08/2022 sau NĐ 05/2025. Vì có hiệu lực từ 29/01/2026, đây là một trong các văn bản đầu tiên phải kiểm tra khi xử lý ĐTM, GPMT và các nội dung quản lý BVMT trong năm 2026.</p></section><section class="summary-block"><h3>Tư duy áp dụng</h3><p>LegalOS không dùng NĐ 48 như một bảng ngưỡng độc lập. Người dùng cần lần theo điều khoản hoặc phụ lục của NĐ 08 đang được sửa, xác định phần nào được thay thế/bổ sung rồi ghép với Luật 146/2025 và thông tư hướng dẫn.</p></section><section class="summary-block"><h3>Thao tác nên làm</h3><p>Trước khi chốt hồ sơ, kiểm tra lại thẩm quyền, mẫu biểu và quy định chuyển tiếp. Nếu dự án/cơ sở đã có quyết định ĐTM hoặc GPMT rồi thay đổi, phải so sánh “trước–sau” chứ không mặc nhiên làm lại toàn bộ hoặc mặc nhiên coi là không cần điều chỉnh.</p></section></div>`,
 nq6619:`<div class="long-summary"><section class="summary-block"><h3>Bản chất văn bản</h3><p>NQ 66.19/2026/NQ-CP là cơ chế cắt giảm, phân quyền và đơn giản hóa thủ tục hành chính trong phạm vi quản lý của Bộ Nông nghiệp và Môi trường và có thời hạn áp dụng. Vì vậy LegalOS gắn nhãn riêng “cơ chế có thời hạn”.</p></section><section class="summary-block"><h3>Lỗi thường gặp</h3><p>Không nên coi nghị quyết này là văn bản thay toàn bộ Luật BVMT hoặc NĐ 08. Khi có một thủ tục cụ thể, cần xác định nội dung nào của cơ chế tạm thời thực sự áp dụng, thời điểm áp dụng và liệu đã có văn bản mới làm thay đổi phần đó hay chưa.</p></section><section class="summary-block"><h3>Cách dùng trong LegalOS</h3><p>Trung tâm Cập nhật pháp luật sẽ đưa nghị quyết vào nhóm “tác động thủ tục”, đồng thời tách khỏi các văn bản ổn định lâu dài để người dùng không nhầm thời hạn.</p></section></div>`,
 l28:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>Luật Tài nguyên nước 2023 tạo khung quản lý, bảo vệ, điều hòa, phân phối, khai thác và sử dụng tài nguyên nước, đồng thời gắn với phòng ngừa suy thoái, cạn kiệt và ô nhiễm nguồn nước.</p></section><section class="summary-block"><h3>Không đồng nhất với GPMT</h3><p>Nghĩa vụ tài nguyên nước và nghĩa vụ môi trường có thể cùng xuất hiện nhưng không phải một thủ tục. Một dự án có thể phải rà cả khai thác/sử dụng nước, xả thải theo môi trường, công trình thủy lợi và các nghĩa vụ chuyên ngành khác.</p></section><section class="summary-block"><h3>Cập nhật 2026</h3><p>Khi áp dụng trong 2026 cần đọc cùng NĐ 23/2026/NĐ-CP và TT 06/2026/TT-BNNMT đối với các nội dung đã được sửa đổi, ngoài các nghị định và thông tư nền của Luật.</p></section></div>`,
 nd110:`<div class="long-summary"><section class="summary-block"><h3>Vai trò EPR</h3><p>NĐ 110/2026/NĐ-CP là văn bản chuyên biệt về trách nhiệm tái chế sản phẩm, bao bì và trách nhiệm xử lý chất thải của nhà sản xuất, nhập khẩu. Từ 25/05/2026, đây là một điểm vào quan trọng của nhánh EPR trong LegalOS.</p></section><section class="summary-block"><h3>Cách xác định nghĩa vụ</h3><p>Không bắt đầu từ câu hỏi “doanh nghiệp có sản xuất hàng hóa hay không”. Cần xác định đúng chủ thể, sản phẩm/bao bì, ngưỡng hoặc trường hợp loại trừ/miễn theo văn bản, kỳ nghĩa vụ và phương án thực hiện.</p></section><section class="summary-block"><h3>Hồ sơ và báo cáo</h3><p>Sau khi xác định đúng đối tượng, đọc TT 24/2026/TT-BNNMT cho biểu mẫu và hướng dẫn chi tiết. Chứng từ, số liệu khối lượng và căn cứ xác định đối tượng cần được lưu để phục vụ giải trình và kiểm tra.</p></section></div>`,
 nd06:`<div class="long-summary"><section class="summary-block"><h3>Khung khí hậu và ô-dôn</h3><p>NĐ 06/2022/NĐ-CP là nền tảng về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn. Sau đó khung này tiếp tục được sửa đổi bởi NĐ 119/2025 và NĐ 83/2026.</p></section><section class="summary-block"><h3>Tách hai nhánh nghiệp vụ</h3><p>LegalOS tách “kiểm kê/giảm phát thải KNK” khỏi “quản lý chất được kiểm soát, ô-dôn/HFC”. Hai nhánh có thể liên hệ nhưng không nên gộp thành một thủ tục duy nhất.</p></section><section class="summary-block"><h3>Dữ liệu là lõi</h3><p>Đối với kiểm kê và MRV, doanh nghiệp cần xây dựng chuỗi dữ liệu hoạt động, phương pháp, hệ số và hồ sơ kiểm soát chất lượng đủ để truy vết, thay vì chỉ làm một báo cáo cuối kỳ.</p></section></div>`,
 l54:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>Luật Địa chất và Khoáng sản 2024 điều chỉnh hoạt động địa chất, điều tra, thăm dò, khai thác khoáng sản và các nghĩa vụ liên quan. Luật đã có sửa đổi trong 2025, vì vậy hồ sơ 2026 cần đọc cùng Luật 147/2025.</p></section><section class="summary-block"><h3>Không thay pháp luật môi trường</h3><p>Giấy phép hoặc thủ tục khoáng sản không tự thay thế ĐTM, GPMT, đất đai, tài nguyên nước, rừng hay nghĩa vụ phục hồi môi trường. LegalOS xây lộ trình khoáng sản theo mô hình nhiều nhánh song song.</p></section><section class="summary-block"><h3>Điểm thực hành</h3><p>Cần theo dõi phương án cải tạo, phục hồi, ký quỹ, đóng cửa mỏ và phí BVMT cùng với quyền khai thác. Với khai thác nhóm IV phải đọc đúng cơ chế pháp luật hiện hành thay vì suy rộng từ tên nhóm.</p></section></div>`,
 ldat:`<div class="long-summary"><section class="summary-block"><h3>Vai trò đất đai</h3><p>Luật Đất đai 2024 là lớp pháp lý quan trọng đối với địa điểm dự án, mục đích sử dụng đất, giao/thuê đất, đăng ký và quyền-nghĩa vụ của người sử dụng đất. Với dự án môi trường, đất đai còn có thể tương tác với tiêu chí nhạy cảm và thủ tục chuyên ngành.</p></section><section class="summary-block"><h3>Cập nhật 2026</h3><p>LegalOS bổ sung NQ 29/2026/QH16, NĐ 50/2026/NĐ-CP, TT 19/2026/TT-BNNMT và VBHN về phân định thẩm quyền 2 cấp. NQ 229/NQ-CP được tách là văn bản kế hoạch/chính sách để theo dõi định hướng sửa luật, không dùng thay quy định đang có hiệu lực.</p></section><section class="summary-block"><h3>Cách dùng</h3><p>Đối với một dự án, hãy xác định loại đất, tình trạng pháp lý, nhu cầu chuyển mục đích, thẩm quyền và nghĩa vụ tài chính riêng; sau đó mới ghép với ĐTM/GPMT và các luật tài nguyên liên quan.</p></section></div>`,
 ln:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>Luật Lâm nghiệp điều chỉnh quản lý, bảo vệ, phát triển và sử dụng rừng. Khi dự án có liên quan rừng đặc dụng, rừng phòng hộ hoặc đất có rừng, việc chỉ kiểm tra pháp luật môi trường là chưa đủ.</p></section><section class="summary-block"><h3>Quan hệ với ĐTM</h3><p>Yếu tố rừng có thể ảnh hưởng đánh giá nhạy cảm của dự án nhưng nghĩa vụ lâm nghiệp vẫn là nhánh độc lập. Cần xác định loại rừng, hiện trạng, chủ rừng, mục đích sử dụng và thủ tục chuyên ngành tương ứng.</p></section><section class="summary-block"><h3>Cập nhật đọc thuận tiện</h3><p>LegalOS bổ sung TT 84/2025/TT-BNNMT có hiệu lực 01/01/2026 và giữ các văn bản hợp nhất để người dùng dễ theo dõi chuỗi quy định.</p></section></div>`,
 ddsh:`<div class="long-summary"><section class="summary-block"><h3>Phạm vi</h3><p>Luật Đa dạng sinh học điều chỉnh bảo tồn hệ sinh thái, loài và nguồn gen, cùng hệ thống khu bảo tồn và các yêu cầu bảo vệ đa dạng sinh học.</p></section><section class="summary-block"><h3>Tư duy dự án</h3><p>Không nên chỉ đánh dấu một ô “có/không yếu tố nhạy cảm”. Với dự án gần khu bảo tồn hoặc sinh cảnh quan trọng, cần xác định đối tượng bảo tồn cụ thể, phạm vi không gian và nghĩa vụ chuyên ngành trước khi kết luận tác động lên thủ tục môi trường.</p></section><section class="summary-block"><h3>Tra cứu</h3><p>Văn bản hợp nhất giúp đọc thuận tiện nhưng không tạo quy phạm mới; khi trích căn cứ pháp lý vẫn cần xác định văn bản gốc và văn bản sửa đổi tạo nên nội dung đang đọc.</p></section></div>`,
 lts:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>Luật Thủy sản điều chỉnh bảo vệ và phát triển nguồn lợi thủy sản, khai thác, nuôi trồng, quản lý tàu cá, cảng cá và các hoạt động thủy sản khác.</p></section><section class="summary-block"><h3>Cập nhật 2026</h3><p>LegalOS bổ sung NĐ 41/2026/NĐ-CP, TT 16/2026, TT 17/2026 và các văn bản hợp nhất mới về nguồn lợi thủy sản, thủy sản sống nhập khẩu và IUU.</p></section><section class="summary-block"><h3>Liên hệ môi trường</h3><p>Nuôi trồng hoặc chế biến thủy sản có thể đồng thời phát sinh nghĩa vụ môi trường, nước, đất/biển và sản phẩm xử lý môi trường nuôi trồng; vì vậy không nên xem Luật Thủy sản là tuyến thủ tục duy nhất.</p></section></div>`,
 lhc:`<div class="long-summary"><section class="summary-block"><h3>Khung Luật Hóa chất 2025</h3><p>Luật Hóa chất 2025 tạo khung quản lý vòng đời hóa chất, an toàn hóa chất, hoạt động hóa chất, hóa chất nguy hiểm và thông tin liên quan. Từ 2026, LegalOS đọc cùng bộ nghị định 24, 25, 26/2026 và thông tư triển khai.</p></section><section class="summary-block"><h3>Quan hệ với môi trường</h3><p>Tuân thủ hóa chất không thay thế quản lý chất thải, nước thải, khí thải hoặc GPMT. Một cơ sở hóa chất thường phải lập ma trận nghĩa vụ song song giữa an toàn hóa chất và môi trường.</p></section><section class="summary-block"><h3>QCVN sản phẩm/hóa chất</h3><p>LegalOS bổ sung TT 37/2026 và TT 38/2026 của Bộ Công Thương để theo dõi các sửa đổi QCVN về hàm lượng chất nguy hại và chất lượng một số hóa chất công nghiệp.</p></section></div>`,
 ldl:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>Luật Điện lực 2024 là lớp pháp lý ngành điện, bao gồm các cơ chế liên quan phát triển nguồn điện và điện năng lượng tái tạo. Dự án điện vẫn phải được rà độc lập theo pháp luật môi trường, đất đai, rừng, nước và xây dựng tùy trường hợp.</p></section><section class="summary-block"><h3>Chuỗi 2025–2026</h3><p>LegalOS giữ NĐ 57/2025, NĐ 58/2025 và NĐ 243/2026 để theo dõi cơ chế DPPA và phát triển điện năng lượng tái tạo/năng lượng mới.</p></section><section class="summary-block"><h3>Lỗi cần tránh</h3><p>Không suy luận rằng dự án “năng lượng sạch” mặc nhiên được miễn ĐTM/GPMT. Nghĩa vụ phải xác định từ loại dự án, quy mô, vị trí, yếu tố nhạy cảm và nguồn thải theo pháp luật môi trường hiện hành.</p></section></div>`
};

Object.assign(LONG_SUMMARY,{
 vbhn98:`<div class="long-summary"><section class="summary-block"><h3>Vai trò của bản hợp nhất</h3><p>98/VBHN-VPQH là bản hợp nhất thuận tiện để tra cứu của Luật Bảo vệ môi trường ở trạng thái hợp nhất năm 2026. Khi nghiên cứu hồ sơ, nên dùng bản hợp nhất để nhìn nội dung Điều đang áp dụng, sau đó truy luật gốc và luật sửa đổi nếu cần chứng minh lịch sử thay đổi.</p></section><section class="summary-block"><h3>Trục dự án/cơ sở</h3><p>LegalOS tổ chức phần lõi thành năm cụm: Điều 28–29 về phân nhóm và đánh giá sơ bộ; Điều 30–38 về ĐTM; Điều 39–48 về GPMT; Điều 49 về ĐKMT; Điều 54–55 về EPR. Cách chia này giúp người dùng đi theo vòng đời dự án thay vì đọc từng Điều rời rạc.</p></section><section class="summary-block"><h3>Điểm phải kiểm tra tiếp</h3><p>Luật không chứa toàn bộ tiêu chí, danh mục và biểu mẫu. Phân nhóm/ĐTM/GPMT phải đọc tiếp 49/VBHN-BNNMT; hồ sơ, trình tự và biểu mẫu phải đọc tiếp 55/VBHN-BNNMT; EPR năm 2026 phải đọc cùng NĐ 110/2026 và TT 24/2026.</p></section></div>`,
 vbhn49:`<div class="long-summary"><section class="summary-block"><h3>Vai trò trong thực hành</h3><p>49/VBHN-BNNMT là bản hợp nhất NĐ 08/2022 sau các sửa đổi lớn đến tháng 4/2026. Đây là văn bản thực hành quan trọng nhất khi chuyển từ khung của Luật BVMT sang tiêu chí phân nhóm, yếu tố nhạy cảm, ĐTM, GPMT, thay đổi dự án, chất thải và hệ thống phụ lục.</p></section><section class="summary-block"><h3>Phân nhóm dự án</h3><p>Điều 25 cùng Phụ lục II–V là cụm phải đọc đồng thời. Phụ lục II nhận diện loại hình sản xuất, kinh doanh, dịch vụ có nguy cơ gây ô nhiễm; Phụ lục III–V lần lượt bao quát danh mục nhóm I, II và III trong trạng thái hiện hành.</p></section><section class="summary-block"><h3>Cảnh báo biểu mẫu cũ</h3><p>Trong bản hợp nhất, nhiều phụ lục mẫu GPMT cũ của NĐ 08 được ghi chú đã bãi bỏ bởi các nghị định sửa đổi. Hồ sơ năm 2026 phải dùng mẫu đang có hiệu lực trong 55/VBHN-BNNMT thay vì lấy lại file mẫu cũ từ năm 2022.</p></section></div>`,
 vbhn55:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>55/VBHN-BNNMT là văn bản hướng dẫn nghiệp vụ của TT 02/2022 sau chuỗi sửa đổi 2025–2026. Với GPMT, bản hợp nhất hiện chứa Điều 18a về nội dung báo cáo đề xuất, Điều 18b về hồ sơ/trình tự/thủ tục cấp phép, Điều 18c về điều chỉnh/cấp lại và Điều 19 về hệ biểu mẫu.</p></section><section class="summary-block"><h3>Bộ mẫu GPMT</h3><p>Phụ lục II chứa hệ mẫu từ quyết định thành lập hội đồng, văn bản đề nghị, nhiều loại báo cáo đề xuất, biên bản thẩm định/kiểm tra, giấy phép, quyết định thu hồi đến kế hoạch và báo cáo vận hành thử. LegalOS.2 đã lập bản đồ nhanh các Mẫu 22–46 để giảm lỗi chọn nhầm mẫu.</p></section><section class="summary-block"><h3>Vận hành thử và quan trắc</h3><p>Điều 20–21 tạo lớp kỹ thuật cho quan trắc bổ sung và quan trắc trong quá trình vận hành thử. Khi dùng phải ghép với nội dung GPMT, loại công trình xử lý và tình trạng thực tế của dự án/cơ sở.</p></section></div>`,
 tt09:`<div class="long-summary"><section class="summary-block"><h3>Vai trò sửa đổi 2026</h3><p>TT 09/2026/TT-BNNMT có hiệu lực 29/01/2026 và sửa chuỗi TT 02/2022 sau các sửa đổi năm 2025. Đây là một trong các văn bản làm thay đổi trực tiếp thủ tục, nội dung báo cáo và biểu mẫu môi trường.</p></section><section class="summary-block"><h3>Tác động tới GPMT</h3><p>Thông tư bổ sung/sửa các quy định như nội dung báo cáo đề xuất GPMT, hồ sơ–trình tự cấp, điều chỉnh/cấp lại và các mẫu tương ứng. Khi tra GPMT năm 2026, nên đọc 55/VBHN-BNNMT thay vì ghép thủ công nhiều thông tư rời.</p></section></div>`,
 tt24epr:`<div class="long-summary"><section class="summary-block"><h3>Vai trò</h3><p>TT 24/2026/TT-BNNMT có hiệu lực 25/05/2026 và hướng dẫn NĐ 110/2026 về EPR. Đây là phần hướng dẫn thực hiện khi doanh nghiệp đi từ việc xác định nghĩa vụ sang kê khai, hồ sơ và chứng từ thực hiện.</p></section><section class="summary-block"><h3>Cách dùng</h3><p>Không bắt đầu bằng biểu mẫu. Trước hết phải xác định chủ thể, nhóm sản phẩm/bao bì, nhánh trách nhiệm tái chế hay xử lý, miễn trừ và dữ liệu khối lượng; sau đó mới dùng hướng dẫn/biểu mẫu của thông tư.</p></section></div>`
});

Object.entries(LONG_SUMMARY).forEach(([id,b])=>{const d=D.find(x=>x.id===id);if(d)d.b=b});

const P=[
{id:"dtm",cat:"env",ttl:"Thẩm định báo cáo ĐTM",desc:"Xác định đối tượng, phạm vi đánh giá, tham vấn, hồ sơ và nghĩa vụ sau quyết định.",st:[["1. Nhận diện dự án","Ghi đúng loại hình, giai đoạn đầu tư, công suất/quy mô theo đơn vị pháp luật sử dụng, vị trí, diện tích và thành phần công trình; không dùng một ngưỡng chung cho mọi ngành."],["2. Đối chiếu đối tượng ĐTM","Đọc Luật BVMT và Phụ lục NĐ 08/2022 theo bản đã được NĐ 05/2025, NĐ 48/2026 sửa. Kết luận dựa trên mục dự án cụ thể trong phụ lục, không dựa vào công thức nội bộ."],["3. Kiểm tra yếu tố nhạy cảm","Xác định yếu tố nào thực sự tồn tại và căn cứ chứng minh: khu dân cư/đô thị, nguồn nước, rừng, khu bảo tồn, đất lúa và các yếu tố theo quy định hiện hành."],["4. Xác định thẩm quyền","Sau khi xác định đúng đối tượng và hồ sơ, mới rà cơ quan thẩm định theo luật sửa đổi, nghị định phân quyền và cơ chế TTHC đang có hiệu lực."],["5. Chuẩn bị dữ liệu nền","Thu thập quy hoạch, hiện trạng, bản đồ, số liệu nguồn thải, quan trắc, đa dạng sinh học và dữ liệu kỹ thuật phù hợp với phạm vi tác động."],["6. Lập báo cáo","Bám nội dung Luật BVMT và hướng dẫn/mẫu hiện hành; kiểm tra TT 02/2022 cùng các thông tư sửa đổi trước khi dùng biểu mẫu."],["7. Tham vấn","Xác định đúng đối tượng, phạm vi, hình thức và bằng chứng tham vấn; không coi tham vấn chỉ là một bước ký giấy."],["8. Nộp & xử lý thẩm định","Theo dõi yêu cầu chỉnh sửa/bổ sung và lưu phiên bản hồ sơ, văn bản trao đổi, căn cứ đã dùng."],["9. Sau quyết định ĐTM","Tách riêng các nghĩa vụ tiếp theo: GPMT/ĐKMT nếu có, xây dựng công trình BVMT, quan trắc, vận hành thử, báo cáo và quản lý thay đổi."]]},
{id:"gp",cat:"env",ttl:"Cấp giấy phép môi trường",desc:"Tách rõ đối tượng GPMT, nội dung xin phép, thẩm quyền và nghĩa vụ sau cấp.",st:[["1. Xác định đối tượng GPMT","Bắt đầu từ Điều 39 Luật BVMT theo bản đang có hiệu lực và quy định chi tiết. Không dùng ngưỡng thẩm quyền hoặc một ngưỡng dòng thải để suy ngược rằng mọi cơ sở đều phải có GPMT."],["2. Xác định nguồn thải/nội dung cấp phép","Liệt kê nước thải, khí thải, tiếng ồn/rung, CTNH và công trình xử lý có liên quan để biết nội dung nào phải đưa vào hồ sơ."],["3. Đối chiếu ĐTM hiện có","Nếu dự án đã có kết quả thẩm định ĐTM, đối chiếu các công trình, thông số, công suất và cam kết với hiện trạng xin cấp phép."],["4. Xác định thẩm quyền","Chỉ sau khi xác định đúng thủ tục mới kiểm tra cơ quan có thẩm quyền theo Luật 146/2025, NĐ 131/2025, NĐ 48/2026 và cơ chế TTHC đang áp dụng."],["5. Chọn đúng mẫu/hướng dẫn","Kiểm tra TT 02/2022 và các văn bản sửa đổi 2025–2026, kể cả TT 22/2026 nếu nội dung phân cấp/cắt giảm có liên quan."],["6. Chuẩn bị số liệu kỹ thuật","Sơ đồ công nghệ, cân bằng nước, nguồn phát sinh, thiết kế/công suất xử lý, kết quả quan trắc và hồ sơ vận hành phải nhất quán."],["7. Nộp, kiểm tra và xử lý yêu cầu","Quản lý phiên bản hồ sơ và giải trình; nếu có kiểm tra thực tế phải đối chiếu hiện trạng với nội dung đề nghị cấp phép."],["8. Sau cấp phép","Thiết lập bảng nghĩa vụ theo từng nội dung của giấy phép: vận hành thử nếu có, quan trắc, báo cáo, giới hạn xả/thải và lưu hồ sơ."],["9. Khi có thay đổi","Không mặc nhiên xin lại toàn bộ. Lập bảng so sánh thay đổi và rà trường hợp phải điều chỉnh/cấp lại theo quy định hiện hành."]]},
{id:"dk",cat:"env",ttl:"Đăng ký môi trường",desc:"Sàng lọc đối tượng, trường hợp miễn và cách lưu bằng chứng đăng ký.",st:[["1. Kiểm tra có thuộc GPMT không","ĐKMT không phải phương án mặc định cho mọi đối tượng không có GPMT; trước hết phải hoàn thành bước loại trừ đúng đối tượng GPMT."],["2. Kiểm tra trường hợp phải đăng ký","Đọc Điều 49 Luật BVMT và quy định chi tiết để xác định dự án/cơ sở có thuộc diện đăng ký hay không."],["3. Kiểm tra trường hợp được miễn","Tách riêng bước miễn/không thuộc phạm vi; không suy luận 'không GPMT = chắc chắn ĐKMT'."],["4. Chuẩn bị thông tin","Mô tả nguồn thải, biện pháp quản lý, công trình BVMT và thông tin theo mẫu/quy định đang áp dụng."],["5. Xác định nơi tiếp nhận","Rà phân quyền chính quyền địa phương 2 cấp và các văn bản thủ tục hiện hành."],["6. Lưu bằng chứng","Lưu bản gửi, thời điểm, phương thức và căn cứ; không tự tạo thêm yêu cầu giấy tờ nếu pháp luật không quy định."]]},
{id:"waste",cat:"waste",ttl:"Quản lý chất thải nguy hại & chất thải rắn",desc:"Nhận diện dòng chất thải, phân định CTNH, lưu giữ, chuyển giao và chứng từ.",st:[["1. Lập danh mục dòng chất thải","Tách chất thải rắn thông thường, CTRSH, phế liệu/tái chế và dòng nghi CTNH theo từng công đoạn."],["2. Phân định CTNH","Dùng quy định quản lý chất thải và QCVN 07:2025/BNNMT khi cần xác định tính nguy hại; không dùng duy nhất khối lượng để quyết định một chất có phải CTNH hay không."],["3. Thiết kế lưu giữ","Kiểm tra khu vực, bao bì, nhãn, phân loại, phòng ngừa rò rỉ/sự cố và thời gian lưu theo quy định áp dụng."],["4. Chọn đơn vị tiếp nhận","Kiểm tra năng lực/phạm vi pháp lý của đơn vị vận chuyển/xử lý và hợp đồng, chứng từ liên quan."],["5. Gắn với GPMT","Rà xem nội dung quản lý CTNH và nguồn thải có phải thể hiện trong GPMT/hồ sơ môi trường của cơ sở hay không."],["6. Lưu dữ liệu & báo cáo","Tổ chức sổ theo dõi khối lượng, mã chất thải, ngày chuyển giao, chứng từ và dữ liệu phục vụ báo cáo/kiểm tra."]]},
{id:"emission",cat:"waste",ttl:"Nước thải · khí thải · quan trắc",desc:"Từ nguồn phát sinh đến QCVN, công trình xử lý và chế độ quan trắc.",st:[["1. Lập sơ đồ nguồn thải","Phân loại nguồn nước thải/khí thải theo công đoạn, lưu lượng, chế độ phát sinh và điểm xả."],["2. Chọn QCVN đúng phạm vi","Xác định quy chuẩn áp dụng theo loại nước thải/khí thải, ngành nghề và lộ trình chuyển tiếp; không áp QCVN 40 cho mọi loại nước thải."],["3. Kiểm tra công trình xử lý","So sánh lưu lượng thiết kế, lưu lượng thực tế, tải lượng và khả năng đáp ứng giới hạn."],["4. Rà GPMT","Xác định thông số, vị trí xả, giới hạn và nội dung quản lý nào thuộc giấy phép môi trường."],["5. Xác định quan trắc","Tách quan trắc định kỳ và tự động/liên tục theo đúng đối tượng; không suy từ một con số lưu lượng chung."],["6. Quản lý dữ liệu","Lưu kết quả, QA/QC, sự cố, hiệu chuẩn và dữ liệu truyền nhận nếu thuộc hệ thống tự động."]]},
{id:"epr",cat:"waste",ttl:"Thực hiện EPR",desc:"Xác định đúng chủ thể, sản phẩm/bao bì, nghĩa vụ và hồ sơ theo khung 2026.",st:[["1. Xác định chủ thể","Kiểm tra tư cách nhà sản xuất/nhập khẩu theo phạm vi NĐ 110/2026."],["2. Phân loại sản phẩm/bao bì","Đối chiếu đúng nhóm sản phẩm/bao bì và các trường hợp không thuộc hoặc được miễn."],["3. Xác định kỳ và dữ liệu khối lượng","Chuẩn hóa dữ liệu sản xuất/nhập khẩu làm căn cứ tính nghĩa vụ."],["4. Chọn phương án thực hiện","Rà các hình thức thực hiện trách nhiệm tái chế/xử lý và điều kiện của từng phương án theo văn bản."],["5. Dùng đúng biểu mẫu","Đọc TT 24/2026/TT-BNNMT để xác định biểu mẫu, thời điểm và cách báo cáo."],["6. Lưu chứng từ","Giữ hồ sơ khối lượng, hợp đồng/chứng từ tái chế hoặc đóng góp và căn cứ miễn/không thuộc nếu có."]]},
{id:"water",cat:"resource",ttl:"Thủ tục tài nguyên nước",desc:"Tách khai thác/sử dụng nước khỏi GPMT và rà chuỗi sửa đổi 2026.",st:[["1. Xác định hoạt động về nước","Khai thác nước mặt, nước dưới đất, sử dụng nước, công trình và hoạt động khác phải được phân loại đúng theo Luật Tài nguyên nước."],["2. Kiểm tra đối tượng thủ tục","Rà giấy phép/đăng ký/miễn theo luật và nghị định; không suy từ việc cơ sở đã có GPMT."],["3. Đọc chuỗi 2026","Đối chiếu NĐ 23/2026 và TT 06/2026 với các nghị định/thông tư nền đang áp dụng."],["4. Kiểm tra công trình liên quan","Nếu liên quan công trình thủy lợi, hành lang bảo vệ nguồn nước hoặc các công trình chuyên ngành khác, mở thêm nhánh pháp luật tương ứng."],["5. Chuẩn bị dữ liệu","Vị trí, nguồn nước, lưu lượng, chế độ khai thác, thiết bị đo, phương án bảo vệ và tài liệu kỹ thuật phải thống nhất."],["6. Nghĩa vụ sau thủ tục","Theo dõi đo đạc, báo cáo, tiền cấp quyền nếu thuộc trường hợp và điều kiện ghi trong giấy phép/quyết định."]]},
{id:"ghg",cat:"climate",ttl:"Kiểm kê & giảm nhẹ khí nhà kính",desc:"Tách kiểm kê KNK khỏi nhánh ô-dôn/HFC và xây dữ liệu MRV.",st:[["1. Kiểm tra cơ sở có thuộc danh mục","Xác định cơ sở/lĩnh vực có thuộc đối tượng kiểm kê hoặc nghĩa vụ giảm nhẹ theo danh mục và khung hiện hành."],["2. Xác định ranh giới kiểm kê","Chốt cơ sở, nguồn phát thải, kỳ dữ liệu và phương pháp trước khi tính toán."],["3. Đọc chuỗi NĐ 06","Áp dụng NĐ 06/2022 cùng NĐ 119/2025 và NĐ 83/2026 cho nội dung đã sửa."],["4. Xây hệ dữ liệu MRV","Quản lý dữ liệu hoạt động, hệ số, nguồn chứng cứ, kiểm soát chất lượng và lịch sử điều chỉnh."],["5. Báo cáo/thẩm định","Thực hiện biểu mẫu, kỳ báo cáo và xác minh/thẩm định theo hướng dẫn chuyên ngành đang áp dụng."],["6. Theo dõi thị trường carbon","Tách nghĩa vụ bắt buộc khỏi hoạt động tín chỉ/thị trường carbon và theo dõi văn bản triển khai tương ứng."]]},
{id:"ozone",cat:"climate",ttl:"Chất được kiểm soát · ô-dôn · HFC",desc:"Quản lý riêng chất được kiểm soát, đăng ký/hạn ngạch và dữ liệu sử dụng.",st:[["1. Lập danh mục chất","Xác định chất được kiểm soát, thiết bị/sản phẩm chứa chất và lượng nhập khẩu/sử dụng."],["2. Xác định nghĩa vụ","Kiểm tra đăng ký, hạn ngạch hoặc các yêu cầu quản lý tương ứng theo NĐ 06/2022 và các nghị định sửa đổi."],["3. Đọc NĐ 83/2026","Kiểm tra các nội dung đơn giản hóa/thay đổi thủ tục có hiệu lực từ 23/03/2026."],["4. Quản lý số liệu","Lưu số lượng, mục đích sử dụng, nhà cung cấp, tồn kho và chứng từ nhập/xuất."],["5. Kiểm soát rò rỉ/thu hồi","Rà yêu cầu kỹ thuật, thu hồi/tái chế/xử lý theo đối tượng áp dụng."],["6. Báo cáo","Thực hiện chế độ báo cáo theo đúng chủ thể và kỳ báo cáo; không gộp số liệu này với báo cáo KNK nếu pháp luật yêu cầu tách."]]},
{id:"landforest",cat:"sector",ttl:"Đất đai · rừng · đa dạng sinh học cho dự án",desc:"Ba nhánh chuyên ngành thường bị bỏ sót khi chỉ tập trung ĐTM/GPMT.",st:[["1. Kiểm tra pháp lý đất","Loại đất, hiện trạng, quyền sử dụng, nhu cầu chuyển mục đích, giao/thuê đất và dữ liệu địa chính."],["2. Kiểm tra rừng","Nếu có rừng/đất có rừng, xác định loại rừng, chủ rừng, hiện trạng và thủ tục lâm nghiệp độc lập."],["3. Kiểm tra đa dạng sinh học","Xác định khu bảo tồn, sinh cảnh, loài và vùng ảnh hưởng thực tế thay vì chỉ đánh dấu chung là 'nhạy cảm'."],["4. Ghép với môi trường","Dùng kết quả ba nhánh để hoàn thiện đánh giá yếu tố nhạy cảm/hiện trạng trong ĐTM nhưng không coi ĐTM thay thủ tục chuyên ngành."],["5. Kiểm tra thẩm quyền 2 cấp","Rà các văn bản phân quyền đất đai/lâm nghiệp hiện hành trước khi nộp."],["6. Lưu bản đồ căn cứ","Giữ lớp bản đồ, quyết định, trích lục và dữ liệu hiện trạng làm bằng chứng cho kết luận pháp lý."]]},
{id:"ks",cat:"sector",ttl:"Khai thác khoáng sản & BVMT",desc:"Quản lý song song quyền khoáng sản, phục hồi môi trường, đất, nước và ĐTM/GPMT.",st:[["1. Xác định khoáng sản & nhóm hoạt động","Đọc Luật 54/2024 và Luật 147/2025, phân biệt điều tra/thăm dò/khai thác và trường hợp khoáng sản nhóm IV."],["2. Xác định quyền/giấy phép khoáng sản","Rà điều kiện và thủ tục khoáng sản theo NĐ 193/2025, NĐ 21/2026 và cơ chế có liên quan."],["3. Rà ĐTM/GPMT độc lập","Không coi giấy phép khoáng sản là căn cứ miễn môi trường; mở NĐ 08 và chuỗi sửa đổi theo dự án cụ thể."],["4. Đất, nước, rừng","Kiểm tra quyền sử dụng đất, tài nguyên nước và rừng/đa dạng sinh học nếu có."],["5. Cải tạo, phục hồi & ký quỹ","Xác định phương án, số tiền/kỳ ký quỹ và nghĩa vụ phục hồi/đóng cửa mỏ theo pháp luật hiện hành."],["6. Phí & dữ liệu sản lượng","Theo dõi phí BVMT khai thác khoáng sản và dữ liệu sản lượng làm căn cứ tính/nghĩa vụ báo cáo."]]},
{id:"fish",cat:"sector",ttl:"Thủy sản & nuôi trồng thủy sản",desc:"Ghép Luật Thủy sản 2017 với bộ nghị định/thông tư 2026 và nghĩa vụ môi trường.",st:[["1. Xác định hoạt động","Khai thác, nuôi trồng, giống, thức ăn, sản phẩm xử lý môi trường hay nhập khẩu thủy sản sống là các nhánh khác nhau."],["2. Đọc NĐ 41/2026","Dùng NĐ 41/2026 làm một trong các văn bản chi tiết quan trọng của Luật Thủy sản trong năm 2026."],["3. Chọn thông tư chuyên ngành","TT 16/2026 cho giống/thức ăn/sản phẩm xử lý môi trường; TT 17/2026 cho thủy sản sống nhập khẩu."],["4. IUU & nguồn gốc","Với khai thác, rà nhật ký, cảng cá, giám sát sản lượng và xác nhận/chứng nhận nguồn gốc theo chuỗi văn bản hợp nhất mới."],["5. Môi trường & nước","Nuôi trồng/chế biến vẫn phải kiểm tra nước thải, chất thải, GPMT/ĐKMT và tài nguyên nước nếu thuộc đối tượng."],["6. Khu bảo tồn/nguồn lợi","Kiểm tra khu bảo tồn biển và vùng bảo vệ nguồn lợi trước khi quyết định vị trí/hoạt động."]]},
{id:"change",cat:"env",ttl:"Rà soát khi dự án/cơ sở thay đổi",desc:"Dùng bảng so sánh trước–sau để xác định thủ tục điều chỉnh, không mặc định làm lại toàn bộ.",st:[["1. Lập bảng trước–sau","So sánh công suất, công nghệ, diện tích, vị trí, nguyên liệu, nguồn thải, công trình xử lý và nội dung đã được phê duyệt/cấp phép."],["2. Xác định văn bản nền","Mở quyết định ĐTM, GPMT, ĐKMT và giấy phép chuyên ngành hiện có; ghi rõ điều kiện đang ràng buộc."],["3. Phân loại thay đổi theo từng nhánh","Một thay đổi có thể tác động ĐTM, GPMT, đất, nước, rừng hoặc giấy phép ngành khác ở mức khác nhau."],["4. Kiểm tra quy định điều chỉnh","Đọc NĐ 48/2026 và văn bản hiện hành cho trường hợp điều chỉnh/cấp lại; không lấy logic nội bộ để kết luận."],["5. Kiểm tra cơ chế TTHC hiện thời","Nếu thời điểm xử lý nằm trong giai đoạn NQ 66.19/2026 còn hiệu lực, rà phần cơ chế tạm thời có liên quan."],["6. Chốt phương án bằng căn cứ","Lưu bảng so sánh, bản vẽ, số liệu và điều khoản dùng để chọn phương án: báo cáo/điều chỉnh/cấp lại/không phát sinh thủ tục."],["7. Đồng bộ hồ sơ sau thay đổi","Cập nhật hồ sơ vận hành, quan trắc, SOP, sổ theo dõi và các giấy phép chuyên ngành có liên quan."]]}
];
const TERMS=[{"t":"ĐTM","c":"Thủ tục môi trường","d":"Đánh giá tác động môi trường: quy trình dự báo, đánh giá tác động và biện pháp BVMT của dự án thuộc đối tượng trước khi triển khai theo quy định.","n":"Không kết luận ĐTM chỉ bằng một ngưỡng chung; phải đối chiếu đúng loại dự án và phụ lục hiện hành.","r":["l72","nd08","nd48"]},{"t":"GPMT","c":"Thủ tục môi trường","d":"Giấy phép môi trường: văn bản quản lý các nội dung môi trường thuộc phạm vi cấp phép đối với dự án/cơ sở thuộc đối tượng.","n":"Tách câu hỏi 'có thuộc đối tượng' khỏi 'cơ quan nào cấp'; ngưỡng thẩm quyền không phải ngưỡng đối tượng.","r":["l72","nd48","tt09"]},{"t":"ĐKMT","c":"Thủ tục môi trường","d":"Đăng ký môi trường theo Điều 49 Luật BVMT; là một cơ chế khai báo/đăng ký, không phải một loại GPMT đơn giản hơn.","n":"Không suy luận không có GPMT thì chắc chắn phải ĐKMT; cần kiểm tra cả đối tượng và trường hợp miễn.","r":["l72","nd08"]},{"t":"Tham vấn trong ĐTM","c":"Thủ tục môi trường","d":"Hoạt động lấy ý kiến các đối tượng theo quy định trong quá trình lập ĐTM để nhận diện tác động, mối quan tâm và hoàn thiện giải pháp.","n":"Phải xác định đúng đối tượng, hình thức và bằng chứng tham vấn; không coi là bước hình thức.","r":["l72","tt09"]},{"t":"Vận hành thử công trình xử lý","c":"Thủ tục môi trường","d":"Giai đoạn kiểm tra hoạt động công trình xử lý chất thải theo điều kiện pháp lý áp dụng trước/đầu giai đoạn vận hành chính thức.","n":"Đối tượng, thời gian và nội dung phải bám GPMT/quy định hiện hành, không áp dụng đồng loạt cho mọi cơ sở.","r":["nd08","nd48"]},{"t":"Điều chỉnh GPMT","c":"Thủ tục môi trường","d":"Xử lý pháp lý khi nội dung dự án/cơ sở hoặc nội dung giấy phép thay đổi đến mức thuộc trường hợp phải điều chỉnh/cấp lại theo quy định.","n":"Luôn lập bảng trước–sau; không mặc nhiên xin lại toàn bộ chỉ vì có thay đổi.","r":["nd48"]},{"t":"TTHC","c":"Thủ tục môi trường","d":"Thủ tục hành chính: trình tự, cách thức và yêu cầu để cá nhân/tổ chức thực hiện một công việc thuộc quản lý nhà nước.","n":"Năm 2026 phải lưu ý các cơ chế cắt giảm, phân quyền và đơn giản hóa có thời hạn.","r":["nq6619","tt22_2026_admin"]},{"t":"Thẩm quyền","c":"Thủ tục môi trường","d":"Quyền của cơ quan nhà nước trong tiếp nhận, thẩm định, quyết định hoặc cấp phép đối với một thủ tục cụ thể.","n":"Xác định thẩm quyền sau khi xác định đúng thủ tục; không dùng thẩm quyền để suy ngược đối tượng.","r":["l146","nd131"]},{"t":"CTNH","c":"Chất thải & phát thải","d":"Chất thải nguy hại: chất thải có yếu tố/ngưỡng nguy hại theo hệ thống pháp luật và quy chuẩn phân định hiện hành.","n":"Khối lượng phát sinh có thể ảnh hưởng nghĩa vụ quản lý nhưng không tự quyết định bản chất CTNH.","r":["q07","nd08"]},{"t":"CTRSH","c":"Chất thải & phát thải","d":"Chất thải rắn sinh hoạt phát sinh từ sinh hoạt cá nhân, hộ gia đình và các nguồn được pháp luật xếp tương ứng.","n":"Cần theo quy định phân loại, lưu chứa, chuyển giao và cơ chế giá/dịch vụ tại địa phương.","r":["l72","nd08"]},{"t":"EPR","c":"Chất thải & phát thải","d":"Trách nhiệm mở rộng của nhà sản xuất, nhập khẩu đối với tái chế sản phẩm/bao bì hoặc xử lý chất thải theo đối tượng pháp luật quy định.","n":"Từ 25/05/2026 trọng tâm là NĐ 110/2026 và TT 24/2026; phải xác định đúng chủ thể và sản phẩm.","r":["nd110","tt24epr"]},{"t":"Phế liệu","c":"Chất thải & phát thải","d":"Vật liệu được thu hồi, phân loại, lựa chọn từ vật liệu/sản phẩm bị loại bỏ để sử dụng làm nguyên liệu cho quá trình sản xuất khác.","n":"Không đồng nhất phế liệu với mọi loại chất thải có thể tái chế; nhập khẩu còn có điều kiện riêng.","r":["nd08"]},{"t":"Nước thải công nghiệp","c":"Chất thải & phát thải","d":"Nước thải phát sinh từ hoạt động sản xuất/công nghiệp thuộc phạm vi quy chuẩn và quản lý môi trường tương ứng.","n":"QCVN 40:2025 không áp dụng cho mọi loại nước thải; phải kiểm tra phạm vi và lộ trình.","r":["q40","tt06_2025"]},{"t":"Khí thải công nghiệp","c":"Chất thải & phát thải","d":"Dòng khí thải từ quá trình công nghiệp cần kiểm soát thông số, công trình xử lý và quy chuẩn áp dụng.","n":"Thông số quản lý còn phụ thuộc ngành/công nghệ và nội dung ĐTM/GPMT cụ thể.","r":["q19","nd153"]},{"t":"CEMS","c":"Chất thải & phát thải","d":"Hệ thống quan trắc phát thải tự động, liên tục, thường dùng để theo dõi các thông số khí thải/nước thải theo đối tượng quy định.","n":"Không suy từ một lưu lượng chung rằng chắc chắn phải lắp CEMS; phải đối chiếu đúng đối tượng.","r":["nd08","tt10"]},{"t":"QCVN","c":"Chất thải & phát thải","d":"Quy chuẩn kỹ thuật quốc gia quy định mức giới hạn hoặc yêu cầu kỹ thuật bắt buộc trong phạm vi áp dụng.","n":"Luôn đọc phạm vi áp dụng, đối tượng loại trừ và điều khoản chuyển tiếp của chính QCVN/thông tư ban hành.","r":["q40","q19"]},{"t":"Tài nguyên nước","c":"Tài nguyên nước","d":"Nguồn nước và hoạt động quản lý, bảo vệ, điều hòa, khai thác, sử dụng theo Luật Tài nguyên nước 2023.","n":"Nghĩa vụ tài nguyên nước là một nhánh riêng, có thể tồn tại đồng thời với GPMT.","r":["l28","nd23_2026_water"]},{"t":"Giấy phép tài nguyên nước","c":"Tài nguyên nước","d":"Giấy phép đối với hoạt động tài nguyên nước thuộc diện phải cấp phép theo luật và văn bản hướng dẫn.","n":"Phải kiểm tra trường hợp miễn/đăng ký và chuỗi sửa đổi 2026; không lấy GPMT thay thế.","r":["l28","nd23_2026_water","tt06_2026_water"]},{"t":"Khai thác nước dưới đất","c":"Tài nguyên nước","d":"Hoạt động khai thác nước từ tầng chứa nước dưới đất, chịu điều kiện quản lý riêng theo quy mô, khu vực và mục đích.","n":"Kiểm tra hạn chế khai thác, đăng ký/cấp phép và thiết bị đo theo trường hợp thực tế.","r":["l28","nd54"]},{"t":"Hành lang bảo vệ nguồn nước","c":"Tài nguyên nước","d":"Phạm vi không gian được xác lập để bảo vệ nguồn nước, bờ, công trình và chức năng của nguồn nước.","n":"Dự án nằm gần nguồn nước cần kiểm tra phạm vi hành lang và hoạt động bị hạn chế/có điều kiện.","r":["l28"]},{"t":"Dòng chảy tối thiểu","c":"Tài nguyên nước","d":"Mức dòng chảy cần duy trì ở hạ lưu hoặc trên đoạn sông để bảo đảm chức năng nguồn nước và hệ sinh thái theo quy định.","n":"Đặc biệt quan trọng với khai thác/sử dụng nước và công trình điều tiết.","r":["l28"]},{"t":"Tiền cấp quyền khai thác TNN","c":"Tài nguyên nước","d":"Nghĩa vụ tài chính phát sinh với một số hoạt động khai thác tài nguyên nước theo pháp luật.","n":"Tách khỏi phí BVMT nước thải; căn cứ tính và trường hợp áp dụng là hai hệ nghĩa vụ khác nhau.","r":["l28"]},{"t":"Nguồn tiếp nhận","c":"Tài nguyên nước","d":"Nguồn nước hoặc hệ thống tiếp nhận dòng nước thải/xả nước sau xử lý tùy bối cảnh pháp lý và kỹ thuật.","n":"Việc xác định nguồn tiếp nhận ảnh hưởng lựa chọn quy chuẩn, vị trí xả và đánh giá sức chịu tải.","r":["q40","l28"]},{"t":"Sức chịu tải nguồn nước","c":"Tài nguyên nước","d":"Khả năng của nguồn nước tiếp nhận thêm tải lượng chất ô nhiễm mà vẫn đáp ứng mục tiêu chất lượng nước theo phương pháp/quy định áp dụng.","n":"Không đồng nghĩa với lưu lượng nguồn nước; cần dữ liệu chất lượng và tải lượng.","r":["l28"]},{"t":"Yếu tố nhạy cảm","c":"Đất · rừng · khoáng sản","d":"Nhóm yếu tố pháp lý có thể ảnh hưởng phân nhóm dự án môi trường, như khu vực/đối tượng nhạy cảm được quy định chi tiết.","n":"Không dùng một checkbox chung thay cho việc chứng minh từng yếu tố bằng bản đồ và căn cứ.","r":["nd08","nd48"]},{"t":"Đất lúa 2 vụ","c":"Đất · rừng · khoáng sản","d":"Đất trồng lúa nước từ hai vụ trở lên, có thể liên quan thủ tục đất đai và tiêu chí môi trường tùy trường hợp.","n":"Phải xác định đúng hiện trạng/loại đất trên hồ sơ địa chính, không chỉ dựa hiện trạng quan sát.","r":["ldat","tt19_2026_land"]},{"t":"Rừng đặc dụng","c":"Đất · rừng · khoáng sản","d":"Loại rừng có mục đích chính về bảo tồn thiên nhiên, mẫu chuẩn hệ sinh thái, nguồn gen, nghiên cứu và các mục tiêu theo Luật Lâm nghiệp.","n":"Dự án liên quan cần rà thủ tục lâm nghiệp độc lập và tác động lên yếu tố nhạy cảm môi trường.","r":["ln","tt84_2025_forest"]},{"t":"Rừng phòng hộ","c":"Đất · rừng · khoáng sản","d":"Loại rừng chủ yếu phục vụ bảo vệ nguồn nước, đất, chống xói mòn/sạt lở, thiên tai và các chức năng phòng hộ.","n":"Không coi có ĐTM là đã hoàn tất yêu cầu lâm nghiệp.","r":["ln","tt84_2025_forest"]},{"t":"Khoáng sản nhóm IV","c":"Đất · rừng · khoáng sản","d":"Nhóm khoáng sản theo Luật Địa chất và Khoáng sản, có cơ chế quản lý riêng trong một số trường hợp.","n":"Không suy rộng tên 'nhóm IV' sang nhóm dự án I–IV của pháp luật BVMT; đây là hai hệ phân loại khác nhau.","r":["l54","l147","nd11_2025"]},{"t":"Ký quỹ cải tạo, phục hồi","c":"Đất · rừng · khoáng sản","d":"Cơ chế bảo đảm tài chính cho nghĩa vụ cải tạo, phục hồi môi trường trong hoạt động khai thác khoáng sản theo pháp luật.","n":"Tách khỏi phí BVMT khai thác khoáng sản và nghĩa vụ đóng cửa mỏ.","r":["l54","nd193_2025"]},{"t":"Đóng cửa mỏ","c":"Đất · rừng · khoáng sản","d":"Quá trình pháp lý và kỹ thuật khi kết thúc khai thác nhằm xử lý hiện trạng, an toàn và các nghĩa vụ phục hồi theo quy định.","n":"Cần lập kế hoạch từ giai đoạn vận hành chứ không chờ hết trữ lượng mới chuẩn bị.","r":["l54"]},{"t":"Văn bản địa chính","c":"Đất · rừng · khoáng sản","d":"Hồ sơ/bản đồ/dữ liệu đăng ký đất đai dùng để xác định tình trạng pháp lý và ranh giới thửa đất.","n":"TT 19/2026 liên quan đo đạc, đăng ký, hồ sơ và CSDL đất đai.","r":["tt19_2026_land"]},{"t":"Đa dạng sinh học","c":"Sinh thái · biển · thủy sản","d":"Sự phong phú về gen, loài và hệ sinh thái; là đối tượng bảo tồn theo pháp luật đa dạng sinh học.","n":"Trong ĐTM phải gắn với vị trí, sinh cảnh và đối tượng cụ thể, không chỉ ghi nhận chung.","r":["ddsh","vbhn73_bio"]},{"t":"Khu bảo tồn","c":"Sinh thái · biển · thủy sản","d":"Khu vực được xác lập để bảo tồn thiên nhiên, đa dạng sinh học hoặc nguồn lợi theo pháp luật chuyên ngành.","n":"Phải xác định đúng loại khu bảo tồn và phân khu chức năng vì hạn chế hoạt động có thể khác nhau.","r":["ddsh","lts"]},{"t":"Loài nguy cấp, quý, hiếm","c":"Sinh thái · biển · thủy sản","d":"Nhóm loài được pháp luật bảo vệ ở các mức độ khác nhau theo danh mục và cơ chế chuyên ngành.","n":"Kiểm tra danh mục hiện hành và phạm vi bảo vệ, không chỉ dùng tên gọi phổ thông.","r":["ddsh"]},{"t":"IUU","c":"Sinh thái · biển · thủy sản","d":"Khai thác thủy sản bất hợp pháp, không báo cáo và không theo quy định.","n":"Quản lý IUU gắn với tàu cá, nhật ký, giám sát sản lượng, cảng cá và xác nhận/chứng nhận nguồn gốc.","r":["lts","vbhn80_fish"]},{"t":"Khu bảo tồn biển","c":"Sinh thái · biển · thủy sản","d":"Khu vực biển được bảo vệ nhằm bảo tồn hệ sinh thái, loài và nguồn lợi thủy sản theo pháp luật.","n":"Hoạt động dự án/khai thác cần kiểm tra phân khu và hạn chế cụ thể.","r":["lts","l82"]},{"t":"Nguồn lợi thủy sản","c":"Sinh thái · biển · thủy sản","d":"Tài nguyên sinh vật trong vùng nước tự nhiên có giá trị kinh tế, khoa học, du lịch và sinh thái.","n":"VBHN 79/2026 giúp tra cứu chuỗi hướng dẫn bảo vệ và phát triển nguồn lợi.","r":["vbhn79_fish"]},{"t":"Thủy sản sống nhập khẩu","c":"Sinh thái · biển · thủy sản","d":"Thủy sản còn sống nhập khẩu thuộc phạm vi phải đánh giá rủi ro/cấp phép theo điều kiện pháp luật tương ứng.","n":"Đọc TT 17/2026 và VBHN 71/2026 thay vì dùng hướng dẫn cũ rời rạc.","r":["tt17_2026_fish","vbhn71_fish"]},{"t":"Sản phẩm xử lý môi trường NTTS","c":"Sinh thái · biển · thủy sản","d":"Sản phẩm dùng xử lý/cải thiện môi trường nuôi trồng thủy sản thuộc quản lý chuyên ngành.","n":"Năm 2026 đọc TT 16/2026/TT-BNNMT cho phạm vi quản lý tương ứng.","r":["tt16_2026_fish"]},{"t":"KNK","c":"Khí hậu · carbon · ô-dôn","d":"Khí nhà kính: các khí góp phần gây hiệu ứng nhà kính và thuộc hệ quản lý kiểm kê/giảm nhẹ theo pháp luật khí hậu.","n":"Đọc NĐ 06/2022 cùng NĐ 119/2025 và NĐ 83/2026.","r":["nd06","nd119","nd83"]},{"t":"MRV","c":"Khí hậu · carbon · ô-dôn","d":"Measurement, Reporting and Verification: đo đạc, báo cáo và thẩm tra/xác minh dữ liệu hoặc kết quả giảm phát thải.","n":"MRV cần hệ dữ liệu truy vết được, không chỉ là một bảng tính cuối kỳ.","r":["nd06"]},{"t":"Thị trường carbon","c":"Khí hậu · carbon · ô-dôn","d":"Cơ chế giao dịch hạn ngạch phát thải và/hoặc tín chỉ carbon theo lộ trình và quy định Việt Nam.","n":"Tách cơ chế thị trường khỏi nghĩa vụ kiểm kê KNK; không phải cơ sở nào kiểm kê cũng lập tức được giao dịch.","r":["qd232_2025_carbon","nd06"]},{"t":"Hạn ngạch phát thải KNK","c":"Khí hậu · carbon · ô-dôn","d":"Lượng phát thải KNK được phân bổ/cho phép đối với đối tượng theo cơ chế quản lý phát thải.","n":"Phải theo lộ trình và danh sách đối tượng; không đồng nhất với tín chỉ carbon.","r":["nd06"]},{"t":"Tín chỉ carbon","c":"Khí hậu · carbon · ô-dôn","d":"Đơn vị đại diện cho kết quả giảm/phát thải hấp thụ được chứng nhận theo tiêu chuẩn/cơ chế áp dụng.","n":"Nguồn tín chỉ, tiêu chuẩn và quyền sử dụng cần được xác minh trước khi tính vào nghĩa vụ/trao đổi.","r":["qd232_2025_carbon"]},{"t":"Điều 6 Thỏa thuận Paris","c":"Khí hậu · carbon · ô-dôn","d":"Cơ chế hợp tác quốc tế theo Điều 6 Thỏa thuận Paris, bao gồm chuyển giao kết quả giảm nhẹ giữa các quốc gia theo thỏa thuận.","n":"NQ 235/NQ-CP 2026 là văn bản phê duyệt thỏa thuận thực hiện giữa Việt Nam và Singapore; đây không phải quy tắc chung cho mọi tín chỉ.","r":["nq235_2026_paris"]},{"t":"Chất được kiểm soát","c":"Khí hậu · carbon · ô-dôn","d":"Các chất thuộc cơ chế quản lý bảo vệ tầng ô-dôn và HFC theo pháp luật hiện hành.","n":"Tách đăng ký/hạn ngạch chất được kiểm soát khỏi quy trình kiểm kê KNK.","r":["nd06","nd83"]},{"t":"HFC","c":"Khí hậu · carbon · ô-dôn","d":"Hydrofluorocarbon: nhóm chất thường dùng trong lạnh/điều hòa và được quản lý trong khung giảm HFC, bảo vệ khí hậu/tầng ô-dôn.","n":"Cần quản lý theo loại chất, khối lượng và mục đích sử dụng cụ thể.","r":["nd83"]},{"t":"Phân loại xanh","c":"Khí hậu · carbon · ô-dôn","d":"Hệ tiêu chí xác định dự án thuộc danh mục xanh nhằm phục vụ tín dụng xanh, trái phiếu xanh và công cụ tài chính liên quan.","n":"Không đồng nghĩa dự án được miễn thủ tục môi trường.","r":["qd21"]},{"t":"VBQPPL","c":"Hệ thống pháp luật","d":"Văn bản quy phạm pháp luật chứa quy tắc xử sự chung, được ban hành đúng thẩm quyền, hình thức, trình tự theo pháp luật.","n":"Phân biệt VBQPPL với kế hoạch, chỉ đạo, hướng dẫn không chứa quy phạm áp dụng chung.","r":[]},{"t":"VBHN","c":"Hệ thống pháp luật","d":"Văn bản hợp nhất trình bày nội dung văn bản gốc đã được sửa đổi/bổ sung trong một bản đọc thuận tiện.","n":"VBHN không tạo quy phạm mới; khi trích căn cứ cần biết các văn bản gốc tạo nên nội dung hợp nhất.","r":["vbhn55_2026"]},{"t":"Văn bản sửa đổi, bổ sung","c":"Hệ thống pháp luật","d":"Văn bản thay đổi một phần nội dung của văn bản đang tồn tại thay vì ban hành lại toàn bộ.","n":"Phải đọc quan hệ điều/khoản bị sửa, thời điểm hiệu lực và chuyển tiếp.","r":["nd48","l146"]},{"t":"Bãi bỏ","c":"Hệ thống pháp luật","d":"Làm chấm dứt hiệu lực toàn bộ hoặc một phần quy định/văn bản theo quyết định của cơ quan có thẩm quyền.","n":"TT 32/2026/TT-BNNMT có hiệu lực 18/09/2026 nên cần kiểm tra văn bản cũ sau mốc này.","r":["tt32_2026_bnnmt"]},{"t":"Hiệu lực","c":"Hệ thống pháp luật","d":"Thời điểm và phạm vi mà văn bản/quy định bắt đầu được áp dụng và còn giá trị pháp lý.","n":"Ngày ban hành và ngày hiệu lực được hiển thị riêng.","r":[]},{"t":"Điều khoản chuyển tiếp","c":"Hệ thống pháp luật","d":"Quy định xử lý hồ sơ, dự án, giấy phép hoặc quan hệ pháp lý đang tồn tại khi pháp luật mới có hiệu lực.","n":"Đây là phần phải đọc khi hồ sơ bắt đầu trước nhưng hoàn thành sau ngày luật mới có hiệu lực.","r":[]},{"t":"Nghị quyết chính sách/kế hoạch","c":"Hệ thống pháp luật","d":"Nghị quyết của Chính phủ có thể ban hành chương trình, kế hoạch hoặc định hướng triển khai chính sách.","n":"Không mặc nhiên dùng mọi nghị quyết kế hoạch để thay điều kiện pháp lý cụ thể của Luật/Nghị định/Thông tư.","r":["nq208_env","nq229_land"]},{"t":"Phụ lục II–V NĐ 08","c":"Hệ thống pháp luật","d":"Các phụ lục quan trọng dùng nhận diện loại hình/nguy cơ và phân nhóm dự án theo NĐ 08/2022 cùng các lần sửa.","n":"Luôn kiểm tra bản phụ lục hiện hành; không dựa bản 2022 nguyên gốc nếu đã sửa.","r":["nd08","nd48"]},{"t":"Quan trắc môi trường","c":"Quan trắc · dữ liệu","d":"Hoạt động theo dõi có hệ thống các thành phần/thông số môi trường để đánh giá hiện trạng, biến động và tuân thủ.","n":"Phải có kế hoạch lấy mẫu, phương pháp, QA/QC và quản lý dữ liệu phù hợp.","r":["tt10"]},{"t":"Quan trắc định kỳ","c":"Quan trắc · dữ liệu","d":"Quan trắc thực hiện theo tần suất/kỳ xác định thay vì đo tự động liên tục.","n":"Tần suất và thông số phụ thuộc đối tượng/GPMT/quy định chuyên ngành.","r":["tt10"]},{"t":"Quan trắc tự động, liên tục","c":"Quan trắc · dữ liệu","d":"Đo, ghi nhận và có thể truyền dữ liệu tự động theo tần suất liên tục đối với đối tượng được quy định.","n":"Hệ thống phải quản lý thiết bị, hiệu chuẩn, dữ liệu lỗi/mất và truyền nhận theo yêu cầu.","r":["nd08","tt10"]},{"t":"QA/QC","c":"Quan trắc · dữ liệu","d":"Quality Assurance/Quality Control: bảo đảm và kiểm soát chất lượng trong lấy mẫu, phân tích, thiết bị và dữ liệu.","n":"Thiếu QA/QC có thể làm dữ liệu không đủ tin cậy dù có nhiều số đo.","r":["tt10"]},{"t":"Dữ liệu nền","c":"Quan trắc · dữ liệu","d":"Thông tin hiện trạng trước khi dự án/biện pháp được triển khai, dùng làm cơ sở đánh giá thay đổi và tác động.","n":"Cần bảo đảm thời gian, vị trí và phương pháp đủ đại diện cho mục đích sử dụng.","r":[]},{"t":"Cân bằng nước","c":"Quan trắc · dữ liệu","d":"Bảng/sơ đồ định lượng đầu vào, sử dụng, tuần hoàn, thất thoát và nước thải của cơ sở/dự án.","n":"Một công cụ quan trọng để kiểm tra tính nhất quán giữa công suất, nước cấp, nước thải và công trình xử lý.","r":[]},{"t":"GIS","c":"Quan trắc · dữ liệu","d":"Hệ thống thông tin địa lý dùng quản lý, phân tích và trực quan dữ liệu không gian như ranh dự án, nguồn nước, rừng, khu bảo tồn.","n":"GIS hỗ trợ chứng minh vị trí/yếu tố nhạy cảm nhưng dữ liệu lớp phải có nguồn và thời điểm rõ ràng.","r":[]},{"t":"CSDL pháp luật","c":"Quan trắc · dữ liệu","d":"Hệ dữ liệu lưu metadata, toàn văn/tóm tắt, quan hệ sửa đổi, hiệu lực và nguồn của văn bản pháp luật.","n":"Ưu tiên Cổng văn bản Chính phủ/CSDL VBPL; nguồn chính thức được tách khỏi phần tóm tắt.","r":[]}];
const NWS=[
["2024-11-21","NĐ 153/2024/NĐ-CP","Quy định phí BVMT đối với khí thải; hiệu lực 05/01/2025."],
["2024-11-29","Luật 54/2024/QH15","Luật Địa chất và khoáng sản; hiệu lực 01/07/2025."],
["2024-11-30","Luật 61/2024/QH15","Luật Điện lực; hiệu lực 01/02/2025."],
["2025-01-06","NĐ 05/2025/NĐ-CP","Sửa đổi NĐ 08/2022/NĐ-CP về chi tiết thi hành Luật BVMT."],
["2025-06-09","NĐ 119/2025/NĐ-CP","Sửa NĐ 06/2022 về giảm nhẹ KNK và bảo vệ tầng ô-dôn; hiệu lực 01/08/2025."],
["2025-06-12","NĐ 131/2025/NĐ-CP","Phân định thẩm quyền chính quyền địa phương 2 cấp trong lĩnh vực Bộ NN&MT; hiệu lực 01/07/2025."],
["2025-08-05","NĐ 217/2025/NĐ-CP","Quy định về hoạt động kiểm tra chuyên ngành."],
["2025-08-22","QĐ 21/2025/QĐ-TTg","Tiêu chí xác nhận dự án thuộc danh mục phân loại xanh."],
["2025-09-01","QCVN 40:2025/BTNMT","Quy chuẩn nước thải công nghiệp bắt đầu có hiệu lực theo TT 06/2025/TT-BTNMT."],
["2025-12-11","Luật 146/2025/QH15","Sửa đổi 15 luật trong lĩnh vực nông nghiệp và môi trường; hiệu lực 01/01/2026."],
["2025-12-11","Luật 147/2025/QH15","Sửa Luật Địa chất và khoáng sản; hiệu lực 01/01/2026."],
["2025-12-29","NĐ 346/2025/NĐ-CP","Phí BVMT đối với nước thải; hiệu lực 01/01/2026."],
["2026-01-29","NĐ 48/2026/NĐ-CP","Tiếp tục sửa NĐ 08/2022 đã được NĐ 05/2025 sửa đổi."],
["2026-01-29","TT 09/2026/TT-BNNMT","Sửa TT 02/2022 và các thông tư sửa đổi về thi hành Luật BVMT."],
["2026-02-09","QCVN 07:2025/BNNMT","Quy chuẩn về ngưỡng chất thải nguy hại có hiệu lực theo TT 44/2025/TT-BNNMT."],
["2026-03-23","NĐ 83/2026/NĐ-CP","Tiếp tục sửa hệ thống NĐ 06/2022 — NĐ 119/2025 về KNK và tầng ô-dôn."],
["2026-05-18","NQ 66.19/2026/NQ-CP","Cắt giảm, phân quyền, đơn giản hóa TTHC thuộc phạm vi Bộ NN&MT; cơ chế có thời hạn."],
["2026-05-25","NĐ 110/2026/NĐ-CP","Quy định chi tiết EPR; hiệu lực 25/05/2026."],
["2026-05-25","TT 24/2026/TT-BNNMT","Hướng dẫn thi hành một số nội dung NĐ 110/2026 về EPR."]
,["2026-01-17","NĐ 24, 25, 26/2026/NĐ-CP","Bộ ba nghị định triển khai Luật Hóa chất 2025: danh mục hóa chất; công nghiệp & an toàn; quản lý hoạt động hóa chất."],
["2026-02-23","21/VBHN-BNNMT","Hợp nhất nghị định chi tiết Luật Địa chất và khoáng sản."],
["2026-03-24","68/VBHN-VPQH","Văn bản hợp nhất Luật Lâm nghiệp."],
["2026-03-25","73/VBHN-VPQH","Văn bản hợp nhất Luật Đa dạng sinh học."],
["2026-03-27","85 & 88/VBHN-VPQH","Hợp nhất Luật Phòng, chống thiên tai và Luật Khí tượng thủy văn."],
["2026-03-30","91/VBHN-VPQH","Văn bản hợp nhất Luật Thủy sản."],
["2026-03-31","94/VBHN-VPQH","Văn bản hợp nhất Luật Thủy lợi."],
["2026-04-10","99/VBHN-VPQH","Văn bản hợp nhất Luật Tài nguyên, môi trường biển và hải đảo."],
["2026-06-26","NĐ 243/2026/NĐ-CP","Sửa cơ chế DPPA và quy định phát triển điện năng lượng tái tạo, năng lượng mới."],
["2026-08-04","74/2026/VBHN-TT-BNNMT","Hợp nhất hệ thông tư lâm nghiệp và kiểm lâm."],
["2026-08-14","NQ 235/NQ-CP","Phê duyệt Thỏa thuận thực hiện Điều 6 Thỏa thuận Paris giữa Việt Nam và Singapore."],
["2026-08-23","Luật 10/2026/QH16","Luật Dầu khí mới; hiệu lực 01/03/2027."]
];



NWS.push(
["2026-01-17","NĐ 23/2026/NĐ-CP","Sửa đổi, bổ sung một số điều của các nghị định trong lĩnh vực tài nguyên nước; hiệu lực cùng ngày."],
["2026-01-17","TT 06/2026/TT-BNNMT","Sửa đổi, bổ sung một số thông tư trong lĩnh vực tài nguyên nước; hiệu lực cùng ngày."],
["2026-01-25","NĐ 41/2026/NĐ-CP","Quy định chi tiết một số điều và biện pháp thi hành Luật Thủy sản."],
["2026-01-26","TT 08/2026/TT-BNNMT","Quy định chi tiết một số điều của Luật Thủy lợi."],
["2026-01-31","NĐ 50/2026/NĐ-CP","Chi tiết cơ chế về tiền sử dụng đất, tiền thuê đất theo NQ 254/2025/QH15."],
["2026-02-05","NĐ 53/2026/NĐ-CP","Sửa các nghị định trong lĩnh vực đê điều và phòng, chống thiên tai."],
["2026-03-09","TT 16/2026/TT-BNNMT","Quản lý giống, thức ăn thủy sản và sản phẩm xử lý môi trường nuôi trồng thủy sản."],
["2026-03-10","TT 17/2026/TT-BNNMT","Sửa hướng dẫn đánh giá rủi ro, cấp phép thủy sản sống nhập khẩu."],
["2026-03-30","TT 19/2026/TT-BNNMT","Kỹ thuật đo đạc địa chính, đăng ký đất đai, hồ sơ địa chính và CSDL đất đai."],
["2026-05-19","TT 22/2026/TT-BNNMT","Sửa một số thông tư liên quan phân cấp, cắt giảm, đơn giản hóa TTHC."],
["2026-05-25","NĐ 183/2026/NĐ-CP","Sửa khung xử phạt PCTT, thủy lợi và đê điều; hiệu lực 10/07/2026."],
["2026-06-30","TT 37 & 38/2026/TT-BCT","Sửa một số QCVN về giới hạn chất nguy hại trong sản phẩm và chất lượng hóa chất công nghiệp; hiệu lực 01/07/2026."],
["2026-07-17","TT 32/2026/TT-BNNMT","Bãi bỏ toàn bộ hoặc một phần một số VBQPPL; hiệu lực 18/09/2026."],
["2026-08-04","NQ 208/NQ-CP","Chương trình hành động của Chính phủ về BVMT và chủ động ứng phó với BĐKH trong thời kỳ mới."],
["2026-08-13","NQ 229/NQ-CP","Kế hoạch thực hiện định hướng sửa đổi Luật Đất đai và các luật có liên quan."]
);
NWS.sort((a,b)=>a[0].localeCompare(b[0]));

const LAW_META={
 l72:{eff:"01/01/2022",rel:"Luật khung · đã được sửa đổi",src:"https://vanban.chinhphu.vn/?docid=202613&pageid=27160"},
 nd08:{eff:"10/01/2022",rel:"Nghị định gốc · đã được sửa 2025, 2026",src:"https://vanban.chinhphu.vn/?classid=1&docid=205092&pageid=27160&typegroupid=4"},
 nd05:{issued:"06/01/2025",eff:"06/01/2025",rel:"Sửa NĐ 08/2022",src:"https://vanban.chinhphu.vn/?docid=212284&pageid=27160"},
 nd131:{eff:"01/07/2025",rel:"Phân định thẩm quyền 2 cấp",src:"https://vanban.chinhphu.vn/?classid=1&docid=213934&orggroupid=2&pageid=27160"},
 nd153:{eff:"05/01/2025",rel:"Phí BVMT khí thải",src:"https://vanban.chinhphu.vn/?docid=211782&pageid=27160"},
 l54:{eff:"01/07/2025",rel:"Luật gốc · đã được sửa",src:"https://vanban.chinhphu.vn/?classid=1&docid=212482&orggroupid=1&pageid=27160"},
 lhc:{eff:"01/01/2026",rel:"Luật Hóa chất 2025",src:"https://vanban.chinhphu.vn/?classid=1&docid=214610&pageid=27160&typegroupid=3"},
 q19:{eff:"01/07/2025",rel:"Ban hành theo TT 45/2024/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=1&docid=212369&pageid=27160&typegroupid=6"},
 q07:{eff:"09/02/2026",rel:"Ban hành theo TT 44/2025/TT-BNNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=214849&pageid=27160"},
 nd346:{eff:"01/01/2026",rel:"Phí BVMT nước thải",src:"https://vanban.chinhphu.vn/?classid=1&docid=216402&orggroupid=&pageid=27160"},
 l146:{eff:"01/01/2026",rel:"Sửa 15 luật NN&MT",src:"https://vanban.chinhphu.vn/?classid=1&docid=216543&pageid=27160&typegroupid=3"},
 l147:{eff:"01/01/2026",rel:"Sửa Luật 54/2024",src:"https://vanban.chinhphu.vn/?classid=1&docid=216553&pageid=27160&typegroupid=3"},
 nd48:{eff:"29/01/2026",rel:"Tiếp tục sửa NĐ 08/2022",src:"https://vanban.chinhphu.vn/?classid=1&docid=216867&pageid=27160"},
 tt09:{eff:"29/01/2026",rel:"Sửa TT 02/2022 và chuỗi 2025",src:"https://vanban.chinhphu.vn/?classid=1&docid=216920&orggroupid=4&pageid=27160"},
 nq6619:{eff:"18/05/2026",rel:"Cơ chế TTHC đặc thù; cần kiểm tra thời hạn và điều khoản áp dụng trong văn bản gốc",temp:true,src:"https://vanban.chinhphu.vn/?docid=218168&pageid=27160"},
 nd217:{eff:"05/08/2025",rel:"Kiểm tra chuyên ngành",src:"https://vanban.chinhphu.vn/?classid=1&docid=214813&pageid=27160&typegroupid=4"},
 nd110:{eff:"25/05/2026",rel:"Nghị định chuyên biệt EPR",src:"https://vanban.chinhphu.vn/?docid=217544&pageid=27160&typegroupid=4"},
 tt24epr:{eff:"25/05/2026",rel:"Hướng dẫn NĐ 110/2026",src:"https://vanban.chinhphu.vn/?classid=1&docid=218478&pageid=27160&typegroupid=6"},
 nd119:{eff:"01/08/2025",rel:"Sửa NĐ 06/2022",src:"https://vanban.chinhphu.vn/?classid=1&docid=213875&pageid=27160"},
 nd83:{eff:"23/03/2026",rel:"Tiếp tục sửa NĐ 06/2022 — 119/2025",src:"https://vanban.chinhphu.vn/?docid=217277&pageid=27160"},
 tt07_2025:{issued:"28/02/2025",eff:"28/02/2025",rel:"Sửa TT 02/2022",src:"https://vbpl.moj.gov.vn/botainguyen/Pages/vbpq-thuoctinh.aspx?ItemID=176986",verified:true},
 tt01_2023:{issued:"13/03/2023",eff:"12/09/2023",rel:"Ban hành QCVN 03, 05, 08, 09, 10:2023",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 q03_2023:{issued:"13/03/2023",eff:"12/09/2023",rel:"Ban hành kèm TT 01/2023/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 q08_2023:{issued:"13/03/2023",eff:"12/09/2023",rel:"Ban hành kèm TT 01/2023/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 q09_2023:{issued:"13/03/2023",eff:"12/09/2023",rel:"Ban hành kèm TT 01/2023/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 q10_2023:{issued:"13/03/2023",eff:"12/09/2023",rel:"Ban hành kèm TT 01/2023/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 tt05_2025:{issued:"28/02/2025",eff:"01/09/2025",rel:"Ban hành QCVN 14:2025/BTNMT",src:"https://vbpl.vn/tw/Pages/vbpq-thuoctinh.aspx?ItemID=176983",verified:true},
 q14_2025:{issued:"28/02/2025",eff:"01/09/2025",rel:"Ban hành theo TT 05/2025/TT-BTNMT",src:"https://vbpl.vn/tw/Pages/vbpq-thuoctinh.aspx?ItemID=176983",verified:true},
 tt06_2025:{issued:"28/02/2025",eff:"01/09/2025",rel:"Ban hành QCVN 40:2025/BTNMT",src:"https://vbpl.vn/TW/Pages/vbpq-thuoctinh.aspx?ItemID=176985",verified:true},
 tt04_2025:{issued:"28/02/2025",eff:"01/09/2025",rel:"Ban hành QCVN 62:2025/BTNMT",src:"https://vbpl.vn/TW/Pages/vbpq-thuoctinh.aspx?ItemID=176982&Keyword=",verified:true},
 q62_2025:{issued:"28/02/2025",eff:"01/09/2025",rel:"Ban hành theo TT 04/2025/TT-BTNMT",src:"https://vbpl.vn/TW/Pages/vbpq-thuoctinh.aspx?ItemID=176982&Keyword=",verified:true},
 tt01_2025_bnnmt:{issued:"15/05/2025",eff:"14/11/2025",rel:"Ban hành QCVN 26, 27, 43:2025/BNNMT",src:"https://vbpl.moj.gov.vn/botainguyen/Pages/vbpq-toanvan.aspx?ItemID=177811",verified:true},
 q27_2025:{issued:"15/05/2025",eff:"14/11/2025",rel:"Ban hành theo TT 01/2025/TT-BNNMT",src:"https://vbpl.moj.gov.vn/botainguyen/Pages/vbpq-toanvan.aspx?ItemID=177811",verified:true},
 q43_2025:{issued:"15/05/2025",eff:"14/11/2025",rel:"Ban hành theo TT 01/2025/TT-BNNMT",src:"https://vbpl.moj.gov.vn/botainguyen/Pages/vbpq-toanvan.aspx?ItemID=177811",verified:true},
 tt45_2024:{issued:"30/12/2024",eff:"01/07/2025",rel:"Ban hành QCVN 19:2024/BTNMT",src:"https://vanban.chinhphu.vn/?docid=212369&pageid=27160",verified:true},
 tt44_2025:{issued:"06/08/2025",eff:"09/02/2026",rel:"Ban hành QCVN 07:2025/BNNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=214849&pageid=27160",verified:true},
 vbhn55_2026:{issued:"01/06/2026",rel:"Văn bản hợp nhất · tra cứu hệ quy định chi tiết Luật BVMT",src:"https://vanban.chinhphu.vn/?classid=2629&docid=218358&pageid=27160",verified:true},
 nd53_2024:{issued:"16/05/2024",eff:"01/07/2024",rel:"Chi tiết Luật Tài nguyên nước",src:"https://vanban.chinhphu.vn/?classid=1&docid=210246&orggroupid=2&pageid=27160",verified:true},
 nd54_2024:{issued:"16/05/2024",eff:"01/07/2024",rel:"Khoan, cấp phép, dịch vụ và tiền cấp quyền nước",src:"https://vanban.chinhphu.vn/?classid=1&docid=210244&orggroupid=2&pageid=27160",verified:true},
 tt03_2024:{issued:"16/05/2024",eff:"01/07/2024",rel:"Chi tiết Luật Tài nguyên nước",src:"https://vanban.chinhphu.vn/?docid=210306&pageid=27160",verified:true},
 vbhn09_water:{issued:"05/02/2026",rel:"VBHN chi tiết Luật Tài nguyên nước",src:"https://vanban.chinhphu.vn/?docid=216898&pageid=27160",verified:true},
 nd156_2018:{issued:"16/11/2018",eff:"01/01/2019",rel:"Nghị định nền Luật Lâm nghiệp",src:"https://vanban.chinhphu.vn/default.aspx?docid=195435&pageid=27160",verified:true},
 nd91_2024:{issued:"18/07/2024",eff:"18/07/2024",rel:"Sửa NĐ 156/2018",src:"https://vanban.chinhphu.vn/?classid=0&docid=210703&pageid=27160",verified:true},
 nd227_2025:{issued:"16/08/2025",eff:"16/08/2025",rel:"Tiếp tục sửa NĐ 156/2018",src:"https://vanban.chinhphu.vn/?classid=0&docid=214957&pageid=27160",verified:true},
 vbhn68_forest:{issued:"24/03/2026",rel:"VBHN Luật Lâm nghiệp",src:"https://vanban.chinhphu.vn/?docid=217341&pageid=27160",verified:true},
 vbhn13_forest:{issued:"06/02/2026",rel:"VBHN nghị định chi tiết Luật Lâm nghiệp",src:"https://vanban.chinhphu.vn/?docid=217023&pageid=27160",verified:true},
 vbhn74_forest:{issued:"04/08/2026",rel:"VBHN thông tư lâm nghiệp và kiểm lâm",src:"https://vanban.chinhphu.vn/?classid=0&docid=219106&pageid=27160",verified:true},
 nd65_2010:{issued:"11/06/2010",eff:"30/07/2010",rel:"Chi tiết Luật Đa dạng sinh học",src:"https://vanban.chinhphu.vn/?docid=95128&pageid=27160",verified:true},
 nd160_2013:{issued:"12/11/2013",eff:"01/01/2014",rel:"Loài nguy cấp, quý, hiếm ưu tiên bảo vệ",src:"https://vanban.chinhphu.vn/default.aspx?docid=170893&pageid=27160",verified:true},
 nd64_2019:{issued:"16/07/2019",eff:"05/09/2019",rel:"Sửa NĐ 160/2013",src:"https://vanban.chinhphu.vn/default.aspx?docid=197392&pageid=27160",verified:true},
 nd59_2017:{issued:"12/05/2017",eff:"01/07/2017",rel:"Tiếp cận nguồn gen và chia sẻ lợi ích",src:"https://vanban.chinhphu.vn/default.aspx?docid=189806&pageid=27160",verified:true},
 vbhn73_bio:{issued:"25/03/2026",rel:"VBHN Luật Đa dạng sinh học",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217347&pageid=27160",verified:true},
 vbhn28_bio:{issued:"02/03/2026",rel:"VBHN hướng dẫn Luật Đa dạng sinh học",src:"https://vanban.chinhphu.vn/?docid=217078&pageid=27160",verified:true},
 nd40_2016_sea:{issued:"15/05/2016",eff:"01/07/2016",rel:"Chi tiết Luật TNMT biển và hải đảo",src:"https://vanban.chinhphu.vn/?docid=185148&pageid=27160",verified:true},
 nd11_2021_sea:{issued:"10/02/2021",eff:"30/03/2021",rel:"Giao khu vực biển",src:"https://vanban.chinhphu.vn/?docid=202661&pageid=27160",verified:true},
 nd65_2025_sea:{issued:"12/03/2025",eff:"02/05/2025",rel:"Sửa NĐ 40/2016 và NĐ 11/2021",src:"https://vanban.chinhphu.vn/?classid=1&docid=213121&pageid=27160",verified:true},
 vbhn99_sea:{issued:"10/04/2026",rel:"VBHN Luật TNMT biển và hải đảo",src:"https://vanban.chinhphu.vn/?classid=0&docid=217739&pageid=27160",verified:true},
 vbhn24_sea:{issued:"27/02/2026",rel:"VBHN chi tiết Luật TNMT biển và hải đảo",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217132&pageid=27160",verified:true},
 nd26_2019_fish:{issued:"08/03/2019",eff:"25/04/2019",rel:"Chi tiết Luật Thủy sản",src:"https://vanban.chinhphu.vn/?docid=196438&pageid=27160",verified:true},
 nd37_2024_fish:{issued:"04/04/2024",eff:"19/05/2024",rel:"Sửa NĐ 26/2019",src:"https://vanban.chinhphu.vn/?classid=1&docid=210017&pageid=27160",verified:true},
 nd309_2025_fish:{issued:"29/11/2025",rel:"Tiếp tục sửa NĐ 26/2019 sau NĐ 37/2024",src:"https://vanban.chinhphu.vn/?classid=1&docid=216068&orggroupid=2&pageid=27160",verified:true},
 vbhn91_fish:{issued:"30/03/2026",rel:"VBHN Luật Thủy sản",src:"https://vanban.chinhphu.vn/?docid=217378&pageid=27160",verified:true},
 nd102_2024_land:{issued:"30/07/2024",eff:"01/08/2024",rel:"Chi tiết Luật Đất đai",src:"https://vanban.chinhphu.vn/?classid=0&docid=210795&pageid=27160",verified:true},
 nd103_2024_land:{issued:"30/07/2024",eff:"01/08/2024",rel:"Tiền sử dụng đất, tiền thuê đất",src:"https://vanban.chinhphu.vn/?classid=1&docid=210797&orggroupid=2&pageid=27160",verified:true},
 nd104_2024_land:{issued:"31/07/2024",eff:"01/08/2024",rel:"Quỹ phát triển đất",src:"https://vanban.chinhphu.vn/?classid=1&docid=210825&pageid=27160",verified:true},
 nd88_2024_land:{issued:"15/07/2024",eff:"01/08/2024",rel:"Bồi thường, hỗ trợ, tái định cư",src:"https://vanban.chinhphu.vn/?classid=1&docid=210658&pageid=27160",verified:true},
 nd71_2024_land:{issued:"27/06/2024",rel:"Giá đất",src:"https://vanban.chinhphu.vn/?docid=210523&pageid=27160",verified:true},
 nd151_2025_land:{issued:"12/06/2025",eff:"01/07/2025",rel:"Phân quyền 2 cấp trong lĩnh vực đất đai",src:"https://vanban.chinhphu.vn/?classid=0&docid=213927&pageid=27160",verified:true},
 nd226_2025_land:{issued:"15/08/2025",eff:"15/08/2025",rel:"Sửa các nghị định chi tiết Luật Đất đai",src:"https://vanban.chinhphu.vn/?classid=1&docid=214955&pageid=27160",verified:true},
 nd291_2025_land:{issued:"06/11/2025",eff:"06/11/2025",rel:"Sửa NĐ 103/2024 và NĐ 104/2024",src:"https://vanban.chinhphu.vn/?classid=1&docid=215808&pageid=27160",verified:true},
 vbhn133_land:{issued:"03/09/2025",rel:"VBHN Luật Đất đai",src:"https://vanban.chinhphu.vn/?docid=215258&pageid=27160",verified:true},
 vbhn46_land:{issued:"03/04/2026",rel:"VBHN chi tiết Luật Đất đai",src:"https://vanban.chinhphu.vn/?docid=217546&pageid=27160",verified:true},
 nq29_2026_land:{issued:"24/04/2026",eff:"01/05/2026",rel:"Cơ chế đặc thù xử lý vướng mắc đất đai",src:"https://vanban.chinhphu.vn/?classid=1&docid=218062&pageid=27160",verified:true},
 l90_2015_kttv:{issued:"23/11/2015",eff:"01/07/2016",rel:"Luật Khí tượng thủy văn",src:"https://vanban.chinhphu.vn/?classid=1&docid=183200&pageid=27160&typegroupid=3",verified:true},
 nd38_2016_kttv:{issued:"15/05/2016",eff:"01/07/2016",rel:"Chi tiết Luật KTTV",src:"https://vanban.chinhphu.vn/?docid=184966&pageid=27160",verified:true},
 nd113_2026_kttv:{issued:"01/04/2026",eff:"01/04/2026",rel:"Sửa hệ NĐ 38/2016 về KTTV",src:"https://vanban.chinhphu.vn/?classid=1&docid=217416&orggroupid=2&pageid=27160",verified:true},
 vbhn88_kttv:{issued:"27/03/2026",rel:"VBHN Luật Khí tượng thủy văn",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217375&pageid=27160",verified:true},
 l33_2013_disaster:{issued:"19/06/2013",eff:"01/05/2014",rel:"Luật Phòng, chống thiên tai",src:"https://vanban.chinhphu.vn/?classid=1&docid=169372&pageid=27160&typegroupid=3",verified:true},
 l60_2020_disaster:{issued:"17/06/2020",eff:"01/07/2021",rel:"Sửa Luật PCTT và Luật Đê điều",src:"https://vanban.chinhphu.vn/?docid=200448&pageid=27160",verified:true},
 nd66_2021_disaster:{issued:"06/07/2021",eff:"20/08/2021",rel:"Chi tiết Luật PCTT",src:"https://vanban.chinhphu.vn/?docid=203560&pageid=27160",verified:true},
 vbhn85_disaster:{issued:"27/03/2026",rel:"VBHN Luật PCTT",src:"https://vanban.chinhphu.vn/?docid=217373&pageid=27160",verified:true},
 vbhn29_disaster:{issued:"23/03/2026",rel:"VBHN nghị định chi tiết Luật PCTT",src:"https://vanban.chinhphu.vn/?docid=217287&pageid=27160",verified:true},
 l08_2017_irrigation:{issued:"19/06/2017",eff:"01/07/2018",rel:"Luật Thủy lợi",src:"https://vanban.chinhphu.vn/?docid=190309&pageid=27160",verified:true},
 nd67_2018_irrigation:{issued:"14/05/2018",eff:"01/07/2018",rel:"Chi tiết Luật Thủy lợi",src:"https://vanban.chinhphu.vn/?docid=193712&pageid=27160",verified:true},
 nd40_2023_irrigation:{issued:"27/06/2023",eff:"15/08/2023",rel:"Sửa NĐ 67/2018",src:"https://vanban.chinhphu.vn/?classid=0&docid=208139&pageid=27160",verified:true},
 vbhn94_irrigation:{issued:"31/03/2026",rel:"VBHN Luật Thủy lợi",src:"https://vanban.chinhphu.vn/?docid=217380&pageid=27160",verified:true},
 nd11_2025_mineral:{issued:"15/01/2025",eff:"15/01/2025",rel:"Khai thác khoáng sản nhóm IV",src:"https://vanban.chinhphu.vn/?classid=1&docid=212581&pageid=27160",verified:true},
 nd193_2025_mineral:{issued:"02/07/2025",eff:"02/07/2025",rel:"Chi tiết Luật Địa chất và khoáng sản",src:"https://vanban.chinhphu.vn/?docid=214459&pageid=27160",verified:true},
 nd21_2026_mineral:{issued:"16/01/2026",eff:"16/01/2026",rel:"Sửa NĐ 193/2025 và chi tiết Luật 147/2025",src:"https://vanban.chinhphu.vn/?classid=0&docid=216682&pageid=27160",verified:true},
 nq664_2025_mineral:{issued:"21/09/2025",eff:"21/09/2025",rel:"Cơ chế đặc thù địa chất & khoáng sản",src:"https://vanban.chinhphu.vn/?classid=509&docid=215415&pageid=27160",verified:true},
 vbhn21_mineral:{issued:"23/02/2026",rel:"VBHN nghị định chi tiết Luật Địa chất và khoáng sản",src:"https://vanban.chinhphu.vn/?classid=0&docid=217005&pageid=27160",verified:true},
 nd24_2026_chem:{issued:"17/01/2026",eff:"17/01/2026",rel:"Danh mục hóa chất",src:"https://vanban.chinhphu.vn/?classid=1&docid=216671&orggroupid=2&pageid=27160",verified:true},
 nd25_2026_chem:{issued:"17/01/2026",eff:"17/01/2026",rel:"Công nghiệp hóa chất; an toàn & an ninh",src:"https://vanban.chinhphu.vn/?classid=1&docid=216672&pageid=27160&typegroupid=4",verified:true},
 nd26_2026_chem:{issued:"17/01/2026",eff:"17/01/2026",rel:"Quản lý hoạt động hóa chất",src:"https://vanban.chinhphu.vn/?classid=1&docid=216673&pageid=27160",verified:true},
 tt01_2026_bct:{issued:"17/01/2026",eff:"17/01/2026",rel:"Hướng dẫn NĐ 26/2026",src:"https://vanban.chinhphu.vn/?docid=216719&pageid=27160&typegroupid=6",verified:true},
 tt02_2026_bct:{issued:"17/01/2026",eff:"17/01/2026",rel:"Hướng dẫn NĐ 25/2026",src:"https://vanban.chinhphu.vn/?classid=1&docid=216720&pageid=27160",verified:true},
 vbhn33_chem:{issued:"26/05/2026",rel:"VBHN thi hành Luật Hóa chất & NĐ 25/2026",src:"https://vanban.chinhphu.vn/?classid=0&docid=218285&pageid=27160",verified:true},
 nd57_2025_power:{issued:"03/03/2025",eff:"03/03/2025",rel:"Cơ chế DPPA",src:"https://vbpl.vn/tw/Pages/vbpq-thuoctinh.aspx?ItemID=176043",verified:true},
 nd58_2025_power:{issued:"03/03/2025",eff:"03/03/2025",rel:"NLTT và năng lượng mới",src:"https://vanban.chinhphu.vn/?docid=213011&pageid=27160",verified:true},
 nd243_2026_power:{issued:"26/06/2026",eff:"26/06/2026",rel:"Sửa NĐ 57/2025 và NĐ 58/2025",src:"https://vanban.chinhphu.vn/?docid=218605&pageid=27160&typegroupid=4",verified:true},
 l10_2026_oil:{issued:"23/08/2026",eff:"01/03/2027",rel:"Luật Dầu khí mới · hiệu lực 2027",src:"https://vanban.chinhphu.vn/?classid=1&docid=219367&pageid=27160",verified:true},
 qd13_2024_ghg:{issued:"13/08/2024",eff:"01/10/2024",rel:"Danh mục cơ sở phải kiểm kê KNK",src:"https://vanban.chinhphu.vn/?classid=1&docid=210939&pageid=27160",verified:true},
 qd232_2025_carbon:{issued:"24/01/2025",rel:"Đề án thành lập và phát triển thị trường carbon",src:"https://vanban.chinhphu.vn/?classid=0&docid=212592&pageid=27160",verified:true},
 nq235_2026_paris:{issued:"14/08/2026",rel:"Điều 6 Thỏa thuận Paris Việt Nam–Singapore",src:"https://vanban.chinhphu.vn/?docid=219190&pageid=27160",verified:true},
 vbhn11_climate:{issued:"20/06/2025",rel:"VBHN ứng phó biến đổi khí hậu",src:"https://vanban.chinhphu.vn/?docid=214372&pageid=27160",verified:true}
};

Object.assign(LAW_META,{
 q40:{issued:"28/02/2025",eff:"01/09/2025",rel:"QCVN nước thải công nghiệp · theo TT 06/2025/TT-BTNMT",src:"https://vbpl.vn/TW/Pages/vbpq-thuoctinh.aspx?ItemID=176985",verified:true},
 q05:{issued:"13/03/2023",eff:"12/09/2023",rel:"QCVN không khí xung quanh · theo TT 01/2023/TT-BTNMT",src:"https://vanban.chinhphu.vn/?classid=0&docid=207647&pageid=27160",verified:true},
 q26:{issued:"15/05/2025",eff:"14/11/2025",rel:"QCVN tiếng ồn · theo TT 01/2025/TT-BNNMT",src:"https://vbpl.moj.gov.vn/botainguyen/Pages/vbpq-toanvan.aspx?ItemID=177811",verified:true},
 l28:{issued:"27/11/2023",eff:"01/07/2024",rel:"Luật Tài nguyên nước 2023",src:"https://vanban.chinhphu.vn/",verified:true},
 ln:{issued:"15/11/2017",eff:"01/01/2019",rel:"Luật Lâm nghiệp",src:"https://vanban.chinhphu.vn/",verified:true},
 ddsh:{issued:"13/11/2008",rel:"Luật Đa dạng sinh học",src:"https://vanban.chinhphu.vn/",verified:true},
 l82:{issued:"25/06/2015",eff:"01/07/2016",rel:"Luật TNMT biển và hải đảo",src:"https://vanban.chinhphu.vn/",verified:true},
 lts:{issued:"21/11/2017",eff:"01/01/2019",rel:"Luật Thủy sản",src:"https://vanban.chinhphu.vn/",verified:true},
 ldl:{issued:"30/11/2024",eff:"01/02/2025",rel:"Luật Điện lực",src:"https://vanban.chinhphu.vn/",verified:true}
});

Object.assign(LAW_META,{
 nd23_2026_water:{issued:"17/01/2026",eff:"17/01/2026",rel:"Sửa các nghị định lĩnh vực tài nguyên nước",src:"https://vanban.chinhphu.vn/?docid=216670&pageid=27160&typegroupid=4",verified:true},
 tt06_2026_water:{issued:"17/01/2026",eff:"17/01/2026",rel:"Sửa các thông tư lĩnh vực tài nguyên nước",src:"https://vanban.chinhphu.vn/?docid=216702&pageid=27160&typegroupid=6",verified:true},
 vbhn10_water_inspection:{issued:"05/02/2026",rel:"Văn bản hợp nhất · đọc thuận tiện",src:"https://vanban.chinhphu.vn/?classid=2629&docid=216899&pageid=27160",verified:true,role:"consolidated"},
 tt22_2026_admin:{issued:"19/05/2026",eff:"19/05/2026",rel:"Sửa thông tư về phân cấp/cắt giảm TTHC",src:"https://vanban.chinhphu.vn/?classid=1&docid=218174&pageid=27160&typegroupid=6",verified:true},
 tt32_2026_bnnmt:{issued:"17/07/2026",eff:"18/09/2026",rel:"Bãi bỏ toàn bộ hoặc một phần một số VBQPPL",src:"https://vanban.chinhphu.vn/?classid=1&docid=218917&pageid=27160",verified:true},
 nd41_2026_fish:{issued:"25/01/2026",eff:"25/01/2026",rel:"Chi tiết thi hành Luật Thủy sản",src:"https://vanban.chinhphu.vn/?docid=216760&pageid=27160&typegroupid=4",verified:true},
 tt16_2026_fish:{issued:"09/03/2026",eff:"09/03/2026",rel:"Quản lý đầu vào nuôi trồng thủy sản",src:"https://vanban.chinhphu.vn/?classid=1&docid=217170&orggroupid=4&pageid=27160",verified:true},
 tt17_2026_fish:{issued:"10/03/2026",eff:"10/03/2026",rel:"Sửa hướng dẫn thủy sản sống nhập khẩu",src:"https://vanban.chinhphu.vn/?classid=1&docid=217171&pageid=27160&typegroupid=6",verified:true},
 vbhn71_fish:{issued:"25/06/2026",rel:"Văn bản hợp nhất · thủy sản sống nhập khẩu",src:"https://vanban.chinhphu.vn/?classid=2629&docid=218574&pageid=27160",verified:true,role:"consolidated"},
 vbhn79_fish:{issued:"27/08/2026",rel:"Văn bản hợp nhất · bảo vệ nguồn lợi thủy sản",src:"https://vanban.chinhphu.vn/?docid=219314&pageid=27160",verified:true,role:"consolidated"},
 vbhn80_fish:{issued:"27/08/2026",rel:"Văn bản hợp nhất · khai thác/IUU/nguồn gốc",src:"https://vanban.chinhphu.vn/?classid=2629&docid=219315&pageid=27160",verified:true,role:"consolidated"},
 tt08_2026_irrig:{issued:"26/01/2026",eff:"26/01/2026",rel:"Chi tiết một số điều Luật Thủy lợi",src:"https://vanban.chinhphu.vn/?docid=216848&pageid=27160",verified:true},
 nd53_2026_disaster:{issued:"05/02/2026",eff:"05/02/2026",rel:"Sửa nghị định đê điều/PCTT",src:"https://vanban.chinhphu.vn/?docid=216892&pageid=27160&typegroupid=4",verified:true},
 nd183_2026_disaster:{issued:"25/05/2026",eff:"10/07/2026",rel:"Sửa NĐ 03/2022 về xử phạt PCTT/thủy lợi/đê điều",src:"https://vanban.chinhphu.vn/?classid=1&docid=218249&pageid=27160&typegroupid=4",verified:true},
 vbhn68_disaster:{issued:"16/06/2026",rel:"Văn bản hợp nhất · xử phạt PCTT/thủy lợi/đê điều",role:"consolidated"},
 vbhn33_disaster:{issued:"23/03/2026",rel:"Văn bản hợp nhất · kế hoạch PCTT địa phương",src:"https://vanban.chinhphu.vn/?docid=217291&pageid=27160",verified:true,role:"consolidated"},
 vbhn34_disaster:{issued:"23/03/2026",rel:"Văn bản hợp nhất · yêu cầu PCTT trong khai thác/hạ tầng",src:"https://vanban.chinhphu.vn/?docid=217292&pageid=27160",verified:true,role:"consolidated"},
 vbhn30_disaster:{issued:"23/03/2026",rel:"Văn bản hợp nhất · Quỹ PCTT",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217288&pageid=27160",verified:true,role:"consolidated"},
 vbhn50_kttv:{issued:"21/04/2026",rel:"Văn bản hợp nhất · chi tiết Luật KTTV",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217918&pageid=27160",verified:true,role:"consolidated"},
 tt84_2025_forest:{issued:"31/12/2025",eff:"01/01/2026",rel:"Chi tiết Luật Lâm nghiệp và sửa thông tư lâm nghiệp/kiểm lâm",src:"https://vanban.chinhphu.vn/?docid=216774&pageid=27160",verified:true},
 vbhn41_land_2026:{issued:"02/04/2026",rel:"Văn bản hợp nhất · thẩm quyền 2 cấp đất đai",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217453&pageid=27160",verified:true,role:"consolidated"},
 vbhn73_land_2026:{issued:"27/07/2026",rel:"Văn bản hợp nhất · xử phạt đất đai",src:"https://vanban.chinhphu.vn/?classid=2629&docid=219005&pageid=27160",verified:true,role:"consolidated"},
 nd50_2026_land:{issued:"31/01/2026",eff:"31/01/2026",rel:"Cơ chế tiền sử dụng đất/tiền thuê đất theo NQ 254/2025/QH15",src:"https://vanban.chinhphu.vn/?classid=1&docid=216861&pageid=27160&typegroupid=4",verified:true},
 tt19_2026_land:{issued:"30/03/2026",eff:"30/03/2026",rel:"Kỹ thuật địa chính/đăng ký/CSDL đất đai",src:"https://vanban.chinhphu.vn/?docid=217452&pageid=27160",verified:true},
 nq229_land:{issued:"13/08/2026",rel:"Kế hoạch/định hướng sửa Luật Đất đai",src:"https://vanban.chinhphu.vn/?classid=509&docid=219199&pageid=27160",verified:true,role:"policy"},
 nq208_env:{issued:"04/08/2026",rel:"Chương trình hành động BVMT & BĐKH",src:"https://vanban.chinhphu.vn/?classid=0&docid=219098&pageid=27160",verified:true,role:"policy"},
 vbhn69_rareearth:{issued:"17/06/2026",rel:"Văn bản hợp nhất · kỹ thuật đất hiếm",src:"https://vanban.chinhphu.vn/?docid=218496&pageid=27160",verified:true,role:"consolidated"},
 tt37_2026_bct:{issued:"30/06/2026",eff:"01/07/2026",rel:"Sửa một số QCVN chất nguy hại trong sản phẩm",src:"https://vanban.chinhphu.vn/?classid=0&docid=218714&pageid=27160",verified:true},
 tt38_2026_bct:{issued:"30/06/2026",eff:"01/07/2026",rel:"Sửa QCVN NaOH/PAC/amôniắc",src:"https://vanban.chinhphu.vn/?classid=0&docid=218715&pageid=27160",verified:true},
});
LAW_META.nq235_2026_paris={...(LAW_META.nq235_2026_paris||{}),role:"policy"};


LAW_META.vbhn98={issued:"10/04/2026",rel:"VBHN Luật BVMT · bản hợp nhất dùng để tra cứu 2026",src:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",verified:true,role:"consolidated"};
LAW_META.vbhn49={issued:"17/04/2026",rel:"VBHN NĐ 08/2022 + sửa đổi 2025–2026",src:"https://vanban.chinhphu.vn/?docid=217892&pageid=27160",verified:true,role:"consolidated"};
LAW_META.vbhn55={issued:"01/06/2026",rel:"VBHN TT 02/2022 + sửa đổi 2025–2026",src:"https://vanban.chinhphu.vn/?classid=2629&docid=218358&pageid=27160",verified:true,role:"consolidated"};



Object.assign(LAW_META,{
 ldat:{issued:"18/01/2024",eff:"01/01/2025",rel:"Luật Đất đai 31/2024/QH15",src:"https://vanban.chinhphu.vn/?docid=211189&pageid=27160",verified:true},
 l43_2024_land:{issued:"29/06/2024",eff:"01/08/2024",rel:"Sửa Luật Đất đai 31/2024 và 3 luật liên quan",src:"https://vanban.chinhphu.vn/?classid=1&docid=211201&pageid=27160",verified:true},
 vbhn37_2026_dike:{issued:"27/03/2026",rel:"VBHN hướng dẫn Luật Đê điều",src:"https://vanban.chinhphu.vn/?classid=2629&docid=217368&pageid=27160",verified:true,role:"consolidated"},
 vbhn77_2026_remote:{issued:"25/08/2026",rel:"VBHN về hoạt động viễn thám",src:"https://vanban.chinhphu.vn/?classid=0&docid=219276&pageid=27160",verified:true,role:"consolidated"},
 tt27_2026_risk:{issued:"30/06/2026",eff:"01/07/2026",rel:"Danh mục sản phẩm/hàng hóa theo mức độ rủi ro",src:"https://vanban.chinhphu.vn/?classid=1&docid=218775&orggroupid=4&pageid=27160",verified:true},
 tt28_2026_pesticide:{issued:"30/06/2026",eff:"15/08/2026",rel:"Sửa danh mục thuốc BVTV được phép/cấm sử dụng",src:"https://vanban.chinhphu.vn/?classid=1&docid=218752&pageid=27160",verified:true},
 nd35_2025_bnnmt:{issued:"25/02/2025",eff:"01/03/2025",rel:"Tổ chức Bộ Nông nghiệp và Môi trường",src:"https://vanban.chinhphu.vn/?docid=212980&pageid=27160",verified:true},
 tt21_2026_expertise:{issued:"24/04/2026",eff:"01/05/2026",rel:"Giám định tư pháp lĩnh vực NN&MT",src:"https://vanban.chinhphu.vn/?classid=0&docid=217947&pageid=27160",verified:true}
});

const PROFESSOR_VERIFIED={
  nd48:{
    checked:"09/09/2026",
    source:"https://vanban.chinhphu.vn/?classid=1&docid=216867&pageid=27160",
    note:"Cổng văn bản Chính phủ xác nhận NĐ 48/2026/NĐ-CP ban hành và có hiệu lực 29/01/2026; sửa NĐ 08/2022 đã được NĐ 05/2025 sửa đổi."
  },
  nq6619:{
    checked:"09/09/2026",
    source:"https://vanban.chinhphu.vn/?docid=218168&pageid=27160",
    note:"Cổng văn bản Chính phủ xác nhận NQ 66.19/2026/NQ-CP ban hành và có hiệu lực 18/05/2026; nội dung về cắt giảm, phân quyền, đơn giản hóa TTHC và điều kiện kinh doanh lĩnh vực NN&MT."
  },
  tt32_2026_bnnmt:{
    checked:"09/09/2026",
    source:"https://vanban.chinhphu.vn/?classid=1&docid=218917&pageid=27160",
    note:"Cổng văn bản Chính phủ xác nhận TT 32/2026/TT-BNNMT ban hành 17/07/2026 và có hiệu lực 18/09/2026; bãi bỏ toàn bộ hoặc một phần một số VBQPPL thuộc thẩm quyền Bộ trưởng."
  },
  nd110:{
    checked:"09/09/2026",
    source:"https://vanban.chinhphu.vn/?docid=217544&pageid=27160&typegroupid=4",
    note:"Cổng văn bản Chính phủ xác nhận NĐ 110/2026/NĐ-CP ban hành 01/04/2026, hiệu lực 25/05/2026; quy định chi tiết EPR về tái chế sản phẩm, bao bì và trách nhiệm xử lý chất thải."
  },

  l72:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?docid=202613&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận Luật 72/2020/QH14 ban hành 17/11/2020, có hiệu lực 01/01/2022."},
  nd08:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?classid=1&docid=205092&pageid=27160&typegroupid=4",note:"Cổng văn bản Chính phủ xác nhận NĐ 08/2022/NĐ-CP ban hành và có hiệu lực 10/01/2022."},
  nd05:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?docid=212284&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận NĐ 05/2025/NĐ-CP ban hành và có hiệu lực 06/01/2025, sửa NĐ 08/2022."},
  l146:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?docid=216543&pageid=27160&typegroupid=3",note:"Cổng văn bản Chính phủ xác nhận Luật 146/2025/QH15 ban hành 11/12/2025, có hiệu lực 01/01/2026."},
  tt09:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?classid=1&docid=216920&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận TT 09/2026/TT-BNNMT ban hành và có hiệu lực 29/01/2026."},
  nd83:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?classid=0&docid=217277&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận NĐ 83/2026/NĐ-CP ban hành và có hiệu lực 23/03/2026."},
  tt24epr:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?classid=1&docid=218478&pageid=27160&typegroupid=6",note:"Cổng văn bản Chính phủ xác nhận TT 24/2026/TT-BNNMT ban hành và có hiệu lực 25/05/2026, hướng dẫn NĐ 110/2026."},
  tt22_2026_admin:{checked:"10/09/2026",source:"https://vanban.chinhphu.vn/?classid=1&docid=218174&pageid=27160&typegroupid=6",note:"Cổng văn bản Chính phủ xác nhận TT 22/2026/TT-BNNMT ban hành và có hiệu lực 19/05/2026; sửa đổi các thông tư liên quan phân cấp, cắt giảm và đơn giản hóa TTHC thuộc phạm vi Bộ Nông nghiệp và Môi trường."},
  nd119:{checked:"10/09/2026",source:"https://vanban.chinhphu.vn/?docid=213875&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận NĐ 119/2025/NĐ-CP ban hành 09/06/2025, hiệu lực 01/08/2025; sửa NĐ 06/2022 về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn."},
  vbhn98:{checked:"09/09/2026",source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",note:"Công báo Chính phủ xác nhận 98/VBHN-VPQH ban hành 10/04/2026, hợp nhất Luật Bảo vệ môi trường."},
  vbhn49:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?docid=217892&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận 49/VBHN-BNNMT ban hành 17/04/2026; PDF chính thức thể hiện NĐ 08/2022 cùng các sửa đổi 2025–2026."},
  vbhn55:{checked:"09/09/2026",source:"https://vanban.chinhphu.vn/?classid=2629&docid=218358&pageid=27160",note:"Cổng văn bản Chính phủ xác nhận 55/VBHN-BNNMT ban hành 01/06/2026; PDF chính thức thể hiện TT 02/2022 cùng các sửa đổi 2025–2026."}

};
function professorVerified(id){return PROFESSOR_VERIFIED[id]||null}

const CORE_IDS=["vbhn98","l72","l146","vbhn49","nd08","nd05","nd48","vbhn55","tt02","tt09","tt22_2026_admin","nd110","tt24epr","nd119","nd83","nq6619","tt32_2026_bnnmt"];

const CORE_READING_CHAIN=[
 {title:"Khung luật hiện hành",note:"Đọc 98/VBHN-VPQH trước để nhìn trạng thái Luật BVMT sau sửa đổi; quay về Luật 72/2020 và Luật 146/2025 khi cần truy lịch sử sửa đổi.",docs:["vbhn98","l72","l146"]},
 {title:"Nghị định chi tiết Luật BVMT",note:"49/VBHN-BNNMT là lớp đọc thuận tiện của NĐ 08 sau các sửa đổi 2025–2026; giữ NĐ 08, NĐ 05 và NĐ 48 để truy đúng nguồn thay đổi.",docs:["vbhn49","nd08","nd05","nd48"]},
 {title:"Thông tư, thủ tục & biểu mẫu",note:"55/VBHN-BNNMT là lớp đọc hiện hành của hệ TT 02; TT 09/2026 và TT 22/2026 cần được kiểm tra khi xử lý biểu mẫu, phân cấp và thủ tục.",docs:["vbhn55","tt02","tt09","tt22_2026_admin"]},
 {title:"EPR — tái chế & xử lý chất thải",note:"Điều 54–55 Luật BVMT được chi tiết bởi NĐ 110/2026 và TT 24/2026; đây là chuỗi riêng cần mở khi xác định nghĩa vụ của nhà sản xuất, nhập khẩu.",docs:["nd110","tt24epr"]},
 {title:"Khí nhà kính & bảo vệ tầng ô-dôn",note:"NĐ 119/2025 sửa NĐ 06/2022 và NĐ 83/2026 tiếp tục sửa đổi hệ thống này; khi xử lý KNK hoặc các chất được kiểm soát phải đọc theo chuỗi.",docs:["nd119","nd83"]},
 {title:"Cơ chế thủ tục & thay đổi hiệu lực 2026",note:"NQ 66.19/2026 tác động trực tiếp tới phân quyền, đơn giản hóa TTHC. TT 32/2026 có hiệu lực 18/09/2026 và cần được theo dõi vì bãi bỏ toàn bộ hoặc một phần một số VBQPPL.",docs:["nq6619","tt32_2026_bnnmt"]}
];

const CORE_ARTICLES=[
 {doc:"vbhn98",ref:"Điều 28",n:28,title:"Tiêu chí về môi trường để phân loại dự án đầu tư",theme:"Phân nhóm & sơ bộ",summary:"Điểm xuất phát để phân dự án thành nhóm I, II, III, IV theo loại hình/quy mô, sử dụng đất-tài nguyên và yếu tố nhạy cảm về môi trường.",caution:"Không phân nhóm chỉ bằng một ngưỡng rời rạc; phải đối chiếu NĐ 08 ở trạng thái đã sửa đổi và phụ lục hiện hành.",query:"Điều 28 phân nhóm dự án",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 29",n:29,title:"Đánh giá sơ bộ tác động môi trường",theme:"Phân nhóm & sơ bộ",summary:"Là bước đánh giá ở giai đoạn chuẩn bị/chủ trương đầu tư đối với đối tượng luật quy định; kết quả được xem xét cùng hồ sơ quyết định hoặc chấp thuận chủ trương đầu tư.",caution:"Không đồng nhất đánh giá sơ bộ với báo cáo ĐTM tại Điều 30–38.",query:"Điều 29 đánh giá sơ bộ tác động môi trường",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},

 {doc:"vbhn98",ref:"Điều 30",n:30,title:"Đối tượng phải thực hiện đánh giá tác động môi trường",theme:"ĐTM",summary:"Xác định nhóm dự án phải làm ĐTM và các trường hợp được loại trừ theo luật/nghị quyết. Đây là cửa vào bắt buộc trước khi nghiên cứu hồ sơ ĐTM.",caution:"Phải xác định đúng nhóm dự án theo Điều 28 và phụ lục nghị định hiện hành trước khi kết luận.",query:"Điều 30 đối tượng ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 31",n:31,title:"Thực hiện đánh giá tác động môi trường",theme:"ĐTM",summary:"Chủ dự án tổ chức thực hiện ĐTM; việc đánh giá gắn với quá trình lập báo cáo nghiên cứu khả thi hoặc tài liệu tương đương và kết quả thể hiện bằng báo cáo ĐTM.",caution:"Cần kiểm tra quy định chi tiết đối với dự án thành phần, phân kỳ và thay đổi dự án.",query:"Điều 31 thực hiện ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 32",n:32,title:"Nội dung của báo cáo đánh giá tác động môi trường",theme:"ĐTM",summary:"Khung nội dung gồm căn cứ, sự phù hợp quy hoạch, công nghệ, điều kiện nền, tác động/chất thải, biện pháp xử lý-giảm thiểu, quản lý-giám sát, tham vấn, kết luận và cam kết.",caution:"Không dùng danh mục nội dung như checklist hình thức; số liệu và đánh giá phải phản ánh đúng dự án, vị trí và giai đoạn.",query:"Điều 32 nội dung báo cáo ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 33",n:33,title:"Tham vấn trong đánh giá tác động môi trường",theme:"ĐTM",summary:"Quy định nhánh tham vấn trong quá trình ĐTM đối với các đối tượng chịu tác động và chủ thể có liên quan theo phạm vi pháp luật quy định.",caution:"Hình thức, đối tượng, trường hợp miễn/khác biệt và hồ sơ chứng minh cần đọc cùng quy định chi tiết đang áp dụng.",query:"Điều 33 tham vấn ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 34",n:34,title:"Thẩm định báo cáo đánh giá tác động môi trường",theme:"ĐTM",summary:"Thiết lập cơ chế thẩm định báo cáo ĐTM trước khi cơ quan có thẩm quyền ra quyết định phê duyệt kết quả thẩm định.",caution:"Không nhầm thẩm định ĐTM với thẩm định GPMT; hồ sơ, hội đồng/tổ chức thẩm định và thời hạn phải tra văn bản chi tiết.",query:"Điều 34 thẩm định báo cáo ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 35",n:35,title:"Thẩm quyền thẩm định báo cáo đánh giá tác động môi trường",theme:"ĐTM",summary:"Xác định cơ quan có thẩm quyền thẩm định ĐTM theo đối tượng dự án và cơ chế phân cấp hiện hành.",caution:"Thẩm quyền là nội dung dễ thay đổi khi tổ chức bộ máy/phân cấp thay đổi; luôn đọc bản hợp nhất và cơ chế 2026 trước khi nộp.",query:"Điều 35 thẩm quyền thẩm định ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 36",n:36,title:"Quyết định phê duyệt kết quả thẩm định báo cáo đánh giá tác động môi trường",theme:"ĐTM",summary:"Quy định quyết định phê duyệt kết quả thẩm định ĐTM và vai trò của quyết định này trong việc tiếp tục triển khai dự án.",caution:"Quyết định phê duyệt không thay thế các giấy phép/chấp thuận chuyên ngành khác.",query:"Điều 36 phê duyệt kết quả thẩm định ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 37",n:37,title:"Trách nhiệm của chủ dự án sau khi có quyết định phê duyệt kết quả thẩm định ĐTM",theme:"ĐTM",summary:"Đặt trách nhiệm của chủ dự án trong việc thực hiện nội dung, yêu cầu và công trình/biện pháp bảo vệ môi trường sau khi ĐTM được phê duyệt.",caution:"Khi dự án thay đổi, phải so sánh phương án trước-sau để xác định nhánh pháp lý tiếp theo; không mặc nhiên làm lại hoặc miễn làm lại.",query:"Điều 37 trách nhiệm sau ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 38",n:38,title:"Trách nhiệm của cơ quan thẩm định báo cáo đánh giá tác động môi trường",theme:"ĐTM",summary:"Quy định trách nhiệm của cơ quan thẩm định đối với kết quả thẩm định và quản lý thông tin/hồ sơ liên quan theo luật.",caution:"Khi cần thao tác hồ sơ thực tế, phải đọc thêm thủ tục hành chính và quy định phân cấp đang hiệu lực.",query:"Điều 38 trách nhiệm cơ quan thẩm định ĐTM",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},

 {doc:"vbhn98",ref:"Điều 39",n:39,title:"Đối tượng phải có giấy phép môi trường",theme:"GPMT",summary:"Xác định các dự án/cơ sở thuộc nhánh GPMT, gồm dự án nhóm I–III có nguồn thải phải xử lý khi vận hành hoặc hoạt động nhập phế liệu/xử lý CTNH, cùng nhóm đối tượng chuyển tiếp; điều luật cũng quy định ngoại lệ.",caution:"Phải đọc đủ các khoản của Điều 39, sau đó đối chiếu Điều 41–43 và nghị định chi tiết trước khi kết luận.",query:"Điều 39 GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 40",n:40,title:"Nội dung giấy phép môi trường",theme:"GPMT",summary:"GPMT có thể chứa nội dung về nước thải, khí thải, tiếng ồn/rung, CTNH, phế liệu nhập khẩu và các yêu cầu bảo vệ môi trường tương ứng.",caution:"Nội dung được cấp phép phải khớp đúng nguồn thải/công trình thực tế; thay đổi nội dung cấp phép có thể kích hoạt Điều 44.",query:"Điều 40 nội dung GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 41",n:41,title:"Thẩm quyền cấp giấy phép môi trường",theme:"GPMT",summary:"Phân định thẩm quyền cấp GPMT giữa Bộ Nông nghiệp và Môi trường, Bộ Quốc phòng/Bộ Công an và Chủ tịch UBND cấp tỉnh theo đối tượng luật quy định.",caution:"Không dùng sơ đồ thẩm quyền cũ theo cấp huyện; phải đọc trạng thái hợp nhất 2026 và quy định phân cấp hiện hành.",query:"Điều 41 thẩm quyền cấp GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 42",n:42,title:"Căn cứ và thời điểm cấp giấy phép môi trường",theme:"GPMT",summary:"Căn cứ cấp phép gồm hồ sơ, kết quả ĐTM nếu có, quy hoạch/phân vùng/khả năng chịu tải, QCVN và pháp luật liên quan; điều luật đồng thời xác định thời điểm phải có GPMT cho từng nhóm trường hợp.",caution:"Thời điểm cấp GPMT quyết định trình tự đầu tư-vận hành; phải đối chiếu đúng giai đoạn của dự án/cơ sở.",query:"Điều 42 căn cứ thời điểm GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 43",n:43,title:"Thẩm định cấp giấy phép môi trường",theme:"GPMT",summary:"Việc cấp GPMT được thực hiện trên cơ sở thẩm định báo cáo đề xuất cấp phép; hồ sơ, thời hạn, nội dung và tổ chức thẩm định được quy định chi tiết ở tầng dưới luật.",caution:"Không dùng quy trình của bản luật cũ nếu tên/nội dung Điều 43 đã được sửa đổi; phải tra trạng thái hợp nhất 2026.",query:"Điều 43 thẩm định cấp GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 44",n:44,title:"Điều chỉnh, cấp lại, tước quyền sử dụng, thu hồi giấy phép môi trường",theme:"GPMT",summary:"Điều chỉnh/cấp lại GPMT được xem xét khi nội dung cấp phép hoặc tình trạng dự án/cơ sở thay đổi theo trường hợp luật quy định; luật cũng đặt khung tước quyền sử dụng và thu hồi.",caution:"Phải xác định chính xác loại thay đổi: thay đổi nguồn thải, công suất, công nghệ, dịch vụ CTNH, nhập phế liệu hay thay đổi khác; mỗi loại không được xử lý giống nhau.",query:"Điều 44 điều chỉnh cấp lại GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 45",n:45,title:"Phí thẩm định cấp giấy phép môi trường",theme:"GPMT",summary:"Đặt căn cứ pháp lý cho phí thẩm định hồ sơ GPMT; mức thu và cơ chế thu-nộp phải tra văn bản phí/lệ phí tương ứng.",caution:"Không tính phí chỉ từ Điều 45; mức tiền phụ thuộc văn bản tài chính và thẩm quyền cụ thể.",query:"Điều 45 phí thẩm định GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 46",n:46,title:"Công trình BVMT và vận hành thử nghiệm công trình xử lý chất thải sau khi được cấp GPMT",theme:"GPMT",summary:"Quy định nhánh thực hiện công trình bảo vệ môi trường và vận hành thử nghiệm công trình xử lý chất thải sau khi được cấp GPMT đối với trường hợp thuộc phạm vi áp dụng.",caution:"Không mặc định mọi công trình đều có cùng chế độ vận hành thử; phải đọc nghị định/thông tư chi tiết và chính GPMT đã cấp.",query:"Điều 46 vận hành thử nghiệm công trình xử lý chất thải",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 47",n:47,title:"Quyền, nghĩa vụ của chủ dự án, cơ sở được cấp giấy phép môi trường",theme:"GPMT",summary:"Đặt quyền và nghĩa vụ của chủ giấy phép trong quá trình thực hiện nội dung GPMT, vận hành công trình bảo vệ môi trường, báo cáo và chấp hành yêu cầu quản lý.",caution:"GPMT là nghĩa vụ trong suốt thời gian vận hành, không phải thủ tục hoàn tất một lần rồi kết thúc.",query:"Điều 47 quyền nghĩa vụ chủ GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 48",n:48,title:"Trách nhiệm của cơ quan cấp giấy phép môi trường",theme:"GPMT",summary:"Quy định trách nhiệm của cơ quan cấp phép trong quản lý, công khai, theo dõi và xử lý các nội dung thuộc GPMT theo thẩm quyền.",caution:"Khi cần thực hiện thủ tục cụ thể, phải kiểm tra TTHC và phân cấp hiện hành chứ không chỉ đọc Điều 48.",query:"Điều 48 trách nhiệm cơ quan cấp GPMT",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},

 {doc:"vbhn98",ref:"Điều 49",n:49,title:"Đăng ký môi trường",theme:"ĐKMT",summary:"Điều 49 là cửa vào của nhánh đăng ký môi trường: đối tượng, trường hợp không phải đăng ký, nội dung, thời điểm, đăng ký lại và trách nhiệm tiếp nhận phải được đọc theo trạng thái hiện hành.",caution:"Không suy luận rằng 'không phải GPMT' đồng nghĩa 'không có nghĩa vụ môi trường'; cần kiểm tra cả các trường hợp miễn đăng ký.",query:"Điều 49 đăng ký môi trường",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},

 {doc:"vbhn98",ref:"Điều 54",n:54,title:"Trách nhiệm tái chế của tổ chức, cá nhân sản xuất, nhập khẩu",theme:"EPR",summary:"Đặt nền tảng trách nhiệm tái chế đối với sản phẩm, bao bì có giá trị tái chế, cho phép tổ chức tái chế hoặc đóng góp tài chính theo cơ chế luật định.",caution:"Từ 25/05/2026 phải đọc cùng NĐ 110/2026 và TT 24/2026 để xác định đối tượng, tỷ lệ/quy cách, miễn trừ, kỳ nghĩa vụ và biểu mẫu.",query:"Điều 54 EPR tái chế",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"},
 {doc:"vbhn98",ref:"Điều 55",n:55,title:"Trách nhiệm thu gom, xử lý chất thải của tổ chức, cá nhân sản xuất, nhập khẩu",theme:"EPR",summary:"Đặt trách nhiệm đóng góp tài chính đối với một số sản phẩm, bao bì chứa chất độc hại, khó tái chế hoặc gây khó khăn cho thu gom, xử lý.",caution:"Không tính nghĩa vụ chỉ từ Điều 55; phải xác định đúng sản phẩm/bao bì, khối lượng và công thức/cơ chế trong NĐ 110/2026 và TT 24/2026.",query:"Điều 55 trách nhiệm xử lý chất thải EPR",basis:"98/VBHN-VPQH",reviewedAt:"09/09/2026"}
];

const CORE_CONTENT_STATUS={
 vbhn98:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Công báo Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"expanded",articleCount:24,articleBasis:"98/VBHN-VPQH",fulltext:"linked",fulltextEmbedded:false},
 vbhn49:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 vbhn55:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 l72:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"superseded-by-vbhn98",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd08:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd05:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd48:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 l146:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 tt09:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nq6619:{metadata:"verified",metadataVerifiedAt:"09/09/2026",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd110:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"topic-guide",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 tt24epr:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"topic-guide",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 tt22_2026_admin:{metadata:"verified",metadataVerifiedAt:"10/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"10/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd119:{metadata:"verified",metadataVerifiedAt:"10/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"10/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 nd83:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 tt32_2026_bnnmt:{metadata:"verified",metadataVerifiedAt:"09/09/2026",metadataSource:"Cổng văn bản Chính phủ",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"none",articleCount:0,fulltext:"linked",fulltextEmbedded:false},
 tt02:{metadata:"catalogued",summary:"reviewed",summaryReviewedAt:"09/09/2026",articleIndex:"superseded-by-vbhn55",articleCount:0,fulltext:"indirect",fulltextEmbedded:false}
};


const N49_GUIDE=[
 {tag:"Chuỗi hiệu lực",title:"NĐ 08 đã được hợp nhất sau nhiều lần sửa",body:"49/VBHN-BNNMT thể hiện NĐ 08/2022/NĐ-CP sau sửa đổi bởi NĐ 05/2025, NĐ 48/2026 và các nội dung liên quan từ NĐ 110/2026. Khi tra một điều hoặc phụ lục, nên đọc bản hợp nhất trước rồi truy ngược văn bản sửa đổi nếu cần biết lịch sử.",ref:"49/VBHN-BNNMT · 17/04/2026"},
 {tag:"Điều 25",title:"Tiêu chí môi trường và yếu tố nhạy cảm",body:"Điều 25 là một điểm then chốt để nối Điều 28 Luật BVMT với hệ phụ lục. Cần xác định loại hình có nguy cơ gây ô nhiễm, quy mô/công suất, dự án có yếu tố nhạy cảm và các tiêu chí chuyên ngành trước khi phân nhóm.",ref:"Điều 25 · VBHN 49"},
 {tag:"Phụ lục II",title:"Loại hình có nguy cơ gây ô nhiễm môi trường",body:"Phụ lục II là bảng nền để nhận diện loại hình sản xuất, kinh doanh, dịch vụ có nguy cơ gây ô nhiễm và mức công suất tương ứng. Không nên phân nhóm bằng tên ngành chung chung nếu chưa đối chiếu phụ lục này.",ref:"Phụ lục II · VBHN 49"},
 {tag:"Phụ lục III",title:"Dự án nhóm I — nguy cơ tác động xấu mức độ cao",body:"Phụ lục III của trạng thái 2026 là danh mục dự án nhóm I. Trong đó có các dự án thuộc loại hình/ngưỡng, dự án có tính chất đặc thù và nhóm dự án có yếu tố nhạy cảm theo tiêu chí của Điều 28 và Điều 25.",ref:"Phụ lục III · kèm NĐ 48/2026"},
 {tag:"Phụ lục IV",title:"Dự án nhóm II — có nguy cơ tác động xấu",body:"Phụ lục IV xác định các trường hợp nhóm II sau khi loại trừ nhóm I. Việc đọc cần kết hợp quy mô/công suất, yếu tố nhạy cảm, loại dự án và trường hợp sử dụng đất, tài nguyên.",ref:"Phụ lục IV · kèm NĐ 48/2026"},
 {tag:"Phụ lục V",title:"Dự án nhóm III — ít có nguy cơ tác động xấu",body:"Phụ lục V bao quát các trường hợp nhóm III, trong đó có loại hình nguy cơ ô nhiễm quy mô nhỏ không có yếu tố nhạy cảm và các trường hợp khác theo khoản 5 Điều 28.",ref:"Phụ lục V · VBHN 49"},
 {tag:"Tham vấn ĐTM",title:"Thời gian tham vấn trực tuyến phụ thuộc nhóm",body:"Trong bản hợp nhất 2026, thời gian đăng tải tham vấn được quy định khác nhau: nhóm I dài hơn nhóm II; dự án nằm trong khu sản xuất, kinh doanh, dịch vụ tập trung hoặc cụm công nghiệp có thời gian riêng. LegalOS dùng thông tin này để cảnh báo về tiến độ, không tự tính hạn nếu chưa xác định đúng trường hợp.",ref:"VBHN 49 · phần tham vấn ĐTM"},
 {tag:"Thay đổi dự án",title:"Không dùng quy tắc “thay đổi là làm lại toàn bộ”",body:"VBHN 49 chứa logic chi tiết về thay đổi quy mô, công suất, công nghệ và tác động xấu gia tăng. Phải so sánh dự án trước–sau, nguồn thải, công nghệ, đa dạng sinh học và các thay đổi khác trước khi chọn nhánh ĐTM/GPMT.",ref:"VBHN 49 · quy định thay đổi dự án"},
 {tag:"Cảnh báo biểu mẫu",title:"Nhiều phụ lục GPMT cũ trong NĐ 08 đã bị bãi bỏ",body:"Các phụ lục mẫu GPMT cũ trong phần cuối NĐ 08 được ghi chú bãi bỏ bởi NĐ 05/2025 và NĐ 48/2026. Khi lập hồ sơ năm 2026 phải chuyển sang bộ mẫu hiện hành trong thông tư/VBHN 55, không lấy lại mẫu cũ vì quen tay.",ref:"VBHN 49 · ghi chú Phụ lục XI–XV"}
];

const VBHN55_GUIDE=[
 {tag:"Điều 18a",title:"Nội dung chính của báo cáo đề xuất cấp GPMT",body:"Điều 18a tổ chức nội dung báo cáo theo loại hồ sơ: dự án đã có ĐTM, dự án không phải ĐTM và cơ sở đang hoạt động. Trọng tâm gồm thông tin dự án/cơ sở, sự phù hợp quy hoạch, công trình thu gom–xử lý chất thải, nguồn thải, nội dung đề nghị cấp phép, quản lý chất thải và các tài liệu kỹ thuật liên quan.",ref:"55/VBHN-BNNMT · Điều 18a"},
 {tag:"Điều 18b",title:"Hồ sơ, thời điểm nộp và trình tự cấp GPMT",body:"Hồ sơ gồm văn bản đề nghị, báo cáo đề xuất cấp GPMT và tài liệu dự án tương ứng theo trường hợp. Điều 18b còn quy định thời điểm nộp, tiếp nhận điện tử, công khai báo cáo, lấy ý kiến khi cần và cách tổ chức thẩm định.",ref:"55/VBHN-BNNMT · Điều 18b"},
 {tag:"Điều 18c",title:"Điều chỉnh và cấp lại GPMT",body:"Hồ sơ điều chỉnh/cấp lại gồm văn bản đề nghị và báo cáo đề xuất tương ứng. Bản hợp nhất quy định riêng trình tự điều chỉnh và cấp lại; với điều chỉnh, hồ sơ có thể thực hiện bằng dịch vụ công trực tuyến toàn trình.",ref:"55/VBHN-BNNMT · Điều 18c"},
 {tag:"Điều 19",title:"Bộ biểu mẫu GPMT và vận hành thử",body:"Điều 19 dẫn tới hệ mẫu trong Phụ lục II: quyết định hội đồng/đoàn kiểm tra, văn bản đề nghị, các loại báo cáo đề xuất, biên bản thẩm định, giấy phép, quyết định thu hồi, kế hoạch và báo cáo vận hành thử.",ref:"55/VBHN-BNNMT · Điều 19"},
 {tag:"Điều 20",title:"Quan trắc bổ sung khi cơ sở đang hoạt động xin GPMT",body:"Bản hợp nhất quy định cách lấy mẫu bổ sung khác nhau tùy mức tương đương nhóm I/II hay nhóm III nhằm đánh giá hiệu quả công trình xử lý hiện hữu trước khi cấp phép.",ref:"55/VBHN-BNNMT · Điều 20"},
 {tag:"Điều 21",title:"Quan trắc trong quá trình vận hành thử",body:"Điều 21 quy định nguyên tắc lấy mẫu, tần suất và giai đoạn đánh giá vận hành thử cho công trình xử lý nước thải/khí thải. Khi áp dụng phải đối chiếu chính GPMT, loại công trình và trường hợp cụ thể.",ref:"55/VBHN-BNNMT · Điều 21"},
 {tag:"Báo cáo định kỳ",title:"Tách báo cáo của đối tượng GPMT và ĐKMT",body:"VBHN 55 dùng biểu mẫu riêng cho báo cáo công tác bảo vệ môi trường của đối tượng có GPMT và đối tượng thuộc đăng ký môi trường; trường hợp được miễn ĐKMT cũng cần kiểm tra quy định về nghĩa vụ báo cáo.",ref:"55/VBHN-BNNMT · Phụ lục VI"}
];

const VBHN55_FORMS=[
 ["22","Quyết định thành lập hội đồng thẩm định cấp/cấp lại GPMT"],
 ["22a","Văn bản đề nghị cấp, điều chỉnh, cấp lại GPMT"],
 ["22b","Báo cáo đề xuất GPMT — dự án đã có quyết định phê duyệt ĐTM trước vận hành thử"],
 ["22c","Báo cáo đề xuất cấp/cấp lại GPMT — dự án nhóm II không phải ĐTM và dự án nhóm III"],
 ["22d","Báo cáo đề xuất cấp/cấp lại GPMT — cơ sở đang hoạt động"],
 ["22đ","Báo cáo đề xuất điều chỉnh GPMT"],
 ["24","Quyết định thành lập đoàn kiểm tra cấp/cấp lại GPMT"],
 ["28","Biên bản họp hội đồng thẩm định"],
 ["29","Biên bản kiểm tra cấp/cấp lại GPMT"],
 ["30","Bản nhận xét thành viên hội đồng thẩm định"],
 ["31","Phiếu thẩm định thành viên hội đồng"],
 ["32","Bản nhận xét thành viên đoàn kiểm tra"],
 ["33","Thông báo hoàn thiện hoặc trả hồ sơ GPMT"],
 ["35","Thông báo điều chỉnh loại/khối lượng CTNH hoặc phế liệu nhập khẩu theo trường hợp quy định"],
 ["37","Văn bản tham vấn trong quá trình cấp/cấp lại GPMT"],
 ["39","Văn bản trả lời của cơ quan/tổ chức được tham vấn"],
 ["40","Giấy phép môi trường — cấp/cấp lại"],
 ["41","Giấy phép môi trường điều chỉnh"],
 ["42","Quyết định thu hồi GPMT"],
 ["43","Thông báo kế hoạch vận hành thử nghiệm công trình xử lý chất thải"],
 ["43a","Báo cáo kết quả vận hành thử nghiệm"],
 ["44","Quyết định cử cán bộ/công chức kiểm tra thực tế vận hành thử"],
 ["44a","Quyết định thành lập đoàn kiểm tra thực tế vận hành thử"],
 ["45","Biên bản kiểm tra, giám sát vận hành thử"],
 ["46","Biên bản kiểm tra vận hành thử đối với phế liệu/CTNH"]
];

const EPR_GUIDE=[
 {tag:"Điều 54",title:"Trách nhiệm tái chế",body:"Nhà sản xuất, nhập khẩu thuộc phạm vi sản phẩm/bao bì của cơ chế EPR phải xác định tỷ lệ và quy cách tái chế bắt buộc theo NĐ 110/2026. Điều 54 của Luật là tầng khung; số liệu thực hiện nằm ở NĐ 110 và phụ lục.",ref:"98/VBHN-VPQH · Điều 54"},
 {tag:"NĐ 110/2026",title:"Đối tượng và trường hợp không phải thực hiện",body:"NĐ 110/2026 làm rõ chủ thể chịu trách nhiệm và một số trường hợp không phải thực hiện trách nhiệm tái chế, bao gồm hàng hóa cho xuất khẩu/tạm nhập tái xuất/nghiên cứu theo phạm vi luật và ngưỡng doanh thu được nghị định quy định.",ref:"NĐ 110/2026 · hiệu lực 25/05/2026"},
 {tag:"Hình thức",title:"Tổ chức tái chế hoặc đóng góp tài chính theo cơ chế luật định",body:"Khi tổ chức tái chế, doanh nghiệp có thể tự thực hiện, thuê đơn vị tái chế, ủy quyền tổ chức trách nhiệm tái chế hoặc kết hợp các cách thức được cho phép. Đơn vị trực tiếp tái chế phải đáp ứng điều kiện môi trường tương ứng.",ref:"NĐ 110/2026"},
 {tag:"Kết quả tái chế",title:"Có cơ chế bảo lưu phần thực hiện vượt yêu cầu",body:"NĐ 110/2026 quy định việc xử lý kết quả tái chế vượt tỷ lệ bắt buộc cho các năm tiếp theo theo điều kiện của nghị định. Khi tính cần giữ hồ sơ khối lượng và chứng từ đủ truy vết.",ref:"NĐ 110/2026"},
 {tag:"Phụ lục I",title:"Không tính EPR bằng một tỷ lệ chung",body:"Tỷ lệ và quy cách tái chế bắt buộc được gắn theo nhóm sản phẩm/bao bì trong Phụ lục I. LegalOS không tự áp một con số chung cho mọi doanh nghiệp.",ref:"NĐ 110/2026 · Phụ lục I"},
 {tag:"TT 24/2026",title:"Biểu mẫu và hướng dẫn thực hiện",body:"TT 24/2026/TT-BNNMT có hiệu lực 25/05/2026, hướng dẫn NĐ 110 và là lớp phải mở khi chuẩn bị kê khai, chứng từ hoặc biểu mẫu EPR.",ref:"TT 24/2026/TT-BNNMT"},
 {tag:"Điều 55",title:"Trách nhiệm xử lý chất thải",body:"Điều 55 và NĐ 110 tạo nhánh nghĩa vụ xử lý chất thải riêng với tái chế. Phải xác định đúng sản phẩm/bao bì, khối lượng và công thức tài chính trước khi tính nghĩa vụ.",ref:"98/VBHN-VPQH · Điều 55"}
];

const ARTICLE_PRACTICE={
 28:{ask:["Loại hình dự án là gì?","Quy mô/công suất theo phụ lục nào?","Có yếu tố nhạy cảm môi trường không?","Có dùng đất, mặt nước, biển hoặc khai thác tài nguyên không?"],read:["Điều 25 VBHN 49","Phụ lục II","Phụ lục III–V"]},
 30:{ask:["Đã xác định đúng nhóm I/II chưa?","Có thuộc trường hợp loại trừ không?","Dự án mới, mở rộng hay thay đổi?"],read:["Điều 28–29","VBHN 49","Phụ lục III–IV"]},
 33:{ask:["Đối tượng nào chịu tác động trực tiếp?","Hình thức tham vấn nào phải thực hiện?","Bằng chứng niêm yết/họp/đăng tải đã đủ chưa?"],read:["VBHN 49 · thủ tục tham vấn","Biểu mẫu tham vấn hiện hành"]},
 35:{ask:["Dự án thuộc thẩm quyền nào sau phân cấp 2026?","Có yếu tố quốc phòng/an ninh hoặc thẩm quyền đặc thù không?"],read:["98/VBHN-VPQH","NĐ 131/2025","NQ 66.19/2026 nếu thuộc phạm vi"]},
 39:{ask:["Dự án/cơ sở thuộc nhóm nào?","Có nước thải hoặc bụi/khí thải phải xử lý?","Có nhập phế liệu hoặc dịch vụ CTNH?","Là cơ sở hoạt động trước hay sau thời điểm Luật có hiệu lực?","Có thuộc ngoại lệ không?"],read:["Điều 40–43","VBHN 49","VBHN 55"]},
 41:{ask:["Chủ thể cấp phép hiện là cơ quan nào?","Có thuộc Bộ Quốc phòng/Bộ Công an?","Có phân cấp/ủy quyền năm 2026 không?"],read:["98/VBHN-VPQH","VBHN 49","NQ 66.19/2026 nếu liên quan"]},
 42:{ask:["ĐTM đã phê duyệt chưa?","Công trình phát sinh chất thải đã ở giai đoạn nào?","Thời điểm nộp hồ sơ GPMT đã phù hợp chưa?"],read:["Điều 18b VBHN 55","Quyết định ĐTM","Hồ sơ dự án"]},
 43:{ask:["Thuộc trường hợp hội đồng hay đoàn kiểm tra?","Có thay đổi so với ĐTM?","Có yêu cầu lấy ý kiến chuyên môn bổ sung không?"],read:["Điều 18a–18b VBHN 55","Mẫu 22–33 Phụ lục II"]},
 44:{ask:["Thay đổi gì so với giấy phép hiện có?","Nguồn thải/lưu lượng/công nghệ/vị trí xả có đổi không?","Thuộc điều chỉnh hay cấp lại?"],read:["Điều 18c VBHN 55","Mẫu 22a, 22đ, 41"]},
 46:{ask:["Công trình nào phải vận hành thử?","Kế hoạch lấy mẫu đã phù hợp GPMT chưa?","Có trường hợp kiểm tra thực tế đặc thù?"],read:["Điều 20–21 VBHN 55","Mẫu 43–46"]},
 49:{ask:["Có phát sinh chất thải không?","Có thuộc đối tượng GPMT không?","Có thuộc trường hợp miễn ĐKMT không?","Thời điểm đăng ký và đăng ký lại là khi nào?","Cơ quan tiếp nhận hiện hành là ai?"],read:["98/VBHN-VPQH Điều 49","VBHN 49","VBHN 55 · nghĩa vụ báo cáo"]},
 54:{ask:["Sản phẩm/bao bì thuộc Phụ lục I NĐ 110 không?","Doanh thu/miễn trừ có áp dụng không?","Chọn tổ chức tái chế hay đóng góp tài chính?","Khối lượng đưa ra thị trường được chứng minh bằng dữ liệu nào?"],read:["NĐ 110/2026","TT 24/2026","Phụ lục I"]},
 55:{ask:["Thuộc nhánh trách nhiệm xử lý chất thải nào?","Khối lượng và chủ thể nghĩa vụ đã xác định đúng chưa?","Có chứng từ/hồ sơ đủ truy vết không?"],read:["NĐ 110/2026","TT 24/2026"]}
};

const DOC_DEEP_GUIDES={
 vbhn98:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">Ghi chú áp dụng</div><h2>98/VBHN-VPQH — Luật BVMT ở trạng thái hợp nhất 2026</h2></div><span>Rà 09/09/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>1. Cách đọc theo vòng đời dự án</b><p>Điều 28–29 dùng để phân nhóm và đánh giá sơ bộ; Điều 30–38 là chuỗi ĐTM; Điều 39–48 là chuỗi GPMT; Điều 49 là ĐKMT; Điều 54–55 là lõi EPR. LegalOS trình bày các cụm này như các nhánh liên kết thay vì các Điều rời nhau.</p></article>
  <article><b>2. Không dừng ở Luật</b><p>Luật chỉ xác lập khung. Khi xử lý hồ sơ phải nối xuống 49/VBHN-BNNMT để đọc tiêu chí, phụ lục và chi tiết nghị định; nối tiếp 55/VBHN-BNNMT để đọc hồ sơ, trình tự và biểu mẫu.</p></article>
  <article><b>3. Dữ liệu dự án phải đi trước kết luận</b><p>Loại hình, công suất, địa điểm, đất/rừng/nước, yếu tố nhạy cảm, nguồn nước thải, khí thải, CTNH, công nghệ và tình trạng pháp lý hiện hữu là dữ liệu đầu vào. Thiếu dữ liệu phải được ghi là thiếu, không tự suy thành “không thuộc”.</p></article>
  <article><b>4. Trạng thái dữ liệu trong LegalOS</b><p>Hiện đã lập mục tra cứu cho Điều 28–49 và 54–55; chưa nhúng toàn văn Khoản/Điểm. Khi cần trích dẫn chính xác, sử dụng liên kết Công báo để mở bản hợp nhất chính thức.</p></article>
 </div></section>`,
 vbhn49:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">Ghi chú áp dụng</div><h2>49/VBHN-BNNMT — nghị định chi tiết đang dùng</h2></div><span>Rà 09/09/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>Chuỗi sửa đổi</b><p>VBHN 49 thể hiện NĐ 08/2022 sau NĐ 05/2025, NĐ 48/2026 và các sửa đổi liên quan từ NĐ 110/2026. Nên đọc văn bản này trước khi quay về từng nghị định sửa đổi.</p></article>
  <article><b>Phân nhóm dự án</b><p>Điều 25 và Phụ lục II–V là trục thực hành quan trọng. Phụ lục II xác định loại hình nguy cơ gây ô nhiễm; Phụ lục III, IV, V lần lượt là các danh mục nhóm I, II, III theo trạng thái hiện hành.</p></article>
  <article><b>Tham vấn ĐTM</b><p>Bản hợp nhất 2026 thể hiện thời gian tham vấn trên trang thông tin điện tử khác nhau theo nhóm dự án và trường hợp dự án nằm trong khu/cụm sản xuất. Không nên dùng một mốc thời gian cho tất cả dự án.</p></article>
  <article><b>Thay đổi dự án & giấy phép</b><p>Nghị định có logic riêng cho tăng quy mô/công suất, thay đổi công nghệ, gia tăng tác động xấu, chia tách dự án/cơ sở và thay đổi sau cấp GPMT. Cần so sánh hồ sơ trước–sau thay vì áp quy tắc một chiều.</p></article>
  <article><b>Cảnh báo phụ lục cũ</b><p>Một số phụ lục biểu mẫu GPMT ở bản NĐ 08 cũ đã được ghi bãi bỏ trong VBHN 49. Hồ sơ 2026 phải tra bộ mẫu hiện hành ở 55/VBHN-BNNMT thay vì sao chép mẫu cũ.</p></article>
 </div></section>`,
 vbhn55:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">Ghi chú áp dụng</div><h2>55/VBHN-BNNMT — hướng dẫn và biểu mẫu đang dùng</h2></div><span>Rà 09/09/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>Điều 18a</b><p>Tổ chức nội dung báo cáo đề xuất GPMT theo từng nhóm hồ sơ: dự án đã có ĐTM, dự án không thuộc ĐTM và cơ sở đang hoạt động. Đây là “khung xương” để kiểm tra chất lượng báo cáo trước khi đi vào biểu mẫu.</p></article>
  <article><b>Điều 18b</b><p>Quy định hồ sơ, thời điểm nộp và trình tự cấp GPMT. Hồ sơ cơ bản gồm văn bản đề nghị, báo cáo đề xuất và tài liệu dự án theo trường hợp; thủ tục có các nhánh công khai, tham vấn/lấy ý kiến và thẩm định.</p></article>
  <article><b>Điều 18c</b><p>Tách riêng thủ tục điều chỉnh và cấp lại. Khi hồ sơ thay đổi, trước tiên phải phân loại đúng “điều chỉnh” hay “cấp lại”, sau đó mới chọn biểu mẫu và trình tự.</p></article>
  <article><b>Điều 19 + Phụ lục II</b><p>Là bản đồ biểu mẫu GPMT. Đã lập riêng danh mục mẫu 22–46 để người dùng không phải dò hàng trăm trang phụ lục khi chỉ cần xác định đúng loại hồ sơ.</p></article>
  <article><b>Vận hành thử</b><p>Điều 20–21 và các Mẫu 43–46 tạo chuỗi kế hoạch → quan trắc → kiểm tra → báo cáo kết quả. Việc áp dụng phải khớp với công trình xử lý và nội dung GPMT thực tế.</p></article>
 </div></section>`,
 nd110:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">EPR 2026</div><h2>NĐ 110/2026/NĐ-CP — văn bản quy định chi tiết của Điều 54–55</h2></div><span>Hiệu lực 25/05/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>Đối tượng</b><p>Phải xác định đúng nhà sản xuất/nhập khẩu, nhóm sản phẩm hoặc bao bì đưa ra thị trường Việt Nam và Phụ lục I. Không áp một tỷ lệ tái chế chung cho mọi sản phẩm.</p></article>
  <article><b>Miễn trừ & ngoại lệ</b><p>Nghị định quy định các trường hợp không phải thực hiện trách nhiệm tái chế, trong đó có một số trường hợp xuất khẩu/tạm nhập tái xuất/nghiên cứu và ngưỡng doanh thu. Phải kiểm tra đúng điều kiện trước khi kết luận miễn.</p></article>
  <article><b>Hình thức thực hiện</b><p>Doanh nghiệp có thể tổ chức tái chế theo các cách thức được nghị định cho phép hoặc thực hiện cơ chế đóng góp tài chính theo nhánh luật định. Đơn vị trực tiếp tái chế phải đáp ứng yêu cầu môi trường tương ứng.</p></article>
  <article><b>Dữ liệu chứng minh</b><p>Khối lượng đưa ra thị trường, kết quả tái chế, hợp đồng, chứng từ và dữ liệu kê khai phải được tổ chức đủ để truy vết. Không tự suy ra nghĩa vụ từ một con số không có hồ sơ nguồn.</p></article>
 </div></section>`,
 tt24epr:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">EPR 2026</div><h2>TT 24/2026/TT-BNNMT — hướng dẫn thực hiện NĐ 110</h2></div><span>Hiệu lực 25/05/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>Vai trò</b><p>Thông tư là lớp phải đọc khi đi từ nghĩa vụ EPR ở Luật/NĐ 110 sang kê khai, hồ sơ, chứng từ và biểu mẫu thực hiện.</p></article>
  <article><b>Cách dùng trong LegalOS</b><p>LegalOS giữ Điều 54–55 để xác định nhánh nghĩa vụ, NĐ 110 để xác định đối tượng/cơ chế và TT 24 để hoàn thiện thao tác hồ sơ. Ba tầng này không được thay thế cho nhau.</p></article>
 </div></section>`,
 nq6619:`<section class="deep-law-guide"><div class="deep-guide-head"><div><div class="section-kicker">Cơ chế thủ tục 2026</div><h2>NQ 66.19/2026/NQ-CP — phải đọc đúng phạm vi và thời gian áp dụng</h2></div><span>Rà 09/09/2026</span></div>
 <div class="deep-guide-grid">
  <article><b>Bản chất</b><p>Đây là cơ chế cắt giảm, phân quyền và đơn giản hóa TTHC/điều kiện kinh doanh trong phạm vi quản lý của Bộ Nông nghiệp và Môi trường; không phải văn bản thay toàn bộ Luật BVMT hoặc NĐ 08.</p></article>
  <article><b>Cách áp dụng an toàn</b><p>Khi một thủ tục thuộc phạm vi nghị quyết, phải mở văn bản gốc để kiểm tra chính xác điều khoản áp dụng, thời gian và quy định chuyển tiếp. LegalOS không tự gắn một ngày hết hiệu lực nếu metadata chính thức chưa thể hiện đầy đủ.</p></article>
 </div></section>`
};

function deepGuideFor(id){return DOC_DEEP_GUIDES[id]||""}

const LEGAL_HIGHLIGHTS=[
 {id:"nd48",date:"29/01/2026",ttl:"NĐ 48/2026/NĐ-CP",txt:"Tiếp tục sửa NĐ 08/2022; liên quan phân cấp, ĐTM/GPMT và quản lý BVMT."},
 {id:"nd83",date:"23/03/2026",ttl:"NĐ 83/2026/NĐ-CP",txt:"Tiếp tục sửa khung KNK & tầng ô-dôn, đồng thời đơn giản hóa một số thủ tục."},
 {id:"nq6619",date:"18/05/2026",ttl:"NQ 66.19/2026/NQ-CP",txt:"Cắt giảm/phân quyền TTHC; có thời hạn áp dụng.",temp:true},
 {id:"nd110",date:"25/05/2026",ttl:"NĐ 110/2026/NĐ-CP",txt:"Khung EPR chuyên biệt về tái chế sản phẩm, bao bì và xử lý chất thải."}
];
const OFFICIAL_SOURCES=[
 ["CSDL quốc gia về VBPL","Nguồn tra cứu hiệu lực, lịch sử, lược đồ và văn bản liên quan.","https://vbpl.vn/"],
 ["Cổng văn bản Chính phủ","Nguồn ưu tiên để kiểm tra số hiệu, ngày ban hành, ngày hiệu lực và file văn bản.","https://vanban.chinhphu.vn/"],
 ["Luật 146/2025/QH15","Luật sửa đổi 15 luật trong lĩnh vực nông nghiệp và môi trường.",LAW_META.l146.src],
 ["NĐ 48/2026/NĐ-CP","Văn bản sửa NĐ 08/2022 đã được NĐ 05/2025 sửa đổi.",LAW_META.nd48.src],
 ["NQ 66.19/2026/NQ-CP","Cơ chế cắt giảm/phân quyền/đơn giản hóa TTHC có thời hạn.",LAW_META.nq6619.src],
 ["NĐ 110/2026/NĐ-CP","Văn bản trọng tâm về EPR từ 25/05/2026.",LAW_META.nd110.src],
 ["TT 24/2026/TT-BNNMT","Thông tư hướng dẫn NĐ 110/2026 về EPR.",LAW_META.tt24epr.src]
];


LEGAL_HIGHLIGHTS.push(
 {id:"tt32_2026_bnnmt",date:"18/09/2026",ttl:"TT 32/2026/TT-BNNMT",txt:"Sắp có hiệu lực: bãi bỏ toàn bộ hoặc một phần một số VBQPPL; cần rà các thông tư cũ trước khi dùng."},
 {id:"nq208_env",date:"04/08/2026",ttl:"NQ 208/NQ-CP",txt:"Chương trình hành động về BVMT và chủ động ứng phó BĐKH; theo dõi định hướng, không thay điều kiện pháp lý cụ thể."},
 {id:"nq229_land",date:"13/08/2026",ttl:"NQ 229/NQ-CP",txt:"Kế hoạch triển khai định hướng sửa Luật Đất đai; dùng để theo dõi xu hướng sửa luật."}
);

OFFICIAL_SOURCES.push(
 ["98/VBHN-VPQH (10/04/2026)","Bản hợp nhất Luật Bảo vệ môi trường; văn bản nên mở trước để xem nội dung luật sau sửa đổi.","https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm"],
 ["49/VBHN-BNNMT (17/04/2026)","Bản hợp nhất NĐ 08/2022 sau các sửa đổi 2025–2026.","https://vanban.chinhphu.vn/?docid=217892&pageid=27160"],
 ["55/VBHN-BNNMT (01/06/2026)","Bản hợp nhất TT 02/2022 sau các sửa đổi 2025–2026.","https://vanban.chinhphu.vn/?classid=2629&docid=218358&pageid=27160"]
);

OFFICIAL_SOURCES.push(
 ["NĐ 23/2026/NĐ-CP","Sửa các nghị định lĩnh vực tài nguyên nước.",LAW_META.nd23_2026_water.src],
 ["TT 32/2026/TT-BNNMT","Bãi bỏ toàn bộ hoặc một phần một số VBQPPL; hiệu lực 18/09/2026.",LAW_META.tt32_2026_bnnmt.src],
 ["NĐ 41/2026/NĐ-CP","Chi tiết một số điều và biện pháp thi hành Luật Thủy sản.",LAW_META.nd41_2026_fish.src]
);

const $=id=>document.getElementById(id);

const STORE={
  get(k,fb){try{const v=JSON.parse(window.localStorage.getItem(k));return v??fb}catch{return fb}},
  set(k,v){try{window.localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}}
};
let saved=STORE.get("w3_saved",[]);
let recent=STORE.get("w3_recent",[]);
let notes=STORE.get("w3_notes",{});
let procDone=STORE.get("w3_proc",{});
let cases=STORE.get("w3_cases",[]);
let lastAnalysis=null;
let expertBriefs=STORE.get("v10_expert_briefs",[]);
let lastExpertAnalysis=null;

let libraryView=STORE.get("v8_library_view","list");
let libraryDensity=STORE.get("v13_library_density","compact");
let libraryAssistOpen=STORE.get("v13_library_assist",false);
let savedOnlyMode=STORE.get("v8_saved_only",false);
let quickNote=STORE.get("v8_quick_note","");
let uiPrefs=STORE.get("v8_ui_prefs",{scale:"normal",density:"comfortable",sidebar:false});
let wizardState={pid:null,index:0};


const IMPORT_DB_NAME='legalos_v9_documents';
const IMPORT_DB_STORE='files';
const IMPORT_MAX_BYTES=100*1024*1024;
let importedDocs=[];
let importMemory=[];
let importDbFailed=false;
let selectedImportId=null;
let importObjectURL=null;

function openImportDB(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('IndexedDB unavailable'));return}
    const req=indexedDB.open(IMPORT_DB_NAME,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(IMPORT_DB_STORE))db.createObjectStore(IMPORT_DB_STORE,{keyPath:'id'})};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('IndexedDB error'));
  });
}
async function importDbTx(mode,fn){
  if(importDbFailed)return fn(null,true);
  try{const db=await openImportDB();return await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,mode),st=tx.objectStore(IMPORT_DB_STORE);let out;try{out=fn(st,false,resolve,reject)}catch(e){reject(e)}tx.oncomplete=()=>{db.close();if(out!==undefined)resolve(out)};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true;return fn(null,true)}
}
async function importDbAll(){
  if(importDbFailed)return [...importMemory];
  try{const db=await openImportDB();const persisted=await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readonly'),r=tx.objectStore(IMPORT_DB_STORE).getAll();r.onsuccess=()=>{db.close();resolve(r.result||[])};r.onerror=()=>{db.close();reject(r.error)}});const map=new Map(persisted.map(x=>[x.id,x]));importMemory.forEach(x=>map.set(x.id,x));return [...map.values()]}catch(e){importDbFailed=true;return [...importMemory]}
}
async function importDbGet(id){const mem=importMemory.find(x=>x.id===id);if(mem)return mem;if(importDbFailed)return null;try{const db=await openImportDB();return await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readonly'),r=tx.objectStore(IMPORT_DB_STORE).get(id);r.onsuccess=()=>{db.close();resolve(r.result||null)};r.onerror=()=>{db.close();reject(r.error)}})}catch(e){importDbFailed=true;return null}}
async function importDbPut(rec){if(importDbFailed){const i=importMemory.findIndex(x=>x.id===rec.id);if(i>=0)importMemory[i]=rec;else importMemory.push(rec);return false}try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).put(rec);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}});return true}catch(e){const i=importMemory.findIndex(x=>x.id===rec.id);if(i>=0)importMemory[i]=rec;else importMemory.push(rec);return false}}
async function importDbDelete(id){importMemory=importMemory.filter(x=>x.id!==id);if(importDbFailed)return;try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).delete(id);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true}}
async function importDbClear(){importMemory=[];if(importDbFailed)return;try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).clear();tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true}}
function fileExt(name=''){const m=String(name).toLowerCase().match(/\.([a-z0-9]+)$/);return m?m[1]:''}
function fileGroup(ext){if(ext==='pdf')return'pdf';if(['doc','docx','odt'].includes(ext))return'word';if(['txt','md','markdown','html','htm','rtf'].includes(ext))return'text';if(['json','csv'].includes(ext))return'data';return'other'}
function fileIcon(ext){const g=fileGroup(ext);return g==='pdf'?'PDF':g==='word'?'W':g==='text'?'TXT':g==='data'?'{}':'FILE'}
function humanBytes(n=0){if(n<1024)return n+' B';if(n<1024*1024)return(n/1024).toFixed(1)+' KB';return(n/1024/1024).toFixed(n>10*1024*1024?0:1)+' MB'}
function importCategoryName(x){return({legal:'Tài liệu pháp luật',project:'Hồ sơ dự án',reference:'Tham khảo',report:'Báo cáo / nghiên cứu',evidence:'Minh chứng / quan trắc',other:'Khác'})[x]||'Khác'}
function xmlToText(xml,kind){let prepared=xml;if(kind==='docx')prepared=prepared.replace(/<\/w:p>/g,'</w:p>\n').replace(/<w:tab\/?\s*>/g,'\t');if(kind==='odt')prepared=prepared.replace(/<\/text:p>/g,'</text:p>\n').replace(/<text:tab\/?\s*>/g,'\t');const doc=new DOMParser().parseFromString(prepared,'application/xml');return(doc.documentElement?.textContent||'').replace(/\n\s*\n\s*\n+/g,'\n\n').replace(/[ \t]+\n/g,'\n').trim()}
async function zipEntryText(blob,wanted){
  const ab=await blob.arrayBuffer(),v=new DataView(ab),u=new Uint8Array(ab),dec=new TextDecoder();let e=-1;const start=Math.max(0,u.length-65557);
  for(let i=u.length-22;i>=start;i--){if(v.getUint32(i,true)===0x06054b50){e=i;break}}
  if(e<0)throw new Error('ZIP directory not found');const total=v.getUint16(e+10,true),off=v.getUint32(e+16,true);let p=off;
  for(let n=0;n<total&&p+46<=u.length;n++){
    if(v.getUint32(p,true)!==0x02014b50)break;const method=v.getUint16(p+10,true),cs=v.getUint32(p+20,true),nl=v.getUint16(p+28,true),xl=v.getUint16(p+30,true),cl=v.getUint16(p+32,true),lo=v.getUint32(p+42,true),name=dec.decode(u.slice(p+46,p+46+nl));
    if(name===wanted){const lnl=v.getUint16(lo+26,true),lxl=v.getUint16(lo+28,true),ds=lo+30+lnl+lxl,comp=u.slice(ds,ds+cs);let out;if(method===0)out=comp;else if(method===8){if(typeof DecompressionStream==='undefined')throw new Error('Browser decompression unsupported');const stream=new Blob([comp]).stream().pipeThrough(new DecompressionStream('deflate-raw'));out=new Uint8Array(await new Response(stream).arrayBuffer())}else throw new Error('Unsupported compression');return dec.decode(out)}p+=46+nl+xl+cl;
  }
  throw new Error('Entry not found');
}
async function extractImportText(file,ext){
  try{
    if(['txt','md','markdown','csv','json'].includes(ext)){const t=await file.text();return{text:t.slice(0,250000),status:'Đã đọc text'}}
    if(['html','htm'].includes(ext)){const raw=await file.text(),doc=new DOMParser().parseFromString(raw,'text/html');return{text:(doc.body?.innerText||doc.body?.textContent||'').slice(0,250000),status:'Đã trích text HTML'}}
    if(ext==='rtf'){const raw=await file.text();const t=raw.replace(/\\par[d]?/g,'\n').replace(/\\'[0-9a-fA-F]{2}/g,'').replace(/\\[a-zA-Z]+-?\d* ?/g,'').replace(/[{}]/g,'');return{text:t.slice(0,250000),status:'Đã đọc RTF cơ bản'}}
    if(ext==='docx'){const xml=await zipEntryText(file,'word/document.xml');return{text:xmlToText(xml,'docx').slice(0,250000),status:'Đã trích text DOCX'}}
    if(ext==='odt'){const xml=await zipEntryText(file,'content.xml');return{text:xmlToText(xml,'odt').slice(0,250000),status:'Đã trích text ODT'}}
    if(ext==='pdf')return{text:'',status:'PDF — xem bằng trình đọc của Chrome'};
    if(ext==='doc')return{text:'',status:'DOC nhị phân — lưu file, chưa trích text'};
    return{text:'',status:'Đã lưu file'};
  }catch(e){return{text:'',status:'Đã lưu; chưa trích được text'}}
}
function newImportId(){return crypto?.randomUUID?crypto.randomUUID():'f'+Date.now()+Math.random().toString(16).slice(2)}
async function importFiles(files){
  const arr=[...files];if(!arr.length)return;const p=$('importProgress'),bar=p?.querySelector('span');p?.classList.add('on');let done=0,added=0;
  for(const file of arr){
    if(file.size>IMPORT_MAX_BYTES){toast(`Bỏ qua ${file.name}: lớn hơn 100 MB`);done++;if(bar)bar.style.width=(done/arr.length*100)+'%';continue}
    const ext=fileExt(file.name),ex=await extractImportText(file,ext);const rec={id:newImportId(),name:file.name,type:file.type||'',ext,size:file.size,category:$('importCategory')?.value||'other',note:'',linkedCase:'',importedAt:new Date().toISOString(),previewText:ex.text,extractStatus:ex.status,blob:file};const persisted=await importDbPut(rec);if(!persisted)rec.extractStatus=(rec.extractStatus?rec.extractStatus+' · ':'')+'Chỉ lưu tạm trong phiên';added++;done++;if(bar)bar.style.width=(done/arr.length*100)+'%';
  }
  setTimeout(()=>{p?.classList.remove('on');if(bar)bar.style.width='0'},300);await refreshImportedDocs();toast(`Đã nhập ${added} tài liệu`);
}
async function refreshImportedDocs(){importedDocs=(await importDbAll()).sort((a,b)=>String(b.importedAt).localeCompare(String(a.importedAt)));renderImportList();renderImportStats();renderHomePortal()}
function renderImportStats(){const pdf=importedDocs.filter(x=>x.ext==='pdf').length,word=importedDocs.filter(x=>['doc','docx','odt'].includes(x.ext)).length,ex=importedDocs.filter(x=>String(x.previewText||'').trim()).length;if($('impCount'))$('impCount').textContent=importedDocs.length;if($('impPdf'))$('impPdf').textContent=pdf;if($('impWord'))$('impWord').textContent=word;if($('impExtracted'))$('impExtracted').textContent=ex;if($('sFiles'))$('sFiles').textContent=importedDocs.length;if($('wkFiles'))$('wkFiles').textContent=importedDocs.length;if($('expFileCount'))$('expFileCount').textContent=importedDocs.length}
function filteredImports(){const q=($('importQ')?.value||'').trim().toLowerCase(),t=$('importTypeF')?.value||'all',c=$('importCatF')?.value||'all';return importedDocs.filter(x=>(t==='all'||fileGroup(x.ext)===t)&&(c==='all'||x.category===c)&&(!q||(x.name+' '+(x.note||'')+' '+importCategoryName(x.category)+' '+(x.previewText||'').slice(0,5000)).toLowerCase().includes(q)))}
function renderImportList(){if(!$('importList'))return;const list=filteredImports();$('importList').innerHTML=list.length?list.map(x=>`<div class="import-file ${selectedImportId===x.id?'on':''}"><div class="import-file-head"><div class="file-icon">${fileIcon(x.ext)}</div><div class="import-file-main"><b title="${esc(x.name)}">${esc(x.name)}</b><small>${humanBytes(x.size)} · ${new Date(x.importedAt).toLocaleString('vi-VN')}</small><div class="file-badges"><span class="file-badge">${esc(importCategoryName(x.category))}</span><span class="file-badge">.${esc(x.ext||'file')}</span>${x.previewText?'<span class="file-badge ok">Có text</span>':''}</div></div></div><div class="import-file-actions"><button data-file-open="${x.id}" type="button">Xem</button><button data-file-download="${x.id}" type="button">Tải</button><button data-file-delete="${x.id}" type="button">Xóa</button></div></div>`).join(''):`<div class="import-empty">${importedDocs.length?'Không có tài liệu khớp bộ lọc.':'Chưa có tài liệu. Kéo PDF hoặc Word vào vùng nhập phía trên.'}</div>`}
async function showImportDetail(id){const x=await importDbGet(id);if(!x)return;selectedImportId=id;renderImportList();if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}let preview='';if(x.ext==='pdf'&&x.blob){importObjectURL=URL.createObjectURL(x.blob);preview=`<iframe src="${importObjectURL}#toolbar=1" title="${esc(x.name)}"></iframe>`}else if(x.previewText){preview=`<pre>${esc(x.previewText)}</pre>`}else preview=`<div class="import-preview-empty"><b>${esc(x.extractStatus||'Đã lưu file')}</b><br><br>${['doc','docx','odt'].includes(x.ext)?'Bạn vẫn có thể tải/mở file bằng Word hoặc ứng dụng tương ứng.':'Định dạng này hiện được quản lý như file đính kèm.'}</div>`;const caseOpts='<option value="">Không liên kết hồ sơ</option>'+cases.map(c=>`<option value="${c.id}" ${x.linkedCase===c.id?'selected':''}>${esc(c.name)}</option>`).join('');$('importDetail').innerHTML=`<div class="import-detail-head"><div class="section-kicker">Chi tiết tài liệu</div><b>${esc(x.name)}</b><div style="color:var(--m);font-size:9px;margin-top:3px">${humanBytes(x.size)} · ${esc(x.extractStatus||'')}</div></div><div class="import-detail-body"><div class="import-preview">${preview}</div><div class="import-fields"><label>Nhóm tài liệu<select id="fileCatEdit"><option value="legal">Tài liệu pháp luật</option><option value="project">Hồ sơ dự án</option><option value="reference">Tham khảo</option><option value="report">Báo cáo / nghiên cứu</option><option value="evidence">Minh chứng / quan trắc</option><option value="other">Khác</option></select></label><label>Liên kết hồ sơ<select id="fileCaseEdit">${caseOpts}</select></label><label style="grid-column:1/-1">Ghi chú<textarea id="fileNoteEdit" placeholder="Ghi chú về tài liệu…">${esc(x.note||'')}</textarea></label></div><div class="import-detail-actions"><button class="btn bp" data-file-download="${x.id}" type="button">Tải / mở file</button><button class="btn bs" data-file-delete="${x.id}" type="button">Xóa tài liệu</button></div></div>`;$('fileCatEdit').value=x.category||'other';$('fileCatEdit').onchange=async e=>{x.category=e.target.value;await importDbPut(x);await refreshImportedDocs();selectedImportId=id;renderImportList()};$('fileCaseEdit').onchange=async e=>{x.linkedCase=e.target.value;await importDbPut(x)};let noteTimer;$('fileNoteEdit').oninput=e=>{clearTimeout(noteTimer);noteTimer=setTimeout(async()=>{x.note=e.target.value;await importDbPut(x);await refreshImportedDocs();selectedImportId=id;renderImportList()},300)}}
async function downloadImported(id){const x=await importDbGet(id);if(!x?.blob)return;const url=URL.createObjectURL(x.blob),a=document.createElement('a');a.href=url;a.download=x.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function deleteImported(id){if(!confirm('Xóa tài liệu này khỏi LegalOS?'))return;await importDbDelete(id);if(selectedImportId===id){selectedImportId=null;if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}$('importDetail').innerHTML='<div class="import-preview-empty">Chọn một tài liệu để xem thông tin.</div>'}await refreshImportedDocs();toast('Đã xóa tài liệu')}
function exportImportIndex(){const data=importedDocs.map(({blob,...x})=>x),out={app:'LegalOS',exportedAt:new Date().toISOString(),count:data.length,files:data};const b=new Blob([JSON.stringify(out,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='LegalOS-document-index.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
async function clearImported(){if(!importedDocs.length)return;if(!confirm(`Xóa toàn bộ ${importedDocs.length} tài liệu đã nhập?`))return;await importDbClear();selectedImportId=null;if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}$('importDetail').innerHTML='<div class="import-preview-empty">Kho tài liệu đã được xóa.</div>';await refreshImportedDocs();toast('Đã xóa toàn bộ tài liệu')}
function renderHomePortal(){
  if($('homeRecentDocs')){const arr=recent.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,4);$('homeRecentDocs').innerHTML=arr.length?arr.map(d=>`<button class="home-mini-doc" data-open="${d.id}" type="button"><b>${d.ttl}</b><small>${d.k} · ${topicName(d.t)}</small></button>`).join(''):'<div class="home-mini-empty">Chưa có lịch sử xem văn bản.</div>'}
  if($('homeSavedDocs')){const arr=saved.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,4);$('homeSavedDocs').innerHTML=arr.length?arr.map(d=>`<button class="home-mini-doc" data-open="${d.id}" type="button"><b>★ ${d.ttl}</b><small>${d.k} · ${topicName(d.t)}</small></button>`).join(''):'<div class="home-mini-empty">Chưa lưu văn bản nào.</div>'}
  renderImportStats();
}


function applyUIPrefs(){
  const scaleMap={small:.92,normal:1,large:1.10};
  document.documentElement.style.setProperty('--ui-scale',scaleMap[uiPrefs.scale]||1);
  document.body.classList.toggle('ui-compact',uiPrefs.density==='compact');
  document.body.classList.toggle('sidebar-mini',!!uiPrefs.sidebar);
  document.querySelectorAll('#fontScale [data-scale]').forEach(b=>b.classList.toggle('on',b.dataset.scale===uiPrefs.scale));
  document.querySelectorAll('#densityMode [data-density]').forEach(b=>b.classList.toggle('on',b.dataset.density===uiPrefs.density));
}
function saveUIPrefs(){STORE.set('v8_ui_prefs',uiPrefs);applyUIPrefs()}
function openDrawer(id){
  ['previewDrawer','settingsDrawer','quickNoteDrawer'].forEach(x=>$(x)?.classList.toggle('on',x===id));
  $('drawerScrim')?.classList.add('on');$(id)?.setAttribute('aria-hidden','false');
}
function closeDrawers(){['previewDrawer','settingsDrawer','quickNoteDrawer'].forEach(x=>{if($(x)){ $(x).classList.remove('on');$(x).setAttribute('aria-hidden','true')}});$('drawerScrim')?.classList.remove('on')}
function renderCommandCenter(){
  if($('ccDocs'))$('ccDocs').textContent=`${D.length} văn bản · ${T.length} lĩnh vực`;
  if($('ccProc'))$('ccProc').textContent=`${P.length} lộ trình nghiệp vụ`;
  if($('ccWork'))$('ccWork').textContent=`${cases.length} hồ sơ · ${saved.length} văn bản đã lưu`;
  if($('ccUpdates')){const upcoming=D.filter(d=>{const e=parseVNDate(metaOf(d.id).eff);return e&&e>new Date()}).length;$('ccUpdates').textContent=upcoming?`${upcoming} mục sắp có hiệu lực`:'Theo dõi thay đổi & hiệu lực'}
}
function renderArticleNotesIndex(){
  if(!$('articleNotesList'))return;
  const arr=Object.entries(notes).filter(([,v])=>String(v).trim()).map(([id,v])=>({d:D.find(x=>x.id===id),v:String(v)})).filter(x=>x.d);
  $('articleNotesList').innerHTML=arr.length?arr.slice(0,12).map(x=>`<button class="note-index-item" data-open="${x.d.id}" type="button"><b>${x.d.ttl}</b><p>${esc(x.v.replace(/\s+/g,' ').slice(0,100))}</p></button>`).join(''):`<div class="empty-mini">Chưa có ghi chú theo văn bản.</div>`;
}
function syncQuickNote(value){quickNote=value;STORE.set('v8_quick_note',quickNote);if($('quickNoteArea')&&$('quickNoteArea').value!==value)$('quickNoteArea').value=value;if($('workspaceQuickNote')&&$('workspaceQuickNote').value!==value)$('workspaceQuickNote').value=value}
function openPreview(id){
  const d=D.find(x=>x.id===id);if(!d)return;const m=metaOf(id);$('previewTitle').textContent=d.ttl;
  $('previewBody').innerHTML=`<div class="preview-meta"><span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span>${m.eff?`<span class="legal-badge"><strong>Hiệu lực:</strong> ${m.eff}</span>`:''}${professorVerified(id)?`<span class="legal-badge prof-verified"><strong>✓ Kiểm chứng ${professorVerified(id).checked}</strong></span>`:''}</div><div class="preview-actions"><button class="btn bp" data-preview-open="${d.id}" type="button">Mở chi tiết</button><button class="btn bs" data-save="${d.id}" type="button">${saved.includes(d.id)?'★ Đã lưu':'☆ Lưu'}</button>${m.src?`<a class="official" href="${m.src}" target="_blank" rel="noopener">Nguồn chính thức ↗</a>`:''}</div><div class="sourcebox"><b>Quan hệ / vai trò</b><br>${m.rel||roleLabel(lawRole(d))}</div><div class="data-coverage"><span class="coverage-pill">Mức dữ liệu: tóm tắt</span>${extractLegalRefs(d.b).length?`<span class="coverage-pill ok">${extractLegalRefs(d.b).length} tham chiếu</span>`:""}</div>${d.b}${extractLegalRefs(d.b).length?`<h2>Tham chiếu được nhận diện</h2><div class="article-ref-index">${extractLegalRefs(d.b).slice(0,10).map(r=>`<button data-search-example="${esc(r)}" type="button">${esc(r)}</button>`).join("")}</div>`:""}<h2>Trước khi áp dụng</h2><p>Kiểm tra hiệu lực, sửa đổi/bổ sung, điều khoản chuyển tiếp, phụ lục và văn bản chuyên ngành liên quan.</p>`;
  openDrawer('previewDrawer');
}
function applyLibraryView(){
  if(!$('docs'))return;
  $('docs').classList.toggle('grid-view',libraryView==='grid');
  $('docs').classList.toggle('compact-view',libraryDensity==='compact');
  document.querySelectorAll('#viewMode [data-view]').forEach(b=>b.classList.toggle('on',b.dataset.view===libraryView));
  document.querySelectorAll('#libraryDensity [data-libdensity]').forEach(b=>b.classList.toggle('on',b.dataset.libdensity===libraryDensity));
  const layout=document.querySelector('.library-layout-v11');
  if(layout)layout.classList.toggle('assist-open',!!libraryAssistOpen);
  if($('toggleAssist')){$('toggleAssist').classList.toggle('bp',!!libraryAssistOpen);$('toggleAssist').classList.toggle('bs',!libraryAssistOpen);$('toggleAssist').textContent=libraryAssistOpen?'× Ẩn mẹo':'? Mẹo'}
  if($('savedOnly')){$('savedOnly').classList.toggle('bp',savedOnlyMode);$('savedOnly').classList.toggle('bs',!savedOnlyMode);$('savedOnly').textContent=savedOnlyMode?'★ Đang lọc đã lưu':'☆ Đã lưu'}
}
function resetLibraryFilters(){
  if($('q'))$('q').value='';['scopeF','yearF','sourceF','typeF','sortF'].forEach(id=>{if($(id))$(id).value=id==='sortF'?'default':'all'});
  document.querySelectorAll('#chips .chip').forEach(c=>c.classList.toggle('on',c.dataset.t==='all'));savedOnlyMode=false;STORE.set('v8_saved_only',false);setLegalSearchMode("smart");docs('all','');toast('Đã đặt lại bộ lọc');
  if($("asOfF"))$("asOfF").value="";
}
function populateWizard(){if($('procWizardSelect'))$('procWizardSelect').innerHTML=P.map(p=>`<option value="${p.id}">${p.ttl}</option>`).join('')}
function openWizard(pid,index=0){const p=P.find(x=>x.id===pid);if(!p)return;wizardState={pid,index:Math.max(0,Math.min(index,p.st.length-1))};$('wizardModal').classList.add('on');renderWizard()}
function closeWizard(){$('wizardModal').classList.remove('on')}
function renderWizard(){
  const p=P.find(x=>x.id===wizardState.pid);if(!p)return;const i=wizardState.index,s=p.st[i],done=procDone[p.id]||[];$('wizardTitle').textContent=p.ttl;
  $('wizardBody').innerHTML=`<div class="wizard-step-no">Bước ${i+1} / ${p.st.length} · ${done.includes(i)?'Đã hoàn thành':'Chưa hoàn thành'}</div><h2 class="wizard-step-title">${s[0]}</h2><p class="wizard-step-text">${s[1]}</p><div class="progress"><span style="width:${(i+1)/p.st.length*100}%"></span></div><div class="wizard-dots">${p.st.map((_,n)=>`<span class="wizard-dot ${done.includes(n)?'done':''} ${n===i?'current':''}"></span>`).join('')}</div><div class="wizard-controls"><button class="btn bs" data-wiz="prev" ${i===0?'disabled':''} type="button">← Trước</button><div class="row"><button class="btn ${done.includes(i)?'bs':'bp'}" data-wiz="toggle" type="button">${done.includes(i)?'Bỏ hoàn thành':'✓ Đánh dấu hoàn thành'}</button><button class="btn bs" data-wiz="next" ${i===p.st.length-1?'disabled':''} type="button">Tiếp →</button></div></div>`;
}
function readingProgressUpdate(){
  const art=document.querySelector('#art.page.on .art-content');if(!art){$('readingProgress')?.classList.remove('on');return}const r=art.getBoundingClientRect(),total=Math.max(1,art.offsetHeight-window.innerHeight*.55),passed=Math.max(0,-r.top+110),pct=Math.max(0,Math.min(100,passed/total*100));$('readingProgress')?.classList.add('on');$('readingProgress').querySelector('span').style.width=pct+'%';
}


let compareSelected=[];
let currentCaseId=null;
let currentUpdateYear="all";
let searchTimer=null;
let legalSearchMode=STORE.get("v11_search_mode","smart");
let legalSearchHistory=STORE.get("v11_search_history",[]);
let currentArticleDocId=null;
let coreKbTheme="all";

function esc(s=""){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function safeHttpUrl(value){
  try{const u=new URL(String(value||""),location.href);return (u.protocol==="http:"||u.protocol==="https:")?u.href:""}catch{return ""}
}
function safeId(value,prefix="id"){
  const s=String(value||"").trim().replace(/[^A-Za-z0-9_.:-]/g,"-").slice(0,96);
  return s||`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}
function safeImportedText(value,max=12000){
  return String(value??"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").slice(0,max);
}
function sanitizeImportedLegalHtml(raw){
  const root=document.createElement("div");root.innerHTML=String(raw||"");
  const allowed=new Set(["P","UL","OL","LI","H2","H3","H4","B","STRONG","EM","I","U","BR","A","BLOCKQUOTE","TABLE","THEAD","TBODY","TR","TH","TD","SPAN","SMALL"]);
  root.querySelectorAll("script,style,iframe,object,embed,svg,math,form,input,button,select,textarea,meta,link,base").forEach(el=>el.remove());
  [...root.querySelectorAll("*")].forEach(el=>{
    if(!allowed.has(el.tagName)){el.replaceWith(document.createTextNode(el.textContent||""));return}
    [...el.attributes].forEach(a=>{
      const n=a.name.toLowerCase();
      if(n.startsWith("on")||["style","src","srcdoc","formaction"].includes(n))el.removeAttribute(a.name);
      else if(n==="href"){
        const u=safeHttpUrl(a.value);if(u)el.setAttribute("href",u);else el.removeAttribute("href");
      }else if(n!=="title")el.removeAttribute(a.name);
    });
    if(el.tagName==="A"&&el.hasAttribute("href")){el.setAttribute("target","_blank");el.setAttribute("rel","noopener noreferrer")}
  });
  return root.innerHTML;
}
function normalizeImportedCase(c,i=0){
  c=(c&&typeof c==="object")?c:{};
  const input=(c.input&&typeof c.input==="object"&&!Array.isArray(c.input))?c.input:{};
  const cleanInput={};Object.entries(input).slice(0,80).forEach(([k,v])=>{cleanInput[safeImportedText(k,80)]=typeof v==="number"||typeof v==="boolean"?v:safeImportedText(v,1000)});
  const r=(c.result&&typeof c.result==="object")?c.result:{};
  return {id:safeId(c.id||`c-import-${i}`,"c"),name:safeImportedText(c.name||`Hồ sơ nhập ${i+1}`,300),createdAt:Number.isFinite(Date.parse(c.createdAt))?new Date(c.createdAt).toISOString():new Date().toISOString(),input:cleanInput,result:{group:safeImportedText(r.group??"Chưa kết luận",80),dtm:r.dtm===true?true:r.dtm===false?false:null,gp:r.gp===true?true:r.gp===false?false:null,notes:Array.isArray(r.notes)?r.notes.slice(0,100).map(x=>safeImportedText(x,2000)):[],screening:!!r.screening,refs:Array.isArray(r.refs)?r.refs.slice(0,100).map(x=>safeId(x,"ref")):[]},userNote:safeImportedText(c.userNote||"",50000)};
}
function normalizeExpertBrief(b,i=0){
  b=(b&&typeof b==="object")?b:{};const d=(b.data&&typeof b.data==="object")?b.data:{};const a=(b.analysis&&typeof b.analysis==="object")?b.analysis:{};
  return {id:safeId(b.id||`expert-import-${i}`,"expert"),createdAt:Number.isFinite(Date.parse(b.createdAt))?new Date(b.createdAt).toISOString():new Date().toISOString(),data:{...d,name:safeImportedText(d.name||"",300),phase:safeImportedText(d.phase||"",80),sector:safeImportedText(d.sector||"",80),location:safeImportedText(d.location||"",500),scale:safeImportedText(d.scale||"",500)},analysis:{...a,score:Math.max(0,Math.min(100,Number(a.score)||0))}};
}
function debounce(fn,ms=120){
  return (...args)=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>fn(...args),ms)}
}
function snippetText(html,q=""){
  const txt=plain(html).replace(/\s+/g," ").trim();
  if(!q)return txt.slice(0,150);
  const low=txt.toLowerCase(),needle=q.toLowerCase(),i=low.indexOf(needle);
  if(i<0)return txt.slice(0,150);
  const s=Math.max(0,i-55),e=Math.min(txt.length,i+needle.length+85);
  return (s>0?"…":"")+txt.slice(s,e)+(e<txt.length?"…":"");
}
function hi(text,q=""){
  const safe=esc(text);
  if(!q.trim())return safe;
  const re=new RegExp("("+q.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig");
  return safe.replace(re,"<mark>$1</mark>");
}

function foldVN(s=""){
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();
}
function cleanLegalQuery(s=""){return foldVN(s).replace(/[“”"']/g," ").replace(/\s+/g," ").trim()}
const SEARCH_SYNONYMS={
  dtm:["danh gia tac dong moi truong"],
  gpmt:["giay phep moi truong"],
  dkmt:["dang ky moi truong"],
  ctnh:["chat thai nguy hai"],
  knk:["khi nha kinh"],
  epr:["trach nhiem mo rong nha san xuat","trach nhiem tai che"],
  xlnt:["xu ly nuoc thai"],
  qcvn:["quy chuan ky thuat quoc gia"]
};
function expandTokens(q){
  const base=cleanLegalQuery(q).split(/\s+/).filter(x=>x.length>1);
  const more=[];
  base.forEach(t=>{if(SEARCH_SYNONYMS[t])SEARCH_SYNONYMS[t].forEach(x=>more.push(...x.split(" ")))});
  return [...new Set([...base,...more])];
}
function parseLegalQuery(q=""){
  const raw=String(q).trim(),f=foldVN(raw);
  const art=(f.match(/\bdieu\s+(\d+[a-z]?)\b/)||[])[1]||"";
  const clause=(f.match(/\bkhoan\s+(\d+[a-z]?)\b/)||[])[1]||"";
  const point=(f.match(/\bdiem\s+([a-zđ])\b/)||[])[1]||"";
  const number=(raw.match(/\b\d{1,4}\/\d{4}\/[A-ZĐ-]{2,15}\b/i)||raw.match(/\b(?:NĐ|ND|TT|QĐ|QD|NQ)\s*\d{1,4}\/\d{4}(?:\/[A-ZĐ-]+)?\b/i)||[])[0]||"";
  const refs=[];
  if(art)refs.push(`Điều ${art}`);
  if(clause)refs.push(`Khoản ${clause}`);
  if(point)refs.push(`Điểm ${point}`);
  return {raw,fold:f,article:art,clause,point,number,refs,tokens:expandTokens(raw)};
}
function extractLegalRefs(text=""){
  const s=plain(text).replace(/\s+/g," ");
  const out=[];
  const patterns=[
    /\bĐiều\s+\d+[a-zA-Z]?(?:\s*[–-]\s*\d+[a-zA-Z]?)?/gi,
    /\bKhoản\s+\d+[a-zA-Z]?/gi,
    /\bĐiểm\s+[a-zđ]\b/gi,
    /\bPhụ\s+lục\s+[IVXLC]+(?:\s*[–-]\s*[IVXLC]+)?/gi
  ];
  patterns.forEach(re=>(s.match(re)||[]).forEach(x=>out.push(x.replace(/\s+/g," ").trim())));
  return [...new Set(out)].slice(0,18);
}

const CLAUSE_PACK_V13={
 "vbhn98:30":{
  doc:"vbhn98",article:30,title:"Đối tượng phải thực hiện đánh giá tác động môi trường",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Xác định nhóm dự án phải thực hiện ĐTM.",points:[
    {id:"a",summary:"Dự án đầu tư nhóm I theo khoản 3 Điều 28."},
    {id:"b",summary:"Dự án đầu tư nhóm II thuộc các điểm c, d, đ và e khoản 4 Điều 28."}
   ]},
   {n:"2",summary:"Quy định các trường hợp không phải thực hiện ĐTM dù thuộc khoản 1.",points:[
    {id:"a",summary:"Dự án đầu tư công khẩn cấp theo pháp luật về đầu tư công."},
    {id:"b",summary:"Dự án được luật hoặc nghị quyết của Quốc hội quy định không phải thực hiện ĐTM."}
   ]}
  ]
 },
 "vbhn98:39":{
  doc:"vbhn98",article:39,title:"Đối tượng phải có giấy phép môi trường",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Dự án nhóm I, II, III phải rà GPMT khi thuộc một trong các trường hợp luật quy định.",points:[
    {id:"a",summary:"Có nước thải hoặc bụi, khí thải xả ra môi trường phải xử lý khi vận hành chính thức."},
    {id:"b",summary:"Có nhập khẩu phế liệu làm nguyên liệu sản xuất hoặc thực hiện dịch vụ xử lý chất thải nguy hại."}
   ]},
   {n:"2",summary:"Bao quát dự án, cơ sở, khu sản xuất kinh doanh tập trung và cụm công nghiệp hoạt động trước ngày Luật có hiệu lực nhưng có tiêu chí môi trường tương ứng khoản 1."},
   {n:"3",summary:"Loại trừ một số trường hợp khỏi nghĩa vụ GPMT.",points:[
    {id:"a",summary:"Dự án đầu tư công khẩn cấp."},
    {id:"b",summary:"Dự án được luật hoặc nghị quyết của Quốc hội quy định không phải có GPMT."}
   ]}
  ]
 },
 "vbhn98:41":{
  doc:"vbhn98",article:41,title:"Thẩm quyền cấp giấy phép môi trường",status:"structured-with-overlay",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  overlay:"NQ 66.19/2026/NQ-CP đang có cơ chế phân quyền một phần thẩm quyền của Bộ Nông nghiệp và Môi trường cho Chủ tịch UBND cấp tỉnh; phải kiểm tra phạm vi cụ thể khi nộp hồ sơ.",
  clauses:[
   {n:"1",summary:"Bộ Nông nghiệp và Môi trường cấp GPMT cho nhóm đối tượng thuộc phạm vi trung ương theo Điều 41 hiện hành.",points:[
    {id:"a",summary:"Đối tượng Điều 39 thuộc thẩm quyền phê duyệt kết quả thẩm định ĐTM của Bộ, có ngoại lệ chuyển tiếp theo luật."},
    {id:"b",summary:"Cơ sở nhập khẩu phế liệu làm nguyên liệu sản xuất; cơ sở thực hiện dịch vụ xử lý chất thải nguy hại."}
   ]},
   {n:"2",summary:"Bộ Quốc phòng, Bộ Công an cấp GPMT đối với dự án/cơ sở thuộc bí mật nhà nước về quốc phòng, an ninh."},
   {n:"3",summary:"Chủ tịch UBND cấp tỉnh cấp GPMT cho các đối tượng Điều 39 không thuộc khoản 1 và khoản 2."},
   {n:"4",summary:"Chính phủ quy định thêm thẩm quyền của Chủ tịch UBND cấp tỉnh cho trường hợp liên tỉnh hoặc vùng biển chưa xác định trách nhiệm quản lý và cơ chế phối hợp."}
  ]
 },
 "vbhn98:42":{
  doc:"vbhn98",article:42,title:"Căn cứ và thời điểm cấp giấy phép môi trường",status:"partial-structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  note:"Chỉ mục hiện mới bóc sâu hai nhóm nội dung chính của Điều 42; khi áp dụng thời điểm cụ thể phải đọc toàn văn và quy định hướng dẫn.",
  clauses:[
   {n:"1",summary:"Nhóm căn cứ để cơ quan có thẩm quyền xem xét cấp GPMT.",points:[
    {id:"a",summary:"Hồ sơ đề nghị cấp GPMT."},
    {id:"b",summary:"Kết quả thẩm định ĐTM đã được phê duyệt, nếu thuộc trường hợp có ĐTM."},
    {id:"c",summary:"Quy hoạch, phân vùng môi trường và khả năng chịu tải khi đã được ban hành."},
    {id:"d",summary:"Quy chuẩn kỹ thuật môi trường."},
    {id:"đ",summary:"Pháp luật về bảo vệ môi trường, tài nguyên nước và pháp luật liên quan."},
    {id:"e",summary:"Nếu các căn cứ quy hoạch/phân vùng/khả năng chịu tải chưa được ban hành thì sử dụng các căn cứ còn lại theo luật."}
   ]},
   {n:"2",summary:"Quy định thời điểm phải có GPMT tùy trạng thái dự án/cơ sở; dự án có ĐTM về nguyên tắc phải có GPMT trước vận hành thử công trình xử lý chất thải, trừ trường hợp luật quy định khác."}
  ]
 },
 "vbhn98:44":{
  doc:"vbhn98",article:44,title:"Điều chỉnh, cấp lại, tước quyền sử dụng, thu hồi giấy phép môi trường",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Khoản này đã được bãi bỏ trong trạng thái hợp nhất 2026."},
   {n:"2",summary:"Các trường hợp xem xét điều chỉnh GPMT trong thời hạn giấy phép.",points:[
    {id:"a",summary:"Thay đổi nội dung cấp phép tại khoản 2 Điều 40 theo đề nghị của chủ dự án/cơ sở hoặc theo pháp luật, trừ trường hợp thuộc nhánh cấp lại."},
    {id:"b",summary:"Dịch vụ xử lý CTNH hoặc nhập khẩu phế liệu cần điều chỉnh sau vận hành thử để phù hợp năng lực thực tế."}
   ]},
   {n:"3",summary:"Các trường hợp cấp lại GPMT.",points:[
    {id:"a",summary:"Giấy phép hết hạn."},
    {id:"b",summary:"Tăng quy mô, công suất, thay đổi công nghệ hoặc thay đổi khác làm tăng tác động xấu so với giấy phép đã cấp, trừ trường hợp thay đổi thuộc đối tượng phải thực hiện ĐTM."}
   ]},
   {n:"4",summary:"Tước quyền sử dụng GPMT khi vi phạm hành chính đạt mức phải áp dụng hình thức này."},
   {n:"5",summary:"Thu hồi GPMT.",points:[
    {id:"a",summary:"Giấy phép được cấp không đúng thẩm quyền."},
    {id:"b",summary:"Giấy phép có nội dung trái quy định pháp luật."}
   ]},
   {n:"6",summary:"Chính phủ quy định chi tiết Điều này."}
  ]
 },
 "vbhn98:49":{
  doc:"vbhn98",article:49,title:"Đăng ký môi trường",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Đối tượng phải đăng ký môi trường.",points:[
    {id:"a",summary:"Dự án đầu tư có phát sinh chất thải nhưng không thuộc đối tượng phải có GPMT."},
    {id:"b",summary:"Cơ sở hoạt động trước ngày Luật có hiệu lực, có phát sinh chất thải nhưng không thuộc đối tượng phải có GPMT."}
   ]},
   {n:"2",summary:"Các trường hợp không phải đăng ký môi trường.",points:[
    {id:"a",summary:"Dự án/cơ sở thuộc bí mật nhà nước về quốc phòng, an ninh."},
    {id:"b",summary:"Dự án/cơ sở không phát sinh chất thải hoặc chỉ phát sinh lượng nhỏ được xử lý tại chỗ hoặc quản lý theo quy định địa phương."},
    {id:"c",summary:"Dự án được luật hoặc nghị quyết của Quốc hội quy định không phải đăng ký."},
    {id:"d",summary:"Đối tượng khác do Chính phủ quy định chi tiết."}
   ]},
   {n:"3",summary:"UBND cấp xã tiếp nhận đăng ký trực tiếp, qua bưu điện hoặc điện tử; đối tượng trên từ hai đơn vị cấp xã được quyền chọn nơi đăng ký theo luật."},
   {n:"4",summary:"Nội dung đăng ký.",points:[
    {id:"a",summary:"Thông tin chung về dự án/cơ sở."},
    {id:"b",summary:"Loại hình, công nghệ, công suất, sản phẩm, nguyên liệu/nhiên liệu/hóa chất nếu có."},
    {id:"c",summary:"Loại và khối lượng chất thải phát sinh."},
    {id:"d",summary:"Phương án thu gom, quản lý và xử lý chất thải."},
    {id:"đ",summary:"Cam kết thực hiện công tác bảo vệ môi trường."}
   ]},
   {n:"5",summary:"Khi nội dung đã đăng ký thay đổi, phải đăng ký lại trước khi thực hiện thay đổi; nếu thay đổi làm phát sinh nghĩa vụ ĐTM/GPMT thì chuyển sang nhánh tương ứng."},
   {n:"6",summary:"Quy định thời điểm đăng ký theo loại dự án/cơ sở.",points:[
    {id:"a",summary:"Dự án có ĐTM: đăng ký trước khi vận hành chính thức."},
    {id:"b",summary:"Dự án không có ĐTM: đăng ký trước giấy phép xây dựng nếu phải có giấy phép xây dựng, hoặc trước khi xả chất thải nếu không phải xin giấy phép xây dựng."},
    {id:"c",summary:"Cơ sở chuyển tiếp theo điểm b khoản 1 thực hiện theo thời hạn luật quy định."}
   ]},
   {n:"7",summary:"Trách nhiệm của UBND cấp xã: tiếp nhận, kiểm tra/xử lý vi phạm, hướng dẫn/giải quyết kiến nghị và cập nhật dữ liệu đăng ký môi trường."},
   {n:"8",summary:"Chính phủ quy định chi tiết một số trường hợp miễn/đối tượng khác."},
   {n:"9",summary:"Bộ trưởng Bộ Nông nghiệp và Môi trường quy định mẫu và hướng dẫn tiếp nhận đăng ký môi trường."}
  ]
 },
 "vbhn98:54":{
  doc:"vbhn98",article:54,title:"Trách nhiệm tái chế của tổ chức, cá nhân sản xuất, nhập khẩu",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Chủ thể sản xuất, nhập khẩu sản phẩm/bao bì có giá trị tái chế phải thực hiện tái chế theo tỷ lệ và quy cách bắt buộc, trừ các trường hợp luật loại trừ."},
   {n:"2",summary:"Hai hình thức thực hiện trách nhiệm tái chế.",points:[
    {id:"a",summary:"Tổ chức tái chế sản phẩm, bao bì."},
    {id:"b",summary:"Đóng góp tài chính vào Quỹ Bảo vệ môi trường Việt Nam để hỗ trợ tái chế."}
   ]},
   {n:"3",summary:"Chủ thể tự/tổ chức tái chế phải đăng ký kế hoạch và báo cáo kết quả hằng năm, trừ trường hợp chọn đóng góp tài chính theo điểm b khoản 2."},
   {n:"4",summary:"Đặt nguyên tắc xác định, tiếp nhận và sử dụng đóng góp tài chính hỗ trợ tái chế; phải công khai, minh bạch và đúng mục đích."},
   {n:"5",summary:"Chính phủ quy định chi tiết và lộ trình thực hiện."}
  ]
 },
 "vbhn98:55":{
  doc:"vbhn98",article:55,title:"Trách nhiệm thu gom, xử lý chất thải của tổ chức, cá nhân sản xuất, nhập khẩu",status:"structured",reviewedAt:"09/09/2026",
  source:"https://congbao.chinhphu.vn/van-ban/van-ban-hop-nhat-so-98-vbhn-vpqh-469382.htm",
  clauses:[
   {n:"1",summary:"Chủ thể sản xuất, nhập khẩu nhóm sản phẩm/bao bì khó tái chế hoặc gây khó khăn cho thu gom, xử lý phải đóng góp tài chính, trừ các trường hợp luật loại trừ."},
   {n:"2",summary:"Đóng góp vào Quỹ Bảo vệ môi trường Việt Nam; mức đóng góp được xác định theo khối lượng hoặc đơn vị sản phẩm, bao bì."},
   {n:"3",summary:"Các hoạt động được hỗ trợ từ Quỹ.",points:[
    {id:"a",summary:"Thu gom, vận chuyển, xử lý chất thải rắn sinh hoạt từ hộ gia đình, cá nhân."},
    {id:"b",summary:"Nghiên cứu, phát triển công nghệ, kỹ thuật, sáng kiến xử lý chất thải rắn sinh hoạt."},
    {id:"c",summary:"Thu gom, vận chuyển, xử lý bao bì chứa thuốc bảo vệ thực vật."}
   ]}
  ]
 }
};

const LEGAL_TRAILS_V13={
 vbhn98:[
  {type:"gốc",id:"l72",label:"Luật 72/2020/QH14"},
  {type:"sửa đổi",id:"l146",label:"Luật 146/2025/QH15"},
  {type:"hợp nhất",id:"vbhn98",label:"98/VBHN-VPQH"},
  {type:"chi tiết",id:"vbhn49",label:"49/VBHN-BNNMT"},
  {type:"hướng dẫn",id:"vbhn55",label:"55/VBHN-BNNMT"}
 ],
 nd08:[
  {type:"gốc",id:"nd08",label:"NĐ 08/2022/NĐ-CP"},
  {type:"sửa đổi",id:"nd05",label:"NĐ 05/2025/NĐ-CP"},
  {type:"sửa đổi",id:"nd48",label:"NĐ 48/2026/NĐ-CP"},
  {type:"hợp nhất",id:"vbhn49",label:"49/VBHN-BNNMT"}
 ],
 vbhn49:[
  {type:"gốc",id:"nd08",label:"NĐ 08/2022/NĐ-CP"},
  {type:"sửa đổi",id:"nd05",label:"NĐ 05/2025/NĐ-CP"},
  {type:"sửa đổi",id:"nd48",label:"NĐ 48/2026/NĐ-CP"},
  {type:"hợp nhất",id:"vbhn49",label:"49/VBHN-BNNMT"},
  {type:"hướng dẫn",id:"vbhn55",label:"55/VBHN-BNNMT"}
 ],
 nd110:[
  {type:"khung",id:"vbhn98",label:"Điều 54–55 · 98/VBHN-VPQH"},
  {type:"chi tiết",id:"nd110",label:"NĐ 110/2026/NĐ-CP"},
  {type:"hướng dẫn",id:"tt24epr",label:"TT 24/2026/TT-BNNMT"}
 ],
 tt24epr:[
  {type:"khung",id:"vbhn98",label:"Điều 54–55 · 98/VBHN-VPQH"},
  {type:"chi tiết",id:"nd110",label:"NĐ 110/2026/NĐ-CP"},
  {type:"hướng dẫn",id:"tt24epr",label:"TT 24/2026/TT-BNNMT"}
 ]
};

function clauseKey(doc,article){return `${doc}:${article}`}
function clauseArticle(doc,article){return CLAUSE_PACK_V13[clauseKey(doc,article)]||null}
function allClauseNodesForDoc(doc){
 const rows=[];
 Object.values(CLAUSE_PACK_V13).filter(x=>x.doc===doc).forEach(a=>{
  a.clauses.forEach(c=>{
   rows.push({doc,article:a.article,clause:c.n,point:null,label:`Khoản ${c.n} Điều ${a.article}`,text:c.summary,source:a.source,status:a.status});
   (c.points||[]).forEach(p=>rows.push({doc,article:a.article,clause:c.n,point:p.id,label:`Điểm ${p.id} Khoản ${c.n} Điều ${a.article}`,text:p.summary,source:a.source,status:a.status}));
  });
 });
 return rows;
}
function clauseSearchText(doc){return allClauseNodesForDoc(doc).map(x=>`${x.label} ${x.text}`).join(" ")}
function exactClauseMatch(doc,p){
 const nodes=allClauseNodesForDoc(doc);
 return nodes.filter(x=>
   (!p.article||String(x.article)===String(p.article)) &&
   (!p.clause||String(x.clause)===String(p.clause)) &&
   (!p.point||foldVN(String(x.point||""))===foldVN(String(p.point)))
 );
}

function renderClausePackV13(doc){
 const packs=Object.values(CLAUSE_PACK_V13).filter(x=>x.doc===doc);
 if(!packs.length)return "";
 return `<section class="clause-pack-v13"><div class="clause-pack-head"><div><div class="section-kicker">Điều/Khoản/Điểm có cấu trúc</div><h2>${packs.length} Điều đã bóc sâu</h2></div><small>Bản tóm tắt có cấu trúc để tra cứu; khi trích dẫn phải mở toàn văn chính thức.</small></div>${packs.map(a=>`<details class="clause-article-v13" data-clause-article="${a.article}"><summary><span><b>Điều ${a.article}. ${a.title}</b><small>${a.status==="structured"?"Đã bóc cấu trúc":"Bóc cấu trúc một phần"} · rà ${a.reviewedAt}</small></span><span>⌄</span></summary><div class="clause-article-body">${a.overlay?`<div class="clause-overlay-v13"><b>Lưu ý áp dụng:</b> ${a.overlay}</div>`:""}${a.note?`<div class="clause-note-v13">${a.note}</div>`:""}${a.clauses.map(c=>`<article class="clause-row-v13" data-clause="${c.n}"><div class="clause-row-head"><b>Khoản ${c.n}</b><button class="tiny" data-add-citation="${doc}|${a.article}|${c.n}|" type="button">+ Căn cứ</button></div><p>${c.summary}</p>${(c.points||[]).length?`<div class="point-list-v13">${c.points.map(p=>`<div class="point-row-v13" data-point="${p.id}"><span>Điểm ${p.id}</span><p>${p.summary}</p><button class="tiny" data-add-citation="${doc}|${a.article}|${c.n}|${p.id}" type="button">+ Căn cứ</button></div>`).join("")}</div>`:""}</article>`).join("")}</div></details>`).join("")}</section>`;
}

function renderLegalTrailV13(id){
 const trail=LEGAL_TRAILS_V13[id]||[];
 if(!trail.length)return "";
 return `<section class="legal-trail-v13"><div class="legal-trail-head"><div><div class="section-kicker">Chuỗi pháp lý</div><h2>Quan hệ văn bản</h2></div><small>Mở từng mắt xích để kiểm tra lịch sử và lớp hướng dẫn.</small></div><div class="trail-row-v13">${trail.map((x,i)=>`<button type="button" data-open="${x.id}" class="trail-node-v13"><small>${x.type}</small><b>${x.label}</b></button>${i<trail.length-1?'<span class="trail-arrow-v13">→</span>':""}`).join("")}</div></section>`;
}

const MEMO_KEY_V13="v13_citation_basket";
const MEMO_META_KEY_V13="v13_citation_meta";
let citationBasketV13=STORE.get(MEMO_KEY_V13,[]);
let citationMemoMetaV13=STORE.get(MEMO_META_KEY_V13,{title:"",note:""});

function citationIdV13(x){return [x.doc,x.article||"",x.clause||"",x.point||""].join("|")}
function addCitationV13(doc,article=null,clause=null,point=null){
 const d=D.find(x=>x.id===doc);if(!d)return;
 const pack=article?clauseArticle(doc,Number(article)):null;
 let label=d.ttl,text=plain(d.b).slice(0,400),source=metaOf(doc).src||"";
 if(pack){
   label=`Điều ${article}. ${pack.title}`;
   text=pack.title;
   if(clause){
     const c=pack.clauses.find(x=>String(x.n)===String(clause));
     if(c){label=`Khoản ${clause} Điều ${article}`;text=c.summary;
       if(point){
         const p=(c.points||[]).find(x=>foldVN(String(x.id))===foldVN(String(point)));
         if(p){label=`Điểm ${point} Khoản ${clause} Điều ${article}`;text=p.summary}
       }
     }
   }
   source=pack.source||source;
 }
 const item={doc,article:article?Number(article):null,clause:clause||null,point:point||null,label,text,source,note:"",addedAt:new Date().toISOString()};
 const id=citationIdV13(item);
 if(citationBasketV13.some(x=>citationIdV13(x)===id)){toast("Căn cứ này đã có trong hồ sơ");return}
 citationBasketV13=[item,...citationBasketV13];STORE.set(MEMO_KEY_V13,citationBasketV13);renderMemoV13();toast("Đã thêm căn cứ");
}
function removeCitationV13(id){
 citationBasketV13=citationBasketV13.filter(x=>citationIdV13(x)!==id);
 STORE.set(MEMO_KEY_V13,citationBasketV13);renderMemoV13();
}
function updateCitationNoteV13(id,val){
 const x=citationBasketV13.find(x=>citationIdV13(x)===id);if(!x)return;x.note=val;STORE.set(MEMO_KEY_V13,citationBasketV13);renderMemoStatsV13();
}
function renderMemoStatsV13(){
 if(!$("memoCount"))return;
 $("memoCount").textContent=citationBasketV13.length;
 $("memoDocCount").textContent=new Set(citationBasketV13.map(x=>x.doc)).size;
 $("memoClauseCount").textContent=citationBasketV13.filter(x=>x.clause||x.point).length;
 $("memoNoteCount").textContent=citationBasketV13.filter(x=>String(x.note||"").trim()).length;
}
function renderMemoV13(){
 if(!$("memoList"))return;
 renderMemoStatsV13();
 if($("memoTitle"))$("memoTitle").value=citationMemoMetaV13.title||"";
 if($("memoGeneralNote"))$("memoGeneralNote").value=citationMemoMetaV13.note||"";
 $("memoList").innerHTML=citationBasketV13.length?citationBasketV13.map(x=>{
   const id=citationIdV13(x),d=D.find(z=>z.id===x.doc),m=metaOf(x.doc);
   return `<article class="memo-item-v13"><div class="memo-item-top"><div><div class="section-kicker">${d?d.ttl:"Văn bản"}</div><h3>${esc(x.label)}</h3></div><div class="memo-item-actions"><button class="tiny" data-open="${x.doc}" type="button">Mở văn bản</button>${x.source?`<a class="tiny" href="${x.source}" target="_blank" rel="noopener">Nguồn ↗</a>`:""}<button class="tiny danger-soft" data-remove-citation="${esc(id)}" type="button">Xóa</button></div></div><p>${esc(x.text)}</p><textarea data-citation-note="${esc(id)}" placeholder="Ghi chú cho căn cứ này…">${esc(x.note||"")}</textarea><small>Thêm ${new Date(x.addedAt).toLocaleString("vi-VN")}${m.eff?` · metadata hiệu lực ${m.eff}`:""}</small></article>`;
 }).join(""):`<div class="empty">Chưa có căn cứ. Mở một văn bản hoặc Điều/Khoản/Điểm rồi bấm <b>+ Căn cứ</b>.</div>`;
 const docs=[...new Set(citationBasketV13.map(x=>x.doc))];
 $("memoTrailSummary").innerHTML=docs.length?docs.map(id=>{
   const d=D.find(x=>x.id===id),trail=LEGAL_TRAILS_V13[id]||[];
   return `<div class="memo-trail-doc"><b>${d?d.ttl:id}</b>${trail.length?`<small>${trail.map(x=>x.label).join(" → ")}</small>`:'<small>Chưa có chuỗi quan hệ cấu trúc.</small>'}</div>`;
 }).join(""):`<div class="empty-mini">Chưa có văn bản trong hồ sơ.</div>`;
}
function saveMemoMetaV13(){
 citationMemoMetaV13={title:$("memoTitle")?.value||"",note:$("memoGeneralNote")?.value||""};STORE.set(MEMO_META_KEY_V13,citationMemoMetaV13);
}
function exportMemoMarkdownV13(){
 const title=citationMemoMetaV13.title||"Căn cứ hồ sơ LegalOS";
 const lines=[`# ${title}`,"",citationMemoMetaV13.note||"",citationMemoMetaV13.note?"":"",`Xuất: ${new Date().toLocaleString("vi-VN")}`,""];
 citationBasketV13.forEach((x,i)=>{const d=D.find(z=>z.id===x.doc);lines.push(`## ${i+1}. ${x.label}`,`- Văn bản: ${d?d.ttl:x.doc}`,`- Tóm tắt: ${x.text}`,x.note?`- Ghi chú: ${x.note}`:"",x.source?`- Nguồn: ${x.source}`:"","")});
 const blob=new Blob([lines.filter(x=>x!==null).join("\n")],{type:"text/markdown;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="LegalOS-can-cu-ho-so.md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function exportV13DataPack(){
 const payload={schema:"legalos-v13",exportedAt:new Date().toISOString(),clauses:CLAUSE_PACK_V13,trails:LEGAL_TRAILS_V13,documents:D.map(d=>({id:d.id,title:d.ttl,type:d.k,topic:d.t,meta:metaOf(d.id)}))};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="LegalOS-V13-data-pack.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}

function parseAdvancedQueryV13(q){
 const exact=[...String(q).matchAll(/"([^"]+)"/g)].map(m=>foldVN(m[1].trim())).filter(Boolean);
 const cleaned=String(q).replace(/"[^"]+"/g," ");
 const orGroups=cleaned.split(/\s+OR\s+/i).map(part=>part.split(/\s+AND\s+/i).map(x=>foldVN(x.trim())).filter(Boolean)).filter(x=>x.length);
 const hasLogic=/\s+(AND|OR)\s+/i.test(cleaned)||exact.length>0;
 return {exact,orGroups,hasLogic};
}
function advancedQueryScoreV13(hay,q){
 const a=parseAdvancedQueryV13(q);if(!a.hasLogic)return {ok:true,score:0,reasons:[]};
 const reasons=[];let score=0;
 for(const phrase of a.exact){if(!hay.includes(phrase))return {ok:false,score:-500,reasons:["Thiếu cụm từ chính xác"]};score+=65;reasons.push(`Khớp cụm “${phrase}”`)}
 if(a.orGroups.length){
   const groupScores=a.orGroups.map(g=>g.every(term=>hay.includes(term)));
   if(!groupScores.some(Boolean))return {ok:false,score:-350,reasons:["Không thỏa AND/OR"]};
   score+=45;reasons.push("Thỏa điều kiện AND/OR");
 }
 return {ok:true,score,reasons};
}

function coreArticlesForDoc(id){return CORE_ARTICLES.filter(a=>a.doc===id)}
function coreRefsForDoc(id){return coreArticlesForDoc(id).map(a=>a.ref)}
function coreArticleHtml(id){
  const list=coreArticlesForDoc(id);if(!list.length)return "";
  const groups=[...new Set(list.map(a=>a.theme))];
  return `<section class="indexed-law-articles"><div class="indexed-law-head"><div><div class="section-kicker">Điều đã lập mục</div><h2>${list.length} Điều trọng tâm</h2></div><small>Ghi chú nội dung · nguồn ${list[0].basis} · rà ${list[0].reviewedAt}</small></div>${groups.map(g=>`<div class="indexed-law-group"><h3>${g}</h3>${list.filter(a=>a.theme===g).map(a=>{const p=ARTICLE_PRACTICE[a.n];return `<article class="indexed-law-article"><h4>${a.ref}. ${a.title}</h4><p>${a.summary}</p>${p?`<div class="article-practice-grid"><div><b>Câu hỏi phải trả lời</b><ul>${p.ask.map(x=>`<li>${x}</li>`).join("")}</ul></div><div><b>Đọc cùng</b><ul>${p.read.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>`:""}<div class="indexed-law-caution"><b>Lưu ý:</b> ${a.caution}</div><div class="article-audit-line"><span>${a.basis}</span><span>Rà ${a.reviewedAt}</span><span>Mục tra cứu</span></div></article>`}).join("")}</div>`).join("")}</section>`;
}
function legalDocHay(d){
  const m=metaOf(d.id),core=coreArticlesForDoc(d.id);
  return [
    d.ttl,d.k,topicName(d.t),plain(d.b),plain(deepGuideFor(d.id)),clauseSearchText(d.id),m.rel||"",m.issued||"",m.eff||"",
    ...extractLegalRefs(d.b),
    ...core.flatMap(a=>[a.ref,a.title,a.theme,a.summary,a.caution,a.basis])
  ].join(" ");
}
function legalSearchScore(d,q){
  const p=parseLegalQuery(q),hay=foldVN(legalDocHay(d)),title=foldVN(d.ttl);
  const adv=advancedQueryScoreV13(hay,q);
  if(!q.trim())return {score:0,reasons:[],refs:[...new Set([...extractLegalRefs(d.b),...coreRefsForDoc(d.id)])]};
  if(!adv.ok)return {score:adv.score,reasons:adv.reasons,refs:[...new Set([...extractLegalRefs(d.b),...coreRefsForDoc(d.id)])]};
  let score=adv.score;const reasons=[...adv.reasons];
  const qf=p.fold;
  if(title.includes(qf)){score+=90;reasons.push("Tên văn bản khớp")}
  if(p.number&&foldVN(d.ttl).includes(foldVN(p.number))){score+=130;reasons.push("Đúng số hiệu")}
  if(p.article){
    const exact=new RegExp(`\\bdieu\\s+${p.article}\\b`,"i").test(hay);
    if(exact){score+=120;reasons.push(`Có nhắc Điều ${p.article}`)}
    else if(legalSearchMode==="ref")score-=160;
  }
  if(p.clause){
    const exact=new RegExp(`\\bkhoan\\s+${p.clause}\\b`,"i").test(hay);
    if(exact){score+=80;reasons.push(`Có nhắc Khoản ${p.clause}`)}
    else if(legalSearchMode==="ref")score-=90;
  }
  if(p.point){
    const exact=new RegExp(`\\bdiem\\s+${foldVN(p.point)}\\b`,"i").test(hay);
    if(exact){score+=60;reasons.push(`Có nhắc Điểm ${p.point}`)}
    else if(legalSearchMode==="ref")score-=70;
  }
  if(legalSearchMode==="number"&&p.number&&!title.includes(foldVN(p.number)))score-=250;
  const structuredMatches=exactClauseMatch(d.id,p);
  if(structuredMatches.length){
    if(p.clause){score+=150;reasons.push(`Đúng Khoản ${p.clause} trong chỉ mục cấu trúc`)}
    if(p.point){score+=120;reasons.push(`Đúng Điểm ${p.point} trong chỉ mục cấu trúc`)}
    if(p.article&&!p.clause&&!p.point){score+=60;reasons.push(`Điều ${p.article} đã bóc cấu trúc`)}
  }
  let hit=0;
  p.tokens.forEach(t=>{
    if(hay.includes(t)){hit++;score+=title.includes(t)?18:8}
  });
  if(hit){reasons.push(`${hit}/${p.tokens.length} từ khóa khớp`)}
  const m=metaOf(d.id);
  if(professorVerified(d.id)){score+=5;reasons.push("Đã kiểm chứng")}
  else if(m.src)score+=2;
  return {score,reasons:[...new Set(reasons)],refs:[...new Set([...extractLegalRefs(d.b),...coreRefsForDoc(d.id)])]};
}
function searchEligible(d,q){
  if(!q.trim())return true;
  const r=legalSearchScore(d,q),p=parseLegalQuery(q);
  if(legalSearchMode==="number")return !!p.number && r.score>0;
  if(legalSearchMode==="ref"){
    if(!p.article&&!p.clause&&!p.point)return r.score>0;
    return r.score>0 && (!p.article||r.reasons.some(x=>x.includes("Điều")));
  }
  return r.score>0;
}
function addLegalSearchHistory(q){
  const s=String(q).trim();if(!s)return;
  legalSearchHistory=[s,...legalSearchHistory.filter(x=>foldVN(x)!==foldVN(s))].slice(0,8);
  STORE.set("v11_search_history",legalSearchHistory);renderLegalSearchHistory();
}
function renderLegalSearchHistory(){
  if(!$("recentSearches"))return;
  $("recentSearches").innerHTML=legalSearchHistory.length?legalSearchHistory.slice(0,5).map(x=>`<button data-search-history="${esc(x)}" type="button">${esc(x.length>25?x.slice(0,25)+"…":x)}</button>`).join(""):`<span style="font-size:8px;color:var(--m)">Chưa có</span>`;
}
function renderPopularRefs(){
  if(!$("popularRefs"))return;
  const counts={};
  D.forEach(d=>[...new Set([...extractLegalRefs(d.b),...coreRefsForDoc(d.id)])].forEach(r=>{if(/^Điều/i.test(r))counts[r]=(counts[r]||0)+1}));
  const arr=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,14);
  $("popularRefs").innerHTML=arr.length?arr.map(([r,n])=>`<button data-search-example="${esc(r)}" type="button">${esc(r)} <small>(${n})</small></button>`).join(""):`<span style="font-size:8px;color:var(--m)">Chưa có chỉ mục điều luật.</span>`;
}
function setLegalSearchMode(mode){
  legalSearchMode=mode||"smart";STORE.set("v11_search_mode",legalSearchMode);
  document.querySelectorAll("#searchMode [data-searchmode]").forEach(b=>b.classList.toggle("on",b.dataset.searchmode===legalSearchMode));
  if($("citationFinder"))$("citationFinder").hidden=legalSearchMode!=="ref";
  if($("q")){
    $("q").placeholder=legalSearchMode==="number"?"Nhập số hiệu: 72/2020/QH14 · 48/2026/NĐ-CP…":legalSearchMode==="ref"?"Nhập hoặc dùng Finder: Điều 39 · khoản 2 Điều 49…":"Ví dụ: Điều 39 GPMT · NĐ 48/2026 sửa NĐ 08 · CTNH…";
  }
}
function buildRefQuery(){
  const doc=$("refDoc")?.value.trim()||"",art=$("refArticle")?.value.trim()||"",cl=$("refClause")?.value.trim()||"",pt=$("refPoint")?.value.trim()||"";
  const parts=[];if(pt)parts.push(`Điểm ${pt}`);if(cl)parts.push(`Khoản ${cl}`);if(art)parts.push(`Điều ${art}`);if(doc)parts.push(doc);
  return parts.join(" ");
}
function renderSearchCoach(list,q){
  if(!$("searchCoach"))return;
  const p=parseLegalQuery(q);
  if(!q.trim()){
    $("searchCoach").innerHTML='<span class="coach-icon">i</span><div><b>Nhập điều luật, số hiệu hoặc vấn đề cần tra.</b><p>LegalOS sẽ phân tích ý định tìm kiếm và xếp kết quả theo mức phù hợp.</p></div>';
    if($("querySummary"))$("querySummary").innerHTML="";
    return;
  }
  const intent=[];
  if(p.number)intent.push(`Số hiệu: <b>${esc(p.number)}</b>`);
  if(p.article)intent.push(`<b>Điều ${esc(p.article)}</b>`);
  if(p.clause)intent.push(`<b>Khoản ${esc(p.clause)}</b>`);
  if(p.point)intent.push(`<b>Điểm ${esc(p.point)}</b>`);
  if(!intent.length)intent.push(`Từ khóa chuyên môn`);
  const exactRef=p.article||p.clause||p.point;
  $("searchCoach").innerHTML=`<span class="coach-icon">${exactRef?"§":"⌕"}</span><div><b>LegalOS hiểu truy vấn là: ${intent.join(" · ")}</b><p>${list.length?`Tìm thấy ${list.length} văn bản phù hợp trong kho tóm tắt/metadata.`:`Chưa thấy căn cứ khớp trong dữ liệu hiện có.`} ${exactRef?"Nếu cần nội dung Khoản/Điểm đầy đủ, hãy mở nguồn chính thức của văn bản phù hợp.":""}</p></div>`;
  if($("querySummary"))$("querySummary").innerHTML=`Chế độ: <b>${legalSearchMode==="ref"?"Điều/Khoản/Điểm":legalSearchMode==="number"?"Số hiệu":"Thông minh"}</b>`;
}
function prepareLegalHtml(raw){
  const box=document.createElement("div");box.innerHTML=raw;
  let i=0;box.querySelectorAll("p,li,h2,h3,h4").forEach(el=>{el.id=`law-block-${i++}`});
  return box.innerHTML;
}
function findBlocksInDoc(raw,q){
  const box=document.createElement("div");box.innerHTML=raw;
  const query=cleanLegalQuery(q);if(!query)return [];
  const tokens=expandTokens(q);
  return [...box.querySelectorAll("p,li,h2,h3,h4")].map((el,i)=>({i,text:el.textContent.replace(/\s+/g," ").trim()})).filter(x=>{
    const f=foldVN(x.text);
    return f.includes(query)||tokens.filter(t=>f.includes(t)).length>=Math.min(2,Math.max(1,tokens.length));
  }).slice(0,12);
}
function renderInDocRefs(raw){
  if(!$("articleRefIndex"))return;
  const refs=extractLegalRefs(raw);
  $("articleRefIndex").innerHTML=refs.length?refs.map(r=>`<button data-in-doc-ref="${esc(r)}" type="button">${esc(r)}</button>`).join(""):`<span style="font-size:8px;color:var(--m)">Tóm tắt này chưa có tham chiếu Điều/Khoản được lập chỉ mục.</span>`;
}
function runInDocSearch(q){
  const d=D.find(x=>x.id===currentArticleDocId);if(!d||!$("inDocMatches"))return;
  document.querySelectorAll("#legalText .law-block-hit").forEach(x=>x.classList.remove("law-block-hit"));
  const hits=findBlocksInDoc(d.b+coreArticleHtml(d.id),q);
  $("inDocStatus").textContent=q.trim()?`${hits.length} đoạn trong tóm tắt khớp “${q.trim()}”`:"";
  $("inDocMatches").innerHTML=hits.length?hits.map(h=>`<button class="in-doc-match" data-law-block="${h.i}" type="button"><b>Đoạn ${h.i+1}</b>${hi(h.text,q)}</button>`).join(""):(q.trim()?`<div class="sourcebox"><b>Không thấy trong tóm tắt LegalOS.</b><br>Điều này không có nghĩa văn bản gốc không chứa nội dung bạn tìm. Hãy mở nguồn chính thức để tra toàn văn.</div>`:"");
}

function currentPage(){
  return document.querySelector(".page.on")?.id||"home";
}
function setCrumb(){
  document.querySelectorAll(".crumb").forEach(x=>x.remove());
  const p=currentPage();
  if(p==="home")return;
  const labels={lib:"Kho văn bản",corekb:"Văn bản trọng tâm",art:"Chi tiết văn bản",expert:"Rà soát hồ sơ",proc:"Lộ trình thủ tục",pone:"Chi tiết quy trình",cls:"Sàng lọc dự án",fee:"Phí & nghĩa vụ",term:"Thuật ngữ",import:"Nhập tài liệu",work:"Hồ sơ công việc",memo:"Căn cứ hồ sơ",upd:"Cập nhật pháp luật"};
  const page=document.querySelector(`#${p} .wrap`);
  if(!page)return;
  const c=document.createElement("div");c.className="crumb";
  c.innerHTML=`<button data-go="home" type="button">Tổng quan</button><span class="sep">/</span><span>${labels[p]||p}</span>`;
  page.insertBefore(c,page.firstChild);
}
function syncMobileNav(){
  const p=currentPage();
  document.querySelectorAll("#mobileQuick [data-go]").forEach(b=>{
    const g=b.dataset.go;
    b.classList.toggle("on",g===p||(p==="art"&&g==="lib")||(p==="pone"&&g==="proc"))
  });
}
function logActivity(type,id,label){
  let arr=STORE.get("w4_activity",[]);
  arr=[{type,id,label,at:new Date().toISOString()},...arr.filter(x=>!(x.type===type&&x.id===id))].slice(0,10);
  STORE.set("w4_activity",arr);
  renderHomeActivity();
}
function renderHomeActivity(){
  const host=$("homeActivity");if(!host)return;
  const arr=STORE.get("w4_activity",[]);
  const icon={doc:"VB",case:"HS",proc:"QT",fee:"₫"};
  host.innerHTML=arr.length?arr.slice(0,6).map(x=>`
    <div class="activity-item">
      <div class="activity-icon">${icon[x.type]||"•"}</div>
      <div><b>${esc(x.label)}</b><small>${new Date(x.at).toLocaleString("vi-VN")}</small></div>
    </div>`).join(""):`<div class="empty-mini">Chưa có hoạt động. Hãy mở một văn bản hoặc tạo hồ sơ đầu tiên.</div>`;
}
function renderHomeContinue(){
  const host=$("homeContinue");if(!host)return;
  const openSteps=[];
  P.forEach(p=>{
    const d=(procDone[p.id]||[]).length;
    if(d>0&&d<p.st.length)openSteps.push({p,d});
  });
  const latest=cases[0];
  const parts=[];
  if(openSteps.length){
    const x=openSteps[0];
    parts.push(`<div class="activity-item"><div class="activity-icon">QT</div><div class="grow"><b>${x.p.ttl}</b><small>${x.d}/${x.p.st.length} bước</small><div class="progress" style="margin-top:7px"><span style="width:${x.d/x.p.st.length*100}%"></span></div><div style="margin-top:8px"><button class="tiny" data-open-proc="${x.p.id}" type="button">Tiếp tục</button></div></div></div>`);
  }
  if(latest){
    parts.push(`<div class="activity-item"><div class="activity-icon">HS</div><div class="grow"><b>${esc(latest.name)}</b><small>Nhóm ${latest.result.group} · ${new Date(latest.createdAt).toLocaleDateString("vi-VN")}</small><div style="margin-top:8px"><button class="tiny" data-open-case="${latest.id}" type="button">Mở hồ sơ</button></div></div></div>`);
  }
  host.innerHTML=parts.length?parts.join(""):`<div class="empty-mini">Chưa có công việc dở dang.</div>`;
}
function toggleCompare(id,on){
  if(on){
    if(!compareSelected.includes(id)){
      if(compareSelected.length>=2){toast("Chỉ chọn tối đa 2 văn bản");return false}
      compareSelected.push(id)
    }
  }else compareSelected=compareSelected.filter(x=>x!==id);
  updateCompareBar();
  return true;
}
function updateCompareBar(){
  $("compareText").textContent=`Đã chọn ${compareSelected.length}/2 văn bản`;
  $("compareBar").classList.toggle("on",compareSelected.length>0);
  document.querySelectorAll("[data-compare]").forEach(c=>c.checked=compareSelected.includes(c.dataset.compare));
}
function clearCompare(){
  compareSelected=[];updateCompareBar();
}
function showCompare(){
  if(compareSelected.length!==2){toast("Chọn đúng 2 văn bản để so sánh");return}
  const a=D.find(x=>x.id===compareSelected[0]),b=D.find(x=>x.id===compareSelected[1]);
  if(!a||!b)return;
  $("compareBody").innerHTML=`<div class="compare-grid">
    <div class="compare-col"><div class="meta"><span class="tag">${a.k}</span><span class="tag">${topicName(a.t)}</span></div><h3>${a.ttl}</h3>${a.b}</div>
    <div class="compare-col"><div class="meta"><span class="tag">${b.k}</span><span class="tag">${topicName(b.t)}</span></div><h3>${b.ttl}</h3>${b.b}</div>
  </div>`;
  $("compareModal").classList.add("on");
}
function closeCompare(){$("compareModal").classList.remove("on")}

function renderWorkspaceStats(){
  if(!$("wkCases"))return;
  $("wkCases").textContent=cases.length;if($("wkExpert"))$("wkExpert").textContent=expertBriefs.length;
  $("wkSaved").textContent=saved.length;
  $("wkNotes").textContent=Object.values(notes).filter(v=>String(v).trim()).length+(String(quickNote||"").trim()?1:0);
  const total=P.reduce((n,p)=>n+p.st.length,0);
  const done=P.reduce((n,p)=>n+(procDone[p.id]||[]).length,0);
  $("wkProgress").textContent=Math.round(total?done/total*100:0)+"%";
}

function renderUpdates(year=currentUpdateYear){
  currentUpdateYear=year;
  const list=NWS.filter(n=>year==="all"||String(n[0]).startsWith(year));
  $("ulist").innerHTML=list.length?list.map((n,i)=>{
    const d=D.find(x=>n[1].includes(x.ttl.split(" —")[0])||x.ttl.includes(n[1].split(" —")[0]));
    const m=d?metaOf(d.id):{};
    return `<details class="update-compact-item"${i===0?' open':''}>
      <summary><span class="update-date">${n[0]}</span><b>${n[1]}</b><span class="update-open">⌄</span></summary>
      <div class="update-compact-body"><p>${n[2]}</p><div class="row">${d?`<button class="tiny" data-open="${d.id}" type="button">Mở văn bản</button>`:''}${m.src?`<a class="tiny" href="${m.src}" target="_blank" rel="noopener">Nguồn ↗</a>`:''}</div></div>
    </details>`;
  }).join(""):`<div class="empty">Không có mục trong năm này.</div>`;
  document.querySelectorAll("#updateFilter [data-year]").forEach(b=>b.classList.toggle("on",b.dataset.year===year));
}
function validateClassifier(){
  let ok=true;
  ["cap","area","ww","tr","hz","air"].forEach(id=>{
    const el=$(id),v=Number(el.value);
    const bad=!Number.isFinite(v)||v<0;
    el.classList.toggle("invalid",bad);
    if(bad)ok=false;
  });
  if(!ok)toast("Kiểm tra lại các trường số: không được âm");
  return ok;
}
function applyPreset(name){
  const data={
    industrial:{kind:"industrial",cap:60000,area:55,ww:60,tr:70,hz:80,air:2200,sens:"no"},
    mining:{kind:"mining",cap:35000,area:45,ww:25,tr:30,hz:30,air:500,sens:"yes"},
    solar:{kind:"solar",cap:50000,area:70,ww:5,tr:5,hz:0,air:0,sens:"no"},
    clear:{kind:"other",cap:0,area:0,ww:0,tr:0,hz:0,air:0,sens:"no"}
  }[name];
  if(!data)return;
  Object.entries(data).forEach(([k,v])=>{$(k).value=v});
  if(name==="clear")$("caseName").value="";
  toast(name==="clear"?"Đã xóa dữ liệu nhập":"Đã nạp dữ liệu mẫu");
}
function renderRiskMeter(group){
  const map={IV:1,III:2,II:3,I:4},n=map[group]||1;
  return `<div class="risk-meter" aria-label="Mức sàng lọc">${[1,2,3,4].map(i=>`<span class="${i<=n?"on":""}"></span>`).join("")}</div>`;
}
function caseExport(c){
  const text=[
    `# ${c.name}`,
    ``,
    `- Thời điểm lưu: ${new Date(c.createdAt).toLocaleString("vi-VN")}`,
    `- Trạng thái phân nhóm: ${c.result.group||"Chưa kết luận"}`,
    `- ĐTM: ${c.result.dtm===null?"Cần tra đúng phụ lục/đối tượng":(c.result.dtm?"Cần rà ĐTM":"Chưa kết luận bắt buộc")}`,
    `- GPMT: ${c.result.gp===null?"Cần xác định đối tượng + nguồn thải":(c.result.gp?"Cần xem xét":"Chưa kết luận")}`,
    ``,
    `## Dữ liệu đầu vào`,
    ...Object.entries(c.input).map(([k,v])=>`- ${k}: ${v}`),
    ``,
    `## Điểm cần kiểm tra`,
    ...(c.result.notes.length?c.result.notes.map(x=>`- ${x}`):["- Không có cảnh báo kỹ thuật từ số liệu."]),
    ``,
    `## Ghi chú`,
    c.userNote||"",
    ``,
    `> Kết quả chỉ là sàng lọc học tập, không phải kết luận pháp lý.`
  ].join("\n");
  const blob=new Blob([text],{type:"text/markdown;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(c.name.replace(/[\\/:*?"<>|]+/g,"-")||"hoso")+".md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}


function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(toast._t);toast._t=setTimeout(()=>t.style.display="none",1700)}
function plain(h){const d=document.createElement("div");d.innerHTML=h;return d.textContent||""}
function curTopic(){const x=document.querySelector("#chips .chip.on");return x?x.dataset.t:"all"}
function topicName(id){const x=T.find(t=>t[0]===id);return x?x[1]:""}

const LIB_FILTER_GROUPS=[
 {id:"env",label:"Môi trường",topics:["bvmt","khi","thai","knk","hc","phi"]},
 {id:"resource",label:"Tài nguyên",topics:["nuoc","dat","ks","kttv"]},
 {id:"eco",label:"Sinh thái & hạ tầng",topics:["rung","ddsh","bien","thuyloi","thientai"]},
 {id:"energy",label:"Năng lượng",topics:["dl"]}
];
function libraryTopicCount(id){return D.filter(d=>d.t===id).length}
function renderLibraryTopicFilters(q=""){
  const host=$("chips");if(!host)return;
  const needle=foldVN(q||"");
  const topicMap=new Map(T.map(x=>[x[0],x]));
  const active=curTopic();
  const total=D.length;
  const groups=LIB_FILTER_GROUPS.map(g=>{
    const rows=g.topics.map(id=>topicMap.get(id)).filter(Boolean).filter(x=>!needle||foldVN(x[1]+" "+x[2]).includes(needle));
    if(!rows.length)return "";
    return `<section class="topic-filter-group">
      <div class="topic-filter-group-head"><b>${g.label}</b><span>${rows.reduce((n,x)=>n+libraryTopicCount(x[0]),0)}</span></div>
      <div>${rows.map(x=>`<button class="chip ${active===x[0]?"on":""}" data-t="${x[0]}" type="button"><span>${x[1]}</span><small>${libraryTopicCount(x[0])}</small></button>`).join("")}</div>
    </section>`;
  }).join("");
  host.innerHTML=`<button class="chip topic-all ${active==="all"?"on":""}" data-t="all" type="button"><span>Tất cả văn bản</span><small>${total}</small></button>${groups||'<div class="empty-mini">Không có lĩnh vực phù hợp.</div>'}`;
}

function updStats(){
  if($("sDocs"))$("sDocs").textContent=D.length;
  if($("sProc"))$("sProc").textContent=P.length;
  if($("sSaved"))$("sSaved").textContent=saved.length;
  if($("sCases"))$("sCases").textContent=cases.length;
}
function saveDoc(id){
  saved=saved.includes(id)?saved.filter(x=>x!==id):[id,...saved.filter(x=>x!==id)];
  STORE.set("w3_saved",saved);updStats();renderWorkspace();docs(curTopic(),$("q")?.value||"");
  toast(saved.includes(id)?"Đã lưu văn bản":"Đã bỏ lưu");renderHomePortal();
}
function addRecent(id){recent=[id,...recent.filter(x=>x!==id)].slice(0,12);STORE.set("w3_recent",recent);renderHomePortal()}
function renderTypeFilter(){
  const types=[...new Set(D.map(x=>x.k))].sort((a,b)=>a.localeCompare(b,"vi"));
  $("typeF").innerHTML='<option value="all">Tất cả loại</option>'+types.map(x=>`<option value="${x}">${x}</option>`).join("");
}
function renderTerms(q=""){renderTermCards(q)}
function openDoc(id,focusQuery=""){
  const x=D.find(i=>i.id===id);if(!x)return;currentArticleDocId=id;addRecent(id);logActivity("doc",id,x.ttl);const m=metaOf(id);const rel=D.filter(i=>i.t===x.t&&i.id!==x.id).slice(0,5);
  const legalBody=x.b+renderLegalTrailV13(id)+deepGuideFor(id)+coreArticleHtml(id)+renderClausePackV13(id);
  const refs=[...new Set([...extractLegalRefs(legalBody),...coreRefsForDoc(id)])];
  $("abody").innerHTML=`<div class="art-layout"><div class="art-content">
    <div class="legal-badge-row"><span class="legal-badge"><strong>${x.k}</strong></span><span class="legal-badge">${topicName(x.t)}</span>${m.issued?`<span class="legal-badge"><strong>Ban hành:</strong> ${m.issued}</span>`:''}${m.eff?`<span class="legal-badge"><strong>Hiệu lực:</strong> ${m.eff}</span>`:''}${m.temp?'<span class="legal-badge" style="background:var(--wb);color:var(--w)"><strong>Cơ chế có thời hạn</strong></span>':''}${professorVerified(id)?`<span class="legal-badge prof-verified"><strong>✓ Đã kiểm chứng ${professorVerified(id).checked}</strong></span>`:''}<span class="role-badge ${lawRole(x)}">${roleLabel(lawRole(x))}</span></div>
    <h1>${x.ttl}</h1>
    <div class="data-coverage"><span class="coverage-pill">Dữ liệu: thông tin văn bản + tóm tắt${deepGuideFor(id)?` + chuyên đề sâu`:""}${coreArticlesForDoc(id).length?` + ${coreArticlesForDoc(id).length} Điều lập chỉ mục`:""}</span>${m.src?'<span class="coverage-pill ok">Có nguồn chính thức</span>':''}${refs.length?`<span class="coverage-pill ok">${refs.length} tham chiếu được lập chỉ mục</span>`:''}</div>
    <div class="artbar"><button class="btn bs" data-save="${x.id}" type="button">${saved.includes(x.id)?"★ Đã lưu":"☆ Lưu"}</button><button class="btn bs" id="copyArt" type="button">Sao chép</button><button class="btn bs" id="printArt" type="button">In / PDF</button><button class="btn bs" id="addCompareArt" type="button">So sánh</button><button class="btn bs" id="addCitationArt" type="button">+ Căn cứ hồ sơ</button><button class="btn bs" id="copyCite" type="button">Sao chép trích dẫn</button><div class="read-tools"><button id="readMinus" type="button" title="Giảm chữ">A−</button><button id="readPlus" type="button" title="Tăng chữ">A+</button><button id="readFocus" type="button" title="Tập trung đọc">Focus</button></div>${m.src?`<a class="official" href="${m.src}" target="_blank" rel="noopener">Nguồn Chính phủ ↗</a>`:''}</div>
    ${m.rel?`<div class="legal-tip"><span>§</span><div><b>Quan hệ pháp lý:</b> ${m.rel}</div></div>`:''}
    ${professorVerified(id)?`<div class="sourcebox"><b>Kiểm chứng chuyên gia:</b> ${professorVerified(id).note}<br><a class="official" href="${professorVerified(id).source}" target="_blank" rel="noopener">Mở nguồn đã đối chiếu ↗</a></div>`:''}
    <div class="sourcebox"><b>Cách đọc loại văn bản này:</b> ${roleNote(x)}</div>

    <div class="in-doc-finder">
      <div class="in-doc-find-row"><input id="inDocQ" autocomplete="off" placeholder="Tìm trong tóm tắt: Điều 39, khoản 2, CTNH, vận hành thử…"><button class="btn bp" id="inDocFind" type="button">Tìm trong văn bản</button></div>
      <div id="inDocStatus" class="in-doc-status"></div>
      <div id="articleRefIndex" class="article-ref-index"></div>
      <div id="inDocMatches" class="in-doc-matches"></div>
    </div>

    <div id="legalText">${prepareLegalHtml(legalBody)}</div>
    <div class="sourcebox"><b>Quy tắc dùng dữ liệu:</b> LegalOS chỉ tóm lược và gắn quan hệ văn bản. Nếu bạn cần một Khoản/Điểm cụ thể mà phần trên không chứa, hãy mở nguồn chính thức để tra toàn văn trước khi kết luận.</div>
    <h2 id="noteSec">Ghi chú của tôi</h2><textarea class="in" id="artNote" placeholder="Ghi chú cho văn bản này…">${esc(notes[x.id]||"")}</textarea>
    <h2 id="relatedSec">Văn bản liên quan cùng lĩnh vực</h2><div class="related">${rel.length?rel.map(r=>`<button class="doc" data-open="${r.id}" type="button"><b>${r.ttl}</b><div class="meta"><span class="tag">${r.k}</span></div></button>`).join(""):'<div class="empty">Chưa có mục liên quan khác.</div>'}</div>
  </div><aside class="art-side"><div class="art-toc"><div class="k">Đi nhanh</div><button data-scroll="legalText" type="button">Nội dung tóm lược</button><button data-scroll="noteSec" type="button">Ghi chú</button><button data-scroll="relatedSec" type="button">Liên quan</button></div></aside></div>`;

  go("art");
  renderInDocRefs(legalBody);
  $("copyArt").onclick=async()=>{try{await navigator.clipboard.writeText(x.ttl+"\n\n"+plain(legalBody)+(m.src?"\n\nNguồn: "+m.src:""));toast("Đã sao chép")}catch{toast("Trình duyệt không cho phép sao chép")}};
  $("printArt").onclick=()=>window.print();
  $("copyCite").onclick=async()=>{const c=`${x.ttl}${m.issued?` · Ban hành ${m.issued}`:""}${m.eff?` · Hiệu lực ${m.eff}`:""}${m.src?` · ${m.src}`:""}`;try{await navigator.clipboard.writeText(c);toast("Đã sao chép trích dẫn")}catch{toast("Không thể sao chép")}};
  $("addCompareArt").onclick=()=>{if(!compareSelected.includes(id)){toggleCompare(id,true);toast("Đã thêm vào so sánh")}else toast("Văn bản này đã được chọn")};
  $("addCitationArt").onclick=()=>addCitationV13(id);
  $("artNote").oninput=()=>{notes[x.id]=$("artNote").value;STORE.set("w3_notes",notes);renderWorkspaceStats();renderArticleNotesIndex()};
  $("readMinus").onclick=()=>{document.body.classList.remove("read-large");document.body.classList.toggle("read-small");};
  $("readPlus").onclick=()=>{document.body.classList.remove("read-small");document.body.classList.toggle("read-large");};
  $("readFocus").onclick=()=>{document.body.classList.toggle("read-focus");$("readFocus").classList.toggle("on",document.body.classList.contains("read-focus"));};
  $("inDocFind").onclick=()=>runInDocSearch($("inDocQ").value);
  $("inDocQ").onkeydown=e=>{if(e.key==="Enter")runInDocSearch($("inDocQ").value)};
  if(focusQuery){$("inDocQ").value=focusQuery;runInDocSearch(focusQuery);setTimeout(()=>$("inDocQ")?.scrollIntoView({behavior:"smooth",block:"center"}),120)}
  setTimeout(readingProgressUpdate,0);
}
function renderProcSummary(){
  const total=P.reduce((n,p)=>n+p.st.length,0);
  let done=0;P.forEach(p=>done+=(procDone[p.id]||[]).length);
  $("procSummary").textContent=`${done}/${total} bước`;
  $("procBar").style.width=(total?done/total*100:0)+"%";
}
function renderProcList(){
  if(!$("plist"))return;
  const q=($("procQ")?.value||"").trim().toLowerCase(),f=$("procFilter")?.value||"all",cat=$("procCat")?.value||"all";
  const list=P.filter(p=>{
    const d=(procDone[p.id]||[]).length,done=d===p.st.length;
    const okf=f==="all"||(f==="done"&&done)||(f==="todo"&&!done);
    const okq=!q||(p.ttl+" "+(p.desc||"")+" "+p.st.flat().join(" ")).toLowerCase().includes(q);
    const okcat=cat==="all"||p.cat===cat;
    return okf&&okq&&okcat;
  });
  $("plist").innerHTML=list.length?list.map(p=>{
    const d=(procDone[p.id]||[]).length,pct=p.st.length?d/p.st.length*100:0;
    return `<button class="card go proc-card" type="button" data-pr="${p.id}">
      <div class="grow"><h3>${p.ttl}</h3>${p.desc?`<p style="margin:5px 0 8px;color:var(--m);font-size:12px">${p.desc}</p>`:""}<div class="proc-badges"><span class="proc-cat-badge">${({env:"Môi trường lõi",waste:"Chất thải & phát thải",resource:"Tài nguyên",climate:"Khí hậu",sector:"Chuyên ngành"})[p.cat]||"Quy trình"}</span><span class="proc-badge">${p.st.length} bước</span><span class="proc-badge">${d===p.st.length?"Hoàn thành":"Đang làm"}</span></div></div>
      <span style="color:var(--m);font-size:12px">${d}/${p.st.length} bước</span>
      <div class="progress"><span style="width:${pct}%"></span></div>
    </button>`
  }).join(""):`<div class="empty">Không có quy trình phù hợp.</div>`;
  renderProcSummary();renderWorkspaceStats();renderHomeContinue();
}
function openProc(id){
  const g=P.find(x=>x.id===id);if(!g)return;
  logActivity("proc",id,g.ttl);
  const done=procDone[id]||[];
  const next=g.st.findIndex((_,i)=>!done.includes(i));
  $("pbody").innerHTML=`<div class="proc-head"><div><h1 style="margin-bottom:4px">${g.ttl}</h1><span style="color:var(--m);font-size:13px">${done.length}/${g.st.length} bước đã hoàn thành</span></div><button class="btn bs" data-proc-reset="${id}" type="button">Đặt lại</button></div>
    <div class="progress" style="margin-bottom:14px"><span style="width:${g.st.length?done.length/g.st.length*100:0}%"></span></div>
    <div class="proc-detail-note"><b>Nguyên tắc:</b> ${g.desc||"Lộ trình hỗ trợ kiểm tra tuần tự."} Mỗi bước là checklist nghiệp vụ; kết luận pháp lý cuối cùng vẫn phải dựa văn bản gốc, hiệu lực và hồ sơ cụ thể.</div><p class="note">${done.length===g.st.length?"Quy trình này đã được đánh dấu hoàn thành.":"Bạn có thể đánh dấu từng bước. Tiến độ được lưu cục bộ trên trình duyệt."}</p>`+
    g.st.map((s,i)=>`<div class="st ${done.includes(i)?"done":""} ${i===next?"current":""}">
      <button class="stepcheck" data-step="${id}:${i}" type="button">${done.includes(i)?"✓":i+1}</button>
      <div><b>${s[0]}</b><p style="margin:4px 0 0;color:var(--m)">${s[1]}</p>
        <div class="step-actions"><button class="tiny" data-copy-step="${id}:${i}" type="button">Sao chép bước</button></div>
      </div>
    </div>`).join("");
  go("pone");
}
function renderWorkspace(){
  if(!$("caseList"))return;
  const q=($("caseQ")?.value||"").trim().toLowerCase();
  const list=cases.filter(c=>!q||(c.name+" "+c.result.group+" "+JSON.stringify(c.input)).toLowerCase().includes(q));
  $("caseList").innerHTML=list.length?list.map(c=>`<button class="case ${currentCaseId===c.id?"on":""}" data-case="${esc(c.id)}" type="button"><b>${esc(c.name)}</b><div class="meta"><span class="tag">Nhóm ${esc(c.result.group)}</span><span class="tag">${new Date(c.createdAt).toLocaleDateString("vi-VN")}</span></div></button>`).join(""):`<div class="empty">${cases.length?"Không có hồ sơ khớp.":"Chưa có hồ sơ đã lưu."}</div>`;
  $("savedList").innerHTML=saved.length?saved.map(id=>{const d=D.find(x=>x.id===id);return d?`<div class="doc"><div class="docrow"><button class="docmain" data-open="${d.id}" type="button"><b>${d.ttl}</b><div class="meta"><span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span></div></button><button class="mini" data-save="${d.id}" type="button" title="Bỏ lưu">★</button></div></div>`:""}).join(""):`<div class="empty">Chưa lưu văn bản nào.</div>`;
  updStats();renderWorkspaceStats();renderExpertBriefs();renderHomeActivity();renderHomeContinue();renderArticleNotesIndex();renderCommandCenter();
}
function showCase(id){
  const c=cases.find(x=>x.id===id);if(!c)return;
  currentCaseId=id;
  document.querySelectorAll(".case").forEach(x=>x.classList.toggle("on",x.dataset.case===id));
  $("caseDetail").className="card";
  $("caseDetail").innerHTML=`<div class="row"><div class="grow"><div class="k">Hồ sơ sàng lọc</div><h3 style="font-size:19px;margin-top:4px">${esc(c.name)}</h3></div><button class="btn bs" data-delcase="${c.id}" type="button">Xóa</button></div>
    <div class="case-detail-tabs"><button class="on" data-case-tab="summary" type="button">Tổng quan</button><button data-case-tab="input" type="button">Đầu vào</button><button data-case-tab="note" type="button">Ghi chú</button></div>
    <div data-case-panel="summary">
      <div class="result-grid">
        <div class="result-card"><small>Nhóm pháp lý</small><b>${c.result.group==="Chưa kết luận"?"Chưa kết luận":`Nhóm ${c.result.group}`}</b>${c.result.group==="Chưa kết luận"?"":renderRiskMeter(c.result.group)}</div>
        <div class="result-card"><small>ĐTM</small><b>${c.result.dtm===null?"Cần tra phụ lục":(c.result.dtm?"Cần rà ĐTM":"Chưa thấy bắt buộc")}</b></div>
        <div class="result-card"><small>GPMT</small><b>${c.result.gp===null?"Cần xác định đối tượng":(c.result.gp?"Cần xem xét":"Chưa thấy tín hiệu")}</b></div>
      </div>
      <p style="color:var(--m);font-size:13px">Lưu lúc ${new Date(c.createdAt).toLocaleString("vi-VN")}</p>
      <div class="why"><b>Điểm cần kiểm tra</b><ul>${c.result.notes.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Không có cảnh báo kỹ thuật từ số liệu.</li>"}</ul></div>
    </div>
    <div data-case-panel="input" hidden><div class="why"><b>Dữ liệu đầu vào</b><ul>${Object.entries(c.input).map(([k,v])=>`<li>${esc(k)}: ${esc(v)}</li>`).join("")}</ul></div></div>
    <div data-case-panel="note" hidden><textarea class="case-notes" id="caseNote" placeholder="Ghi chú cho hồ sơ này…">${esc(c.userNote||"")}</textarea></div>
    <div class="case-actions"><button class="btn bp" data-export-case="${c.id}" type="button">Xuất Markdown</button><button class="btn bs" data-copy-case="${c.id}" type="button">Sao chép tóm tắt</button></div>
    <p class="note" style="margin-top:12px">Đây là phiếu sàng lọc cục bộ để tổ chức dữ liệu và nhánh cần rà, không phải kết luận pháp lý.</p>`;
  logActivity("case",id,c.name);
}
function exportWorkspace(){
  const data={app:"LegalOS",exportedAt:new Date().toISOString(),saved,recent,notes,procDone,cases,expertBriefs};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="LegalOS-workspace.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function importWorkspace(file){
  const r=new FileReader();
  r.onload=()=>{try{
    const d=JSON.parse(r.result);
    saved=Array.isArray(d.saved)?d.saved.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)):[];recent=Array.isArray(d.recent)?d.recent.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)):[];
    notes={};if(d.notes&&typeof d.notes==="object"&&!Array.isArray(d.notes))Object.entries(d.notes).slice(0,1000).forEach(([k,v])=>{notes[safeId(k,"doc")]=safeImportedText(v,50000)});
    procDone={};if(d.procDone&&typeof d.procDone==="object"&&!Array.isArray(d.procDone))Object.entries(d.procDone).slice(0,500).forEach(([k,v])=>{procDone[safeId(k,"proc")]=Array.isArray(v)?v.filter(Number.isInteger).slice(0,200):[]});
    cases=Array.isArray(d.cases)?d.cases.slice(0,500).map(normalizeImportedCase):[];expertBriefs=Array.isArray(d.expertBriefs)?d.expertBriefs.slice(0,500).map(normalizeExpertBrief):[];
    STORE.set("w3_saved",saved);STORE.set("w3_recent",recent);STORE.set("w3_notes",notes);STORE.set("w3_proc",procDone);STORE.set("w3_cases",cases);STORE.set("v10_expert_briefs",expertBriefs);
    renderWorkspace();renderProcList();docs(curTopic(),$("q").value);toast("Đã nhập workspace");
  }catch{toast("File JSON không hợp lệ")}};
  r.readAsText(file);
}
function cmdResults(q=""){
  const s=q.trim().toLowerCase();
  const docsR=D.filter(d=>!s||(d.ttl+" "+d.k+" "+plain(d.b)).toLowerCase().includes(s)).slice(0,6).map(d=>({kind:"doc",id:d.id,title:d.ttl,sub:`${d.k} · ${topicName(d.t)}`}));
  const procR=P.filter(p=>!s||(p.ttl+" "+p.st.flat().join(" ")).toLowerCase().includes(s)).slice(0,3).map(p=>({kind:"proc",id:p.id,title:p.ttl,sub:"Quy trình"}));
  const filesR=(typeof importedDocs!=="undefined"?importedDocs:[]).filter(f=>!s||(f.name+" "+(f.note||"")).toLowerCase().includes(s)).slice(0,3).map(f=>({kind:"file",id:f.id,title:f.name,sub:`Tài liệu đã nhập · .${f.ext||"file"}`}));
  const pages=[
    ["lib","Kho văn bản"],["corekb","Văn bản trọng tâm"],["expert","Rà soát hồ sơ"],["proc","Lộ trình thủ tục"],["cls","Sàng lọc dự án"],["fee","Phí & nghĩa vụ"],["term","Thuật ngữ"],["import","Nhập tài liệu"],["work","Hồ sơ công việc"],["memo","Căn cứ hồ sơ"],["upd","Cập nhật pháp luật"]
  ].filter(x=>!s||x[1].toLowerCase().includes(s)).slice(0,3).map(x=>({kind:"page",id:x[0],title:x[1],sub:"Chuyển trang"}));
  return [...docsR,...filesR,...procR,...pages].slice(0,10);
}
function renderCmd(q=""){
  const r=cmdResults(q);
  $("cmdList").innerHTML=r.length?r.map((x,i)=>`<button class="cmd-item ${i===0?"sel":""}" data-cmd="${esc(x.kind)}:${esc(x.id)}" type="button"><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></button>`).join(""):`<div class="empty">Không tìm thấy.</div>`;
}
function openCmd(){$("cmdBg").classList.add("on");$("cmdQ").value="";renderCmd();setTimeout(()=>$("cmdQ").focus(),0)}
function closeCmd(){$("cmdBg").classList.remove("on")}



const LEGAL_PACK_KEY="legalos_v6_pack";
function docYear(d){const m=metaOf(d.id);const s=m.issued||m.eff||d.ttl;const x=String(s).match(/(20\d{2})/);return x?x[1]:""}
function renderYearFilter(){if(!$('yearF'))return;const years=[...new Set(D.map(docYear).filter(Boolean))].sort((a,b)=>b.localeCompare(a));$('yearF').innerHTML='<option value="all">Tất cả năm</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('')}
function isConsolidated(d){return d.k==="Văn bản hợp nhất"||/VBHN/.test(d.ttl)}
function renderDataVault(){if(!$('vaultStats'))return;const verified=D.filter(d=>metaOf(d.id).src).length,con=D.filter(isConsolidated).length,y26=D.filter(d=>docYear(d)==='2026').length;$('vaultStats').innerHTML=`<div class="vault-stat"><b>${D.length}</b><span>Tổng văn bản</span></div><div class="vault-stat"><b>${T.length}</b><span>Lĩnh vực</span></div><div class="vault-stat"><b>${verified}</b><span>Có nguồn chính thức</span></div><div class="vault-stat"><b>${con}</b><span>Văn bản hợp nhất</span></div>`;$('vaultByTopic').innerHTML=T.map(t=>{const n=D.filter(d=>d.t===t[0]).length;return `<div class="vault-topic"><b><span>${t[1]}</span><span>${n}</span></b><small>${t[2]}</small></div>`}).join('')}
function exportCatalogCSV(){const rows=[["id","loai","so_hieu_ten","linh_vuc","ban_hanh","hieu_luc","quan_he","nguon"]];D.forEach(d=>{const m=metaOf(d.id);rows.push([d.id,d.k,plain(d.ttl),topicName(d.t),m.issued||"",m.eff||"",m.rel||"",m.src||""])});const escCsv=v=>'"'+String(v).replace(/"/g,'""')+'"';const csv='\uFEFF'+rows.map(r=>r.map(escCsv).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='LegalOS-catalog.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function builtInPack(){const docs=D.filter(d=>!d._user).map(d=>({id:d.id,t:d.t,k:d.k,ttl:d.ttl,b:d.b,meta:metaOf(d.id)}));return {schema:1,app:'LegalOS',exportedAt:new Date().toISOString(),docs}}
function exportLegalPack(){const blob=new Blob([JSON.stringify(builtInPack(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='LegalOS-legal-pack.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function loadUserLegalPack(){const pack=STORE.get(LEGAL_PACK_KEY,null);if(!pack||!Array.isArray(pack.docs))return;pack.docs.slice(0,2000).forEach(x=>{if(!x||!x.id)return;const id=safeId(x.id,"userdoc");if(D.some(d=>d.id===id))return;const topic=T.some(t=>t[0]===String(x.t))?String(x.t):'bvmt';D.push({id,t:topic,k:esc(safeImportedText(x.k||'Tài liệu',120)),ttl:esc(safeImportedText(x.ttl||id,500)),b:sanitizeImportedLegalHtml(x.b||'<p>Văn bản do người dùng nhập.</p>'),_user:true});if(x.meta&&typeof x.meta==='object')LAW_META[id]={issued:safeImportedText(x.meta.issued||'',40),eff:safeImportedText(x.meta.eff||'',40),rel:esc(safeImportedText(x.meta.rel||'',1000)),src:safeHttpUrl(x.meta.src||''),temp:!!x.meta.temp,user:true}})}
function importLegalPack(file){if(!file||file.size>15*1024*1024){toast('Legal Pack quá lớn hoặc không hợp lệ');return}const r=new FileReader();r.onload=()=>{try{const p=JSON.parse(r.result);if(!p||!Array.isArray(p.docs)||p.docs.length>2000)throw 0;STORE.set(LEGAL_PACK_KEY,{schema:p.schema||1,docs:p.docs});location.reload()}catch{toast('Legal Pack không hợp lệ')}};r.readAsText(file)}
function clearLegalPack(){try{localStorage.removeItem(LEGAL_PACK_KEY)}catch{}location.reload()}

function metaOf(id){return LAW_META[id]||{}}
function renderLawNow(){
  if(!$('lawNow'))return;
  $('lawNow').innerHTML=LEGAL_HIGHLIGHTS.map(x=>`<button class="law-now-item" data-open="${x.id}" type="button"><span class="date">${x.date}</span><b>${x.ttl}</b><p>${x.txt}</p>${x.temp?'<div class="temporary" style="font-size:10px;margin-top:6px">Cơ chế có thời hạn</div>':''}</button>`).join('');
}
function renderCoreMap(target='coreMap'){
  const el=$(target);if(!el)return;
  el.innerHTML=CORE_IDS.map(id=>{const d=D.find(x=>x.id===id);const m=metaOf(id);return d?`<button class="core-node" data-open="${id}" type="button"><b>${d.ttl.replace(/ —.*/, '')}</b><span>${m.rel||d.k}</span></button>`:''}).join('');
}


let coreKbStatOpen=null;
function coreKbGroupOf(id){const g=CORE_READING_CHAIN.find(x=>x.docs.includes(id));return g?.title||"Văn bản trọng tâm"}
function coreKbDocStatus(id){
  const p=professorVerified(id),m=metaOf(id),st=CORE_CONTENT_STATUS[id]||{};
  const upcoming=m.eff&&parseVNDate(m.eff)&&parseVNDate(m.eff)>new Date("2026-09-10T23:59:59");
  return {verified:!!p,reviewed:st.summary==="reviewed",upcoming,label:upcoming?`Hiệu lực ${m.eff}`:(p?"Đã đối chiếu nguồn":(m.src?"Có nguồn":"Chưa đối chiếu"))};
}
function closeCoreKbStatDetail(){
  const box=$("coreKbStatDetail");if(!box)return;box.hidden=true;box.innerHTML="";coreKbStatOpen=null;
  document.querySelectorAll("[data-core-stat]").forEach(b=>{b.classList.remove("on");b.setAttribute("aria-expanded","false")});
}
function renderCoreKbStatDetail(type){
  const box=$("coreKbStatDetail");if(!box)return;
  if(coreKbStatOpen===type&&!box.hidden){closeCoreKbStatDetail();return}
  coreKbStatOpen=type;
  document.querySelectorAll("[data-core-stat]").forEach(b=>{const on=b.dataset.coreStat===type;b.classList.toggle("on",on);b.setAttribute("aria-expanded",String(on))});
  const coreDocs=[...new Set(CORE_READING_CHAIN.flatMap(g=>g.docs))].filter(id=>D.some(d=>d.id===id));
  const verified=coreDocs.filter(id=>professorVerified(id));
  const expected=[...Array.from({length:22},(_,i)=>28+i),54,55];
  const indexed=new Set(CORE_ARTICLES.map(a=>a.n));
  const docRows=(ids)=>ids.map(id=>{
    const d=D.find(x=>x.id===id),m=metaOf(id),st=coreKbDocStatus(id);if(!d)return "";
    return `<article class="core-stat-doc"><button class="core-stat-doc-main" data-open="${id}" type="button"><small>${esc(coreKbGroupOf(id))}</small><b>${esc(d.ttl)}</b><span>${esc(m.rel||d.k)}</span></button><div class="core-stat-doc-meta"><span class="${st.verified?"ok":st.upcoming?"warn":""}">${st.label}</span>${st.reviewed?'<span>Đã rà nội dung</span>':""}${m.eff?`<span>Hiệu lực: ${esc(m.eff)}</span>`:""}</div><div class="core-stat-doc-actions"><button class="tiny" data-open="${id}" type="button">Mở văn bản</button>${m.src?`<a class="tiny" href="${m.src}" target="_blank" rel="noopener">Nguồn ↗</a>`:""}</div></article>`;
  }).join("");
  let title="",desc="",body="";
  if(type==="docs"){
    title=`${coreDocs.length} văn bản trọng tâm đang theo dõi`;desc="Danh sách được chia theo chuỗi đọc thay vì đặt tất cả văn bản ngang hàng.";body=`<div class="core-stat-doc-grid">${docRows(coreDocs)}</div>`;
  }else if(type==="verified"){
    const pending=coreDocs.filter(id=>!professorVerified(id));title=`${verified.length}/${coreDocs.length} văn bản đã đối chiếu nguồn`;desc="Đối chiếu nguồn xác nhận metadata và đường dẫn nguồn chính thức; không đồng nghĩa đã kiểm tra toàn văn từng điều khoản.";body=`<div class="core-stat-split"><div><h4>Đã đối chiếu (${verified.length})</h4><div class="core-stat-doc-grid compact">${docRows(verified)}</div></div><div><h4>Chưa ở trạng thái đối chiếu (${pending.length})</h4>${pending.length?`<div class="core-stat-doc-grid compact">${docRows(pending)}</div>`:'<div class="empty-mini">Không còn văn bản chờ đối chiếu.</div>'}</div></div>`;
  }else if(type==="articles"){
    title=`${CORE_ARTICLES.length} Điều đã lập mục tra cứu`;desc="Các Điều được nhóm theo luồng nghiệp vụ để mở nhanh đúng phần cần đọc.";body=`<div class="core-stat-article-groups">${["Phân nhóm & sơ bộ","ĐTM","GPMT","ĐKMT","EPR"].map(t=>{const a=CORE_ARTICLES.filter(x=>x.theme===t);return `<section><h4>${t} <span>${a.length}</span></h4><div>${a.map(x=>`<button data-core-query="${esc(x.query)}" type="button"><b>${x.ref}</b><span>${esc(x.title)}</span></button>`).join("")}</div></section>`}).join("")}</div>`;
  }else{
    const missing=expected.filter(n=>!indexed.has(n));title=`Phạm vi lập mục: ${indexed.size}/${expected.length} Điều`;desc="Phạm vi hiện tại gồm Điều 28–49 và Điều 54–55 của Luật BVMT hợp nhất.";body=`<div class="core-stat-coverage"><div><b>${Math.round(indexed.size/expected.length*100)}%</b><span>đã lập mục</span></div><div><b>${indexed.size}</b><span>Điều có chỉ mục</span></div><div><b>${missing.length}</b><span>Điều còn thiếu</span></div></div><div class="core-stat-numberline">${expected.map(n=>`<button class="${indexed.has(n)?"done":"missing"}" data-core-query="Điều ${n}" type="button">Điều ${n}</button>`).join("")}</div>`;
  }
  box.innerHTML=`<div class="core-stat-detail-head"><div><div class="section-kicker">Chi tiết thống kê</div><h3>${title}</h3><p>${desc}</p></div><button class="tiny" id="closeCoreStat" type="button">Đóng ×</button></div>${body}`;box.hidden=false;$("closeCoreStat").onclick=closeCoreKbStatDetail;
}


function renderCoreThemeDetail(){
  const host=$("coreKbThemeDetail");if(!host)return;
  const all=CORE_ARTICLES;

  if(coreKbTheme==="all"){
    host.innerHTML=`<section class="core-theme-detail-panel compact">
      <div class="core-theme-detail-head">
        <div>
          <div class="section-kicker">24 Điều đã lập mục</div>
          <h3>Toàn bộ phạm vi Điều 28–49, 54–55</h3>
        </div>
        <small>Bấm “Tra căn cứ” để đi tới tìm kiếm theo Điều, hoặc mở VBHN 98 để đọc văn bản hợp nhất.</small>
      </div>
      <div class="core-theme-quick-grid">
        ${all.map(a=>`<article>
          <div><b>${a.ref}</b><span>${esc(a.theme)}</span></div>
          <p>${esc(a.title)}</p>
          <div class="row">
            <button class="tiny" data-core-query="${esc(a.query)}" type="button">Tra căn cứ</button>
            <button class="tiny" data-open="${a.doc}" type="button">Mở VBHN 98</button>
          </div>
        </article>`).join("")}
      </div>
    </section>`;
    return;
  }

  const list=all.filter(a=>a.theme===coreKbTheme);
  const range=coreKbTheme==="Phân nhóm & sơ bộ"?"Điều 28–29":
              coreKbTheme==="ĐTM"?"Điều 30–38":
              coreKbTheme==="GPMT"?"Điều 39–48":
              coreKbTheme==="ĐKMT"?"Điều 49":
              coreKbTheme==="EPR"?"Điều 54–55":"";

  host.innerHTML=`<section class="core-theme-detail-panel">
    <div class="core-theme-detail-head">
      <div>
        <div class="section-kicker">${esc(coreKbTheme)} · ${range}</div>
        <h3>${list.length} Điều đã có nội dung tra cứu</h3>
      </div>
      <small>Đây là lớp tóm tắt nghiệp vụ. Khi trích dẫn hoặc lập hồ sơ chính thức vẫn cần mở văn bản gốc/hợp nhất.</small>
    </div>

    <div class="core-theme-article-grid">
      ${list.map(a=>`<article class="core-theme-article">
        <div class="core-theme-article-top">
          <span>${a.ref}</span>
          <small>Rà ${a.reviewedAt}</small>
        </div>
        <h4>${esc(a.title)}</h4>
        <p>${esc(a.summary)}</p>
        <div class="core-theme-caution"><b>Lưu ý áp dụng:</b> ${esc(a.caution)}</div>
        <div class="core-theme-actions">
          <button class="tiny" data-core-query="${esc(a.query)}" type="button">Tra căn cứ</button>
          <button class="tiny" data-open="${a.doc}" type="button">Mở VBHN 98</button>
          ${metaOf(a.doc).src?`<a class="tiny" href="${metaOf(a.doc).src}" target="_blank" rel="noopener">Nguồn ↗</a>`:""}
        </div>
      </article>`).join("")}
    </div>
  </section>`;
}

function renderCoreKnowledge(q=""){
 if(!$("coreKbChain"))return;
 const s=foldVN(q||"");
 const coreDocs=[...new Set(CORE_READING_CHAIN.flatMap(g=>g.docs))].filter(id=>D.some(d=>d.id===id));
 $("coreKbDocs").textContent=coreDocs.length;
 $("coreKbVerified").textContent=coreDocs.filter(id=>professorVerified(id)).length;
 $("coreKbArticles").textContent=CORE_ARTICLES.length;
 const expected=[...Array.from({length:22},(_,i)=>28+i),54,55];
 const indexed=new Set(CORE_ARTICLES.map(a=>a.n));
 $("coreKbCoveragePct").textContent=Math.round(indexed.size/expected.length*100)+"%";

 const themes=["Phân nhóm & sơ bộ","ĐTM","GPMT","ĐKMT","EPR"];
 if($("coreKbCoverage")){
   $("coreKbCoverage").innerHTML=themes.map(t=>{
     const list=CORE_ARTICLES.filter(a=>a.theme===t);
     const range=t==="Phân nhóm & sơ bộ"?"Điều 28–29":t==="ĐTM"?"Điều 30–38":t==="GPMT"?"Điều 39–48":t==="ĐKMT"?"Điều 49":t==="EPR"?"Điều 54–55":"";
     return `<button class="${coreKbTheme===t?"on":""}" data-core-theme="${t}" type="button" aria-label="Mở ${t}"><b>${list.length}</b><span>${t}</span><small>${range}</small><em>Xem nội dung →</em></button>`;
   }).join("");
 }
 document.querySelectorAll("[data-core-theme]").forEach(b=>b.classList.toggle("on",b.dataset.coreTheme===coreKbTheme));
 renderCoreThemeDetail();

 const docMatch=id=>{const d=D.find(x=>x.id===id);if(!d)return false;const m=metaOf(id);return !s||foldVN([d.ttl,plain(d.b),m.rel||"",...coreArticlesForDoc(id).flatMap(a=>[a.ref,a.title,a.summary])].join(" ")).includes(s)};
 $("coreKbChain").innerHTML=CORE_READING_CHAIN.map((g,gi)=>{
   const rows=g.docs.filter(id=>D.some(d=>d.id===id)).filter(id=>!s||docMatch(id));
   if(s&&!rows.length)return "";
   return `<section class="corekb-chain-group"><div class="corekb-chain-num">${gi+1}</div><div class="corekb-chain-content"><h3>${g.title}</h3><p>${g.note}</p><div class="corekb-docs">${rows.map(id=>{const d=D.find(x=>x.id===id),m=metaOf(id),st=CORE_CONTENT_STATUS[id];return `<article><button class="corekb-doc-main" data-open="${id}" type="button"><b>${d.ttl}</b><small>${m.rel||d.k}</small></button><div class="corekb-status-row">${professorVerified(id)?'<span class="corekb-ok">✓ Nguồn</span>':''}${st?.summary==="reviewed"?'<span>Đã rà nội dung</span>':''}${st?.articleCount?`<span class="corekb-ok">${st.articleCount} Điều index</span>`:''}${st?.fulltext==="linked"?'<span>Có nguồn toàn văn</span>':''}${m.eff==="18/09/2026"?'<span style="background:var(--wb);color:var(--w)">Sắp hiệu lực 18/09</span>':''}</div>${m.src?`<a href="${m.src}" target="_blank" rel="noopener">Nguồn ↗</a>`:""}</article>`}).join("")}</div></div></section>`;
 }).join("")||'<div class="empty">Không có văn bản trọng tâm khớp từ khóa.</div>';

 const arts=CORE_ARTICLES.filter(a=>(coreKbTheme==="all"||a.theme===coreKbTheme)&&(!s||foldVN([a.ref,a.title,a.theme,a.summary,a.caution].join(" ")).includes(s)));
 $("coreKbArticleGrid").innerHTML=arts.length?arts.map(a=>`<article class="corekb-article"><div class="corekb-article-top"><span>${a.ref}</span><small>${a.theme}</small></div><h3>${a.title}</h3><p>${a.summary}</p><div class="corekb-audit"><span>Basis: ${a.basis}</span><span>Rà: ${a.reviewedAt}</span><span>Trạng thái: chỉ mục nghiệp vụ</span></div><div class="corekb-caution"><b>Lưu ý:</b> ${a.caution}</div><div class="row"><button class="tiny" data-core-query="${esc(a.query)}" type="button">Tra căn cứ</button><button class="tiny" data-open="${a.doc}" type="button">Mở VBHN 98</button>${metaOf(a.doc).src?`<a class="tiny corekb-source-btn" href="${metaOf(a.doc).src}" target="_blank" rel="noopener">Nguồn ↗</a>`:""}</div></article>`).join(""):'<div class="empty">Không có Điều trọng tâm khớp bộ lọc.</div>';
 const sources=["vbhn98","vbhn49","vbhn55","nd110","tt24epr","nq6619"].map(id=>D.find(x=>x.id===id)).filter(Boolean);
 $("coreKbSources").innerHTML=sources.map(d=>{const m=metaOf(d.id),st=CORE_CONTENT_STATUS[d.id];return `<a href="${m.src}" target="_blank" rel="noopener"><b>${d.ttl.replace(/ —.*/,"")}</b><small>${m.issued||""} · ${st?.metadataVerifiedAt?`metadata rà ${st.metadataVerifiedAt}`:"nguồn chính thức"}</small></a>`}).join("");

 if($("n49Guide"))$("n49Guide").innerHTML=N49_GUIDE.map(x=>`<article class="final-guide-card"><div class="final-guide-tag">${x.tag}</div><h3>${x.title}</h3><p>${x.body}</p><small>${x.ref}</small></article>`).join("");
 if($("vbhn55Guide"))$("vbhn55Guide").innerHTML=VBHN55_GUIDE.map(x=>`<article class="final-guide-card"><div class="final-guide-tag">${x.tag}</div><h3>${x.title}</h3><p>${x.body}</p><small>${x.ref}</small></article>`).join("");
 if($("vbhn55Forms"))$("vbhn55Forms").innerHTML=VBHN55_FORMS.map(([n,t])=>`<button type="button" data-core-form="${n}" title="${esc(t)}"><b>Mẫu ${n}</b><span>${t}</span></button>`).join("");
 if($("eprGuide"))$("eprGuide").innerHTML=EPR_GUIDE.map(x=>`<article class="final-guide-card"><div class="final-guide-tag">${x.tag}</div><h3>${x.title}</h3><p>${x.body}</p><small>${x.ref}</small></article>`).join("");
}
function coreQueryToLibrary(q){
 go("lib");
 setTimeout(()=>{if($("q"))$("q").value=q;const p=parseLegalQuery(q);setLegalSearchMode(p.article||p.clause||p.point?"ref":"smart");const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",q);addLegalSearchHistory(q)},60);
}

function renderOfficialSources(){
  if(!$('officialSources'))return;
  $('officialSources').innerHTML=OFFICIAL_SOURCES.map(s=>`<div class="source-item"><div><b>${s[0]}</b><p>${s[1]}</p></div><a class="official" href="${s[2]}" target="_blank" rel="noopener">Mở nguồn ↗</a></div>`).join('');
}

const TERM_CATS=["Thủ tục môi trường","Chất thải & phát thải","Tài nguyên nước","Đất · rừng · khoáng sản","Sinh thái · biển · thủy sản","Khí hậu · carbon · ô-dôn","Hệ thống pháp luật","Quan trắc · dữ liệu"];
let currentTermCat="all";
function lawRole(d){const m=metaOf(d.id);if(m.temp)return "temporary";if(m.role)return m.role;if(d.k==="Văn bản hợp nhất")return "consolidated";return "qppl"}
function roleLabel(r){return r==="consolidated"?"Văn bản hợp nhất":r==="policy"?"Chính sách / kế hoạch":r==="temporary"?"Cơ chế có thời hạn":"QPPL / tài liệu pháp lý"}
function roleNote(d){const r=lawRole(d);if(r==="consolidated")return "Văn bản hợp nhất giúp đọc nội dung sau sửa đổi thuận tiện hơn nhưng không tạo quy phạm mới. Khi viện dẫn, cần truy được văn bản gốc và văn bản sửa đổi.";if(r==="policy")return "Văn bản này chủ yếu thể hiện chương trình, kế hoạch hoặc định hướng chính sách; không tự thay thế điều kiện pháp lý cụ thể của Luật, Nghị định, Thông tư đang có hiệu lực.";if(r==="temporary")return "Đây là cơ chế có thời hạn. Khi áp dụng phải kiểm tra cả thời điểm, phạm vi và văn bản mới có thể làm thay đổi/chấm dứt cơ chế.";return "Trước khi áp dụng cần kiểm tra hiệu lực, sửa đổi, bãi bỏ, điều khoản chuyển tiếp và văn bản hướng dẫn."}
function contextGuide(d){const g={bvmt:"Đặt văn bản trong chuỗi Luật BVMT → nghị định chi tiết/sửa đổi → thông tư/mẫu → QCVN. Với thủ tục, tách đối tượng nghĩa vụ khỏi thẩm quyền.",nuoc:"Tách nghĩa vụ tài nguyên nước khỏi GPMT. Kiểm tra loại hoạt động về nước, trường hợp cấp phép/đăng ký/miễn, công trình liên quan và chuỗi sửa đổi 2026.",khi:"Xác định đúng nguồn phát thải, phạm vi QCVN, nội dung GPMT và chế độ quan trắc; không áp một quy chuẩn cho mọi công nghệ.",thai:"Bắt đầu từ dòng chất thải và chủ thể quản lý; phân định CTNH, EPR, lưu giữ/chuyển giao là các nhánh khác nhau.",dat:"Kiểm tra loại đất, quyền sử dụng, chuyển mục đích, thẩm quyền và nghĩa vụ tài chính; văn bản kế hoạch sửa luật chỉ dùng để theo dõi xu hướng.",ks:"Tách quyền khoáng sản khỏi môi trường, đất, nước và phục hồi/ký quỹ; các hệ phân nhóm khoáng sản và môi trường không đồng nhất.",rung:"Xác định loại rừng, chủ rừng, hiện trạng và thủ tục chuyên ngành; ĐTM không thay thế thủ tục lâm nghiệp.",ddsh:"Gắn quy định với khu bảo tồn, sinh cảnh hoặc loài cụ thể và phạm vi không gian thực tế.",bien:"Xác định hoạt động biển/thủy sản cụ thể, khu bảo tồn/nguồn lợi, giấy phép chuyên ngành và nghĩa vụ môi trường song song.",thuyloi:"Kiểm tra công trình thủy lợi, phạm vi bảo vệ, hoạt động trong công trình và thẩm quyền chuyên ngành.",thientai:"Đọc quy định phòng chống thiên tai cùng yêu cầu an toàn công trình, kế hoạch ứng phó và khung xử phạt đang có hiệu lực.",kttv:"Tách yêu cầu quan trắc/dự báo/khai thác dữ liệu khí tượng thủy văn khỏi quan trắc môi trường thông thường.",knk:"Tách kiểm kê/giảm nhẹ KNK, thị trường carbon và quản lý chất được kiểm soát thành các nhánh nghiệp vụ riêng.",hc:"Ghép Luật Hóa chất với bộ nghị định/thông tư triển khai và QCVN sản phẩm; nghĩa vụ hóa chất không thay nghĩa vụ môi trường.",dl:"Dự án điện/năng lượng tái tạo vẫn phải rà môi trường, đất, rừng, nước theo vị trí và loại dự án; không suy ra miễn thủ tục từ tính chất năng lượng sạch.",phi:"Kiểm tra đúng đối tượng, căn cứ tính, miễn/giảm và địa phương áp dụng; không dùng công cụ tính nhanh thay kê khai."};return g[d.t]||"Đọc văn bản cùng chuỗi sửa đổi, hướng dẫn và quy định chuyển tiếp có liên quan."}
function summaryAssist(d){if(/class=\"long-summary\"/.test(d.b))return "";const m=metaOf(d.id);return `<div class="long-summary" style="margin-top:12px"><section class="summary-block"><h3>Cách dùng trong hồ sơ thực tế</h3><p>${contextGuide(d)}</p></section><section class="summary-block"><h3>Trước khi áp dụng</h3><p>${m.eff?`LegalOS đang ghi nhận hiệu lực từ <b>${m.eff}</b>. `:""}Kiểm tra lại toàn văn, lịch sử sửa đổi/bãi bỏ và điều khoản chuyển tiếp ở nguồn chính thức. Tóm tắt dùng để tra nhanh, không thay nội dung văn bản.</p></section></div>`}
function renderTermCats(){if(!$('termCats'))return;const counts=Object.fromEntries(TERM_CATS.map(c=>[c,TERMS.filter(t=>t.c===c).length]));$('termTotal').textContent=`${TERMS.length} thuật ngữ`;$('termCats').innerHTML=`<button class="term-cat ${currentTermCat==='all'?'on':''}" data-termcat="all" type="button"><span>Tất cả</span><span>${TERMS.length}</span></button>`+TERM_CATS.map(c=>`<button class="term-cat ${currentTermCat===c?'on':''}" data-termcat="${c}" type="button"><span>${c}</span><span>${counts[c]||0}</span></button>`).join('')}
function renderTermCards(q=''){
 const s=q.trim().toLowerCase(),sort=$('termSort')?.value||'default';let list=TERMS.filter(x=>(currentTermCat==='all'||x.c===currentTermCat)&&(!s||(x.t+' '+x.c+' '+x.d+' '+x.n).toLowerCase().includes(s)));if(sort==='az')list=[...list].sort((a,b)=>a.t.localeCompare(b.t,'vi'));$('termCount').textContent=`${list.length} kết quả${currentTermCat==='all'?'':` trong “${currentTermCat}”`}`;
 const groups=sort==='az'||currentTermCat!=='all'?[['',list]]:TERM_CATS.map(c=>[c,list.filter(x=>x.c===c)]).filter(x=>x[1].length);
 $('tlist').innerHTML=groups.map(([cat,arr])=>`<section class="term-section">${cat?`<h2>${cat}<span>${arr.length}</span></h2>`:''}<div class="term-grid-v7">${arr.map(x=>`<article class="term-card-v7"><b>${x.t}</b><p>${x.d}</p><div class="term-note"><strong>Lưu ý:</strong> ${x.n}</div>${x.r?.length?`<div class="term-links">${x.r.filter(id=>D.some(d=>d.id===id)).slice(0,4).map(id=>{const d=D.find(z=>z.id===id);return `<button data-open="${id}" type="button">${d.ttl.replace(/ —.*/,'')}</button>`}).join('')}</div>`:''}</article>`).join('')}</div></section>`).join('')||`<div class="empty">Không có thuật ngữ khớp.</div>`;renderTermCats();
}
function parseVNDate(s){if(!s)return null;const m=String(s).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);return m?new Date(+m[3],+m[2]-1,+m[1]):null}
function renderUpdateStats(){if(!$('updateStats'))return;const now=new Date();now.setHours(0,0,0,0);const future=D.filter(d=>{const x=parseVNDate(metaOf(d.id).eff);return x&&x>now}).length;const recent=D.filter(d=>{const x=parseVNDate(metaOf(d.id).eff);return x&&x<=now&&now-x<=60*86400000}).length;const temp=D.filter(d=>metaOf(d.id).temp).length;const con=D.filter(d=>lawRole(d)==='consolidated').length;$('updateStats').innerHTML=`<div class="update-stat"><b>${future}</b><span>Sắp có hiệu lực</span></div><div class="update-stat"><b>${recent}</b><span>Hiệu lực trong 60 ngày</span></div><div class="update-stat"><b>${temp}</b><span>Cơ chế có thời hạn</span></div><div class="update-stat"><b>${con}</b><span>Văn bản hợp nhất</span></div>`}
function renderUpcoming(){if(!$('upcomingList'))return;const now=new Date();now.setHours(0,0,0,0);const rows=D.map(d=>({d,m:metaOf(d.id),date:parseVNDate(metaOf(d.id).eff)})).filter(x=>x.date&&x.date>=new Date(now.getTime()-60*86400000)).sort((a,b)=>a.date-b.date);$('upcomingList').innerHTML=rows.length?rows.map(x=>{const days=Math.round((x.date-now)/86400000),future=days>0;return `<article class="upcoming-card ${future?'future':''}"><div class="days">${future?`Còn ${days} ngày`:days===0?'Hiệu lực hôm nay':`Đã hiệu lực ${Math.abs(days)} ngày`}</div><h3>${x.d.ttl}</h3><p style="color:var(--m);font-size:13px;margin:5px 0">Hiệu lực: <b>${x.m.eff}</b> · ${x.m.rel||x.d.k}</p><div class="row"><button class="tiny" data-open="${x.d.id}" type="button">Mở tóm tắt</button>${x.m.src?`<a class="official" href="${x.m.src}" target="_blank" rel="noopener">Nguồn ↗</a>`:''}</div></article>`}).join(''):`<div class="empty">Không có dữ liệu hiệu lực trong khoảng theo dõi.</div>`}
const IMPACT_GROUPS=[
 ["ĐTM · GPMT · ĐKMT","Các thay đổi 2025–2026 ảnh hưởng cách đọc chuỗi Luật BVMT, NĐ 08, thẩm quyền và biểu mẫu.",["l146","nd48","tt09","nq6619","tt22_2026_admin","tt32_2026_bnnmt"]],
 ["Tài nguyên nước","Luật Tài nguyên nước 2023 cùng gói sửa nghị định/thông tư có hiệu lực 17/01/2026.",["l28","nd23_2026_water","tt06_2026_water","vbhn09_water"]],
 ["EPR & chất thải","Khung EPR chuyên biệt từ 25/05/2026 và quy chuẩn/nghĩa vụ chất thải.",["nd110","tt24epr","q07"]],
 ["KNK · carbon · ô-dôn","NĐ 06/2022 đã được sửa 2025–2026; theo dõi thêm thị trường carbon và Điều 6 Paris.",["nd06","nd119","nd83","qd232_2025_carbon","nq235_2026_paris"]],
 ["Đất đai","Phân quyền 2 cấp, dữ liệu địa chính, cơ chế tài chính và định hướng sửa Luật Đất đai.",["nq29_2026_land","nd50_2026_land","tt19_2026_land","vbhn41_land_2026","nq229_land"]],
 ["Thủy sản","NĐ 41/2026 cùng thông tư về đầu vào NTTS, thủy sản sống nhập khẩu và bộ VBHN IUU/nguồn lợi.",["nd41_2026_fish","tt16_2026_fish","tt17_2026_fish","vbhn79_fish","vbhn80_fish"]],
 ["PCTT · thủy lợi","Gói sửa đổi 2026 cho thủy lợi, đê điều, phòng chống thiên tai và xử phạt.",["tt08_2026_irrig","nd53_2026_disaster","nd183_2026_disaster","vbhn34_disaster"]],
 ["Hóa chất & QCVN sản phẩm","Luật Hóa chất 2025 cùng bộ nghị định 2026 và sửa QCVN hóa chất/sản phẩm.",["lhc","nd24_2026_chem","nd25_2026_chem","nd26_2026_chem","tt37_2026_bct","tt38_2026_bct"]]
];
function renderImpact(){if(!$('impactGrid'))return;$('impactGrid').innerHTML=IMPACT_GROUPS.map(g=>`<article class="impact-card"><h3>${g[0]}</h3><p>${g[1]}</p><div class="impact-links">${g[2].filter(id=>D.some(d=>d.id===id)).map(id=>{const d=D.find(x=>x.id===id);return `<button data-open="${id}" type="button">${d.ttl.replace(/ —.*/,'')}</button>`}).join('')}</div></article>`).join('')}

function renderLawHubTab(tab){
  document.querySelectorAll('[data-lawtab]').forEach(b=>b.classList.toggle('on',b.dataset.lawtab===tab));
  document.querySelectorAll('[data-lawpanel]').forEach(p=>p.hidden=p.dataset.lawpanel!==tab);
  if(tab==='upcoming')renderUpcoming();if(tab==='impact')renderImpact();if(tab==='core')renderCoreMap('coreMapHub');if(tab==='verify')renderVerifiedAudit();if(tab==='sources')renderOfficialSources();if(tab==='data')renderDataVault();renderUpdateStats();
}
function is2026Doc(d){const m=metaOf(d.id);return (m.eff||'').endsWith('2026')||/2026/.test(d.ttl)}



function phaseLabel(v){return({plan:"Chuẩn bị / đầu tư mới",construction:"Thi công / xây dựng",operation:"Đang vận hành",change:"Thay đổi / mở rộng",closure:"Đóng cửa / phục hồi"})[v]||"Chưa xác định"}
function sectorLabel(v){return({industrial:"Sản xuất / công nghiệp",mining:"Địa chất / khoáng sản",waste:"Xử lý chất thải",energy:"Điện / năng lượng",agri:"Nông nghiệp / chăn nuôi / thủy sản",infra:"Hạ tầng / giao thông / đô thị",tourism:"Du lịch / dịch vụ",other:"Khác"})[v]||"Chưa xác định"}
function ynLabel(v){return v==="yes"?"Có":v==="no"?"Không":"Chưa rõ"}
function collectExpertForm(){
  const docIds=["expDocDesign","expDocMap","expDocEnv","expDocMonitor","expDocWater","expDocLand"];
  return {
    name:$("expName")?.value.trim()||"",
    phase:$("expPhase")?.value||"",
    sector:$("expSector")?.value||"",
    location:$("expLocation")?.value.trim()||"",
    scale:$("expScale")?.value.trim()||"",
    sensitive:$("expSensitive")?.value||"unknown",
    water:$("expWater")?.value||"unknown",
    air:$("expAir")?.value||"unknown",
    waste:$("expWaste")?.value||"unknown",
    waterUse:$("expWaterUse")?.value||"unknown",
    land:$("expLand")?.value||"unknown",
    bio:$("expBio")?.value||"unknown",
    climate:$("expClimate")?.value||"unknown",
    community:$("expCommunity")?.value||"unknown",
    docs:docIds.filter(id=>$(id)?.checked)
  };
}
function expertCompleteness(d){
  const core=[d.phase,d.sector,d.location,d.scale];
  const scope=[d.sensitive,d.water,d.air,d.waste,d.waterUse,d.land,d.bio,d.climate,d.community];
  const coreScore=core.filter(Boolean).length/4*45;
  const scopeScore=scope.filter(v=>v&&v!=="unknown").length/scope.length*35;
  const docScore=Math.min(20,d.docs.length/4*20);
  return Math.round(coreScore+scopeScore+docScore);
}
function expertAnalyzeData(d){
  const branches=[],refs=new Set(["l72","nd08","nd48"]);
  const missing=[];
  if(!d.phase)missing.push("giai đoạn dự án/cơ sở");
  if(!d.sector)missing.push("lĩnh vực hoạt động");
  if(!d.location)missing.push("địa điểm/khu vực");
  if(!d.scale)missing.push("quy mô chính");
  [["yếu tố nhạy cảm",d.sensitive],["nước thải",d.water],["khí thải",d.air],["chất thải",d.waste],["khai thác/sử dụng nước",d.waterUse],["đất/rừng",d.land],["đa dạng sinh học",d.bio],["khí hậu/KNK",d.climate],["ồn/rung/cộng đồng",d.community]].forEach(x=>{if(x[1]==="unknown")missing.push(x[0])});

  if(["plan","change"].includes(d.phase)){
    branches.push(["ĐTM / thay đổi dự án","Rà lại đối tượng, phụ lục áp dụng và mức độ thay đổi so với hồ sơ đã được thẩm định/phê duyệt; không mặc nhiên coi mở rộng là phải làm lại toàn bộ hồ sơ."]);
  }
  if(["operation","change"].includes(d.phase)){
    branches.push(["GPMT / vận hành","Đối chiếu tình trạng giấy phép hiện có, nguồn thải thực tế, nội dung được phép và nghĩa vụ khi thay đổi."]);
  }
  if(d.phase==="construction")branches.push(["Thi công & kiểm soát tác động","Rà biện pháp quản lý bụi, ồn, nước mưa/nước thải, chất thải xây dựng, sự cố và nghĩa vụ theo hồ sơ môi trường đã được phê duyệt."]);
  if(d.phase==="closure")branches.push(["Đóng cửa / phục hồi","Rà nghĩa vụ phục hồi môi trường, xử lý công trình/chất thải tồn lưu, đất đai và thủ tục chuyên ngành tương ứng."]);

  if(d.water==="yes"){branches.push(["Nước thải","Xác định loại nước thải, lưu lượng, nơi tiếp nhận, công trình xử lý, QCVN và mối liên hệ với GPMT."]);refs.add("q40")}
  if(d.air==="yes"){branches.push(["Khí thải / bụi","Xác định từng nguồn phát sinh, thông số ô nhiễm, công trình xử lý, QCVN và chế độ quan trắc."]);refs.add("q19")}
  if(d.waste==="yes"){branches.push(["Chất thải / CTNH","Phân loại từng dòng chất thải, lưu giữ, chuyển giao, chứng từ và nội dung quản lý trong hồ sơ môi trường."]);refs.add("q07")}
  if(d.waterUse==="yes"){branches.push(["Tài nguyên nước","Rà hoạt động khai thác/sử dụng nước, xả/đấu nối và các nghĩa vụ tài nguyên nước riêng biệt với thủ tục môi trường."]);refs.add("l28")}
  if(d.land==="yes"){branches.push(["Đất / rừng / chuyển mục đích","Đối chiếu hiện trạng sử dụng đất, quy hoạch, đất lúa, rừng và thẩm quyền chuyên ngành; không gộp thành một thủ tục môi trường duy nhất."]);refs.add("ldat");refs.add("ln")}
  if(d.bio==="yes"){branches.push(["Đa dạng sinh học","Kiểm tra khu bảo tồn, hành lang/sinh cảnh, loài và mức độ nhạy cảm bằng dữ liệu không gian và nguồn chuyên ngành."]);refs.add("ddsh")}
  if(d.climate==="yes"){branches.push(["KNK / năng lượng / ô-dôn","Rà nghĩa vụ kiểm kê KNK, sử dụng năng lượng và chất được kiểm soát theo đúng đối tượng; tách KNK khỏi thủ tục ô-dôn/HFC."]);refs.add("nd06")}
  if(d.community==="yes"){branches.push(["Ồn, rung & cộng đồng","Đánh giá nguồn ồn/rung, đối tượng chịu tác động và nhu cầu tham vấn/trao đổi thông tin theo thủ tục và bối cảnh dự án."]);refs.add("q26")}

  if(d.sensitive==="yes")branches.unshift(["Yếu tố nhạy cảm","Ưu tiên xác minh bằng bản đồ/hồ sơ chính thức trước khi phân nhóm hoặc kết luận thủ tục; cần chỉ rõ yếu tố nào, vị trí nào và căn cứ dữ liệu nào."]);
  if(d.sector==="mining"){branches.push(["Khoáng sản & phục hồi","Đọc song song pháp luật địa chất-khoáng sản, đất, nước, phục hồi/ký quỹ và môi trường; không đồng nhất 'khoáng sản nhóm IV' với 'dự án môi trường nhóm IV'."]);refs.add("l54")}
  if(d.sector==="energy"){branches.push(["Điện / năng lượng","Rà pháp luật điện lực cùng môi trường, đất, nước và sinh thái; nguồn năng lượng tái tạo không tự tạo miễn trừ ĐTM/GPMT."]);refs.add("ldl")}
  if(d.sector==="waste"){branches.push(["Cơ sở xử lý chất thải","Cần xác định loại chất thải tiếp nhận, phạm vi hoạt động, công nghệ và điều kiện chuyên ngành trước khi kết luận giấy phép/nghĩa vụ."])}
  if(d.sector==="agri"){branches.push(["Nông nghiệp / thủy sản","Tách nguồn thải, nước, đất, hóa chất/vật tư đầu vào, dịch bệnh/sinh học và quy định chuyên ngành phù hợp."])}

  const docsNeeded=[];
  if(!d.docs.includes("expDocDesign"))docsNeeded.push("Thuyết minh/thiết kế hoặc mô tả công nghệ đủ để lập cân bằng vật chất và nhận diện nguồn thải");
  if(!d.docs.includes("expDocMap"))docsNeeded.push("Bản đồ, tọa độ, hiện trạng đất và vị trí các đối tượng nhạy cảm");
  if(["operation","change","closure"].includes(d.phase)&&!d.docs.includes("expDocEnv"))docsNeeded.push("Hồ sơ môi trường đã có: ĐTM/GPMT/ĐKMT/quyết định liên quan");
  if(["operation","change"].includes(d.phase)&&!d.docs.includes("expDocMonitor"))docsNeeded.push("Kết quả quan trắc/phân tích hoặc dữ liệu vận hành công trình BVMT");
  if(d.waterUse==="yes"&&!d.docs.includes("expDocWater"))docsNeeded.push("Hồ sơ tài nguyên nước/đấu nối/nguồn cấp và thoát nước");
  if((d.land==="yes"||d.sensitive==="yes")&&!d.docs.includes("expDocLand"))docsNeeded.push("Hồ sơ đất, rừng, quy hoạch hoặc tài liệu xác minh yếu tố nhạy cảm");

  return {score:expertCompleteness(d),branches,missing,docsNeeded,refs:[...refs]};
}
function renderExpertResult(d,a){
  if(!$("expOut"))return;
  const scoreClass=a.score>=75?"ok":a.score>=45?"warn":"bad";
  const refs=a.refs.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,10);
  $("expOut").innerHTML=`<div class="expert-result-head"><div><div class="section-kicker">Phiếu rà soát</div><h2>${esc(d.name||"Hồ sơ chưa đặt tên")}</h2><p>${phaseLabel(d.phase)} · ${sectorLabel(d.sector)}${d.location?` · ${esc(d.location)}`:""}</p></div><div class="expert-score ${scoreClass}"><b>${a.score}%</b><span>độ đầy đủ thông tin</span></div></div>
    <div class="expert-scorebar"><span style="width:${a.score}%"></span></div>
    <div class="expert-result-grid">
      <section class="expert-result-card"><h3>Nội dung cần kiểm tra</h3>${a.branches.length?a.branches.map(x=>`<div class="expert-branch"><b>${x[0]}</b><p>${x[1]}</p></div>`).join(""):`<p class="muted">Chưa đủ dữ liệu để nhận diện nhánh cụ thể.</p>`}</section>
      <section class="expert-result-card"><h3>Thông tin còn thiếu</h3>${a.missing.length?`<ul>${a.missing.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p class="ok-text">Các trường nền chính đã được trả lời.</p>`}<h3>Tài liệu nên bổ sung</h3>${a.docsNeeded.length?`<ul>${a.docsNeeded.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p class="ok-text">Không thấy thiếu nhóm tài liệu ưu tiên theo biểu mẫu hiện tại.</p>`}</section>
    </div>
    <section class="expert-result-card"><h3>Văn bản nên xem tiếp</h3><div class="expert-ref-list">${refs.map(x=>`<button data-open="${x.id}" type="button"><b>${x.ttl}</b><small>${x.k} · ${topicName(x.t)}</small></button>`).join("")}</div></section>
    <div class="expert-next"><button class="btn bp" id="expSaveBrief" type="button">Lưu phiếu</button><button class="btn bs" data-go="proc" type="button">Mở Lộ trình thủ tục</button><button class="btn bs" data-go="lib" type="button">Tra Kho văn bản</button><button class="btn bs" data-go="import" type="button">Bổ sung PDF/Word</button></div>
    <p class="note" style="margin-top:12px"><b>Giới hạn:</b> “độ đầy đủ thông tin” là thước tổ chức dữ liệu, không phải điểm tuân thủ pháp luật và không thay kết luận của cơ quan có thẩm quyền.</p>`;
  lastExpertAnalysis={data:d,analysis:a};
  $("expSaveBrief").onclick=()=>saveExpertBrief();
}
function analyzeExpert(){
  const d=collectExpertForm(),a=expertAnalyzeData(d);
  renderExpertResult(d,a);
  logActivity("case","expert",`Phiếu chuyên gia: ${d.name||sectorLabel(d.sector)}`);
}
function clearExpertForm(){
  ["expName","expLocation","expScale"].forEach(id=>{if($(id))$(id).value=""});
  ["expPhase","expSector"].forEach(id=>{if($(id))$(id).value=""});
  ["expSensitive","expWater","expAir","expWaste","expWaterUse","expLand","expBio","expClimate","expCommunity"].forEach(id=>{if($(id))$(id).value="unknown"});
  ["expDocDesign","expDocMap","expDocEnv","expDocMonitor","expDocWater","expDocLand"].forEach(id=>{if($(id))$(id).checked=false});
  lastExpertAnalysis=null;
  if($("expOut"))$("expOut").innerHTML='<div class="empty">Nhập bối cảnh dự án/cơ sở rồi bấm <b>Rà soát hồ sơ</b>.</div>';
}
function saveExpertBrief(){
  if(!lastExpertAnalysis){toast("Hãy phân tích trước khi lưu");return}
  const b={id:"eb"+Date.now(),createdAt:new Date().toISOString(),...lastExpertAnalysis};
  expertBriefs=[b,...expertBriefs].slice(0,50);
  STORE.set("v10_expert_briefs",expertBriefs);
  renderExpertBriefs();renderWorkspaceStats();toast("Đã lưu phiếu chuyên gia");
}
function renderExpertBriefs(){
  if(!$("expertBriefList"))return;
  $("expertBriefList").innerHTML=expertBriefs.length?expertBriefs.slice(0,12).map(b=>`<article class="expert-brief"><div><div class="section-kicker">${new Date(b.createdAt).toLocaleString("vi-VN")}</div><b>${esc(b.data.name||"Hồ sơ chưa đặt tên")}</b><p>${phaseLabel(b.data.phase)} · ${sectorLabel(b.data.sector)} · ${b.analysis.score}% dữ liệu</p></div><div class="row"><button class="tiny" data-expert-load="${b.id}" type="button">Mở lại</button><button class="tiny" data-expert-delete="${b.id}" type="button">Xóa</button></div></article>`).join(""):`<div class="empty">Chưa lưu phiếu chuyên gia nào.</div>`;
}
function loadExpertBrief(id){
  const b=expertBriefs.find(x=>x.id===id);if(!b)return;
  const d=b.data;go("expert");
  setTimeout(()=>{
    [["expName",d.name],["expPhase",d.phase],["expSector",d.sector],["expLocation",d.location],["expScale",d.scale],["expSensitive",d.sensitive],["expWater",d.water],["expAir",d.air],["expWaste",d.waste],["expWaterUse",d.waterUse],["expLand",d.land],["expBio",d.bio],["expClimate",d.climate],["expCommunity",d.community]].forEach(([id,v])=>{if($(id))$(id).value=v||""});
    ["expDocDesign","expDocMap","expDocEnv","expDocMonitor","expDocWater","expDocLand"].forEach(id=>{if($(id))$(id).checked=d.docs.includes(id)});
    renderExpertResult(d,b.analysis);
  },0);
}
function renderVerifiedAudit(){
  if(!$("verifiedAudit"))return;
  const rows=Object.entries(PROFESSOR_VERIFIED).map(([id,v])=>({id,v,d:D.find(x=>x.id===id)})).filter(x=>x.d);
  const linked=D.filter(d=>!!metaOf(d.id).src).length;
  $("verifiedAudit").innerHTML=`<div class="verify-summary"><div><b>${rows.length}</b><span>mục kiểm chứng thủ công đợt này</span></div><div><b>${linked}</b><span>mục có liên kết nguồn trong dữ liệu</span></div><div><b>${D.length-linked}</b><span>mục chưa có link nguồn</span></div></div>`+
  rows.map(x=>`<article class="verify-card"><div class="verify-check">✓</div><div><div class="section-kicker">Đã đối chiếu ${x.v.checked}</div><h3>${x.d.ttl}</h3><p>${x.v.note}</p><div class="row"><button class="tiny" data-open="${x.id}" type="button">Mở trong LegalOS</button><a class="official" href="${x.v.source}" target="_blank" rel="noopener">Nguồn Chính phủ ↗</a></div></div></article>`).join("");
}

function syncHomeCleanMode(page=currentPage()){
  document.body.classList.toggle('home-clean-v91',page==='home');
}

function go(p){
  const activate=()=>{
    document.querySelectorAll(".page").forEach(x=>x.classList.toggle("on",x.id===p));
    syncHomeCleanMode(p);
    document.querySelectorAll("nav.links button").forEach(b=>b.classList.toggle("on",b.dataset.go===p||(p==="art"&&b.dataset.go==="lib")||(p==="pone"&&b.dataset.go==="proc")));
    $("nav").classList.remove("open");
    window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    requestAnimationFrame(()=>{setCrumb();syncMobileNav();renderCommandCenter();if(p==="home"){renderHomeActivity();renderHomeContinue();renderHomePortal()}if(p==="corekb"){renderCoreKnowledge($("coreKbQ")?.value||"")}if(p==="memo"){renderMemoV13()}if(p==="import"){refreshImportedDocs()}if(p==="expert"){renderExpertBriefs();renderImportStats();if($("expFileCount"))$("expFileCount").textContent=importedDocs.length}if(p==="work"){renderWorkspace();renderWorkspaceStats()}if(p!=="art"){$('readingProgress')?.classList.remove('on');document.body.classList.remove('read-focus','read-large','read-small')}});
  };
  if(document.startViewTransition)document.startViewTransition(activate);else activate();
}
function docs(topic="all",q=""){
  const qq=q.trim(),type=$("typeF")?.value||"all",sort=$("sortF")?.value||"default",scope=$("scopeF")?.value||"all",year=$("yearF")?.value||"all",source=$("sourceF")?.value||"all",asOf=$("asOfF")?.value||"";
  let list=D.filter(d=>{
    const m=metaOf(d.id);
    return (topic==="all"||d.t===topic)
      &&(type==="all"||d.k===type)
      &&(!savedOnlyMode||saved.includes(d.id))
      &&searchEligible(d,qq)
      &&(scope==="all"||(scope==="2026"&&is2026Doc(d))||(scope==="core"&&CORE_IDS.includes(d.id))||(scope==="consolidated"&&isConsolidated(d)))
      &&(year==="all"||docYear(d)===year)
      &&(source==="all"||(source==="verified"&&!!m.src)||(source==="prof"&&!!professorVerified(d.id)))&&(!asOf||!m.eff||!parseVNDate(m.eff)||parseVNDate(m.eff)<=new Date(asOf+"T23:59:59"));
  }).map(d=>({d,...legalSearchScore(d,qq)}));

  if(sort==="az")list.sort((a,b)=>a.d.ttl.localeCompare(b.d.ttl,"vi"));
  else if(sort==="za")list.sort((a,b)=>b.d.ttl.localeCompare(a.d.ttl,"vi"));
  else if(qq)list.sort((a,b)=>b.score-a.score);

  $("dcount").textContent=`${list.length} văn bản${qq?` phù hợp với “${q.trim()}”`:""}`;
  $("clearQ").classList.toggle("on",!!q.trim());
  renderSearchCoach(list,q);

  $("docs").innerHTML=list.length?list.map(({d,score,reasons,refs})=>{
    const m=metaOf(d.id),rank=qq?Math.max(1,Math.min(99,Math.round(score/3))):0;
    const p=parseLegalQuery(q);
    const exactRef=qq&&(p.article||p.clause||p.point)&&reasons.some(x=>/Điều|Khoản|Điểm/.test(x));
    return `<div class="doc">
      <div class="docrow">
        <label class="selectbox" title="Chọn để so sánh"><input type="checkbox" data-compare="${d.id}" ${compareSelected.includes(d.id)?"checked":""}></label>
        <button class="docmain" type="button" data-open="${d.id}">
          <div style="display:flex;gap:6px;align-items:flex-start;justify-content:space-between">
            <b>${hi(d.ttl,q)}</b>${qq?`<span class="search-rank">${rank>=80?"Khớp cao":rank>=55?"Khớp":"Liên quan"}</span>`:""}
          </div>
          <div class="meta">
            <span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span>
            ${m.temp?'<span class="doc-state temp">Có thời hạn</span>':(m.eff?'<span class="doc-state">Có dữ liệu hiệu lực</span>':'')}
            <span class="role-badge ${lawRole(d)}">${roleLabel(lawRole(d))}</span>
            ${professorVerified(d.id)?'<span class="prof-verified-dot">Đã kiểm chứng</span>':(m.src?'<span class="verified-dot">Có nguồn</span>':'')}
            ${exactRef?'<span class="no-fulltext">Có tham chiếu trong chỉ mục</span>':''}
          </div>
          <div class="doc-snippet">${hi(snippetText(d.b,q),q)}</div>
          ${reasons.length?`<div class="match-reasons">${reasons.slice(0,4).map((r,i)=>`<span class="match-reason ${i===0&&exactRef?"exact":""}">${esc(r)}</span>`).join("")}</div>`:""}
          ${refs.length?`<div class="ref-strip">${refs.slice(0,6).map(r=>`<span class="ref-chip">${esc(r)}</span>`).join("")}</div>`:""}
          ${(m.issued||m.eff||m.rel)?`<div class="doc-meta-extra">${m.issued?`<span>Ban hành: ${m.issued}</span><span>·</span>`:''}${m.eff?`<span>Hiệu lực: ${m.eff}</span><span>·</span>`:''}<span>${m.rel||''}</span></div>`:''}
        </button>
        <div class="doc-tools doc-tools-v11">
          <button class="goto-match" data-open-match="${d.id}" data-query="${esc(q)}" type="button">${qq?"Xem đoạn liên quan":"Mở"}</button>
          <button class="btn bs preview-btn" data-preview="${d.id}" type="button">Xem nhanh</button>
          <button class="mini" data-save="${d.id}" type="button" title="${saved.includes(d.id)?"Bỏ lưu":"Lưu"}">${saved.includes(d.id)?"★":"☆"}</button>
        </div>
      </div>
    </div>`;
  }).join(""):`<div class="empty"><b>Chưa tìm thấy căn cứ phù hợp trong dữ liệu LegalOS.</b><br><br>Thử bỏ bớt Khoản/Điểm, tìm bằng số hiệu văn bản, hoặc mở nguồn chính thức. Kho LegalOS hiện chủ yếu là metadata + tóm tắt, chưa phải cơ sở toàn văn Điều/Khoản/Điểm.</div>`;

  updateCompareBar();applyLibraryView();
}
function analyze(){
  if(!validateClassifier())return;
  const kind=$("kind").value,cap=+$("cap").value||0,area=+$("area").value||0,ww=+$("ww").value||0,tr=+$("tr").value||0,hz=+$("hz").value||0,air=+$("air").value||0,sens=$("sens").value==="yes";
  const kindLabel=$("kind").selectedOptions[0].textContent;
  const branches=[];const refs=new Set(["l72","nd08","nd48"]);
  branches.push(["Phân nhóm dự án / ĐTM","Phải tra đúng loại hình trong Phụ lục NĐ 08 đã được sửa; Không tự gán Nhóm I–IV chỉ từ công suất hoặc diện tích."]);
  if(ww>0){branches.push(["Nước thải & GPMT",`Có khai báo ${ww.toLocaleString("vi-VN")} m³/ngày nước thải. Cần xác định loại nước thải, nơi tiếp nhận, QCVN áp dụng và đối tượng GPMT.`]);refs.add("q40");}
  if(ww>0&&tr<ww)branches.push(["Năng lực XLNT",`Công suất XLNT nhập (${tr.toLocaleString("vi-VN")}) thấp hơn lưu lượng nước thải (${ww.toLocaleString("vi-VN")}); cần kiểm tra cân bằng nước và thiết kế, không tự kết luận vi phạm chỉ từ hai ô số.`]);
  if(air>0){branches.push(["Khí thải",`Có khai báo ${air.toLocaleString("vi-VN")} m³/giờ khí thải. Cần xác định nguồn, thông số, QCVN, GPMT và chế độ quan trắc theo đối tượng.`]);refs.add("q19");}
  if(hz>0){branches.push(["Chất thải nguy hại",`Có khai báo ${hz.toLocaleString("vi-VN")} kg/tháng CTNH. Cần kiểm tra phân định, lưu giữ, chuyển giao và nội dung hồ sơ môi trường; khối lượng không phải tiêu chí duy nhất để xác định một chất là CTNH.`]);refs.add("q07");}
  if(sens)branches.push(["Yếu tố nhạy cảm","Có khai báo yếu tố nhạy cảm. Cần tách từng yếu tố và kiểm chứng bằng hồ sơ/bản đồ: rừng, khu bảo tồn, nguồn nước, đất lúa, đô thị…"]);
  if(kind==="mining"){branches.push(["Khoáng sản","Mở thêm Luật Địa chất và Khoáng sản, phục hồi/ký quỹ, đất đai, nước và môi trường. Không đồng nhất 'khoáng sản nhóm IV' với 'dự án nhóm IV'."]);refs.add("l54");}
  if(kind==="chem"){branches.push(["Hóa chất","Mở thêm Luật Hóa chất 2025 và bộ nghị định 24–26/2026; nghĩa vụ hóa chất chạy song song với môi trường."]);refs.add("lhc");}
  if(kind==="solar"){branches.push(["Điện / năng lượng tái tạo","Dự án năng lượng tái tạo không mặc nhiên được miễn ĐTM/GPMT; phải rà theo loại dự án, vị trí và yếu tố nhạy cảm."]);refs.add("ldl");}
  if(kind==="waste"){branches.push(["Xử lý chất thải","Cần xác định loại chất thải tiếp nhận, công nghệ, phạm vi xử lý và các giấy phép/nội dung môi trường tương ứng."]);refs.add("nd08");}
  const input={kind:kindLabel,cap,area,ww,tr,hz,air,sens:sens?"Có":"Không"};
  const notes=branches.map(x=>x[0]+": "+x[1]);
  lastAnalysis={group:"Chưa kết luận",dtm:null,gp:null,notes,input,refs:[...refs]};
  $("out").innerHTML=`<div class="card"><div class="k">Kết quả sàng lọc</div><div class="result-grid"><div class="result-card"><small>Nhóm I–IV</small><span class="no-conclusion">Chưa kết luận</span></div><div class="result-card"><small>ĐTM</small><b>Phải tra phụ lục theo loại dự án</b></div><div class="result-card"><small>GPMT</small><b>Phải xác định đối tượng + nguồn thải</b></div></div><div class="why"><b>Dữ liệu đã nhập</b><p style="color:var(--m);font-size:13px">${kindLabel} · công suất ${cap.toLocaleString("vi-VN")} · diện tích ${area.toLocaleString("vi-VN")} ha · nước thải ${ww.toLocaleString("vi-VN")} m³/ngày · CTNH ${hz.toLocaleString("vi-VN")} kg/tháng · khí thải ${air.toLocaleString("vi-VN")} m³/giờ.</p></div><div class="why"><b>Nội dung cần kiểm tra tiếp</b><div class="screening-branches">${branches.map(x=>`<div class="screening-branch"><b>${x[0]}</b><p>${x[1]}</p></div>`).join("")}</div></div><div class="sourcebox"><b>Vì sao chưa kết luận Nhóm I/II/III/IV?</b> Vì pháp luật phân nhóm theo loại hình và tiêu chí trong phụ lục cụ thể. Một công thức chung dùng công suất, diện tích, nước thải hoặc CTNH có thể tạo kết luận sai, đặc biệt khi nhầm ngưỡng quản lý/thẩm quyền với tiêu chí xác định đối tượng.</div><div class="why"><b>Căn cứ mở tiếp</b><div class="row" style="margin-top:8px">${[...refs].filter(id=>D.some(d=>d.id===id)).map(id=>{const d=D.find(x=>x.id===id);return `<button class="tiny" data-open="${id}" type="button">${d.ttl.replace(/ —.*/,"")}</button>`}).join("")}</div></div><div class="row"><button class="btn bp" id="saveCase" type="button">Lưu checklist vào Hồ sơ</button><button class="btn bs" id="copyResult" type="button">Sao chép</button></div></div>`;
  $("saveCase").onclick=()=>{const name=$("caseName").value.trim()||`Hồ sơ ${new Date().toLocaleString("vi-VN")}`;const c={id:"c"+Date.now(),name,createdAt:new Date().toISOString(),input,result:{group:"Chưa kết luận",dtm:null,gp:null,notes,screening:true,refs:[...refs]}};cases=[c,...cases];STORE.set("w3_cases",cases);renderWorkspace();updStats();logActivity("case",c.id,c.name);toast("Đã lưu checklist")};
  $("copyResult").onclick=async()=>{const tx=`${$("caseName").value||"LegalOS.4"}\nNhóm I–IV: Chưa kết luận\nNội dung cần kiểm tra:\n${notes.map(x=>"- "+x).join("\n")}`;try{await navigator.clipboard.writeText(tx);toast("Đã sao chép")}catch{toast("Không thể sao chép tự động")}};
}

document.addEventListener("click",e=>{const stat=e.target.closest("[data-core-stat]");if(stat){e.preventDefault();renderCoreKbStatDetail(stat.dataset.coreStat)}});




let expertWizardStep=0;
const EXPERT_STEP_NAMES=["Dự án","Phạm vi","Tài liệu"];
function renderExpertWizard(){
  document.querySelectorAll("[data-exp-step]").forEach(x=>x.classList.toggle("on",Number(x.dataset.expStep)===expertWizardStep));
  document.querySelectorAll("[data-exp-step-go]").forEach(x=>x.classList.toggle("on",Number(x.dataset.expStepGo)===expertWizardStep));
  if($("expStepText"))$("expStepText").textContent=`Bước ${expertWizardStep+1}/3 · ${EXPERT_STEP_NAMES[expertWizardStep]}`;
  if($("expPrev"))$("expPrev").disabled=expertWizardStep===0;
  if($("expNext")){$("expNext").disabled=expertWizardStep===2;$("expNext").textContent=expertWizardStep===1?"Tới tài liệu →":"Tiếp →"}
}
function setExpertWizardStep(n){expertWizardStep=Math.max(0,Math.min(2,Number(n)||0));renderExpertWizard()}

document.addEventListener("DOMContentLoaded",()=>{
  syncHomeCleanMode('home');
  let savedTheme=null;try{savedTheme=window.localStorage.getItem("w1th")}catch{}
  const th=savedTheme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  document.body.setAttribute("data-theme",th);
  // Critical navigation is bound before optional UI initialization so the app remains clickable even if a secondary widget fails.
  if(!window.__legalosNavBound){
    window.__legalosNavBound=true;
    document.body.addEventListener("click",e=>{
      const b=e.target.closest("[data-go]");
      if(!b)return;
      e.preventDefault();
      go(b.dataset.go);
    });
  }
  if($("topics"))$("topics").innerHTML=T.map(x=>`<button class="topic" type="button" data-t="${x[0]}"><b>${x[1]}</b><small>${x[2]}</small></button>`).join("");
  loadUserLegalPack();renderTypeFilter();renderYearFilter();updStats();renderWorkspace();renderHomeActivity();renderHomeContinue();renderWorkspaceStats();renderDataVault();renderLawNow();renderCoreMap();renderUpdateStats();renderTermCats();renderOfficialSources();populateWizard();applyUIPrefs();renderCommandCenter();syncQuickNote(quickNote);renderHomePortal();refreshImportedDocs();
  renderLibraryTopicFilters();
  setLegalSearchMode(legalSearchMode);renderLegalSearchHistory();renderPopularRefs();renderCoreKnowledge();renderMemoV13();
  docs();
  renderProcList();
  renderTerms();
    renderUpdates("all");
  // Navigation uses the single delegated handler bound at startup.
  $("menuBtn").onclick=()=>{const on=$("nav").classList.toggle("open");$("navScrim").classList.toggle("on",on)};$("navScrim").onclick=()=>{$("nav").classList.remove("open");$("navScrim").classList.remove("on")};
  $("theme").onclick=()=>{const n=document.body.getAttribute("data-theme")==="dark"?"light":"dark";document.body.setAttribute("data-theme",n);try{window.localStorage.setItem("w1th",n)}catch{}};
  $("sidebarCollapse").onclick=()=>{uiPrefs.sidebar=!uiPrefs.sidebar;saveUIPrefs()};
  $("settingsSidebar").onclick=()=>{uiPrefs.sidebar=!uiPrefs.sidebar;saveUIPrefs()};
  $("settingsBtn").onclick=()=>openDrawer('settingsDrawer');$("settingsClose").onclick=closeDrawers;
  $("quickNoteBtn").onclick=()=>{syncQuickNote(quickNote);openDrawer('quickNoteDrawer');setTimeout(()=>$("quickNoteArea").focus(),0)};$("quickNoteClose").onclick=closeDrawers;$("drawerScrim").onclick=closeDrawers;$("previewClose").onclick=closeDrawers;
  $("quickNoteArea").oninput=e=>syncQuickNote(e.target.value);$("workspaceQuickNote").oninput=e=>syncQuickNote(e.target.value);$("clearQuickNote").onclick=()=>{syncQuickNote('');toast('Đã xóa ghi chú nhanh')};
  $("fontScale").onclick=e=>{const b=e.target.closest('[data-scale]');if(b){uiPrefs.scale=b.dataset.scale;saveUIPrefs()}};$("densityMode").onclick=e=>{const b=e.target.closest('[data-density]');if(b){uiPrefs.density=b.dataset.density;saveUIPrefs()}};
  $("resetPrefs").onclick=()=>{uiPrefs={scale:'normal',density:'comfortable',sidebar:false};saveUIPrefs();toast('Đã khôi phục giao diện mặc định')};
  $("viewMode").onclick=e=>{const b=e.target.closest('[data-view]');if(b){libraryView=b.dataset.view;STORE.set('v8_library_view',libraryView);applyLibraryView()}};
  if($("libraryDensity"))$("libraryDensity").onclick=e=>{const b=e.target.closest('[data-libdensity]');if(b){libraryDensity=b.dataset.libdensity;STORE.set('v13_library_density',libraryDensity);applyLibraryView()}};
  if($("toggleAssist"))$("toggleAssist").onclick=()=>{libraryAssistOpen=!libraryAssistOpen;STORE.set('v13_library_assist',libraryAssistOpen);applyLibraryView()};
  $("savedOnly").onclick=()=>{savedOnlyMode=!savedOnlyMode;STORE.set('v8_saved_only',savedOnlyMode);vs()};$("resetFilters").onclick=resetLibraryFilters;
  if($("asOfF"))$("asOfF").onchange=()=>{const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value)};
  $("procWizardStart").onclick=()=>openWizard($("procWizardSelect").value,0);$("wizardClose").onclick=closeWizard;$("wizardModal").onclick=e=>{if(e.target===$("wizardModal"))closeWizard()};
  if($("openShortcuts"))$("openShortcuts").onclick=()=>$("shortcutsModal")?.classList.add('on');if($("shortcutsClose"))$("shortcutsClose").onclick=()=>$("shortcutsModal")?.classList.remove('on');if($("shortcutsModal"))$("shortcutsModal").onclick=e=>{if(e.target===$("shortcutsModal"))$("shortcutsModal").classList.remove('on')};
  $("workspaceQuickNote").value=quickNote;$("quickNoteArea").value=quickNote;
  $("goNotes").onclick=()=>{closeDrawers();go('work');setTimeout(()=>$("workNotes")?.scrollIntoView({behavior:'smooth'}),50)};
  document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>$(b.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'}));


  // Import center
  $('importChooseBtn').onclick=()=>$('importDocsInput').click();$('importDrop').onclick=()=>$('importDocsInput').click();$('importDrop').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('importDocsInput').click()}};$('importDocsInput').onchange=e=>{importFiles(e.target.files);e.target.value=''};
  ['dragenter','dragover'].forEach(ev=>$('importDrop').addEventListener(ev,e=>{e.preventDefault();$('importDrop').classList.add('drag')}));['dragleave','drop'].forEach(ev=>$('importDrop').addEventListener(ev,e=>{$('importDrop').classList.remove('drag');if(ev==='drop'){e.preventDefault();importFiles(e.dataTransfer.files)}}));
  $('importQ').oninput=debounce(renderImportList,80);$('importTypeF').onchange=renderImportList;$('importCatF').onchange=renderImportList;$('importRefresh').onclick=refreshImportedDocs;$('importIndexExport').onclick=exportImportIndex;$('importClearAll').onclick=clearImported;
  document.body.addEventListener('click',e=>{const o=e.target.closest('[data-file-open]');if(o){showImportDetail(o.dataset.fileOpen);return}const d=e.target.closest('[data-file-download]');if(d){downloadImported(d.dataset.fileDownload);return}const del=e.target.closest('[data-file-delete]');if(del){deleteImported(del.dataset.fileDelete);return}const ha=e.target.closest('[data-home-action]');if(ha){const a=ha.dataset.homeAction;if(a==='cmd')openCmd();else if(a==='quicknote'){$('quickNoteBtn').click()}else if(a==='settings')openDrawer('settingsDrawer');else if(a==='lawdata'){go('upd');setTimeout(()=>renderLawHubTab('data'),30)}else if(a==='sources'){go('upd');setTimeout(()=>renderLawHubTab('sources'),30)}return}});
  $('backTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});window.addEventListener('scroll',()=>{$('backTop').classList.toggle('on',window.scrollY>700)},{passive:true});

  if($("topics"))$("topics").onclick=e=>{const t=e.target.closest("[data-t]");if(!t)return;document.querySelectorAll("#chips .chip").forEach(c=>c.classList.toggle("on",c.dataset.t===t.dataset.t));docs(t.dataset.t);go("lib")};
  $("chips").onclick=e=>{const c=e.target.closest(".chip");if(!c)return;document.querySelectorAll("#chips .chip").forEach(x=>x.classList.toggle("on",x===c));docs(c.dataset.t,$("q").value)};
  if($("topicFilterQ"))$("topicFilterQ").addEventListener("input",debounce(e=>renderLibraryTopicFilters(e.target.value),90));
  const vs=(remember=false)=>{const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);if(remember&&$("q").value.trim())addLegalSearchHistory($("q").value)};
  $("qBtn").onclick=()=>vs(true);$("q").addEventListener("keydown",e=>{if(e.key==="Enter")vs(true)});
  $("q").addEventListener("input",debounce(()=>vs(false),90));
  $("typeF").onchange=()=>vs(false);$("sortF").onchange=()=>vs(false);$("yearF").onchange=()=>vs(false);$("sourceF").onchange=()=>vs(false);$("scopeF").onchange=()=>vs(false);
  $("searchMode").onclick=e=>{const b=e.target.closest("[data-searchmode]");if(!b)return;setLegalSearchMode(b.dataset.searchmode);vs(false)};
  $("refFind").onclick=()=>{const q=buildRefQuery();if(!q){toast("Nhập ít nhất Điều hoặc số hiệu văn bản");return}$("q").value=q;setLegalSearchMode("ref");vs(true)};
  ["refDoc","refArticle","refClause","refPoint"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key==="Enter")$("refFind").click()}));
  $("collapseFilters").onclick=()=>document.querySelector(".library-layout-v11")?.classList.toggle("filters-mini");
  if($("coreKbSearchBtn"))$("coreKbSearchBtn").onclick=()=>renderCoreKnowledge($("coreKbQ").value);
  if($("coreKbReset"))$("coreKbReset").onclick=()=>{$("coreKbQ").value="";coreKbTheme="all";renderCoreKnowledge()};
  if($("coreKbQ"))$("coreKbQ").addEventListener("keydown",e=>{if(e.key==="Enter")renderCoreKnowledge($("coreKbQ").value)});
  if($("memoExport"))$("memoExport").onclick=()=>{saveMemoMetaV13();exportMemoMarkdownV13()};
  if($("memoExportData"))$("memoExportData").onclick=exportV13DataPack;
  if($("memoClear"))$("memoClear").onclick=()=>{if(!citationBasketV13.length)return;citationBasketV13=[];STORE.set(MEMO_KEY_V13,citationBasketV13);renderMemoV13();toast("Đã xóa danh sách căn cứ")};
  if($("memoTitle"))$("memoTitle").oninput=saveMemoMetaV13;
  if($("memoGeneralNote"))$("memoGeneralNote").oninput=saveMemoMetaV13;
  document.addEventListener("input",e=>{const n=e.target.closest("[data-citation-note]");if(n)updateCitationNoteV13(n.dataset.citationNote,n.value)});
  const homeSearch=()=>{const v=($("hq")?.value||"").trim();if(!$("q"))return;$("q").value=v;document.querySelectorAll("#chips .chip").forEach(c=>c.classList.toggle("on",c.dataset.t==="all"));go("lib");docs("all",v);setTimeout(()=>$("q")?.focus(),60)};
  $("hgo").onclick=homeSearch;$("hq").onkeydown=e=>{if(e.key==="Enter")homeSearch()};
  document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>{$("hq").value=b.dataset.quick;homeSearch()});
  $("tq").oninput=debounce(()=>renderTerms($("tq").value),80);$("termSort").onchange=()=>renderTerms($("tq").value);$("termCats").onclick=e=>{const b=e.target.closest("[data-termcat]");if(!b)return;currentTermCat=b.dataset.termcat;renderTerms($("tq").value)};
  $("resetProc").onclick=()=>{procDone={};STORE.set("w3_proc",procDone);renderProcList();toast("Đã xóa tiến độ")};
  $("procQ").oninput=debounce(renderProcList,100);$("procFilter").onchange=renderProcList;$("procCat").onchange=renderProcList;
  $("caseQ").oninput=debounce(renderWorkspace,100);
  $("exportW").onclick=exportWorkspace;if($("exportCatalog"))$("exportCatalog").onclick=exportCatalogCSV;if($("exportPack"))$("exportPack").onclick=exportLegalPack;if($("importPack"))$("importPack").onclick=()=>$("packFile").click();if($("packFile"))$("packFile").onchange=()=>{if($("packFile").files[0])importLegalPack($("packFile").files[0])};if($("clearPack"))$("clearPack").onclick=clearLegalPack;$("importW").onclick=()=>$("importFile").click();
  $("importFile").onchange=()=>{if($("importFile").files[0])importWorkspace($("importFile").files[0])};
  $("cmdOpen").onclick=openCmd;$("topSearch").onclick=openCmd;
  $("clearQ").onclick=()=>{$("q").value="";vs(false);$("q").focus()};$("cmdBg").onclick=e=>{if(e.target===$("cmdBg"))closeCmd()};
  $("cmdQ").oninput=()=>renderCmd($("cmdQ").value);
  $("cmdQ").onkeydown=e=>{
    const items=[...$("cmdList").querySelectorAll(".cmd-item")],i=items.findIndex(x=>x.classList.contains("sel"));
    if(e.key==="Escape"){closeCmd();closeCompare()};
    if(e.key==="ArrowDown"){e.preventDefault();if(items.length){items.forEach(x=>x.classList.remove("sel"));items[(i+1+items.length)%items.length].classList.add("sel");items[(i+1+items.length)%items.length].scrollIntoView({block:"nearest"})}}
    if(e.key==="ArrowUp"){e.preventDefault();if(items.length){items.forEach(x=>x.classList.remove("sel"));items[(i-1+items.length)%items.length].classList.add("sel");items[(i-1+items.length)%items.length].scrollIntoView({block:"nearest"})}}
    if(e.key==="Enter"){const b=$("cmdList").querySelector(".cmd-item.sel")||items[0];if(b)b.click()}
  };
  $("cmdList").onclick=e=>{const b=e.target.closest("[data-cmd]");if(!b)return;const [k,id]=b.dataset.cmd.split(":");closeCmd();if(k==="doc")openDoc(id);else if(k==="file"){go("import");setTimeout(()=>showImportDetail(id),60)}else if(k==="proc")openProc(id);else go(id)};
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCmd()}if(e.altKey&&e.key.toLowerCase()==='i'){e.preventDefault();go('import')}if(e.altKey&&e.key.toLowerCase()==="n"){e.preventDefault();openDrawer('quickNoteDrawer')}if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){e.preventDefault();go("lib");setTimeout(()=>$("q")?.focus(),60)}if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="f"){e.preventDefault();go("lib");setTimeout(()=>{setLegalSearchMode("ref");$("refArticle")?.focus()},70)}if(e.altKey&&e.key.toLowerCase()==="l"){e.preventDefault();go('lib')}if(e.altKey&&e.key.toLowerCase()==="p"){e.preventDefault();go('proc')}if(e.altKey&&e.key.toLowerCase()==="w"){e.preventDefault();go('work')}if(e.key==="Escape"){closeCmd();closeCompare();closeDrawers();closeWizard();$("shortcutsModal")?.classList.remove('on')}});
  window.addEventListener('scroll',readingProgressUpdate,{passive:true});

  $("docs").onclick=e=>{if(e.target.closest("[data-preview],[data-save],[data-compare],[data-open-match]"))return;const d=e.target.closest("[data-open]");if(d)openDoc(d.dataset.open)};
  $("plist").onclick=e=>{const p=e.target.closest("[data-pr]");if(p)openProc(p.dataset.pr)};
  $("run").onclick=analyze;
  if($("expertWizardNav"))$("expertWizardNav").onclick=e=>{const b=e.target.closest("[data-exp-step-go]");if(b)setExpertWizardStep(b.dataset.expStepGo)};
  if($("expPrev"))$("expPrev").onclick=()=>setExpertWizardStep(expertWizardStep-1);
  if($("expNext"))$("expNext").onclick=()=>setExpertWizardStep(expertWizardStep+1);
  renderExpertWizard();
  if($("expAnalyze"))$("expAnalyze").onclick=analyzeExpert;
  if($("expClear"))$("expClear").onclick=()=>{clearExpertForm();setExpertWizardStep(0)};
  renderExpertBriefs();

  $("compareClear").onclick=clearCompare;
  $("compareOpen").onclick=showCompare;
  $("compareClose").onclick=closeCompare;
  $("compareModal").onclick=e=>{if(e.target===$("compareModal"))closeCompare()};
  document.querySelectorAll("[data-preset]").forEach(b=>b.onclick=()=>applyPreset(b.dataset.preset));
  $("updateFilter").onclick=e=>{const b=e.target.closest("[data-year]");if(b)renderUpdates(b.dataset.year)};$("lawHubTabs").onclick=e=>{const b=e.target.closest("[data-lawtab]");if(b)renderLawHubTab(b.dataset.lawtab)};

  $("fw").onclick=()=>{
    const p=Math.max(0,+$("wp").value||0),m=Math.max(0,+$("wm").value||0),rate=.10,total=Math.round(p*rate*m);
    $("fwo").innerHTML=`<div class="fee-line"><span>Giá nước</span><b>${p.toLocaleString("vi-VN")} đ/m³</b></div><div class="fee-line"><span>Khối lượng</span><b>${m.toLocaleString("vi-VN")} m³/tháng</b></div><div class="fee-line"><span>Tỷ lệ đang dùng trong công cụ</span><b>10%</b></div><div class="fee-total">${total.toLocaleString("vi-VN")} đồng/tháng</div>`;
    logActivity("fee","water","Tính phí nước thải sinh hoạt");
  };
  $("fa").onclick=()=>{
    const mo=Math.min(12,Math.max(1,+$("am").value||12)),annual=3000000,total=Math.round(annual*mo/12);
    $("fao").innerHTML=`<div class="fee-line"><span>Mức năm đang dùng trong công cụ</span><b>${annual.toLocaleString("vi-VN")} đ</b></div><div class="fee-line"><span>Số tháng</span><b>${mo}</b></div><div class="fee-total">${total.toLocaleString("vi-VN")} đồng / ${mo} tháng</div>`;
    logActivity("fee","air","Tính phí khí thải");
  };
  document.body.addEventListener("click",e=>{
    const s=e.target.closest("[data-save]");if(s){e.preventDefault();e.stopPropagation();saveDoc(s.dataset.save);if(document.querySelector("#art.page.on"))openDoc(s.dataset.save);return}
    const o=e.target.closest("[data-open]");if(o&&!o.closest("#docs")){openDoc(o.dataset.open);return}
    const st=e.target.closest("[data-step]");if(st){const [pid,si]=st.dataset.step.split(":");const i=+si;const arr=procDone[pid]||[];procDone[pid]=arr.includes(i)?arr.filter(x=>x!==i):[...arr,i].sort((a,b)=>a-b);STORE.set("w3_proc",procDone);openProc(pid);renderProcList();return}
    const pr=e.target.closest("[data-proc-reset]");if(pr){procDone[pr.dataset.procReset]=[];STORE.set("w3_proc",procDone);openProc(pr.dataset.procReset);renderProcList();toast("Đã đặt lại quy trình");return}
    const c=e.target.closest("[data-case]");if(c){showCase(c.dataset.case);return}
    const del=e.target.closest("[data-delcase]");if(del){cases=cases.filter(x=>x.id!==del.dataset.delcase);STORE.set("w3_cases",cases);currentCaseId=null;renderWorkspace();$("caseDetail").className="empty";$("caseDetail").textContent="Đã xóa hồ sơ.";toast("Đã xóa hồ sơ");return}
    const os=e.target.closest("[data-open-proc]");if(os){openProc(os.dataset.openProc);return}
    const oc=e.target.closest("[data-open-case]");if(oc){go("work");setTimeout(()=>showCase(oc.dataset.openCase),0);return}
    const cp=e.target.closest("[data-copy-step]");if(cp){const [pid,si]=cp.dataset.copyStep.split(":");const p=P.find(x=>x.id===pid);const s=p?.st[+si];if(s){navigator.clipboard?.writeText(`${s[0]}\n${s[1]}`).then(()=>toast("Đã sao chép bước")).catch(()=>toast("Không thể sao chép"))}return}
    const sc=e.target.closest("[data-scroll]");if(sc){$(sc.dataset.scroll)?.scrollIntoView({behavior:"smooth",block:"start"});return}
    const tab=e.target.closest("[data-case-tab]");if(tab){document.querySelectorAll("[data-case-tab]").forEach(x=>x.classList.toggle("on",x===tab));document.querySelectorAll("[data-case-panel]").forEach(x=>x.hidden=x.dataset.casePanel!==tab.dataset.caseTab);return}
    const ex=e.target.closest("[data-export-case]");if(ex){const c=cases.find(x=>x.id===ex.dataset.exportCase);if(c)caseExport(c);return}
    const cc=e.target.closest("[data-copy-case]");if(cc){const c=cases.find(x=>x.id===cc.dataset.copyCase);if(c){const txt=`${c.name}\nNhóm ${c.result.group}\nĐTM: ${c.result.dtm?"Cần rà":"Chưa thấy bắt buộc"}\nGPMT: ${c.result.gp?"Xem xét":"Chưa đạt ngưỡng"}\n${c.result.notes.join("\n")}`;navigator.clipboard?.writeText(txt).then(()=>toast("Đã sao chép hồ sơ")).catch(()=>toast("Không thể sao chép"))}return}
    const yr=e.target.closest("[data-year]");if(yr){renderUpdates(yr.dataset.year);return}
    const ebl=e.target.closest("[data-expert-load]");if(ebl){loadExpertBrief(ebl.dataset.expertLoad);return}
    const ebd=e.target.closest("[data-expert-delete]");if(ebd){expertBriefs=expertBriefs.filter(x=>x.id!==ebd.dataset.expertDelete);STORE.set("v10_expert_briefs",expertBriefs);renderExpertBriefs();renderWorkspaceStats();toast("Đã xóa phiếu chuyên gia");return}
    const ctheme=e.target.closest("[data-core-theme]");if(ctheme){coreKbTheme=ctheme.dataset.coreTheme;renderCoreKnowledge($("coreKbQ")?.value||"");return}
    const cform=e.target.closest("[data-core-form]");if(cform){openDoc("vbhn55",`Mẫu số ${cform.dataset.coreForm}`);return}
    const ac=e.target.closest("[data-add-citation]");if(ac){const [doc,article,clause,point]=ac.dataset.addCitation.split("|");addCitationV13(doc,article||null,clause||null,point||null);return}
    const rc=e.target.closest("[data-remove-citation]");if(rc){removeCitationV13(rc.dataset.removeCitation);return}
    const cq=e.target.closest("[data-core-query]");if(cq){coreQueryToLibrary(cq.dataset.coreQuery);return}
    const sex=e.target.closest("[data-search-example]");if(sex){go("lib");setTimeout(()=>{$("q").value=sex.dataset.searchExample;const p=parseLegalQuery(sex.dataset.searchExample);setLegalSearchMode(p.article||p.clause||p.point?"ref":"smart");const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);addLegalSearchHistory($("q").value)},50);return}
    const sh=e.target.closest("[data-search-history]");if(sh){$("q").value=sh.dataset.searchHistory;const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);return}
    const om=e.target.closest("[data-open-match]");if(om){e.preventDefault();e.stopPropagation();openDoc(om.dataset.openMatch,om.dataset.query||"");return}
    const ir=e.target.closest("[data-in-doc-ref]");if(ir){$("inDocQ").value=ir.dataset.inDocRef;runInDocSearch(ir.dataset.inDocRef);return}
    const lb=e.target.closest("[data-law-block]");if(lb){document.querySelectorAll("#legalText .law-block-hit").forEach(x=>x.classList.remove("law-block-hit"));const target=$(`law-block-${lb.dataset.lawBlock}`);if(target){target.classList.add("law-block-hit");target.scrollIntoView({behavior:"smooth",block:"center"})}return}
    const pv=e.target.closest('[data-preview]');if(pv){e.preventDefault();e.stopPropagation();openPreview(pv.dataset.preview);return}
    const pvo=e.target.closest('[data-preview-open]');if(pvo){closeDrawers();openDoc(pvo.dataset.previewOpen);return}
    const wz=e.target.closest('[data-wiz]');if(wz){const p=P.find(x=>x.id===wizardState.pid);if(!p)return;if(wz.dataset.wiz==='prev'){wizardState.index=Math.max(0,wizardState.index-1)}if(wz.dataset.wiz==='next'){wizardState.index=Math.min(p.st.length-1,wizardState.index+1)}if(wz.dataset.wiz==='toggle'){const i=wizardState.index,arr=procDone[p.id]||[];procDone[p.id]=arr.includes(i)?arr.filter(x=>x!==i):[...arr,i].sort((a,b)=>a-b);STORE.set('w3_proc',procDone);renderProcList()}renderWizard();return}
  });
  document.body.addEventListener("change",e=>{
    const c=e.target.closest("[data-compare]");
    if(c){const ok=toggleCompare(c.dataset.compare,c.checked);if(!ok)c.checked=false}
  });
  document.body.addEventListener("input",e=>{
    if(e.target.id==="caseNote"&&currentCaseId){
      const c=cases.find(x=>x.id===currentCaseId);if(c){c.userNote=e.target.value;STORE.set("w3_cases",cases)}
    }
  });

});

window.addEventListener("error",e=>{
  document.documentElement.dataset.runtimeError="1";
  const f=document.querySelector("footer.site .data-fresh");
  if(f&&!f.dataset.err){f.dataset.err="1";f.textContent+=" · ⚠ lỗi runtime";console.error(e.error||e.message)}
});

