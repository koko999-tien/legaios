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
const OFFICIAL_CANDIDATE_KEY="v15_official_candidates",OFFICIAL_CANDIDATE_DOMAINS=["vbpl.vn","vanban.chinhphu.vn","congbao.chinhphu.vn","chinhphu.vn","vbpl.moj.gov.vn"];
function officialCandidateUrlV15(v){try{const u=new URL(String(v||"")),h=u.hostname.toLowerCase().replace(/^www\./,"");if(u.protocol!=="https:"||!OFFICIAL_CANDIDATE_DOMAINS.some(d=>h===d||h.endsWith("."+d)))return"";u.hash="";return u.toString()}catch{return""}}
function officialCandidateNormalizeV15(x){if(!x||typeof x!=="object")return null;const url=officialCandidateUrlV15(x.url);if(!url)return null;return{id:safeImportedText(x.id||"candidate-"+Date.now()+"-"+Math.random().toString(16).slice(2),180),title:safeImportedText(x.title||url,500),url,host:safeImportedText(x.host||new URL(url).hostname.replace(/^www\./,""),180),query:safeImportedText(x.query||"",500),status:["review","active","done"].includes(x.status)?x.status:"review",profileId:safeImportedText(x.profileId||"",180),note:safeImportedText(x.note||"",5000),addedAt:safeImportedText(x.addedAt||new Date().toISOString(),40),updatedAt:safeImportedText(x.updatedAt||new Date().toISOString(),40),reviewedAt:safeImportedText(x.reviewedAt||"",40)}}
function officialCandidateRowsV15(){const v=STORE.get(OFFICIAL_CANDIDATE_KEY,[]);return Array.isArray(v)?v.map(officialCandidateNormalizeV15).filter(Boolean).slice(0,200):[]}
function officialCandidateSaveV15(r){STORE.set(OFFICIAL_CANDIDATE_KEY,r.slice(0,200))}
function officialCandidateAddV15(raw){const x=officialCandidateNormalizeV15(raw);if(!x){toast("Nguồn web không hợp lệ");return false}const r=officialCandidateRowsV15();if(r.some(v=>v.url===x.url)){toast("Nguồn này đã có trong hàng rà soát");return false}x.profileId=typeof currentComplianceId==="string"?currentComplianceId:"";r.unshift(x);officialCandidateSaveV15(r);renderLawWatchV16();toast("Đã đưa nguồn web vào hàng rà soát");return true}
function officialCandidatePatchV15(id,p){const r=officialCandidateRowsV15(),x=r.find(v=>v.id===id);if(!x)return;Object.assign(x,p,{updatedAt:new Date().toISOString()});if(p.status==="done"&&!x.reviewedAt)x.reviewedAt=new Date().toISOString();if(p.status&&p.status!=="done")x.reviewedAt="";officialCandidateSaveV15(r)}
function officialCandidateRemoveV15(id){const r=officialCandidateRowsV15(),x=r.find(v=>v.id===id);if(x&&confirm("Bỏ nguồn web này khỏi hàng rà soát?")){officialCandidateSaveV15(r.filter(v=>v.id!==id));renderLawWatchV16();toast("Đã bỏ nguồn web khỏi hàng rà soát")}}
function officialCandidateHtmlV15(){const r=officialCandidateRowsV15().sort((a,b)=>(a.status==="done")-(b.status==="done")||String(b.addedAt).localeCompare(String(a.addedAt)));if(!r.length)return'<section class="candidate-review-section"><div class="candidate-review-head"><div><div class="section-kicker">SEARCH V4</div><h3>Nguồn web chờ rà soát</h3></div><small>Chưa có nguồn web nào được đưa vào hàng rà soát.</small></div></section>';const p=Array.isArray(complianceProfiles)?complianceProfiles:[];return'<section class="candidate-review-section"><div class="candidate-review-head"><div><div class="section-kicker">SEARCH V4</div><h3>Nguồn web chờ rà soát</h3></div><span class="candidate-review-badge">'+r.length+' nguồn · chưa kiểm định</span></div><p class="candidate-review-note">Liên kết phát hiện trên miền chính thức; chưa được nhập vào kho pháp luật hay xác nhận hiệu lực/phạm vi áp dụng.</p>'+r.map(x=>{const po='<option value="">Không gắn hồ sơ</option>'+p.map(v=>'<option value="'+esc(v.id)+'" '+(v.id===x.profileId?"selected":"")+'>'+esc(v.name||"Hồ sơ")+'</option>').join("");return'<article class="candidate-review-item"><div class="candidate-review-top"><div><div class="k">'+esc(x.host)+' · KẾT QUẢ WEB</div><h4>'+esc(x.title)+'</h4><small>'+esc(x.query?"Truy vấn: "+x.query:"Nguồn từ Search V4")+'</small></div><button class="tiny" data-official-candidate-remove="'+esc(x.id)+'" type="button">Bỏ</button></div><div class="g2 candidate-review-fields"><label class="field"><span>Trạng thái</span><select data-official-candidate-status="'+esc(x.id)+'"><option value="review" '+(x.status==="review"?"selected":"")+'>Cần rà</option><option value="active" '+(x.status==="active"?"selected":"")+'>Đang rà</option><option value="done" '+(x.status==="done"?"selected":"")+'>Đã rà thủ công</option></select></label><label class="field"><span>Hồ sơ tuân thủ</span><select data-official-candidate-profile="'+esc(x.id)+'">'+po+'</select></label><label class="field candidate-review-note-field"><span>Ghi chú rà soát</span><input data-official-candidate-note="'+esc(x.id)+'" value="'+esc(x.note)+'" placeholder="Hiệu lực, sửa đổi, điểm cần đối chiếu…"></label></div><div class="row candidate-review-actions"><a class="btn bs" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">Mở nguồn chính thức</a><span class="candidate-review-warning">Chưa nhập vào dữ liệu đã kiểm định</span></div></article>'}).join("")+'</section>'}
const LAW_WATCH_KEY="v16_law_watchlist";
function lawWatchNormalizeV16(x){
  if(!x||typeof x!=="object")return null;const docId=safeId(x.docId||x.id||"","doc");if(!D.some(d=>d.id===docId))return null;
  const status=["review","active","done"].includes(x.status)?x.status:"review";
  return {id:safeImportedText(x.id||("watch-"+docId),180),docId,status,nextReview:/^\d{4}-\d{2}-\d{2}$/.test(String(x.nextReview||""))?String(x.nextReview):"",profileId:safeImportedText(x.profileId||"",180),note:safeImportedText(x.note||"",5000),addedAt:safeImportedText(x.addedAt||new Date().toISOString(),40),updatedAt:safeImportedText(x.updatedAt||new Date().toISOString(),40),reviewedAt:safeImportedText(x.reviewedAt||"",40)};
}
function lawWatchRowsV16(){const v=STORE.get(LAW_WATCH_KEY,[]);return Array.isArray(v)?v.map(lawWatchNormalizeV16).filter(Boolean).slice(0,200):[]}
function lawWatchSaveV16(rows){STORE.set(LAW_WATCH_KEY,rows.slice(0,200))}
function lawWatchAddV16(docId){
  const d=D.find(x=>x.id===docId);if(!d)return;
  const rows=lawWatchRowsV16(),old=rows.find(x=>x.docId===docId);
  if(old){toast("Văn bản đã có trong danh sách theo dõi");renderLawWatchV16();return}
  rows.unshift(lawWatchNormalizeV16({id:"watch-"+Date.now(),docId,status:"review",profileId:typeof currentComplianceId==="string"?currentComplianceId:"",addedAt:new Date().toISOString()}));
  lawWatchSaveV16(rows);renderLawWatchV16();toast("Đã thêm vào danh sách theo dõi");
}
function lawWatchPatchV16(id,patch){
  const rows=lawWatchRowsV16(),x=rows.find(v=>v.id===id);if(!x)return;Object.assign(x,patch,{updatedAt:new Date().toISOString()});
  if(patch.status==="done"&&!x.reviewedAt)x.reviewedAt=new Date().toISOString();if(patch.status&&patch.status!=="done")x.reviewedAt="";
  lawWatchSaveV16(rows);
}
function lawWatchRemoveV16(id){const rows=lawWatchRowsV16(),x=rows.find(v=>v.id===id);if(!x)return;if(confirm("Bỏ văn bản này khỏi danh sách theo dõi?")){lawWatchSaveV16(rows.filter(v=>v.id!==id));renderLawWatchV16();toast("Đã bỏ theo dõi")}}
function lawWatchStatusLabelV16(v){return ({review:"Cần rà",active:"Đang rà",done:"Đã rà"})[v]||"Cần rà"}
function renderLawWatchV16(){
  const host=$("lawWatchList");if(!host)return;const rows=lawWatchRowsV16().sort((a,b)=>(a.status==="done")-(b.status==="done")||String(a.nextReview||"9999").localeCompare(String(b.nextReview||"9999"))),candidates=officialCandidateRowsV15();
  const tab=document.querySelector('[data-lawtab="watch"]');if(tab){const n=rows.length+candidates.length;tab.textContent="Đang theo dõi"+(n?" ("+n+")":"")}
  const profiles=Array.isArray(complianceProfiles)?complianceProfiles:[];
  const html=rows.map(x=>{const d=D.find(v=>v.id===x.docId),m=metaOf(x.docId),audit=professorVerified(x.docId);if(!d)return "";
    const po='<option value="">Không gắn hồ sơ</option>'+profiles.map(p=>'<option value="'+esc(p.id)+'" '+(p.id===x.profileId?"selected":"")+'>'+esc(p.name||"Hồ sơ")+'</option>').join("");
    return '<article class="card" data-law-watch-row="'+esc(x.id)+'" style="margin-bottom:10px"><div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="k">'+esc(d.k)+' · '+esc(topicName(d.t))+'</div><h3 style="margin:3px 0 5px">'+esc(d.ttl)+'</h3><small style="color:var(--m)">'+(audit?'Nguồn đối chiếu '+esc(audit.checked):m.src?'Có nguồn chính thức':'Chưa có nguồn đối chiếu')+'</small></div><button class="tiny" data-law-watch-remove="'+esc(x.id)+'" type="button">Bỏ theo dõi</button></div>'+
    '<div class="g2" style="margin-top:10px"><label class="field"><span>Trạng thái rà soát</span><select data-law-watch-status="'+esc(x.id)+'"><option value="review" '+(x.status==="review"?"selected":"")+'>Cần rà</option><option value="active" '+(x.status==="active"?"selected":"")+'>Đang rà</option><option value="done" '+(x.status==="done"?"selected":"")+'>Đã rà</option></select></label><label class="field"><span>Ngày xem lại nội bộ</span><input data-law-watch-date="'+esc(x.id)+'" type="date" value="'+esc(x.nextReview)+'"></label><label class="field"><span>Hồ sơ tuân thủ</span><select data-law-watch-profile="'+esc(x.id)+'">'+po+'</select></label><label class="field"><span>Ghi chú</span><input data-law-watch-note="'+esc(x.id)+'" value="'+esc(x.note)+'" placeholder="Điểm cần kiểm tra khi rà lại"></label></div>'+
    '<div class="row" style="margin-top:10px"><button class="btn bs" data-open="'+esc(x.docId)+'" type="button">Mở văn bản</button><button class="btn bs" data-obligation-from-doc="'+esc(x.docId)+'" type="button">Đưa sang Sổ nghĩa vụ</button><span style="color:var(--m);font-size:11px">'+esc(lawWatchStatusLabelV16(x.status))+(x.reviewedAt?' · rà '+new Date(x.reviewedAt).toLocaleDateString("vi-VN"):'')+'</span></div></article>';
  }).join("");
  const local=html||'<div class="empty"><b>Chưa có văn bản trong kho đang theo dõi.</b><br><br>Mở một văn bản và chọn “Theo dõi” để đưa vào hàng rà soát.</div>';
  host.replaceChildren(document.createRange().createContextualFragment(officialCandidateHtmlV15()+'<section class="local-law-watch-section"><div class="candidate-review-head"><div><div class="section-kicker">KHO NỘI BỘ</div><h3>Văn bản trong kho đang theo dõi</h3></div><span class="candidate-review-badge">'+rows.length+' văn bản</span></div>'+local+'</section>'));
}
document.addEventListener("change",e=>{
  const s=e.target.closest("[data-law-watch-status]");if(s){lawWatchPatchV16(s.dataset.lawWatchStatus,{status:s.value});renderLawWatchV16();return}
  const d=e.target.closest("[data-law-watch-date]");if(d){lawWatchPatchV16(d.dataset.lawWatchDate,{nextReview:d.value});return}
  const p=e.target.closest("[data-law-watch-profile]");if(p){lawWatchPatchV16(p.dataset.lawWatchProfile,{profileId:p.value});return}
  const n=e.target.closest("[data-law-watch-note]");if(n){lawWatchPatchV16(n.dataset.lawWatchNote,{note:n.value});return}
  const cs=e.target.closest("[data-official-candidate-status]");if(cs){officialCandidatePatchV15(cs.dataset.officialCandidateStatus,{status:cs.value});renderLawWatchV16();return}
  const cp=e.target.closest("[data-official-candidate-profile]");if(cp){officialCandidatePatchV15(cp.dataset.officialCandidateProfile,{profileId:cp.value});return}
  const cn=e.target.closest("[data-official-candidate-note]");if(cn)officialCandidatePatchV15(cn.dataset.officialCandidateNote,{note:cn.value});
});
document.addEventListener("click",e=>{const r=e.target.closest("[data-law-watch-remove]");if(r){e.preventDefault();lawWatchRemoveV16(r.dataset.lawWatchRemove);return}const c=e.target.closest("[data-official-candidate-remove]");if(c){e.preventDefault();officialCandidateRemoveV15(c.dataset.officialCandidateRemove)}});

