/* LegalOS V14 — application boot and event wiring. */
document.addEventListener("click",e=>{const stat=e.target.closest("[data-core-stat]");if(stat){e.preventDefault();renderCoreKbStatDetail(stat.dataset.coreStat)}});




let expertWizardStep=0;
const EXPERT_STEP_NAMES=["Dự án","Phạm vi","Tài liệu"];
function renderExpertWizard(){
  document.querySelectorAll("[data-exp-step]").forEach(x=>x.classList.toggle("on",Number(x.dataset.expStep)===expertWizardStep));
  document.querySelectorAll("[data-exp-step-go]").forEach(x=>x.classList.toggle("on",Number(x.dataset.expStepGo)===expertWizardStep));
  if($("expStepText"))$("expStepText").textContent=`Bước ${expertWizardStep+1}/3 · ${EXPERT_STEP_NAMES[expertWizardStep]}`;
  if($("expPrev"))$("expPrev").disabled=expertWizardStep===0;
  if($("expNext")){$("expNext").disabled=expertWizardStep===2;$("expNext").textContent=expertWizardStep===1?"Tới tài liệu →":"Tiếp →"}
}
function setExpertWizardStep(n){expertWizardStep=Math.max(0,Math.min(2,Number(n)||0));renderExpertWizard()}

