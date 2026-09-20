/* Căn cứ Pháp lý Môi trường — page navigation and route activation. */
(function installMobileArticleFixes(){
  if(document.getElementById('legalosMobileArticleFixes'))return;
  const style=document.createElement('style');
  style.id='legalosMobileArticleFixes';
  style.textContent=`
  @media(max-width:700px){
    body.article-view .mobile-quick{display:none!important}
    body.article-view main{padding-bottom:44px!important}
    #art .art-content{min-width:0!important;overflow-wrap:anywhere}
    #art .artbar{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px!important;align-items:stretch!important}
    #art .artbar>.btn{width:100%!important;min-width:0!important;white-space:normal!important;padding:8px 10px!important}
    #art .artbar>.read-tools{grid-column:1/-1;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px!important;width:100%!important;margin:0!important}
    #art .artbar>.read-tools button{width:100%!important;min-width:0!important;height:42px!important;white-space:nowrap!important}
    #art .artbar>a.official{grid-column:1/-1;display:flex!important;align-items:center;justify-content:center;min-height:42px;width:100%!important;text-align:center;white-space:normal!important}
  }`;
  document.head.appendChild(style);
})();

function syncHomeCleanMode(page=currentPage()){
  document.body.classList.toggle('home-clean-v91',page==='home');
}

const LEGALOS_ROUTES={home:'/',lib:'/lib',expert:'/expert',work:'/work',corekb:'/corekb',info:'/info',import:'/import',term:'/term',proc:'/proc',memo:'/memo',upd:'/upd',cls:'/cls',fee:'/fee',art:'/art',pone:'/proc'};
const LEGALOS_PATH_TO_PAGE=Object.fromEntries(Object.entries(LEGALOS_ROUTES).map(([page,path])=>[path,page]));

function routeFromPage(page){return LEGALOS_ROUTES[page]||'/'}
function pageFromLocation(){return LEGALOS_PATH_TO_PAGE[location.pathname]||'home'}
function syncRouteState(page,replace=false){
  try{
    const url=new URL(location.href),target=routeFromPage(page);
    url.pathname=target;url.hash='';
    (replace?history.replaceState:history.pushState).call(history,{page},'',url);
  }catch{/* Keep the current URL when history is unavailable. */}
}

window.addEventListener('popstate',()=>{
  const page=pageFromLocation();
  if(typeof currentPage!=='function'||currentPage()!==page)go(page,{history:false});
});

document.addEventListener('DOMContentLoaded',()=>{
  const page=pageFromLocation();
  if(page!=='home')go(page,{history:false});
},{once:true});

function go(p,options={}){
  const activate=()=>{
    document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id===p));
    syncHomeCleanMode(p);
    document.body.classList.toggle('article-view',p==='art');
    document.querySelectorAll('nav.links button').forEach(b=>b.classList.toggle('on',b.dataset.go===p||(p==='art'&&b.dataset.go==='lib')||(p==='pone'&&b.dataset.go==='proc')));
    const navMore=$('navMore');
    if(navMore){
      const routed=p==='art'?'lib':p==='pone'?'proc':p;
      const inside=navMore.querySelector(`[data-go="${routed}"]`);
      if(inside)navMore.open=true;
      else if(['home','lib','expert','work'].includes(routed))navMore.open=false;
    }
    $('nav')?.classList.remove('open');
    $('navScrim')?.classList.remove('on');
    window.scrollTo({top:0,behavior:'auto'});
    requestAnimationFrame(()=>{
      setCrumb();
      syncMobileNav();
      renderCommandCenter();
      if(p==='home'){renderHomeActivity();renderHomeContinue();renderHomePortal();}
      if(p==='corekb')renderCoreKnowledge($('coreKbQ')?.value||'');
      if(p==='lib')docs();
      if(p==='work'){renderWorkspace();renderWorkspaceStats();}
      if(p==='info')renderCommandCenter();
    });
    if(options.history!==false)syncRouteState(p,false);
  };
  activate();
}
