/* =========================================================
   ĐT AI CHATBOT
   MYWEB - Đức Toàn
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const chatbot = document.getElementById("dtChatbot");
    const mascot = document.getElementById("dtMascot");
    const closeButton = document.getElementById("dtChatClose");

    const chatForm = document.getElementById("dtChatForm");
    const chatInput = document.getElementById("dtChatInput");
    const chatMessages = document.getElementById("dtChatMessages");

    const quickButtons =
        document.querySelectorAll(".dt-quick-btn");


    /* =====================================================
       OPEN / CLOSE
    ===================================================== */

    function openChat() {

        chatbot.classList.add("active");

        setTimeout(() => {
            chatInput.focus();
        }, 250);
    }


    function closeChat() {

        chatbot.classList.remove("active");
    }


    mascot.addEventListener("click", () => {

        if (chatbot.classList.contains("active")) {
            closeChat();
        } else {
            openChat();
        }

    });


    closeButton.addEventListener("click", closeChat);


    /* =====================================================
       ADD MESSAGE
    ===================================================== */

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.className = `dt-message ${type}`;

        message.innerHTML = text;

        chatMessages.appendChild(message);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    /* =====================================================
       TYPING INDICATOR
    ===================================================== */

    function showTyping() {

        const typing = document.createElement("div");

        typing.className =
            "dt-message bot dt-typing";

        typing.id = "dtTyping";

        typing.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        chatMessages.appendChild(typing);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }


    function removeTyping() {

        const typing =
            document.getElementById("dtTyping");

        if (typing) {
            typing.remove();
        }
    }


    /* =====================================================
       BASIC BOT RESPONSE
       Đây chỉ là phiên bản demo.
       Sau này sẽ thay bằng AI API.
    ===================================================== */

    function getBotResponse(question) {

        const q = question.toLowerCase();


        /* GIỚI THIỆU */

        if (
            q.includes("đức toàn") ||
            q.includes("toàn là ai") ||
            q.includes("giới thiệu")
        ) {

            return `
                Đức Toàn là một IT student đang học tập
                và phát triển các dự án cá nhân về
                Web Development và AI.
            `;
        }


        /* PROJECT */

        if (
            q.includes("dự án") ||
            q.includes("project")
        ) {

            return `
                Hiện tại website đang giới thiệu một số
                dự án như:
                <br><br>
                • AI Weather Forecast
                <br>
                • Website Bán Giày
                <br>
                • Mental Health & Soft Skills
                <br><br>
                Một số dự án vẫn đang được hoàn thiện.
            `;
        }


        /* HỌC TẬP */

        if (
            q.includes("học gì") ||
            q.includes("đang học") ||
            q.includes("học")
        ) {

            return `
                Hiện tại Toàn đang tập trung vào nền tảng
                lập trình, Web Development và tìm hiểu
                thêm về AI.
            `;
        }


        /* HTML */

        if (q.includes("html")) {

            return `
                HTML được sử dụng để xây dựng cấu trúc
                và nội dung của website.
            `;
        }


        /* CSS */

        if (q.includes("css")) {

            return `
                CSS được sử dụng để thiết kế giao diện,
                bố cục, màu sắc và animation cho website.
            `;
        }


        /* JAVASCRIPT */

        if (
            q.includes("javascript") ||
            q.includes("js")
        ) {

            return `
                JavaScript giúp website có tính tương tác
                và xử lý các chức năng động.
            `;
        }


        /* GITHUB */

        if (q.includes("github")) {

            return `
                Bạn có thể tìm các dự án của Đức Toàn
                thông qua phần GitHub trên website.
            `;
        }


        /* CHÀO HỎI */

        if (
            q.includes("xin chào") ||
            q.includes("hello") ||
            q.includes("hi")
        ) {

            return `
                Xin chào 👋
                <br>
                Rất vui được trò chuyện với bạn!
            `;
        }


        /* DEFAULT */

        return `
            Mình chưa hiểu rõ câu hỏi này 🤔
            <br><br>
            Bạn có thể thử hỏi:
            <br>
            • Đức Toàn là ai?
            <br>
            • Các dự án của Toàn?
            <br>
            • Toàn đang học gì?
            <br>
            • GitHub của Toàn?
        `;
    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    function sendMessage(question) {

        question = question.trim();

        if (!question) return;


        /* USER MESSAGE */

        addMessage(
            escapeHTML(question),
            "user"
        );


        /* CLEAR INPUT */

        chatInput.value = "";


        /* TYPING */

        showTyping();


        /* BOT RESPONSE */

        setTimeout(() => {

            removeTyping();

            const response =
                getBotResponse(question);

            addMessage(response, "bot");

        }, 600);
    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    chatForm.addEventListener("submit", (event) => {

        event.preventDefault();

        sendMessage(chatInput.value);

    });


    /* =====================================================
       QUICK QUESTIONS
    ===================================================== */

    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            const question =
                button.dataset.question;

            sendMessage(question);

        });

    });


    /* =====================================================
       ENTER KEY
    ===================================================== */

    chatInput.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.requestSubmit();

        }

    });


    /* =====================================================
       ESCAPE HTML
       Tránh người dùng nhập HTML trực tiếp.
    ===================================================== */

    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            chatbot.classList.contains("active")
        ) {

            closeChat();

        }

    });

});