/* Căn cứ Pháp lý Môi trường — Permit Register UI and workflow. */
const PERMIT_TYPES=[
  ["gpmt","Giấy phép môi trường (GPMT)"],
  ["water","Giấy phép / chấp thuận về tài nguyên nước"],
  ["waste","Giấy phép / hồ sơ về chất thải"],
  ["resource","Giấy phép tài nguyên / khoáng sản liên quan"],
  ["construction","Giấy phép / chấp thuận công trình liên quan"],
  ["other","Giấy phép / quyết định khác"]
];
function permitTypeLabel(v){const row=PERMIT_TYPES.find(function(x){return x[0]===v});return row?row[1]:"Giấy phép / quyết định khác"}
function permitStatusLabel(v){return ({unknown:"Chưa xác định",active:"Đang theo dõi",pending:"Đang làm thủ tục",replaced:"Đã được thay thế",closed:"Đã kết thúc"})[v]||"Chưa xác định"}
function permitFileChecklist(selected){
  selected=Array.isArray(selected)?selected:[];
  if(typeof importedDocs==="undefined"||!importedDocs.length)return '<div class="obligation-no-evidence">Chưa có tài liệu nhập. Permit Register chỉ lưu tham chiếu; file gốc vẫn nằm trong kho tài liệu trên thiết bị này.</div>';
  return importedDocs.slice(0,80).map(function(f){
    const checked=selected.some(function(x){return x.id===f.id});
    return '<label class="obligation-evidence-choice"><input type="checkbox" data-permit-file-id="'+esc(f.id)+'" data-permit-file-name="'+esc(f.name)+'" '+(checked?"checked":"")+'><span><b>'+esc(f.name)+'</b><small>.'+esc(f.ext||"file")+' · '+esc(importCategoryName(f.category))+'</small></span></label>';
  }).join("");
}
function permitObligationChecklist(p,selected){
  selected=Array.isArray(selected)?selected:[];
  if(!p.obligations.length)return '<div class="obligation-no-evidence">Chưa có mục trong Sổ nghĩa vụ. Có thể lưu giấy phép trước rồi tạo nghĩa vụ từ giấy phép.</div>';
  return p.obligations.slice(0,100).map(function(o){
    return '<label class="obligation-evidence-choice"><input type="checkbox" data-permit-obligation-id="'+esc(o.id)+'" '+(selected.includes(o.id)?"checked":"")+'><span><b>'+esc(o.title)+'</b><small>'+esc(complianceObligationStatusLabel(o.status))+'</small></span></label>';
  }).join("");
}
function permitRegisterHtml(p){
  const rows=p.permits||[];
  return '<section class="compliance-section permit-register"><div class="compliance-section-head"><div><div class="section-kicker">Permit Register</div><h3>Giấy phép · quyết định · mốc rà soát</h3></div><div class="obligation-register-actions"><span>'+rows.length+' hồ sơ</span><button class="tiny" data-permit-new type="button">+ Thêm giấy phép</button></div></div><p class="micro-note">Trạng thái và mốc thời gian do người dùng quản lý. Hệ thống không tự kết luận giấy phép còn hiệu lực hay đã hết hiệu lực.</p><div class="obligation-list">'+(rows.length?rows.map(function(x){
    const fileText=x.fileRefs.length?x.fileRefs.map(function(f){return f.name||f.id}).join(" · "):"Chưa gắn file gốc";
    const linked=x.obligationIds.length?x.obligationIds.length+" nghĩa vụ liên kết":"Chưa liên kết nghĩa vụ";
    const expiry=x.expiryDate?'<span class="deadline-pill '+(complianceDays(x.expiryDate)<0?"late":complianceDays(x.expiryDate)<=30?"soon":"")+'">'+esc(complianceDueLabel(x.expiryDate))+'</span>':"";
    return '<article class="obligation-item"><div class="obligation-main"><div class="obligation-head"><div><span class="obligation-status active">'+esc(permitStatusLabel(x.status))+'</span><b>'+esc(x.title||permitTypeLabel(x.type))+'</b></div></div><div class="obligation-source text-only"><b>'+esc(x.number||"Chưa nhập số giấy phép")+'</b>'+(x.issuer?' · '+esc(x.issuer):"")+'</div><div class="obligation-evidence-list"><span class="obligation-evidence ok">'+esc(fileText)+'</span><span class="obligation-evidence">'+esc(linked)+'</span></div>'+(x.issueDate||x.reviewDate||x.expiryDate?'<p class="obligation-note">'+(x.issueDate?'<b>Ngày cấp:</b> '+esc(x.issueDate)+' · ':"")+(x.reviewDate?'<b>Rà soát:</b> '+esc(x.reviewDate)+' · ':"")+(x.expiryDate?'<b>Hết hạn:</b> '+esc(x.expiryDate):"")+'</p>':"")+(x.conditions?'<p class="obligation-note"><b>Điều kiện / nội dung cần theo dõi:</b> '+esc(x.conditions)+'</p>':"")+(x.note?'<p class="obligation-note">'+esc(x.note)+'</p>':"")+'</div><div class="obligation-side">'+expiry+'<button class="tiny" data-permit-obligation="'+esc(x.id)+'" type="button">+ Nghĩa vụ</button><button class="tiny" data-permit-edit="'+esc(x.id)+'" type="button">Sửa</button><button class="tiny danger-soft" data-permit-delete="'+esc(x.id)+'" type="button">Xóa</button></div></article>';
  }).join(""):'<div class="obligation-empty"><b>Chưa có giấy phép trong hồ sơ</b><p>Thêm GPMT hoặc quyết định/giấy phép liên quan để quản lý file gốc, điều kiện và các mốc cần rà lại.</p></div>')+'</div><div id="permitEditorMount"></div></section>';
}
function permitEditorHtml(p,x){
  x=x||normalizeCompliancePermit({});
  return '<details class="obligation-editor" id="permitEditor" open><summary><span><b>'+(x.number||x.title?"Chỉnh sửa giấy phép":"Thêm giấy phép")+'</b><small>Dữ liệu do người dùng khai báo; cần đối chiếu file gốc trước khi sử dụng.</small></span><span>⌄</span></summary><div class="obligation-editor-body"><input id="permitEditorId" type="hidden" value="'+esc(x.id||"")+'"><div class="obligation-form-grid"><label><span>Loại</span><select id="permitType">'+PERMIT_TYPES.map(function(t){return '<option value="'+t[0]+'" '+(t[0]===x.type?"selected":"")+'>'+esc(t[1])+'</option>'}).join("")+'</select></label><label><span>Trạng thái theo dõi</span><select id="permitStatus"><option value="unknown" '+(x.status==="unknown"?"selected":"")+'>Chưa xác định</option><option value="active" '+(x.status==="active"?"selected":"")+'>Đang theo dõi</option><option value="pending" '+(x.status==="pending"?"selected":"")+'>Đang làm thủ tục</option><option value="replaced" '+(x.status==="replaced"?"selected":"")+'>Đã được thay thế</option><option value="closed" '+(x.status==="closed"?"selected":"")+'>Đã kết thúc</option></select></label><label class="wide"><span>Tên / mô tả giấy phép</span><input id="permitTitle" value="'+esc(x.title||"")+'" placeholder="Ví dụ: Giấy phép môi trường của Nhà máy A"></label><label><span>Số giấy phép / quyết định</span><input id="permitNumber" value="'+esc(x.number||"")+'" placeholder="Số, ký hiệu"></label><label><span>Cơ quan cấp</span><input id="permitIssuer" value="'+esc(x.issuer||"")+'" placeholder="Cơ quan / đơn vị ban hành"></label><label><span>Ngày cấp</span><input id="permitIssueDate" type="date" value="'+esc(x.issueDate||"")+'"></label><label><span>Ngày hết hạn</span><input id="permitExpiryDate" type="date" value="'+esc(x.expiryDate||"")+'"></label><label><span>Mốc rà soát nội bộ</span><input id="permitReviewDate" type="date" value="'+esc(x.reviewDate||"")+'"></label></div><div class="obligation-evidence-editor"><div><b>File gốc / tài liệu liên quan</b><span>Backup workspace chỉ lưu ID và tên tham chiếu, không chứa byte của file.</span></div><div class="obligation-evidence-choices">'+permitFileChecklist(x.fileRefs)+'</div></div><div class="obligation-evidence-editor"><div><b>Liên kết Sổ nghĩa vụ</b><span>Dùng để truy ngược điều kiện giấy phép sang việc đang theo dõi.</span></div><div class="obligation-evidence-choices">'+permitObligationChecklist(p,x.obligationIds)+'</div></div><label class="obligation-note-field"><span>Điều kiện / nội dung cần theo dõi</span><textarea id="permitConditions" rows="3" placeholder="Chép tóm tắt điều kiện cần kiểm tra; không thay thế nội dung file gốc.">'+esc(x.conditions||"")+'</textarea></label><label class="obligation-note-field"><span>Ghi chú</span><textarea id="permitNote" rows="2">'+esc(x.note||"")+'</textarea></label><div class="obligation-editor-actions"><button class="btn bs" data-permit-cancel type="button">Hủy</button><button class="btn bp" data-permit-save type="button">Lưu Permit Register</button></div></div></details>';
}
function openPermitEditor(id){
  const p=complianceProfile();if(!p){toast("Tạo Hồ sơ tuân thủ trước");return}
  const host=$("permitEditorMount");if(!host)return;
  const found=(p.permits||[]).find(function(x){return x.id===id});
  host.innerHTML=permitEditorHtml(p,found||normalizeCompliancePermit({id:""}));
  host.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});
}
function readPermitEditor(){
  const p=complianceProfile(),id=$("permitEditorId")?.value||"",old=p&&p.permits.find(function(x){return x.id===id});
  const files=[...document.querySelectorAll("[data-permit-file-id]:checked")].map(function(el){return {id:el.dataset.permitFileId||"",name:el.dataset.permitFileName||""}});
  const obligationIds=[...document.querySelectorAll("[data-permit-obligation-id]:checked")].map(function(el){return el.dataset.permitObligationId}).filter(Boolean);
  return normalizeCompliancePermit(Object.assign({},old||{},{id:id||complianceId("permit"),type:$("permitType")?.value||"other",status:$("permitStatus")?.value||"unknown",title:$("permitTitle")?.value||"",number:$("permitNumber")?.value||"",issuer:$("permitIssuer")?.value||"",issueDate:$("permitIssueDate")?.value||"",expiryDate:$("permitExpiryDate")?.value||"",reviewDate:$("permitReviewDate")?.value||"",fileRefs:files,obligationIds:obligationIds,conditions:$("permitConditions")?.value||"",note:$("permitNote")?.value||"",createdAt:old&&old.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}));
}
function savePermitEditor(){
  const p=complianceProfile();if(!p)return;
  const x=readPermitEditor();if(!x.number&&!x.title){toast("Nhập tên hoặc số giấy phép");return}
  const i=p.permits.findIndex(function(v){return v.id===x.id}),before=i>=0?complianceClone(p.permits[i]):null;
  if(i>=0)p.permits[i]=x;else p.permits.unshift(x);
  p.updatedAt=x.updatedAt;
  complianceRecordAudit(i>=0?"update":"create","permit",p.id,x.id,(i>=0?"Cập nhật giấy phép · ":"Tạo giấy phép · ")+(x.number||x.title),before,complianceClone(x),true);
  saveComplianceProfiles();toast("Đã lưu Permit Register");
}
function deletePermit(id){
  const p=complianceProfile(),x=p&&p.permits.find(function(v){return v.id===id});if(!p||!x)return;
  if(!confirm("Xóa giấy phép “"+(x.number||x.title||permitTypeLabel(x.type))+"”? Bạn có thể hoàn tác thay đổi gần nhất."))return;
  complianceRecordAudit("delete","permit",p.id,x.id,"Xóa giấy phép · "+(x.number||x.title||permitTypeLabel(x.type)),complianceClone(x),null,true);
  p.permits=p.permits.filter(function(v){return v.id!==x.id});p.updatedAt=new Date().toISOString();saveComplianceProfiles();toast("Đã xóa giấy phép · có thể Hoàn tác");
}
function permitToObligation(id){
  const p=complianceProfile(),x=p&&p.permits.find(function(v){return v.id===id});if(!p||!x)return;
  const source=[x.number,x.issuer].filter(Boolean).join(" · ");
  openObligationEditor("",{title:"Xác minh điều kiện theo "+(x.number||x.title||permitTypeLabel(x.type)),branch:"env",status:"verify",dueDate:x.reviewDate||"",dueBasis:"permit",dueSource:source||"Permit Register",evidence:(x.fileRefs||[]).map(function(f){return {id:f.id,name:f.name}}),evidenceNote:x.conditions||"",note:"Được tạo từ Permit Register; cần đối chiếu nội dung giấy phép/file gốc trước khi kết luận."});
}
function initPermitUI(){
  if(window.__ccplmtPermitUiBound)return;window.__ccplmtPermitUiBound=true;
  document.body.addEventListener("click",function(e){
    if(e.target.closest("[data-permit-new]")){e.preventDefault();openPermitEditor("");return}
    const edit=e.target.closest("[data-permit-edit]");if(edit){e.preventDefault();openPermitEditor(edit.dataset.permitEdit);return}
    const del=e.target.closest("[data-permit-delete]");if(del){e.preventDefault();deletePermit(del.dataset.permitDelete);return}
    const obl=e.target.closest("[data-permit-obligation]");if(obl){e.preventDefault();permitToObligation(obl.dataset.permitObligation);return}
    if(e.target.closest("[data-permit-save]")){e.preventDefault();savePermitEditor();return}
    if(e.target.closest("[data-permit-cancel]")){e.preventDefault();const host=$("permitEditorMount");if(host)host.innerHTML="";return}
  });
}
