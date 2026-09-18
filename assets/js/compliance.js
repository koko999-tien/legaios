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
      gpmtNumber:complianceText(row.permit&&row.permit.gpmtNumber||"",160),
      expires:/^\d{4}-\d{2}-\d{2}$/.test(String(row.permit&&row.permit.expires||""))?String(row.permit.expires):""
    },
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
  o.occurrenceHistory=o.occurrenceHistory||[];
  o.occurrenceHistory.push({id:complianceId("occ"),dueDate:o.dueDate,completedAt:new Date().toISOString()});
  o.occurrenceHistory=o.occurrenceHistory.slice(-120);
  const next=complianceNextOccurrence(o.dueDate,o.recurrence);
  o.dueDate=next;
  if(o.status==="verify")o.status="active";
  o.updatedAt=new Date().toISOString();
  p.updatedAt=o.updatedAt;
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
  if(p.permit.expires)rows.push({id:"permit:gpmt",date:p.permit.expires,title:p.permit.gpmtNumber?"Kiểm tra thời hạn GPMT "+p.permit.gpmtNumber:"Kiểm tra thời hạn GPMT",type:"permit",source:"Ngày do người dùng khai báo từ hồ sơ",refId:""});
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
function complianceCalendarHtml(p){
  const items=complianceCalendarItems(p);
  const today=new Date();today.setHours(0,0,0,0);
  const cutoff=new Date(today);cutoff.setDate(cutoff.getDate()+90);
  const visible=items.filter(function(x){
    const d=new Date(x.date+"T00:00:00");return d<=cutoff;
  }).slice(0,40);
  if(!visible.length)return '<div class="calendar-empty"><b>Chưa có mốc trong 90 ngày tới</b><p>Thêm deadline hoặc ngày đến hạn cho nghĩa vụ để xây lịch công việc.</p></div>';
  const groups={};
  visible.forEach(function(item){
    const key=item.date.slice(0,7);(groups[key]||(groups[key]=[])).push(item);
  });
  return Object.keys(groups).map(function(key){
    const d=new Date(key+"-01T00:00:00");
    const label=d.toLocaleDateString("vi-VN",{month:"long",year:"numeric"});
    return '<section class="calendar-month"><h4>'+esc(label)+'</h4><div>'+groups[key].map(function(item){
      const days=complianceDays(item.date),cls=days!==null&&days<0?"late":days!==null&&days<=15?"soon":"";
      return '<article class="calendar-item '+cls+(item.projected?" projected":"")+'"><time datetime="'+esc(item.date)+'"><b>'+esc(item.date.slice(8,10))+'</b><span>'+esc(item.date.slice(5,7))+'</span></time><div><b>'+esc(item.title)+'</b><small>'+esc(item.source)+'</small></div>'+(item.type==="obligation"&&!item.projected?'<button class="tiny" data-obligation-edit="'+esc(item.refId)+'" type="button">Mở</button>':'')+'</article>';
    }).join("")+'</div></section>';
  }).join("");
}
function complianceEvidenceResolved(ref){
  return typeof importedDocs!=="undefined"&&importedDocs.some(function(x){return x.id===ref.id});
}
function complianceLegalDoc(id){return id?D.find(function(d){return d.id===id})||null:null}
function complianceObligationHtml(o){
  const doc=complianceLegalDoc(o.legalDocId),days=complianceDays(o.dueDate);
  const due=o.dueDate?'<span class="deadline-pill '+(days<0?"late":days<=30?"soon":"")+'">'+complianceDueLabel(o.dueDate)+'</span>':"";
  const evidence=o.evidence.length?o.evidence.map(function(ref){
    const ok=complianceEvidenceResolved(ref);
    return '<span class="obligation-evidence '+(ok?"":"missing")+'" title="'+(ok?"Tài liệu đang có trên thiết bị":"Tài liệu tham chiếu không có trên thiết bị này")+'">'+(ok?"✓ ":"⚠ ")+esc(ref.name||ref.id)+'</span>';
  }).join(""):'<span class="muted">Chưa gắn bằng chứng</span>';
  return '<article class="obligation-row" data-obligation-row="'+esc(o.id)+'">'+
    '<div class="obligation-main"><div class="obligation-title-line"><span class="obligation-status '+esc(o.status)+'">'+esc(complianceObligationStatusLabel(o.status))+'</span><b>'+esc(o.title)+'</b></div>'+
    '<div class="obligation-meta">'+(o.owner?'<span>Phụ trách: '+esc(o.owner)+'</span>':'<span>Chưa giao người phụ trách</span>')+(o.dueDate?'<span>'+esc(complianceDueBasisLabel(o.dueBasis))+' · '+esc(o.dueDate)+'</span>':'<span>Chưa có deadline</span>')+(o.recurrence!=="none"?'<span>'+esc(complianceRecurrenceLabel(o.recurrence))+'</span>':'')+'</div>'+
    (doc?'<button class="obligation-source" data-open="'+esc(doc.id)+'" type="button"><b>Căn cứ:</b> '+esc(doc.ttl)+'</button>':o.legalRef?'<div class="obligation-source text-only"><b>Căn cứ ghi chú:</b> '+esc(o.legalRef)+'</div>':'<div class="obligation-source text-only muted">Chưa gắn căn cứ</div>')+
    '<div class="obligation-evidence-list">'+evidence+'</div>'+
    (o.evidenceNote?'<p class="obligation-note"><b>Bằng chứng:</b> '+esc(o.evidenceNote)+'</p>':"")+
    (o.note?'<p class="obligation-note">'+esc(o.note)+'</p>':"")+
    '</div><div class="obligation-side">'+due+(o.recurrence!=="none"&&o.dueDate?'<button class="tiny" data-obligation-complete-period="'+esc(o.id)+'" type="button">Hoàn thành kỳ này</button>':'')+'<button class="tiny" data-obligation-edit="'+esc(o.id)+'" type="button">Sửa</button><button class="tiny danger-soft" data-obligation-delete="'+esc(o.id)+'" type="button">Xóa</button></div></article>';
}
function complianceObligationOptions(selected){
  return '<option value="">Chưa gắn văn bản</option>'+D.map(function(d){return '<option value="'+esc(d.id)+'" '+(d.id===selected?"selected":"")+'>'+esc(d.ttl)+'</option>'}).join("");
}
function complianceEvidenceChecklist(selected){
  selected=Array.isArray(selected)?selected:[];
  if(typeof importedDocs==="undefined"||!importedDocs.length)return '<div class="obligation-no-evidence">Chưa có tài liệu nhập. Bạn vẫn có thể ghi mô tả bằng chứng, hoặc sang “Nhập tài liệu” để thêm PDF/Word.</div>';
  return importedDocs.slice(0,80).map(function(f){
    const checked=selected.some(function(x){return x.id===f.id});
    return '<label class="obligation-evidence-choice"><input type="checkbox" data-obligation-evidence-id="'+esc(f.id)+'" data-obligation-evidence-name="'+esc(f.name)+'" '+(checked?"checked":"")+'><span><b>'+esc(f.name)+'</b><small>.'+esc(f.ext||"file")+' · '+esc(importCategoryName(f.category))+'</small></span></label>';
  }).join("");
}
function obligationEditorHtml(p,o){
  o=o||{id:"",title:"",branch:"env",status:"verify",legalDocId:"",legalRef:"",owner:"",dueDate:"",dueBasis:"manual",dueSource:"",recurrence:"none",occurrenceHistory:[],evidence:[],evidenceNote:"",note:""};
  return '<details class="obligation-editor" id="obligationEditor" open><summary><span><b>'+(o.id?"Chỉnh sửa mục nghĩa vụ":"Thêm mục nghĩa vụ")+'</b><small>Trạng thái do người dùng quản lý; hệ thống không tự kết luận tuân thủ.</small></span><span>⌄</span></summary>'+
  '<div class="obligation-editor-body"><input id="obligationEditorId" type="hidden" value="'+esc(o.id||"")+'"><div class="obligation-form-grid">'+
  '<label><span>Tên nghĩa vụ / việc cần xác minh *</span><input id="oblTitle" value="'+esc(o.title||"")+'" placeholder="Ví dụ: Xác minh yêu cầu quan trắc định kỳ"></label>'+
  '<label><span>Nhánh</span><select id="oblBranch">'+COMPLIANCE_TRACKS.map(function(t){return '<option value="'+esc(t.id)+'" '+(t.id===o.branch?"selected":"")+'>'+esc(t.label)+'</option>'}).join("")+'</select></label>'+
  '<label><span>Trạng thái</span><select id="oblStatus"><option value="verify" '+(o.status==="verify"?"selected":"")+'>Cần xác minh</option><option value="active" '+(o.status==="active"?"selected":"")+'>Đang thực hiện</option><option value="met" '+(o.status==="met"?"selected":"")+'>Đã đáp ứng</option><option value="not_applicable" '+(o.status==="not_applicable"?"selected":"")+'>Không áp dụng · người dùng đánh dấu</option></select></label>'+
  '<label><span>Người phụ trách</span><input id="oblOwner" value="'+esc(o.owner||"")+'" placeholder="Tên / bộ phận"></label>'+
  '<label class="wide"><span>Căn cứ chính</span><select id="oblLegalDoc">'+complianceObligationOptions(o.legalDocId)+'</select></label>'+
  '<label class="wide"><span>Điều/Khoản hoặc ghi chú căn cứ</span><input id="oblLegalRef" value="'+esc(o.legalRef||"")+'" placeholder="Ví dụ: Điều 39, khoản 2; cần đối chiếu phụ lục…"></label>'+
  '<label><span>Deadline / kỳ tiếp theo</span><input id="oblDueDate" type="date" value="'+esc(o.dueDate||"")+'"></label>'+
  '<label><span>Chu kỳ theo dõi</span><select id="oblRecurrence"><option value="none" '+(o.recurrence==="none"?"selected":"")+'>Không lặp</option><option value="monthly" '+(o.recurrence==="monthly"?"selected":"")+'>Hàng tháng</option><option value="quarterly" '+(o.recurrence==="quarterly"?"selected":"")+'>Hàng quý</option><option value="yearly" '+(o.recurrence==="yearly"?"selected":"")+'>Hàng năm</option></select></label>'+
  '<label><span>Nguồn deadline</span><select id="oblDueBasis"><option value="manual" '+(o.dueBasis==="manual"?"selected":"")+'>Người dùng nhập</option><option value="permit" '+(o.dueBasis==="permit"?"selected":"")+'>Theo giấy phép/hồ sơ</option><option value="legal_source" '+(o.dueBasis==="legal_source"?"selected":"")+'>Theo căn cứ pháp luật</option><option value="verified" '+(o.dueBasis==="verified"?"selected":"")+'>Người dùng đánh dấu: đã đối chiếu nguồn</option></select></label>'+
  '<label class="wide"><span>Mô tả nguồn deadline</span><input id="oblDueSource" value="'+esc(o.dueSource||"")+'" placeholder="Số giấy phép, Điều/Khoản, nguồn chính thức hoặc lý do đặt lịch"></label>'+
  '</div><div class="obligation-evidence-editor"><div><b>Bằng chứng / tài liệu liên quan</b><span>Chỉ lưu tham chiếu tới file đã nhập; backup workspace không chứa file gốc.</span></div><div class="obligation-evidence-choices">'+complianceEvidenceChecklist(o.evidence)+'</div><label><span>Mô tả bằng chứng</span><textarea id="oblEvidenceNote" rows="2" placeholder="Ví dụ: Biên bản ngày…, báo cáo quan trắc quý…, chứng từ CTNH…">'+esc(o.evidenceNote||"")+'</textarea></label></div>'+
  '<label class="obligation-note-field"><span>Ghi chú</span><textarea id="oblNote" rows="3" placeholder="Việc còn thiếu, cách xác minh, kết quả trao đổi…">'+esc(o.note||"")+'</textarea></label>'+
  '<div class="obligation-editor-actions"><button class="btn bs" data-obligation-cancel type="button">Hủy</button><button class="btn bp" data-obligation-save type="button">Lưu vào Sổ nghĩa vụ</button></div></div></details>';
}
function openObligationEditor(obligationId,seed){
  const p=complianceProfile();if(!p){toast("Tạo Hồ sơ tuân thủ trước");return}
  const host=$("obligationEditorMount");if(!host)return;
  const found=p.obligations.find(function(x){return x.id===obligationId})||null;
  const base=found||Object.assign({id:"",title:"",branch:"env",status:"verify",legalDocId:"",legalRef:"",owner:"",dueDate:"",dueBasis:"manual",dueSource:"",recurrence:"none",occurrenceHistory:[],evidence:[],evidenceNote:"",note:""},seed||{});
  host.innerHTML=obligationEditorHtml(p,base);
  $("obligationEditor")&&$("obligationEditor").scrollIntoView({behavior:"smooth",block:"center"});
}
function readObligationEditor(){
  const evidence=[...document.querySelectorAll("#obligationEditor [data-obligation-evidence-id]:checked")].map(function(el){return {id:el.dataset.obligationEvidenceId,name:el.dataset.obligationEvidenceName||""}});
  return {
    id:$("obligationEditorId")&&$("obligationEditorId").value||complianceId("obl"),
    title:complianceText($("oblTitle")&&$("oblTitle").value||"",300),
    branch:complianceText($("oblBranch")&&$("oblBranch").value||"env",80),
    status:$("oblStatus")&&$("oblStatus").value||"verify",
    legalDocId:complianceText($("oblLegalDoc")&&$("oblLegalDoc").value||"",120),
    legalRef:complianceText($("oblLegalRef")&&$("oblLegalRef").value||"",500),
    owner:complianceText($("oblOwner")&&$("oblOwner").value||"",180),
    dueDate:$("oblDueDate")&&$("oblDueDate").value||"",
    dueBasis:$("oblDueBasis")&&$("oblDueBasis").value||"manual",
    dueSource:complianceText($("oblDueSource")&&$("oblDueSource").value||"",500),
    recurrence:["none","monthly","quarterly","yearly"].includes($("oblRecurrence")&&$("oblRecurrence").value)?$("oblRecurrence").value:"none",
    evidence:evidence,
    evidenceNote:complianceText($("oblEvidenceNote")&&$("oblEvidenceNote").value||"",1200),
    note:complianceText($("oblNote")&&$("oblNote").value||"",2000),
    updatedAt:new Date().toISOString()
  };
}
function saveObligationEditor(){
  const p=complianceProfile(),row=readObligationEditor();if(!p)return;
  if(!row.title){toast("Nhập tên nghĩa vụ hoặc việc cần xác minh");return}
  const i=p.obligations.findIndex(function(x){return x.id===row.id});
  if(i>=0)p.obligations[i]=Object.assign({},p.obligations[i],row);else p.obligations.unshift(Object.assign({createdAt:new Date().toISOString(),occurrenceHistory:[]},row));
  p.updatedAt=new Date().toISOString();saveComplianceProfiles();if(typeof logActivity==="function")logActivity("obligation",row.id,"Nghĩa vụ: "+row.title);toast("Đã lưu vào Sổ nghĩa vụ");
}
function addTrackAsObligation(trackId){
  const p=complianceProfile(),t=COMPLIANCE_TRACKS.find(function(x){return x.id===trackId});if(!p||!t)return;
  const first=t.refs.find(function(id){return D.some(function(d){return d.id===id})})||"";
  openObligationEditor("",{title:"Rà soát "+t.label,branch:t.id,status:"verify",legalDocId:first,legalRef:t.reason});
}
function addDocumentAsObligation(docId){
  const p=complianceProfile();if(!p){go("work");setTimeout(function(){toast("Tạo Hồ sơ tuân thủ trước khi gắn văn bản vào Sổ nghĩa vụ")},50);return}
  const d=D.find(function(x){return x.id===docId});if(!d)return;
  go("work");renderComplianceWorkspace();setTimeout(function(){
    openObligationEditor("",{title:"Xác minh nghĩa vụ liên quan "+d.ttl,legalDocId:d.id,status:"verify"});
  },80);
}
function complianceReportMarkdown(p){
  if(!p)return "";
  const lines=["# Báo cáo theo dõi tuân thủ — "+p.name,"","- Loại hồ sơ: "+complianceProfileTypeLabel(p.profileType),"- Lĩnh vực: "+(p.sector||"Chưa khai"),"- Địa điểm: "+(p.location||"Chưa khai"),"- Giai đoạn: "+compliancePhaseLabel(p.phase),"- Xuất lúc: "+new Date().toISOString(),"","> Đây là báo cáo tổ chức công việc từ dữ liệu người dùng và lớp tra cứu. Không thay thế văn bản gốc hoặc kết luận của cơ quan có thẩm quyền.","","## Sổ nghĩa vụ"];
  if(!p.obligations.length)lines.push("Chưa có mục nghĩa vụ.");
  p.obligations.forEach(function(o,i){
    const d=complianceLegalDoc(o.legalDocId);
    lines.push("",(i+1)+". **"+o.title+"**","   - Trạng thái: "+complianceObligationStatusLabel(o.status),"   - Người phụ trách: "+(o.owner||"Chưa giao"),"   - Căn cứ: "+(d?d.ttl:(o.legalRef||"Chưa gắn")),"   - Deadline/kỳ tiếp theo: "+(o.dueDate||"Chưa có")+" · "+complianceDueBasisLabel(o.dueBasis),"   - Chu kỳ theo dõi: "+complianceRecurrenceLabel(o.recurrence),"   - Số kỳ đã hoàn thành: "+(o.occurrenceHistory||[]).length,"   - Nguồn deadline: "+(o.dueSource||"Chưa ghi"),"   - Bằng chứng: "+(o.evidence.length?o.evidence.map(function(x){return x.name||x.id}).join("; "):"Chưa gắn"),"   - Mô tả bằng chứng: "+(o.evidenceNote||"Chưa ghi"),"   - Ghi chú: "+(o.note||""));
  });
  lines.push("","## Việc cần làm & deadline");
  complianceTasks(p).forEach(function(t){lines.push("- "+(t.done?"[x] ":"[ ] ")+t.title+(t.date?" — "+t.date:""))});
  return lines.join("\n");
}
function exportComplianceReport(){
  const p=complianceProfile();if(!p)return;
  const blob=new Blob([complianceReportMarkdown(p)],{type:"text/markdown;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="bao-cao-tuan-thu-"+p.id+".md";a.click();setTimeout(function(){URL.revokeObjectURL(a.href)},500);
}
function complianceStatus(p){
  if(!p)return "Chưa có hồ sơ";
  const urgent=complianceUrgent(p),oblUrgent=complianceObligationUrgent(p);
  if(urgent.some(function(x){return complianceDays(x.date)<0})||oblUrgent.some(function(x){return complianceDays(x.dueDate)<0}))return "Có nghĩa vụ/việc đã quá ngày theo dõi";
  if(urgent.length||oblUrgent.length)return "Có nghĩa vụ/việc sắp đến hạn";
  if(complianceOpenObligations(p).length)return complianceOpenObligations(p).length+" mục nghĩa vụ đang mở";
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
  return '<article class="compliance-track"><div><div class="section-kicker">CẦN KIỂM TRA</div><h4>'+esc(track.label)+'</h4><p>'+esc(track.reason)+'</p></div><div class="compliance-track-actions"><button class="tiny" data-compliance-search="'+esc(track.query)+'" type="button">Tra căn cứ →</button><button class="tiny" data-track-to-obligation="'+esc(track.id)+'" type="button">+ Sổ nghĩa vụ</button></div><div class="compliance-track-docs">'+docs+'</div></article>';
}
function renderComplianceStats(){
  const host=$("complianceStats");if(!host)return;
  const urgent=complianceProfiles.flatMap(complianceUrgent).length+complianceProfiles.flatMap(complianceObligationUrgent).length;
  const openObl=complianceProfiles.reduce(function(n,p){return n+complianceOpenObligations(p).length},0);
  const incomplete=complianceProfiles.filter(function(p){return complianceCompleteness(p)<75}).length;
  host.innerHTML='<div><b>'+complianceProfiles.length+'</b><span>Hồ sơ tuân thủ</span></div><div><b>'+openObl+'</b><span>Nghĩa vụ đang mở</span></div><div><b>'+urgent+'</b><span>Mục ≤30 ngày</span></div><div><b>'+incomplete+'</b><span>Hồ sơ cần bổ sung</span></div>';
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
    '<div class="compliance-detail-actions"><button class="btn bs" data-compliance-edit="'+esc(p.id)+'" type="button">Sửa hồ sơ</button><button class="btn bs" data-go="expert" type="button">Rà soát sâu hơn</button><button class="btn bs" data-go="upd" type="button">Xem cập nhật pháp luật</button><button class="btn bs" data-compliance-report type="button">Xuất báo cáo</button><button class="btn bs danger-soft" data-compliance-delete="'+esc(p.id)+'" type="button">Xóa hồ sơ</button></div>'+
    '<section class="compliance-section obligation-register"><div class="compliance-section-head"><div><div class="section-kicker">Sổ nghĩa vụ tuân thủ</div><h3>Căn cứ · trách nhiệm · deadline · bằng chứng</h3></div><div class="obligation-register-actions"><span>'+p.obligations.length+' mục</span><button class="tiny" data-obligation-new type="button">+ Thêm nghĩa vụ</button></div></div><p class="micro-note">Trạng thái do người dùng quản lý. “Đã đáp ứng” hoặc “Không áp dụng” không phải kết luận của hệ thống.</p><div class="obligation-list">'+(p.obligations.length?p.obligations.map(complianceObligationHtml).join(""):'<div class="obligation-empty"><b>Chưa có mục nghĩa vụ</b><p>Thêm thủ công, hoặc dùng nút “+ Sổ nghĩa vụ” ở các nhánh cần đối chiếu bên dưới.</p></div>')+'</div><div id="obligationEditorMount"></div></section>'+
    '<section class="compliance-section compliance-calendar"><div class="compliance-section-head"><div><div class="section-kicker">Lịch tuân thủ</div><h3>90 ngày tới</h3></div><small>Chỉ dùng mốc người dùng nhập hoặc đã gắn nguồn</small></div><div class="calendar-board">'+complianceCalendarHtml(p)+'</div></section>'+
    '<section class=\"compliance-section\"><div class=\"compliance-section-head\"><div><div class=\"section-kicker\">Ưu tiên</div><h3>Việc cần làm & deadline</h3></div></div><ul class="compliance-task-list">'+(tasks.length?tasks.map(complianceTaskHtml).join(""):'<li class="empty-mini">Chưa có việc theo dõi.</li>')+'</ul><div class="compliance-task-add"><input id="cpTaskTitle" placeholder="Ví dụ: Kiểm tra hạn báo cáo / lịch quan trắc…"><input id="cpTaskDate" type="date"><button class="btn bp" data-compliance-task-add type="button">Thêm việc</button></div><p class="micro-note">Deadline thủ công chỉ là lịch theo dõi của bạn. Hệ thống không tự suy ra hạn pháp lý nếu chưa có dữ liệu đã xác minh.</p></section>'+
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
    host.innerHTML='<div class="home-compliance-head"><div><div class="section-kicker">BÀN LÀM VIỆC TUÂN THỦ</div><h2>Chưa có hồ sơ theo dõi</h2><p>Tạo hồ sơ đầu tiên để quản lý nghĩa vụ, deadline, bằng chứng và radar pháp luật.</p></div><button class="btn bp" data-compliance-new type="button">+ Tạo hồ sơ</button></div><div class="home-compliance-grid"><div><b>0</b><span>hồ sơ</span></div><div><b>0</b><span>nghĩa vụ đang mở</span></div><div><b>0</b><span>mục gần hạn</span></div><div><b>0</b><span>văn bản ưu tiên</span></div></div>';
    return;
  }
  const p=complianceProfile(complianceProfiles[0].id)||complianceProfiles[0],urgent=complianceUrgent(p).length+complianceObligationUrgent(p).length,tracks=complianceTracks(p),openObl=complianceOpenObligations(p).length;
  const radarDocs=new Set();p.obligations.forEach(function(o){if(o.legalDocId)radarDocs.add(o.legalDocId)});tracks.forEach(function(t){t.docs.forEach(function(d){radarDocs.add(d.id)})});
  host.innerHTML='<div class="home-compliance-head"><div><div class="section-kicker">BÀN LÀM VIỆC TUÂN THỦ</div><h2>'+esc(p.name)+'</h2><p>'+esc(complianceStatus(p))+' · '+complianceCompleteness(p)+'% dữ liệu nền</p></div><button class="btn bs" data-compliance-open="'+esc(p.id)+'" type="button">Mở hồ sơ</button></div><div class="home-compliance-grid"><div><b>'+openObl+'</b><span>nghĩa vụ đang mở</span></div><div><b>'+urgent+'</b><span>mục gần hạn</span></div><div><b>'+tracks.length+'</b><span>nhánh cần rà</span></div><div><b>'+radarDocs.size+'</b><span>văn bản ưu tiên</span></div></div>';
}
function renderComplianceRadar(targetId){
  targetId=targetId||"complianceRadarHub";
  const host=$(targetId);if(!host)return;
  if(!complianceProfiles.length){
    host.innerHTML='<div class="lawhub-callout"><b>Radar theo hồ sơ</b><p style="margin:5px 0 0;font-size:12px">Tạo Hồ sơ tuân thủ để lọc các nhánh cập nhật theo bối cảnh cơ sở/dự án của bạn.</p><button class="tiny" data-compliance-new type="button" style="margin-top:8px">Tạo hồ sơ</button></div>';
    return;
  }
  const p=complianceProfile()||complianceProfiles[0],tracks=complianceTracks(p);
  const docs=[];p.obligations.forEach(function(o){const d=complianceLegalDoc(o.legalDocId);if(d&&!docs.some(function(x){return x.id===d.id}))docs.push(d)});tracks.forEach(function(t){t.docs.forEach(function(d){if(!docs.some(function(x){return x.id===d.id}))docs.push(d)})});
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
    note:$("cpNote")&&$("cpNote").value||"",deadlines:old&&old.deadlines||[],obligations:old&&old.obligations||[],createdAt:old&&old.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()
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
    if(e.target.closest("[data-obligation-new]")){e.preventDefault();openObligationEditor("",{});return}
    const oe=e.target.closest("[data-obligation-edit]");if(oe){e.preventDefault();openObligationEditor(oe.dataset.obligationEdit);return}
    const oc=e.target.closest("[data-obligation-complete-period]");if(oc){e.preventDefault();complianceCompleteOccurrence(oc.dataset.obligationCompletePeriod);return}
    const od=e.target.closest("[data-obligation-delete]");if(od){e.preventDefault();const p=complianceProfile();if(p&&confirm("Xóa mục nghĩa vụ này khỏi sổ?")){p.obligations=p.obligations.filter(function(x){return x.id!==od.dataset.obligationDelete});p.updatedAt=new Date().toISOString();saveComplianceProfiles();toast("Đã xóa mục nghĩa vụ")}return}
    if(e.target.closest("[data-obligation-save]")){e.preventDefault();saveObligationEditor();return}
    if(e.target.closest("[data-obligation-cancel]")){e.preventDefault();const host=$("obligationEditorMount");if(host)host.innerHTML="";return}
    const to=e.target.closest("[data-track-to-obligation]");if(to){e.preventDefault();addTrackAsObligation(to.dataset.trackToObligation);return}
    const fd=e.target.closest("[data-obligation-from-doc]");if(fd){e.preventDefault();addDocumentAsObligation(fd.dataset.obligationFromDoc);return}
    if(e.target.closest("[data-compliance-report]")){e.preventDefault();exportComplianceReport();return}
    const toggle=e.target.closest("[data-compliance-task-toggle]");if(toggle){const p=complianceProfile(),t=p&&p.deadlines.find(function(x){return x.id===toggle.dataset.complianceTaskToggle});if(t){t.done=!t.done;p.updatedAt=new Date().toISOString();saveComplianceProfiles()}return}
    const tdel=e.target.closest("[data-compliance-task-delete]");if(tdel){const p=complianceProfile();if(p){p.deadlines=p.deadlines.filter(function(x){return x.id!==tdel.dataset.complianceTaskDelete});p.updatedAt=new Date().toISOString();saveComplianceProfiles()}return}
  });
  renderComplianceWorkspace();renderComplianceHome();renderComplianceRadar();
}
