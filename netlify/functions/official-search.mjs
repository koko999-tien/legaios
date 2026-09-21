const OFFICIAL_DOMAINS=[
  "vbpl.vn",
  "vanban.chinhphu.vn",
  "congbao.chinhphu.vn",
  "chinhphu.vn",
  "vbpl.moj.gov.vn"
];

function json(status,body,extra={}){
  return {
    statusCode:status,
    headers:{
      "Content-Type":"application/json; charset=utf-8",
      "Cache-Control":"public, max-age=300, stale-while-revalidate=600",
      "X-Content-Type-Options":"nosniff",
      ...extra
    },
    body:JSON.stringify(body)
  };
}
function decodeHtml(s){
  return String(s||"")
    .replace(/<[^>]+>/g," ")
    .replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'")
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ")
    .replace(/\s+/g," ").trim();
}
function officialHost(host){
  const h=String(host||"").toLowerCase().replace(/^www\./,"");
  return OFFICIAL_DOMAINS.some(d=>h===d||h.endsWith("."+d));
}
function normalizeResultUrl(raw){
  try{
    const u=new URL(raw,"https://html.duckduckgo.com/");
    if(/duckduckgo\.com$/i.test(u.hostname)){
      const target=u.searchParams.get("uddg");
      if(target)return normalizeResultUrl(decodeURIComponent(target));
    }
    if(u.protocol!=="https:"||!officialHost(u.hostname))return "";
    u.hash="";
    return u.toString();
  }catch{return ""}
}
function parseDuckHtml(html,sourceDomain){
  const out=[];
  const re=/<a[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for(const m of String(html||"").matchAll(re)){
    const url=normalizeResultUrl(m[1]);
    if(!url)continue;
    const title=decodeHtml(m[2]);
    if(!title)continue;
    out.push({title,url,host:new URL(url).hostname.replace(/^www\./,""),sourceDomain});
    if(out.length>=6)break;
  }
  return out;
}
async function searchDomain(domain,q,signal){
  const url="https://html.duckduckgo.com/html/?q="+encodeURIComponent("site:"+domain+" "+q);
  const res=await fetch(url,{
    signal,
    headers:{
      "User-Agent":"Mozilla/5.0 (compatible; CCPLMT-OfficialSourceDiscovery/1.0)",
      "Accept":"text/html,application/xhtml+xml"
    }
  });
  if(!res.ok)throw new Error("search upstream "+res.status);
  return parseDuckHtml(await res.text(),domain);
}
function directSources(q){
  return [
    {name:"CSDL quốc gia VBPL",url:"https://vbpl.vn/Pages/vbpq-timkiem.aspx",host:"vbpl.vn"},
    {name:"Hệ thống văn bản Chính phủ",url:"https://vanban.chinhphu.vn/",host:"vanban.chinhphu.vn"},
    {name:"Công báo Chính phủ",url:"https://congbao.chinhphu.vn/",host:"congbao.chinhphu.vn"}
  ].map(x=>({...x,query:q}));
}

export const handler=async(event)=>{
  if(event.httpMethod!=="GET")return json(405,{error:"method_not_allowed"});
  const q=String(event.queryStringParameters?.q||"").trim().replace(/\s+/g," ").slice(0,180);
  const limit=Math.max(1,Math.min(12,Number(event.queryStringParameters?.limit)||8));
  if(q.length<2)return json(400,{error:"query_too_short",results:[],directSources:directSources(q)});
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),6500);
  try{
    const settled=await Promise.allSettled(
      OFFICIAL_DOMAINS.slice(0,4).map(d=>searchDomain(d,q,controller.signal))
    );
    const seen=new Set(),results=[];
    for(const item of settled){
      if(item.status!=="fulfilled")continue;
      for(const row of item.value){
        const key=row.url.replace(/\/$/,"");
        if(seen.has(key))continue;
        seen.add(key);results.push(row);
        if(results.length>=limit)break;
      }
      if(results.length>=limit)break;
    }
    return json(200,{
      query:q,
      provider:"duckduckgo-html-discovery",
      verified:false,
      officialDomains:OFFICIAL_DOMAINS,
      results,
      directSources:directSources(q),
      fetchedAt:new Date().toISOString()
    });
  }catch(err){
    return json(200,{
      query:q,
      provider:"direct-source-fallback",
      verified:false,
      officialDomains:OFFICIAL_DOMAINS,
      results:[],
      directSources:directSources(q),
      warning:err?.name==="AbortError"?"upstream_timeout":"upstream_unavailable"
    });
  }finally{clearTimeout(timer)}
};
