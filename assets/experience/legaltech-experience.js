(function(){
'use strict';

const STYLE_ID='legalosB2BExperienceV17';
const GROUP_LABELS={doc:'Đến văn bản',form:'Đến biểu mẫu',classifier:'Phân loại dự án',proc:'Quy trình',file:'Tài liệu đã nhập',page:'Điều hướng',graph:'Bản đồ pháp lý',diag:'Công cụ'};
const GROUP_ICONS={doc:'§',form:'▤',classifier:'◎',proc:'≣',file:'⇩',page:'→',graph:'⌘',diag:'⚙'};
const originalOpenDoc=window.openDoc;
let commandReturnFocus=null,graphResizeTimer=null,readerObserver=null;

function style(){
 if(document.getElementById(STYLE_ID))return;
 const el=document.createElement('style');el.id=STYLE_ID;
 el.textContent=`
 body.legalos-b2b-v17:not([data-theme="dark"]){--bg:#f8fafc;--c:#fff;--c2:#f8fafc;--bd:#e2e8f0;--m:#64748b;--tx:#0f172a;--a:#334155;--as:#eef2f7}
 body.legalos-b2b-v17{font-feature-settings:"kern" 1,"liga" 1;text-rendering:optimizeLegibility}
 body.legalos-b2b-v17 .wrap{max-width:1440px}
 body.legalos-b2b-v17 .card,body.legalos-b2b-v17 .home114-panel,body.legalos-b2b-v17 .corekb-block{box-shadow:0 1px 2px rgba(15,23,42,.035);border-color:var(--bd)}
 body.legalos-b2b-v17 h1{letter-spacing:-.035em}body.legalos-b2b-v17 h2,body.legalos-b2b-v17 h3{letter-spacing:-.02em}
 body.legalos-b2b-v17 .lead{max-width:78ch;line-height:1.65}

 .legal-graph-v17{margin:18px 0 22px;border:1px solid var(--bd);border-radius:18px;background:var(--c);overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,.045)}
 .legal-graph-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding:18px 20px;border-bottom:1px solid var(--bd);background:linear-gradient(180deg,var(--c),color-mix(in srgb,var(--bg) 60%,var(--c)))}
 .legal-graph-head h2{margin:3px 0 5px;font-size:21px}.legal-graph-head p{margin:0;color:var(--m);font-size:12px;max-width:72ch}
 .legal-graph-legend{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.legal-graph-legend span{font-size:10px;font-weight:800;padding:5px 8px;border:1px solid var(--bd);border-radius:999px;color:var(--m);background:var(--c)}
 .legal-graph-shell{display:grid;grid-template-columns:minmax(0,1fr) 290px;min-height:390px}
 .legal-graph-stage{position:relative;padding:20px;overflow:auto;background-image:radial-gradient(circle at 1px 1px,color-mix(in srgb,var(--bd) 72%,transparent) 1px,transparent 0);background-size:20px 20px}
 .legal-graph-columns{position:relative;z-index:2;min-width:700px;display:grid;grid-template-columns:repeat(3,minmax(190px,1fr));gap:54px;align-items:start}
 .legal-graph-column{display:grid;gap:12px;align-content:start}.legal-graph-column>small{font-size:9px;font-weight:900;letter-spacing:.13em;color:var(--m);text-transform:uppercase;margin:0 0 3px 4px}
 .legal-graph-node{position:relative;width:100%;text-align:left;border:1px solid var(--bd);background:var(--c);border-radius:13px;padding:11px 12px;min-height:72px;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,opacity .16s ease;cursor:pointer;color:var(--tx)}
 .legal-graph-node:hover,.legal-graph-node:focus-visible,.legal-graph-node.is-active{transform:translateY(-2px);border-color:#94a3b8;box-shadow:0 10px 26px rgba(15,23,42,.10);outline:none}
 .legal-graph-node.is-muted{opacity:.36}.legal-graph-node .node-type{display:block;color:var(--m);font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px}
 .legal-graph-node b{display:block;font-size:12px;line-height:1.35}.legal-graph-node small{display:block;color:var(--m);font-size:10px;line-height:1.35;margin-top:5px}
 .legal-graph-node[data-tier="law"]{border-left:3px solid #3b82f6}.legal-graph-node[data-tier="decree"]{border-left:3px solid #64748b}.legal-graph-node[data-tier="circular"]{border-left:3px solid #0f766e}
 .legal-graph-svg{position:absolute;inset:20px;z-index:1;pointer-events:none;overflow:visible}.legal-graph-edge{fill:none;stroke:#cbd5e1;stroke-width:1.5;transition:.16s ease}.legal-graph-edge.is-active{stroke:#475569;stroke-width:2.5}.legal-graph-edge.is-muted{opacity:.22}
 .legal-graph-detail{border-left:1px solid var(--bd);padding:18px;background:color-mix(in srgb,var(--bg) 70%,var(--c));display:flex;flex-direction:column;gap:12px}
 .legal-graph-detail .graph-empty{color:var(--m);font-size:12px;line-height:1.6}.graph-detail-kind{font-size:9px;font-weight:900;letter-spacing:.12em;color:var(--m)}.legal-graph-detail h3{font-size:17px;margin:0;line-height:1.35}
 .graph-detail-meta{display:grid;gap:7px}.graph-detail-meta div{display:grid;grid-template-columns:82px minmax(0,1fr);gap:8px;font-size:11px;padding-bottom:7px;border-bottom:1px solid var(--bd)}.graph-detail-meta span{color:var(--m)}
 .graph-detail-actions{margin-top:auto;display:grid;gap:7px}.graph-detail-actions button,.graph-detail-actions a{min-height:38px}

 .cmd-bg{backdrop-filter:blur(7px);background:rgba(15,23,42,.30)!important;align-items:flex-start!important;padding-top:min(14vh,120px)!important}
 .cmd{width:min(720px,calc(100vw - 28px))!important;max-height:min(72vh,680px)!important;border:1px solid #cbd5e1!important;border-radius:18px!important;box-shadow:0 28px 90px rgba(15,23,42,.24)!important;background:var(--c)!important;overflow:hidden}
 .cmd-v17-head{display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:8px;align-items:center;padding:10px 12px;border-bottom:1px solid var(--bd)}
 .cmd-v17-head>span{font-size:18px;color:var(--m);text-align:center}.cmd-v17-head input{border:0!important;box-shadow:none!important;background:transparent!important;padding:8px 4px!important;font-size:15px!important;min-width:0}
 .cmd-v17-key{font-size:9px!important;font-weight:800!important;border:1px solid var(--bd);border-radius:7px;padding:4px 6px;color:var(--m)!important;background:var(--bg)}
 .cmd-list{padding:8px!important;overflow:auto!important;max-height:min(58vh,540px)}
 .cmd-group{padding:4px 0 7px}.cmd-group-title{display:flex;justify-content:space-between;align-items:center;padding:6px 8px 5px;color:var(--m);font-size:9px;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.cmd-group-title span:last-child{font-weight:700;letter-spacing:0}
 .cmd-item{display:grid!important;grid-template-columns:34px minmax(0,1fr) auto!important;gap:10px!important;align-items:center!important;width:100%;padding:9px 10px!important;border-radius:10px!important;border:1px solid transparent!important;text-align:left;background:transparent!important}
 .cmd-item:hover,.cmd-item.sel{background:var(--bg)!important;border-color:var(--bd)!important}.cmd-item .cmd-icon{width:32px;height:32px;display:grid;place-items:center;border:1px solid var(--bd);border-radius:9px;background:var(--c);font-weight:900;color:#475569}
 .cmd-item .cmd-copy{min-width:0}.cmd-item .cmd-copy b{display:block;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cmd-item .cmd-copy small{display:block;margin-top:2px;color:var(--m);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .cmd-item .cmd-enter{font-size:9px;color:var(--m);border:1px solid var(--bd);border-radius:6px;padding:3px 5px}.cmd-v17-foot{display:flex;gap:14px;padding:8px 12px;border-top:1px solid var(--bd);font-size:9px;color:var(--m);background:var(--bg)}.cmd-v17-foot kbd{font:inherit;font-weight:900;border:1px solid var(--bd);border-radius:5px;background:var(--c);padding:2px 4px;margin-right:3px}
 .cmd-empty-v17{padding:28px;text-align:center;color:var(--m);font-size:12px}

 #art .art-layout{grid-template-columns:minmax(0,1fr) 245px!important;gap:30px!important;align-items:start}
 #art .art-content{max-width:880px;margin:0 auto;width:100%}#art #legalText{font-size:15px;line-height:1.78}#art #legalText p{max-width:78ch}
 #art .art-side{position:sticky!important;top:82px!important;max-height:calc(100vh - 100px);overflow:auto;scrollbar-width:thin}
 .reader-toc-v17{display:grid;gap:4px}.reader-toc-v17 .toc-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}.reader-toc-v17 .toc-title b{font-size:11px}.reader-toc-v17 .toc-title span{font-size:9px;color:var(--m)}
 .reader-toc-v17 button{width:100%;text-align:left;border:0;border-left:2px solid transparent;background:transparent;color:var(--m);font-size:10px;line-height:1.35;padding:6px 7px;border-radius:0 7px 7px 0;transition:.15s ease}
 .reader-toc-v17 button:hover{background:var(--bg);color:var(--tx)}.reader-toc-v17 button.on{border-left-color:#475569;background:var(--bg);color:var(--tx);font-weight:800}
 .reader-toc-v17 button[data-level="3"]{padding-left:14px}.reader-toc-v17 button[data-level="4"]{padding-left:21px}.reader-toc-empty{color:var(--m);font-size:10px;line-height:1.5;padding:5px}

 @media(max-width:980px){.legal-graph-shell{grid-template-columns:1fr}.legal-graph-detail{border-left:0;border-top:1px solid var(--bd)}#art .art-layout{grid-template-columns:1fr!important}#art .art-side{position:static!important;max-height:none;order:-1}.reader-toc-v17{grid-template-columns:repeat(2,minmax(0,1fr));max-height:230px;overflow:auto}.reader-toc-v17 .toc-title{grid-column:1/-1}}
 @media(max-width:620px){.legal-graph-head{display:grid}.legal-graph-legend{justify-content:flex-start}.legal-graph-stage{padding:12px}.legal-graph-svg{inset:12px}.legal-graph-columns{gap:28px}.cmd-bg{padding-top:8vh!important}.cmd-v17-foot{display:none}.cmd-list{max-height:62vh}.reader-toc-v17{grid-template-columns:1fr}}
 `;
 document.head.appendChild(el);
}

function fold(s){
 if(typeof window.foldVN==='function')return window.foldVN(String(s||''));
 return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
}
function score(text,q){
 if(!q)return 1;const a=fold(text),b=fold(q);if(a===b)return 100;if(a.startsWith(b))return 70;if(a.includes(b))return 45;
 const words=b.split(/\s+/).filter(Boolean);return words.reduce((n,w)=>n+(a.includes(w)?8:0),0)
}

/* ---------- Command palette ---------- */
function commandResults(q=''){
 const query=String(q||'').trim();
 const docs=(typeof D!=='undefined'&&Array.isArray(D)?D:[]).map(d=>({kind:'doc',id:d.id,title:d.ttl,sub:(d.k||'Văn bản')+' · '+(typeof topicName==='function'?topicName(d.t):''),score:score((d.ttl||'')+' '+(d.b||''),query)})).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
 const forms=(typeof VBHN55_FORMS!=='undefined'&&Array.isArray(VBHN55_FORMS)?VBHN55_FORMS:[]).map(([n,t])=>({kind:'form',id:String(n),title:'Mẫu '+n+' · '+t,sub:'Biểu mẫu · 55/VBHN-BNNMT',score:score('mẫu '+n+' '+t+' biểu mẫu hồ sơ GPMT',query)})).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score).slice(0,4);
 const classifier=[
  {kind:'classifier',id:'cls',title:'Phân loại dự án / sàng lọc ĐTM – GPMT',sub:'Nhập loại hình, công suất, diện tích và nguồn thải',score:score('phân loại dự án sàng lọc dtm gpmt nhóm i ii iii iv',query)},
  {kind:'classifier',id:'expert',title:'Rà soát hồ sơ môi trường',sub:'Xác định câu hỏi còn thiếu và nhánh pháp lý cần đọc',score:score('rà soát hồ sơ dự án môi trường chuyên gia',query)}
 ].filter(x=>!query||x.score>0);
 const proc=(typeof P!=='undefined'&&Array.isArray(P)?P:[]).map(p=>({kind:'proc',id:p.id,title:p.ttl,sub:'Quy trình nghiệp vụ',score:score((p.ttl||'')+' '+(p.st||[]).flat().join(' '),query)})).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
 const files=(typeof importedDocs!=='undefined'&&Array.isArray(importedDocs)?importedDocs:[]).map(f=>({kind:'file',id:f.id,title:f.name,sub:'Tài liệu đã nhập · .'+(f.ext||'file'),score:score((f.name||'')+' '+(f.note||''),query)})).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
 const pages=[
  ['graph','core','Bản đồ pháp lý tương tác','Luật → Nghị định → Thông tư'],
  ['page','lib','Tra cứu pháp luật','Kho văn bản và điều khoản'],
  ['page','work','Dashboard hồ sơ tuân thủ','Nghĩa vụ, giấy phép và thời hạn'],
  ['page','upd','Cập nhật pháp luật','Dòng thời gian và nguồn rà soát'],
  ['page','memo','Căn cứ đã lưu','Bộ căn cứ theo hồ sơ']
 ].map(([kind,id,title,sub])=>({kind,id,title,sub,score:score(title+' '+sub,query)})).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score).slice(0,4);
 const diag=[{kind:'diag',id:'export',title:'Xuất thông tin kiểm tra hệ thống',sub:'JSON kỹ thuật · không gồm nội dung hồ sơ',score:score('diagnostic kiểm tra hệ thống chẩn đoán lỗi',query)}].filter(x=>query&&x.score>0);
 return [...docs,...forms,...classifier,...proc,...files,...pages,...diag];
}
function commandLayout(){
 const cmd=document.querySelector('#cmdBg .cmd'),input=document.getElementById('cmdQ'),list=document.getElementById('cmdList');
 if(!cmd||!input||!list)return;
 if(!cmd.querySelector('.cmd-v17-head')){
  const head=document.createElement('div');head.className='cmd-v17-head';
  const icon=document.createElement('span');icon.textContent='⌕';input.parentNode.insertBefore(head,input);head.append(icon,input);
  const key=document.createElement('span');key.className='cmd-v17-key';key.textContent=navigator.platform?.toLowerCase().includes('mac')?'⌘ K':'Ctrl K';head.append(key);
  const foot=document.createElement('div');foot.className='cmd-v17-foot';foot.innerHTML='<span><kbd>↑↓</kbd> di chuyển</span><span><kbd>Enter</kbd> mở</span><span><kbd>Esc</kbd> đóng</span>';
  cmd.append(foot);
 }
 input.placeholder='Tìm văn bản, biểu mẫu, phân loại dự án…';
}
function renderCommand(q=''){
 commandLayout();const host=document.getElementById('cmdList');if(!host)return;
 const rows=commandResults(q),order=['doc','form','classifier','graph','proc','file','page','diag'];host.replaceChildren();
 if(!rows.length){const e=document.createElement('div');e.className='cmd-empty-v17';e.textContent='Không tìm thấy. Thử số hiệu, “Mẫu”, “GPMT” hoặc “phân loại dự án”.';host.append(e);return}
 let first=true;
 for(const kind of order){
  const group=rows.filter(x=>x.kind===kind);if(!group.length)continue;
  const sec=document.createElement('section');sec.className='cmd-group';
  const title=document.createElement('div');title.className='cmd-group-title';const a=document.createElement('span'),n=document.createElement('span');a.textContent=GROUP_LABELS[kind]||kind;n.textContent=String(group.length);title.append(a,n);sec.append(title);
  for(const x of group){
   const b=document.createElement('button');b.type='button';b.className='cmd-item'+(first?' sel':'');b.dataset.cmd=x.kind+':'+x.id;first=false;
   const ic=document.createElement('span');ic.className='cmd-icon';ic.textContent=GROUP_ICONS[x.kind]||'→';
   const copy=document.createElement('span');copy.className='cmd-copy';const strong=document.createElement('b'),small=document.createElement('small');strong.textContent=x.title;small.textContent=x.sub;copy.append(strong,small);
   const enter=document.createElement('span');enter.className='cmd-enter';enter.textContent='↵';b.append(ic,copy,enter);sec.append(b);
  }
  host.append(sec);
 }
}
function openCommand(){
 commandReturnFocus=document.activeElement;const bg=document.getElementById('cmdBg'),q=document.getElementById('cmdQ');if(!bg||!q)return;
 bg.classList.add('on');bg.setAttribute('aria-hidden','false');q.value='';renderCommand('');requestAnimationFrame(()=>q.focus());
}
function closeCommand(){
 const bg=document.getElementById('cmdBg');if(!bg)return;bg.classList.remove('on');bg.setAttribute('aria-hidden','true');if(commandReturnFocus?.focus)commandReturnFocus.focus({preventScroll:true});
}
window.cmdResults=commandResults;window.renderCmd=renderCommand;window.openCmd=openCommand;window.closeCmd=closeCommand;

