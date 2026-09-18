/* LegalOS V14 — shared safety and legal-search helpers. Loaded before app.js. */
function esc(s=""){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function safeHttpUrl(value){
  try{const u=new URL(String(value||""),location.href);return (u.protocol==="http:"||u.protocol==="https:")?u.href:""}catch{return ""}
}
function safeId(value,prefix="id"){
  const s=String(value||"").trim().replace(/[^A-Za-z0-9_.:-]/g,"-").slice(0,96);
  return s||`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}
function safeImportedText(value,max=12000){
  return String(value??"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").slice(0,max);
}
function sanitizeImportedLegalHtml(raw){
  const root=document.createElement("div");root.innerHTML=String(raw||"");
  const allowed=new Set(["P","UL","OL","LI","H2","H3","H4","B","STRONG","EM","I","U","BR","A","BLOCKQUOTE","TABLE","THEAD","TBODY","TR","TH","TD","SPAN","SMALL"]);
  root.querySelectorAll("script,style,iframe,object,embed,svg,math,form,input,button,select,textarea,meta,link,base").forEach(el=>el.remove());
  [...root.querySelectorAll("*")].forEach(el=>{
    if(!allowed.has(el.tagName)){el.replaceWith(document.createTextNode(el.textContent||""));return}
    [...el.attributes].forEach(a=>{
      const n=a.name.toLowerCase();
      if(n.startsWith("on")||["style","src","srcdoc","formaction"].includes(n))el.removeAttribute(a.name);
      else if(n==="href"){
        const u=safeHttpUrl(a.value);if(u)el.setAttribute("href",u);else el.removeAttribute("href");
      }else if(n!=="title")el.removeAttribute(a.name);
    });
    if(el.tagName==="A"&&el.hasAttribute("href")){el.setAttribute("target","_blank");el.setAttribute("rel","noopener noreferrer")}
  });
  return root.innerHTML;
}
function normalizeImportedCase(c,i=0){
  c=(c&&typeof c==="object")?c:{};
  const input=(c.input&&typeof c.input==="object"&&!Array.isArray(c.input))?c.input:{};
  const cleanInput={};Object.entries(input).slice(0,80).forEach(([k,v])=>{cleanInput[safeImportedText(k,80)]=typeof v==="number"||typeof v==="boolean"?v:safeImportedText(v,1000)});
  const r=(c.result&&typeof c.result==="object")?c.result:{};
  return {id:safeId(c.id||`c-import-${i}`,"c"),name:safeImportedText(c.name||`Hồ sơ nhập ${i+1}`,300),createdAt:Number.isFinite(Date.parse(c.createdAt))?new Date(c.createdAt).toISOString():new Date().toISOString(),input:cleanInput,result:{group:safeImportedText(r.group??"Chưa kết luận",80),dtm:r.dtm===true?true:r.dtm===false?false:null,gp:r.gp===true?true:r.gp===false?false:null,notes:Array.isArray(r.notes)?r.notes.slice(0,100).map(x=>safeImportedText(x,2000)):[],screening:!!r.screening,refs:Array.isArray(r.refs)?r.refs.slice(0,100).map(x=>safeId(x,"ref")):[]},userNote:safeImportedText(c.userNote||"",50000)};
}
function normalizeExpertBrief(b,i=0){
  b=(b&&typeof b==="object")?b:{};const d=(b.data&&typeof b.data==="object")?b.data:{};const a=(b.analysis&&typeof b.analysis==="object")?b.analysis:{};
  return {id:safeId(b.id||`expert-import-${i}`,"expert"),createdAt:Number.isFinite(Date.parse(b.createdAt))?new Date(b.createdAt).toISOString():new Date().toISOString(),data:{...d,name:safeImportedText(d.name||"",300),phase:safeImportedText(d.phase||"",80),sector:safeImportedText(d.sector||"",80),location:safeImportedText(d.location||"",500),scale:safeImportedText(d.scale||"",500)},analysis:{...a,score:Math.max(0,Math.min(100,Number(a.score)||0))}};
}
function debounce(fn,ms=120){
  return (...args)=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>fn(...args),ms)}
}
function snippetText(html,q=""){
  const txt=plain(html).replace(/\s+/g," ").trim();
  if(!q)return txt.slice(0,150);
  const low=txt.toLowerCase(),needle=q.toLowerCase(),i=low.indexOf(needle);
  if(i<0)return txt.slice(0,150);
  const s=Math.max(0,i-55),e=Math.min(txt.length,i+needle.length+85);
  return (s>0?"…":"")+txt.slice(s,e)+(e<txt.length?"…":"");
}
function hi(text,q=""){
  const safe=esc(text);
  if(!q.trim())return safe;
  const re=new RegExp("("+q.trim().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")","ig");
  return safe.replace(re,"<mark>$1</mark>");
}

function foldVN(s=""){
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();
}
function cleanLegalQuery(s=""){return foldVN(s).replace(/[“”"']/g," ").replace(/\s+/g," ").trim()}
const SEARCH_SYNONYMS={
  dtm:["danh gia tac dong moi truong"],
  gpmt:["giay phep moi truong"],
  dkmt:["dang ky moi truong"],
  ctnh:["chat thai nguy hai"],
  knk:["khi nha kinh"],
  epr:["trach nhiem mo rong nha san xuat","trach nhiem tai che"],
  xlnt:["xu ly nuoc thai"],
  qcvn:["quy chuan ky thuat quoc gia"]
};
const SEARCH_STOPWORDS=new Set(["cua","toi","minh","phai","khong","thi","nao","gi","nhung","mot","cac","cho","ve","la","va","voi","trong","theo","duoc","hay","neu","muon","hoi"]);
const SEARCH_CONTEXT_EXPANSIONS=[
  {re:/\b(xuong|nha may|co so san xuat|co so)\b/,tokens:["co","so","san","xuat"]},
  {re:/\b(mo rong|nang cong suat|thay doi du an)\b/,tokens:["thay","doi","mo","rong","du","an"]},
  {re:/\b(nuoc thai|xa thai|thoat nuoc)\b/,tokens:["nuoc","thai","xa","thai"]},
  {re:/\b(khi thai|bui)\b/,tokens:["khi","thai","bui"]},
  {re:/\b(chat thai nguy hai|ctnh)\b/,tokens:["chat","thai","nguy","hai"]}
];
const SEARCH_INTENT_RULES=[
  {id:"gpmt",label:"Câu hỏi về giấy phép môi trường",re:/\b(gpmt|giay phep moi truong)\b/,tokens:["giay","phep","moi","truong","doi","tuong","cap","phep"]},
  {id:"dtm",label:"Câu hỏi về ĐTM",re:/\b(dtm|danh gia tac dong moi truong)\b/,tokens:["danh","gia","tac","dong","moi","truong","doi","tuong","du","an"]},
  {id:"dkmt",label:"Câu hỏi về đăng ký môi trường",re:/\b(dkmt|dang ky moi truong)\b/,tokens:["dang","ky","moi","truong","doi","tuong"]},
  {id:"water",label:"Câu hỏi về nước thải / tài nguyên nước",re:/\b(nuoc thai|xa thai|thoat nuoc|khai thac nuoc|su dung nuoc)\b/,tokens:["nuoc","thai","tai","nguyen","nuoc","xa","thai"]},
  {id:"waste",label:"Câu hỏi về chất thải",re:/\b(ctnh|chat thai nguy hai|chat thai)\b/,tokens:["chat","thai","nguy","hai","quan","ly"]},
  {id:"emission",label:"Câu hỏi về khí thải / bụi",re:/\b(khi thai|bui|phat thai)\b/,tokens:["khi","thai","bui","phat","thai"]}
];
function detectLegalIntent(q=""){
  const f=cleanLegalQuery(q),matches=SEARCH_INTENT_RULES.filter(x=>x.re.test(f));
  const context=SEARCH_CONTEXT_EXPANSIONS.filter(x=>x.re.test(f)).flatMap(x=>x.tokens);
  return {
    ids:matches.map(x=>x.id),
    labels:matches.map(x=>x.label),
    tokens:[...new Set([...matches.flatMap(x=>x.tokens),...context])],
    question:/\?|\b(co can|can phai|phai lam|quy dinh gi|thu tuc gi|kiem tra gi|co phai)\b/.test(f)
  };
}
function expandTokens(q){
  const base=cleanLegalQuery(q).split(/\s+/).filter(x=>x.length>1&&!SEARCH_STOPWORDS.has(x));
  const more=[];
  base.forEach(t=>{if(SEARCH_SYNONYMS[t])SEARCH_SYNONYMS[t].forEach(x=>more.push(...x.split(" ")))});
  const intent=detectLegalIntent(q);
  return [...new Set([...base,...more,...intent.tokens].filter(x=>x.length>1&&!SEARCH_STOPWORDS.has(x)))];
}
function parseLegalQuery(q=""){
  const raw=String(q).trim(),f=foldVN(raw);
  const art=(f.match(/\bdieu\s+(\d+[a-z]?)\b/)||[])[1]||"";
  const clause=(f.match(/\bkhoan\s+(\d+[a-z]?)\b/)||[])[1]||"";
  const point=(f.match(/\bdiem\s+([a-zđ])\b/)||[])[1]||"";
  const number=(raw.match(/\b\d{1,4}\/\d{4}\/[A-ZĐ-]{2,15}\b/i)||raw.match(/\b(?:NĐ|ND|TT|QĐ|QD|NQ)\s*\d{1,4}\/\d{4}(?:\/[A-ZĐ-]+)?\b/i)||[])[0]||"";
  const refs=[];
  if(art)refs.push(`Điều ${art}`);
  if(clause)refs.push(`Khoản ${clause}`);
  if(point)refs.push(`Điểm ${point}`);
  return {raw,fold:f,article:art,clause,point,number,refs,tokens:expandTokens(raw),intent:detectLegalIntent(raw)};
}
function extractLegalRefs(text=""){
  const s=plain(text).replace(/\s+/g," ");
  const out=[];
  const patterns=[
    /\bĐiều\s+\d+[a-zA-Z]?(?:\s*[–-]\s*\d+[a-zA-Z]?)?/gi,
    /\bKhoản\s+\d+[a-zA-Z]?/gi,
    /\bĐiểm\s+[a-zđ]\b/gi,
    /\bPhụ\s+lục\s+[IVXLC]+(?:\s*[–-]\s*[IVXLC]+)?/gi
  ];
  patterns.forEach(re=>(s.match(re)||[]).forEach(x=>out.push(x.replace(/\s+/g," ").trim())));
  return [...new Set(out)].slice(0,18);
}
