/* LegalOS V14 — page navigation and route activation. */
function syncHomeCleanMode(page=currentPage()){
  document.body.classList.toggle('home-clean-v91',page==='home');
}

function go(p){
  const activate=()=>{
    document.querySelectorAll(".page").forEach(x=>x.classList.toggle("on",x.id===p));
    syncHomeCleanMode(p);
    document.querySelectorAll("nav.links button").forEach(b=>b.classList.toggle("on",b.dataset.go===p||(p==="art"&&b.dataset.go==="lib")||(p==="pone"&&b.dataset.go==="proc")));
    $("nav").classList.remove("open");
    window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
    requestAnimationFrame(()=>{setCrumb();syncMobileNav();renderCommandCenter();if(p==="home"){renderHomeActivity();renderHomeContinue();renderHomePortal()}if(p==="corekb"){renderCoreKnowledge($("coreKbQ")?.value||"")}if(p==="memo"){renderMemoV13()}if(p==="import"){refreshImportedDocs()}if(p==="expert"){renderExpertBriefs();renderImportStats();if($("expFileCount"))$("expFileCount").textContent=importedDocs.length}if(p==="work"){renderWorkspace();renderWorkspaceStats()}if(p!=="art"){$('readingProgress')?.classList.remove('on');document.body.classList.remove('read-focus','read-large','read-small')}});
  };
  if(document.startViewTransition)document.startViewTransition(activate);else activate();
}
