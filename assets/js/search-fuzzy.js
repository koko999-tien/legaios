(function(){
'use strict';
let task=null,officialTask=null;
function load(){
 if(window.LEGALOS_SEARCH_V2?.ready)return Promise.resolve(window.LEGALOS_SEARCH_V2);
 if(task)return task;
 task=new Promise((resolve,reject)=>{
  const s=document.createElement('script');s.src='assets/lazy/search-engine.js';s.async=true;
  s.onload=()=>window.LEGALOS_SEARCH_V2?.ready?resolve(window.LEGALOS_SEARCH_V2):reject(new Error('Search engine did not initialize'));
  s.onerror=()=>{task=null;reject(new Error('Search engine failed to load'))};document.head.appendChild(s);
 });
 return task;
}
function ensureOfficialCss(){
 if(document.querySelector('link[data-search-v4-css]'))return;
 const l=document.createElement('link');l.rel='stylesheet';l.href='assets/css/v15-search.css';l.dataset.searchV4Css='1';document.head.appendChild(l);
}
function loadOfficial(){
 if(window.LEGALOS_OFFICIAL_SEARCH_V4?.ready)return Promise.resolve(window.LEGALOS_OFFICIAL_SEARCH_V4);
 if(officialTask)return officialTask;
 ensureOfficialCss();
 officialTask=new Promise((resolve,reject)=>{
  const s=document.createElement('script');s.src='assets/lazy/official-search.js';s.async=true;
  s.onload=()=>window.LEGALOS_OFFICIAL_SEARCH_V4?.ready?resolve(window.LEGALOS_OFFICIAL_SEARCH_V4):reject(new Error('Official Search V4 did not initialize'));
  s.onerror=()=>{officialTask=null;reject(new Error('Official Search V4 failed to load'))};document.head.appendChild(s);
 });
 return officialTask;
}
function rerank(){
 load().then(()=>{const q=document.getElementById('q');if(q?.value.trim()&&typeof docs==='function')docs(typeof curTopic==='function'?curTopic():'all',q.value)}).catch(e=>console.warn(e));
 loadOfficial().then(x=>x.syncQuery?.()).catch(e=>console.warn(e));
}
window.LEGALOS_SEARCH_LOADER={load,loadOfficial};
window.LEGALOS_OFFICIAL_SEARCH_LOADER={load:loadOfficial};
document.addEventListener('focusin',e=>{if(e.target?.matches?.('#q,#hq'))rerank()});
document.addEventListener('click',e=>{if(e.target?.closest?.('#hgo,[data-go="lib"]'))rerank()});
if('requestIdleCallback'in window){
 requestIdleCallback(()=>load().catch(()=>{}),{timeout:1600});
 requestIdleCallback(()=>loadOfficial().catch(()=>{}),{timeout:2600});
}else{
 setTimeout(()=>load().catch(()=>{}),900);
 setTimeout(()=>loadOfficial().catch(()=>{}),1800);
}
})();