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
 const title=citationMemoMetaV13.title||"Căn cứ hồ sơ";
 const lines=[`# ${title}`,"",citationMemoMetaV13.note||"",citationMemoMetaV13.note?"":"",`Xuất: ${new Date().toLocaleString("vi-VN")}`,""];
 citationBasketV13.forEach((x,i)=>{const d=D.find(z=>z.id===x.doc);lines.push(`## ${i+1}. ${x.label}`,`- Văn bản: ${d?d.ttl:x.doc}`,`- Tóm tắt: ${x.text}`,x.note?`- Ghi chú: ${x.note}`:"",x.source?`- Nguồn: ${x.source}`:"","")});
 const blob=new Blob([lines.filter(x=>x!==null).join("\n")],{type:"text/markdown;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Can-cu-phap-ly-moi-truong-can-cu-ho-so.md";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function exportV13DataPack(){
 const payload={schema:"ccplmt-v13",exportedAt:new Date().toISOString(),clauses:CLAUSE_PACK_V13,trails:LEGAL_TRAILS_V13,documents:D.map(d=>({id:d.id,title:d.ttl,type:d.k,topic:d.t,meta:metaOf(d.id)}))};
 const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json;charset=utf-8"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Can-cu-phap-ly-moi-truong-data-pack.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
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
    $("q").placeholder=legalSearchMode==="number"?"Nhập số hiệu: 72/2020/QH14 · 48/2026/NĐ-CP…":legalSearchMode==="ref"?"Nhập hoặc dùng Finder: Điều 39 · khoản 2 Điều 49…":"Nhập từ khóa hoặc nội dung: GPMT khí thải · quan trắc nước thải…";
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
    $("searchCoach").innerHTML='<span class="coach-icon">i</span><div><b>Nhập điều luật, số hiệu hoặc vấn đề cần tra.</b><p>Tra cứu theo số hiệu, điều khoản hoặc chủ đề và xếp kết quả theo mức phù hợp.</p></div>';
    if($("querySummary"))$("querySummary").innerHTML="";
    return;
  }
  const intent=[];
  if(p.number)intent.push(`Số hiệu: <b>${esc(p.number)}</b>`);
  if(p.article)intent.push(`<b>Điều ${esc(p.article)}</b>`);
  if(p.clause)intent.push(`<b>Khoản ${esc(p.clause)}</b>`);
  if(p.point)intent.push(`<b>Điểm ${esc(p.point)}</b>`);
  if(p.intent?.labels?.length)intent.push(...p.intent.labels.map(x=>`<b>${esc(x)}</b>`));
  if(!intent.length)intent.push(`Từ khóa chuyên môn`);
  const exactRef=p.article||p.clause||p.point;
  const conversational=!!p.intent?.question||!!p.intent?.labels?.length;
  const guidance=conversational
    ?"Kết quả dưới đây dùng để xác định căn cứ và nhánh cần kiểm tra, không phải câu trả lời có/không về nghĩa vụ pháp lý. Hãy mở văn bản gốc của kết quả phù hợp trước khi kết luận."
    :(exactRef?"Nếu cần nội dung Khoản/Điểm đầy đủ, hãy mở nguồn chính thức của văn bản phù hợp.":"");
  $("searchCoach").innerHTML=`<span class="coach-icon">${exactRef?"§":conversational?"?":"⌕"}</span><div><b>Phạm vi tra cứu: ${intent.join(" · ")}</b><p>${list.length?`Tìm thấy ${list.length} văn bản phù hợp trong kho tóm tắt/metadata.`:`Chưa thấy căn cứ khớp trong dữ liệu hiện có.`} ${guidance}</p></div>`;
  if($("querySummary"))$("querySummary").innerHTML=`Chế độ: <b>${legalSearchMode==="ref"?"Điều/Khoản/Điểm":legalSearchMode==="number"?"Số hiệu":"Theo nội dung"}</b>`;
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
  $("inDocMatches").innerHTML=hits.length?hits.map(h=>`<button class="in-doc-match" data-law-block="${h.i}" type="button"><b>Đoạn ${h.i+1}</b>${hi(h.text,q)}</button>`).join(""):(q.trim()?`<div class="sourcebox"><b>Không thấy trong tóm tắt của hệ thống.</b><br>Điều này không có nghĩa văn bản gốc không chứa nội dung bạn tìm. Hãy mở nguồn chính thức để tra toàn văn.</div>`:"");
}
