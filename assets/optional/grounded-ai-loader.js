(function(){
'use strict';let task=null;
function load(){
 if(window.CCPLMT_GROUNDED_AI?.ready)return Promise.resolve(window.CCPLMT_GROUNDED_AI);
 if(task)return task;
 task=new Promise((resolve,reject)=>{
   const s=document.createElement('script');s.src='assets/optional/grounded-ai.js';s.async=true;
   s.onload=()=>window.CCPLMT_GROUNDED_AI?.ready?resolve(window.CCPLMT_GROUNDED_AI):reject(new Error('Grounded AI did not initialize'));
   s.onerror=()=>{task=null;reject(new Error('Grounded AI failed to load'))};document.head.appendChild(s);
 });
 return task;
}
function warm(){load().then(x=>x.sync?.()).catch(()=>{})}
document.addEventListener('focusin',e=>{if(e.target?.id==='groundedAiQuestion')warm()});
document.addEventListener('click',e=>{const a=e.target?.closest?.('#groundedAiAsk'),c=e.target?.closest?.('#groundedAiClear');if(!a&&!c||window.CCPLMT_GROUNDED_AI?.ready)return;e.stopImmediatePropagation();load().then(x=>a?x.ask():x.clear()).catch(()=>{})});
window.CCPLMT_GROUNDED_AI_LOADER={load};
})();