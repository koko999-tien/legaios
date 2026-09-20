(function(){
'use strict';let task=null;
function ensurePanel(){const m=document.getElementById('groundedAiMount');if(m&&!m.firstChild)m.replaceChildren(document.createRange().createContextualFragment("<section class=\"memo-panel-v13 grounded-ai-panel\" id=\"groundedAiPanel\"><div class=\"grounded-ai-head\"><div><div class=\"section-kicker\">AI TÙY CHỌN · GROUNDED</div><h2>Hỏi từ căn cứ đã chọn</h2><p>AI chỉ nhận câu hỏi và phần tóm tắt của tối đa 12 căn cứ đang lưu. Không gửi Hồ sơ tuân thủ, ghi chú riêng hay file đã nhập.</p></div><span class=\"grounded-ai-count\" id=\"groundedAiSourceCount\">Mở ô hỏi để kiểm tra căn cứ</span></div><textarea id=\"groundedAiQuestion\" maxlength=\"1500\" placeholder=\"Ví dụ: Từ các căn cứ này, những nội dung nào cần kiểm tra thêm trước khi xác định nghĩa vụ GPMT?\"></textarea><div class=\"grounded-ai-actions\"><button class=\"btn bp\" id=\"groundedAiAsk\" type=\"button\">Hỏi từ căn cứ đã chọn</button><button class=\"btn bs\" id=\"groundedAiClear\" type=\"button\">Xóa câu hỏi & trả lời</button></div><p class=\"grounded-ai-privacy\">Nếu AI được bật trên máy chủ, câu hỏi và các đoạn căn cứ đã chọn sẽ được gửi tới nhà cung cấp AI. API key không được gửi xuống trình duyệt. Câu trả lời không thay thế văn bản gốc hay kết luận pháp lý.</p><div class=\"grounded-ai-status\" id=\"groundedAiStatus\" aria-live=\"polite\"></div><div class=\"grounded-ai-answer\" id=\"groundedAiAnswer\"></div></section>");if(!document.querySelector('link[data-grounded-ai-css]')){const c=document.createElement('link');c.rel='stylesheet';c.href='assets/css/v16-ai.css';c.dataset.groundedAiCss='1';document.head.appendChild(c)}}
function load(){
 if(window.CCPLMT_GROUNDED_AI?.ready)return Promise.resolve(window.CCPLMT_GROUNDED_AI);
 if(task)return task;
 task=new Promise((resolve,reject)=>{
   const s=document.createElement('script');s.src='assets/optional/grounded-ai.js';s.async=true;
   s.onload=()=>window.CCPLMT_GROUNDED_AI?.ready?resolve(window.CCPLMT_GROUNDED_AI):reject(new Error('Grounded AI did not initialize'));
   s.onerror=()=>{task=null;reject(new Error('Grounded AI failed to load'))};document.head.appendChild(s);
 });
 return task;
}
function warm(){load().then(x=>x.sync?.()).catch(()=>{})}
document.addEventListener('focusin',e=>{if(e.target?.id==='groundedAiQuestion')warm()});
document.addEventListener('click',e=>{const a=e.target?.closest?.('#groundedAiAsk'),c=e.target?.closest?.('#groundedAiClear');if(!a&&!c||window.CCPLMT_GROUNDED_AI?.ready)return;e.stopImmediatePropagation();load().then(x=>a?x.ask():x.clear()).catch(()=>{})});
window.CCPLMT_GROUNDED_AI_LOADER={load};ensurePanel();
})();