(function(){
'use strict';
const KEY='v17_project_lifecycle';
const STAGES=[
 {id:'dtm',title:'ĐTM',sub:'Đánh giá tác động môi trường',hint:'Theo dõi chuẩn bị, thẩm định và quyết định/kết quả liên quan.'},
 {id:'gpmt',title:'GPMT',sub:'Giấy phép môi trường',hint:'Theo dõi hồ sơ, cấp phép và các mốc rà soát nội bộ.'},
 {id:'trial',title:'Vận hành thử nghiệm',sub:'Vận hành thử công trình xử lý',hint:'Theo dõi kế hoạch, bằng chứng và việc cần hoàn tất trong giai đoạn thử.'},
 {id:'periodic',title:'Báo cáo định kỳ',sub:'Báo cáo môi trường / nghĩa vụ lặp lại',hint:'Theo dõi kỳ báo cáo và đầu việc định kỳ của hồ sơ.'}
];
const STATUSES=[
 {id:'todo',title:'Chưa bắt đầu',icon:'○'},
 {id:'doing',title:'Đang thực hiện',icon:'◐'},
 {id:'blocked',title:'Bị chặn',icon:'!'},
 {id:'done',title:'Hoàn thành',icon:'✓'}
];
let dragged=null;
function text(v,n=1200){return String(v??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,n)}
function date(v){return /^\d{4}-\d{2}-\d{2}$/.test(String(v||''))?String(v):''}
function normalizeStage(x){
 x=x&&typeof x==='object'?x:{};
 return {status:STATUSES.some(s=>s.id===x.status)?x.status:'todo',due:date(x.due),note:text(x.note,1200),updatedAt:text(x.updatedAt,60)}
}
function normalizeStore(raw){
 const out={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return out;
 Object.entries(raw).slice(0,300).forEach(([pid,row])=>{
  const id=text(pid,120);if(!id||!row||typeof row!=='object'||Array.isArray(row))return;
  out[id]={};STAGES.forEach(s=>out[id][s.id]=normalizeStage(row[s.id]))
 });return out
}
function store(){return normalizeStore(STORE.get(KEY,{}))}
function save(all){STORE.set(KEY,normalizeStore(all));render()}
function profile(){return typeof complianceProfile==='function'?complianceProfile():null}
function rowFor(all,pid){if(!all[pid])all[pid]={};STAGES.forEach(s=>all[pid][s.id]=normalizeStage(all[pid][s.id]));return all[pid]}
function statusLabel(id){return STATUSES.find(x=>x.id===id)?.title||'Chưa bắt đầu'}
function daysUntil(v){if(!v)return null;const d=new Date(v+'T23:59:59'),n=new Date();return Math.ceil((d-n)/86400000)}
function dueLabel(v){
 const n=daysUntil(v);if(n===null)return 'Chưa đặt mốc';if(n<0)return 'Quá mốc nội bộ '+Math.abs(n)+' ngày';if(n===0)return 'Mốc nội bộ hôm nay';return 'Còn '+n+' ngày tới mốc nội bộ'
}
function ensureStyle(){
 if(document.getElementById('projectLifecycleV17Style'))return;
 const s=document.createElement('style');s.id='projectLifecycleV17Style';s.textContent=`
 .project-lifecycle-v17{margin:18px 0 22px;border:1px solid var(--bd);border-radius:18px;background:var(--c);box-shadow:0 10px 34px rgba(15,23,42,.045);overflow:hidden}
 .lifecycle-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;padding:18px 20px;border-bottom:1px solid var(--bd)}
 .lifecycle-head h2{font-size:20px;margin:3px 0 5px}.lifecycle-head p{margin:0;color:var(--m);font-size:11px;max-width:76ch;line-height:1.55}
 .lifecycle-head-side{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end}.lifecycle-profile-pill{padding:7px 9px;border:1px solid var(--bd);border-radius:999px;font-size:10px;color:var(--m);background:var(--bg);max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .lifecycle-progress{height:4px;background:var(--bg);overflow:hidden}.lifecycle-progress span{display:block;height:100%;background:#2563eb;transition:width .22s ease}
 .lifecycle-kanban{display:grid;grid-template-columns:repeat(4,minmax(210px,1fr));gap:10px;padding:14px;overflow-x:auto}
 .lifecycle-column{min-width:210px;border:1px solid var(--bd);border-radius:13px;background:color-mix(in srgb,var(--bg) 74%,var(--c));padding:8px;transition:border-color .15s ease,background .15s ease}
 .lifecycle-column.drag-over{border-color:#60a5fa;background:#eff6ff}.lifecycle-column-head{display:flex;justify-content:space-between;align-items:center;padding:4px 3px 8px}.lifecycle-column-head b{font-size:11px}.lifecycle-column-head span{min-width:22px;height:22px;display:grid;place-items:center;border-radius:999px;background:var(--c);border:1px solid var(--bd);font-size:9px;color:var(--m)}
 .lifecycle-list{display:grid;gap:8px;min-height:116px}.lifecycle-card{border:1px solid var(--bd);border-radius:11px;background:var(--c);padding:10px;box-shadow:0 1px 2px rgba(15,23,42,.035);transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
 .lifecycle-card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(15,23,42,.08);border-color:#cbd5e1}.lifecycle-card.dragging{opacity:.45}
 .lifecycle-card-top{display:flex;gap:8px;justify-content:space-between;align-items:flex-start}.lifecycle-card h3{font-size:12px;margin:0 0 3px}.lifecycle-card .stage-sub{font-size:9px;color:var(--m);line-height:1.35}.lifecycle-grip{border:0;background:transparent;color:var(--m);font-size:14px;cursor:grab;padding:0 2px}
 .lifecycle-fields{display:grid;gap:7px;margin-top:9px}.lifecycle-fields label{display:grid;gap:3px}.lifecycle-fields label>span{font-size:8px;font-weight:800;color:var(--m);letter-spacing:.07em;text-transform:uppercase}.lifecycle-fields select,.lifecycle-fields input,.lifecycle-fields textarea{width:100%;border:1px solid var(--bd);border-radius:7px;background:var(--c);color:var(--tx);font:inherit;font-size:10px;padding:6px 7px}.lifecycle-fields textarea{resize:vertical;min-height:48px;line-height:1.4}
 .lifecycle-due{font-size:9px;color:var(--m);margin-top:6px}.lifecycle-due.late{color:#b91c1c}.lifecycle-due.soon{color:#b45309}.lifecycle-trust{padding:0 18px 14px;color:var(--m);font-size:9px;line-height:1.5}
 .lifecycle-empty{padding:22px;text-align:center}.lifecycle-empty h3{margin:0 0 6px}.lifecycle-empty p{color:var(--m);font-size:11px;margin:0 auto 12px;max-width:62ch}
 @media(max-width:780px){.lifecycle-head{display:grid}.lifecycle-head-side{justify-content:flex-start}.lifecycle-kanban{grid-template-columns:repeat(4,250px);scroll-snap-type:x proximity}.lifecycle-column{scroll-snap-align:start}}
 `;document.head.appendChild(s)
}
function mount(){
 const work=document.getElementById('work'),anchor=work?.querySelector('.workspace-jump');if(!work||!anchor)return null;
 let host=document.getElementById('projectLifecycleV17');if(host)return host;
 host=document.createElement('section');host.id='projectLifecycleV17';host.className='project-lifecycle-v17';anchor.parentNode.insertBefore(host,anchor);return host
}
function card(stage,state){
 const c=document.createElement('article');c.className='lifecycle-card';c.draggable=true;c.dataset.lifecycleStage=stage.id;
 const top=document.createElement('div');top.className='lifecycle-card-top';const copy=document.createElement('div'),h=document.createElement('h3'),sub=document.createElement('div'),grip=document.createElement('button');h.textContent=stage.title;sub.className='stage-sub';sub.textContent=stage.sub;copy.append(h,sub);grip.type='button';grip.className='lifecycle-grip';grip.textContent='⋮⋮';grip.title='Kéo thẻ sang trạng thái khác';grip.tabIndex=-1;top.append(copy,grip);c.append(top);
 const fields=document.createElement('div');fields.className='lifecycle-fields';
 const statusLabelEl=document.createElement('label'),statusTitle=document.createElement('span'),select=document.createElement('select');statusTitle.textContent='Trạng thái';select.dataset.lifecycleStatus=stage.id;STATUSES.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.title;o.selected=x.id===state.status;select.append(o)});statusLabelEl.append(statusTitle,select);
 const dueLabelEl=document.createElement('label'),dueTitle=document.createElement('span'),due=document.createElement('input');dueTitle.textContent='Mốc nội bộ';due.type='date';due.value=state.due;due.dataset.lifecycleDue=stage.id;dueLabelEl.append(dueTitle,due);
 const noteLabel=document.createElement('label'),noteTitle=document.createElement('span'),note=document.createElement('textarea');noteTitle.textContent='Ghi chú';note.placeholder=stage.hint;note.value=state.note;note.dataset.lifecycleNote=stage.id;noteLabel.append(noteTitle,note);
 fields.append(statusLabelEl,dueLabelEl,noteLabel);c.append(fields);
 const d=document.createElement('div');d.className='lifecycle-due';const n=daysUntil(state.due);if(n!==null&&n<0)d.classList.add('late');else if(n!==null&&n<=30)d.classList.add('soon');d.textContent=dueLabel(state.due);c.append(d);
 c.addEventListener('dragstart',()=>{dragged=stage.id;c.classList.add('dragging')});c.addEventListener('dragend',()=>{dragged=null;c.classList.remove('dragging');document.querySelectorAll('.lifecycle-column.drag-over').forEach(x=>x.classList.remove('drag-over'))});
 return c
}
function render(){
 ensureStyle();const host=mount();if(!host)return;host.replaceChildren();const p=profile();
 const head=document.createElement('header');head.className='lifecycle-head';const left=document.createElement('div'),k=document.createElement('div'),h=document.createElement('h2'),desc=document.createElement('p');k.className='section-kicker';k.textContent='PROJECT LIFECYCLE';h.textContent='Vòng đời hồ sơ môi trường';desc.textContent='Kanban nội bộ để theo dõi tiến độ ĐTM, GPMT, vận hành thử nghiệm và báo cáo định kỳ theo từng Hồ sơ tuân thủ. Trạng thái không phải kết luận pháp lý.';left.append(k,h,desc);const right=document.createElement('div');right.className='lifecycle-head-side';
 if(p){const pill=document.createElement('span');pill.className='lifecycle-profile-pill';pill.textContent=p.name||'Hồ sơ hiện tại';right.append(pill)}
 head.append(left,right);host.append(head);
 if(!p){const empty=document.createElement('div');empty.className='lifecycle-empty';const eh=document.createElement('h3'),ep=document.createElement('p'),btn=document.createElement('button');eh.textContent='Chưa có Hồ sơ tuân thủ đang chọn';ep.textContent='Tạo hoặc chọn một hồ sơ ở phần trên để theo dõi vòng đời dự án.';btn.type='button';btn.className='btn bp';btn.textContent='+ Tạo hồ sơ tuân thủ';btn.dataset.complianceNew='1';empty.append(eh,ep,btn);host.append(empty);return}
 const all=store(),row=rowFor(all,p.id),done=STAGES.filter(s=>row[s.id].status==='done').length;
 const progress=document.createElement('div');progress.className='lifecycle-progress';const fill=document.createElement('span');fill.style.width=(done/STAGES.length*100)+'%';progress.append(fill);host.append(progress);
 const board=document.createElement('div');board.className='lifecycle-kanban';
 STATUSES.forEach(status=>{
  const col=document.createElement('section');col.className='lifecycle-column';col.dataset.lifecycleColumn=status.id;const ch=document.createElement('div');ch.className='lifecycle-column-head';const cb=document.createElement('b'),count=document.createElement('span');cb.textContent=status.icon+' '+status.title;const items=STAGES.filter(s=>row[s.id].status===status.id);count.textContent=String(items.length);ch.append(cb,count);const list=document.createElement('div');list.className='lifecycle-list';items.forEach(s=>list.append(card(s,row[s.id])));col.append(ch,list);
  col.addEventListener('dragover',e=>{if(!dragged)return;e.preventDefault();col.classList.add('drag-over')});col.addEventListener('dragleave',()=>col.classList.remove('drag-over'));col.addEventListener('drop',e=>{e.preventDefault();col.classList.remove('drag-over');if(dragged)patch(dragged,{status:status.id})});board.append(col)
 });host.append(board);
 const trust=document.createElement('div');trust.className='lifecycle-trust';trust.textContent='Các mốc, trạng thái và ghi chú do người dùng thiết lập để quản lý công việc. Hãy đối chiếu hồ sơ, giấy phép và nguồn pháp luật chính thức trước khi xác định nghĩa vụ hoặc thời hạn pháp lý.';host.append(trust)
}
function patch(stageId,changes){
 const p=profile();if(!p||!STAGES.some(s=>s.id===stageId))return false;const all=store(),row=rowFor(all,p.id),prev=row[stageId],next=normalizeStage({...prev,...changes,updatedAt:new Date().toISOString()});row[stageId]=next;save(all);if(typeof logActivity==='function')logActivity('compliance',p.id,'Cập nhật vòng đời · '+STAGES.find(s=>s.id===stageId).title+' · '+statusLabel(next.status));return true
}
document.addEventListener('change',e=>{const s=e.target.closest?.('[data-lifecycle-status]');if(s){patch(s.dataset.lifecycleStatus,{status:s.value});return}const d=e.target.closest?.('[data-lifecycle-due]');if(d)patch(d.dataset.lifecycleDue,{due:d.value})});
document.addEventListener('input',e=>{const n=e.target.closest?.('[data-lifecycle-note]');if(!n)return;clearTimeout(n._save);n._save=setTimeout(()=>patch(n.dataset.lifecycleNote,{note:n.value}),320)});
const baseRender=typeof renderComplianceWorkspace==='function'?renderComplianceWorkspace:null;
if(baseRender)renderComplianceWorkspace=function(){const out=baseRender.apply(this,arguments);queueMicrotask(render);return out};
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0),{once:true});
window.addEventListener('storage',e=>{if(e.key===KEY)render()});
window.LEGALOS_PROJECT_LIFECYCLE={ready:true,key:KEY,stages:STAGES,statuses:STATUSES,normalizeStore,store,patch,render};
})();