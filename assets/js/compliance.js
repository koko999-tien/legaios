/* Căn cứ Pháp lý Môi trường — compliance profiles, deadlines and profile-aware radar. */
const COMPLIANCE_KEY="ccplmt_compliance_profiles_v1";
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
  return {
    id:complianceText(row.id||complianceId(),120),
    name:complianceText(row.name||"Hồ sơ chưa đặt tên",180),
    profileType:["facility","project","company"].includes(row.profileType)?row.profileType:"facility",
    sector:complianceText(row.sector||"",180),
    location:complianceText(row.location||"",220),
    phase:complianceText(row.phase||"",80),
    features:features,
    permit:{
      gpmtNumber:complianceText(row.permit&&row.permit.gpmtNumber||"",160),
      expires:/^\d{4}-\d{2}-\d{2}$/.test(String(row.permit&&row.permit.expires||""))?String(row.permit.expires):""
    },
    deadlines:deadlines,
    note:complianceText(row.note||"",4000),
    createdAt:complianceText(row.createdAt||now,60),
    updatedAt:complianceText(row.updatedAt||now,60)
  };
}
let complianceProfiles=STORE.get(COMPLIANCE_KEY,[]);
if(!Array.isArray(complianceProfiles))complianceProfiles=[];
complianceProfiles=complianceProfiles.slice(0,300).map(normalizeComplianceProfile);
let currentComplianceId=complianceProfiles[0]&&complianceProfiles[0].id||null;

