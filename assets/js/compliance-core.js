const COMPLIANCE_KEY="ccplmt_compliance_profiles_v1";
const COMPLIANCE_AUDIT_KEY="ccplmt_compliance_audit_v1";
const COMPLIANCE_FEATURES=[
  ["water","Nước thải"],["air","Khí thải / bụi"],["ctnh","CTNH"],
  ["waterUse","Khai thác / sử dụng nước"],["epr","Có thể liên quan EPR"],
  ["knk","Có thể liên quan kiểm kê KNK"],["land","Đất / rừng"],
  ["bio","Đa dạng sinh học"],["chemical","Hóa chất"]
];
const COMPLIANCE_TRACKS=[
  {id:"env",label:"ĐTM · GPMT · ĐKMT",features:[],query:"ĐTM GPMT đăng ký môi trường đối tượng",refs:["l72","nd08","nd05","nd48"],reason:"Nhánh nền cần đối chiếu cho dự án/cơ sở môi trường."},
  {id:"water",label:"Nước & nước thải",features:["water","waterUse"],query:"nước thải tài nguyên nước khai thác sử dụng nước",refs:["l28","q40","nd346"],reason:"Hồ sơ có tín hiệu về nước thải hoặc khai thác/sử dụng nước."},
  {id:"air",label:"Khí thải · bụi · phí khí thải",features:["air"],query:"khí thải công nghiệp quan trắc phí khí thải",refs:["q19","nd153"],reason:"Hồ sơ có tín hiệu về khí thải hoặc bụi."},
  {id:"waste",label:"Chất thải · CTNH · EPR",features:["ctnh","epr"],query:"CTNH EPR trách nhiệm tái chế xử lý chất thải",refs:["epr","q07","nd110","tt24epr"],reason:"Hồ sơ có tín hiệu về CTNH hoặc hoạt động có thể liên quan EPR."},
  {id:"climate",label:"KNK · carbon",features:["knk"],query:"kiểm kê khí nhà kính KNK carbon",refs:["nd06","nd119","nd83","qd232_2025_carbon"],reason:"Hồ sơ có tín hiệu cần rà nhánh KNK/carbon."},
  {id:"landbio",label:"Đất · rừng · đa dạng sinh học",features:["land","bio"],query:"đất rừng đa dạng sinh học yếu tố nhạy cảm",refs:["ldat","ln","ddsh"],reason:"Hồ sơ có tín hiệu về đất/rừng hoặc đa dạng sinh học."},
  {id:"chemical",label:"Hóa chất",features:["chemical"],query:"hóa chất môi trường sự cố chất thải",refs:["lhc","nd24_2026_chem","nd25_2026_chem"],reason:"Hồ sơ có hoạt động hóa chất cần rà thêm căn cứ chuyên ngành."}
];
function complianceId(prefix){
  prefix=prefix||"cp";
  try{return prefix+"-"+crypto.randomUUID()}catch{return prefix+"-"+Date.now()+"-"+Math.random().toString(36).slice(2,8)}
}
function complianceSignal(v){return ["yes","no","unknown"].includes(v)?v:"unknown"}
function complianceText(v,max){max=max||500;return String(v==null?"":v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").trim().slice(0,max)}
function normalizeCompliancePermit(row,now){
  row=row||{};now=now||new Date().toISOString();
  const files=Array.isArray(row.fileRefs)?row.fileRefs.slice(0,20).map(function(x){x=x||{};return {id:complianceText(x.id||"",160),name:complianceText(x.name||"",300)}}).filter(function(x){return x.id||x.name}):[];
  const obligations=Array.isArray(row.obligationIds)?row.obligationIds.slice(0,100).map(function(x){return complianceText(x||"",120)}).filter(Boolean):[];
  const date=function(v){return /^\d{4}-\d{2}-\d{2}$/.test(String(v||""))?String(v):""};
  return {
    id:complianceText(row.id||complianceId("permit"),120),
    type:["gpmt","water","waste","resource","construction","other"].includes(row.type)?row.type:"other",
    title:complianceText(row.title||"",240),
    number:complianceText(row.number||"",180),
    issuer:complianceText(row.issuer||"",240),
    issueDate:date(row.issueDate),
    expiryDate:date(row.expiryDate),
    reviewDate:date(row.reviewDate),
    status:["unknown","active","pending","replaced","closed"].includes(row.status)?row.status:"unknown",
    fileRefs:files,
    obligationIds:obligations,
    conditions:complianceText(row.conditions||"",5000),
    note:complianceText(row.note||"",3000),
    createdAt:complianceText(row.createdAt||now,60),
    updatedAt:complianceText(row.updatedAt||now,60)
  };
}
function normalizeComplianceProfile(row){
  row=row||{};
  const now=new Date().toISOString(),features={};
  COMPLIANCE_FEATURES.forEach(function(item){features[item[0]]=complianceSignal(row.features&&row.features[item[0]])});
  const deadlines=Array.isArray(row.deadlines)?row.deadlines.slice(0,200).map(function(x){
    x=x||{};
    return {
      id:complianceText(x.id||complianceId("task"),120),
      title:complianceText(x.title||"Việc cần theo dõi",300),
      date:/^\d{4}-\d{2}-\d{2}$/.test(String(x.date||""))?String(x.date):"",
      kind:complianceText(x.kind||"manual",40),
      note:complianceText(x.note||"",1000),
      done:!!x.done,
      createdAt:complianceText(x.createdAt||now,60)
    };
  }).filter(function(x){return !!x.title}):[];
  const hasPermitList=Array.isArray(row.permits);
  let permits=hasPermitList?row.permits.slice(0,100).map(function(x){return normalizeCompliancePermit(x,now)}):[];
  const legacyPermit=row.permit||{};
  if(!hasPermitList&&(legacyPermit.gpmtNumber||legacyPermit.expires)){
    permits=[normalizeCompliancePermit({type:"gpmt",title:"Giấy phép môi trường",number:legacyPermit.gpmtNumber||"",expiryDate:legacyPermit.expires||"",status:"unknown",note:"Được chuyển từ trường GPMT của phiên bản workspace trước."},now)];
  }
  const primaryGpmt=permits.find(function(x){return x.type==="gpmt"})||null;
  const obligations=Array.isArray(row.obligations)?row.obligations.slice(0,300).map(function(x){
    x=x||{};
    const evidence=Array.isArray(x.evidence)?x.evidence.slice(0,30).map(function(ev){
      ev=ev||{};
      return {id:complianceText(ev.id||"",160),name:complianceText(ev.name||"",300)};
    }).filter(function(ev){return ev.id||ev.name}):[];
    return {
      id:complianceText(x.id||complianceId("obl"),120),
      title:complianceText(x.title||"Mục nghĩa vụ cần xác minh",300),
      branch:complianceText(x.branch||"env",80),
      status:["verify","active","met","not_applicable"].includes(x.status)?x.status:"verify",
      legalDocId:complianceText(x.legalDocId||"",120),
      legalArticle:complianceText(x.legalArticle||"",24),
      legalClause:complianceText(x.legalClause||"",24),
      legalPoint:complianceText(x.legalPoint||"",24),
      legalAppendix:complianceText(x.legalAppendix||"",160),
      legalRef:complianceText(x.legalRef||"",500),
      owner:complianceText(x.owner||"",180),
      dueDate:/^\d{4}-\d{2}-\d{2}$/.test(String(x.dueDate||""))?String(x.dueDate):"",
      dueBasis:["manual","permit","legal_source","verified"].includes(x.dueBasis)?x.dueBasis:"manual",
      dueSource:complianceText(x.dueSource||"",500),
      recurrence:["none","monthly","quarterly","yearly"].includes(x.recurrence)?x.recurrence:"none",
      occurrenceHistory:Array.isArray(x.occurrenceHistory)?x.occurrenceHistory.slice(-120).map(function(h){
        h=h||{};
        return {
          id:complianceText(h.id||complianceId("occ"),120),
          dueDate:/^\d{4}-\d{2}-\d{2}$/.test(String(h.dueDate||""))?String(h.dueDate):"",
          completedAt:complianceText(h.completedAt||"",60)
        };
      }).filter(function(h){return !!h.dueDate}):[],
      evidence:evidence,
      evidenceNote:complianceText(x.evidenceNote||"",1200),
      note:complianceText(x.note||"",2000),
      createdAt:complianceText(x.createdAt||now,60),
      updatedAt:complianceText(x.updatedAt||now,60)
    };
  }).filter(function(x){return !!x.title}):[];
  return {
    id:complianceText(row.id||complianceId(),120),
    name:complianceText(row.name||"Hồ sơ chưa đặt tên",180),
    profileType:["facility","project","company"].includes(row.profileType)?row.profileType:"facility",
    sector:complianceText(row.sector||"",180),
    location:complianceText(row.location||"",220),
    phase:complianceText(row.phase||"",80),
    features:features,
    permit:{
      gpmtNumber:primaryGpmt?primaryGpmt.number:complianceText(legacyPermit.gpmtNumber||"",160),
      expires:primaryGpmt?primaryGpmt.expiryDate:(/^\d{4}-\d{2}-\d{2}$/.test(String(legacyPermit.expires||""))?String(legacyPermit.expires):"")
    },
    permits:permits,
    deadlines:deadlines,
    obligations:obligations,
    note:complianceText(row.note||"",4000),
    createdAt:complianceText(row.createdAt||now,60),
    updatedAt:complianceText(row.updatedAt||now,60)
  };
}
let complianceProfiles=STORE.get(COMPLIANCE_KEY,[]);
if(!Array.isArray(complianceProfiles))complianceProfiles=[];
complianceProfiles=complianceProfiles.slice(0,300).map(normalizeComplianceProfile);
let currentComplianceId=complianceProfiles[0]&&complianceProfiles[0].id||null;
function complianceClone(v){return v==null?null:JSON.parse(JSON.stringify(v))}
function complianceSafeSnapshot(v){
  if(v==null)return null;
  try{
    const raw=JSON.stringify(v);
    if(raw.length>350000)return null;
    return JSON.parse(raw);
  }catch{return null}
}
function normalizeComplianceAuditEvent(e){
  e=e||{};
  return {
    id:complianceText(e.id||complianceId("audit"),120),
    at:complianceText(e.at||new Date().toISOString(),60),
    action:complianceText(e.action||"update",60),
    entityType:["profile","obligation","deadline","permit"].includes(e.entityType)?e.entityType:"profile",
    profileId:complianceText(e.profileId||"",120),
    entityId:complianceText(e.entityId||"",120),
    summary:complianceText(e.summary||"Thay đổi dữ liệu tuân thủ",500),
    before:complianceSafeSnapshot(e.before),
    after:complianceSafeSnapshot(e.after),
    undoable:e.undoable!==false,
    undoneAt:complianceText(e.undoneAt||"",60)
  };
}
let complianceAudit=STORE.get(COMPLIANCE_AUDIT_KEY,[]);
if(!Array.isArray(complianceAudit))complianceAudit=[];
complianceAudit=complianceAudit.slice(0,500).map(normalizeComplianceAuditEvent);
function complianceProfile(id){id=id||currentComplianceId;return complianceProfiles.find(function(x){return x.id===id})||null}
function saveComplianceAudit(){const m=new Map,a=STORE.get(COMPLIANCE_AUDIT_KEY,[]);(Array.isArray(a)?a:[]).map(normalizeComplianceAuditEvent).forEach(e=>m.set(e.id,e));complianceAudit.map(normalizeComplianceAuditEvent).forEach(e=>m.set(e.id,e));complianceAudit=[...m.values()].sort((a,b)=>(b.at||"").localeCompare(a.at||"")).slice(0,500);STORE.set(COMPLIANCE_AUDIT_KEY,complianceAudit)}
function complianceRecordAudit(action,entityType,profileId,entityId,summary,before,after,undoable){
  const ev=normalizeComplianceAuditEvent({
    id:complianceId("audit"),at:new Date().toISOString(),action:action,entityType:entityType,
    profileId:profileId,entityId:entityId,summary:summary,before:before,after:after,undoable:undoable!==false
  });
  complianceAudit.unshift(ev);saveComplianceAudit();return ev;
}
function complianceAuditForProfile(profileId){return complianceAudit.filter(function(e){return e.profileId===profileId}).slice(0,20)}
function complianceAuditActionLabel(a){
  return ({create:"Tạo",update:"Cập nhật",delete:"Xóa",complete_period:"Hoàn thành kỳ",toggle:"Đổi trạng thái",undo:"Hoàn tác"})[a]||"Thay đổi";
}
function complianceAuditHtml(p){
  const rows=complianceAuditForProfile(p.id).slice(0,12);
  if(!rows.length)return '<div class="obligation-empty"><b>Chưa có lịch sử thay đổi</b><p>Các lần sửa hồ sơ, nghĩa vụ và deadline sẽ xuất hiện ở đây.</p></div>';
  return '<ul class="compliance-task-list audit-list">'+rows.map(function(e){
    const when=new Date(e.at);const time=Number.isNaN(when.getTime())?e.at:when.toLocaleString("vi-VN");
    return '<li><div><b>'+esc(e.summary)+'</b><small>'+esc(complianceAuditActionLabel(e.action))+' · '+esc(time)+(e.undoneAt?' · đã hoàn tác':'')+'</small></div><div>'+(e.undoneAt?'<span class="deadline-pill">Đã hoàn tác</span>':'')+'</div></li>';
  }).join("")+'</ul>';
}
function complianceLatestUndoable(profileId){
  return complianceAudit.find(function(e){return e.undoable&&!e.undoneAt&&(!profileId||e.profileId===profileId)})||null;
}
function complianceNormalizedObligationSnapshot(v){
  if(!v)return null;const p=normalizeComplianceProfile({name:"snapshot",obligations:[v]});return p.obligations[0]||null;
}
function complianceNormalizedDeadlineSnapshot(v){
  if(!v)return null;const p=normalizeComplianceProfile({name:"snapshot",deadlines:[v]});return p.deadlines[0]||null;
}
function complianceNormalizedPermitSnapshot(v){
  if(!v)return null;return normalizeCompliancePermit(v,new Date().toISOString());
}
function complianceUndoLast(profileId){
  const ev=complianceLatestUndoable(profileId);
  if(!ev){toast("Không có thay đổi nào để hoàn tác");return false}
  if(ev.entityType==="profile"){
    if(ev.before){
      const restored=normalizeComplianceProfile(ev.before),i=complianceProfiles.findIndex(function(x){return x.id===restored.id});
      if(i>=0)complianceProfiles[i]=restored;else complianceProfiles.unshift(restored);
      currentComplianceId=restored.id;
    }else{
      complianceProfiles=complianceProfiles.filter(function(x){return x.id!==ev.profileId});
      if(currentComplianceId===ev.profileId)currentComplianceId=complianceProfiles[0]&&complianceProfiles[0].id||null;
    }
  }else{
    const p=complianceProfile(ev.profileId);
    if(!p){toast("Không thể hoàn tác vì hồ sơ gốc không còn tồn tại");return false}
    if(ev.entityType==="obligation"){
      const restored=complianceNormalizedObligationSnapshot(ev.before),i=p.obligations.findIndex(function(x){return x.id===ev.entityId});
      if(restored){if(i>=0)p.obligations[i]=restored;else p.obligations.unshift(restored)}
      else p.obligations=p.obligations.filter(function(x){return x.id!==ev.entityId});
    }else if(ev.entityType==="deadline"){
      const restored=complianceNormalizedDeadlineSnapshot(ev.before),i=p.deadlines.findIndex(function(x){return x.id===ev.entityId});
      if(restored){if(i>=0)p.deadlines[i]=restored;else p.deadlines.unshift(restored)}
      else p.deadlines=p.deadlines.filter(function(x){return x.id!==ev.entityId});
    }else if(ev.entityType==="permit"){
      const restored=complianceNormalizedPermitSnapshot(ev.before),i=p.permits.findIndex(function(x){return x.id===ev.entityId});
      if(restored){if(i>=0)p.permits[i]=restored;else p.permits.unshift(restored)}
      else p.permits=p.permits.filter(function(x){return x.id!==ev.entityId});
    }
    p.updatedAt=new Date().toISOString();
    currentComplianceId=p.id;
  }
  ev.undoneAt=new Date().toISOString();saveComplianceAudit();saveComplianceProfiles();toast("Đã hoàn tác: "+ev.summary);return true;
}
function complianceAuditBackupRows(){return complianceAudit.slice(0,500).map(normalizeComplianceAuditEvent)}
function complianceProfileTypeLabel(v){return v==="project"?"Dự án":v==="company"?"Doanh nghiệp":"Cơ sở"}
function compliancePhaseLabel(v){return ({preparation:"Chuẩn bị",construction:"Thi công",operation:"Vận hành",change:"Thay đổi / mở rộng",closure:"Đóng cửa / kết thúc"})[v]||"Chưa xác định"}
function complianceCompleteness(p){
  if(!p)return 0;
  const fixed=[p.name&&p.name!=="Hồ sơ chưa đặt tên",p.sector,p.location,p.phase];
  const signals=COMPLIANCE_FEATURES.map(function(item){return p.features[item[0]]!=="unknown"});
  return Math.round(fixed.concat(signals).filter(Boolean).length/(fixed.length+signals.length)*100);
}
function complianceTracks(p){
  if(!p)return [];
  return COMPLIANCE_TRACKS.filter(function(track,index){
    return index===0||track.features.some(function(key){return p.features[key]==="yes"});
  }).map(function(track){
    return Object.assign({},track,{docs:track.refs.map(function(id){return D.find(function(d){return d.id===id})}).filter(Boolean)});
  });
}
function complianceUnknowns(p){
  if(!p)return [];
  return COMPLIANCE_FEATURES.filter(function(item){return p.features[item[0]]==="unknown"}).map(function(item){return item[1]});
}
function complianceDays(date){
  if(!date)return null;
  const target=new Date(date+"T00:00:00");if(Number.isNaN(target.getTime()))return null;
  const today=new Date();today.setHours(0,0,0,0);
  return Math.ceil((target-today)/86400000);
}
function complianceDueLabel(date){
  const days=complianceDays(date);
  if(days===null)return "Chưa có ngày";
  if(days<0)return "Quá "+Math.abs(days)+" ngày";
  if(days===0)return "Hôm nay";
  return "Còn "+days+" ngày";
}
function complianceTasks(p){
  if(!p)return [];
  const tasks=[],pct=complianceCompleteness(p),unknown=complianceUnknowns(p);
  if(pct<75)tasks.push({id:"profile-completeness",title:"Bổ sung dữ liệu nền của hồ sơ",date:"",kind:"system",done:false,note:"Độ đầy đủ hiện tại "+pct+"%."});
  if(unknown.length)tasks.push({id:"profile-unknowns",title:"Xác minh "+Math.min(3,unknown.length)+" tín hiệu còn chưa rõ",date:"",kind:"system",done:false,note:unknown.slice(0,5).join(" · ")});
  (p.permits||[]).forEach(function(x){
    const label=(x.title||x.number||"giấy phép");
    if(x.reviewDate)tasks.push({id:"permit-review:"+x.id,title:"Rà soát "+label,date:x.reviewDate,kind:"permit",done:false,note:"Mốc rà soát do người dùng khai báo trong Permit Register."});
    if(x.expiryDate)tasks.push({id:"permit-expiry:"+x.id,title:"Kiểm tra ngày hết hạn "+label,date:x.expiryDate,kind:"permit",done:false,note:"Ngày hết hạn lấy từ dữ liệu người dùng nhập; cần đối chiếu giấy phép/file gốc."});
  });
  return tasks.concat(p.deadlines);
}
function complianceUrgent(p){
  return complianceTasks(p).filter(function(x){const d=complianceDays(x.date);return !x.done&&x.date&&d!==null&&d<=30}).sort(function(a,b){return String(a.date).localeCompare(String(b.date))});
}
function complianceObligationStatusLabel(v){
  return ({verify:"Cần xác minh",active:"Đang thực hiện",met:"Đã đáp ứng",not_applicable:"Không áp dụng · người dùng đánh dấu"})[v]||"Cần xác minh";
}
function complianceDueBasisLabel(v){
  return ({manual:"Người dùng nhập",permit:"Theo giấy phép/hồ sơ",legal_source:"Theo căn cứ pháp luật",verified:"Người dùng đánh dấu đã đối chiếu nguồn"})[v]||"Người dùng nhập";
}
function complianceOpenObligations(p){
  return p&&Array.isArray(p.obligations)?p.obligations.filter(function(x){return x.status==="verify"||x.status==="active"}):[];
}
function complianceObligationUrgent(p){
  return complianceOpenObligations(p).filter(function(x){
    const d=complianceDays(x.dueDate);return x.dueDate&&d!==null&&d<=30;
  }).sort(function(a,b){return String(a.dueDate).localeCompare(String(b.dueDate))});
}
function complianceRecurrenceLabel(v){
  return ({none:"Không lặp",monthly:"Hàng tháng",quarterly:"Hàng quý",yearly:"Hàng năm"})[v]||"Không lặp";
}
function complianceAddMonths(date,months){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(date||"")))return "";
  const parts=date.split("-").map(Number),year=parts[0],month=parts[1]-1,day=parts[2];
  const target=new Date(year,month+months,1),last=new Date(target.getFullYear(),target.getMonth()+1,0).getDate();
  target.setDate(Math.min(day,last));
  return [target.getFullYear(),String(target.getMonth()+1).padStart(2,"0"),String(target.getDate()).padStart(2,"0")].join("-");
}
function complianceNextOccurrence(date,recurrence){
  if(recurrence==="monthly")return complianceAddMonths(date,1);
  if(recurrence==="quarterly")return complianceAddMonths(date,3);
  if(recurrence==="yearly")return complianceAddMonths(date,12);
  return "";
}
function complianceCompleteOccurrence(obligationId){
  const p=complianceProfile(),o=p&&p.obligations.find(function(x){return x.id===obligationId});
  if(!p||!o||o.recurrence==="none"||!o.dueDate)return;
  const before=complianceClone(o);
  o.occurrenceHistory=o.occurrenceHistory||[];
  o.occurrenceHistory.push({id:complianceId("occ"),dueDate:o.dueDate,completedAt:new Date().toISOString()});
  o.occurrenceHistory=o.occurrenceHistory.slice(-120);
  const next=complianceNextOccurrence(o.dueDate,o.recurrence);
  o.dueDate=next;
  if(o.status==="verify")o.status="active";
  o.updatedAt=new Date().toISOString();
  p.updatedAt=o.updatedAt;
  complianceRecordAudit("complete_period","obligation",p.id,o.id,"Hoàn thành kỳ · "+o.title,before,complianceClone(o),true);
  saveComplianceProfiles();
  if(typeof logActivity==="function")logActivity("obligation",o.id,"Hoàn thành kỳ: "+o.title);
  toast(next?"Đã hoàn thành kỳ này · kỳ tiếp theo "+next:"Đã hoàn thành kỳ này");
}
function complianceFutureOccurrences(o,limit){
  limit=limit||4;
  if(!o||o.recurrence==="none"||!o.dueDate)return [];
  const rows=[];let date=o.dueDate;
  for(let i=0;i<limit;i++){
    rows.push(date);date=complianceNextOccurrence(date,o.recurrence);if(!date)break;
  }
  return rows;
}
function complianceCalendarItems(p){
  if(!p)return [];
  const rows=[];
  p.deadlines.filter(function(x){return !x.done&&x.date}).forEach(function(x){
    rows.push({id:"task:"+x.id,date:x.date,title:x.title,type:"task",source:"Deadline thủ công",refId:x.id});
  });
  (p.permits||[]).forEach(function(x){
    const label=x.title||x.number||"Giấy phép";
    if(x.reviewDate)rows.push({id:"permit-review:"+x.id,date:x.reviewDate,title:"Rà soát "+label,type:"permit",source:"Mốc rà soát do người dùng khai báo",refId:x.id});
    if(x.expiryDate)rows.push({id:"permit-expiry:"+x.id,date:x.expiryDate,title:"Kiểm tra ngày hết hạn "+label,type:"permit",source:"Ngày người dùng nhập từ giấy phép/file gốc",refId:x.id});
  });
  p.obligations.filter(function(o){return (o.status==="verify"||o.status==="active")&&o.dueDate}).forEach(function(o){
    complianceFutureOccurrences(o,o.recurrence==="none"?1:4).forEach(function(date,index){
      rows.push({
        id:"obl:"+o.id+":"+date,
        date:date,
        title:o.title,
        type:"obligation",
        source:index===0?complianceDueBasisLabel(o.dueBasis):"Dự kiến theo chu kỳ "+complianceRecurrenceLabel(o.recurrence).toLowerCase(),
        refId:o.id,
        projected:index>0
      });
    });
  });
  return rows.sort(function(a,b){return String(a.date).localeCompare(String(b.date))});
}