document.addEventListener('click',e=>{
 const item=e.target.closest?.('[data-cmd]');if(!item)return;
 const [kind,id]=String(item.dataset.cmd||'').split(':');
 if(kind==='form'){
  e.preventDefault();e.stopImmediatePropagation();closeCommand();if(typeof openDoc==='function')openDoc('vbhn55','Mẫu số '+id);return;
 }
 if(kind==='classifier'){
  e.preventDefault();e.stopImmediatePropagation();closeCommand();if(typeof go==='function')go(id);return;
 }
 if(kind==='graph'){
  e.preventDefault();e.stopImmediatePropagation();closeCommand();if(typeof go==='function')go('corekb');setTimeout(()=>document.getElementById('interactiveLegalGraphV17')?.scrollIntoView({behavior:'smooth',block:'start'}),90);
 }
},true);

/* ---------- Interactive legal graph ---------- */
function graphData(){
 const exists=id=>typeof D!=='undefined'&&Array.isArray(D)&&D.some(d=>d.id===id);
 const nodes=[
  {id:exists('vbhn98')?'vbhn98':'l72',tier:'law',label:'Luật BVMT',hint:'Khung nghĩa vụ và thủ tục môi trường'},
  {id:exists('vbhn49')?'vbhn49':'nd08',tier:'decree',label:'NĐ 08 + sửa đổi',hint:'Phân nhóm, ĐTM, GPMT, chất thải'},
  {id:'nd110',tier:'decree',label:'NĐ 110/2026',hint:'Nhánh EPR và nghĩa vụ liên quan'},
  {id:exists('vbhn55')?'vbhn55':'tt02',tier:'circular',label:'TT 02 + sửa đổi',hint:'Hướng dẫn nghiệp vụ và biểu mẫu'},
  {id:'tt24epr',tier:'circular',label:'TT 24/2026',hint:'Hướng dẫn EPR'}
 ].filter(x=>exists(x.id));
 const ids=new Set(nodes.map(x=>x.id)),root=nodes.find(x=>x.tier==='law')?.id,d1=nodes.find(x=>x.tier==='decree'&&/49|08/.test(x.id))?.id,d2=nodes.find(x=>x.id==='nd110')?.id,t1=nodes.find(x=>x.tier==='circular'&&/55|02/.test(x.id))?.id,t2=nodes.find(x=>x.id==='tt24epr')?.id;
 const edges=[];if(root&&d1)edges.push([root,d1]);if(root&&d2)edges.push([root,d2]);if(d1&&t1)edges.push([d1,t1]);if(d2&&t2)edges.push([d2,t2]);
 return {nodes,edges:edges.filter(([a,b])=>ids.has(a)&&ids.has(b))};
}
function renderGraphDetail(host,id){
 if(!host)return;host.replaceChildren();const d=typeof D!=='undefined'&&Array.isArray(D)?D.find(x=>x.id===id):null;if(!d){const e=document.createElement('div');e.className='graph-empty';e.textContent='Chọn một node để xem thông tin và mở văn bản.';host.append(e);return}
 const m=typeof metaOf==='function'?metaOf(id):{};
 const kind=document.createElement('div');kind.className='graph-detail-kind';kind.textContent=(d.k||'Văn bản').toUpperCase();
 const h=document.createElement('h3');h.textContent=d.ttl;
 const meta=document.createElement('div');meta.className='graph-detail-meta';
 [['Ban hành',m.issued||'Chưa có dữ liệu'],['Hiệu lực',m.eff||'Cần đối chiếu'],['Quan hệ',m.rel||'Xem chuỗi liên quan']].forEach(([a,b])=>{const row=document.createElement('div'),s=document.createElement('span'),v=document.createElement('b');s.textContent=a;v.textContent=b;row.append(s,v);meta.append(row)});
 const actions=document.createElement('div');actions.className='graph-detail-actions';const open=document.createElement('button');open.type='button';open.className='btn bp';open.textContent='Mở văn bản';open.onclick=()=>openDoc(id);actions.append(open);
 if(m.src){const a=document.createElement('a');a.className='btn bs';a.href=m.src;a.target='_blank';a.rel='noopener';a.textContent='Nguồn chính thức ↗';actions.append(a)}
 host.append(kind,h,meta,actions);
}
function drawEdges(root,data){
 const stage=root.querySelector('.legal-graph-stage'),svg=root.querySelector('.legal-graph-svg');if(!stage||!svg)return;
 const sr=stage.getBoundingClientRect();svg.setAttribute('width',stage.scrollWidth);svg.setAttribute('height',stage.scrollHeight);svg.setAttribute('viewBox','0 0 '+stage.scrollWidth+' '+stage.scrollHeight);svg.replaceChildren();
 for(const [a,b] of data.edges){
  const A=root.querySelector('[data-graph-node="'+CSS.escape(a)+'"]'),B=root.querySelector('[data-graph-node="'+CSS.escape(b)+'"]');if(!A||!B)continue;
  const ar=A.getBoundingClientRect(),br=B.getBoundingClientRect(),x1=ar.right-sr.left+stage.scrollLeft-20,y1=ar.top+ar.height/2-sr.top+stage.scrollTop-20,x2=br.left-sr.left+stage.scrollLeft-20,y2=br.top+br.height/2-sr.top+stage.scrollTop-20,m=(x1+x2)/2;
  const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d','M '+x1+' '+y1+' C '+m+' '+y1+', '+m+' '+y2+', '+x2+' '+y2);p.setAttribute('class','legal-graph-edge');p.dataset.from=a;p.dataset.to=b;svg.append(p);
 }
}
function selectGraph(root,data,id){
 const connected=new Set([id]);data.edges.forEach(([a,b])=>{if(a===id)connected.add(b);if(b===id)connected.add(a)});
 root.querySelectorAll('[data-graph-node]').forEach(n=>{const active=n.dataset.graphNode===id;n.classList.toggle('is-active',active);n.classList.toggle('is-muted',!connected.has(n.dataset.graphNode))});
 root.querySelectorAll('.legal-graph-edge').forEach(e=>{const on=e.dataset.from===id||e.dataset.to===id;e.classList.toggle('is-active',on);e.classList.toggle('is-muted',!on)});
 renderGraphDetail(root.querySelector('.legal-graph-detail'),id);
}
function mountGraph(){
 const page=document.getElementById('corekb');if(!page||document.getElementById('interactiveLegalGraphV17'))return;
 const anchor=page.querySelector('.corekb-main-v131')||page.querySelector('.corekb-coverage');if(!anchor)return;const data=graphData();if(!data.nodes.length)return;
 const root=document.createElement('section');root.id='interactiveLegalGraphV17';root.className='legal-graph-v17';
 const head=document.createElement('header');head.className='legal-graph-head';const copy=document.createElement('div');copy.innerHTML='<div class="section-kicker">INTERACTIVE LEGAL GRAPH</div><h2>Bản đồ quan hệ pháp lý</h2><p>Đi từ văn bản nền tảng đến lớp quy định chi tiết và hướng dẫn. Chọn node để làm nổi nhánh liên quan; mở văn bản gốc trước khi áp dụng.</p>';
 const legend=document.createElement('div');legend.className='legal-graph-legend';['Luật / VBHN luật','Nghị định','Thông tư'].forEach(x=>{const s=document.createElement('span');s.textContent=x;legend.append(s)});head.append(copy,legend);
 const shell=document.createElement('div');shell.className='legal-graph-shell';const stage=document.createElement('div');stage.className='legal-graph-stage';const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('legal-graph-svg');stage.append(svg);
 const cols=document.createElement('div');cols.className='legal-graph-columns';const tiers=[['law','Luật / văn bản hợp nhất'],['decree','Nghị định / quy định chi tiết'],['circular','Thông tư / hướng dẫn']];
 for(const [tier,title] of tiers){const col=document.createElement('div');col.className='legal-graph-column';const lab=document.createElement('small');lab.textContent=title;col.append(lab);data.nodes.filter(n=>n.tier===tier).forEach(n=>{const d=D.find(x=>x.id===n.id),m=typeof metaOf==='function'?metaOf(n.id):{};const b=document.createElement('button');b.type='button';b.className='legal-graph-node';b.dataset.graphNode=n.id;b.dataset.tier=tier;b.setAttribute('aria-label','Chọn '+n.label);const t=document.createElement('span');t.className='node-type';t.textContent=d?.k||tier;const strong=document.createElement('b');strong.textContent=n.label;const sm=document.createElement('small');sm.textContent=m.eff?'Hiệu lực metadata: '+m.eff:n.hint;b.append(t,strong,sm);b.onclick=()=>selectGraph(root,data,n.id);col.append(b)});cols.append(col)}
 stage.append(cols);const detail=document.createElement('aside');detail.className='legal-graph-detail';shell.append(stage,detail);root.append(head,shell);
 anchor.parentNode.insertBefore(root,anchor);renderGraphDetail(detail,data.nodes[0].id);requestAnimationFrame(()=>{drawEdges(root,data);selectGraph(root,data,data.nodes[0].id)});
 window.addEventListener('resize',()=>{clearTimeout(graphResizeTimer);graphResizeTimer=setTimeout(()=>drawEdges(root,data),90)},{passive:true});
 stage.addEventListener('scroll',()=>requestAnimationFrame(()=>drawEdges(root,data)),{passive:true});
}

