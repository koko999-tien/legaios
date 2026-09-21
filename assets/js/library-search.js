function librarySelectLabel(id){
  const el=$(id);if(!el)return "";
  return el.selectedOptions?.[0]?.textContent?.trim()||el.value||"";
}
function libraryActiveFilters(topic="all",q=""){
  const rows=[];
  if(q.trim())rows.push({key:"q",label:`Từ khóa: “${q.trim()}”`});
  if(topic!=="all")rows.push({key:"topic",label:`Lĩnh vực: ${topicName(topic)}`});
  const defs=[
    ["scopeF","scope","Phạm vi"],["yearF","year","Năm"],["effectF","effect","Hiệu lực"],
    ["sourceF","source","Nguồn"],["typeF","type","Loại văn bản"]
  ];
  defs.forEach(([id,key,prefix])=>{const el=$(id);if(el&&el.value&&el.value!=="all")rows.push({key,label:`${prefix}: ${librarySelectLabel(id)}`})});
  if($("asOfF")?.value)rows.push({key:"asOf",label:`Mốc áp dụng: ${$("asOfF").value.split("-").reverse().join("/")}`});
  if(savedOnlyMode)rows.push({key:"saved",label:"Chỉ văn bản đã lưu"});
  return rows;
}
function renderLibraryActiveFilters(topic="all",q=""){
  const host=$("activeFilterList"),panel=$("activeFilters");if(!host||!panel)return;
  const rows=libraryActiveFilters(topic,q);
  panel.classList.toggle("empty",!rows.length);
  host.replaceChildren();
  if(rows.length){
    rows.forEach(x=>{
      const b=document.createElement("button"),label=document.createElement("span"),close=document.createElement("b");
      b.className="active-filter-chip";b.type="button";b.dataset.clearFilter=x.key;b.title="Bỏ tiêu chí này";
      label.textContent=x.label;close.textContent="×";close.setAttribute("aria-hidden","true");
      b.append(label,close);host.append(b);
    });
  }else{
    const empty=document.createElement("span");empty.className="active-filter-empty";empty.textContent="Chưa áp dụng bộ lọc nâng cao.";host.append(empty);
  }
  if(rows.some(x=>!["q","topic","saved"].includes(x.key)))$("advancedSearch")?.setAttribute("open","");
}

