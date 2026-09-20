(function(){
'use strict';
if(typeof legalSearchScore!=='function'||typeof searchEligible!=='function')return;
const baseScore=legalSearchScore,baseCoach=renderSearchCoach,profiles=new Map();
const COMMON=new Set(['va','cua','cho','trong','theo','voi','cac','mot','nhung','duoc','la','toi','minh','phai','thi','nao','gi','hay','neu','muon','hoi','nay','do','nhu','can','lam','sao','the']);
const ALIASES=[
 {id:'gpmt',label:'Giấy phép môi trường',re:/\b(gpmt|giay phep moi truong|xin phep moi truong)\b/,terms:'giay phep moi truong cap phep doi tuong dieu chinh',anchors:[['giay','phep','moi','truong']]},
 {id:'dtm',label:'Đánh giá tác động môi trường',re:/\b(dtm|danh gia tac dong moi truong)\b/,terms:'danh gia tac dong moi truong du an tham dinh',anchors:[['dtm'],['danh','gia','tac','dong']]},
 {id:'dmc',label:'Đánh giá môi trường chiến lược',re:/\b(dmc|danh gia moi truong chien luoc)\b/,terms:'danh gia moi truong chien luoc quy hoach',anchors:[['dmc'],['chien','luoc']]},
 {id:'dkmt',label:'Đăng ký môi trường',re:/\b(dkmt|dang ky moi truong)\b/,terms:'dang ky moi truong doi tuong',anchors:[['dkmt'],['dang','ky']]},
 {id:'hazard',label:'Chất thải nguy hại',re:/\b(ctnh|chat thai nguy hai)\b/,terms:'chat thai nguy hai ctnh nguong quan ly',anchors:[['chat','thai','nguy','hai']]},
 {id:'waste',label:'Chất thải',re:/\b(rac|chat thai|phe lieu|chat thai ran)\b/,terms:'chat thai phe lieu chat thai ran quan ly xu ly',anchors:[['chat','thai'],['phe','lieu']]},
 {id:'epr',label:'EPR · tái chế',re:/\b(epr|tai che|bao bi|trach nhiem mo rong)\b/,terms:'epr tai che bao bi trach nhiem nha san xuat nhap khau',anchors:[['epr'],['tai','che']]},
 {id:'chemical',label:'Hóa chất',re:/\b(hoa chat|chemical|msds|sds|su co hoa chat|chi trong son)\b/,terms:'hoa chat an toan su co nguy hiem san pham son chi',anchors:[['hoa','chat']]},
 {id:'wastewater',label:'Nước thải',re:/\b(nuoc thai|xa thai|xu ly nuoc thai)\b/,terms:'nuoc thai xa thai xu ly nuoc thai cong nghiep sinh hoat',anchors:[['nuoc','thai']]},
 {id:'water',label:'Tài nguyên nước',re:/\b(khai thac nuoc|tai nguyen nuoc|nguon nuoc|nuoc duoi dat|nuoc mat)\b/,terms:'tai nguyen nuoc khai thac su dung nguon nuoc nuoc duoi dat',anchors:[['tai','nguyen','nuoc']]},
 {id:'air',label:'Khí thải · không khí',re:/\b(khi thai|khong khi|bui|phat thai)\b/,terms:'khi thai khong khi bui phat thai cong nghiep',anchors:[['khi','thai'],['khong','khi']]},
 {id:'monitor',label:'Quan trắc môi trường',re:/\b(quan trac|giam sat moi truong|theo doi moi truong)\b/,terms:'quan trac giam sat moi truong dinh ky tu dong lien tuc du lieu',anchors:[['quan','trac']]},
 {id:'climate',label:'Khí nhà kính · carbon',re:/\b(knk|khi nha kinh|carbon|kiem ke khi nha kinh)\b/,terms:'khi nha kinh carbon kiem ke phat thai thi truong carbon',anchors:[['khi','nha','kinh'],['carbon']]},
 {id:'noise',label:'Tiếng ồn · độ rung',re:/\b(tieng on|do rung|o nhiem tieng on)\b/,terms:'tieng on do rung moi truong qcvn',anchors:[['tieng','on'],['do','rung']]},
 {id:'land',label:'Đất đai',re:/\b(dat dai|su dung dat|thu hoi dat|thue dat)\b/,terms:'dat dai su dung dat thu hoi thue dat dia chinh',anchors:[['dat','dai']]},
 {id:'mineral',label:'Địa chất · khoáng sản',re:/\b(khoang san|dia chat|khai thac mo|dong cua mo)\b/,terms:'dia chat khoang san khai thac mo phuc hoi dong cua mo',anchors:[['khoang','san'],['dia','chat']]}
];
const ACTIONS=[
 {id:'apply',label:'xác định đối tượng áp dụng',re:/\b(co can|co phai|thuoc doi tuong|doi tuong nao|ap dung|truong hop nao|mien|khong phai)\b/,terms:'doi tuong ap dung truong hop phai mien loai tru'},
 {id:'procedure',label:'thủ tục / hồ sơ',re:/\b(thu tuc|ho so|bieu mau|nop o dau|xin phep|dang ky|dieu chinh)\b/,terms:'thu tuc ho so bieu mau nop tiep nhan cap phep dang ky dieu chinh'},
 {id:'authority',label:'thẩm quyền / cơ quan',re:/\b(tham quyen|co quan nao|ai cap|ai phe duyet|ubnd|bo nao|so nao)\b/,terms:'tham quyen co quan bo ubnd chu tich cap phep phe duyet tiep nhan'},
 {id:'deadline',label:'thời hạn / tần suất',re:/\b(thoi han|bao lau|khi nao|han nop|tan suat|dinh ky|hang nam|hang quy|bao nhieu lan)\b/,terms:'thoi han ngay dinh ky hang nam hang quy tan suat ky bao cao'},
 {id:'penalty',label:'xử phạt / vi phạm',re:/\b(xu phat|bi phat|muc phat|vi pham|phat tien|xu ly vi pham)\b/,terms:'xu phat vi pham phat tien muc phat hanh chinh'},
 {id:'standard',label:'quy chuẩn / ngưỡng',re:/\b(qcvn|quy chuan|nguong|gioi han|thong so|tieu chuan)\b/,terms:'qcvn quy chuan nguong gioi han thong so ky thuat'},
 {id:'current',label:'văn bản hiện hành / cập nhật',re:/\b(hien hanh|moi nhat|con hieu luc|hieu luc|sua doi|thay the|hop nhat)\b/,terms:'hieu luc sua doi thay the hop nhat hien hanh ap dung'},
 {id:'report',label:'báo cáo / kế hoạch',re:/\b(bao cao|ke hoach|bao cao dinh ky|nop bao cao|ket qua)\b/,terms:'bao cao ke hoach dang ky nop hang nam ket qua'}
];
function rawTokens(v){
 const a=cleanLegalQuery(v).match(/[\p{L}\p{N}_]+/gu)||[];
 return a.filter((t,i)=>t.length>1&&(!COMMON.has(t)||(t==='ve'&&i>0&&a[i-1]==='bao')));
}
function uniq(a){return [...new Set(a)]}
function lev(a,b,max=2){
 if(a===b)return 0;if(Math.abs(a.length-b.length)>max)return max+1;
 let p=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){const c=[i];let min=i;for(let j=1;j<=b.length;j++){c[j]=Math.min(c[j-1]+1,p[j]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));if(c[j]<min)min=c[j]}if(min>max)return max+1;p=c}return p[b.length];
}
function sim(a,b){
 if(!a||!b||a.length<4||b.length<4)return a===b?1:0;
 const max=Math.max(a.length,b.length),d=lev(a,b,max>=5?2:1);return d>2?0:1-d/max;
}
function field(v){const text=cleanLegalQuery(v),tokens=rawTokens(text);return {text,tokens,set:new Set(tokens)}}
function topicLabel(d){
 const id=String(d?.t||''),els=document.querySelectorAll('#chips [data-t]');
 for(const el of els)if(el.dataset.t===id){const v=el.querySelector('span')?.textContent||el.textContent||id;return v.replace(/\s+\d+\s*$/,'').trim()}
 return id;
}
let corpusDf=null;
function profile(d){
 if(profiles.has(d.id))return profiles.get(d.id);
 const m=metaOf(d.id),core=typeof coreArticlesForDoc==='function'?coreArticlesForDoc(d.id):[];
 const p={
  title:field(d.ttl||''),topic:field(topicLabel(d)),type:field(d.k||''),rel:field((m.rel||'')+' '+(m.issued||'')+' '+(m.eff||'')),
  structured:field((typeof clauseSearchText==='function'?clauseSearchText(d.id):'')+' '+core.flatMap(x=>[x.ref,x.title,x.theme,x.summary,x.caution]).join(' ')),
  body:field(plain(d.b||'')+' '+(typeof deepGuideFor==='function'?plain(deepGuideFor(d.id)):''))
 };
 p.all=uniq([...p.title.tokens,...p.topic.tokens,...p.type.tokens,...p.rel.tokens,...p.structured.tokens,...p.body.tokens]);
 p.allSet=new Set(p.all);p.important=uniq([...p.title.tokens,...p.topic.tokens,...p.type.tokens,...p.rel.tokens,...p.structured.tokens]).slice(0,320);
 profiles.set(d.id,p);return p;
}
function ensureCorpus(){
 if(corpusDf)return;corpusDf=new Map();
 for(const d of D)for(const t of profile(d).allSet)corpusDf.set(t,(corpusDf.get(t)||0)+1);
}
function idf(t){ensureCorpus();return 1+Math.log((D.length+1)/((corpusDf.get(t)||0)+1))}
function fieldWeighted(p,t){
 const [w,label]=exactWeight(p,t);if(!w)return [0,label];
 return [Math.round(w*(.62+.32*Math.min(3.2,idf(t)))),label];
}
function exactWeight(p,t){
 if(p.title.set.has(t))return [48,'Tên văn bản'];
 if(p.topic.set.has(t))return [36,'Lĩnh vực'];
 if(p.type.set.has(t))return [26,'Loại văn bản'];
 if(p.rel.set.has(t))return [20,'Quan hệ/hiệu lực'];
 if(p.structured.set.has(t))return [18,'Điều khoản đã lập mục'];
 if(p.body.set.has(t))return [9,'Nội dung tóm tắt'];
 return [0,''];
}
function near(t,p){
 if(t.length<5)return null;
 let best='',score=0,where='';
 const pools=[[p.title.tokens,'Tên văn bản'],[p.topic.tokens,'Lĩnh vực'],[p.structured.tokens,'Điều khoản'],[p.important,'Nội dung']];
 for(const [pool,label] of pools)for(const c of pool){
  if(Math.abs(c.length-t.length)>2)continue;if(t[0]!==c[0]&&t.slice(0,2)!==c.slice(0,2))continue;
  const s=sim(t,c);if(s>score){score=s;best=c;where=label}if(s>=.93)break;
 }
 return score>=.72?{token:best,score,where}:null;
}
function legalNumberKey(v){return cleanLegalQuery(v).replace(/nghi dinh/g,'nd').replace(/thong tu/g,'tt').replace(/nghi quyet/g,'nq').replace(/quyet dinh/g,'qd').replace(/van ban hop nhat/g,'vbhn').replace(/[^a-z0-9]/g,'')}
function looseNumberMatch(q,p){
 const k=legalNumberKey(q);if(!/20\d{2}/.test(k)||k.length<6)return false;
 if(p.title.text.replace(/[^a-z0-9]/g,'').includes(k))return true;
 const nums=cleanLegalQuery(q).match(/\b\d{1,4}\b/g)||[];
 return nums.length>=2&&/(nghi dinh|\bnd\b|thong tu|\btt\b|nghi quyet|\bnq\b|quyet dinh|\bqd\b|qh\d+|vbhn)/.test(cleanLegalQuery(q))&&nums.every(n=>p.title.text.includes(n));
}
function model(q){
 const primary=uniq(rawTokens(q)),expanded=uniq((typeof expandTokens==='function'?expandTokens(q):primary).filter(x=>!COMMON.has(x)));
 const fold=cleanLegalQuery(q),aliases=ALIASES.filter(a=>a.re.test(fold)),actions=ACTIONS.filter(a=>a.re.test(fold));
 return {primary,expanded,fold,aliases,actions,phrase:primary.join(' '),intent:typeof detectLegalIntent==='function'?detectLegalIntent(q):{labels:[]}};
}
function aliasBoost(m,p,reasons){
 let total=0,hits=0;const labels=[];
 for(const a of m.aliases){
  const ts=rawTokens(a.terms),hit=ts.filter(t=>p.allSet.has(t)).length,ratio=ts.length?hit/ts.length:0;
  const anchored=!a.anchors||a.anchors.some(g=>g.every(t=>p.allSet.has(t)));
  const directAlias=a.re.test(m.fold),directAcronym=directAlias&&m.primary.length===1&&m.primary[0]===a.id;
  if(!anchored&&!(directAlias&&ratio>=.5))continue;
  if(ratio>=.38){
   total+=Math.round((directAcronym?54:34)+ratio*(directAcronym?42:34));hits++;labels.push(a.label);
   if(reasons.length<6)reasons.push((directAcronym?'Mở rộng viết tắt: ':'Đúng chủ đề: ')+a.label);
  }
 }
 if(hits>=2){total+=48;reasons.push('Khớp đồng thời nhiều chủ đề')}
 return {total,strong:hits>0,hits,labels};
}
function actionBoost(m,p,reasons){
 let total=0,hits=0;const labels=[];
 for(const a of m.actions){
  const ts=rawTokens(a.terms),n=ts.filter(t=>p.allSet.has(t)).length,ratio=ts.length?n/ts.length:0;
  let special=0;
  if(a.id==='current'&&(p.type.text.includes('van ban hop nhat')||p.title.text.includes('hop nhat')))special=48;
  if(a.id==='standard'&&(p.type.text.includes('qcvn')||p.title.text.includes('qcvn')))special=62;
  if(a.id==='penalty'&&(p.title.text.includes('xu phat')||p.body.text.includes('xu phat')))special=66;
  if(ratio>=.24||special){total+=Math.max(special,Math.round(18+ratio*44));hits++;labels.push(a.label);if(reasons.length<6)reasons.push('Đúng mục tiêu: '+a.label)}
 }
 if(hits>=2)total+=24;
 return {total,hits,labels};
}
const KIND_RULES=[
 {re:/\b(qcvn|quy chuan)\b/,label:'QCVN',match:p=>p.type.text.includes('qcvn')||p.title.text.includes('qcvn'),boost:170},
 {re:/\b(van ban hop nhat|hop nhat)\b/,label:'Văn bản hợp nhất',match:p=>p.type.text.includes('van ban hop nhat')||p.title.text.includes('hop nhat'),boost:170},
 {re:/\bnghi dinh\b/,label:'Nghị định',match:p=>p.type.text.includes('nghi dinh'),boost:72},
 {re:/\bthong tu\b/,label:'Thông tư',match:p=>p.type.text.includes('thong tu'),boost:72},
 {re:/\bluat\b/,label:'Luật',match:p=>p.type.text.includes('luat'),boost:68},
 {re:/\b(quyet dinh|qd)\b/,label:'Quyết định',match:p=>p.type.text.includes('quyet dinh'),boost:68},
 {re:/\b(nghi quyet|nq)\b/,label:'Nghị quyết',match:p=>p.type.text.includes('nghi quyet'),boost:68}
];
function kindBoost(m,p,reasons){
 let total=0,hits=0;
 for(const k of KIND_RULES)if(k.re.test(m.fold)&&k.match(p)){total+=k.boost;hits++;if(reasons.length<6)reasons.push('Đúng loại văn bản: '+k.label)}
 return {total,hits};
}
function proximity(primary,p){
 if(primary.length<2)return 0;const pos=primary.map(t=>p.all.indexOf(t));if(pos.some(x=>x<0))return 0;
 const span=Math.max(...pos)-Math.min(...pos)+1;
 return span<=primary.length+3?34:span<=primary.length*4?16:0;
}
function scoreV2(d,q){
 const base=baseScore(d,q);if(!String(q||'').trim())return {...base,matched:true,quality:'all',coverage:1,fuzzyHits:0};
 const m=model(q),p=profile(d),reasons=[],seen=new Set();let boost=0,hits=0,fuzzyHits=0,strongField=0,lexical=0;
 const number=looseNumberMatch(q,p)||(base.reasons||[]).some(x=>x.includes('Đúng số hiệu'));
 if(number){boost+=185;reasons.push('Khớp số hiệu văn bản')}
 if(m.phrase&&m.primary.length>=2){
  if(p.title.text.includes(m.phrase)){boost+=155;reasons.push('Khớp cụm trong tên văn bản');strongField++}
  else if(p.topic.text.includes(m.phrase)){boost+=105;reasons.push('Khớp cụm lĩnh vực');strongField++}
  else if(p.structured.text.includes(m.phrase)){boost+=78;reasons.push('Khớp cụm trong điều khoản');strongField++}
  else if(p.body.text.includes(m.phrase)){boost+=44;reasons.push('Khớp cụm nội dung')}
 }
 if(m.primary.length>=2){
  let fragment=0,where='';
  for(let i=0;i<m.primary.length-1;i++){
   const pair=m.primary[i]+' '+m.primary[i+1];
   if(p.title.text.includes(pair)&&fragment<112){fragment=112;where='tên văn bản'}
   else if(p.topic.text.includes(pair)&&fragment<76){fragment=76;where='lĩnh vực'}
   else if(p.structured.text.includes(pair)&&fragment<52){fragment=52;where='điều khoản'}
  }
  if(fragment){boost+=fragment;strongField++;reasons.push('Cụm từ khớp trong '+where)}
 }
 for(const t of m.primary){
  const [w,label]=fieldWeighted(p,t);
  if(w){hits++;boost+=w;lexical+=w;if(w>=32)strongField++;if(!seen.has(label)&&reasons.length<4){reasons.push('Khớp '+label.toLowerCase());seen.add(label)};continue}
  const n=near(t,p);if(n){hits++;fuzzyHits++;const w=Math.round((n.where==='Tên văn bản'?28:17)*n.score*Math.min(2.2,idf(t)));boost+=w;lexical+=w;if(reasons.length<4)reasons.push('Gần đúng “'+t+'” → “'+n.token+'”')}
 }
 const coverage=m.primary.length?hits/m.primary.length:0;
 if(coverage===1&&m.primary.length>1){boost+=58;reasons.push('Khớp đầy đủ từ khóa chính')}
 else if(coverage>=.75)boost+=34;else if(coverage>=.5)boost+=16;
 const prox=proximity(m.primary,p);if(prox){boost+=prox;reasons.push('Các từ khóa nằm gần nhau')}
 const alias=aliasBoost(m,p,reasons);boost+=alias.total;
 const action=actionBoost(m,p,reasons);boost+=action.total;
 const kind=kindBoost(m,p,reasons);boost+=kind.total;
 const expandedOnly=m.expanded.filter(t=>!m.primary.includes(t));for(const t of expandedOnly){const [w]=fieldWeighted(p,t);if(w)boost+=Math.min(14,Math.round(w*.16))}
 const baseStrong=(base.reasons||[]).some(x=>/Tên văn bản khớp|Đúng số hiệu|Có nhắc (Điều|Khoản|Điểm)|Đúng (Khoản|Điểm)|Điều .*đã bóc|Khớp cụm|Thỏa điều kiện/i.test(x));
 const needed=m.primary.length<=1?1:m.primary.length===2?2:Math.ceil(m.primary.length*(alias.strong?.35:.48));
 const semantic=alias.hits+action.hits+kind.hits;
 const matched=number||baseStrong||semantic>0||(hits>=needed&&(coverage>=.45||strongField>0))||lexical>=58;
 let score=Math.round(base.score*(baseStrong?.72:.22))+boost;
 if(professorVerified(d.id))score+=5;else if(metaOf(d.id).src)score+=2;
 if(!matched)score=Math.min(score,0);
 const quality=number||boost>=210||coverage===1?'high':boost>=120||coverage>=.75?'good':'related';
 return {...base,score,matched,quality,coverage,fuzzyHits,concepts:alias.labels,actions:action.labels,reasons:uniq([...reasons,...(base.reasons||[])]),refs:base.refs||[]};
}
legalSearchScore=scoreV2;
searchEligible=function(d,q){
 if(!String(q||'').trim())return true;const r=scoreV2(d,q),p=parseLegalQuery(q);
 if(legalSearchMode==='number')return !!r.matched&&(looseNumberMatch(q,profile(d))||(r.reasons||[]).some(x=>/số hiệu/i.test(x)));
 if(legalSearchMode==='ref'){
  if(!p.article&&!p.clause&&!p.point)return !!r.matched;
  return !!r.matched&&(!p.article||(r.reasons||[]).some(x=>/Điều|điều khoản/i.test(x)));
 }
 return !!r.matched;
};
const surfaces=new Map();
function addSurface(v){const words=String(v||'').toLowerCase().match(/[\p{L}\p{N}]+/gu)||[];for(const w of words){const f=foldVN(w);if(f.length>1&&!COMMON.has(f)&&!surfaces.has(f))surfaces.set(f,w)}}
D.forEach(d=>{addSurface(d.ttl);addSurface(topicLabel(d));addSurface(d.k)});ALIASES.forEach(a=>{addSurface(a.label);addSurface(a.terms)});
function suggest(q){
 const p=parseLegalQuery(q);if(p.number||p.article||p.clause||p.point)return '';
 const ts=rawTokens(q);if(!ts.length)return '';let changed=0;
 const out=ts.map(t=>{if(surfaces.has(t))return surfaces.get(t);let best='',bs=0;for(const c of surfaces.keys()){if(Math.abs(c.length-t.length)>2)continue;const s=sim(t,c);if(s>bs){bs=s;best=c}}if(bs>=.76){changed++;return surfaces.get(best)||best}return t});
 return changed?out.join(' '):'';
}
function snippet(d,q){
 const m=model(q),core=typeof coreArticlesForDoc==='function'?coreArticlesForDoc(d.id):[];
 const raw=[plain(d.b||''),typeof deepGuideFor==='function'?plain(deepGuideFor(d.id)):'',...core.flatMap(x=>[x.title,x.summary,x.caution]),...(typeof allClauseNodesForDoc==='function'?allClauseNodesForDoc(d.id).map(x=>x.text):[])].filter(Boolean);
 const chunks=raw.flatMap(x=>String(x).split(/(?<=[.!?;])\s+|\n+/)).map(x=>x.replace(/\s+/g,' ').trim()).filter(x=>x.length>20&&x.length<700);
 let best='',bs=-1;
 for(const s of chunks){const f=cleanLegalQuery(s),set=new Set(rawTokens(s));let score=0;for(const t of m.primary)if(set.has(t)||f.includes(t))score+=8*Math.min(2.5,idf(t));for(const a of m.aliases){const ts=rawTokens(a.terms),n=ts.filter(t=>set.has(t)||f.includes(t)).length;score+=n*3}for(const a of m.actions){const ts=rawTokens(a.terms),n=ts.filter(t=>set.has(t)||f.includes(t)).length;score+=n*2}if(score>bs){bs=score;best=s}}
 if(!best)return typeof snippetText==='function'?snippetText(d.b,q):plain(d.b||'').slice(0,180);
 return best.length>220?best.slice(0,217).replace(/\s+\S*$/,'')+'…':best;
}
function interpret(q){const m=model(q);return {concepts:m.aliases.map(x=>x.label),actions:m.actions.map(x=>x.label),suggestion:suggest(q)}}

renderSearchCoach=function(list,q){
 baseCoach(list,q);const info=interpret(q),host=document.getElementById('searchCoach'),box=host&&host.querySelector('div');if(!box)return;
 if(info.concepts.length||info.actions.length){const row=document.createElement('p');row.className='search-v2-interpretation';row.textContent='Hệ thống hiểu: '+[...info.concepts,...info.actions.map(x=>'mục tiêu '+x)].join(' · ');box.appendChild(row)}
 const s=info.suggestion;if(s&&foldVN(s)!==foldVN(String(q||''))){const row=document.createElement('p'),btn=document.createElement('button');row.className='search-v2-suggestion';btn.type='button';btn.className='tiny';btn.dataset.searchExample=s;btn.textContent='Tìm theo: '+s;row.append('Có thể bạn muốn tìm: ',btn);box.appendChild(row)}
};
window.LEGALOS_SEARCH_V2={ready:true,version:3,score:scoreV2,suggest,snippet,interpret,profileFor:profile,clearCache:()=>{profiles.clear();corpusDf=null}};
})();