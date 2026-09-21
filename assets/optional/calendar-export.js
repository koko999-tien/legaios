(function(){
'use strict';
function escIcs(v){return String(v||'').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,')}
function ymd(v){return String(v||'').replace(/-/g,'')}
function nextDate(v){const d=new Date(v+'T00:00:00');if(Number.isNaN(d.getTime()))return'';d.setDate(d.getDate()+1);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('')}
function stamp(){return new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}
function slug(v){return String(v||'lich-tuan-thu').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,70)||'lich-tuan-thu'}
function rows(){
 if(typeof complianceProfile!=='function'||typeof complianceCalendarItems!=='function')return{profile:null,items:[]};
 const profile=complianceProfile();if(!profile)return{profile:null,items:[]};
 return{profile,items:complianceCalendarItems(profile).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(String(x.date||''))).slice(0,250)}
}
function build(profile,items){
 const now=stamp(),lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Can cu Phap ly Moi truong//Compliance Calendar//VI','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:'+escIcs('Tuân thủ · '+(profile.name||'Hồ sơ'))];
 items.forEach((x,i)=>{
  const uid=escIcs(['ccplmt',profile.id||'profile',x.refId||x.id||i,x.date].join('-'))+'@local';
  const desc=[x.source||'',x.projected?'Mốc dự kiến theo chu kỳ do người dùng cấu hình.':'Mốc theo dữ liệu đang lưu.','Theo dõi nội bộ; không xác nhận thời hạn pháp lý.'].filter(Boolean).join('\n');
  lines.push('BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+now,'DTSTART;VALUE=DATE:'+ymd(x.date),'DTEND;VALUE=DATE:'+ymd(nextDate(x.date)),'SUMMARY:'+escIcs(x.title||'Mốc tuân thủ'),'DESCRIPTION:'+escIcs(desc),'CATEGORIES:'+escIcs('Môi trường,Tuân thủ'),'END:VEVENT');
 });
 lines.push('END:VCALENDAR');return lines.join('\r\n')+'\r\n'
}
function download(){
 const {profile,items}=rows();if(!profile){typeof toast==='function'&&toast('Chọn hoặc tạo Hồ sơ tuân thủ trước');return}
 if(!items.length){typeof toast==='function'&&toast('Hồ sơ này chưa có mốc lịch để xuất');return}
 const blob=new Blob([build(profile,items)],{type:'text/calendar;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='Lich-tuan-thu-'+slug(profile.name)+'.ics';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);typeof toast==='function'&&toast('Đã xuất '+items.length+' mốc lịch .ics')
}
function mount(){
 const head=document.querySelector('.compliance-calendar .compliance-section-head');if(!head||head.querySelector('[data-calendar-export-ics]'))return;
 const b=document.createElement('button');b.type='button';b.className='tiny';b.dataset.calendarExportIcs='1';b.textContent='Xuất .ics';b.title='Xuất lịch để nhập vào Google Calendar, Outlook hoặc ứng dụng lịch';head.appendChild(b)
}
document.addEventListener('click',e=>{if(e.target?.closest?.('[data-calendar-export-ics]'))download();const nav=e.target?.closest?.('[data-go="work"],[data-compliance-open]');if(nav)setTimeout(mount,80)});
const obs=new MutationObserver(()=>mount());obs.observe(document.documentElement,{subtree:true,childList:true});document.addEventListener('DOMContentLoaded',mount,{once:true});
window.CCPLMT_CALENDAR_EXPORT={build,rows,download,mount,ready:true};
})();