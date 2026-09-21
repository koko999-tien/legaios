(function(){
'use strict';
const PAGES=new Set(['home','lib','corekb','expert','proc','pone','cls','fee','term','import','work','memo','upd','info','art']);
let applying=false,replaceTimer=null;
const baseGo=window.go,baseOpenDoc=window.openDoc,baseOpenProc=window.openProc;
if(typeof baseGo!=='function'||typeof baseOpenDoc!=='function'||typeof baseOpenProc!=='function')return;

function url(){
  try{return new URL(location.href)}catch{return null}
}
function write(page,extra={},mode='push'){
  if(applying)return;
  const u=url();if(!u)return;
  if(page&&page!=='home')u.searchParams.set('page',page);else u.searchParams.delete('page');
  if(page!=='art'){u.searchParams.delete('doc');u.searchParams.delete('focus')}
  if(page!=='pone')u.searchParams.delete('proc');
  if(page==='lib'){
    const q=String(document.getElementById('q')?.value||'').trim();
    if(q)u.searchParams.set('q',q);else u.searchParams.delete('q');
  }else if(page!=='art'){
    u.searchParams.delete('q');
  }
  Object.entries(extra).forEach(([k,v])=>{
    const s=String(v??'').trim();if(s)u.searchParams.set(k,s);else u.searchParams.delete(k);
  });
  const next=u.pathname+(u.search?u.search:'')+(u.hash||'');
  const current=location.pathname+location.search+location.hash;
  if(next===current)return;
  history[mode==='replace'?'replaceState':'pushState']({legalos:true,page},'',next);
}
function currentRoute(){
  const u=url(),raw=u?.searchParams.get('page')||'home',page=PAGES.has(raw)?raw:'home';
  return {page,q:(u?.searchParams.get('q')||'').slice(0,500),doc:(u?.searchParams.get('doc')||'').slice(0,180),focus:(u?.searchParams.get('focus')||'').slice(0,300),proc:(u?.searchParams.get('proc')||'').slice(0,180)};
}
function apply(){
  const r=currentRoute();applying=true;
  try{
    if(r.doc&&typeof D!=='undefined'&&Array.isArray(D)&&D.some(x=>x.id===r.doc)){baseOpenDoc(r.doc,r.focus);return}
    if(r.proc&&typeof P!=='undefined'&&Array.isArray(P)&&P.some(x=>x.id===r.proc)){baseOpenProc(r.proc);return}
    if(r.page==='art'||r.page==='pone')baseGo('home');else baseGo(r.page);
    if(r.page==='lib'&&document.getElementById('q')){
      document.getElementById('q').value=r.q;
      if(typeof docs==='function'){const on=document.querySelector('#chips .chip.on');docs(on?on.dataset.t:'all',r.q)}
    }
  }finally{applying=false}
}
window.go=function(page){
  const out=baseGo(page);
  if(!applying)write(page);
  return out;
};
window.openDoc=function(id,focus=''){
  applying=true;let out;
  try{out=baseOpenDoc(id,focus)}finally{applying=false}
  write('art',{doc:id,focus,q:''});
  return out;
};
window.openProc=function(id){
  applying=true;let out;
  try{out=baseOpenProc(id)}finally{applying=false}
  write('pone',{proc:id});
  return out;
};
function syncSearch(){
  if(applying)return;const r=currentRoute();if(r.page!=='lib'&&!document.getElementById('lib')?.classList.contains('on'))return;
  clearTimeout(replaceTimer);replaceTimer=setTimeout(()=>write('lib',{},'replace'),120);
}
document.addEventListener('input',e=>{if(e.target?.id==='q')syncSearch()});
document.addEventListener('change',e=>{if(e.target?.id==='q')syncSearch()});
window.addEventListener('popstate',apply);
document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0),{once:true});
window.LEGALOS_URL_ROUTER={ready:true,apply,currentRoute,write};
})();