(function(){
'use strict';if(window.LEGALOS_OFFICIAL_SEARCH_V4?.ready)return;
const cache=new Map,ALLOWED=["vbpl.vn","vanban.chinhphu.vn","congbao.chinhphu.vn","chinhphu.vn","vbpl.moj.gov.vn"];
const el=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x!==undefined)n.textContent=x;return n},clear=n=>{while(n?.firstChild)n.removeChild(n.firstChild)};
function hostOk(h){h=String(h||"").toLowerCase().replace(/^www\./,"");return ALLOWED.some(d=>h===d||h.endsWith("."+d))}
function safeUrl(v){try{const u=new URL(v,location.href);return u.protocol==="https:"&&hostOk(u.hostname)?u.toString():""}catch{return""}}
function query(){return String(document.getElementById("q")?.value||"").trim().replace(/\s+/g," ")}
function panel(){
 let p=document.getElementById("officialSearchV4");if(p)return p;const a=document.querySelector(".search-intelligence");if(!a)return null;
 p=el("section","official-search-v4");p.id="officialSearchV4";
 const head=el("div","official-search-v4-head"),copy=el("div"),controls=el("div","official-search-v4-controls"),state=el("div","official-search-v4-state"),results=el("div","official-search-v4-results"),btn=el("button","btn bs","Mở rộng nguồn chính thức");
 state.id="officialSearchState";results.id="officialSearchResults";btn.id="officialSearchBtn";btn.type="button";
 copy.append(el("div","section-kicker","SEARCH V4 · NGUỒN CHÍNH THỨC"),el("h3","","Mở rộng tra cứu trên web chính thức"),el("p","official-search-v4-copy","Search V3 vẫn ưu tiên dữ liệu cục bộ. Chỉ khi bấm tìm web, truy vấn mới được gửi ra ngoài để phát hiện liên kết trên các miền chính thức."));
 head.append(copy,el("span","official-search-v4-badge","Không tự xác minh nội dung"));
 const ql=el("div","official-search-v4-query","Chưa có truy vấn.");controls.append(ql,btn);
 p.append(head,controls,el("p","official-search-v4-privacy","Bản thử nghiệm chỉ gửi chuỗi truy vấn, không gửi hồ sơ, ghi chú hay tài liệu đã nhập. Kết quả web chỉ là liên kết phát hiện trên miền chính thức và chưa được coi là dữ liệu đã kiểm định trong kho."),state,results);
 a.insertAdjacentElement("afterend",p);btn.onclick=run;document.getElementById("q")?.addEventListener("input",sync);sync();return p
}
function sync(){const p=panel();if(!p)return;const q=query(),l=p.querySelector(".official-search-v4-query"),b=p.querySelector("#officialSearchBtn");if(l)l.textContent=q?'Truy vấn web: “'+q+'”':"Nhập từ khóa ở ô tra cứu phía trên.";if(b)b.disabled=q.length<2;const last=p.dataset.query||"";if(last&&last!==q){clear(p.querySelector("#officialSearchResults"));const s=p.querySelector("#officialSearchState");if(s)s.textContent="Kết quả web cũ đã được ẩn vì truy vấn đã thay đổi."}}
function renderDirect(h,rows){if(!Array.isArray(rows)||!rows.length)return;const w=el("div","official-search-v4-direct"),links=el("div","official-search-v4-direct-links");rows.forEach(r=>{const u=safeUrl(r.url);if(!u)return;const a=el("a","tiny",r.name||r.host||"Nguồn chính thức");a.href=u;a.target="_blank";a.rel="noopener noreferrer";links.append(a)});w.append(el("b","","Mở cổng chính thức trực tiếp"),links);h.append(w)}
function render(data,q){
 const p=panel(),s=p?.querySelector("#officialSearchState"),h=p?.querySelector("#officialSearchResults");if(!p||!h)return;p.dataset.query=q;clear(h);
 const rows=Array.isArray(data?.results)?data.results.filter(r=>safeUrl(r.url)):[];
 if(s){s.className="official-search-v4-state";s.textContent=rows.length?rows.length+" liên kết trên miền chính thức được phát hiện. Hãy mở nguồn và tự kiểm tra hiệu lực/nội dung trước khi dùng.":"Chưa phát hiện kết quả phù hợp từ chỉ mục web. Có thể mở trực tiếp các cổng chính thức bên dưới."}
 if(rows.length){const list=el("div","official-search-v4-list");rows.forEach(r=>{const u=safeUrl(r.url);if(!u)return;
   const card=el("article","official-search-v4-item"),meta=el("div","official-search-v4-meta"),a=el("a","official-search-v4-title",r.title||u),url=el("small","official-search-v4-url",u),actions=el("div","official-search-v4-item-actions"),review=el("button","tiny","Đưa vào hàng rà soát");
   meta.append(el("span","official-search-v4-host",r.host||new URL(u).hostname),el("span","official-search-v4-unverified","Kết quả web · chưa kiểm định"));a.href=u;a.target="_blank";a.rel="noopener noreferrer";review.type="button";
   review.onclick=async()=>{review.disabled=true;review.textContent="Đang lưu…";try{if(typeof window.workspaceDataCall!=="function")throw 0;const ok=await window.workspaceDataCall("officialCandidateAddV15",[{title:r.title||u,url:u,host:r.host||new URL(u).hostname,query:q,status:"review"}]);review.textContent=ok?"Đã đưa vào rà soát":"Đã có trong hàng rà soát"}catch(e){console.error(e);review.disabled=false;review.textContent="Thử lại đưa vào rà soát"}};
   actions.append(review);card.append(meta,a,url,actions);list.append(card)});h.append(list)}
 renderDirect(h,data?.directSources)
}
async function run(){
 const q=query(),p=panel(),b=p?.querySelector("#officialSearchBtn"),s=p?.querySelector("#officialSearchState");if(q.length<2)return;if(cache.has(q)){render(cache.get(q),q);return}
 if(b){b.disabled=true;b.textContent="Đang tìm nguồn…"}if(s){s.className="official-search-v4-state loading";s.textContent="Đang phát hiện liên kết trên các miền chính thức…"}
 const ac=new AbortController,t=setTimeout(()=>ac.abort(),9000);
 try{const r=await fetch("/.netlify/functions/official-search?q="+encodeURIComponent(q)+"&limit=8",{signal:ac.signal,headers:{Accept:"application/json"}});if(!r.ok)throw 0;const d=await r.json();cache.set(q,d);render(d,q)}
 catch(e){if(s){s.className="official-search-v4-state error";s.textContent=e?.name==="AbortError"?"Tìm nguồn quá thời gian. Bạn vẫn có thể mở trực tiếp các cổng chính thức.":"Không gọi được bộ tìm web trên bản chạy này. Local Search V3 vẫn hoạt động bình thường."}const h=p?.querySelector("#officialSearchResults");if(h){clear(h);renderDirect(h,[{name:"CSDL quốc gia VBPL",url:"https://vbpl.vn/Pages/vbpq-timkiem.aspx"},{name:"Hệ thống văn bản Chính phủ",url:"https://vanban.chinhphu.vn/"},{name:"Công báo Chính phủ",url:"https://congbao.chinhphu.vn/"}])}}
 finally{clearTimeout(t);if(b){b.disabled=q.length<2;b.textContent="Mở rộng nguồn chính thức"}}
}
window.LEGALOS_OFFICIAL_SEARCH_V4={ready:true,version:4,run,syncQuery:sync};panel();
})();