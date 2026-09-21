(function(){
'use strict';if(window.CCPLMT_GROUNDED_AI?.ready)return;
const $=id=>document.getElementById(id);
function sources(){
 const rows=typeof citationBasketV13!=="undefined"&&Array.isArray(citationBasketV13)?citationBasketV13:[];
 return rows.slice(0,12).map((x,i)=>{const d=typeof D!=="undefined"&&Array.isArray(D)?D.find(v=>v.id===x.doc):null;return{id:String(i+1),document:String(d?.ttl||x.doc||'Văn bản').slice(0,500),label:String(x.label||'Căn cứ').slice(0,500),text:String(x.text||'').slice(0,5000),source:/^https:\/\//i.test(String(x.source||''))?String(x.source).slice(0,2000):'',doc:x.doc||'',article:x.article||'',clause:x.clause||'',point:x.point||''}}).filter(x=>x.text);
}
function sync(){
 const n=sources().length,c=$('groundedAiSourceCount');if(c)c.textContent=n?n+' căn cứ sẽ được gửi':'Chưa có căn cứ để hỏi';
 const b=$('groundedAiAsk');if(b)b.disabled=false;
}
function state(text,kind=''){const n=$('groundedAiStatus');if(n){n.className='grounded-ai-status '+kind;n.textContent=text}}
function openRef(r){if(!r?.doc||typeof openDoc!=='function')return;const q=[r.point&&'Điểm '+r.point,r.clause&&'Khoản '+r.clause,r.article&&'Điều '+r.article].filter(Boolean).join(' ');openDoc(r.doc,q)}
function answerNodes(out,text,rows){String(text||'').split(/(\[\d{1,2}\])/g).forEach(p=>{const m=p.match(/^\[(\d+)\]$/),r=m&&rows[Number(m[1])-1];if(r){const b=document.createElement('button');b.type='button';b.className='grounded-ai-cite';b.textContent=p;b.title='Mở '+r.label;b.onclick=()=>openRef(r);out.append(b)}else out.append(document.createTextNode(p))})}
function render(answer,rows,meta={}){
 const host=$('groundedAiAnswer');if(!host)return;host.replaceChildren();
 const out=document.createElement('div');out.className='grounded-ai-output';answerNodes(out,answer,rows);
 const refs=document.createElement('div');refs.className='grounded-ai-refs';
 const title=document.createElement('b');title.textContent='Căn cứ đã gửi';refs.append(title);
 rows.forEach((r,i)=>{const line=document.createElement('div'),mark=document.createElement('span');mark.textContent='['+(i+1)+']';line.append(mark);if(r.source){const a=document.createElement('a');a.href=r.source;a.target='_blank';a.rel='noopener noreferrer';a.textContent=r.label;line.append(a)}else{const t=document.createElement('span');t.textContent=r.label;line.append(t)}refs.append(line)});
 const foot=document.createElement('small');foot.textContent='AI chỉ hỗ trợ đọc các căn cứ đã chọn; cần mở nguồn gốc và kiểm tra hiệu lực trước khi áp dụng.'+(meta.model?' · '+meta.model:'');
 host.append(out,refs,foot);
}
async function ask(){
 const q=String($('groundedAiQuestion')?.value||'').trim(),rows=sources(),b=$('groundedAiAsk');
 if(!rows.length){state('Hãy thêm ít nhất một căn cứ trước khi hỏi.','error');return}
 if(q.length<3){state('Nhập câu hỏi cụ thể hơn.','error');$('groundedAiQuestion')?.focus();return}
 if(b){b.disabled=true;b.textContent='Đang đối chiếu…'}state('Đang gửi câu hỏi và các căn cứ đã chọn tới AI…','loading');
 try{
   const sent=rows.map(({doc,article,clause,point,...x})=>x),res=await fetch('/.netlify/functions/grounded-ai',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({question:q,sources:sent})});
   const data=await res.json().catch(()=>({}));
   if(res.status===503&&data.error==='ai_not_configured'){state('AI chưa được cấu hình trên bản deploy này. Cần đặt GEMINI_API_KEY ở Netlify; các chức năng tra cứu khác vẫn hoạt động bình thường.','error');return}
   if(!res.ok)throw new Error(data.error||('HTTP '+res.status));
   render(data.answer,rows,{model:data.model});state('Đã trả lời từ '+rows.length+' căn cứ đã chọn.','ok');
 }catch(e){console.error(e);state('Không thể gọi AI lúc này. Căn cứ của bạn vẫn được giữ cục bộ.','error')}
 finally{if(b){b.disabled=false;b.textContent='Hỏi từ căn cứ đã chọn'}}
}
function clear(){const a=$('groundedAiAnswer');if(a)a.replaceChildren();if($('groundedAiQuestion'))$('groundedAiQuestion').value='';state('')}
document.addEventListener('click',e=>{if(e.target?.closest?.('#groundedAiAsk'))ask();if(e.target?.closest?.('#groundedAiClear'))clear()});
window.CCPLMT_GROUNDED_AI={ready:true,ask,clear,sync,sources};sync();
})();