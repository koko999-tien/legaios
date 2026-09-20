/* Căn cứ Pháp lý Môi trường — workspace/case management and command palette runtime. */
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
function workspaceBackupExtras(){
  const imported=typeof importedDocs!=="undefined"?importedDocs:[];
  return {
    quickNote:String(typeof quickNote==="undefined"?"":quickNote||"").slice(0,20000),
    uiPrefs:typeof uiPrefs==="object"&&uiPrefs?uiPrefs:{scale:"normal",density:"comfortable",sidebar:false},
    readingProgress:typeof readingProgressStore==="function"?readingProgressStore():STORE.get("v14_reading_progress",{}),
    citationBasket:typeof citationBasketV13!=="undefined"?citationBasketV13:STORE.get("v13_citation_basket",[]),
    citationMemoMeta:typeof citationMemoMetaV13!=="undefined"?citationMemoMetaV13:STORE.get("v13_citation_meta",{title:"",note:""}),
    libraryPrefs:{view:typeof libraryView==="undefined"?"list":libraryView,density:typeof libraryDensity==="undefined"?"compact":libraryDensity,assist:!!(typeof libraryAssistOpen!=="undefined"&&libraryAssistOpen),savedOnly:!!(typeof savedOnlyMode!=="undefined"&&savedOnlyMode)},
    searchPrefs:{mode:typeof legalSearchMode==="undefined"?"smart":legalSearchMode,history:typeof legalSearchHistory==="undefined"?[]:legalSearchHistory},
    activity:STORE.get("w4_activity",[]),
    importedFileRefs:imported.slice(0,500).map(function(x){return {id:String(x.id||"").slice(0,180),name:String(x.name||"").slice(0,300),ext:String(x.ext||"").slice(0,20),size:Number(x.size)||0,category:String(x.category||"other").slice(0,40),importedAt:String(x.importedAt||"").slice(0,40)}})
  };
}
function exportWorkspace(){
  const extras=workspaceBackupExtras();
  const data={app:"Căn cứ Pháp lý Môi trường",schema:"ccplmt-workspace-v8",exportedAt:new Date().toISOString(),saved,recent,notes,procDone,cases,expertBriefs,complianceProfiles:complianceBackupRows(),complianceAudit:complianceAuditBackup(),...extras};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Can-cu-phap-ly-moi-truong-sao-luu.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function workspaceNormalizeReading(v){
  const out=Object.create(null);if(!v||typeof v!=="object"||Array.isArray(v))return out;
  Object.entries(v).slice(0,1000).forEach(function([k,row]){
    if(!row||typeof row!=="object"||Array.isArray(row))return;
    const key=String(k||"").slice(0,180);if(!key)return;
    const pct=Math.max(0,Math.min(100,Number(row.pct)||0)),maxPct=Math.max(pct,Math.max(0,Math.min(100,Number(row.maxPct)||0)));
    out[key]={pct:Math.round(pct*10)/10,maxPct:Math.round(maxPct*10)/10,section:safeImportedText(row.section||"",140),updatedAt:Number(row.updatedAt)||0};
  });return out;
}
function workspaceNormalizeCitations(v){
  if(!Array.isArray(v))return [];
  return v.slice(0,500).map(function(x){
    if(!x||typeof x!=="object"||!x.doc)return null;
    const src=String(x.source||"");
    return {doc:safeId(x.doc,"doc"),article:safeImportedText(x.article||"",24),clause:safeImportedText(x.clause||"",24),point:safeImportedText(x.point||"",24),label:safeImportedText(x.label||"",500),text:safeImportedText(x.text||"",5000),note:safeImportedText(x.note||"",5000),source:/^https:\/\//i.test(src)?src.slice(0,2000):"",addedAt:safeImportedText(x.addedAt||"",40)};
  }).filter(Boolean);
}
function workspaceNormalizeImportedRefs(v){
  if(!Array.isArray(v))return [];
  return v.slice(0,500).map(function(x){return x&&typeof x==="object"?{id:safeImportedText(x.id||"",180),name:safeImportedText(x.name||"",300),ext:safeImportedText(x.ext||"",20),size:Math.max(0,Number(x.size)||0),category:safeImportedText(x.category||"other",40),importedAt:safeImportedText(x.importedAt||"",40)}:null}).filter(function(x){return x&&x.id});
}
function importWorkspace(file){
  if(!file||file.size>10*1024*1024){toast('File sao lưu vượt giới hạn 10 MB');return}
  const r=new FileReader();
  r.onload=()=>{try{
    const d=JSON.parse(r.result);
    const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
    const legacyApp=['Legal','OS'].join('');
    if(!object(d)||!["Căn cứ Pháp lý Môi trường",legacyApp].includes(d.app)||!Array.isArray(d.saved)||!Array.isArray(d.recent)||!object(d.notes)||!object(d.procDone)||!Array.isArray(d.cases)||(d.expertBriefs!==undefined&&!Array.isArray(d.expertBriefs))||(d.complianceProfiles!==undefined&&!Array.isArray(d.complianceProfiles))||(d.complianceAudit!==undefined&&!Array.isArray(d.complianceAudit))){toast('Đây không phải bản sao lưu hợp lệ. Dữ liệu hiện tại được giữ nguyên.');return}
    const prefs=object(d.uiPrefs)?d.uiPrefs:{},library=object(d.libraryPrefs)?d.libraryPrefs:{},search=object(d.searchPrefs)?d.searchPrefs:{};
    const next={
      saved:d.saved.map(x=>safeId(x,'doc')).filter(id=>D.some(v=>v.id===id)),
      recent:d.recent.map(x=>safeId(x,'doc')).filter(id=>D.some(v=>v.id===id)),
      notes:Object.create(null),procDone:Object.create(null),
      cases:d.cases.slice(0,500).map(normalizeImportedCase),
      expertBriefs:(d.expertBriefs||[]).slice(0,500).map(normalizeExpertBrief),
      complianceProfiles:(d.complianceProfiles||[]).slice(0,300).map(normalizeComplianceProfile),
      complianceAudit:(d.complianceAudit||[]).slice(0,500).map(normalizeComplianceAuditEvent),
      quickNote:safeImportedText(d.quickNote||"",20000),
      uiPrefs:{scale:["small","normal","large"].includes(prefs.scale)?prefs.scale:"normal",density:["compact","comfortable"].includes(prefs.density)?prefs.density:"comfortable",sidebar:!!prefs.sidebar},
      readingProgress:workspaceNormalizeReading(d.readingProgress),
      citationBasket:workspaceNormalizeCitations(d.citationBasket),
      citationMemoMeta:{title:safeImportedText(d.citationMemoMeta&&d.citationMemoMeta.title||"",500),note:safeImportedText(d.citationMemoMeta&&d.citationMemoMeta.note||"",10000)},
      libraryPrefs:{view:["list","grid"].includes(library.view)?library.view:"list",density:["compact","detail"].includes(library.density)?library.density:"compact",assist:!!library.assist,savedOnly:!!library.savedOnly},
      searchPrefs:{mode:["smart","ref","number"].includes(search.mode)?search.mode:"smart",history:Array.isArray(search.history)?search.history.slice(0,8).map(x=>safeImportedText(x,300)).filter(Boolean):[]},
      activity:Array.isArray(d.activity)?d.activity.slice(0,10).filter(x=>x&&typeof x==="object").map(x=>({type:safeImportedText(x.type||"",30),id:safeImportedText(x.id||"",180),label:safeImportedText(x.label||"",500),at:safeImportedText(x.at||"",40)})):[],
      importedFileRefs:workspaceNormalizeImportedRefs(d.importedFileRefs)
    };
    Object.entries(d.notes).slice(0,1000).forEach(([k,v])=>{next.notes[safeId(k,'doc')]=safeImportedText(v,50000)});
    Object.entries(d.procDone).slice(0,500).forEach(([k,v])=>{next.procDone[safeId(k,'proc')]=Array.isArray(v)?v.filter(x=>Number.isInteger(x)&&x>=0).slice(0,200):[]});
    const extraCount=next.citationBasket.length+Object.keys(next.readingProgress).length+(next.quickNote?1:0);
    const fileWarning=next.importedFileRefs.length?\` Bản sao lưu có tham chiếu \${next.importedFileRefs.length} tài liệu; nội dung file PDF/Word phải nhập lại trên thiết bị mới.\`:"";
    if(!confirm(\`Khôi phục bản sao lưu: \${next.complianceProfiles.length} hồ sơ tuân thủ, \${next.cases.length} hồ sơ sàng lọc, \${next.saved.length} mục đã lưu, \${extraCount} mục ghi chú/căn cứ/tiến độ. Dữ liệu hiện tại sẽ được thay thế.\${fileWarning}\`)){toast('Đã hủy khôi phục dữ liệu');return}
    const entries=[
      ['w3_saved',next.saved],['w3_recent',next.recent],['w3_notes',next.notes],['w3_proc',next.procDone],['w3_cases',next.cases],['v10_expert_briefs',next.expertBriefs],
      [COMPLIANCE_KEY,next.complianceProfiles],[COMPLIANCE_AUDIT_KEY,next.complianceAudit],['v8_quick_note',next.quickNote],['v8_ui_prefs',next.uiPrefs],
      ['v14_reading_progress',next.readingProgress],['v13_citation_basket',next.citationBasket],['v13_citation_meta',next.citationMemoMeta],
      ['v8_library_view',next.libraryPrefs.view],['v13_library_density',next.libraryPrefs.density],['v13_library_assist',next.libraryPrefs.assist],['v8_saved_only',next.libraryPrefs.savedOnly],
      ['v11_search_mode',next.searchPrefs.mode],['v11_search_history',next.searchPrefs.history],['w4_activity',next.activity],['v15_import_manifest',next.importedFileRefs]
    ];
    if(!STORE.setBatch(entries)){toast('Không thể lưu bản nhập. Dữ liệu hiện tại chưa bị thay thế.');return}
    ({saved,recent,notes,procDone,cases,expertBriefs}=next);complianceProfiles=next.complianceProfiles;complianceAudit=next.complianceAudit;
    quickNote=next.quickNote;uiPrefs=next.uiPrefs;libraryView=next.libraryPrefs.view;libraryDensity=next.libraryPrefs.density;libraryAssistOpen=next.libraryPrefs.assist;savedOnlyMode=next.libraryPrefs.savedOnly;legalSearchMode=next.searchPrefs.mode;legalSearchHistory=next.searchPrefs.history;
    if(typeof citationBasketV13!=="undefined")citationBasketV13=next.citationBasket;if(typeof citationMemoMetaV13!=="undefined")citationMemoMetaV13=next.citationMemoMeta;
    currentComplianceId=complianceProfiles[0]?.id||null;currentCaseId=null;
    if($('caseDetail')){$('caseDetail').className='empty';$('caseDetail').textContent='Chọn hồ sơ để xem chi tiết.'}
    applyUIPrefs();syncQuickNote(quickNote);setLegalSearchMode(legalSearchMode);renderLegalSearchHistory();renderMemoV13();renderWorkspace();renderComplianceWorkspace();renderComplianceHome();renderProcList();docs(curTopic(),$("q").value);
    toast(next.importedFileRefs.length?"Đã khôi phục dữ liệu · cần nhập lại file gốc":"Đã khôi phục dữ liệu");
  }catch(e){console.error(e);toast("File JSON không hợp lệ")}};
  r.onerror=()=>toast('Không đọc được file sao lưu. Dữ liệu hiện tại được giữ nguyên.');
  r.readAsText(file);
}
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
