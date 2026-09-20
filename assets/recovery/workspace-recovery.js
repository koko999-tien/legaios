(function(){
'use strict';
const DB='ccplmt-workspace-recovery-v1',STORE_NAME='snapshots',MAX=8;
const KEYS=[
'w3_saved','w3_recent','w3_notes','w3_proc','w3_cases','v10_expert_briefs',
'ccplmt_compliance_profiles_v1','ccplmt_compliance_audit_v1','v8_quick_note','v8_ui_prefs',
'v14_reading_progress','v13_citation_basket','v13_citation_meta','v15_workspace_trash',
'v16_law_watchlist','v15_official_candidates','v17_activity_audit','v17_project_lifecycle'
];
let dbPromise=null,timer=null,lastHash='';

function openDB(){
 if(!('indexedDB'in window))return Promise.reject(new Error('IndexedDB unavailable'));
 if(dbPromise)return dbPromise;
 dbPromise=new Promise((resolve,reject)=>{
  const r=indexedDB.open(DB,1);
  r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains(STORE_NAME))db.createObjectStore(STORE_NAME,{keyPath:'id'})};
  r.onerror=()=>{dbPromise=null;reject(r.error||new Error('Recovery DB open failed'))};
  r.onblocked=()=>console.warn('Recovery DB is blocked by another tab.');
  r.onsuccess=()=>{const db=r.result;db.onversionchange=()=>{db.close();dbPromise=null};resolve(db)};
 });
 return dbPromise;
}
function tx(mode,fn){
 return openDB().then(db=>new Promise((resolve,reject)=>{
  const t=db.transaction(STORE_NAME,mode),s=t.objectStore(STORE_NAME);let value,done=false;
  t.oncomplete=()=>resolve(value);t.onerror=()=>reject(t.error||new Error('Recovery transaction failed'));t.onabort=t.onerror;
  Promise.resolve().then(()=>fn(s)).then(v=>{value=v;done=true}).catch(e=>{try{t.abort()}catch{}reject(e)});
 }));
}
function request(r){return new Promise((resolve,reject)=>{r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error||new Error('Recovery request failed'))})}
function rawState(){const data={};for(const k of KEYS){try{data[k]=localStorage.getItem(k)}catch{data[k]=null}}return data}
function hash(data){
 const s=JSON.stringify(data);let h=2166136261;
 for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}
 return (h>>>0).toString(16)+':'+s.length
}
function counts(data){
 const parse=k=>{try{return JSON.parse(data?.[k]??'null')}catch{return null}};
 const profiles=parse('ccplmt_compliance_profiles_v1'),cases=parse('w3_cases'),saved=parse('w3_saved'),cit=parse('v13_citation_basket'),audit=parse('v17_activity_audit');
 return {profiles:Array.isArray(profiles)?profiles.length:0,cases:Array.isArray(cases)?cases.length:0,saved:Array.isArray(saved)?saved.length:0,citations:Array.isArray(cit)?cit.length:0,audit:Array.isArray(audit)?audit.length:0};
}
async function allRows(){
 try{const rows=await tx('readonly',s=>request(s.getAll()));return (rows||[]).sort((a,b)=>String(b.at).localeCompare(String(a.at)))}
 catch(e){console.warn('Recovery list failed:',e);return[]}
}
async function list(){return (await allRows()).slice(0,MAX)}
async function trim(){
 const rows=await allRows();for(const x of rows.slice(MAX)){await tx('readwrite',s=>request(s.delete(x.id)))}
}
async function saveNow(kind='manual',force=false){
 const data=rawState(),h=hash(data);if(!force&&h===lastHash)return null;
 const row={id:'rec-'+Date.now()+'-'+Math.random().toString(16).slice(2),at:new Date().toISOString(),kind,hash:h,data,counts:counts(data)};
 try{await tx('readwrite',s=>request(s.put(row)));lastHash=h;await trim();render();return row}
 catch(e){console.warn('Recovery snapshot failed:',e);renderError();return null}
}
function schedule(){
 clearTimeout(timer);timer=setTimeout(()=>saveNow('auto').catch(()=>{}),900)
}
async function remove(id){try{await tx('readwrite',s=>request(s.delete(id)));render();return true}catch{return false}}
async function clear(){try{await tx('readwrite',s=>request(s.clear()));lastHash='';render();return true}catch{return false}}
async function restore(id,opts={}){
 const row=await tx('readonly',s=>request(s.get(id)));if(!row?.data)return false;
 if(opts.confirm!==false&&!confirm('Khôi phục điểm lưu '+new Date(row.at).toLocaleString('vi-VN')+'? Dữ liệu workspace hiện tại trên trình duyệt sẽ được thay thế.'))return false;
 await saveNow('pre-restore',true);
 const before=rawState();
 try{
  for(const k of KEYS){const v=row.data[k];if(v===null||v===undefined)localStorage.removeItem(k);else{JSON.parse(v);localStorage.setItem(k,v)}}
 }catch(e){
  for(const k of KEYS){try{const v=before[k];if(v===null||v===undefined)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch{}}
  throw e;
 }
 if(opts.reload!==false)location.reload();
 return true;
}
function kindLabel(k){return k==='manual'?'Thủ công':k==='pre-restore'?'Trước khôi phục':'Tự động'}
function mount(){
 const card=document.getElementById('workBackup');if(!card)return null;
 let host=document.getElementById('workspaceRecoveryV17');if(host)return host;
 host=document.createElement('section');host.id='workspaceRecoveryV17';host.style.cssText='margin-top:14px;padding-top:12px;border-top:1px solid var(--bd)';
 const trash=document.getElementById('workspaceTrash');card.insertBefore(host,trash||null);return host
}
function renderError(){
 const h=mount();if(!h)return;h.textContent='Không thể mở vùng khôi phục tự động trên trình duyệt này. JSON và Full Backup vẫn dùng bình thường.'
}
async function render(){
 const h=mount();if(!h)return;
 const rows=await list();h.replaceChildren();
 const head=document.createElement('div');head.className='row';head.style.cssText='justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap';
 const info=document.createElement('div'),k=document.createElement('div'),b=document.createElement('b'),p=document.createElement('p');
 k.className='k';k.textContent='PHỤC HỒI TỰ ĐỘNG';b.textContent='Điểm khôi phục trên thiết bị';p.style.cssText='margin:4px 0 0;color:var(--m);font-size:11px;max-width:620px';p.textContent='Giữ tối đa 8 snapshot workspace trong IndexedDB. Không chứa byte PDF/Word; hãy dùng Sao lưu đầy đủ để chuyển tệp sang máy khác.';
 info.append(k,b,p);
 const btn=document.createElement('button');btn.type='button';btn.className='tiny';btn.dataset.recoverySave='1';btn.textContent='Tạo điểm khôi phục';
 head.append(info,btn);h.append(head);
 const box=document.createElement('div');box.style.cssText='display:grid;gap:6px;margin-top:9px';
 if(!rows.length){const e=document.createElement('small');e.style.color='var(--m)';e.textContent='Chưa có snapshot. Hệ thống sẽ tạo tự động khi dữ liệu workspace thay đổi.';box.append(e)}
 rows.forEach(x=>{
  const r=document.createElement('div');r.className='row';r.style.cssText='justify-content:space-between;align-items:center;gap:8px;border:1px solid var(--bd);border-radius:8px;padding:8px';
  const t=document.createElement('span'),strong=document.createElement('b'),small=document.createElement('small');strong.style.display='block';strong.textContent=kindLabel(x.kind)+' · '+new Date(x.at).toLocaleString('vi-VN');small.style.color='var(--m)';const c=x.counts||{};small.textContent=(c.profiles||0)+' hồ sơ tuân thủ · '+(c.cases||0)+' hồ sơ sàng lọc · '+(c.saved||0)+' văn bản lưu';t.append(strong,small);
  const a=document.createElement('span');a.className='row';const re=document.createElement('button'),del=document.createElement('button');re.type='button';re.className='tiny';re.dataset.recoveryRestore=x.id;re.textContent='Khôi phục';del.type='button';del.className='tiny';del.dataset.recoveryDelete=x.id;del.textContent='Xóa';a.append(re,del);r.append(t,a);box.append(r)
 });
 h.append(box)
}
const baseSet=STORE.set.bind(STORE),baseBatch=STORE.setBatch.bind(STORE);
STORE.set=function(k,v){const ok=baseSet(k,v);if(ok&&KEYS.includes(k))schedule();return ok};
STORE.setBatch=function(entries){const ok=baseBatch(entries);if(ok&&entries.some(([k])=>KEYS.includes(k)))schedule();return ok};

document.addEventListener('click',e=>{
 const s=e.target.closest('[data-recovery-save]');if(s){saveNow('manual',true).then(()=>toast('Đã tạo điểm khôi phục')).catch(()=>toast('Không thể tạo điểm khôi phục'));return}
 const r=e.target.closest('[data-recovery-restore]');if(r){restore(r.dataset.recoveryRestore).catch(()=>toast('Không thể khôi phục snapshot'));return}
 const d=e.target.closest('[data-recovery-delete]');if(d&&confirm('Xóa điểm khôi phục này?'))remove(d.dataset.recoveryDelete)
});
document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{render();saveNow('auto').catch(()=>{})},1200)},{once:true});
window.addEventListener('pagehide',()=>{clearTimeout(timer);if(dbPromise)dbPromise.then(db=>db.close()).catch(()=>{});dbPromise=null});
window.LEGALOS_RECOVERY={ready:true,list,saveNow,restore,remove,clear,counts,keys:[...KEYS]};
})();