function caseNextActions(c){
  const actions=[];
  if(!c?.result)return [{label:"Mở lại sàng lọc để kiểm tra dữ liệu đầu vào.",kind:"go",value:"cls"}];
  if(c.result.group==="Chưa kết luận")actions.push({label:"Bổ sung dữ liệu để xác định nhóm pháp lý trước khi đi tiếp.",kind:"go",value:"cls"});
  if(c.result.dtm===null)actions.push({label:"Tra đối tượng và căn cứ ĐTM; chưa nên kết luận chỉ từ phiếu sàng lọc.",kind:"search",value:"ĐTM đối tượng phân nhóm dự án"});
  else if(c.result.dtm===true)actions.push({label:"Rà căn cứ ĐTM và lộ trình hồ sơ tương ứng.",kind:"search",value:"ĐTM đánh giá tác động môi trường đối tượng"});
  if(c.result.gp===null)actions.push({label:"Xác định đối tượng GPMT và tình trạng giấy phép/hồ sơ môi trường hiện có.",kind:"search",value:"GPMT đối tượng giấy phép môi trường"});
  else if(c.result.gp===true)actions.push({label:"Rà căn cứ GPMT, nguồn thải thực tế và nội dung giấy phép cần kiểm tra.",kind:"search",value:"giấy phép môi trường GPMT nguồn thải"});
  (c.result.notes||[]).slice(0,2).forEach(note=>actions.push({label:String(note),kind:"note",value:""}));
  if(!actions.length)actions.push({label:"Đối chiếu văn bản gốc, nguồn chính thức và các thay đổi pháp luật trước khi dùng kết quả.",kind:"go",value:"upd"});
  return actions.slice(0,4);
}
function caseStatusLabel(c){
  if(!c?.result||c.result.group==="Chưa kết luận")return "Cần bổ sung dữ liệu";
  if(c.result.dtm===null||c.result.gp===null)return "Còn nhánh pháp lý cần xác minh";
  if(c.result.dtm===true||c.result.gp===true)return "Có nội dung cần rà tiếp";
  return "Sẵn sàng đối chiếu căn cứ";
}
function caseActionButton(action){
  if(action.kind==="go")return `<button class="tiny" data-go="${esc(action.value)}" type="button">Mở →</button>`;
  if(action.kind==="search")return `<button class="tiny" data-search-example="${esc(action.value)}" type="button">Tra căn cứ →</button>`;
  return "";
}
function renderWorkspace(){
  if(!$("caseList"))return;
  const q=($("caseQ")?.value||"").trim().toLowerCase();
  const list=cases.filter(c=>!q||(c.name+" "+c.result.group+" "+JSON.stringify(c.input)).toLowerCase().includes(q));
  $("caseList").innerHTML=list.length?list.map(c=>{
    const next=caseNextActions(c)[0];
    return `<button class="case ${currentCaseId===c.id?"on":""}" data-case="${esc(c.id)}" type="button"><b>${esc(c.name)}</b><div class="meta"><span class="tag">${c.result.group==="Chưa kết luận"?"Chưa kết luận":`Nhóm ${esc(c.result.group)}`}</span><span class="tag">${new Date(c.createdAt).toLocaleDateString("vi-VN")}</span></div><small class="case-status">${esc(caseStatusLabel(c))}</small><small class="case-next-preview">Tiếp theo: ${esc(next?.label||"Mở hồ sơ để tiếp tục.")}</small></button>`;
  }).join(""):`<div class="empty">${cases.length?"Không có hồ sơ khớp.":"Chưa có hồ sơ đã lưu."}</div>`;
  $("savedList").innerHTML=saved.length?saved.map(id=>{const d=D.find(x=>x.id===id);return d?`<div class="doc"><div class="docrow"><button class="docmain" data-open="${d.id}" type="button"><b>${d.ttl}</b><div class="meta"><span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span></div></button><button class="mini" data-save="${d.id}" type="button" title="Bỏ lưu">★</button></div></div>`:""}).join(""):`<div class="empty">Chưa lưu văn bản nào.</div>`;
  updStats();renderWorkspaceStats();renderExpertBriefs();renderHomeActivity();renderHomeContinue();renderArticleNotesIndex();renderCommandCenter();
}
function showCase(id){
  const c=cases.find(x=>x.id===id);if(!c)return;
  currentCaseId=id;
  document.querySelectorAll(".case").forEach(x=>x.classList.toggle("on",x.dataset.case===id));
  const next=caseNextActions(c);
  $("caseDetail").className="card";
  $("caseDetail").innerHTML=`<div class="row"><div class="grow"><div class="k">Hồ sơ sàng lọc</div><h3 style="font-size:19px;margin-top:4px">${esc(c.name)}</h3><span class="case-detail-status">${esc(caseStatusLabel(c))}</span></div><button class="btn bs" data-delcase="${c.id}" type="button">Xóa</button></div>
    <div class="case-detail-tabs"><button class="on" data-case-tab="summary" type="button">Tổng quan</button><button data-case-tab="input" type="button">Đầu vào</button><button data-case-tab="note" type="button">Ghi chú</button></div>
    <div data-case-panel="summary">
      <div class="result-grid">
        <div class="result-card"><small>Nhóm pháp lý</small><b>${c.result.group==="Chưa kết luận"?"Chưa kết luận":`Nhóm ${c.result.group}`}</b>${c.result.group==="Chưa kết luận"?"":renderRiskMeter(c.result.group)}</div>
        <div class="result-card"><small>ĐTM</small><b>${c.result.dtm===null?"Cần tra phụ lục":(c.result.dtm?"Cần rà ĐTM":"Chưa thấy bắt buộc")}</b></div>
        <div class="result-card"><small>GPMT</small><b>${c.result.gp===null?"Cần xác định đối tượng":(c.result.gp?"Cần xem xét":"Chưa thấy tín hiệu")}</b></div>
      </div>
      <section class="case-next-box"><div class="section-kicker">Ưu tiên hiện tại</div><h3>Việc nên làm tiếp</h3><ol class="case-next-list">${next.map(a=>`<li><span>${esc(a.label)}</span>${caseActionButton(a)}</li>`).join("")}</ol><div class="case-next-actions"><button class="btn bs" data-go="proc" type="button">Mở lộ trình thủ tục</button><button class="btn bs" data-go="expert" type="button">Rà soát hồ sơ sâu hơn</button></div></section>
      <p style="color:var(--m);font-size:13px">Lưu lúc ${new Date(c.createdAt).toLocaleString("vi-VN")}</p>
      <div class="why"><b>Điểm cần kiểm tra</b><ul>${c.result.notes.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>Không có cảnh báo kỹ thuật từ số liệu.</li>"}</ul></div>
    </div>
    <div data-case-panel="input" hidden><div class="why"><b>Dữ liệu đầu vào</b><ul>${Object.entries(c.input).map(([k,v])=>`<li>${esc(k)}: ${esc(v)}</li>`).join("")}</ul></div></div>
    <div data-case-panel="note" hidden><textarea class="case-notes" id="caseNote" placeholder="Ghi chú cho hồ sơ này…">${esc(c.userNote||"")}</textarea></div>
    <div class="case-actions"><button class="btn bp" data-export-case="${c.id}" type="button">Xuất Markdown</button><button class="btn bs" data-copy-case="${c.id}" type="button">Sao chép tóm tắt</button><button class="btn bs" data-case-to-compliance="${c.id}" type="button">Đưa vào Hồ sơ tuân thủ</button></div>
    <p class="note" style="margin-top:12px">Phiếu này giúp tổ chức dữ liệu và ưu tiên việc cần rà. Các nhãn ĐTM/GPMT ở đây không thay thế việc xác định đối tượng theo văn bản, phụ lục và hồ sơ thực tế.</p>`;
  logActivity("case",id,c.name);
}
let workspaceDataLoad=null;
function loadWorkspaceData(){
  if(window.__ccplmtWorkspaceDataLoaded)return Promise.resolve();
  if(workspaceDataLoad)return workspaceDataLoad;
  workspaceDataLoad=new Promise((resolve,reject)=>{const s=document.createElement("script");s.src="assets/lazy/workspace-data.js";s.onload=resolve;s.onerror=()=>{workspaceDataLoad=null;reject(new Error("workspace data chunk failed"))};document.head.appendChild(s)});
  return workspaceDataLoad;
}
function workspaceDataCall(name,args=[]){return loadWorkspaceData().then(()=>window[name](...args)).catch(e=>{console.error(e);toast("Không thể tải phần quản lý dữ liệu");throw e})}
function workspaceTrashRows(){const v=window.workspaceTrashRowsV8?window.workspaceTrashRowsV8():STORE.get("v15_workspace_trash",[]);return Array.isArray(v)?v:[]}
function workspaceTrashPush(...a){return workspaceDataCall("workspaceTrashPushV8",a)}
function workspaceTrashRestore(id){return workspaceDataCall("workspaceTrashRestoreV8",[id])}
function workspaceTrashClear(){return workspaceDataCall("workspaceTrashClearV8")}
function renderWorkspaceTrash(){return workspaceDataCall("renderWorkspaceTrashV8")}
function exportWorkspace(){return workspaceDataCall("exportWorkspaceV8").catch(()=>{})}
function importWorkspace(file){return workspaceDataCall("importWorkspaceV8",[file]).catch(()=>{})}
function cmdResults(q=""){
  const s=q.trim().toLowerCase();
  const docsR=D.filter(d=>!s||(d.ttl+" "+d.k+" "+plain(d.b)).toLowerCase().includes(s)).slice(0,6).map(d=>({kind:"doc",id:d.id,title:d.ttl,sub:`${d.k} · ${topicName(d.t)}`}));
  const procR=P.filter(p=>!s||(p.ttl+" "+p.st.flat().join(" ")).toLowerCase().includes(s)).slice(0,3).map(p=>({kind:"proc",id:p.id,title:p.ttl,sub:"Quy trình"}));
  const filesR=(typeof importedDocs!=="undefined"?importedDocs:[]).filter(f=>!s||(f.name+" "+(f.note||"")).toLowerCase().includes(s)).slice(0,3).map(f=>({kind:"file",id:f.id,title:f.name,sub:`Tài liệu đã nhập · .${f.ext||"file"}`}));
  const actions=[
    {kind:"diag",id:"export",title:"Xuất thông tin kiểm tra hệ thống",sub:"JSON kỹ thuật · không gồm nội dung hồ sơ, ghi chú hoặc tên tài liệu"}
  ].filter(x=>!s||(x.title+" "+x.sub+" chẩn đoán lỗi diagnostic system").toLowerCase().includes(s));
  const pages=[
    ["lib","Kho văn bản"],["corekb","Văn bản trọng tâm"],["expert","Rà soát hồ sơ"],["proc","Lộ trình thủ tục"],["cls","Sàng lọc dự án"],["fee","Phí & nghĩa vụ"],["term","Thuật ngữ"],["import","Nhập tài liệu"],["work","Hồ sơ tuân thủ"],["memo","Căn cứ đã lưu"],["upd","Cập nhật pháp luật"],["info","Thông tin & chính sách"]
  ].filter(x=>!s||x[1].toLowerCase().includes(s)).slice(0,3).map(x=>({kind:"page",id:x[0],title:x[1],sub:"Chuyển trang"}));
  return [...actions,...docsR,...filesR,...procR,...pages].slice(0,10);
}
function renderCmd(q=""){
  const r=cmdResults(q);
  $("cmdList").innerHTML=r.length?r.map((x,i)=>`<button class="cmd-item ${i===0?"sel":""}" data-cmd="${esc(x.kind)}:${esc(x.id)}" type="button"><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></button>`).join(""):`<div class="empty">Không tìm thấy.</div>`;
}
function openCmd(){$("cmdBg").classList.add("on");$("cmdQ").value="";renderCmd();setTimeout(()=>$("cmdQ").focus(),0)}
function closeCmd(){$("cmdBg").classList.remove("on")}
