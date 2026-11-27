import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========================================================
// 1. PHẦN XỬ LÝ ĐĂNG NHẬP (Lấy từ login.js)
// ========================================================
const loginForm = document.getElementById("login-form");
const loginOverlay = document.getElementById("login-overlay");
const errorMsg = document.getElementById("login-error");

// CÀI ĐẶT TÀI KHOẢN VÀ MẬT KHẨU TẠI ĐÂY
const CORRECT_ID = "123456";  
const CORRECT_PASS = "123456";      

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        if (usernameInput === CORRECT_ID && passwordInput === CORRECT_PASS) {
            loginOverlay.style.opacity = "0";
            
            // Phát nhạc
            const music = document.getElementById('bg-music');
            if (music && music.paused) {
                music.play().catch(err => console.log("Trình duyệt chặn phát nhạc:", err));
            }

            setTimeout(() => {
                loginOverlay.remove();
            }, 800);
        } else {
            errorMsg.innerText = "Tài khoản hoặc mật khẩu chưa chính xác rồi! 💕";
            document.getElementById("password").value = "";
        }
    });
}

