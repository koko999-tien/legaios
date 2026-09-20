const PERMIT_TYPES={gpmt:"Giấy phép môi trường (GPMT)",water:"Giấy phép / chấp thuận về tài nguyên nước",waste:"Giấy phép / hồ sơ về chất thải",resource:"Giấy phép tài nguyên / khoáng sản liên quan",construction:"Giấy phép / chấp thuận công trình liên quan",other:"Giấy phép / quyết định khác"};
function permitTypeLabel(v){return PERMIT_TYPES[v]||PERMIT_TYPES.other}
function permitStatusLabel(v){return ({unknown:"Chưa xác định",active:"Đang theo dõi",pending:"Đang làm thủ tục",replaced:"Đã được thay thế",closed:"Đã kết thúc"})[v]||"Chưa xác định"}
function permitRegisterHtml(p){
  const rows=p.permits||[];
  return '<section class="compliance-section permit-register"><div class="compliance-section-head"><div><div class="section-kicker">Permit Register</div><h3>Giấy phép · quyết định · mốc rà soát</h3></div><div class="obligation-register-actions"><span>'+rows.length+' hồ sơ</span><button class="tiny" data-permit-new type="button">+ Thêm giấy phép</button></div></div><p class="micro-note">Trạng thái và mốc thời gian do người dùng quản lý. Hệ thống không tự kết luận giấy phép còn hiệu lực hay đã hết hiệu lực.</p><div class="obligation-list">'+(rows.length?rows.map(function(x){
    const files=x.fileRefs.length?x.fileRefs.map(function(f){return f.name||f.id}).join(" · "):"Chưa gắn file gốc",linked=x.obligationIds.length?x.obligationIds.length+" nghĩa vụ liên kết":"Chưa liên kết nghĩa vụ",days=x.expiryDate?complianceDays(x.expiryDate):null,due=x.expiryDate?'<span class="deadline-pill '+(days<0?"late":days<=30?"soon":"")+'">'+esc(complianceDueLabel(x.expiryDate))+'</span>':"";
    return '<article class="obligation-item"><div class="obligation-main"><div class="obligation-head"><div><span class="obligation-status active">'+esc(permitStatusLabel(x.status))+'</span><b>'+esc(x.title||permitTypeLabel(x.type))+'</b></div></div><div class="obligation-source text-only"><b>'+esc(x.number||"Chưa nhập số giấy phép")+'</b>'+(x.issuer?' · '+esc(x.issuer):"")+'</div><div class="obligation-evidence-list"><span class="obligation-evidence ok">'+esc(files)+'</span><span class="obligation-evidence">'+esc(linked)+'</span></div>'+(x.issueDate||x.reviewDate||x.expiryDate?'<p class="obligation-note">'+(x.issueDate?'<b>Ngày cấp:</b> '+esc(x.issueDate)+' · ':"")+(x.reviewDate?'<b>Rà soát:</b> '+esc(x.reviewDate)+' · ':"")+(x.expiryDate?'<b>Hết hạn:</b> '+esc(x.expiryDate):"")+'</p>':"")+(x.conditions?'<p class="obligation-note"><b>Điều kiện / nội dung cần theo dõi:</b> '+esc(x.conditions)+'</p>':"")+(x.note?'<p class="obligation-note">'+esc(x.note)+'</p>':"")+'</div><div class="obligation-side">'+due+'<button class="tiny" data-permit-obligation="'+esc(x.id)+'" type="button">+ Nghĩa vụ</button><button class="tiny" data-permit-edit="'+esc(x.id)+'" type="button">Sửa</button><button class="tiny danger-soft" data-permit-delete="'+esc(x.id)+'" type="button">Xóa</button></div></article>';
  }).join(""):'<div class="obligation-empty"><b>Chưa có giấy phép trong hồ sơ</b><p>Thêm GPMT hoặc quyết định/giấy phép liên quan để quản lý file gốc, điều kiện và các mốc cần rà lại.</p></div>')+'</div></section>';
}
function permitFillSelect(id,rows,selected,label){
  const el=$(id);if(!el)return;const chosen=new Set(selected||[]);el.replaceChildren();
  rows.forEach(function(x){const o=document.createElement("option");o.value=x.id;o.textContent=label(x);o.selected=chosen.has(x.id);el.append(o)});
}
function openPermitEditor(id){
  const p=complianceProfile();if(!p){toast("Tạo Hồ sơ tuân thủ trước");return}
  const x=(p.permits||[]).find(function(v){return v.id===id})||normalizeCompliancePermit({id:""});
  $("permitEditorId").value=id||"";$("permitType").value=x.type;$("permitStatus").value=x.status;$("permitTitle").value=x.title;$("permitNumber").value=x.number;$("permitIssuer").value=x.issuer;$("permitIssueDate").value=x.issueDate;$("permitExpiryDate").value=x.expiryDate;$("permitReviewDate").value=x.reviewDate;$("permitConditions").value=x.conditions;$("permitNote").value=x.note;
  permitFillSelect("permitFileIds",typeof importedDocs==="undefined"?[]:importedDocs,x.fileRefs.map(function(v){return v.id}),function(v){return v.name+" · ."+(v.ext||"file")});
  permitFillSelect("permitObligationIds",p.obligations,x.obligationIds,function(v){return v.title+" · "+complianceObligationStatusLabel(v.status)});
  $("permitModal").classList.add("on");
}
function closePermitEditor(){$("permitModal")?.classList.remove("on")}
function readPermitEditor(){
  const p=complianceProfile(),id=$("permitEditorId").value,old=p&&p.permits.find(function(x){return x.id===id}),files=[...$("permitFileIds").selectedOptions].map(function(o){const f=(typeof importedDocs==="undefined"?[]:importedDocs).find(function(x){return x.id===o.value});return {id:o.value,name:f&&f.name||o.textContent}}),obligationIds=[...$("permitObligationIds").selectedOptions].map(function(o){return o.value});
  return normalizeCompliancePermit(Object.assign({},old||{},{id:id||complianceId("permit"),type:$("permitType").value,status:$("permitStatus").value,title:$("permitTitle").value,number:$("permitNumber").value,issuer:$("permitIssuer").value,issueDate:$("permitIssueDate").value,expiryDate:$("permitExpiryDate").value,reviewDate:$("permitReviewDate").value,fileRefs:files,obligationIds,conditions:$("permitConditions").value,note:$("permitNote").value,createdAt:old&&old.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}));
}
function savePermitEditor(){
  const p=complianceProfile();if(!p)return;const x=readPermitEditor();if(!x.number&&!x.title){toast("Nhập tên hoặc số giấy phép");return}
  const i=p.permits.findIndex(function(v){return v.id===x.id}),before=i>=0?complianceClone(p.permits[i]):null;if(i>=0)p.permits[i]=x;else p.permits.unshift(x);p.updatedAt=x.updatedAt;
  complianceRecordAudit(i>=0?"update":"create","permit",p.id,x.id,(i>=0?"Cập nhật giấy phép · ":"Tạo giấy phép · ")+(x.number||x.title),before,complianceClone(x),true);closePermitEditor();saveComplianceProfiles();toast("Đã lưu Permit Register");
}
function deletePermit(id){
  const p=complianceProfile(),x=p&&p.permits.find(function(v){return v.id===id});if(!p||!x||!confirm("Xóa giấy phép “"+(x.number||x.title||permitTypeLabel(x.type))+"”? Bạn có thể hoàn tác thay đổi gần nhất."))return;
  complianceRecordAudit("delete","permit",p.id,x.id,"Xóa giấy phép · "+(x.number||x.title||permitTypeLabel(x.type)),complianceClone(x),null,true);p.permits=p.permits.filter(function(v){return v.id!==x.id});p.updatedAt=new Date().toISOString();saveComplianceProfiles();toast("Đã xóa giấy phép · có thể Hoàn tác");
}
function permitToObligation(id){
  const p=complianceProfile(),x=p&&p.permits.find(function(v){return v.id===id});if(!p||!x)return;openObligationEditor("",{title:"Xác minh điều kiện theo "+(x.number||x.title||permitTypeLabel(x.type)),branch:"env",status:"verify",dueDate:x.reviewDate||"",dueBasis:"permit",dueSource:[x.number,x.issuer].filter(Boolean).join(" · ")||"Permit Register",evidence:x.fileRefs.map(function(f){return {id:f.id,name:f.name}}),evidenceNote:x.conditions||"",note:"Được tạo từ Permit Register; cần đối chiếu nội dung giấy phép/file gốc trước khi kết luận."});
}
function initPermitUI(){
  if(window.__ccplmtPermitUiBound)return;window.__ccplmtPermitUiBound=true;document.body.addEventListener("click",function(e){
    if(e.target.closest("[data-permit-new]")){e.preventDefault();openPermitEditor("");return}const edit=e.target.closest("[data-permit-edit]");if(edit){e.preventDefault();openPermitEditor(edit.dataset.permitEdit);return}const del=e.target.closest("[data-permit-delete]");if(del){e.preventDefault();deletePermit(del.dataset.permitDelete);return}const obl=e.target.closest("[data-permit-obligation]");if(obl){e.preventDefault();permitToObligation(obl.dataset.permitObligation);return}if(e.target.closest("[data-permit-save]")){e.preventDefault();savePermitEditor();return}if(e.target.closest("[data-permit-cancel]")||e.target.closest("[data-permit-close]")){e.preventDefault();closePermitEditor();return}
  });$("permitModal")?.addEventListener("click",function(e){if(e.target===$("permitModal"))closePermitEditor()});
}
