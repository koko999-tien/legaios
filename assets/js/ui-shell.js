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
function readingProgressUpdate(){
  const art=document.querySelector('#art.page.on .art-content');if(!art){$('readingProgress')?.classList.remove('on');return}const r=art.getBoundingClientRect(),total=Math.max(1,art.offsetHeight-window.innerHeight*.55),passed=Math.max(0,-r.top+110),pct=Math.max(0,Math.min(100,passed/total*100));$('readingProgress')?.classList.add('on');$('readingProgress').querySelector('span').style.width=pct+'%';
}
