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

