const LEGAL_PACK_KEY="legalos_v6_pack";
function docYear(d){const m=metaOf(d.id);const s=m.issued||m.eff||d.ttl;const x=String(s).match(/(20\d{2})/);return x?x[1]:""}
function renderYearFilter(){if(!$('yearF'))return;const years=[...new Set(D.map(docYear).filter(Boolean))].sort((a,b)=>b.localeCompare(a));$('yearF').innerHTML='<option value="all">Tất cả năm</option>'+years.map(y=>`<option value="${y}">${y}</option>`).join('')}
function isConsolidated(d){return d.k==="Văn bản hợp nhất"||/VBHN/.test(d.ttl)}
function renderDataVault(){if(!$('vaultStats'))return;const verified=D.filter(d=>metaOf(d.id).src).length,con=D.filter(isConsolidated).length,y26=D.filter(d=>docYear(d)==='2026').length;$('vaultStats').innerHTML=`<div class="vault-stat"><b>${D.length}</b><span>Tổng văn bản</span></div><div class="vault-stat"><b>${T.length}</b><span>Lĩnh vực</span></div><div class="vault-stat"><b>${verified}</b><span>Có nguồn chính thức</span></div><div class="vault-stat"><b>${con}</b><span>Văn bản hợp nhất</span></div>`;$('vaultByTopic').innerHTML=T.map(t=>{const n=D.filter(d=>d.t===t[0]).length;return `<div class="vault-topic"><b><span>${t[1]}</span><span>${n}</span></b><small>${t[2]}</small></div>`}).join('')}
function exportCatalogCSV(){const rows=[["id","loai","so_hieu_ten","linh_vuc","ban_hanh","hieu_luc","quan_he","nguon"]];D.forEach(d=>{const m=metaOf(d.id);rows.push([d.id,d.k,plain(d.ttl),topicName(d.t),m.issued||"",m.eff||"",m.rel||"",m.src||""])});const escCsv=v=>'"'+String(v).replace(/"/g,'""')+'"';const csv='\uFEFF'+rows.map(r=>r.map(escCsv).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Can-cu-phap-ly-moi-truong-catalog.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function builtInPack(){const docs=D.filter(d=>!d._user).map(d=>({id:d.id,t:d.t,k:d.k,ttl:d.ttl,b:d.b,meta:metaOf(d.id)}));return {schema:1,app:'Căn cứ Pháp lý Môi trường',exportedAt:new Date().toISOString(),docs}}
function exportLegalPack(){const blob=new Blob([JSON.stringify(builtInPack(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Can-cu-phap-ly-moi-truong-legal-pack.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
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
  return {verified:!!p,reviewed:st.summary==="reviewed",upcoming,label:upcoming?`Hiệu lực ${m.eff}`:(p?`Đối chiếu ${p.checked}`:(m.src?"Có nguồn":"Chưa đối chiếu"))};
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
function summaryAssist(d){if(/class=\"long-summary\"/.test(d.b))return "";const m=metaOf(d.id);return `<div class="long-summary" style="margin-top:12px"><section class="summary-block"><h3>Cách dùng trong hồ sơ thực tế</h3><p>${contextGuide(d)}</p></section><section class="summary-block"><h3>Trước khi áp dụng</h3><p>${m.eff?`Hệ thống đang ghi nhận hiệu lực từ <b>${m.eff}</b>. `:""}Kiểm tra lại toàn văn, lịch sử sửa đổi/bãi bỏ và điều khoản chuyển tiếp ở nguồn chính thức. Tóm tắt dùng để tra nhanh, không thay nội dung văn bản.</p></section></div>`}
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
  if(tab==='upcoming')renderUpcoming();if(tab==='impact'){renderImpact();if(typeof renderComplianceRadar==='function')renderComplianceRadar('complianceRadarHub')}if(tab==='watch')workspaceDataCall('renderLawWatchV16');if(tab==='core')renderCoreMap('coreMapHub');if(tab==='verify')renderVerifiedAudit();if(tab==='sources')renderOfficialSources();if(tab==='data')renderDataVault();renderUpdateStats();
}
function is2026Doc(d){const m=metaOf(d.id);return (m.eff||'').endsWith('2026')||/2026/.test(d.ttl)}
