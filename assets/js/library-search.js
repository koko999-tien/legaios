/* Căn cứ Pháp lý Môi trường — document-library search result rendering. */
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

  $("docs").innerHTML=list.length?list.map(({d,score,reasons,refs})=>{
    const m=metaOf(d.id),rank=qq?Math.max(1,Math.min(99,Math.round(score/3))):0;
    const p=parseLegalQuery(q);
    const exactRef=qq&&(p.article||p.clause||p.point)&&reasons.some(x=>/Điều|Khoản|Điểm/.test(x));
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
            ${professorVerified(d.id)?'<span class="prof-verified-dot">Đã kiểm chứng</span>':(m.src?'<span class="verified-dot">Có nguồn</span>':'')}
            ${exactRef?'<span class="no-fulltext">Có tham chiếu trong chỉ mục</span>':''}
          </div>
          <div class="doc-snippet">${hi(snippetText(d.b,q),q)}</div>
          ${reasons.length?`<div class="match-reasons">${reasons.slice(0,4).map((r,i)=>`<span class="match-reason ${i===0&&exactRef?"exact":""}">${esc(r)}</span>`).join("")}</div>`:""}
          ${refs.length?`<div class="ref-strip">${refs.slice(0,6).map(r=>`<span class="ref-chip">${esc(r)}</span>`).join("")}</div>`:""}
          ${(m.issued||m.eff||m.rel)?`<div class="doc-meta-extra">${m.issued?`<span>Ban hành: ${m.issued}</span><span>·</span>`:''}${m.eff?`<span>Hiệu lực: ${m.eff}</span><span>·</span>`:''}<span>${m.rel||''}</span></div>`:''}
        </button>
        <div class="doc-tools doc-tools-v11">
          <button class="goto-match" data-open-match="${d.id}" data-query="${esc(q)}" type="button" title="${qq?"Mở đúng đoạn liên quan trong trang văn bản":"Mở trang chi tiết của văn bản"}">${qq?"Đến đoạn khớp":"Mở chi tiết"}</button>
          <button class="btn bs preview-btn" data-preview="${d.id}" type="button" title="Xem tóm tắt ngay trong danh sách">Xem nhanh</button>
          <button class="mini" data-save="${d.id}" type="button" title="${saved.includes(d.id)?"Bỏ lưu":"Lưu"}">${saved.includes(d.id)?"★":"☆"}</button>
        </div>
      </div>
    </div>`;
  }).join(""):`<div class="empty"><b>Chưa tìm thấy căn cứ phù hợp trong dữ liệu hiện có.</b><br><br>Thử bỏ bớt Khoản/Điểm, tìm bằng số hiệu văn bản, hoặc mở nguồn chính thức. Kho dữ liệu pháp luật hiện chủ yếu là metadata + tóm tắt, chưa phải cơ sở toàn văn Điều/Khoản/Điểm.</div>`;

  updateCompareBar();applyLibraryView();
}
