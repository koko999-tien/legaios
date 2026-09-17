/* LegalOS V14 — workspace/case management and command palette runtime. */
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
