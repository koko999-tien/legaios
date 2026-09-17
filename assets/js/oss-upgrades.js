/* LegalOS V14 — progressive enhancements inspired by accessible government design systems. */
(function(){
  'use strict';

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

  function registerServiceWorker(){
    if(!('serviceWorker' in navigator))return;
    if(location.protocol!=='https:'&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1')return;
    window.addEventListener('load',()=>{
      navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(err=>console.warn('LegalOS service worker registration failed:',err));
    },{once:true});
  }

  function init(){
    ensureManifest();
    installSkipLink();
    enhanceStatusRegions();
    installNavigationA11y();
    installDrawerA11y();
    installOfflineStatus();
    ensureThemeMeta();
    document.body.classList.add('oss-upgrades-ready');
  }

  ensureManifest();
  registerServiceWorker();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
