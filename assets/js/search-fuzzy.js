(function(){
'use strict';
let task=null;
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
function rerank(){
 load().then(()=>{const q=document.getElementById('q');if(q?.value.trim()&&typeof docs==='function')docs(typeof curTopic==='function'?curTopic():'all',q.value)}).catch(e=>console.warn(e));
}
window.LEGALOS_SEARCH_LOADER={load};
document.addEventListener('focusin',e=>{if(e.target?.matches?.('#q,#hq'))rerank()});
document.addEventListener('click',e=>{if(e.target?.closest?.('#hgo,[data-go="lib"]'))rerank()});
if('requestIdleCallback'in window)requestIdleCallback(()=>load().catch(()=>{}),{timeout:1600});else setTimeout(()=>load().catch(()=>{}),900);
})();