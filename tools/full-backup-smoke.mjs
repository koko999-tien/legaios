import { chromium } from 'playwright';

const baseURL=process.env.LEGALOS_URL||'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1200,height:900}});
function assert(v,m){if(!v)throw new Error(m)}
page.on('dialog',d=>d.accept());

try{
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.evaluate(async()=>{
    await importDbClear();
    await importDbPut({
      id:'backup-file-1',name:'QA hồ sơ.pdf',type:'application/pdf',ext:'pdf',size:7,
      category:'evidence',note:'Minh chứng QA',linkedCase:'',importedAt:'2026-09-20T00:00:00.000Z',
      previewText:'',extractStatus:'PDF QA',blob:new File(['PDF-QA!'],'QA hồ sơ.pdf',{type:'application/pdf'})
    });
    await refreshImportedDocs();

    const writes={},handles={};
    function key(path,name){return path+'/'+name}
    function makeDir(path){
      if(handles[path])return handles[path];
      const h={
        path,
        async getDirectoryHandle(name,{create}={}){
          const p=key(path,name);
          if(!handles[p]&&!create)throw new DOMException('NotFound','NotFoundError');
          return makeDir(p);
        },
        async getFileHandle(name,{create}={}){
          const p=key(path,name);
          if(!(p in writes)&&!create)throw new DOMException('NotFound','NotFoundError');
          return {
            async createWritable(){
              return {async write(data){
                if(data instanceof Blob){writes[p]={kind:'blob',type:data.type,bytes:[...new Uint8Array(await data.arrayBuffer())],name:data.name||name}}
                else writes[p]={kind:'text',text:String(data)};
              },async close(){}};
            },
            async getFile(){
              const v=writes[p];if(!v)throw new DOMException('NotFound','NotFoundError');
              if(v.kind==='blob')return new File([new Uint8Array(v.bytes)],v.name||name,{type:v.type||''});
              return new File([v.text],name,{type:name.endsWith('.json')?'application/json':'text/plain'});
            }
          };
        }
      };
      handles[path]=h;return h;
    }
    window.__backupWrites=writes;
    window.__backupHandles=handles;
    window.__backupParent=makeDir('root');
    window.showDirectoryPicker=async()=>window.__backupParent;
  });

  await page.evaluate(()=>go('work'));
  await page.waitForFunction(()=>document.getElementById('work')?.classList.contains('on'));
  await page.locator('[data-full-backup-action="export"]').click();
  await page.waitForFunction(()=>Object.keys(window.__backupWrites||{}).some(x=>x.endsWith('/workspace.json'))&&Object.keys(window.__backupWrites||{}).some(x=>x.endsWith('/documents.json')));

  const probe=await page.evaluate(()=>{
    const keys=Object.keys(__backupWrites),workspaceKey=keys.find(x=>x.endsWith('/workspace.json')),manifestKey=keys.find(x=>x.endsWith('/documents.json')),fileKey=keys.find(x=>x.includes('/documents/')&&!x.endsWith('/documents.json'));
    const workspace=JSON.parse(__backupWrites[workspaceKey].text),manifest=JSON.parse(__backupWrites[manifestKey].text);
    const rootPath=workspaceKey.replace(/\/workspace\.json$/,'');
    return {keys,workspace,manifest,fileKey,blobBytes:fileKey?__backupWrites[fileKey].bytes.length:0,rootPath};
  });
  assert(probe.workspace.app==='Căn cứ Pháp lý Môi trường','Full backup workspace.json has wrong app marker');
  assert(probe.workspace.schema==='ccplmt-workspace-v8','Full backup workspace.json is not compatible with workspace restore');
  assert(probe.manifest.schema==='ccplmt-full-folder-v1'&&probe.manifest.count===1,'Full backup documents.json is invalid');
  assert(probe.manifest.files[0].id==='backup-file-1','Full backup lost imported document identity');
  assert(probe.blobBytes===7,'Full backup did not write imported document bytes');

  await page.evaluate(async rootPath=>{
    await importDbClear();await refreshImportedDocs();
    window.showDirectoryPicker=async()=>window.__backupHandles[rootPath];
  },probe.rootPath);
  await page.locator('[data-full-backup-action="documents"]').click();
  await page.waitForFunction(async()=>{const rows=await importDbAll();return rows.some(x=>x.id==='backup-file-1'&&x.blob?.size===7)});
  const restored=await page.evaluate(async()=>{const x=await importDbGet('backup-file-1');return{x:!!x,name:x?.name,size:x?.blob?.size,note:x?.note,category:x?.category}});
  assert(restored.x&&restored.name==='QA hồ sơ.pdf'&&restored.size===7,'Full backup document restore failed');
  assert(restored.note==='Minh chứng QA'&&restored.category==='evidence','Full backup restore lost document metadata');

  console.log('Full backup folder passed: workspace manifest, document bytes, and document restore.');
}finally{await browser.close()}