function workspaceBackupExtrasV8(){return {lawWatch:lawWatchRowsV16(),officialCandidates:officialCandidateRowsV15(),quickNote:String(typeof quickNote==="undefined"?"":quickNote||"").slice(0,20000),uiPrefs:typeof uiPrefs==="object"&&uiPrefs?uiPrefs:{scale:"normal",density:"comfortable",sidebar:false},readingProgress:typeof readingProgressStore==="function"?readingProgressStore():STORE.get("v14_reading_progress",{}),citationBasket:typeof citationBasketV13!=="undefined"?citationBasketV13:STORE.get("v13_citation_basket",[]),citationMemoMeta:typeof citationMemoMetaV13!=="undefined"?citationMemoMetaV13:STORE.get("v13_citation_meta",{title:"",note:""}),trash:workspaceTrashRowsV8()}}
function exportWorkspaceV8(){
  const data={app:"Căn cứ Pháp lý Môi trường",schema:"ccplmt-workspace-v8",exportedAt:new Date().toISOString(),saved,recent,notes,procDone,cases,expertBriefs,complianceProfiles:complianceBackupRows(),complianceAudit:complianceAuditBackup(),...workspaceBackupExtrasV8()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="Can-cu-phap-ly-moi-truong-sao-luu.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);
}
function workspaceNormalizeReadingV8(v){const out={};if(!v||typeof v!=="object"||Array.isArray(v))return out;Object.entries(v).slice(0,1000).forEach(([k,x])=>{if(!x||typeof x!=="object")return;const p=Math.max(0,Math.min(100,Number(x.pct)||0)),m=Math.max(p,Math.max(0,Math.min(100,Number(x.maxPct)||0)));out[String(k).slice(0,180)]={pct:p,maxPct:m,section:safeImportedText(x.section||"",140),updatedAt:Number(x.updatedAt)||0}});return out}
function workspaceNormalizeCitationsV8(v){return Array.isArray(v)?v.slice(0,500).filter(x=>x&&x.doc).map(x=>({doc:safeId(x.doc,"doc"),article:safeImportedText(x.article||"",24),clause:safeImportedText(x.clause||"",24),point:safeImportedText(x.point||"",24),label:safeImportedText(x.label||"",500),text:safeImportedText(x.text||"",5000),note:safeImportedText(x.note||"",5000),source:/^https:\/\//i.test(String(x.source||""))?String(x.source).slice(0,2000):"",addedAt:safeImportedText(x.addedAt||"",40)})):[]}
function workspaceRestoreCountsV9(next){
  const profiles=Array.isArray(next.complianceProfiles)?next.complianceProfiles:[];
  return {
    profiles:profiles.length,
    permits:profiles.reduce((n,p)=>n+(Array.isArray(p.permits)?p.permits.length:0),0),
    obligations:profiles.reduce((n,p)=>n+(Array.isArray(p.obligations)?p.obligations.length:0),0),
    deadlines:profiles.reduce((n,p)=>n+(Array.isArray(p.deadlines)?p.deadlines.length:0),0),
    cases:Array.isArray(next.cases)?next.cases.length:0,
    saved:Array.isArray(next.saved)?next.saved.length:0,
    citations:Array.isArray(next.citationBasket)?next.citationBasket.length:0,
    lawWatch:Array.isArray(next.lawWatch)?next.lawWatch.length:0,
    reading:next.readingProgress&&typeof next.readingProgress==="object"?Object.keys(next.readingProgress).length:0,
    officialCandidates:Array.isArray(next.officialCandidates)?next.officialCandidates.length:0
  };
}
function workspaceConfirmRestoreV9(next){
  const counts=workspaceRestoreCountsV9(next);
  if(typeof HTMLDialogElement==="undefined"){
    return Promise.resolve(confirm(`Khôi phục bản sao lưu: ${counts.profiles} hồ sơ tuân thủ, ${counts.permits} giấy phép, ${counts.obligations} nghĩa vụ, ${counts.cases} hồ sơ sàng lọc. Dữ liệu hiện tại sẽ được thay thế.`));
  }
  return new Promise(resolve=>{
    document.getElementById("workspaceRestorePreviewV9")?.remove();
    const dlg=document.createElement("dialog");dlg.id="workspaceRestorePreviewV9";dlg.className="workspace-restore-preview-v9";
    const card=document.createElement("div");card.className="workspace-restore-card-v9";
    const kicker=document.createElement("div");kicker.className="section-kicker";kicker.textContent="XEM TRƯỚC KHÔI PHỤC";
    const h=document.createElement("h3");h.textContent="Dữ liệu nào sẽ thay thế workspace hiện tại?";
    const p=document.createElement("p");p.className="workspace-restore-note-v9";p.textContent="Hãy kiểm tra số lượng trước khi tiếp tục. PDF/Word trong IndexedDB không nằm trong JSON này và vẫn phải nhập lại riêng trên thiết bị mới.";
    const grid=document.createElement("div");grid.className="workspace-restore-grid-v9";
    [
      ["Hồ sơ tuân thủ",counts.profiles],["Sổ giấy phép",counts.permits],["Sổ nghĩa vụ",counts.obligations],
      ["Deadline thủ công",counts.deadlines],["Hồ sơ sàng lọc",counts.cases],["Văn bản đã lưu",counts.saved],
      ["Căn cứ hồ sơ",counts.citations],["Văn bản theo dõi",counts.lawWatch],["Nguồn web chờ rà",counts.officialCandidates],["Tiến độ đọc",counts.reading]
    ].forEach(([label,value])=>{const item=document.createElement("div"),b=document.createElement("b"),span=document.createElement("span");b.textContent=String(value);span.textContent=label;item.append(b,span);grid.append(item)});
    const warn=document.createElement("div");warn.className="workspace-restore-warning-v9";warn.textContent="Khôi phục sẽ thay thế dữ liệu workspace hiện có trên tên miền này. Nên xuất một bản sao hiện tại trước nếu còn dữ liệu cần giữ.";
    const actions=document.createElement("div");actions.className="workspace-restore-actions-v9";
    const backup=document.createElement("button");backup.className="btn bs";backup.type="button";backup.textContent="Xuất bản hiện tại trước";backup.onclick=()=>exportWorkspaceV8();
    const cancel=document.createElement("button");cancel.className="btn bs";cancel.type="button";cancel.textContent="Hủy";
    const ok=document.createElement("button");ok.className="btn bp";ok.type="button";ok.textContent="Khôi phục dữ liệu";
    actions.append(backup,cancel,ok);card.append(kicker,h,p,grid,warn,actions);dlg.append(card);document.body.append(dlg);
    let done=false;const finish=v=>{if(done)return;done=true;dlg.close();dlg.remove();resolve(v)};
    cancel.onclick=()=>finish(false);ok.onclick=()=>finish(true);dlg.addEventListener("cancel",e=>{e.preventDefault();finish(false)});dlg.addEventListener("click",e=>{if(e.target===dlg)finish(false)});
    dlg.showModal();
  });
}

function importWorkspaceV8(file){
  if(!file||file.size>10*1024*1024){toast("File sao lưu vượt giới hạn 10 MB");return}
  const r=new FileReader();r.onload=async()=>{try{
    const d=JSON.parse(r.result),obj=v=>v&&typeof v==="object"&&!Array.isArray(v),legacy=["Legal","OS"].join("");
    if(!obj(d)||!["Căn cứ Pháp lý Môi trường",legacy].includes(d.app)||!Array.isArray(d.saved)||!Array.isArray(d.recent)||!obj(d.notes)||!obj(d.procDone)||!Array.isArray(d.cases)||(d.expertBriefs!==undefined&&!Array.isArray(d.expertBriefs))||(d.complianceProfiles!==undefined&&!Array.isArray(d.complianceProfiles))||(d.complianceAudit!==undefined&&!Array.isArray(d.complianceAudit))){toast("Đây không phải bản sao lưu hợp lệ. Dữ liệu hiện tại được giữ nguyên.");return}
    const p=obj(d.uiPrefs)?d.uiPrefs:{},next={saved:d.saved.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)),recent:d.recent.map(x=>safeId(x,"doc")).filter(id=>D.some(v=>v.id===id)),notes:{},procDone:{},cases:d.cases.slice(0,500).map(normalizeImportedCase),expertBriefs:(d.expertBriefs||[]).slice(0,500).map(normalizeExpertBrief),complianceProfiles:(d.complianceProfiles||[]).slice(0,300).map(normalizeComplianceProfile),complianceAudit:(d.complianceAudit||[]).slice(0,500).map(normalizeComplianceAuditEvent)};
    Object.entries(d.notes).slice(0,1000).forEach(([k,v])=>next.notes[safeId(k,"doc")]=safeImportedText(v,50000));Object.entries(d.procDone).slice(0,500).forEach(([k,v])=>next.procDone[safeId(k,"proc")]=Array.isArray(v)?v.filter(x=>Number.isInteger(x)&&x>=0).slice(0,200):[]);
    next.lawWatch=Array.isArray(d.lawWatch)?d.lawWatch.map(lawWatchNormalizeV16).filter(Boolean).slice(0,200):lawWatchRowsV16();next.officialCandidates=Array.isArray(d.officialCandidates)?d.officialCandidates.map(officialCandidateNormalizeV15).filter(Boolean).slice(0,200):officialCandidateRowsV15();next.quickNote=d.quickNote!==undefined?safeImportedText(d.quickNote||"",20000):quickNote;next.uiPrefs=obj(d.uiPrefs)?{scale:["small","normal","large"].includes(p.scale)?p.scale:"normal",density:["compact","comfortable"].includes(p.density)?p.density:"comfortable",sidebar:!!p.sidebar}:uiPrefs;
    next.readingProgress=d.readingProgress!==undefined?workspaceNormalizeReadingV8(d.readingProgress):readingProgressStore();next.citationBasket=d.citationBasket!==undefined?workspaceNormalizeCitationsV8(d.citationBasket):citationBasketV13;next.citationMemoMeta=d.citationMemoMeta!==undefined?{title:safeImportedText(d.citationMemoMeta?.title||"",500),note:safeImportedText(d.citationMemoMeta?.note||"",10000)}:citationMemoMetaV13;next.trash=Array.isArray(d.trash)?d.trash.slice(0,30):workspaceTrashRowsV8();
    const extra=next.citationBasket.length+Object.keys(next.readingProgress).length+(next.quickNote?1:0);if(!(await workspaceConfirmRestoreV9(next))){toast("Đã hủy khôi phục dữ liệu");return}
    const entries=[["w3_saved",next.saved],["w3_recent",next.recent],["w3_notes",next.notes],["w3_proc",next.procDone],["w3_cases",next.cases],["v10_expert_briefs",next.expertBriefs],[COMPLIANCE_KEY,next.complianceProfiles],[COMPLIANCE_AUDIT_KEY,next.complianceAudit],["v8_quick_note",next.quickNote],["v8_ui_prefs",next.uiPrefs],["v14_reading_progress",next.readingProgress],["v13_citation_basket",next.citationBasket],["v13_citation_meta",next.citationMemoMeta],[WORKSPACE_TRASH_KEY,next.trash],[LAW_WATCH_KEY,next.lawWatch],[OFFICIAL_CANDIDATE_KEY,next.officialCandidates]];
    if(!STORE.setBatch(entries)){toast("Không thể lưu bản nhập. Dữ liệu hiện tại chưa bị thay thế.");return}
    ({saved,recent,notes,procDone,cases,expertBriefs}=next);complianceProfiles=next.complianceProfiles;complianceAudit=next.complianceAudit;quickNote=next.quickNote;uiPrefs=next.uiPrefs;citationBasketV13=next.citationBasket;citationMemoMetaV13=next.citationMemoMeta;currentComplianceId=complianceProfiles[0]?.id||null;currentCaseId=null;
    if($("caseDetail")){$("caseDetail").className="empty";$("caseDetail").textContent="Chọn hồ sơ để xem chi tiết."}renderLawWatchV16();applyUIPrefs();syncQuickNote(quickNote);renderMemoV13();renderWorkspace();renderWorkspaceTrashV8();renderComplianceWorkspace();renderComplianceHome();renderProcList();docs(curTopic(),$("q").value);toast("Đã khôi phục dữ liệu");
  }catch(e){console.error(e);toast("File JSON không hợp lệ")}};r.onerror=()=>toast("Không đọc được file sao lưu. Dữ liệu hiện tại được giữ nguyên.");r.readAsText(file);
}

Object.assign(window,{workspaceTrashRowsV8,workspaceTrashPushV8,workspaceTrashRestoreV8,workspaceTrashClearV8,renderWorkspaceTrashV8,exportWorkspaceV8,importWorkspaceV8,workspaceRestoreCountsV9,workspaceConfirmRestoreV9,lawWatchAddV16,renderLawWatchV16,officialCandidateRowsV15,officialCandidateAddV15,officialCandidatePatchV15});
window.__ccplmtWorkspaceDataLoaded=true;
})();
