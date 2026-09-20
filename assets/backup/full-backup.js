(function(){
'use strict';
const APP='Căn cứ Pháp lý Môi trường',SCHEMA='ccplmt-full-folder-v1';
function nowStamp(){return new Date().toISOString().replace(/[:.]/g,'-')}
function safeName(v,i=0){let s=String(v||'file').normalize('NFKC').replace(/[<>:"/\\|?*\x00-\x1F]/g,'_').replace(/[. ]+$/g,'').trim();if(!s)s='file';if(s.length>120){const m=s.match(/(\.[a-z0-9]{1,10})$/i),ext=m?m[1]:'';s=s.slice(0,120-ext.length)+ext}return String(i+1).padStart(4,'0')+'-'+s}
function workspaceSnapshot(){
 const gp=typeof complianceBackupRows==='function'?complianceBackupRows():(Array.isArray(complianceProfiles)?complianceProfiles:[]);
 const ga=typeof complianceAuditBackup==='function'?complianceAuditBackup():(Array.isArray(complianceAudit)?complianceAudit:[]);
 return {app:APP,schema:'ccplmt-workspace-v8',exportedAt:new Date().toISOString(),saved:Array.isArray(saved)?saved:[],recent:Array.isArray(recent)?recent:[],notes:notes&&typeof notes==='object'?notes:{},procDone:procDone&&typeof procDone==='object'?procDone:{},cases:Array.isArray(cases)?cases:[],expertBriefs:Array.isArray(expertBriefs)?expertBriefs:[],complianceProfiles:gp,complianceAudit:ga,lawWatch:STORE.get('v16_law_watchlist',[]),officialCandidates:STORE.get('v15_official_candidates',[]),quickNote:String(typeof quickNote==='undefined'?'':quickNote||''),uiPrefs:typeof uiPrefs==='object'&&uiPrefs?uiPrefs:{scale:'normal',density:'comfortable',sidebar:false},readingProgress:typeof readingProgressStore==='function'?readingProgressStore():STORE.get('v14_reading_progress',{}),citationBasket:typeof citationBasketV13!=='undefined'?citationBasketV13:STORE.get('v13_citation_basket',[]),citationMemoMeta:typeof citationMemoMetaV13!=='undefined'?citationMemoMetaV13:STORE.get('v13_citation_meta',{title:'',note:''}),trash:STORE.get('v15_workspace_trash',[])};
}
function documentManifest(rows){
 const files=[],used=new Set;
 (Array.isArray(rows)?rows:[]).forEach((x,i)=>{
  if(!x?.blob)return;let stored=safeName(x.name,i),base=stored,n=1;while(used.has(stored))stored=base.replace(/(\.[^.]*)?$/,m=>'-'+(++n)+(m||''));used.add(stored);
  const {blob,...meta}=x;files.push({id:String(x.id||''),storedName:stored,name:String(x.name||stored),type:String(x.type||''),ext:String(x.ext||''),size:Number(x.size)||x.blob.size||0,category:String(x.category||'other'),note:String(x.note||''),linkedCase:String(x.linkedCase||''),importedAt:String(x.importedAt||''),previewText:String(x.previewText||''),extractStatus:String(x.extractStatus||''),meta});
 });
 return {app:APP,schema:SCHEMA,exportedAt:new Date().toISOString(),count:files.length,totalBytes:files.reduce((n,x)=>n+x.size,0),files};
}
async function writeFile(dir,name,data){
 const h=await dir.getFileHandle(name,{create:true}),w=await h.createWritable();await w.write(data);await w.close()
}
async function selectDirectory(mode='readwrite'){
 if(typeof showDirectoryPicker!=='function')throw new Error('directory_picker_unsupported');
 return showDirectoryPicker({mode})
}
async function exportFolder(){
 let parent;try{parent=await selectDirectory('readwrite')}catch(e){if(e?.name==='AbortError')return false;typeof toast==='function'&&toast('Trình duyệt này chưa hỗ trợ sao lưu thư mục. Hãy dùng Chrome/Edge desktop.');return false}
 const root=await parent.getDirectoryHandle('CCPLMT-backup-'+nowStamp(),{create:true}),docsDir=await root.getDirectoryHandle('documents',{create:true}),rows=typeof importDbAll==='function'?await importDbAll():[],manifest=documentManifest(rows),workspace=workspaceSnapshot();
 await writeFile(root,'workspace.json',JSON.stringify(workspace,null,2));
 await writeFile(root,'documents.json',JSON.stringify(manifest,null,2));
 await writeFile(root,'README.txt','Căn cứ Pháp lý Môi trường — Full Backup Folder\n\n1) workspace.json: dữ liệu workspace.\n2) documents.json: danh mục tài liệu đã nhập.\n3) documents/: bytes PDF/Word/tệp đã nhập.\n\nKhi khôi phục trên thiết bị mới, dùng hai nút Khôi phục workspace và Khôi phục tài liệu trong mục Sao lưu.\n');
 for(const item of manifest.files){const row=rows.find(x=>String(x.id)===item.id);if(row?.blob)await writeFile(docsDir,item.storedName,row.blob)}
 typeof toast==='function'&&toast('Đã sao lưu đầy đủ '+manifest.count+' tài liệu vào thư mục');return true
}
async function openBackupRoot(){
 let root;try{root=await selectDirectory('read')}catch(e){if(e?.name==='AbortError')return null;typeof toast==='function'&&toast('Không mở được thư mục backup trên trình duyệt này');return null}
 return root
}
async function readJson(root,name){
 const h=await root.getFileHandle(name),f=await h.getFile();if(f.size>20*1024*1024)throw new Error('manifest_too_large');return JSON.parse(await f.text())
}
async function restoreWorkspace(){
 const root=await openBackupRoot();if(!root)return false;
 let data;try{data=await readJson(root,'workspace.json')}catch(e){console.error(e);typeof toast==='function'&&toast('Không tìm thấy workspace.json hợp lệ');return false}
 const file=new File([JSON.stringify(data)],'workspace.json',{type:'application/json'});
 if(typeof importWorkspace!=='function'){typeof toast==='function'&&toast('Phần khôi phục workspace chưa sẵn sàng');return false}
 importWorkspace(file);return true
}
async function restoreDocuments(){
 const root=await openBackupRoot();if(!root)return false;
 let man,docs;try{man=await readJson(root,'documents.json');docs=await root.getDirectoryHandle('documents')}catch(e){console.error(e);typeof toast==='function'&&toast('Thư mục backup thiếu documents.json hoặc documents/');return false}
 if(man?.app!==APP||man?.schema!==SCHEMA||!Array.isArray(man.files)){typeof toast==='function'&&toast('Danh mục tài liệu backup không hợp lệ');return false}
 const total=man.files.reduce((n,x)=>n+(Number(x.size)||0),0);if(!confirm('Khôi phục '+man.files.length+' tài liệu ('+humanBytes(total)+')? Tài liệu trùng ID sẽ được cập nhật.'))return false;
 let ok=0,fail=0;
 for(const x of man.files.slice(0,2000)){try{
  const h=await docs.getFileHandle(String(x.storedName||'')),file=await h.getFile();
  if(file.size>IMPORT_MAX_BYTES){fail++;continue}
  const rec={id:String(x.id||newImportId()),name:String(x.name||file.name),type:String(x.type||file.type||''),ext:String(x.ext||fileExt(x.name||file.name)),size:file.size,category:String(x.category||'other'),note:String(x.note||''),linkedCase:String(x.linkedCase||''),importedAt:String(x.importedAt||new Date().toISOString()),previewText:String(x.previewText||'').slice(0,250000),extractStatus:String(x.extractStatus||'Đã khôi phục từ backup'),blob:file};
  await importDbPut(rec);ok++;
 }catch(e){console.warn('Restore document failed',x?.storedName,e);fail++}}
 await refreshImportedDocs();typeof toast==='function'&&toast('Đã khôi phục '+ok+' tài liệu'+(fail?' · '+fail+' lỗi/bỏ qua':''));
 return ok>0
}
async function run(action){if(action==='export')return exportFolder();if(action==='workspace')return restoreWorkspace();if(action==='documents')return restoreDocuments();throw new Error('unknown_backup_action')}
window.CCPLMT_FULL_BACKUP={ready:true,run,exportFolder,restoreWorkspace,restoreDocuments,workspaceSnapshot,documentManifest,safeName};
})();