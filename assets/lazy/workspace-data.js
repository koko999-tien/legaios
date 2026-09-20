/* Optional data-management chunk: loaded on first workspace backup/recovery use. */
(function(){
const WORKSPACE_TRASH_KEY="v15_workspace_trash";
function workspaceTrashRowsV8(){const v=STORE.get(WORKSPACE_TRASH_KEY,[]);return Array.isArray(v)?v:[]}
function workspaceTrashPushV8(type,data,label){
  if(data==null)return;const copy=typeof complianceClone==="function"?complianceClone(data):JSON.parse(JSON.stringify(data));
  STORE.set(WORKSPACE_TRASH_KEY,[{id:"trash-"+Date.now()+"-"+Math.random().toString(16).slice(2),type,label:String(label||"Mục đã xóa").slice(0,300),deletedAt:new Date().toISOString(),data:copy},...workspaceTrashRowsV8()].slice(0,30));renderWorkspaceTrashV8();
}
function workspaceTrashRestoreV8(id){
  const rows=workspaceTrashRowsV8(),x=rows.find(v=>v.id===id);if(!x)return;
  if(x.type==="case"&&!cases.some(v=>v.id===x.data.id)){cases.unshift(normalizeImportedCase(x.data));STORE.set("w3_cases",cases)}
  if(x.type==="citation"&&typeof citationBasketV13!=="undefined"&&!citationBasketV13.some(v=>citationIdV13(v)===citationIdV13(x.data))){citationBasketV13.unshift(x.data);STORE.set("v13_citation_basket",citationBasketV13);renderMemoV13()}
  if(x.type==="quick-note"&&typeof syncQuickNote==="function")syncQuickNote(String(x.data||"").slice(0,20000));
  STORE.set(WORKSPACE_TRASH_KEY,rows.filter(v=>v.id!==id));renderWorkspace();renderWorkspaceTrashV8();toast("Đã khôi phục mục đã xóa");
}
function workspaceTrashClearV8(){if(workspaceTrashRowsV8().length&&confirm("Xóa vĩnh viễn toàn bộ mục trong “Đã xóa gần đây”?")){STORE.set(WORKSPACE_TRASH_KEY,[]);renderWorkspaceTrashV8();toast("Đã dọn mục đã xóa")}}
function renderWorkspaceTrashV8(){
  const host=$("workspaceTrash");if(!host)return;const rows=workspaceTrashRowsV8();
  const html=rows.length?'<div class="row" style="justify-content:space-between;align-items:center;margin-top:12px"><b>Đã xóa gần đây</b><button class="tiny" data-trash-clear type="button">Dọn danh sách</button></div><div style="display:grid;gap:6px;margin-top:7px">'+rows.slice(0,8).map(x=>'<div class="row" style="justify-content:space-between;align-items:center;border:1px solid var(--bd);border-radius:7px;padding:7px 8px"><span><b style="display:block;font-size:11px">'+esc(x.label)+'</b><small style="color:var(--m)">'+new Date(x.deletedAt).toLocaleString("vi-VN")+'</small></span><button class="tiny" data-trash-restore="'+esc(x.id)+'" type="button">Khôi phục</button></div>').join("")+'</div>':'<p style="margin:10px 0 0;color:var(--m);font-size:11px">Chưa có mục đã xóa có thể khôi phục.</p>';
  host.replaceChildren(document.createRange().createContextualFragment(html));
}
function workspaceBackupExtrasV8(){return {quickNote:String(typeof quickNote==="undefined"?"":quickNote||"").slice(0,20000),uiPrefs:typeof uiPrefs==="object"&&uiPrefs?uiPrefs:{scale:"normal",density:"comfortable",sidebar:false},readingProgress:typeof readingProgressStore==="function"?readingProgressStore():STORE.get("v14_reading_progress",{}),citationBasket:typeof citationBasketV13!=="undefined"?citationBasketV13:STORE.get("v13_citation_basket",[]),citationMemoMeta:typeof citationMemoMetaV13!=="undefined"?citationMemoMetaV13:STORE.get("v13_citation_meta",{title:"",note:""}),trash:workspaceTrashRowsV8()}}
function exportWorkspaceV8(){
  const data={app:"Căn cứ Pháp lý Môi trường",schema:"ccplmt-workspace-v8",exportedAt:new Date().toISOString(),saved,recent,notes,procDone,cases,expertBriefs,complianceProfiles:complianceBackupRows(),complianceAudit:complianceAuditBackup(),...workspaceBackupExtrasV8()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Can-cu-phap-ly-moi-truong-sao-luu.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function workspaceNormalizeReadingV8(v){const out={};if(!v||typeof v!=="object"||Array.isArray(v))return out;Object.entries(v).slice(0,1000).forEach(([k,x])=>{if(!x||typeof x!=="object")return;const p=Math.max(0,Math.min(100,Number(x.pct)||0)),m=Math.max(p,Math.max(0,Math.min(100,Number(x.maxPct)||0)));out[String(k).slice(0,180)]={pct:p,maxPct:m,section:safeImportedText(x.section||"",140),updatedAt:Number(x.updatedAt)||0}});return out}
function workspaceNormalizeCitationsV8(v){return Array.isArray(v)?v.slice(0,500).filter(x=>x&&x.doc).map(x=>({doc:safeId(x.doc,"doc"),article:safeImportedText(x.article||"",24),clause:safeImportedText(x.clause||"",24),point:safeImportedText(x.point||"",24),label:safeImportedText(x.label||"",500),text:safeImportedText(x.text||"",5000),note:safeImportedText(x.note||"",5000),source:/^https:\/\//i.test(String(x.source||""))?String(x.source).slice(0,2000):"",addedAt:safeImportedText(x.addedAt||"",40)})):[]}
function importWorkspaceV8(file){
  if(!file||file.size>10*1024*1024){toast("File sao lưu vượt giới hạn 10 MB");return}
  const r=new FileReader();r.onload=()=>{try{
    const d=JSON.parse(r.result),obj=v=>v&&typeof v==="object"&&!Array.isArray(v),legacy=["Legal","OS"].join("");
    if(!obj(d)||!["Căn cứ Pháp lý Môi trường",legacy].includes(d.app)||!Array.isArray(d.saved)||!Array.isArray(d.recent)||!obj(d.notes)||!obj(d.procDone)||!Array.isArray(d.cases)||(d.expertBriefs!==undefined&&!Array.isArray(d.expertBriefs))||(d.complianceProfiles!==undefined&&!Array.isArray(d.complianceProfiles))||(d.complianceAudit!==undefined&&!Array.isArray(d.complianceAudit))){toast("Đây không phải bản sao lưu hợp lệ. Dữ liệu hiện tại được giữ nguyên.");return}
    const p=obj(d.uiPrefs)?d.uiPrefs:{},next={saved:d.saved.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)),recent:d.recent.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)),notes:{},procDone:{},cases:d.cases.slice(0,500).map(normalizeImportedCase),expertBriefs:(d.expertBriefs||[]).slice(0,500).map(normalizeExpertBrief),complianceProfiles:(d.complianceProfiles||[]).slice(0,300).map(normalizeComplianceProfile),complianceAudit:(d.complianceAudit||[]).slice(0,500).map(normalizeComplianceAuditEvent)};
    Object.entries(d.notes).slice(0,1000).forEach(([k,v])=>next.notes[safeId(k,"doc")]=safeImportedText(v,50000));Object.entries(d.procDone).slice(0,500).forEach(([k,v])=>next.procDone[safeId(k,"proc")]=Array.isArray(v)?v.filter(x=>Number.isInteger(x)&&x>=0).slice(0,200):[]);
    next.quickNote=d.quickNote!==undefined?safeImportedText(d.quickNote||"",20000):quickNote;next.uiPrefs=obj(d.uiPrefs)?{scale:["small","normal","large"].includes(p.scale)?p.scale:"normal",density:["compact","comfortable"].includes(p.density)?p.density:"comfortable",sidebar:!!p.sidebar}:uiPrefs;
    next.readingProgress=d.readingProgress!==undefined?workspaceNormalizeReadingV8(d.readingProgress):readingProgressStore();next.citationBasket=d.citationBasket!==undefined?workspaceNormalizeCitationsV8(d.citationBasket):citationBasketV13;next.citationMemoMeta=d.citationMemoMeta!==undefined?{title:safeImportedText(d.citationMemoMeta?.title||"",500),note:safeImportedText(d.citationMemoMeta?.note||"",10000)}:citationMemoMetaV13;next.trash=Array.isArray(d.trash)?d.trash.slice(0,30):workspaceTrashRowsV8();
    const extra=next.citationBasket.length+Object.keys(next.readingProgress).length+(next.quickNote?1:0);if(!confirm(`Khôi phục bản sao lưu: ${next.complianceProfiles.length} hồ sơ tuân thủ, ${next.cases.length} hồ sơ sàng lọc, ${next.saved.length} mục đã lưu, ${extra} mục ghi chú/căn cứ/tiến độ. Dữ liệu hiện tại sẽ được thay thế.`)){toast("Đã hủy khôi phục dữ liệu");return}
    const entries=[["w3_saved",next.saved],["w3_recent",next.recent],["w3_notes",next.notes],["w3_proc",next.procDone],["w3_cases",next.cases],["v10_expert_briefs",next.expertBriefs],[COMPLIANCE_KEY,next.complianceProfiles],[COMPLIANCE_AUDIT_KEY,next.complianceAudit],["v8_quick_note",next.quickNote],["v8_ui_prefs",next.uiPrefs],["v14_reading_progress",next.readingProgress],["v13_citation_basket",next.citationBasket],["v13_citation_meta",next.citationMemoMeta],[WORKSPACE_TRASH_KEY,next.trash]];
    if(!STORE.setBatch(entries)){toast("Không thể lưu bản nhập. Dữ liệu hiện tại chưa bị thay thế.");return}
    ({saved,recent,notes,procDone,cases,expertBriefs}=next);complianceProfiles=next.complianceProfiles;complianceAudit=next.complianceAudit;quickNote=next.quickNote;uiPrefs=next.uiPrefs;citationBasketV13=next.citationBasket;citationMemoMetaV13=next.citationMemoMeta;currentComplianceId=complianceProfiles[0]?.id||null;currentCaseId=null;
    if($("caseDetail")){$("caseDetail").className="empty";$("caseDetail").textContent="Chọn hồ sơ để xem chi tiết."}applyUIPrefs();syncQuickNote(quickNote);renderMemoV13();renderWorkspace();renderWorkspaceTrashV8();renderComplianceWorkspace();renderComplianceHome();renderProcList();docs(curTopic(),$("q").value);toast("Đã khôi phục dữ liệu");
  }catch(e){console.error(e);toast("File JSON không hợp lệ")}};r.onerror=()=>toast("Không đọc được file sao lưu. Dữ liệu hiện tại được giữ nguyên.");r.readAsText(file);
}

Object.assign(window,{workspaceTrashRowsV8,workspaceTrashPushV8,workspaceTrashRestoreV8,workspaceTrashClearV8,renderWorkspaceTrashV8,exportWorkspaceV8,importWorkspaceV8});
window.__ccplmtWorkspaceDataLoaded=true;
})();
