/* Căn cứ Pháp lý Môi trường — small shared UI and topic helpers. */
function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(toast._t);toast._t=setTimeout(()=>t.style.display="none",1700)}
function plain(h){const d=document.createElement("div");d.innerHTML=h;return d.textContent||""}
function curTopic(){const x=document.querySelector("#chips .chip.on");return x?x.dataset.t:"all"}
function topicName(id){const x=T.find(t=>t[0]===id);return x?x[1]:""}
