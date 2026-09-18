/* LegalOS V14 — typo-tolerant legal search inspired by Fuse.js token-search ideas.
   This is a small local implementation: no CDN/runtime dependency, tuned for the current legal dataset. */
(function(){
  'use strict';
  if(typeof legalSearchScore!=='function'||typeof searchEligible!=='function')return;

  const baseLegalSearchScore=legalSearchScore;
  const profileCache=new Map();
  const MATCH_REASON=/Tên văn bản khớp|Đúng số hiệu|Có nhắc (?:Điều|Khoản|Điểm)|Đúng (?:Khoản|Điểm)|Điều .*đã bóc|Khớp cụm|Thỏa điều kiện/i;
  const COMMON=new Set(['va','cua','cho','trong','theo','voi','cac','mot','nhung','duoc','ve','la','toi','minh','phai','khong','thi','nao','gi','hay','neu','muon','hoi']);

  function tokenizeVN(value=''){
    return (cleanLegalQuery(value).match(/[\p{L}\p{M}\p{N}_]+/gu)||[])
      .filter(t=>t.length>1&&!COMMON.has(t));
  }

  function boundedLevenshtein(a,b,max=2){
    if(a===b)return 0;
    if(Math.abs(a.length-b.length)>max)return max+1;
    let prev=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      const cur=[i];
      let rowMin=cur[0];
      for(let j=1;j<=b.length;j++){
        const cost=a[i-1]===b[j-1]?0:1;
        cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+cost);
        rowMin=Math.min(rowMin,cur[j]);
      }
      if(rowMin>max)return max+1;
      prev=cur;
    }
    return prev[b.length];
  }

  function similarity(a,b){
    if(!a||!b)return 0;
    if(a===b)return 1;
    if(a.length<4||b.length<4)return 0;
    const maxLen=Math.max(a.length,b.length);
    const maxEdits=maxLen>=9?2:maxLen>=5?2:1;
    const dist=boundedLevenshtein(a,b,maxEdits);
    if(dist>maxEdits)return 0;
    return 1-(dist/maxLen);
  }

  function profileFor(d){
    if(profileCache.has(d.id))return profileCache.get(d.id);
    const title=foldVN(d.ttl||'');
    const hay=foldVN(legalDocHay(d));
    const titleTokens=[...new Set(tokenizeVN(title))];
    const allTokens=[...new Set(tokenizeVN(hay))];
    const profile={title,hay,titleTokens,allTokens};
    profileCache.set(d.id,profile);
    return profile;
  }

  function bestNear(token,candidates){
    let best=null,bestScore=0;
    for(const candidate of candidates){
      if(Math.abs(candidate.length-token.length)>2)continue;
      if(token[0]!==candidate[0]&&token.slice(0,2)!==candidate.slice(0,2))continue;
      const s=similarity(token,candidate);
      if(s>bestScore){bestScore=s;best=candidate}
      if(s>=0.92)break;
    }
    return bestScore>=0.72?{token:best,score:bestScore}:null;
  }

  function fuzzyEvidence(d,q){
    const profile=profileFor(d);
    const expanded=typeof expandTokens==='function'?expandTokens(q):tokenizeVN(q);
    const queryTokens=[...new Set(expanded.filter(t=>t.length>1&&!COMMON.has(t)))];
    if(!queryTokens.length)return {boost:0,hits:0,reasons:[],total:0};
    let boost=0,hits=0;
    const reasons=[];
    for(const token of queryTokens){
      if(profile.hay.includes(token)){hits++;continue}
      const titleHit=bestNear(token,profile.titleTokens);
      const bodyHit=titleHit||bestNear(token,profile.allTokens);
      if(!bodyHit)continue;
      hits++;
      const inTitle=!!titleHit;
      boost+=Math.round((inTitle?26:14)*bodyHit.score);
      if(reasons.length<3)reasons.push(`Khớp gần đúng “${token}” → “${bodyHit.token}”`);
    }
    if(hits===queryTokens.length&&hits>1)boost+=14;
    return {boost,hits,reasons,total:queryTokens.length};
  }

  legalSearchScore=function(d,q){
    const base=baseLegalSearchScore(d,q);
    if(!String(q||'').trim())return {...base,matched:true,fuzzyHits:0};
    const fuzzy=fuzzyEvidence(d,q);
    const intent=typeof detectLegalIntent==='function'?detectLegalIntent(q):{labels:[]};
    const baseMatched=(base.reasons||[]).some(r=>MATCH_REASON.test(r))
      ||(intent.labels.length>0&&base.score>0&&(base.reasons||[]).some(r=>/từ khóa khớp/i.test(r)));
    const needed=fuzzy.total<=1?1:(intent.labels.length?Math.max(2,Math.ceil(fuzzy.total*0.45)):Math.ceil(fuzzy.total*0.6));
    const matched=baseMatched||(fuzzy.hits>=needed&&fuzzy.hits>0);
    const fuzzySummary=fuzzy.total&&fuzzy.hits?`${fuzzy.hits}/${fuzzy.total} từ khóa khớp hoặc gần đúng`:'';
    const reasons=[...fuzzy.reasons,...(base.reasons||[])];
    if(fuzzySummary)reasons.push(fuzzySummary);
    return {
      ...base,
      score:base.score+(matched?fuzzy.boost:0),
      reasons:[...new Set(reasons)],
      matched,
      fuzzyHits:fuzzy.hits
    };
  };

  searchEligible=function(d,q){
    if(!String(q||'').trim())return true;
    const r=legalSearchScore(d,q),p=parseLegalQuery(q);
    if(legalSearchMode==='number')return !!p.number&&(r.reasons||[]).some(x=>x.includes('Đúng số hiệu'));
    if(legalSearchMode==='ref'){
      if(!p.article&&!p.clause&&!p.point)return !!r.matched;
      return !!r.matched&&(!p.article||(r.reasons||[]).some(x=>x.includes('Điều')));
    }
    return !!r.matched;
  };

  window.LEGALOS_FUZZY_SEARCH={tokenizeVN,similarity,clearCache:()=>profileCache.clear()};
})();
