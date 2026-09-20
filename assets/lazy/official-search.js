(function(){
'use strict';
if(window.LEGALOS_OFFICIAL_SEARCH_V4?.ready)return;
const cache=new Map();
const ALLOWED=["vbpl.vn","vanban.chinhphu.vn","congbao.chinhphu.vn","chinhphu.vn","vbpl.moj.gov.vn"];
function hostOk(host){const h=String(host||"").toLowerCase().replace(/^www\./,"");return ALLOWED.some(d=>h===d||h.endsWith("."+d))}
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
function clear(n){while(n?.firstChild)n.removeChild(n.firstChild)}
function safeUrl(v){try{const u=new URL(v,location.href);return u.protocol==="https:"&&hostOk(u.hostname)?u.toString():""}catch{return ""}}
function panel(){
  let p=document.getElementById("officialSearchV4");if(p)return p;
  const anchor=document.querySelector(".search-intelligence");if(!anchor)return null;
  p=el("section","official-search-v4");p.id="officialSearchV4";
  const head=el("div","official-search-v4-head");
  const copy=el("div");
  const kicker=el("div","section-kicker","SEARCH V4 · NGUỒN CHÍNH THỨC");
  const h=el("h3","", "Mở rộng tra cứu trên web chính thức");
  const sub=el("p","official-search-v4-copy","Search V3 vẫn ưu tiên dữ liệu cục bộ. Chỉ khi bấm tìm web, truy vấn mới được gửi ra ngoài để phát hiện liên kết trên các miền chính thức.");
  copy.append(kicker,h,sub);
  const badge=el("span","official-search-v4-badge","Không tự xác minh nội dung");
  head.append(copy,badge);

  const controls=el("div","official-search-v4-controls");
  const qlabel=el("div","official-search-v4-query","Chưa có truy vấn.");
  const btn=el("button","btn bs","Mở rộng nguồn chính thức");btn.type="button";btn.id="officialSearchBtn";
  controls.append(qlabel,btn);

  const privacy=el("p","official-search-v4-privacy","Bản thử nghiệm chỉ gửi chuỗi truy vấn, không gửi hồ sơ, ghi chú hay tài liệu đã nhập. Hàm máy chủ dùng chỉ mục DuckDuckGo để phát hiện liên kết rồi chỉ giữ các miền chính thức; kết quả web chưa được coi là dữ liệu đã kiểm định trong kho.");
  const state=el("div","official-search-v4-state");state.id="officialSearchState";
  const results=el("div","official-search-v4-results");results.id="officialSearchResults";
  p.append(head,controls,privacy,state,results);
  anchor.insertAdjacentElement("afterend",p);

  btn.addEventListener("click",()=>run());
  document.getElementById("q")?.addEventListener("input",sync);
  sync();
  return p;
}
function query(){return String(document.getElementById("q")?.value||"").trim().replace(/\s+/g," ")}
function sync(){
  const p=panel();if(!p)return;
  const q=query(),label=p.querySelector(".official-search-v4-query"),btn=p.querySelector("#officialSearchBtn");
  if(label)label.textContent=q?'Truy vấn web: “'+q+'”':"Nhập từ khóa ở ô tra cứu phía trên.";
  if(btn)btn.disabled=q.length<2;
  const last=p.dataset.query||"";
  if(last&&last!==q){clear(p.querySelector("#officialSearchResults"));const s=p.querySelector("#officialSearchState");if(s)s.textContent="Kết quả web cũ đã được ẩn vì truy vấn đã thay đổi."}
}
function renderDirect(host,rows){
  if(!Array.isArray(rows)||!rows.length)return;
  const wrap=el("div","official-search-v4-direct");
  const title=el("b","", "Mở cổng chính thức trực tiếp");
  const links=el("div","official-search-v4-direct-links");
  rows.forEach(r=>{const u=safeUrl(r.url);if(!u)return;const a=el("a","tiny",r.name||r.host||"Nguồn chính thức");a.href=u;a.target="_blank";a.rel="noopener noreferrer";links.append(a)});
  wrap.append(title,links);host.append(wrap);
}
function render(data,q){
  const p=panel(),state=p?.querySelector("#officialSearchState"),host=p?.querySelector("#officialSearchResults");if(!p||!host)return;
  p.dataset.query=q;clear(host);
  const rows=Array.isArray(data?.results)?data.results.filter(r=>safeUrl(r.url)):[];

  if(state){
    state.className="official-search-v4-state";
    state.textContent=rows.length?rows.length+" liên kết trên miền chính thức được phát hiện. Hãy mở nguồn và tự kiểm tra hiệu lực/nội dung trước khi dùng.":"Chưa phát hiện kết quả phù hợp từ chỉ mục web. Có thể mở trực tiếp các cổng chính thức bên dưới.";
  }
  if(rows.length){
    const list=el("div","official-search-v4-list");
    rows.forEach(r=>{
      const u=safeUrl(r.url);if(!u)return;
      const card=el("article","official-search-v4-item");
      const meta=el("div","official-search-v4-meta");
      meta.append(el("span","official-search-v4-host",r.host||new URL(u).hostname),el("span","official-search-v4-unverified","Kết quả web · chưa kiểm định"));
      const a=el("a","official-search-v4-title",r.title||u);a.href=u;a.target="_blank";a.rel="noopener noreferrer";
      const url=el("small","official-search-v4-url",u);
      card.append(meta,a,url);list.append(card);
    });
    host.append(list);
  }
  renderDirect(host,data?.directSources);
}
async function run(){
  const q=query(),p=panel(),btn=p?.querySelector("#officialSearchBtn"),state=p?.querySelector("#officialSearchState");if(q.length<2)return;
  if(cache.has(q)){render(cache.get(q),q);return}
  if(btn){btn.disabled=true;btn.textContent="Đang tìm nguồn…"}
  if(state){state.className="official-search-v4-state loading";state.textContent="Đang phát hiện liên kết trên các miền chính thức…"}
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),9000);
  try{
    const res=await fetch("/.netlify/functions/official-search?q="+encodeURIComponent(q)+"&limit=8",{signal:ac.signal,headers:{"Accept":"application/json"}});
    if(!res.ok)throw new Error("HTTP "+res.status);
    const data=await res.json();cache.set(q,data);render(data,q);
  }catch(err){
    if(state){state.className="official-search-v4-state error";state.textContent=err?.name==="AbortError"?"Tìm nguồn quá thời gian. Bạn vẫn có thể mở trực tiếp các cổng chính thức.":"Không gọi được bộ tìm web trên bản chạy này. Local Search V3 vẫn hoạt động bình thường."}
    const host=p?.querySelector("#officialSearchResults");if(host){clear(host);renderDirect(host,[{name:"CSDL quốc gia VBPL",url:"https://vbpl.vn/Pages/vbpq-timkiem.aspx"},{name:"Hệ thống văn bản Chính phủ",url:"https://vanban.chinhphu.vn/"},{name:"Công báo Chính phủ",url:"https://congbao.chinhphu.vn/"}])}
  }finally{clearTimeout(timer);if(btn){btn.disabled=q.length<2;btn.textContent="Mở rộng nguồn chính thức"}}
}
window.LEGALOS_OFFICIAL_SEARCH_V4={ready:true,version:4,run,syncQuery:sync};
panel();
})();