/* Căn cứ Pháp lý Môi trường — procedure checklist, progress and detail runtime. */
function renderProcSummary(){
  const total=P.reduce((n,p)=>n+p.st.length,0);
  let done=0;P.forEach(p=>done+=(procDone[p.id]||[]).length);
  $("procSummary").textContent=`${done}/${total} bước`;
  $("procBar").style.width=(total?done/total*100:0)+"%";
}
function renderProcList(){
  if(!$("plist"))return;
  const q=($("procQ")?.value||"").trim().toLowerCase(),f=$("procFilter")?.value||"all",cat=$("procCat")?.value||"all";
  const list=P.filter(p=>{
    const d=(procDone[p.id]||[]).length,done=d===p.st.length;
    const okf=f==="all"||(f==="done"&&done)||(f==="todo"&&!done);
    const okq=!q||(p.ttl+" "+(p.desc||"")+" "+p.st.flat().join(" ")).toLowerCase().includes(q);
    const okcat=cat==="all"||p.cat===cat;
    return okf&&okq&&okcat;
  });
  $("plist").innerHTML=list.length?list.map(p=>{
    const d=(procDone[p.id]||[]).length,pct=p.st.length?d/p.st.length*100:0;
    return `<button class="card go proc-card" type="button" data-pr="${p.id}">
      <div class="grow"><h3>${p.ttl}</h3>${p.desc?`<p style="margin:5px 0 8px;color:var(--m);font-size:12px">${p.desc}</p>`:""}<div class="proc-badges"><span class="proc-cat-badge">${({env:"Môi trường lõi",waste:"Chất thải & phát thải",resource:"Tài nguyên",climate:"Khí hậu",sector:"Chuyên ngành"})[p.cat]||"Quy trình"}</span><span class="proc-badge">${p.st.length} bước</span><span class="proc-badge">${d===p.st.length?"Hoàn thành":"Đang làm"}</span></div></div>
      <span style="color:var(--m);font-size:12px">${d}/${p.st.length} bước</span>
      <div class="progress"><span style="width:${pct}%"></span></div>
    </button>`
  }).join(""):`<div class="empty">Không có quy trình phù hợp.</div>`;
  renderProcSummary();renderWorkspaceStats();renderHomeContinue();
}
function openProc(id){
  const g=P.find(x=>x.id===id);if(!g)return;
  logActivity("proc",id,g.ttl);
  const done=procDone[id]||[];
  const next=g.st.findIndex((_,i)=>!done.includes(i));
  $("pbody").innerHTML=`<div class="proc-head"><div><h1 style="margin-bottom:4px">${g.ttl}</h1><span style="color:var(--m);font-size:13px">${done.length}/${g.st.length} bước đã hoàn thành</span></div><button class="btn bs" data-proc-reset="${id}" type="button">Đặt lại</button></div>
    <div class="progress" style="margin-bottom:14px"><span style="width:${g.st.length?done.length/g.st.length*100:0}%"></span></div>
    <div class="proc-detail-note"><b>Nguyên tắc:</b> ${g.desc||"Lộ trình hỗ trợ kiểm tra tuần tự."} Mỗi bước là checklist nghiệp vụ; kết luận pháp lý cuối cùng vẫn phải dựa văn bản gốc, hiệu lực và hồ sơ cụ thể.</div><p class="note">${done.length===g.st.length?"Quy trình này đã được đánh dấu hoàn thành.":"Bạn có thể đánh dấu từng bước. Tiến độ được lưu cục bộ trên trình duyệt."}</p>`+
    g.st.map((s,i)=>`<div class="st ${done.includes(i)?"done":""} ${i===next?"current":""}">
      <button class="stepcheck" data-step="${id}:${i}" type="button">${done.includes(i)?"✓":i+1}</button>
      <div><b>${s[0]}</b><p style="margin:4px 0 0;color:var(--m)">${s[1]}</p>
        <div class="step-actions"><button class="tiny" data-copy-step="${id}:${i}" type="button">Sao chép bước</button></div>
      </div>
    </div>`).join("");
  go("pone");
}