/* ---------- Reader sticky TOC ---------- */
function readerCandidates(){
 const host=document.getElementById('legalText');if(!host)return[];
 const pool=[...host.querySelectorAll('h2,h3,h4,p')],seen=new Set(),rows=[];
 for(const el of pool){
  let text=(el.textContent||'').replace(/\s+/g,' ').trim();if(!text||text.length>180)continue;
  const heading=/^Điều\s+\d+[a-zA-Z]?\b|^Khoản\s+\d+\b|^Chương\s+[IVXLC\d]+\b|^Mục\s+\d+\b/i.test(text)||/^H[234]$/.test(el.tagName);
  if(!heading)continue;if(el.tagName==='P'&&!/^Điều\s+\d+|^Khoản\s+\d+|^Chương\s+|^Mục\s+/i.test(text))continue;
  text=text.slice(0,110);if(seen.has(text))continue;seen.add(text);if(!el.id)el.id='legal-section-v17-'+rows.length;
  rows.push({el,id:el.id,text,level:el.tagName==='H4'?4:el.tagName==='H3'?3:2});if(rows.length>=36)break;
 }
 return rows;
}
function buildReaderToc(){
 const side=document.querySelector('#art .art-side');if(!side)return;readerObserver?.disconnect();const rows=readerCandidates();side.replaceChildren();
 const toc=document.createElement('nav');toc.className='reader-toc-v17';toc.setAttribute('aria-label','Mục lục văn bản');
 const title=document.createElement('div');title.className='toc-title';const b=document.createElement('b'),count=document.createElement('span');b.textContent='Mục lục tự động';count.textContent=rows.length?rows.length+' mục':'Theo phần';title.append(b,count);toc.append(title);
 if(!rows.length){[['legalText','Nội dung'],['sourceSec','Nguồn & quan hệ'],['noteSec','Ghi chú'],['relatedSec','Liên quan']].forEach(([id,text])=>{if(!document.getElementById(id))return;const btn=document.createElement('button');btn.type='button';btn.textContent=text;btn.onclick=()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});toc.append(btn)})}
 else{
  rows.forEach(r=>{const btn=document.createElement('button');btn.type='button';btn.dataset.tocTarget=r.id;btn.dataset.level=String(r.level);btn.textContent=r.text;btn.onclick=()=>r.el.scrollIntoView({behavior:'smooth',block:'start'});toc.append(btn)});
  if('IntersectionObserver'in window){readerObserver=new IntersectionObserver(entries=>{const vis=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!vis)return;toc.querySelectorAll('[data-toc-target]').forEach(b=>b.classList.toggle('on',b.dataset.tocTarget===vis.target.id))},{rootMargin:'-86px 0px -68% 0px',threshold:[0,.2,1]});rows.forEach(r=>readerObserver.observe(r.el))}
 }
 side.append(toc);
}
if(typeof originalOpenDoc==='function'){
 window.openDoc=function(...args){const out=originalOpenDoc.apply(this,args);requestAnimationFrame(()=>setTimeout(buildReaderToc,0));return out};
}

function init(){
 style();document.body.classList.add('legalos-b2b-v17');commandLayout();mountGraph();
 const art=document.getElementById('art');if(art)new MutationObserver(()=>{if(art.classList.contains('on'))setTimeout(buildReaderToc,0)}).observe(art,{attributes:true,attributeFilter:['class']});
 if(art?.classList.contains('on'))buildReaderToc();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.LEGALOS_B2B_EXPERIENCE={ready:true,mountGraph,buildReaderToc,renderCommand,commandResults};
})();