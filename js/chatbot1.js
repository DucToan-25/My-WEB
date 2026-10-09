/* DT AI v2 — no API key, standalone, safe text rendering */
(()=>{"use strict";
const ROOT=document.getElementById("dtChatbot"); if(!ROOT||ROOT.dataset.ready)return; ROOT.dataset.ready="1";
const $=(s)=>ROOT.querySelector(s), box=$("#dtChatMessages"), input=$("#dtChatInput"), form=$("#dtChatForm"), toggle=$("#dtMascot"), panel=$(".dt-chat-window");
const DATA=[
{title:"Giới thiệu",keys:["duc toan","toan la ai","gioi thieu","chu website","ban than"],answer:"Đức Toàn là sinh viên Công nghệ thông tin, quan tâm đến Web Development, AI và các dự án công nghệ cá nhân.",follow:["Toàn đang học gì?","Có những dự án nào?"]},
{title:"Học tập",keys:["hoc","dai hoc","nganh","sinh vien","truong","kien thuc"],answer:"Toàn theo học Công nghệ thông tin tại Đại học Thủy Lợi; đang xây dựng nền tảng lập trình, web và tìm hiểu AI.",follow:["Kỹ năng của Toàn","Định hướng tương lai"]},
{title:"Dự án",keys:["du an","project","san pham","portfolio","da lam"],answer:"Một số hướng dự án: NDT1 (web học tập tích hợp AI, tạm hoãn), NDT2 (thời tiết), NDT3 (sức khỏe tinh thần và kỹ năng mềm), cùng các bài thực hành web. Trạng thái cụ thể nên đối chiếu mục Dự án trên website.",follow:["Dự án thời tiết","Dự án NDT1","Dự án NDT3"]},
{title:"NDT1",keys:["ndt1","web hoc tap","chatbot hoc tap"],answer:"NDT1 là ý tưởng web học tập hướng đến sinh viên Việt Nam, kết hợp Java/Python và chatbot AI. Dự án đang tạm hoãn.",follow:["Có những dự án nào?"]},
{title:"Thời tiết",keys:["ndt2","thoi tiet","weather","du bao"],answer:"NDT2 là dự án thời tiết cá nhân. Có thể phát triển giao diện dự báo, kết nối API thời tiết và các tính năng AI ở giai đoạn sau.",follow:["Có những dự án nào?"]},
{title:"NDT3",keys:["ndt3","tam ly","mental health","ky nang mem","soft skills"],answer:"NDT3 là ý tưởng ứng dụng/web hỗ trợ sức khỏe tinh thần và kỹ năng mềm, định hướng chatbot, cộng đồng và chuyên gia; chưa phải dịch vụ tư vấn y tế.",follow:["Có những dự án nào?"]},
{title:"Kỹ năng",keys:["ky nang","skill","biet gi","ngon ngu","lap trinh"],answer:"Các công nghệ Toàn đang học hoặc thực hành gồm C++, HTML, CSS, JavaScript, Git/GitHub; đồng thời quan tâm Python, Java và AI. Đây không phải danh sách chứng chỉ hay mức độ thành thạo.",follow:["MYWEB dùng công nghệ gì?"]},
{title:"MYWEB",keys:["myweb","website","trang web","portfolio","muc dich"],answer:"MYWEB là portfolio cá nhân giới thiệu bản thân, kỹ năng, dự án và kênh liên hệ. ĐT AI giúp khách truy cập tìm nội dung nhanh hơn.",follow:["MYWEB dùng công nghệ gì?","Liên hệ thế nào?"]},
{title:"Công nghệ",keys:["html","css","javascript","js","frontend","cong nghe","xay dung"],answer:"MYWEB chủ yếu dùng HTML để tạo cấu trúc, CSS để thiết kế và JavaScript để xử lý tương tác. Chatbot hiện là phiên bản chạy trực tiếp trên trình duyệt.",follow:["Chatbot có phải AI thật?"]},
{title:"Liên hệ",keys:["lien he","contact","email","gmail","facebook","github","mang xa hoi"],answer:"Bạn có thể mở mục Liên hệ trên MYWEB để xem các kênh được chủ website công khai. Bot không tự tạo hoặc đoán địa chỉ email và đường dẫn.",follow:["MYWEB là gì?"]},
{title:"Tên miền",keys:["ten mien","domain","ductoan.id.vn","hosting","github pages"],answer:"Tên miền cá nhân của MYWEB là ductoan.id.vn; dự án từng sử dụng GitHub Pages để triển khai. Hãy kiểm tra thông tin hiện hành ngay trên website.",follow:["MYWEB là gì?"]},
{title:"Chatbot",keys:["chatbot","bot","ai that","chatgpt","api","hoat dong","bao mat"],answer:"ĐT AI v2 là trợ lý tra cứu theo bộ kiến thức và điểm tương đồng từ khóa, chưa kết nối mô hình AI. Tin nhắn chỉ được xử lý trong trình duyệt ở bản này; không nhập thông tin nhạy cảm.",follow:["Tôi có thể hỏi gì?"]},
{title:"Giao diện",keys:["dark","light","giao dien","responsive","dien thoai","mobile"],answer:"Chatbot hỗ trợ màn hình nhỏ, mở/đóng bằng nút hoặc phím Escape và kế thừa chế độ sáng/tối từ MYWEB.",follow:["MYWEB là gì?"]},
{title:"Hướng dẫn",keys:["giup","help","hoi gi","lam duoc gi","huong dan"],answer:"Bạn có thể hỏi về Đức Toàn, quá trình học tập, dự án NDT1/NDT2/NDT3, công nghệ website, liên hệ và cách chatbot hoạt động.",follow:["Giới thiệu về Toàn","Có những dự án nào?","Liên hệ thế nào?"]}
];
const normalize=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const stop=new Set("la cua co toi ban ve va mot nhung nao nhu the cho duoc khong hay trong nay gi dau o de voi".split(" "));
const tokens=s=>normalize(s).split(" ").filter(x=>x.length>1&&!stop.has(x));
function find(q){const n=normalize(q), t=new Set(tokens(q));let best=null, score=0;
 for(const item of DATA){let v=0;for(const key of item.keys){const k=normalize(key), kt=tokens(k);if(n===k)v+=12;else if(n.includes(k))v+=Math.max(3,kt.length*3);else {const hits=kt.filter(x=>t.has(x)).length;if(hits&&hits===kt.length)v+=hits*2;else v+=hits*.6;}}if(v>score){score=v;best=item;}}
 return score>=2.5?best:null;}
function message(value,who="bot"){const e=document.createElement("div");e.className="dt-message "+who;e.textContent=value;box.append(e);box.scrollTop=box.scrollHeight;return e;}
function suggestions(items){const row=$("#dtSuggestions");row.replaceChildren();items.forEach(s=>{const b=document.createElement("button");b.type="button";b.className="dt-quick-btn";b.textContent=s;b.addEventListener("click",()=>send(s));row.append(b);});}
let busy=false;
function send(raw){const q=String(raw).trim().slice(0,500);if(!q||busy)return;input.value="";message(q,"user");busy=true;const typing=message("ĐT AI đang suy nghĩ…");typing.classList.add("dt-thinking");
setTimeout(()=>{typing.remove();const n=normalize(q);let result;
if(/^(hi|hello|hey|xin chao|chao|alo)$/.test(n)){result={answer:"Xin chào! Mình là ĐT AI. Bạn muốn tìm hiểu về Toàn, dự án hay MYWEB?",follow:["Giới thiệu về Toàn","Có những dự án nào?"]};}
else if(/cam on|thank/.test(n)){result={answer:"Rất vui vì đã giúp được bạn! Bạn muốn tìm hiểu thêm mục nào?",follow:["Có những dự án nào?","Liên hệ thế nào?"]};}
else result=find(q);
message(result?result.answer:"Mình chưa có thông tin chắc chắn về câu hỏi này. Hãy thử hỏi cụ thể hơn về Đức Toàn, MYWEB, dự án, kỹ năng hoặc liên hệ.");suggestions(result?.follow||["Giới thiệu về Toàn","Có những dự án nào?","Tôi có thể hỏi gì?"]);busy=false;},350);}
function open(on){ROOT.classList.toggle("active",on);toggle.setAttribute("aria-expanded",String(on));panel.setAttribute("aria-hidden",String(!on));if(on)input.focus();}
toggle.addEventListener("click",()=>open(!ROOT.classList.contains("active")));$("#dtChatClose").addEventListener("click",()=>open(false));
form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ROOT.classList.contains("active")){open(false);toggle.focus();}});
$("#dtClear").addEventListener("click",()=>{box.replaceChildren();message("Xin chào! Mình là ĐT AI. Hãy chọn một chủ đề hoặc nhập câu hỏi.");suggestions(["Giới thiệu về Toàn","Có những dự án nào?","Tôi có thể hỏi gì?"]);});
message("Xin chào! Mình là ĐT AI v2. Bạn muốn tìm hiểu điều gì về MYWEB?");suggestions(["Giới thiệu về Toàn","Có những dự án nào?","Tôi có thể hỏi gì?"]);
})();