document.addEventListener("DOMContentLoaded",()=>{
  syncHomeCleanMode('home');
  let savedTheme=null;try{savedTheme=window.localStorage.getItem("w1th")}catch{}
  const th=savedTheme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  document.body.setAttribute("data-theme",th);
  // Critical navigation is bound before optional UI initialization so the app remains clickable even if a secondary widget fails.
  if(!window.__legalosNavBound){
    window.__legalosNavBound=true;
    document.body.addEventListener("click",e=>{
      const b=e.target.closest("[data-go]");
      if(!b)return;
      e.preventDefault();
      go(b.dataset.go);
    });
  }
  if($("topics"))$("topics").innerHTML=T.map(x=>`<button class="topic" type="button" data-t="${x[0]}"><b>${x[1]}</b><small>${x[2]}</small></button>`).join("");
  loadUserLegalPack();renderTypeFilter();renderYearFilter();updStats();renderWorkspace();renderHomeActivity();renderHomeContinue();renderWorkspaceStats();renderDataVault();renderLawNow();renderCoreMap();renderUpdateStats();renderTermCats();renderOfficialSources();populateWizard();applyUIPrefs();renderCommandCenter();syncQuickNote(quickNote);renderHomePortal();refreshImportedDocs();
  renderLibraryTopicFilters();
  setLegalSearchMode(legalSearchMode);renderLegalSearchHistory();renderPopularRefs();renderCoreKnowledge();renderMemoV13();
  docs();
  renderProcList();
  renderTerms();
    renderUpdates("all");
  // Navigation uses the single delegated handler bound at startup.
  $("menuBtn").onclick=()=>{const on=$("nav").classList.toggle("open");$("navScrim").classList.toggle("on",on)};$("navScrim").onclick=()=>{$("nav").classList.remove("open");$("navScrim").classList.remove("on")};
  $("theme").onclick=()=>{const n=document.body.getAttribute("data-theme")==="dark"?"light":"dark";document.body.setAttribute("data-theme",n);try{window.localStorage.setItem("w1th",n)}catch{}};
  $("sidebarCollapse").onclick=()=>{uiPrefs.sidebar=!uiPrefs.sidebar;saveUIPrefs()};
  $("settingsSidebar").onclick=()=>{uiPrefs.sidebar=!uiPrefs.sidebar;saveUIPrefs()};
  $("settingsBtn").onclick=()=>openDrawer('settingsDrawer');$("settingsClose").onclick=closeDrawers;
  $("quickNoteBtn").onclick=()=>{syncQuickNote(quickNote);openDrawer('quickNoteDrawer');setTimeout(()=>$("quickNoteArea").focus(),0)};$("quickNoteClose").onclick=closeDrawers;$("drawerScrim").onclick=closeDrawers;$("previewClose").onclick=closeDrawers;
  $("quickNoteArea").oninput=e=>syncQuickNote(e.target.value);$("workspaceQuickNote").oninput=e=>syncQuickNote(e.target.value);$("clearQuickNote").onclick=()=>{syncQuickNote('');toast('Đã xóa ghi chú nhanh')};
  $("fontScale").onclick=e=>{const b=e.target.closest('[data-scale]');if(b){uiPrefs.scale=b.dataset.scale;saveUIPrefs()}};$("densityMode").onclick=e=>{const b=e.target.closest('[data-density]');if(b){uiPrefs.density=b.dataset.density;saveUIPrefs()}};
  $("resetPrefs").onclick=()=>{uiPrefs={scale:'normal',density:'comfortable',sidebar:false};saveUIPrefs();toast('Đã khôi phục giao diện mặc định')};
  $("viewMode").onclick=e=>{const b=e.target.closest('[data-view]');if(b){libraryView=b.dataset.view;STORE.set('v8_library_view',libraryView);applyLibraryView()}};
  if($("libraryDensity"))$("libraryDensity").onclick=e=>{const b=e.target.closest('[data-libdensity]');if(b){libraryDensity=b.dataset.libdensity;STORE.set('v13_library_density',libraryDensity);applyLibraryView()}};
  if($("toggleAssist"))$("toggleAssist").onclick=()=>{libraryAssistOpen=!libraryAssistOpen;STORE.set('v13_library_assist',libraryAssistOpen);applyLibraryView()};
  $("savedOnly").onclick=()=>{savedOnlyMode=!savedOnlyMode;STORE.set('v8_saved_only',savedOnlyMode);vs()};$("resetFilters").onclick=resetLibraryFilters;
  if($("asOfF"))$("asOfF").onchange=()=>{const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value)};
  $("procWizardStart").onclick=()=>openWizard($("procWizardSelect").value,0);$("wizardClose").onclick=closeWizard;$("wizardModal").onclick=e=>{if(e.target===$("wizardModal"))closeWizard()};
  if($("openShortcuts"))$("openShortcuts").onclick=()=>$("shortcutsModal")?.classList.add('on');if($("shortcutsClose"))$("shortcutsClose").onclick=()=>$("shortcutsModal")?.classList.remove('on');if($("shortcutsModal"))$("shortcutsModal").onclick=e=>{if(e.target===$("shortcutsModal"))$("shortcutsModal").classList.remove('on')};
  $("workspaceQuickNote").value=quickNote;$("quickNoteArea").value=quickNote;
  $("goNotes").onclick=()=>{closeDrawers();go('work');setTimeout(()=>$("workNotes")?.scrollIntoView({behavior:'smooth'}),50)};
  document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>$(b.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'}));


  // Import center
  $('importChooseBtn').onclick=()=>$('importDocsInput').click();$('importDrop').onclick=()=>$('importDocsInput').click();$('importDrop').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('importDocsInput').click()}};$('importDocsInput').onchange=e=>{importFiles(e.target.files);e.target.value=''};
  ['dragenter','dragover'].forEach(ev=>$('importDrop').addEventListener(ev,e=>{e.preventDefault();$('importDrop').classList.add('drag')}));['dragleave','drop'].forEach(ev=>$('importDrop').addEventListener(ev,e=>{$('importDrop').classList.remove('drag');if(ev==='drop'){e.preventDefault();importFiles(e.dataTransfer.files)}}));
  $('importQ').oninput=debounce(renderImportList,80);$('importTypeF').onchange=renderImportList;$('importCatF').onchange=renderImportList;$('importRefresh').onclick=refreshImportedDocs;$('importIndexExport').onclick=exportImportIndex;$('importClearAll').onclick=clearImported;
  document.body.addEventListener('click',e=>{const o=e.target.closest('[data-file-open]');if(o){showImportDetail(o.dataset.fileOpen);return}const d=e.target.closest('[data-file-download]');if(d){downloadImported(d.dataset.fileDownload);return}const del=e.target.closest('[data-file-delete]');if(del){deleteImported(del.dataset.fileDelete);return}const ha=e.target.closest('[data-home-action]');if(ha){const a=ha.dataset.homeAction;if(a==='cmd')openCmd();else if(a==='quicknote'){$('quickNoteBtn').click()}else if(a==='settings')openDrawer('settingsDrawer');else if(a==='lawdata'){go('upd');setTimeout(()=>renderLawHubTab('data'),30)}else if(a==='sources'){go('upd');setTimeout(()=>renderLawHubTab('sources'),30)}return}});
  $('backTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});window.addEventListener('scroll',()=>{$('backTop').classList.toggle('on',window.scrollY>700)},{passive:true});

  if($("topics"))$("topics").onclick=e=>{const t=e.target.closest("[data-t]");if(!t)return;document.querySelectorAll("#chips .chip").forEach(c=>c.classList.toggle("on",c.dataset.t===t.dataset.t));docs(t.dataset.t);go("lib")};
  $("chips").onclick=e=>{const c=e.target.closest(".chip");if(!c)return;document.querySelectorAll("#chips .chip").forEach(x=>x.classList.toggle("on",x===c));docs(c.dataset.t,$("q").value)};
  if($("topicFilterQ"))$("topicFilterQ").addEventListener("input",debounce(e=>renderLibraryTopicFilters(e.target.value),90));
  const vs=(remember=false)=>{const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);if(remember&&$("q").value.trim())addLegalSearchHistory($("q").value)};
  $("qBtn").onclick=()=>vs(true);$("q").addEventListener("keydown",e=>{if(e.key==="Enter")vs(true)});
  $("q").addEventListener("input",debounce(()=>vs(false),90));
  $("typeF").onchange=()=>vs(false);$("sortF").onchange=()=>vs(false);$("yearF").onchange=()=>vs(false);$("sourceF").onchange=()=>vs(false);$("scopeF").onchange=()=>vs(false);
  $("searchMode").onclick=e=>{const b=e.target.closest("[data-searchmode]");if(!b)return;setLegalSearchMode(b.dataset.searchmode);vs(false)};
  $("refFind").onclick=()=>{const q=buildRefQuery();if(!q){toast("Nhập ít nhất Điều hoặc số hiệu văn bản");return}$("q").value=q;setLegalSearchMode("ref");vs(true)};
  ["refDoc","refArticle","refClause","refPoint"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key==="Enter")$("refFind").click()}));
  $("collapseFilters").onclick=()=>document.querySelector(".library-layout-v11")?.classList.toggle("filters-mini");
  if($("coreKbSearchBtn"))$("coreKbSearchBtn").onclick=()=>renderCoreKnowledge($("coreKbQ").value);
  if($("coreKbReset"))$("coreKbReset").onclick=()=>{$("coreKbQ").value="";coreKbTheme="all";renderCoreKnowledge()};
  if($("coreKbQ"))$("coreKbQ").addEventListener("keydown",e=>{if(e.key==="Enter")renderCoreKnowledge($("coreKbQ").value)});
  if($("memoExport"))$("memoExport").onclick=()=>{saveMemoMetaV13();exportMemoMarkdownV13()};
  if($("memoExportData"))$("memoExportData").onclick=exportV13DataPack;
  if($("memoClear"))$("memoClear").onclick=()=>{if(!citationBasketV13.length)return;citationBasketV13=[];STORE.set(MEMO_KEY_V13,citationBasketV13);renderMemoV13();toast("Đã xóa danh sách căn cứ")};
  if($("memoTitle"))$("memoTitle").oninput=saveMemoMetaV13;
  if($("memoGeneralNote"))$("memoGeneralNote").oninput=saveMemoMetaV13;
  document.addEventListener("input",e=>{const n=e.target.closest("[data-citation-note]");if(n)updateCitationNoteV13(n.dataset.citationNote,n.value)});
  const homeSearch=()=>{const v=($("hq")?.value||"").trim();if(!$("q"))return;$("q").value=v;document.querySelectorAll("#chips .chip").forEach(c=>c.classList.toggle("on",c.dataset.t==="all"));go("lib");docs("all",v);setTimeout(()=>$("q")?.focus(),60)};
  $("hgo").onclick=homeSearch;$("hq").onkeydown=e=>{if(e.key==="Enter")homeSearch()};
  document.querySelectorAll("[data-quick]").forEach(b=>b.onclick=()=>{$("hq").value=b.dataset.quick;homeSearch()});
  $("tq").oninput=debounce(()=>renderTerms($("tq").value),80);$("termSort").onchange=()=>renderTerms($("tq").value);$("termCats").onclick=e=>{const b=e.target.closest("[data-termcat]");if(!b)return;currentTermCat=b.dataset.termcat;renderTerms($("tq").value)};
  $("resetProc").onclick=()=>{procDone={};STORE.set("w3_proc",procDone);renderProcList();toast("Đã xóa tiến độ")};
  $("procQ").oninput=debounce(renderProcList,100);$("procFilter").onchange=renderProcList;$("procCat").onchange=renderProcList;
  $("caseQ").oninput=debounce(renderWorkspace,100);
  $("exportW").onclick=exportWorkspace;if($("exportCatalog"))$("exportCatalog").onclick=exportCatalogCSV;if($("exportPack"))$("exportPack").onclick=exportLegalPack;if($("importPack"))$("importPack").onclick=()=>$("packFile").click();if($("packFile"))$("packFile").onchange=()=>{if($("packFile").files[0])importLegalPack($("packFile").files[0])};if($("clearPack"))$("clearPack").onclick=clearLegalPack;$("importW").onclick=()=>$("importFile").click();
  $("importFile").onchange=()=>{const input=$("importFile");if(input.files[0])importWorkspace(input.files[0]);input.value=''};
  $("cmdOpen").onclick=openCmd;$("topSearch").onclick=openCmd;
  $("clearQ").onclick=()=>{$("q").value="";vs(false);$("q").focus()};$("cmdBg").onclick=e=>{if(e.target===$("cmdBg"))closeCmd()};
  $("cmdQ").oninput=()=>renderCmd($("cmdQ").value);
  $("cmdQ").onkeydown=e=>{
    const items=[...$("cmdList").querySelectorAll(".cmd-item")],i=items.findIndex(x=>x.classList.contains("sel"));
    if(e.key==="Escape"){closeCmd();closeCompare()};
    if(e.key==="ArrowDown"){e.preventDefault();if(items.length){items.forEach(x=>x.classList.remove("sel"));items[(i+1+items.length)%items.length].classList.add("sel");items[(i+1+items.length)%items.length].scrollIntoView({block:"nearest"})}}
    if(e.key==="ArrowUp"){e.preventDefault();if(items.length){items.forEach(x=>x.classList.remove("sel"));items[(i-1+items.length)%items.length].classList.add("sel");items[(i-1+items.length)%items.length].scrollIntoView({block:"nearest"})}}
    if(e.key==="Enter"){const b=$("cmdList").querySelector(".cmd-item.sel")||items[0];if(b)b.click()}
  };
  $("cmdList").onclick=e=>{const b=e.target.closest("[data-cmd]");if(!b)return;const [k,id]=b.dataset.cmd.split(":");closeCmd();if(k==="doc")openDoc(id);else if(k==="file"){go("import");setTimeout(()=>showImportDetail(id),60)}else if(k==="proc")openProc(id);else go(id)};
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCmd()}if(e.altKey&&e.key.toLowerCase()==='i'){e.preventDefault();go('import')}if(e.altKey&&e.key.toLowerCase()==="n"){e.preventDefault();openDrawer('quickNoteDrawer')}if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){e.preventDefault();go("lib");setTimeout(()=>$("q")?.focus(),60)}if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="f"){e.preventDefault();go("lib");setTimeout(()=>{setLegalSearchMode("ref");$("refArticle")?.focus()},70)}if(e.altKey&&e.key.toLowerCase()==="l"){e.preventDefault();go('lib')}if(e.altKey&&e.key.toLowerCase()==="p"){e.preventDefault();go('proc')}if(e.altKey&&e.key.toLowerCase()==="w"){e.preventDefault();go('work')}if(e.key==="Escape"){closeCmd();closeCompare();closeDrawers();closeWizard();$("shortcutsModal")?.classList.remove('on')}});
  window.addEventListener('scroll',readingProgressUpdate,{passive:true});

  $("docs").onclick=e=>{if(e.target.closest("[data-preview],[data-save],[data-compare],[data-open-match]"))return;const d=e.target.closest("[data-open]");if(d)openDoc(d.dataset.open)};
  $("plist").onclick=e=>{const p=e.target.closest("[data-pr]");if(p)openProc(p.dataset.pr)};
  $("run").onclick=analyze;
  if($("expertWizardNav"))$("expertWizardNav").onclick=e=>{const b=e.target.closest("[data-exp-step-go]");if(b)setExpertWizardStep(b.dataset.expStepGo)};
  if($("expPrev"))$("expPrev").onclick=()=>setExpertWizardStep(expertWizardStep-1);
  if($("expNext"))$("expNext").onclick=()=>setExpertWizardStep(expertWizardStep+1);
  renderExpertWizard();
  if($("expAnalyze"))$("expAnalyze").onclick=analyzeExpert;
  if($("expClear"))$("expClear").onclick=()=>{clearExpertForm();setExpertWizardStep(0)};
  renderExpertBriefs();

  $("compareClear").onclick=clearCompare;
  $("compareOpen").onclick=showCompare;
  $("compareClose").onclick=closeCompare;
  $("compareModal").onclick=e=>{if(e.target===$("compareModal"))closeCompare()};
  document.querySelectorAll("[data-preset]").forEach(b=>b.onclick=()=>applyPreset(b.dataset.preset));
  $("updateFilter").onclick=e=>{const b=e.target.closest("[data-year]");if(b)renderUpdates(b.dataset.year)};$("lawHubTabs").onclick=e=>{const b=e.target.closest("[data-lawtab]");if(b)renderLawHubTab(b.dataset.lawtab)};

  $("fw").onclick=()=>{
    const p=Math.max(0,+$("wp").value||0),m=Math.max(0,+$("wm").value||0),rate=.10,total=Math.round(p*rate*m);
    $("fwo").innerHTML=`<div class="fee-line"><span>Giá nước</span><b>${p.toLocaleString("vi-VN")} đ/m³</b></div><div class="fee-line"><span>Khối lượng</span><b>${m.toLocaleString("vi-VN")} m³/tháng</b></div><div class="fee-line"><span>Tỷ lệ đang dùng trong công cụ</span><b>10%</b></div><div class="fee-total">${total.toLocaleString("vi-VN")} đồng/tháng</div>`;
    logActivity("fee","water","Tính phí nước thải sinh hoạt");
  };
  $("fa").onclick=()=>{
    const mo=Math.min(12,Math.max(1,+$("am").value||12)),annual=3000000,total=Math.round(annual*mo/12);
    $("fao").innerHTML=`<div class="fee-line"><span>Mức năm đang dùng trong công cụ</span><b>${annual.toLocaleString("vi-VN")} đ</b></div><div class="fee-line"><span>Số tháng</span><b>${mo}</b></div><div class="fee-total">${total.toLocaleString("vi-VN")} đồng / ${mo} tháng</div>`;
    logActivity("fee","air","Tính phí khí thải");
  };
  document.body.addEventListener("click",e=>{
    const s=e.target.closest("[data-save]");if(s){e.preventDefault();e.stopPropagation();saveDoc(s.dataset.save);if(document.querySelector("#art.page.on"))openDoc(s.dataset.save);return}
    const o=e.target.closest("[data-open]");if(o&&!o.closest("#docs")){openDoc(o.dataset.open);return}
    const st=e.target.closest("[data-step]");if(st){const [pid,si]=st.dataset.step.split(":");const i=+si;const arr=procDone[pid]||[];procDone[pid]=arr.includes(i)?arr.filter(x=>x!==i):[...arr,i].sort((a,b)=>a-b);STORE.set("w3_proc",procDone);openProc(pid);renderProcList();return}
    const pr=e.target.closest("[data-proc-reset]");if(pr){procDone[pr.dataset.procReset]=[];STORE.set("w3_proc",procDone);openProc(pr.dataset.procReset);renderProcList();toast("Đã đặt lại quy trình");return}
    const c=e.target.closest("[data-case]");if(c){showCase(c.dataset.case);return}
    const del=e.target.closest("[data-delcase]");if(del){cases=cases.filter(x=>x.id!==del.dataset.delcase);STORE.set("w3_cases",cases);currentCaseId=null;renderWorkspace();$("caseDetail").className="empty";$("caseDetail").textContent="Đã xóa hồ sơ.";toast("Đã xóa hồ sơ");return}
    const os=e.target.closest("[data-open-proc]");if(os){openProc(os.dataset.openProc);return}
    const oc=e.target.closest("[data-open-case]");if(oc){go("work");setTimeout(()=>showCase(oc.dataset.openCase),0);return}
    const cp=e.target.closest("[data-copy-step]");if(cp){const [pid,si]=cp.dataset.copyStep.split(":");const p=P.find(x=>x.id===pid);const s=p?.st[+si];if(s){navigator.clipboard?.writeText(`${s[0]}\n${s[1]}`).then(()=>toast("Đã sao chép bước")).catch(()=>toast("Không thể sao chép"))}return}
    const sc=e.target.closest("[data-scroll]");if(sc){$(sc.dataset.scroll)?.scrollIntoView({behavior:"smooth",block:"start"});return}
    const tab=e.target.closest("[data-case-tab]");if(tab){document.querySelectorAll("[data-case-tab]").forEach(x=>x.classList.toggle("on",x===tab));document.querySelectorAll("[data-case-panel]").forEach(x=>x.hidden=x.dataset.casePanel!==tab.dataset.caseTab);return}
    const ex=e.target.closest("[data-export-case]");if(ex){const c=cases.find(x=>x.id===ex.dataset.exportCase);if(c)caseExport(c);return}
    const cc=e.target.closest("[data-copy-case]");if(cc){const c=cases.find(x=>x.id===cc.dataset.copyCase);if(c){const txt=`${c.name}\nNhóm ${c.result.group}\nĐTM: ${c.result.dtm?"Cần rà":"Chưa thấy bắt buộc"}\nGPMT: ${c.result.gp?"Xem xét":"Chưa đạt ngưỡng"}\n${c.result.notes.join("\n")}`;navigator.clipboard?.writeText(txt).then(()=>toast("Đã sao chép hồ sơ")).catch(()=>toast("Không thể sao chép"))}return}
    const yr=e.target.closest("[data-year]");if(yr){renderUpdates(yr.dataset.year);return}
    const ebl=e.target.closest("[data-expert-load]");if(ebl){loadExpertBrief(ebl.dataset.expertLoad);return}
    const ebd=e.target.closest("[data-expert-delete]");if(ebd){expertBriefs=expertBriefs.filter(x=>x.id!==ebd.dataset.expertDelete);STORE.set("v10_expert_briefs",expertBriefs);renderExpertBriefs();renderWorkspaceStats();toast("Đã xóa phiếu chuyên gia");return}
    const ctheme=e.target.closest("[data-core-theme]");if(ctheme){coreKbTheme=ctheme.dataset.coreTheme;renderCoreKnowledge($("coreKbQ")?.value||"");return}
    const cform=e.target.closest("[data-core-form]");if(cform){openDoc("vbhn55",`Mẫu số ${cform.dataset.coreForm}`);return}
    const ac=e.target.closest("[data-add-citation]");if(ac){const [doc,article,clause,point]=ac.dataset.addCitation.split("|");addCitationV13(doc,article||null,clause||null,point||null);return}
    const rc=e.target.closest("[data-remove-citation]");if(rc){removeCitationV13(rc.dataset.removeCitation);return}
    const cq=e.target.closest("[data-core-query]");if(cq){coreQueryToLibrary(cq.dataset.coreQuery);return}
    const sex=e.target.closest("[data-search-example]");if(sex){go("lib");setTimeout(()=>{$("q").value=sex.dataset.searchExample;const p=parseLegalQuery(sex.dataset.searchExample);setLegalSearchMode(p.article||p.clause||p.point?"ref":"smart");const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);addLegalSearchHistory($("q").value)},50);return}
    const sh=e.target.closest("[data-search-history]");if(sh){$("q").value=sh.dataset.searchHistory;const on=document.querySelector("#chips .chip.on");docs(on?on.dataset.t:"all",$("q").value);return}
    const om=e.target.closest("[data-open-match]");if(om){e.preventDefault();e.stopPropagation();openDoc(om.dataset.openMatch,om.dataset.query||"");return}
    const ir=e.target.closest("[data-in-doc-ref]");if(ir){$("inDocQ").value=ir.dataset.inDocRef;runInDocSearch(ir.dataset.inDocRef);return}
    const lb=e.target.closest("[data-law-block]");if(lb){document.querySelectorAll("#legalText .law-block-hit").forEach(x=>x.classList.remove("law-block-hit"));const target=$(`law-block-${lb.dataset.lawBlock}`);if(target){target.classList.add("law-block-hit");target.scrollIntoView({behavior:"smooth",block:"center"})}return}
    const pv=e.target.closest('[data-preview]');if(pv){e.preventDefault();e.stopPropagation();openPreview(pv.dataset.preview);return}
    const pvo=e.target.closest('[data-preview-open]');if(pvo){closeDrawers();openDoc(pvo.dataset.previewOpen);return}
    const wz=e.target.closest('[data-wiz]');if(wz){const p=P.find(x=>x.id===wizardState.pid);if(!p)return;if(wz.dataset.wiz==='prev'){wizardState.index=Math.max(0,wizardState.index-1)}if(wz.dataset.wiz==='next'){wizardState.index=Math.min(p.st.length-1,wizardState.index+1)}if(wz.dataset.wiz==='toggle'){const i=wizardState.index,arr=procDone[p.id]||[];procDone[p.id]=arr.includes(i)?arr.filter(x=>x!==i):[...arr,i].sort((a,b)=>a-b);STORE.set('w3_proc',procDone);renderProcList()}renderWizard();return}
  });
  document.body.addEventListener("change",e=>{
    const c=e.target.closest("[data-compare]");
    if(c){const ok=toggleCompare(c.dataset.compare,c.checked);if(!ok)c.checked=false}
  });
  document.body.addEventListener("input",e=>{
    if(e.target.id==="caseNote"&&currentCaseId){
      const c=cases.find(x=>x.id===currentCaseId);if(c){c.userNote=e.target.value;STORE.set("w3_cases",cases)}
    }
  });

});

window.addEventListener("error",e=>{
  document.documentElement.dataset.runtimeError="1";
  const f=document.querySelector("footer.site .data-fresh");
  if(f&&!f.dataset.err){f.dataset.err="1";f.textContent+=" · ⚠ lỗi runtime";console.error(e.error||e.message)}
});

