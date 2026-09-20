(function(){
'use strict';
const KEY='v17_activity_audit',MAX=200;
const base=window.logActivity;
if(typeof base!=='function')return;
function safe(v,n=500){return String(v??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,n)}
function rows(){const v=STORE.get(KEY,[]);return Array.isArray(v)?v.filter(x=>x&&x.at&&x.type).slice(0,MAX):[]}
function save(v){STORE.set(KEY,v.slice(0,MAX))}
function add(type,id,label){
 const e={id:crypto?.randomUUID?crypto.randomUUID():'a'+Date.now()+Math.random().toString(16).slice(2),type:safe(type,80),target:safe(id,180),label:safe(label,500),at:new Date().toISOString()};
 save([e,...rows()]);render();
}
window.logActivity=function(type,id,label){const out=base(type,id,label);add(type,id,label);return out};
function typeLabel(v){return({doc:'Văn bản',case:'Hồ sơ sàng lọc',compliance:'Tuân thủ',obligation:'Nghĩa vụ',proc:'Quy trình',fee:'Công cụ phí'})[v]||v}
function host(){
 const root=document.getElementById('workActivity');if(!root)return null;
 let h=document.getElementById('activityAuditV17');
 if(h)return h;
 h=document.createElement('section');h.id='activityAuditV17';h.className='card activity-audit-v17';h.style.marginTop='14px';
 root.append(h);return h
}
function render(){
 const h=host();if(!h)return;const all=rows(),f=h.querySelector('[data-audit-filter]')?.value||'all',list=f==='all'?all:all.filter(x=>x.type===f);
 h.replaceChildren();
 const head=document.createElement('div');head.className='workspace-block-head';
 const info=document.createElement('div'),k=document.createElement('div'),title=document.createElement('h3'),note=document.createElement('p');
 k.className='section-kicker';k.textContent='AUDIT TRAIL NỘI BỘ';title.textContent='Nhật ký thao tác';note.textContent='Lưu tối đa 200 thao tác trên trình duyệt này. Đây là nhật ký nội bộ, không phải log bất biến hoặc chứng cứ pháp lý.';
 info.append(k,title,note);
 const controls=document.createElement('div');controls.className='row';
 const select=document.createElement('select');select.className='in';select.dataset.auditFilter='1';select.style.width='auto';
 const types=[...new Set(all.map(x=>x.type))];
 [['all','Tất cả'],...types.map(x=>[x,typeLabel(x)])].forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;if(v===f)o.selected=true;select.append(o)});
 const exp=document.createElement('button');exp.type='button';exp.className='btn bs';exp.dataset.auditExport='1';exp.textContent='Xuất JSON';
 const clear=document.createElement('button');clear.type='button';clear.className='btn bs';clear.dataset.auditClear='1';clear.textContent='Xóa log';
 controls.append(select,exp,clear);head.append(info,controls);h.append(head);
 const stat=document.createElement('small');stat.style.color='var(--m)';stat.textContent=list.length+' / '+all.length+' hoạt động hiển thị';h.append(stat);
 const box=document.createElement('div');box.style.marginTop='10px';box.style.display='grid';box.style.gap='8px';
 if(!list.length){const e=document.createElement('div');e.className='empty-mini';e.textContent='Chưa có hoạt động phù hợp.';box.append(e)}
 list.slice(0,50).forEach(x=>{const item=document.createElement('div');item.className='activity-item';const icon=document.createElement('div');icon.className='activity-icon';icon.textContent=typeLabel(x.type).slice(0,2).toUpperCase();const main=document.createElement('div');main.style.minWidth='0';const b=document.createElement('b');b.textContent=x.label||x.target||typeLabel(x.type);const s=document.createElement('small');s.textContent=typeLabel(x.type)+' · '+new Date(x.at).toLocaleString('vi-VN');main.append(b,s);item.append(icon,main);box.append(item)});
 h.append(box);
}
function exportJson(){
 const data={app:'Căn cứ Pháp lý Môi trường',schema:'ccplmt-activity-audit-v1',exportedAt:new Date().toISOString(),count:rows().length,events:rows()};
 const b=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='Can-cu-phap-ly-moi-truong-nhat-ky-hoat-dong.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),600)
}
document.addEventListener('change',e=>{if(e.target?.matches?.('[data-audit-filter]'))render()});
document.addEventListener('click',e=>{
 if(e.target?.closest?.('[data-audit-export]')){exportJson();return}
 if(e.target?.closest?.('[data-audit-clear]')&&confirm('Xóa toàn bộ nhật ký thao tác nội bộ?')){save([]);render();typeof toast==='function'&&toast('Đã xóa nhật ký thao tác')}
});
window.addEventListener('storage',e=>{if(e.key===KEY)render()});
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0),{once:true});
window.LEGALOS_ACTIVITY_AUDIT={ready:true,rows,render,exportJson,clear:()=>{save([]);render()}};
})();