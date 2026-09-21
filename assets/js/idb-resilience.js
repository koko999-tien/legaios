(function(){
  'use strict';
  if(typeof IMPORT_DB_NAME==='undefined'||typeof IMPORT_DB_STORE==='undefined')return;

  let dbPromise=null;

  function remember(rec){
    const i=importMemory.findIndex(x=>x.id===rec.id);
    if(i>=0)importMemory[i]=rec;else importMemory.push(rec);
  }

  function requestValue(req){
    return new Promise((resolve,reject)=>{
      req.onsuccess=()=>resolve(req.result);
      req.onerror=()=>reject(req.error||new Error('IndexedDB request failed'));
    });
  }

  function sharedOpen(){
    if(importDbFailed)return Promise.reject(new Error('IndexedDB disabled for this session'));
    if(!('indexedDB' in window))return Promise.reject(new Error('IndexedDB unavailable'));
    if(dbPromise)return dbPromise;
    dbPromise=new Promise((resolve,reject)=>{
      const req=indexedDB.open(IMPORT_DB_NAME,1);
      req.onupgradeneeded=()=>{
        const db=req.result;
        if(!db.objectStoreNames.contains(IMPORT_DB_STORE))db.createObjectStore(IMPORT_DB_STORE,{keyPath:'id'});
      };
      req.onerror=()=>{dbPromise=null;reject(req.error||new Error('IndexedDB open failed'))};
      req.onblocked=()=>console.warn('IndexedDB upgrade/open is blocked by another tab.');
      req.onsuccess=()=>{
        const db=req.result;
        db.onversionchange=()=>{db.close();dbPromise=null};
        db.onclose=()=>{dbPromise=null};
        resolve(db);
      };
    });
    return dbPromise;
  }

  async function withStore(mode,operation){
    const db=await sharedOpen();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(IMPORT_DB_STORE,mode);
      const store=tx.objectStore(IMPORT_DB_STORE);
      let value;
      let opDone=false;
      let txDone=false;
      let failed=false;
      const finish=()=>{if(!failed&&opDone&&txDone)resolve(value)};
      tx.oncomplete=()=>{txDone=true;finish()};
      tx.onabort=()=>{failed=true;reject(tx.error||new Error('IndexedDB transaction aborted'))};
      tx.onerror=()=>{failed=true;reject(tx.error||new Error('IndexedDB transaction failed'))};
      Promise.resolve().then(()=>operation(store)).then(v=>{value=v;opDone=true;finish()}).catch(err=>{
        failed=true;
        try{tx.abort()}catch{}
        reject(err);
      });
    });
  }

  openImportDB=sharedOpen;

  importDbAll=async function(){
    if(importDbFailed)return [...importMemory];
    try{
      const persisted=await withStore('readonly',store=>requestValue(store.getAll()));
      const map=new Map((persisted||[]).map(x=>[x.id,x]));
      importMemory.forEach(x=>map.set(x.id,x));
      return [...map.values()];
    }catch(err){
      console.warn('IndexedDB read-all fallback:',err);
      importDbFailed=true;
      dbPromise=null;
      return [...importMemory];
    }
  };

  importDbGet=async function(id){
    const mem=importMemory.find(x=>x.id===id);
    if(mem)return mem;
    if(importDbFailed)return null;
    try{return (await withStore('readonly',store=>requestValue(store.get(id))))||null}
    catch(err){console.warn('IndexedDB get fallback:',err);importDbFailed=true;dbPromise=null;return null}
  };

  importDbPut=async function(rec){
    if(importDbFailed){remember(rec);return false}
    try{
      await withStore('readwrite',store=>requestValue(store.put(rec)));
      return true;
    }catch(err){
      console.warn('IndexedDB put fallback:',err);
      remember(rec);importDbFailed=true;dbPromise=null;return false;
    }
  };

  importDbDelete=async function(id){
    importMemory=importMemory.filter(x=>x.id!==id);
    if(importDbFailed)return false;
    try{await withStore('readwrite',store=>requestValue(store.delete(id)));return true}
    catch(err){console.warn('IndexedDB delete fallback:',err);importDbFailed=true;dbPromise=null;return false}
  };

  importDbClear=async function(){
    importMemory=[];
    if(importDbFailed)return false;
    try{await withStore('readwrite',store=>requestValue(store.clear()));return true}
    catch(err){console.warn('IndexedDB clear fallback:',err);importDbFailed=true;dbPromise=null;return false}
  };

  window.addEventListener('pagehide',()=>{
    if(!dbPromise)return;
    dbPromise.then(db=>db.close()).catch(()=>{});
    dbPromise=null;
  });

  window.LEGALOS_IDB_RESILIENCE={
    ready:()=>sharedOpen().then(()=>true).catch(()=>false),
    resetConnection:()=>{dbPromise?.then(db=>db.close()).catch(()=>{});dbPromise=null}
  };
})();