function docs(topic="all",q=""){
  const qq=q.trim(),type=$("typeF")?.value||"all",sort=$("sortF")?.value||"default",scope=$("scopeF")?.value||"all",year=$("yearF")?.value||"all",effect=$("effectF")?.value||"all",source=$("sourceF")?.value||"all",asOf=$("asOfF")?.value||"";
  let list=D.filter(d=>{
    const m=metaOf(d.id);
    return (topic==="all"||d.t===topic)
      &&(type==="all"||d.k===type)
      &&(!savedOnlyMode||saved.includes(d.id))
      &&searchEligible(d,qq)
      &&(scope==="all"||(scope==="2026"&&is2026Doc(d))||(scope==="core"&&CORE_IDS.includes(d.id))||(scope==="consolidated"&&isConsolidated(d)))
      &&(year==="all"||docYear(d)===year)
      &&(effect==="all"||(effect==="dated"&&!!m.eff)||(effect==="partial"&&/hết hiệu lực một phần/i.test(m.rel||""))||(effect==="unknown"&&!m.eff&&!/hết hiệu lực một phần/i.test(m.rel||"")))
      &&(source==="all"||(source==="verified"&&!!m.src)||(source==="prof"&&!!professorVerified(d.id)))&&(!asOf||!m.eff||!parseVNDate(m.eff)||parseVNDate(m.eff)<=new Date(asOf+"T23:59:59"));
  }).map(d=>({d,...legalSearchScore(d,qq)}));

  if(sort==="az")list.sort((a,b)=>a.d.ttl.localeCompare(b.d.ttl,"vi"));
  else if(sort==="za")list.sort((a,b)=>b.d.ttl.localeCompare(a.d.ttl,"vi"));
  else if(qq)list.sort((a,b)=>b.score-a.score);

  $("dcount").textContent=`${list.length} văn bản${qq?` phù hợp với “${q.trim()}”`:""}`;
  $("clearQ").classList.toggle("on",!!q.trim());
  renderSearchCoach(list,q);
  renderLibraryActiveFilters(topic,q);

  $("docs").innerHTML=list.length?list.map(({d,score,reasons,refs,concepts=[],actions=[]})=>{
    const m=metaOf(d.id),rank=qq?Math.max(1,Math.min(99,Math.round(score/3))):0;
    const p=parseLegalQuery(q);
    const exactRef=qq&&(p.article||p.clause||p.point)&&reasons.some(x=>/Điều|Khoản|Điểm/.test(x));
    reasons=[...concepts.map(x=>`Chủ đề: ${x}`),...actions.map(x=>`Mục tiêu: ${x}`),...reasons];
    return `<div class="doc">
      <div class="docrow">
        <label class="selectbox" title="Chọn để so sánh"><input type="checkbox" data-compare="${d.id}" ${compareSelected.includes(d.id)?"checked":""}></label>
        <button class="docmain" type="button" data-open="${d.id}">
          <div style="display:flex;gap:6px;align-items:flex-start;justify-content:space-between">
            <b>${hi(d.ttl,q)}</b>${qq?`<span class="search-rank">${rank>=80?"Khớp cao":rank>=55?"Khớp":"Liên quan"}</span>`:""}
          </div>
          <div class="meta">
            <span class="tag">${d.k}</span><span class="tag">${topicName(d.t)}</span>
            ${m.temp?'<span class="doc-state temp">Có thời hạn</span>':(m.eff?'<span class="doc-state">Có dữ liệu hiệu lực</span>':'')}
            <span class="role-badge ${lawRole(d)}">${roleLabel(lawRole(d))}</span>
            ${(concepts.length||actions.length)?`<span class="search-semantic-meta">${concepts.slice(0,2).map(x=>`<span class="tag">${esc(x)}</span>`).join("")}${actions.slice(0,1).map(x=>`<span class="tag">Mục tiêu: ${esc(x)}</span>`).join("")}</span>`:""}
            ${professorVerified(d.id)?'<span class="prof-verified-dot">Đã đối chiếu</span>':(m.src?'<span class="verified-dot">Có nguồn</span>':'')}
            ${exactRef?'<span class="no-fulltext">Có tham chiếu trong chỉ mục</span>':''}
          </div>
          <div class="doc-snippet">${hi(window.LEGALOS_SEARCH_V2?.snippet?.(d,q)||snippetText(d.b,q),q)}</div>
          ${reasons.length?`<div class="match-reasons">${reasons.slice(0,4).map((r,i)=>`<span class="match-reason ${i===0&&exactRef?"exact":""}">${esc(r)}</span>`).join("")}</div>`:""}
          ${refs.length?`<div class="ref-strip">${refs.slice(0,6).map(r=>`<span class="ref-chip">${esc(r)}</span>`).join("")}</div>`:""}
          ${(m.issued||m.eff||m.rel)?`<div class="doc-meta-extra">${m.issued?`<span>Ban hành: ${m.issued}</span><span>·</span>`:''}${m.eff?`<span>Hiệu lực: ${m.eff}</span><span>·</span>`:''}<span>${m.rel||''}</span></div>`:''}
        </button>
        <div class="doc-tools doc-tools-v11">
          <button class="goto-match" data-open-match="${d.id}" data-query="${esc(q)}" type="button" title="${qq?"Mở đúng đoạn liên quan trong trang văn bản":"Mở trang chi tiết của văn bản"}">${qq?"Mở vị trí khớp":"Mở chi tiết"}</button>
          <button class="btn bs preview-btn" data-preview="${d.id}" type="button" title="Xem tóm tắt ngay trong danh sách">Tóm tắt</button>
          ${m.src?`<a class="btn bs official-source-action" href="${m.src}" target="_blank" rel="noopener" title="Mở văn bản tại nguồn chính thức">Nguồn chính thức ↗</a>`:""}
          <button class="mini" data-save="${d.id}" type="button" title="${saved.includes(d.id)?"Bỏ lưu":"Lưu"}">${saved.includes(d.id)?"★":"☆"}</button>
        </div>
      </div>
    </div>`;
  }).join(""):`<div class="empty"><b>Chưa tìm thấy căn cứ phù hợp trong dữ liệu hiện có.</b><br><br>Thử bỏ bớt Khoản/Điểm, tìm bằng số hiệu văn bản, hoặc mở nguồn chính thức. Kho dữ liệu pháp luật hiện chủ yếu là metadata + tóm tắt, chưa phải cơ sở toàn văn Điều/Khoản/Điểm.</div>`;

  updateCompareBar();applyLibraryView();
}
