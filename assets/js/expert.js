/* LegalOS V14 — expert dossier review, completeness analysis and saved expert briefs. */
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
function expertSituation(d,a){
  const positives=[
    ["nước thải",d.water],["khí thải / bụi",d.air],["chất thải / CTNH",d.waste],
    ["khai thác / sử dụng nước",d.waterUse],["đất / rừng",d.land],
    ["đa dạng sinh học",d.bio],["KNK / năng lượng",d.climate],["ồn / rung / cộng đồng",d.community]
  ].filter(([,v])=>v==="yes").map(([label])=>label);
  const unknown=[
    ["yếu tố nhạy cảm",d.sensitive],["nước thải",d.water],["khí thải / bụi",d.air],["chất thải / CTNH",d.waste],
    ["khai thác / sử dụng nước",d.waterUse],["đất / rừng",d.land],["đa dạng sinh học",d.bio],
    ["KNK / năng lượng",d.climate],["ồn / rung / cộng đồng",d.community]
  ].filter(([,v])=>v==="unknown").map(([label])=>label);
  const questions=[];
  if(!d.phase)questions.push("Dự án/cơ sở đang ở giai đoạn chuẩn bị, thi công, vận hành, thay đổi hay đóng cửa?");
  if(!d.sector)questions.push("Hoạt động chính thuộc lĩnh vực nào?");
  if(!d.location)questions.push("Địa điểm cụ thể ở đâu và có nằm trong KCN/lưu vực/khu vực nhạy cảm nào không?");
  if(!d.scale)questions.push("Quy mô chính là bao nhiêu: công suất, diện tích, chiều dài tuyến hoặc thông số tương đương?");
  if(d.sensitive==="unknown")questions.push("Khu vực có yếu tố nhạy cảm về môi trường, dân cư, đất/rừng hoặc bảo tồn không?");
  if(d.water==="unknown")questions.push("Có phát sinh nước thải hoặc nhu cầu thoát/xả nước không?");
  if(d.air==="unknown")questions.push("Có nguồn khí thải, bụi hoặc công đoạn phát sinh khí cần kiểm soát không?");
  if(d.waste==="unknown")questions.push("Có chất thải nguy hại hoặc dòng chất thải cần quản lý riêng không?");
  if(d.waterUse==="unknown")questions.push("Có khai thác, sử dụng nước hoặc hồ sơ đấu nối/nguồn cấp riêng không?");
  const next=[];
  if(questions.length)next.push(`Trả lời trước ${Math.min(3,questions.length)} câu hỏi còn thiếu để thu hẹp nhánh pháp lý.`);
  if(a.docsNeeded.length)next.push(`Ưu tiên bổ sung: ${a.docsNeeded[0]}.`);
  if(a.refs.length)next.push("Mở các văn bản được gợi ý và kiểm tra nguồn chính thức, hiệu lực, sửa đổi và phụ lục liên quan.");
  if(a.branches.length)next.push("Sau khi đủ dữ liệu nền, mở Lộ trình thủ tục để chuyển các nhánh cần rà thành checklist thực hiện.");
  if(!next.length)next.push("Đối chiếu lại văn bản gốc và tài liệu chứng minh trước khi dùng kết quả cho hồ sơ thực tế.");
  const headline=a.score<45
    ?"Chưa đủ dữ liệu để thu hẹp tình huống"
    :questions.length
      ?"Đã nhận diện được bối cảnh chính, nhưng vẫn còn dữ liệu cần xác minh"
      :"Dữ liệu nền tương đối đầy đủ để chuyển sang đối chiếu căn cứ";
  const context=[phaseLabel(d.phase),sectorLabel(d.sector),d.location||"",d.scale||""].filter(x=>x&&x!=="Chưa xác định");
  return {headline,context,positives,unknown,questions:questions.slice(0,5),next:next.slice(0,4)};
}
function renderExpertResult(d,a){
  if(!$("expOut"))return;
  const scoreClass=a.score>=75?"ok":a.score>=45?"warn":"bad";
  const refs=a.refs.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,10);
  const situation=expertSituation(d,a);
  $("expOut").innerHTML=`<div class="expert-result-head"><div><div class="section-kicker">Phiếu rà soát</div><h2>${esc(d.name||"Hồ sơ chưa đặt tên")}</h2><p>${phaseLabel(d.phase)} · ${sectorLabel(d.sector)}${d.location?` · ${esc(d.location)}`:""}</p></div><div class="expert-score ${scoreClass}"><b>${a.score}%</b><span>độ đầy đủ thông tin</span></div></div>
    <div class="expert-scorebar"><span style="width:${a.score}%"></span></div>
    <section class="expert-situation">
      <div class="expert-situation-main">
        <div class="section-kicker">LegalOS đang hiểu tình huống</div>
        <h3>${esc(situation.headline)}</h3>
        <p>${situation.context.length?esc(situation.context.join(" · ")):"Chưa đủ thông tin nền để mô tả dự án/cơ sở."}</p>
      </div>
      <div class="expert-situation-signals">
        ${situation.positives.length?`<div><b>Đã khai báo có</b><span>${situation.positives.map(esc).join(" · ")}</span></div>`:""}
        ${situation.unknown.length?`<div><b>Còn chưa rõ</b><span>${situation.unknown.slice(0,5).map(esc).join(" · ")}${situation.unknown.length>5?"…":""}</span></div>`:""}
      </div>
    </section>
    <div class="expert-result-grid">
      <section class="expert-result-card"><h3>Nội dung cần kiểm tra</h3>${a.branches.length?a.branches.map(x=>`<div class="expert-branch"><b>${x[0]}</b><p>${x[1]}</p></div>`).join(""):`<p class="muted">Chưa đủ dữ liệu để nhận diện nhánh cụ thể.</p>`}</section>
      <section class="expert-result-card"><h3>Câu hỏi cần trả lời tiếp</h3>${situation.questions.length?`<ol class="expert-question-list">${situation.questions.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`:`<p class="ok-text">Các câu hỏi nền chính đã được trả lời.</p>`}<h3>Tài liệu nên bổ sung</h3>${a.docsNeeded.length?`<ul>${a.docsNeeded.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p class="ok-text">Không thấy thiếu nhóm tài liệu ưu tiên theo biểu mẫu hiện tại.</p>`}</section>
    </div>
    <section class="expert-result-card expert-next-plan"><div class="section-kicker">Ưu tiên tiếp theo</div><h3>Việc nên làm tiếp</h3><ol>${situation.next.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></section>
    <section class="expert-result-card"><h3>Văn bản nên xem tiếp</h3><div class="expert-ref-list">${refs.length?refs.map(x=>`<button data-open="${x.id}" type="button"><b>${x.ttl}</b><small>${x.k} · ${topicName(x.t)}</small></button>`).join(""):`<p class="muted">Chưa có gợi ý văn bản cụ thể từ dữ liệu hiện tại.</p>`}</div></section>
    <div class="expert-next"><button class="btn bp" id="expSaveBrief" type="button">Lưu phiếu</button><button class="btn bs" data-go="proc" type="button">Mở Lộ trình thủ tục</button><button class="btn bs" data-go="work" type="button">Mở Hồ sơ công việc</button><button class="btn bs" data-go="lib" type="button">Tra Kho văn bản</button><button class="btn bs" data-go="import" type="button">Bổ sung PDF/Word</button></div>
    <p class="note" style="margin-top:12px"><b>Giới hạn:</b> “độ đầy đủ thông tin” chỉ đo mức hoàn thiện dữ liệu đầu vào. Các nhánh trên là danh sách cần kiểm tra, không phải kết luận rằng dự án chắc chắn có hoặc không có một nghĩa vụ pháp lý.</p>`;
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
