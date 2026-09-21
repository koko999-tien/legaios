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
    const expanded=!!needle||rows.some(x=>active===x[0])||g.id==="env";
    return `<details class="topic-filter-group" ${expanded?"open":""}>
      <summary class="topic-filter-group-head"><b>${g.label}</b><span>${rows.reduce((n,x)=>n+libraryTopicCount(x[0]),0)}</span><i aria-hidden="true">⌄</i></summary>
      <div class="topic-filter-group-body">${rows.map(x=>`<button class="chip ${active===x[0]?"on":""}" data-t="${x[0]}" type="button"><span>${x[1]}</span><small>${libraryTopicCount(x[0])}</small></button>`).join("")}</div>
    </details>`;
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
function legalSourceName(url=""){
  if(/vanban\.chinhphu\.vn/i.test(url))return "Cổng văn bản Chính phủ";
  if(/(?:^|\.)vbpl(?:\.moj\.gov)?\.vn/i.test((()=>{try{return new URL(url).hostname}catch{return ""}})()))return "CSDL quốc gia về VBPL";
  return url?"Nguồn chính thức":"Chưa gắn nguồn";
}
function openDoc(id,focusQuery=""){
  const x=D.find(i=>i.id===id);if(!x)return;currentArticleDocId=id;addRecent(id);logActivity("doc",id,x.ttl);const m=metaOf(id);const rel=D.filter(i=>i.t===x.t&&i.id!==x.id).slice(0,5);
  const legalBody=x.b+renderLegalTrailV13(id)+deepGuideFor(id)+coreArticleHtml(id)+renderClausePackV13(id);
  const refs=[...new Set([...extractLegalRefs(legalBody),...coreRefsForDoc(id)])];
  const sourceName=legalSourceName(m.src||"");
  $("abody").innerHTML=`<div class="art-layout"><div class="art-content">
    <nav class="doc-breadcrumb" aria-label="Đường dẫn"><button data-go="lib" type="button">Tra cứu pháp luật</button><span>/</span><span>Chi tiết văn bản</span></nav>
    <div class="legal-badge-row"><span class="legal-badge"><strong>${x.k}</strong></span><span class="legal-badge">${topicName(x.t)}</span>${m.issued?`<span class="legal-badge"><strong>Ban hành:</strong> ${m.issued}</span>`:''}${m.eff?`<span class="legal-badge"><strong>Ngày hiệu lực:</strong> ${m.eff}</span>`:''}${m.temp?'<span class="legal-badge" style="background:var(--wb);color:var(--w)"><strong>Cơ chế có thời hạn</strong></span>':''}${professorVerified(id)?`<span class="legal-badge prof-verified"><strong>✓ Đã kiểm chứng ${professorVerified(id).checked}</strong></span>`:''}<span class="role-badge ${lawRole(x)}">${roleLabel(lawRole(x))}</span></div>
    <h1>${x.ttl}</h1>
    <section class="doc-record" aria-label="Hồ sơ văn bản">
      <div class="doc-record-head"><div><span class="k">Hồ sơ văn bản</span><b>Thông tin định vị trước khi đọc</b></div><span>Rà soát dữ liệu 10/09/2026</span></div>
      <dl>
        <div><dt>Loại văn bản</dt><dd>${esc(x.k)}</dd></div>
        <div><dt>Lĩnh vực</dt><dd>${esc(topicName(x.t))}</dd></div>
        <div><dt>Ngày ban hành</dt><dd>${esc(m.issued||"Chưa có dữ liệu")}</dd></div>
        <div><dt>Ngày hiệu lực (metadata)</dt><dd>${esc(m.eff||"Chưa có dữ liệu")}</dd></div>
        <div><dt>Nguồn</dt><dd>${m.src?`<a class="official" href="${m.src}" target="_blank" rel="noopener">${esc(sourceName)} ↗</a>`:"Chưa gắn nguồn"}</dd></div>
        <div><dt>Tình trạng dữ liệu</dt><dd>${professorVerified(id)?"Đã đối chiếu nguồn":m.src?"Có liên kết nguồn":"Cần bổ sung nguồn"}</dd></div>
        <div class="wide"><dt>Quan hệ / ghi chú pháp lý</dt><dd>${esc(m.rel||"Chưa có dữ liệu quan hệ văn bản")}</dd></div>
      </dl>
      <p>Thông tin trên là metadata phục vụ tra cứu. Không dùng riêng bảng này để kết luận văn bản đang còn hay hết hiệu lực.</p>
    </section>
    <nav class="doc-section-nav" aria-label="Điều hướng trong văn bản"><button data-scroll="legalText" type="button">Nội dung</button><button data-scroll="sourceSec" type="button">Nguồn & quan hệ</button><button data-scroll="noteSec" type="button">Ghi chú</button><button data-scroll="relatedSec" type="button">Liên quan</button></nav>
    <div class="data-coverage"><span class="coverage-pill">Nội dung đang xem: tóm tắt của hệ thống${deepGuideFor(id)?` + chuyên đề sâu`:""}${coreArticlesForDoc(id).length?` + ${coreArticlesForDoc(id).length} Điều lập chỉ mục`:""}</span>${m.src?'<span class="coverage-pill ok">✓ Đã gắn nguồn chính thức</span>':'<span class="coverage-pill">⚠ Chưa gắn nguồn chính thức</span>'}${refs.length?`<span class="coverage-pill ok">${refs.length} tham chiếu được lập chỉ mục</span>`:''}</div>
    <div class="artbar"><button class="btn bs" data-save="${x.id}" type="button">${saved.includes(x.id)?"★ Đã lưu":"☆ Lưu"}</button><button class="btn bs" id="copyArt" type="button">Sao chép</button><button class="btn bs" id="printArt" type="button">In / PDF</button><button class="btn bs" id="addCompareArt" type="button">So sánh</button><button class="btn bs" id="addCitationArt" type="button">+ Căn cứ hồ sơ</button><button class="btn bs" data-obligation-from-doc="${x.id}" type="button">+ Sổ nghĩa vụ</button><button class="btn bs" id="copyCite" type="button">Sao chép trích dẫn</button><button class="btn bs feedback-doc-btn" data-feedback-doc="${x.id}" type="button">Báo lỗi dữ liệu</button><div class="read-tools"><button id="readMinus" type="button" title="Giảm chữ">A−</button><button id="readPlus" type="button" title="Tăng chữ">A+</button><button id="readFocus" type="button" title="Tập trung đọc">Focus</button></div>${m.src?`<a class="official" href="${m.src}" target="_blank" rel="noopener">Mở văn bản gốc · nguồn chính thức ↗</a>`:''}</div>
    <section id="sourceSec" class="doc-source-section">
      ${m.rel?`<div class="legal-tip"><span>§</span><div><b>Quan hệ pháp lý:</b> ${m.rel}</div></div>`:''}
      ${professorVerified(id)?`<div class="sourcebox"><b>Kiểm chứng chuyên gia:</b> ${professorVerified(id).note}<br><a class="official" href="${professorVerified(id).source}" target="_blank" rel="noopener">Mở nguồn đã đối chiếu ↗</a></div>`:''}
      <div class="sourcebox"><b>Cách đọc loại văn bản này:</b> ${roleNote(x)}</div>
    </section>

    <div class="in-doc-finder">
      <div class="in-doc-find-row"><input id="inDocQ" autocomplete="off" placeholder="Tìm trong tóm tắt: Điều 39, khoản 2, CTNH, vận hành thử…"><button class="btn bp" id="inDocFind" type="button">Tìm trong văn bản</button></div>
      <div id="inDocStatus" class="in-doc-status"></div>
      <div id="articleRefIndex" class="article-ref-index"></div>
      <div id="inDocMatches" class="in-doc-matches"></div>
    </div>

    <div id="legalText">${prepareLegalHtml(legalBody)}</div>
    <div class="sourcebox"><b>Quy tắc dùng dữ liệu:</b> Hệ thống chỉ tóm lược và gắn quan hệ văn bản. Nếu bạn cần một Khoản/Điểm cụ thể mà phần trên không chứa, hãy mở nguồn chính thức để tra toàn văn trước khi kết luận.</div>
    <h2 id="noteSec">Ghi chú của tôi</h2><textarea class="in" id="artNote" placeholder="Ghi chú cho văn bản này…">${esc(notes[x.id]||"")}</textarea>
    <h2 id="relatedSec">Văn bản liên quan cùng lĩnh vực</h2><div class="related">${rel.length?rel.map(r=>`<button class="doc" data-open="${r.id}" type="button"><b>${r.ttl}</b><div class="meta"><span class="tag">${r.k}</span></div></button>`).join(""):'<div class="empty">Chưa có mục liên quan khác.</div>'}</div>
  </div><aside class="art-side"><div class="art-toc"><div class="k">Đi nhanh</div><button data-scroll="legalText" type="button">Nội dung tóm lược</button><button data-scroll="sourceSec" type="button">Nguồn & quan hệ</button><button data-scroll="noteSec" type="button">Ghi chú</button><button data-scroll="relatedSec" type="button">Liên quan</button></div></aside></div>`;

  go("art");
  renderInDocRefs(legalBody);
  $("copyArt").onclick=async()=>{try{await navigator.clipboard.writeText(x.ttl+"\n\n"+plain(legalBody)+(m.src?"\n\nNguồn: "+m.src:""));toast("Đã sao chép")}catch{toast("Trình duyệt không cho phép sao chép")}};
  $("printArt").onclick=()=>window.print();
  $("copyCite").onclick=async()=>{const c=`${x.ttl}${m.issued?` · Ban hành ${m.issued}`:""}${m.eff?` · Hiệu lực ${m.eff}`:""}${m.src?` · ${m.src}`:""}`;try{await navigator.clipboard.writeText(c);toast("Đã sao chép trích dẫn")}catch{toast("Không thể sao chép")}};
  $("addCompareArt").onclick=()=>{if(!compareSelected.includes(id)){toggleCompare(id,true);toast("Đã thêm vào so sánh")}else toast("Văn bản này đã được chọn")};
  $("addCitationArt").onclick=()=>addCitationV13(id);
  $("artNote").oninput=()=>{notes[x.id]=$("artNote").value;STORE.set("w3_notes",notes);renderWorkspaceStats();renderArticleNotesIndex()};
  $("readMinus").onclick=()=>{document.body.classList.remove("read-large");document.body.classList.toggle("read-small");requestAnimationFrame(readingProgressUpdate);};
  $("readPlus").onclick=()=>{document.body.classList.remove("read-small");document.body.classList.toggle("read-large");requestAnimationFrame(readingProgressUpdate);};
  $("readFocus").onclick=()=>{document.body.classList.toggle("read-focus");$("readFocus").classList.toggle("on",document.body.classList.contains("read-focus"));requestAnimationFrame(readingProgressUpdate);};
  $("inDocFind").onclick=()=>runInDocSearch($("inDocQ").value);
  $("inDocQ").onkeydown=e=>{if(e.key==="Enter")runInDocSearch($("inDocQ").value)};
  if(focusQuery){$("inDocQ").value=focusQuery;runInDocSearch(focusQuery);setTimeout(()=>$("inDocQ")?.scrollIntoView({behavior:"smooth",block:"center"}),120)}
  setTimeout(()=>{readingProgressUpdate();setTimeout(readingProgressUpdate,180)},0);
}
