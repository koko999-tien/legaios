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

