/* LegalOS V14 — small native service worker inspired by Workbox caching patterns. */
const CACHE_NAME='legalos-v14-shell-20260917-3';
const APP_SHELL=[
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/icons/legalos.svg',
  '/assets/css/app.css',
  '/assets/css/oss-upgrades.css',
  '/assets/js/oss-upgrades.js',
  '/assets/js/legal-data.js',
  '/assets/js/knowledge-base.js',
  '/assets/js/state.js',
  '/assets/js/import.js',
  '/assets/js/search-utils.js',
  '/assets/js/search-data.js',
  '/assets/js/search-runtime.js',
  '/assets/js/search-fuzzy.js',
  '/assets/js/ui-shell.js',
  '/assets/js/ui-utils.js',
  '/assets/js/activity-workspace.js',
  '/assets/js/project-tools.js',
  '/assets/js/library.js',
  '/assets/js/procedures.js',
  '/assets/js/workspace.js',
  '/assets/js/legal-hub.js',
  '/assets/js/expert.js',
  '/assets/js/navigation.js',
  '/assets/js/library-search.js',
  '/assets/js/classifier.js',
  '/assets/js/boot.js'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith('legalos-')&&key!==CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirstNavigation(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await fetch(request);
    if(response&&response.ok)cache.put('/index.html',response.clone());
    return response;
  }catch{
    return (await cache.match('/index.html')) || (await cache.match('/')) || Response.error();
  }
}

async function networkFirstAsset(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await fetch(request);
    if(response&&response.ok)cache.put(request,response.clone());
    return response;
  }catch{
    return (await cache.match(request)) || Response.error();
  }
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(networkFirstNavigation(request));
    return;
  }
  event.respondWith(networkFirstAsset(request));
});
