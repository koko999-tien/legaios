# Legal data audit — release candidate

Audit date: **20/09/2026**

This file records source/metadata verification for the core environmental-law chain. “Verified” here means the document identity, issue/effective date, amendment relationship and official-source link were checked; it does **not** mean every article/summary in the product has received a legal opinion.

| Record | Metadata checked | Official source |
| --- | --- | --- |
| Luật 72/2020/QH14 | 17/11/2020; hiệu lực 01/01/2022; hiện hết hiệu lực một phần | https://vanban.chinhphu.vn/?docid=202613&pageid=27160 |
| NĐ 08/2022/NĐ-CP | 10/01/2022; hiện hết hiệu lực một phần | https://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=168754 |
| NĐ 05/2025/NĐ-CP | 06/01/2025; sửa NĐ 08/2022; hiện hết hiệu lực một phần | https://vanban.chinhphu.vn/?classid=1&docid=212284&pageid=27160 |
| Luật 146/2025/QH15 | 11/12/2025; hiệu lực 01/01/2026; sửa 15 luật NN&MT | https://vanban.chinhphu.vn/?classid=1&docid=216543&pageid=27160&typegroupid=3 |
| NĐ 48/2026/NĐ-CP | 29/01/2026; hiệu lực 29/01/2026; tiếp tục sửa NĐ 08/2022 sau NĐ 05/2025 | https://vanban.chinhphu.vn/?docid=216867&pageid=27160&typegroupid=4 |
| TT 02/2022/TT-BTNMT | 10/01/2022; hiệu lực 10/01/2022; áp dụng cùng chuỗi sửa đổi / VBHN 55 | https://congbao.chinhphu.vn/van-ban/thong-tu-so-02-2022-tt-btnmt-36691.htm |
| TT 09/2026/TT-BNNMT | 29/01/2026; hiệu lực 29/01/2026; sửa TT 02/2022 sau các sửa đổi 2025 | https://vanban.chinhphu.vn/?docid=216920&pageid=27160&typegroupid=6 |
| NQ 66.19/2026/NQ-CP | 18/05/2026; hiệu lực 18/05/2026; cắt giảm/phân quyền/đơn giản hóa TTHC và điều kiện kinh doanh | https://congbao.chinhphu.vn/van-ban/nghi-quyet-so-6619-2026-nq-cp-469586.htm |
| NĐ 110/2026/NĐ-CP | 01/04/2026; hiệu lực 25/05/2026; EPR | https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-110-2026-nd-cp-469301.htm |
| TT 24/2026/TT-BNNMT | 25/05/2026; hiệu lực 25/05/2026; hướng dẫn NĐ 110/2026 | https://chinhphu.vn/?classid=1&docid=218478&orggroupid=4&pageid=27160 |

The CI release gate additionally checks every record in `CORE_IDS`, including consolidated documents and the KNK/ozone branch, against its existing audited source record.


## CI freshness behavior

The release gate compares each audited `checked` date with the actual UTC calendar date of the CI run, so an audit naturally becomes stale after 90 days. For reproducible local checks only, `LEGAL_DATA_AUDIT_AS_OF=YYYY-MM-DD` can override that baseline explicitly.
