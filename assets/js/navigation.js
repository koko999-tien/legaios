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

function go(p){
  const activate=()=>{
    document.querySelectorAll(".page").forEach(x=>x.classList.toggle("on",x.id===p));
    syncHomeCleanMode(p);
    document.body.classList.toggle('article-view',p==='art');
    document.querySelectorAll("nav.links button").forEach(b=>b.classList.toggle("on",b.dataset.go===p||(p==="art"&&b.dataset.go==="lib")||(p==="pone"&&b.dataset.go==="proc")));
    const navMore=$("navMore");
    if(navMore){
      const routed=p==="art"?"lib":p==="pone"?"proc":p;
      const inside=navMore.querySelector(`[data-go="${routed}"]`);
      if(inside)navMore.open=true;
      else if(["home","lib","expert","work"].includes(routed))navMore.open=false;
    }
    $("nav").classList.remove("open");
    $("navScrim")?.classList.remove("on");
    window.scrollTo({top:0,behavior:"auto"});
    requestAnimationFrame(()=>{setCrumb();syncMobileNav();renderCommandCenter();if(p==="home"){renderHomeActivity();renderHomeContinue();renderHomePortal()}if(p==="corekb"){renderCoreKnowledge($("coreKbQ")?.value||"")}if(p==="memo"){renderMemoV13()}if(p==="import"){refreshImportedDocs()}if(p==="expert"){renderExpertBriefs();renderImportStats();if($("expFileCount"))$("expFileCount").textContent=importedDocs.length}if(p==="work"){renderWorkspace();renderWorkspaceStats();renderComplianceWorkspace();renderWorkspaceTrash()}if(p!=="art"){$('readingProgress')?.classList.remove('on');window.__legalosReadingActive=false;document.body.classList.remove('read-focus','read-large','read-small')}});
  };
  activate();
}
