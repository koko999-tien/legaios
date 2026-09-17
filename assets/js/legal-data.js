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
