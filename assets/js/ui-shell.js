/* LegalOS V14 — shell UI, drawers, library view and procedure wizard. */
function renderHomePortal(){
  if($('homeRecentDocs')){const arr=recent.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,4);$('homeRecentDocs').innerHTML=arr.length?arr.map(d=>`<button class="home-mini-doc" data-open="${d.id}" type="button"><b>${d.ttl}</b><small>${d.k} · ${topicName(d.t)}</small></button>`).join(''):'<div class="home-mini-empty">Chưa có lịch sử xem văn bản.</div>'}
  if($('homeSavedDocs')){const arr=saved.map(id=>D.find(x=>x.id===id)).filter(Boolean).slice(0,4);$('homeSavedDocs').innerHTML=arr.length?arr.map(d=>`<button class="home-mini-doc" data-open="${d.id}" type="button"><b>★ ${d.ttl}</b><small>${d.k} · ${topicName(d.t)}</small></button>`).join(''):'<div class="home-mini-empty">Chưa lưu văn bản nào.</div>'}
  renderImportStats();
}


function applyUIPrefs(){
  const scaleMap={small:.92,normal:1,large:1.10};
  document.documentElement.style.setProperty('--ui-scale',scaleMap[uiPrefs.scale]||1);
  document.body.classList.toggle('ui-compact',uiPrefs.density==='compact');
  document.body.classList.toggle('sidebar-mini',!!uiPrefs.sidebar);
  document.querySelectorAll('#fontScale [data-scale]').forEach(b=>b.classList.toggle('on',b.dataset.scale===uiPrefs.scale));
  document.querySelectorAll('#densityMode [data-density]').forEach(b=>b.classList.toggle('on',b.dataset.density===uiPrefs.density));
}
function saveUIPrefs(){STORE.set('v8_ui_prefs',uiPrefs);applyUIPrefs()}
function openDrawer(id){
  ['previewDrawer','settingsDrawer','quickNoteDrawer'].forEach(x=>$(x)?.classList.toggle('on',x===id));
  $('drawerScrim')?.classList.add('on');$(id)?.setAttribute('aria-hidden','false');
}
function closeDrawers(){['previewDrawer','settingsDrawer','quickNoteDrawer'].forEach(x=>{if($(x)){ $(x).classList.remove('on');$(x).setAttribute('aria-hidden','true')}});$('drawerScrim')?.classList.remove('on')}
function renderCommandCenter(){
  if($('ccDocs'))$('ccDocs').textContent=`${D.length} văn bản · ${T.length} lĩnh vực`;
  if($('ccProc'))$('ccProc').textContent=`${P.length} lộ trình nghiệp vụ`;
  if($('ccWork'))$('ccWork').textContent=`${cases.length} hồ sơ · ${saved.length} văn bản đã lưu`;
  if($('ccUpdates')){const upcoming=D.filter(d=>{const e=parseVNDate(metaOf(d.id).eff);return e&&e>new Date()}).length;$('ccUpdates').textContent=upcoming?`${upcoming} mục sắp có hiệu lực`:'Theo dõi thay đổi & hiệu lực'}
}
function renderArticleNotesIndex(){
  if(!$('articleNotesList'))return;
  const arr=Object.entries(notes).filter(([,v])=>String(v).trim()).map(([id,v])=>({d:D.find(x=>x.id===id),v:String(v)})).filter(x=>x.d);
  $('articleNotesList').innerHTML=arr.length?arr.slice(0,12).map(x=>`<button class="note-index-item" data-open="${x.d.id}" type="button"><b>${x.d.ttl}</b><p>${esc(x.v.replace(/\s+/g,' ').slice(0,100))}</p></button>`).join(''):`<div class="empty-mini">Chưa có ghi chú theo văn bản.</div>`;
}
function syncQuickNote(value){quickNote=value;STORE.set('v8_quick_note',quickNote);if($('quickNoteArea')&&$('quickNoteArea').value!==value)$('quickNoteArea').value=value;if($('workspaceQuickNote')&&$('workspaceQuickNote').value!==value)$('workspaceQuickNote').value=value}
function openPreview(id){
  const d=D.find(x=>x.id===id);if(!d)return;const m=metaOf(id);$('previewTitle').textContent=d.ttl;
  $('previewBody').innerHTML=`<div class="preview-meta"><span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span>${m.eff?`<span class="legal-badge"><strong>Hiệu lực:</strong> ${m.eff}</span>`:''}${professorVerified(id)?`<span class="legal-badge prof-verified"><strong>✓ Kiểm chứng ${professorVerified(id).checked}</strong></span>`:''}</div><div class="preview-actions"><button class="btn bp" data-preview-open="${d.id}" type="button">Mở chi tiết</button><button class="btn bs" data-save="${d.id}" type="button">${saved.includes(d.id)?'★ Đã lưu':'☆ Lưu'}</button>${m.src?`<a class="official" href="${m.src}" target="_blank" rel="noopener">Nguồn chính thức ↗</a>`:''}</div><div class="sourcebox"><b>Quan hệ / vai trò</b><br>${m.rel||roleLabel(lawRole(d))}</div><div class="data-coverage"><span class="coverage-pill">Mức dữ liệu: tóm tắt</span>${extractLegalRefs(d.b).length?`<span class="coverage-pill ok">${extractLegalRefs(d.b).length} tham chiếu</span>`:""}</div>${d.b}${extractLegalRefs(d.b).length?`<h2>Tham chiếu được nhận diện</h2><div class="article-ref-index">${extractLegalRefs(d.b).slice(0,10).map(r=>`<button data-search-example="${esc(r)}" type="button">${esc(r)}</button>`).join("")}</div>`:""}<h2>Trước khi áp dụng</h2><p>Kiểm tra hiệu lực, sửa đổi/bổ sung, điều khoản chuyển tiếp, phụ lục và văn bản chuyên ngành liên quan.</p>`;
  openDrawer('previewDrawer');
}
function applyLibraryView(){
  if(!$('docs'))return;
  $('docs').classList.toggle('grid-view',libraryView==='grid');
  $('docs').classList.toggle('compact-view',libraryDensity==='compact');
  document.querySelectorAll('#viewMode [data-view]').forEach(b=>b.classList.toggle('on',b.dataset.view===libraryView));
  document.querySelectorAll('#libraryDensity [data-libdensity]').forEach(b=>b.classList.toggle('on',b.dataset.libdensity===libraryDensity));
  const layout=document.querySelector('.library-layout-v11');
  if(layout)layout.classList.toggle('assist-open',!!libraryAssistOpen);
  if($('toggleAssist')){$('toggleAssist').classList.toggle('bp',!!libraryAssistOpen);$('toggleAssist').classList.toggle('bs',!libraryAssistOpen);$('toggleAssist').textContent=libraryAssistOpen?'× Ẩn mẹo':'? Mẹo'}
  if($('savedOnly')){$('savedOnly').classList.toggle('bp',savedOnlyMode);$('savedOnly').classList.toggle('bs',!savedOnlyMode);$('savedOnly').textContent=savedOnlyMode?'★ Đang lọc đã lưu':'☆ Đã lưu'}
}
function resetLibraryFilters(){
  if($('q'))$('q').value='';['scopeF','yearF','sourceF','typeF','sortF'].forEach(id=>{if($(id))$(id).value=id==='sortF'?'default':'all'});
  document.querySelectorAll('#chips .chip').forEach(c=>c.classList.toggle('on',c.dataset.t==='all'));savedOnlyMode=false;STORE.set('v8_saved_only',false);setLegalSearchMode("smart");docs('all','');toast('Đã đặt lại bộ lọc');
  if($("asOfF"))$("asOfF").value="";
}
function populateWizard(){if($('procWizardSelect'))$('procWizardSelect').innerHTML=P.map(p=>`<option value="${p.id}">${p.ttl}</option>`).join('')}
function openWizard(pid,index=0){const p=P.find(x=>x.id===pid);if(!p)return;wizardState={pid,index:Math.max(0,Math.min(index,p.st.length-1))};$('wizardModal').classList.add('on');renderWizard()}
function closeWizard(){$('wizardModal').classList.remove('on')}
function renderWizard(){
  const p=P.find(x=>x.id===wizardState.pid);if(!p)return;const i=wizardState.index,s=p.st[i],done=procDone[p.id]||[];$('wizardTitle').textContent=p.ttl;
  $('wizardBody').innerHTML=`<div class="wizard-step-no">Bước ${i+1} / ${p.st.length} · ${done.includes(i)?'Đã hoàn thành':'Chưa hoàn thành'}</div><h2 class="wizard-step-title">${s[0]}</h2><p class="wizard-step-text">${s[1]}</p><div class="progress"><span style="width:${(i+1)/p.st.length*100}%"></span></div><div class="wizard-dots">${p.st.map((_,n)=>`<span class="wizard-dot ${done.includes(n)?'done':''} ${n===i?'current':''}"></span>`).join('')}</div><div class="wizard-controls"><button class="btn bs" data-wiz="prev" ${i===0?'disabled':''} type="button">← Trước</button><div class="row"><button class="btn ${done.includes(i)?'bs':'bp'}" data-wiz="toggle" type="button">${done.includes(i)?'Bỏ hoàn thành':'✓ Đánh dấu hoàn thành'}</button><button class="btn bs" data-wiz="next" ${i===p.st.length-1?'disabled':''} type="button">Tiếp →</button></div></div>`;
}
function readingProgressStore(){
  return STORE.get("v14_reading_progress",{});
}
function readingProgressSave(docId,pct,section){
  if(!docId||!Number.isFinite(pct))return;
  const now=Date.now();
  if(window.__legalosReadingLastSave&&now-window.__legalosReadingLastSave<700)return;
  window.__legalosReadingLastSave=now;
  const all=readingProgressStore();
  const prev=all[docId]||{};
  all[docId]={
    pct:Math.round(Math.max(0,Math.min(100,pct))*10)/10,
    maxPct:Math.max(Number(prev.maxPct)||0,pct),
    section:String(section||"").slice(0,140),
    updatedAt:now
  };
  STORE.set("v14_reading_progress",all);
}
function readingProgressTarget(){
  return document.querySelector('#art.page.on #legalText')||document.querySelector('#art.page.on .art-content');
}
function readingProgressMetrics(target){
  const rect=target.getBoundingClientRect();
  const top=window.scrollY+rect.top;
  const height=Math.max(1,target.scrollHeight||target.offsetHeight||rect.height);
  const readingLine=window.scrollY+Math.min(window.innerHeight*.42,360);
  const end=Math.max(top+1,top+height-Math.min(window.innerHeight*.28,240));
  const pct=Math.max(0,Math.min(100,(readingLine-top)/(end-top)*100));
  return {top,end,pct,height};
}
function readingProgressSection(target){
  const line=Math.min(window.innerHeight*.42,360);
  const headings=[...target.querySelectorAll('h2,h3,h4,.summary-block h3,.indexed-law-article h3')]
    .filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return s.display!=="none"&&r.height>0&&r.top<=line+12});
  const heading=headings.at(-1);
  return (heading?.textContent||"Nội dung tóm lược").replace(/\s+/g," ").trim().slice(0,140);
}
function readingProgressJumpTo(pct,behavior="smooth"){
  const target=readingProgressTarget();if(!target)return;
  const m=readingProgressMetrics(target);
  const clamped=Math.max(0,Math.min(100,Number(pct)||0));
  const readingOffset=Math.min(window.innerHeight*.42,360);
  const y=m.top+(m.end-m.top)*(clamped/100)-readingOffset;
  window.scrollTo({top:Math.max(0,y),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":behavior});
}
function ensureSmartReadingProgress(){
  const bar=$('readingProgress');if(!bar)return null;
  if(bar.dataset.smartReady==="1")return bar;
  bar.dataset.smartReady="1";
  bar.classList.add("smart-reading-progress");
  bar.setAttribute("aria-hidden","true");
  bar.innerHTML=`<div class="reading-progress-shell">
    <div class="reading-progress-copy">
      <b id="readingProgressSection">Nội dung tóm lược</b>
      <span id="readingProgressMeta">0% · đang tính thời gian đọc…</span>
    </div>
    <button class="reading-resume" id="readingResume" type="button" hidden>Tiếp tục</button>
  </div>
  <div class="reading-progress-track" id="readingProgressTrack" role="slider" tabindex="0" aria-label="Tiến độ đọc văn bản" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <span class="reading-progress-fill"></span><i class="reading-progress-thumb" aria-hidden="true"></i>
  </div>`;
  const track=$('readingProgressTrack');
  const jump=e=>{
    const r=track.getBoundingClientRect();
    if(!r.width)return;
    readingProgressJumpTo((e.clientX-r.left)/r.width*100);
  };
  track.addEventListener("click",jump);
  track.addEventListener("keydown",e=>{
    const now=Number(track.getAttribute("aria-valuenow"))||0;
    if(e.key==="ArrowLeft"||e.key==="ArrowDown"){e.preventDefault();readingProgressJumpTo(now-10)}
    if(e.key==="ArrowRight"||e.key==="ArrowUp"){e.preventDefault();readingProgressJumpTo(now+10)}
    if(e.key==="Home"){e.preventDefault();readingProgressJumpTo(0)}
    if(e.key==="End"){e.preventDefault();readingProgressJumpTo(100)}
  });
  $('readingResume').addEventListener("click",()=>{
    const pct=Number($('readingResume').dataset.pct)||0;
    $('readingResume').hidden=true;
    readingProgressJumpTo(pct);
  });
  window.addEventListener("resize",()=>requestAnimationFrame(readingProgressUpdate),{passive:true});
  return bar;
}
function readingProgressUpdate(){
  const bar=ensureSmartReadingProgress();
  const target=readingProgressTarget();
  if(!bar||!target){
    if(bar){bar.classList.remove("on");bar.setAttribute("aria-hidden","true")}
    window.__legalosReadingActive=false;
    return;
  }

  const docId=currentArticleDocId||"";
  if(!window.__legalosReadingActive||window.__legalosReadingDocId!==docId){
    window.__legalosReadingActive=true;
    window.__legalosReadingDocId=docId;
    window.__legalosReadingLastSave=0;
    const savedState=readingProgressStore()[docId];
    const resume=$('readingResume');
    if(resume&&savedState&&savedState.pct>=5&&savedState.pct<97){
      resume.dataset.pct=String(savedState.pct);
      resume.textContent=`Tiếp tục ${Math.round(savedState.pct)}%`;
      resume.hidden=false;
    }else if(resume){
      resume.hidden=true;
      resume.removeAttribute("data-pct");
    }
  }

  const m=readingProgressMetrics(target);
  const pct=m.pct;
  const section=readingProgressSection(target);
  const words=(target.innerText.match(/\S+/g)||[]).length;
  const remainingWords=Math.max(0,Math.round(words*(1-pct/100)));
  const minutes=Math.max(0,Math.ceil(remainingWords/190));
  const meta=pct>=99
    ?"100% · Đã đọc xong"
    :pct<1
      ?`0% · khoảng ${Math.max(1,Math.ceil(words/190))} phút đọc`
      :`${Math.round(pct)}% · ${minutes<=1?"còn <1 phút":`còn ~${minutes} phút`}`;

  bar.classList.add("on");
  bar.setAttribute("aria-hidden","false");
  $('readingProgressSection').textContent=section;
  $('readingProgressMeta').textContent=meta;
  const track=$('readingProgressTrack');
  track.setAttribute("aria-valuenow",String(Math.round(pct)));
  track.setAttribute("aria-valuetext",`${Math.round(pct)} phần trăm, ${section}`);
  const fill=bar.querySelector(".reading-progress-fill");
  const thumb=bar.querySelector(".reading-progress-thumb");
  if(fill)fill.style.width=pct+"%";
  if(thumb)thumb.style.left=pct+"%";

  if(pct>=2)readingProgressSave(docId,pct,section);
}