function complianceProfile(id){id=id||currentComplianceId;return complianceProfiles.find(function(x){return x.id===id})||null}
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
  if(p.permit.expires)tasks.push({id:"gpmt-expiry",title:p.permit.gpmtNumber?"Kiểm tra thời hạn GPMT "+p.permit.gpmtNumber:"Kiểm tra thời hạn GPMT",date:p.permit.expires,kind:"permit",done:false,note:"Ngày này do người dùng khai báo; cần đối chiếu giấy phép gốc."});
  return tasks.concat(p.deadlines);
}
function complianceUrgent(p){
  return complianceTasks(p).filter(function(x){const d=complianceDays(x.date);return !x.done&&x.date&&d!==null&&d<=30}).sort(function(a,b){return String(a.date).localeCompare(String(b.date))});
}
function complianceStatus(p){
  if(!p)return "Chưa có hồ sơ";
  const urgent=complianceUrgent(p);
  if(urgent.some(function(x){return complianceDays(x.date)<0}))return "Có việc đã quá ngày theo dõi";
  if(urgent.length)return "Có việc sắp đến hạn";
  if(complianceCompleteness(p)<75)return "Cần bổ sung dữ liệu nền";
  const n=complianceTracks(p).length;
  return n>1?n+" nhánh cần đối chiếu":"Sẵn sàng rà căn cứ nền";
}
function saveComplianceProfiles(){
  complianceProfiles=complianceProfiles.map(normalizeComplianceProfile);
  STORE.set(COMPLIANCE_KEY,complianceProfiles);
  renderComplianceWorkspace();renderComplianceHome();renderComplianceRadar();
  if(typeof renderHomePortal==="function")renderHomePortal();
  if(typeof renderWorkspaceStats==="function")renderWorkspaceStats();
}
function complianceTrackHtml(track){
  const docs=track.docs.length?track.docs.slice(0,5).map(function(d){
    return '<button data-open="'+esc(d.id)+'" type="button">'+esc(d.ttl.replace(/\s*\(.*/,""))+'</button>';
  }).join(""):'<span class="muted">Chưa có văn bản khớp trong kho hiện tại.</span>';
  return '<article class="compliance-track"><div><div class="section-kicker">CẦN KIỂM TRA</div><h4>'+esc(track.label)+'</h4><p>'+esc(track.reason)+'</p></div><div class="compliance-track-actions"><button class="tiny" data-compliance-search="'+esc(track.query)+'" type="button">Tra căn cứ →</button></div><div class="compliance-track-docs">'+docs+'</div></article>';
}
function renderComplianceStats(){
  const host=$("complianceStats");if(!host)return;
  const urgent=complianceProfiles.flatMap(complianceUrgent).length;
  const incomplete=complianceProfiles.filter(function(p){return complianceCompleteness(p)<75}).length;
  const trackCount=complianceProfiles.reduce(function(n,p){return n+complianceTracks(p).length},0);
  host.innerHTML='<div><b>'+complianceProfiles.length+'</b><span>Hồ sơ tuân thủ</span></div><div><b>'+urgent+'</b><span>Việc ≤30 ngày</span></div><div><b>'+incomplete+'</b><span>Hồ sơ cần bổ sung</span></div><div><b>'+trackCount+'</b><span>Nhánh đang theo dõi</span></div>';
}
function renderComplianceProfileList(){
  const host=$("complianceProfileList");if(!host)return;
  if(!complianceProfiles.length){
    host.innerHTML='<div class="compliance-empty"><b>Chưa có hồ sơ tuân thủ</b><p>Tạo hồ sơ cho cơ sở, dự án hoặc doanh nghiệp để gom nhánh cần kiểm tra, căn cứ và deadline.</p><button class="btn bp" data-compliance-new type="button">Tạo hồ sơ đầu tiên</button></div>';
    return;
  }
  host.innerHTML=complianceProfiles.map(function(p){
    const urgent=complianceUrgent(p).length;
    return '<button class="compliance-profile-card '+(p.id===currentComplianceId?"on":"")+'" data-compliance-open="'+esc(p.id)+'" type="button"><div><b>'+esc(p.name)+'</b><small>'+complianceProfileTypeLabel(p.profileType)+' · '+esc(p.sector||"Chưa khai lĩnh vực")+'</small></div><span class="compliance-profile-status">'+(urgent?urgent+" việc gần hạn":esc(complianceStatus(p)))+'</span><small>'+complianceCompleteness(p)+'% dữ liệu nền · cập nhật '+new Date(p.updatedAt).toLocaleDateString("vi-VN")+'</small></button>';
  }).join("");
}
function complianceTaskHtml(t){
  const days=complianceDays(t.date),due=t.date?'<span class="deadline-pill '+(days<0?"late":days<=30?"soon":"")+'">'+complianceDueLabel(t.date)+'</span>':"";
  const toggle=t.kind==="manual"?'<button class="tiny" data-compliance-task-toggle="'+esc(t.id)+'" type="button">'+(t.done?"Mở lại":"Hoàn thành")+'</button>':"";
  const del=t.kind==="manual"?'<button class="tiny danger-soft" data-compliance-task-delete="'+esc(t.id)+'" type="button">Xóa</button>':"";
  return '<li class="'+(t.done?"done":"")+'"><div><b>'+esc(t.title)+'</b>'+(t.note?'<small>'+esc(t.note)+'</small>':"")+'</div><div>'+due+toggle+del+'</div></li>';
}
function renderComplianceDetail(){
  const host=$("complianceProfileDetail");if(!host)return;
  const p=complianceProfile();
  if(!p){host.innerHTML='<div class="compliance-empty"><b>Chọn một hồ sơ để xem chi tiết</b><p>Đây là bảng tổ chức việc cần kiểm tra, không phải kết luận đạt/không đạt tuân thủ.</p></div>';return}
  const tracks=complianceTracks(p),unknown=complianceUnknowns(p),tasks=complianceTasks(p);
  host.innerHTML='<div class="compliance-detail-head"><div><div class="section-kicker">'+complianceProfileTypeLabel(p.profileType)+' · '+esc(compliancePhaseLabel(p.phase))+'</div><h2>'+esc(p.name)+'</h2><p>'+esc(p.sector||"Chưa khai lĩnh vực")+(p.location?" · "+esc(p.location):"")+'</p></div><div class="compliance-score"><b>'+complianceCompleteness(p)+'%</b><span>độ đầy đủ dữ liệu nền</span></div></div>'+
    '<div class="compliance-status-line"><b>'+esc(complianceStatus(p))+'</b><span>Không phải kết luận đạt/không đạt tuân thủ.</span></div>'+
    (unknown.length?'<div class="compliance-missing"><b>Còn chưa rõ:</b> '+unknown.slice(0,6).map(esc).join(" · ")+(unknown.length>6?"…":"")+'</div>':"")+
    '<div class="compliance-detail-actions"><button class="btn bs" data-compliance-edit="'+esc(p.id)+'" type="button">Sửa hồ sơ</button><button class="btn bs" data-go="expert" type="button">Rà soát sâu hơn</button><button class="btn bs" data-go="upd" type="button">Xem cập nhật pháp luật</button><button class="btn bs danger-soft" data-compliance-delete="'+esc(p.id)+'" type="button">Xóa hồ sơ</button></div>'+
    '<section class="compliance-section"><div class="compliance-section-head"><div><div class="section-kicker">Ưu tiên</div><h3>Việc cần làm & deadline</h3></div></div><ul class="compliance-task-list">'+(tasks.length?tasks.map(complianceTaskHtml).join(""):'<li class="empty-mini">Chưa có việc theo dõi.</li>')+'</ul><div class="compliance-task-add"><input id="cpTaskTitle" placeholder="Ví dụ: Kiểm tra hạn báo cáo / lịch quan trắc…"><input id="cpTaskDate" type="date"><button class="btn bp" data-compliance-task-add type="button">Thêm việc</button></div><p class="micro-note">Deadline thủ công chỉ là lịch theo dõi của bạn. Hệ thống không tự suy ra hạn pháp lý nếu chưa có dữ liệu đã xác minh.</p></section>'+
    '<section class="compliance-section"><div class="compliance-section-head"><div><div class="section-kicker">Bản đồ nghĩa vụ</div><h3>Nhánh cần đối chiếu</h3></div><small>'+tracks.length+' nhánh theo dữ liệu đã khai</small></div><div class="compliance-track-grid">'+tracks.map(complianceTrackHtml).join("")+'</div></section>'+
    (p.note?'<section class="compliance-section"><div class="section-kicker">Ghi chú hồ sơ</div><p class="compliance-note">'+esc(p.note)+'</p></section>':"");
}
function renderComplianceWorkspace(){
  renderComplianceStats();renderComplianceProfileList();renderComplianceDetail();
  if($("wkCompliance"))$("wkCompliance").textContent=String(complianceProfiles.length);
}
function renderComplianceHome(){
  const host=$("homeCompliancePulse");if(!host)return;
  if(!complianceProfiles.length){
    host.innerHTML='<div class="home-compliance-empty"><div><div class="section-kicker">Theo dõi tuân thủ</div><b>Biến quy định thành việc cần làm</b><p>Tạo hồ sơ cơ sở/dự án để gom căn cứ, nhánh cần kiểm tra và deadline vào một nơi.</p></div><button class="btn bp" data-compliance-new type="button">Tạo hồ sơ tuân thủ</button></div>';
    return;
  }
  const p=complianceProfile(complianceProfiles[0].id)||complianceProfiles[0],urgent=complianceUrgent(p),tracks=complianceTracks(p);
  host.innerHTML='<div class="home-compliance-head"><div><div class="section-kicker">Hồ sơ đang theo dõi</div><h2>'+esc(p.name)+'</h2><p>'+esc(complianceStatus(p))+' · '+complianceCompleteness(p)+'% dữ liệu nền</p></div><button class="btn bs" data-compliance-open="'+esc(p.id)+'" type="button">Mở hồ sơ</button></div><div class="home-compliance-grid"><div><b>'+urgent.length+'</b><span>việc gần hạn</span></div><div><b>'+tracks.length+'</b><span>nhánh cần rà</span></div><div><b>'+complianceUnknowns(p).length+'</b><span>tín hiệu chưa rõ</span></div></div>';
}
function renderComplianceRadar(targetId){
  targetId=targetId||"complianceRadarHub";
  const host=$(targetId);if(!host)return;
  if(!complianceProfiles.length){
    host.innerHTML='<div class="lawhub-callout"><b>Radar theo hồ sơ</b><p style="margin:5px 0 0;font-size:12px">Tạo Hồ sơ tuân thủ để lọc các nhánh cập nhật theo bối cảnh cơ sở/dự án của bạn.</p><button class="tiny" data-compliance-new type="button" style="margin-top:8px">Tạo hồ sơ</button></div>';
    return;
  }
  const p=complianceProfile()||complianceProfiles[0],tracks=complianceTracks(p);
  const docs=[];tracks.forEach(function(t){t.docs.forEach(function(d){if(!docs.some(function(x){return x.id===d.id}))docs.push(d)})});
  host.innerHTML='<section class="compliance-radar"><div class="compliance-radar-head"><div><div class="section-kicker">Radar theo hồ sơ</div><h3>'+esc(p.name)+'</h3><p>Các văn bản dưới đây được ghép theo tín hiệu đã khai; đây là danh sách ưu tiên đọc, không phải kết luận văn bản chắc chắn áp dụng.</p></div><button class="tiny" data-compliance-open="'+esc(p.id)+'" type="button">Mở hồ sơ</button></div><div class="compliance-radar-docs">'+(docs.length?docs.slice(0,8).map(function(d){return '<button data-open="'+d.id+'" type="button"><b>'+esc(d.ttl)+'</b><small>'+d.k+' · '+esc(topicName(d.t))+'</small></button>'}).join(""):'<span class="muted">Chưa có văn bản phù hợp trong kho hiện tại.</span>')+'</div></section>';
}
function fillComplianceEditor(p){
  const values={cpName:p&&p.name||"",cpType:p&&p.profileType||"facility",cpSector:p&&p.sector||"",cpLocation:p&&p.location||"",cpPhase:p&&p.phase||"",cpGpmtNumber:p&&p.permit&&p.permit.gpmtNumber||"",cpGpmtExpires:p&&p.permit&&p.permit.expires||"",cpNote:p&&p.note||"",complianceEditorId:p&&p.id||""};
  Object.keys(values).forEach(function(id){if($(id))$(id).value=values[id]});
  COMPLIANCE_FEATURES.forEach(function(item){const el=$("cp-"+item[0]);if(el)el.value=p&&p.features&&p.features[item[0]]||"unknown"});
  if($("complianceEditor"))$("complianceEditor").open=true;
}
function readComplianceEditor(){
  const old=complianceProfile($("complianceEditorId")&&$("complianceEditorId").value),features={};
  COMPLIANCE_FEATURES.forEach(function(item){features[item[0]]=complianceSignal($("cp-"+item[0])&&$("cp-"+item[0]).value)});
  return normalizeComplianceProfile(Object.assign({},old||{},{
    id:old&&old.id||complianceId(),name:$("cpName")&&$("cpName").value||"Hồ sơ chưa đặt tên",
    profileType:$("cpType")&&$("cpType").value||"facility",sector:$("cpSector")&&$("cpSector").value||"",
    location:$("cpLocation")&&$("cpLocation").value||"",phase:$("cpPhase")&&$("cpPhase").value||"",
    features:features,permit:{gpmtNumber:$("cpGpmtNumber")&&$("cpGpmtNumber").value||"",expires:$("cpGpmtExpires")&&$("cpGpmtExpires").value||""},
    note:$("cpNote")&&$("cpNote").value||"",deadlines:old&&old.deadlines||[],createdAt:old&&old.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()
  }));
}
function saveComplianceEditor(){
  const p=readComplianceEditor(),i=complianceProfiles.findIndex(function(x){return x.id===p.id});
  if(i>=0)complianceProfiles[i]=p;else complianceProfiles.unshift(p);
  currentComplianceId=p.id;saveComplianceProfiles();
  if(typeof logActivity==="function")logActivity("compliance",p.id,"Hồ sơ tuân thủ: "+p.name);
  if($("complianceEditor"))$("complianceEditor").open=false;
  toast("Đã lưu hồ sơ tuân thủ");
}
function addComplianceDeadline(){
  const p=complianceProfile(),title=complianceText($("cpTaskTitle")&&$("cpTaskTitle").value||"",300),date=$("cpTaskDate")&&$("cpTaskDate").value||"";
  if(!p||!title){toast("Nhập tên việc cần theo dõi");return}
  p.deadlines.unshift({id:complianceId("task"),title:title,date:/^\d{4}-\d{2}-\d{2}$/.test(date)?date:"",kind:"manual",note:"",done:false,createdAt:new Date().toISOString()});
  p.updatedAt=new Date().toISOString();saveComplianceProfiles();
}
function createComplianceFromExpertData(d){
  d=d||{};
  const p=normalizeComplianceProfile({name:d.name||"Hồ sơ từ phiếu rà soát",profileType:"project",sector:d.sector||"",location:d.location||"",phase:d.phase||"",features:{water:d.water,air:d.air,ctnh:d.waste,waterUse:d.waterUse,land:d.land,bio:d.bio,knk:d.climate,epr:"unknown",chemical:"unknown"},note:"Tạo từ Phiếu rà soát. Cần kiểm tra lại dữ liệu trước khi sử dụng."});
  complianceProfiles.unshift(p);currentComplianceId=p.id;saveComplianceProfiles();go("work");setTimeout(function(){$("workCompliance")&&$("workCompliance").scrollIntoView({behavior:"smooth",block:"start"})},80);toast("Đã tạo hồ sơ tuân thủ từ phiếu rà soát");return p.id;
}
function createComplianceFromCase(c){
  c=c||{};
  const p=normalizeComplianceProfile({name:c.name||"Hồ sơ từ sàng lọc",profileType:"project",sector:c.input&&c.input.sector||"",location:c.input&&c.input.location||"",phase:c.input&&c.input.phase||"",note:"Tạo từ hồ sơ sàng lọc. Các tín hiệu môi trường cần được bổ sung và đối chiếu."});
  complianceProfiles.unshift(p);currentComplianceId=p.id;saveComplianceProfiles();go("work");setTimeout(function(){$("workCompliance")&&$("workCompliance").scrollIntoView({behavior:"smooth",block:"start"})},80);toast("Đã đưa hồ sơ vào workspace tuân thủ");return p.id;
}
function complianceBackupRows(){return complianceProfiles.map(normalizeComplianceProfile)}
function initComplianceUI(){
  document.body.addEventListener("click",function(e){
    const n=e.target.closest("[data-compliance-new]");if(n){e.preventDefault();go("work");setTimeout(function(){fillComplianceEditor(null);$("workCompliance")&&$("workCompliance").scrollIntoView({behavior:"smooth",block:"start"})},40);return}
    const open=e.target.closest("[data-compliance-open]");if(open){e.preventDefault();currentComplianceId=open.dataset.complianceOpen;go("work");renderComplianceWorkspace();setTimeout(function(){$("workCompliance")&&$("workCompliance").scrollIntoView({behavior:"smooth",block:"start"})},40);return}
    const edit=e.target.closest("[data-compliance-edit]");if(edit){e.preventDefault();fillComplianceEditor(complianceProfiles.find(function(x){return x.id===edit.dataset.complianceEdit}));return}
    const del=e.target.closest("[data-compliance-delete]");if(del){e.preventDefault();const p=complianceProfiles.find(function(x){return x.id===del.dataset.complianceDelete});if(p&&confirm("Xóa hồ sơ tuân thủ “"+p.name+"”? Các deadline thủ công trong hồ sơ cũng sẽ bị xóa.")){complianceProfiles=complianceProfiles.filter(function(x){return x.id!==p.id});currentComplianceId=complianceProfiles[0]&&complianceProfiles[0].id||null;saveComplianceProfiles();toast("Đã xóa hồ sơ tuân thủ")}return}
    const search=e.target.closest("[data-compliance-search]");if(search){e.preventDefault();go("lib");if($("q"))$("q").value=search.dataset.complianceSearch;docs("all",search.dataset.complianceSearch);setTimeout(function(){$("q")&&$("q").focus()},50);return}
    if(e.target.closest("[data-compliance-save]")){e.preventDefault();saveComplianceEditor();return}
    if(e.target.closest("[data-compliance-cancel]")){e.preventDefault();if($("complianceEditor"))$("complianceEditor").open=false;return}
    if(e.target.closest("[data-compliance-task-add]")){e.preventDefault();addComplianceDeadline();return}
    const toggle=e.target.closest("[data-compliance-task-toggle]");if(toggle){const p=complianceProfile(),t=p&&p.deadlines.find(function(x){return x.id===toggle.dataset.complianceTaskToggle});if(t){t.done=!t.done;p.updatedAt=new Date().toISOString();saveComplianceProfiles()}return}
    const tdel=e.target.closest("[data-compliance-task-delete]");if(tdel){const p=complianceProfile();if(p){p.deadlines=p.deadlines.filter(function(x){return x.id!==tdel.dataset.complianceTaskDelete});p.updatedAt=new Date().toISOString();saveComplianceProfiles()}return}
  });
  renderComplianceWorkspace();renderComplianceHome();renderComplianceRadar();
}
