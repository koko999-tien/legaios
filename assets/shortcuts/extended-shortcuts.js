(function(){
'use strict';
const MAP={
 '1':{page:'home',label:'Trang chủ'},'2':{page:'lib',label:'Kho văn bản'},'3':{page:'expert',label:'Rà soát hồ sơ'},
 '4':{page:'work',label:'Hồ sơ tuân thủ'},'5':{page:'proc',label:'Lộ trình thủ tục'},'6':{page:'upd',label:'Cập nhật pháp luật'},
 '7':{page:'term',label:'Thuật ngữ'},'8':{page:'info',label:'Thông tin'}
};
function typing(){
 const el=document.activeElement,tag=el?.tagName;
 return !!(el?.isContentEditable||tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')
}
function onKey(e){
 if(e.repeat||e.defaultPrevented)return;
 const key=String(e.key||'').toLowerCase();
 if((e.ctrlKey||e.metaKey)&&!e.altKey&&!e.shiftKey&&key==='e'){
  if(typing())return;
  const b=document.getElementById('exportW');if(!b)return;
  e.preventDefault();b.click();return;
 }
 if(e.altKey&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&MAP[e.key]){
  if(typing())return;
  e.preventDefault();if(typeof go==='function')go(MAP[e.key].page);
 }
}
function addShortcut(key,label){
 const grid=document.querySelector('#shortcutsModal .shortcut-grid');if(!grid||grid.querySelector('[data-v17-shortcut="'+key+'"]'))return;
 const item=document.createElement('div');item.dataset.v17Shortcut=key;const k=document.createElement('span'),b=document.createElement('b');k.className='shortcut';k.textContent=key;b.textContent=label;item.append(k,b);grid.append(item)
}
function mount(){
 addShortcut('Ctrl E','Xuất JSON workspace');
 Object.entries(MAP).forEach(([n,x])=>addShortcut('Alt '+n,x.label))
}
document.addEventListener('keydown',onKey);
document.addEventListener('DOMContentLoaded',mount,{once:true});
window.LEGALOS_EXTENDED_SHORTCUTS={ready:true,map:MAP};
})();