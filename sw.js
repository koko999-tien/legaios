/* Căn cứ Pháp lý Môi trường — native service worker. */
const CACHE_NAME='ccplmt-v14-shell-20260920-67';
const APP_SHELL=[
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/icons/can-cu-phap-ly-moi-truong.svg',
  '/assets/css/app.css',
  '/assets/css/v14-product.css',
  '/assets/css/compliance.css',
  '/assets/css/oss-upgrades.css',
  '/assets/js/oss-upgrades.js',
  '/assets/js/legal-data.js',
  '/assets/js/knowledge-base.js',
  '/assets/js/state.js',
  '/assets/js/import.js',
  '/assets/js/idb-resilience.js',
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
  '/assets/js/compliance-core.js',
  '/assets/js/permits.js',
  '/assets/js/compliance.js',
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
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith('ccplmt-')&&key!==CACHE_NAME).map(key=>caches.delete(key))))
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

async function staleWhileRevalidateAsset(request,event){
  const cache=await caches.open(CACHE_NAME);
  const cached=await cache.match(request);
  const update=fetch(request).then(response=>{
    if(response&&response.ok)cache.put(request,response.clone());
    return response;
  });
  if(cached){
    event.waitUntil(update.catch(()=>undefined));
    return cached;
  }
  try{return await update}catch{return (await cache.match(request))||Response.error()}
}

function isStaticAsset(request,url){
  if(['script','style','image','font'].includes(request.destination))return true;
  return /\.(?:js|css|svg|png|jpe?g|webp|gif|ico|woff2?|webmanifest)$/i.test(url.pathname);
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
  if(isStaticAsset(request,url)){
    event.respondWith(staleWhileRevalidateAsset(request,event));
    return;
  }
  event.respondWith(networkFirstAsset(request));
});

