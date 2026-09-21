(function(){
'use strict';let task=null;
function load(){
 if(window.CCPLMT_CALENDAR_EXPORT?.ready)return Promise.resolve(window.CCPLMT_CALENDAR_EXPORT);
 if(task)return task;
 task=new Promise((resolve,reject)=>{
  const s=document.createElement('script');s.src='assets/optional/calendar-export.js';s.async=true;
  s.onload=()=>window.CCPLMT_CALENDAR_EXPORT?.ready?resolve(window.CCPLMT_CALENDAR_EXPORT):reject(new Error('Calendar export did not initialize'));
  s.onerror=()=>{task=null;reject(new Error('Calendar export failed to load'))};document.head.appendChild(s);
 });
 return task;
}
function warm(){load().then(x=>x.mount?.()).catch(()=>{})}
document.addEventListener('click',e=>{if(e.target?.closest?.('[data-go="work"],[data-compliance-open]'))setTimeout(warm,60)});
document.addEventListener('DOMContentLoaded',()=>{if(document.getElementById('work')?.classList.contains('on'))warm()},{once:true});
new MutationObserver(()=>{if(document.getElementById('work')?.classList.contains('on'))warm()}).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});
window.CCPLMT_CALENDAR_EXPORT_LOADER={load};
})();