const IMPORT_DB_NAME='legalos_v9_documents';
const IMPORT_DB_STORE='files';
const IMPORT_MAX_BYTES=100*1024*1024;
let importedDocs=[];
let importMemory=[];
let importDbFailed=false;
let selectedImportId=null;
let importObjectURL=null;

function openImportDB(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('IndexedDB unavailable'));return}
    const req=indexedDB.open(IMPORT_DB_NAME,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(IMPORT_DB_STORE))db.createObjectStore(IMPORT_DB_STORE,{keyPath:'id'})};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error('IndexedDB error'));
  });
}
async function importDbTx(mode,fn){
  if(importDbFailed)return fn(null,true);
  try{const db=await openImportDB();return await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,mode),st=tx.objectStore(IMPORT_DB_STORE);let out;try{out=fn(st,false,resolve,reject)}catch(e){reject(e)}tx.oncomplete=()=>{db.close();if(out!==undefined)resolve(out)};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true;return fn(null,true)}
}
async function importDbAll(){
  if(importDbFailed)return [...importMemory];
  try{const db=await openImportDB();const persisted=await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readonly'),r=tx.objectStore(IMPORT_DB_STORE).getAll();r.onsuccess=()=>{db.close();resolve(r.result||[])};r.onerror=()=>{db.close();reject(r.error)}});const map=new Map(persisted.map(x=>[x.id,x]));importMemory.forEach(x=>map.set(x.id,x));return [...map.values()]}catch(e){importDbFailed=true;return [...importMemory]}
}
async function importDbGet(id){const mem=importMemory.find(x=>x.id===id);if(mem)return mem;if(importDbFailed)return null;try{const db=await openImportDB();return await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readonly'),r=tx.objectStore(IMPORT_DB_STORE).get(id);r.onsuccess=()=>{db.close();resolve(r.result||null)};r.onerror=()=>{db.close();reject(r.error)}})}catch(e){importDbFailed=true;return null}}
async function importDbPut(rec){if(importDbFailed){const i=importMemory.findIndex(x=>x.id===rec.id);if(i>=0)importMemory[i]=rec;else importMemory.push(rec);return false}try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).put(rec);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}});return true}catch(e){const i=importMemory.findIndex(x=>x.id===rec.id);if(i>=0)importMemory[i]=rec;else importMemory.push(rec);return false}}
async function importDbDelete(id){importMemory=importMemory.filter(x=>x.id!==id);if(importDbFailed)return;try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).delete(id);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true}}
async function importDbClear(){importMemory=[];if(importDbFailed)return;try{const db=await openImportDB();await new Promise((resolve,reject)=>{const tx=db.transaction(IMPORT_DB_STORE,'readwrite');tx.objectStore(IMPORT_DB_STORE).clear();tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)}})}catch(e){importDbFailed=true}}
function fileExt(name=''){const m=String(name).toLowerCase().match(/\.([a-z0-9]+)$/);return m?m[1]:''}
function fileGroup(ext){if(ext==='pdf')return'pdf';if(['doc','docx','odt'].includes(ext))return'word';if(['txt','md','markdown','html','htm','rtf'].includes(ext))return'text';if(['json','csv'].includes(ext))return'data';return'other'}
function fileIcon(ext){const g=fileGroup(ext);return g==='pdf'?'PDF':g==='word'?'W':g==='text'?'TXT':g==='data'?'{}':'FILE'}
function humanBytes(n=0){if(n<1024)return n+' B';if(n<1024*1024)return(n/1024).toFixed(1)+' KB';return(n/1024/1024).toFixed(n>10*1024*1024?0:1)+' MB'}
function importCategoryName(x){return({legal:'Tài liệu pháp luật',project:'Hồ sơ dự án',reference:'Tham khảo',report:'Báo cáo / nghiên cứu',evidence:'Minh chứng / quan trắc',other:'Khác'})[x]||'Khác'}
function xmlToText(xml,kind){let prepared=xml;if(kind==='docx')prepared=prepared.replace(/<\/w:p>/g,'</w:p>\n').replace(/<w:tab\/?\s*>/g,'\t');if(kind==='odt')prepared=prepared.replace(/<\/text:p>/g,'</text:p>\n').replace(/<text:tab\/?\s*>/g,'\t');const doc=new DOMParser().parseFromString(prepared,'application/xml');return(doc.documentElement?.textContent||'').replace(/\n\s*\n\s*\n+/g,'\n\n').replace(/[ \t]+\n/g,'\n').trim()}
async function zipEntryText(blob,wanted){
  const ab=await blob.arrayBuffer(),v=new DataView(ab),u=new Uint8Array(ab),dec=new TextDecoder();let e=-1;const start=Math.max(0,u.length-65557);
  for(let i=u.length-22;i>=start;i--){if(v.getUint32(i,true)===0x06054b50){e=i;break}}
  if(e<0)throw new Error('ZIP directory not found');const total=v.getUint16(e+10,true),off=v.getUint32(e+16,true);let p=off;
  for(let n=0;n<total&&p+46<=u.length;n++){
    if(v.getUint32(p,true)!==0x02014b50)break;const method=v.getUint16(p+10,true),cs=v.getUint32(p+20,true),nl=v.getUint16(p+28,true),xl=v.getUint16(p+30,true),cl=v.getUint16(p+32,true),lo=v.getUint32(p+42,true),name=dec.decode(u.slice(p+46,p+46+nl));
    if(name===wanted){const lnl=v.getUint16(lo+26,true),lxl=v.getUint16(lo+28,true),ds=lo+30+lnl+lxl,comp=u.slice(ds,ds+cs);let out;if(method===0)out=comp;else if(method===8){if(typeof DecompressionStream==='undefined')throw new Error('Browser decompression unsupported');const stream=new Blob([comp]).stream().pipeThrough(new DecompressionStream('deflate-raw'));out=new Uint8Array(await new Response(stream).arrayBuffer())}else throw new Error('Unsupported compression');return dec.decode(out)}p+=46+nl+xl+cl;
  }
  throw new Error('Entry not found');
}
async function extractImportText(file,ext){
  try{
    if(['txt','md','markdown','csv','json'].includes(ext)){const t=await file.text();return{text:t.slice(0,250000),status:'Đã đọc text'}}
    if(['html','htm'].includes(ext)){const raw=await file.text(),doc=new DOMParser().parseFromString(raw,'text/html');return{text:(doc.body?.innerText||doc.body?.textContent||'').slice(0,250000),status:'Đã trích text HTML'}}
    if(ext==='rtf'){const raw=await file.text();const t=raw.replace(/\\par[d]?/g,'\n').replace(/\\'[0-9a-fA-F]{2}/g,'').replace(/\\[a-zA-Z]+-?\d* ?/g,'').replace(/[{}]/g,'');return{text:t.slice(0,250000),status:'Đã đọc RTF cơ bản'}}
    if(ext==='docx'){const xml=await zipEntryText(file,'word/document.xml');return{text:xmlToText(xml,'docx').slice(0,250000),status:'Đã trích text DOCX'}}
    if(ext==='odt'){const xml=await zipEntryText(file,'content.xml');return{text:xmlToText(xml,'odt').slice(0,250000),status:'Đã trích text ODT'}}
    if(ext==='pdf')return{text:'',status:'PDF — xem bằng trình đọc của Chrome'};
    if(ext==='doc')return{text:'',status:'DOC nhị phân — lưu file, chưa trích text'};
    return{text:'',status:'Đã lưu file'};
  }catch(e){return{text:'',status:'Đã lưu; chưa trích được text'}}
}
function newImportId(){return crypto?.randomUUID?crypto.randomUUID():'f'+Date.now()+Math.random().toString(16).slice(2)}
async function importFiles(files){
  const arr=[...files];if(!arr.length)return;const p=$('importProgress'),bar=p?.querySelector('span');p?.classList.add('on');let done=0,added=0;
  for(const file of arr){
    if(file.size>IMPORT_MAX_BYTES){toast(`Bỏ qua ${file.name}: lớn hơn 100 MB`);done++;if(bar)bar.style.width=(done/arr.length*100)+'%';continue}
    const ext=fileExt(file.name),ex=await extractImportText(file,ext);const rec={id:newImportId(),name:file.name,type:file.type||'',ext,size:file.size,category:$('importCategory')?.value||'other',note:'',linkedCase:'',importedAt:new Date().toISOString(),previewText:ex.text,extractStatus:ex.status,blob:file};const persisted=await importDbPut(rec);if(!persisted)rec.extractStatus=(rec.extractStatus?rec.extractStatus+' · ':'')+'Chỉ lưu tạm trong phiên';added++;done++;if(bar)bar.style.width=(done/arr.length*100)+'%';
  }
  setTimeout(()=>{p?.classList.remove('on');if(bar)bar.style.width='0'},300);await refreshImportedDocs();toast(`Đã nhập ${added} tài liệu`);
}
async function refreshImportedDocs(){importedDocs=(await importDbAll()).sort((a,b)=>String(b.importedAt).localeCompare(String(a.importedAt)));renderImportList();renderImportStats();renderHomePortal()}
function renderImportStats(){const pdf=importedDocs.filter(x=>x.ext==='pdf').length,word=importedDocs.filter(x=>['doc','docx','odt'].includes(x.ext)).length,ex=importedDocs.filter(x=>String(x.previewText||'').trim()).length;if($('impCount'))$('impCount').textContent=importedDocs.length;if($('impPdf'))$('impPdf').textContent=pdf;if($('impWord'))$('impWord').textContent=word;if($('impExtracted'))$('impExtracted').textContent=ex;if($('sFiles'))$('sFiles').textContent=importedDocs.length;if($('wkFiles'))$('wkFiles').textContent=importedDocs.length;if($('expFileCount'))$('expFileCount').textContent=importedDocs.length}
function filteredImports(){const q=($('importQ')?.value||'').trim().toLowerCase(),t=$('importTypeF')?.value||'all',c=$('importCatF')?.value||'all';return importedDocs.filter(x=>(t==='all'||fileGroup(x.ext)===t)&&(c==='all'||x.category===c)&&(!q||(x.name+' '+(x.note||'')+' '+importCategoryName(x.category)+' '+(x.previewText||'').slice(0,5000)).toLowerCase().includes(q)))}
function renderImportList(){if(!$('importList'))return;const list=filteredImports();$('importList').innerHTML=list.length?list.map(x=>`<div class="import-file ${selectedImportId===x.id?'on':''}"><div class="import-file-head"><div class="file-icon">${fileIcon(x.ext)}</div><div class="import-file-main"><b title="${esc(x.name)}">${esc(x.name)}</b><small>${humanBytes(x.size)} · ${new Date(x.importedAt).toLocaleString('vi-VN')}</small><div class="file-badges"><span class="file-badge">${esc(importCategoryName(x.category))}</span><span class="file-badge">.${esc(x.ext||'file')}</span>${x.previewText?'<span class="file-badge ok">Có text</span>':''}</div></div></div><div class="import-file-actions"><button data-file-open="${x.id}" type="button">Xem</button><button data-file-download="${x.id}" type="button">Tải</button><button data-file-delete="${x.id}" type="button">Xóa</button></div></div>`).join(''):`<div class="import-empty">${importedDocs.length?'Không có tài liệu khớp bộ lọc.':'Chưa có tài liệu. Kéo PDF hoặc Word vào vùng nhập phía trên.'}</div>`}
async function showImportDetail(id){const x=await importDbGet(id);if(!x)return;selectedImportId=id;renderImportList();if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}let preview='';if(x.ext==='pdf'&&x.blob){importObjectURL=URL.createObjectURL(x.blob);preview=`<iframe src="${importObjectURL}#toolbar=1" title="${esc(x.name)}"></iframe>`}else if(x.previewText){preview=`<pre>${esc(x.previewText)}</pre>`}else preview=`<div class="import-preview-empty"><b>${esc(x.extractStatus||'Đã lưu file')}</b><br><br>${['doc','docx','odt'].includes(x.ext)?'Bạn vẫn có thể tải/mở file bằng Word hoặc ứng dụng tương ứng.':'Định dạng này hiện được quản lý như file đính kèm.'}</div>`;const caseOpts='<option value="">Không liên kết hồ sơ</option>'+cases.map(c=>`<option value="${c.id}" ${x.linkedCase===c.id?'selected':''}>${esc(c.name)}</option>`).join('');$('importDetail').innerHTML=`<div class="import-detail-head"><div class="section-kicker">Chi tiết tài liệu</div><b>${esc(x.name)}</b><div style="color:var(--m);font-size:9px;margin-top:3px">${humanBytes(x.size)} · ${esc(x.extractStatus||'')}</div></div><div class="import-detail-body"><div class="import-preview">${preview}</div><div class="import-fields"><label>Nhóm tài liệu<select id="fileCatEdit"><option value="legal">Tài liệu pháp luật</option><option value="project">Hồ sơ dự án</option><option value="reference">Tham khảo</option><option value="report">Báo cáo / nghiên cứu</option><option value="evidence">Minh chứng / quan trắc</option><option value="other">Khác</option></select></label><label>Liên kết hồ sơ<select id="fileCaseEdit">${caseOpts}</select></label><label style="grid-column:1/-1">Ghi chú<textarea id="fileNoteEdit" placeholder="Ghi chú về tài liệu…">${esc(x.note||'')}</textarea></label></div><div class="import-detail-actions"><button class="btn bp" data-file-download="${x.id}" type="button">Tải / mở file</button><button class="btn bs" data-file-delete="${x.id}" type="button">Xóa tài liệu</button></div></div>`;$('fileCatEdit').value=x.category||'other';$('fileCatEdit').onchange=async e=>{x.category=e.target.value;await importDbPut(x);await refreshImportedDocs();selectedImportId=id;renderImportList()};$('fileCaseEdit').onchange=async e=>{x.linkedCase=e.target.value;await importDbPut(x)};let noteTimer;$('fileNoteEdit').oninput=e=>{clearTimeout(noteTimer);noteTimer=setTimeout(async()=>{x.note=e.target.value;await importDbPut(x);await refreshImportedDocs();selectedImportId=id;renderImportList()},300)}}
async function downloadImported(id){const x=await importDbGet(id);if(!x?.blob)return;const url=URL.createObjectURL(x.blob),a=document.createElement('a');a.href=url;a.download=x.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function deleteImported(id){if(!confirm('Xóa tài liệu này khỏi LegalOS?'))return;await importDbDelete(id);if(selectedImportId===id){selectedImportId=null;if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}$('importDetail').innerHTML='<div class="import-preview-empty">Chọn một tài liệu để xem thông tin.</div>'}await refreshImportedDocs();toast('Đã xóa tài liệu')}
function exportImportIndex(){const data=importedDocs.map(({blob,...x})=>x),out={app:'LegalOS',exportedAt:new Date().toISOString(),count:data.length,files:data};const b=new Blob([JSON.stringify(out,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='LegalOS-document-index.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
async function clearImported(){if(!importedDocs.length)return;if(!confirm(`Xóa toàn bộ ${importedDocs.length} tài liệu đã nhập?`))return;await importDbClear();selectedImportId=null;if(importObjectURL){URL.revokeObjectURL(importObjectURL);importObjectURL=null}$('importDetail').innerHTML='<div class="import-preview-empty">Kho tài liệu đã được xóa.</div>';await refreshImportedDocs();toast('Đã xóa toàn bộ tài liệu')}
