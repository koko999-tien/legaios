/* LegalOS V14 — progressive enhancements inspired by accessible government design systems. */
(function(){
  'use strict';

  const DIAG_KEY='legalos_diag_errors_v1';
  function diagText(value,max=500){return String(value??'').replace(/\s+/g,' ').trim().slice(0,max)}
  function diagSource(value){
    try{const u=new URL(String(value||''),location.href);return u.origin===location.origin?u.pathname.split('/').slice(-3).join('/'):u.origin}catch{return ''}
  }
  function readDiagErrors(){try{const x=JSON.parse(sessionStorage.getItem(DIAG_KEY)||'[]');return Array.isArray(x)?x.slice(-12):[]}catch{return []}}
  function writeDiagErrors(rows){try{sessionStorage.setItem(DIAG_KEY,JSON.stringify(rows.slice(-12)))}catch{}}
  function recordDiagError(kind,message,source='',line=0,col=0){
    const rows=readDiagErrors();
    rows.push({at:new Date().toISOString(),kind:diagText(kind,40),message:diagText(message),source:diagSource(source),line:Number(line)||0,col:Number(col)||0});
    writeDiagErrors(rows);
  }
  function installDiagnosticsCapture(){
    window.addEventListener('error',e=>recordDiagError('error',e.message||e.error?.message||'Browser error',e.filename,e.lineno,e.colno));
    window.addEventListener('unhandledrejection',e=>recordDiagError('unhandledrejection',e.reason?.message||e.reason||'Unhandled promise rejection'));
  }
  async function diagnosticSnapshot(){
    let storage={supported:Boolean(navigator.storage?.estimate)};
    try{
      if(navigator.storage?.estimate){const x=await navigator.storage.estimate();storage={supported:true,usage:x.usage||0,quota:x.quota||0}}
    }catch{storage={supported:true,error:'estimate-failed'}}
    let sw={supported:'serviceWorker' in navigator,controlled:Boolean(navigator.serviceWorker?.controller)};
    try{
      if('serviceWorker' in navigator){const r=await navigator.serviceWorker.getRegistration();sw={...sw,scope:r?.scope||'',active:r?.active?.state||'',waiting:r?.waiting?.state||'',installing:r?.installing?.state||''}}
    }catch{sw={...sw,error:'registration-read-failed'}}
    let localStorageOk=true;try{const k='__legalos_diag_probe';localStorage.setItem(k,'1');localStorage.removeItem(k)}catch{localStorageOk=false}
    const nav=performance.getEntriesByType?.('navigation')?.[0];
    return {
      schema:'legalos-diagnostics-v1',
      app:{name:'LegalOS',version:'V14',collectedAt:new Date().toISOString()},
      privacy:'Không chứa nội dung hồ sơ, ghi chú, tên tài liệu nhập hoặc lịch sử tìm kiếm.',
      page:{origin:location.origin,path:location.pathname,route:document.querySelector('.page.on')?.id||'unknown'},
      display:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio||1,theme:document.body?.getAttribute('data-theme')||'',reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches},
      browser:{online:navigator.onLine,language:navigator.language||'',userAgent:diagText(navigator.userAgent,300)},
      capabilities:{indexedDB:'indexedDB' in window,caches:'caches' in window,localStorage:localStorageOk,serviceWorker:sw,storage},
      performance:nav?{type:nav.type,domContentLoaded:Math.round(nav.domContentLoadedEventEnd||0),load:Math.round(nav.loadEventEnd||0),transferSize:nav.transferSize||0}:null,
      errors:readDiagErrors()
    };
  }
  async function downloadDiagnostics(){
    const payload=await diagnosticSnapshot();
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json;charset=utf-8'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`LegalOS-diagnostics-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),800);
    if(typeof window.toast==='function')window.toast('Đã xuất chẩn đoán kỹ thuật');
    return payload;
  }
  window.LEGALOS_DIAGNOSTICS={snapshot:diagnosticSnapshot,download:downloadDiagnostics,clearErrors:()=>writeDiagErrors([])};
  function installDiagnosticsCommand(){
    document.addEventListener('click',e=>{
      const item=e.target.closest?.('[data-cmd^="diag:"]');
      if(!item)return;
      e.preventDefault();e.stopImmediatePropagation();
      document.getElementById('cmdBg')?.classList.remove('on');
      downloadDiagnostics().catch(err=>recordDiagError('diagnostics-export',err?.message||err));
    },true);
  }
  function installDiagnosticsSettings(){
    const body=document.querySelector('#settingsDrawer .drawer-body');
    if(!body||document.getElementById('diagExportBtn'))return;
    const group=document.createElement('div');
    group.className='setting-group';
    const title=document.createElement('b');
    title.textContent='Chẩn đoán kỹ thuật';
    const note=document.createElement('p');
    note.textContent='Xuất trạng thái trình duyệt, PWA và lỗi kỹ thuật gần nhất. Không xuất nội dung hồ sơ, ghi chú hoặc tên tài liệu.';
    const button=document.createElement('button');
    button.className='btn bs';
    button.id='diagExportBtn';
    button.type='button';
    button.textContent='Xuất file chẩn đoán';
    button.addEventListener('click',()=>downloadDiagnostics().catch(err=>{
      recordDiagError('diagnostics-export',err?.message||err);
      if(typeof window.toast==='function')window.toast('Không thể xuất chẩn đoán');
    }));
    group.append(title,note,button);
    body.appendChild(group);
  }

  function ensureManifest(){
    if(document.querySelector('link[rel="manifest"]'))return;
    const link=document.createElement('link');
    link.rel='manifest';
    link.href='manifest.webmanifest';
    document.head.appendChild(link);
  }

  function ensureThemeMeta(){
    let meta=document.querySelector('meta[name="theme-color"]');
    if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}
    const sync=()=>meta.content=document.body?.getAttribute('data-theme')==='dark'?'#111827':'#f8fafc';
    sync();
    if(document.body)new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
  }

  function installSkipLink(){
    const main=document.querySelector('main');
    if(!main)return;
    if(!main.id)main.id='mainContent';
    if(!main.hasAttribute('tabindex'))main.tabIndex=-1;
    if(document.querySelector('.skip-link'))return;
    const a=document.createElement('a');
    a.className='skip-link';
    a.href='#'+main.id;
    a.textContent='Bỏ qua đến nội dung chính';
    a.addEventListener('click',()=>setTimeout(()=>main.focus({preventScroll:true}),0));
    document.body.insertBefore(a,document.body.firstChild);
  }

  function syncNavigationA11y(){
    const nav=document.getElementById('nav');
    const menu=document.getElementById('menuBtn');
    if(!nav||!menu)return;
    const mobile=matchMedia('(max-width:960px)').matches;
    const open=nav.classList.contains('open');
    const hidden=mobile&&!open;
    menu.setAttribute('aria-controls','nav');
    menu.setAttribute('aria-expanded',String(open));
    nav.setAttribute('aria-hidden',String(hidden));
    nav.inert=hidden;

    document.querySelectorAll('[data-go]').forEach(el=>{
      const page=el.dataset.go;
      const active=document.getElementById(page)?.classList.contains('on') || (page==='lib'&&document.getElementById('art')?.classList.contains('on'));
      if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');
    });
  }

  function installNavigationA11y(){
    const nav=document.getElementById('nav');
    if(!nav)return;
    syncNavigationA11y();
    new MutationObserver(syncNavigationA11y).observe(nav,{attributes:true,attributeFilter:['class']});
    document.querySelectorAll('.page').forEach(page=>new MutationObserver(syncNavigationA11y).observe(page,{attributes:true,attributeFilter:['class']}));
    matchMedia('(max-width:960px)').addEventListener?.('change',syncNavigationA11y);
    document.addEventListener('keydown',e=>{
      if(e.key!=='Escape'||!nav.classList.contains('open'))return;
      nav.classList.remove('open');
      document.getElementById('navScrim')?.classList.remove('on');
      syncNavigationA11y();
      document.getElementById('menuBtn')?.focus();
    });
  }

  function installDrawerA11y(){
    document.querySelectorAll('.right-drawer').forEach(drawer=>{
      const sync=()=>{
        const open=drawer.classList.contains('on');
        drawer.setAttribute('aria-hidden',String(!open));
        drawer.inert=!open;
      };
      sync();
      new MutationObserver(sync).observe(drawer,{attributes:true,attributeFilter:['class']});
    });
  }

  function enhanceStatusRegions(){
    const toast=document.getElementById('toast');
    if(toast){toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.setAttribute('aria-atomic','true')}
    const count=document.getElementById('dcount');
    if(count){count.setAttribute('role','status');count.setAttribute('aria-live','polite')}
  }

  function installOfflineStatus(){
    let pill=null;
    const render=()=>{
      if(navigator.onLine){pill?.remove();pill=null;return}
      if(!pill){pill=document.createElement('div');pill.className='oss-offline-status';pill.setAttribute('role','status');pill.textContent='Ngoại tuyến · đang dùng dữ liệu đã lưu trên thiết bị';document.body.appendChild(pill)}
    };
    window.addEventListener('online',render);
    window.addEventListener('offline',render);
    render();
  }

  function showAppUpdate(){
    if(document.querySelector('.oss-update-status'))return;
    const box=document.createElement('div');
    box.className='oss-update-status';
    box.setAttribute('role','status');
    box.setAttribute('aria-live','polite');
    const text=document.createElement('span');
    text.textContent='LegalOS có bản mới';
    const reload=document.createElement('button');
    reload.type='button';
    reload.textContent='Tải lại';
    reload.addEventListener('click',()=>location.reload());
    const close=document.createElement('button');
    close.type='button';
    close.className='oss-update-close';
    close.setAttribute('aria-label','Đóng thông báo cập nhật');
    close.textContent='×';
    close.addEventListener('click',()=>box.remove());
    box.append(text,reload,close);
    document.body.appendChild(box);
  }

  function registerServiceWorker(){
    if(!('serviceWorker' in navigator))return;
    if(location.protocol!=='https:'&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1')return;
    const hadController=Boolean(navigator.serviceWorker.controller);
    if(hadController){
      let notified=false;
      navigator.serviceWorker.addEventListener('controllerchange',()=>{
        if(notified)return;
        notified=true;
        showAppUpdate();
      });
    }
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('/sw.js',{scope:'/'}).then(reg=>reg.update().catch(()=>{})).catch(err=>console.warn('LegalOS service worker registration failed:',err));
    },{once:true});
  }

  function init(){
    ensureManifest();
    installSkipLink();
    enhanceStatusRegions();
    installNavigationA11y();
    installDrawerA11y();
    installOfflineStatus();
    installDiagnosticsSettings();
    ensureThemeMeta();
    document.body.classList.add('oss-upgrades-ready');
  }

  installDiagnosticsCapture();
  installDiagnosticsCommand();
  ensureManifest();
  registerServiceWorker();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
