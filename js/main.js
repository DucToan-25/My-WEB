/* ==================================================
   ĐỨC TOÀN PORTFOLIO
   Main page behavior
================================================== */

(() => {
    "use strict";

    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const backToTop = document.getElementById("backToTop");
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    const currentYear = document.getElementById("currentYear");
    const header = document.getElementById("header");

    const getMediaQuery = typeof window.matchMedia === "function"
        ? (query) => window.matchMedia(query)
        : () => null;

    const systemThemePreference = getMediaQuery("(prefers-color-scheme: light)");
    const reducedMotionPreference = getMediaQuery("(prefers-reduced-motion: reduce)");

    function getSavedTheme() {
        try {
            const theme = window.localStorage.getItem("theme");
            return theme === "light" || theme === "dark" ? theme : null;
        } catch {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            window.localStorage.setItem("theme", theme);
        } catch {
            // Keep the selected theme for this page even when storage is unavailable.
        }
    }

    function applyTheme(theme) {
        const isLight = theme === "light";
        body.classList.toggle("light", isLight);

        if (themeIcon) {
            themeIcon.textContent = isLight ? "☀" : "☾";
        }
    }

    const savedTheme = getSavedTheme();
    applyTheme(savedTheme || (systemThemePreference?.matches ? "light" : "dark"));

    if (systemThemePreference) {
        const followSystemTheme = (event) => {
            if (!getSavedTheme()) {
                applyTheme(event.matches ? "light" : "dark");
            }
        };

        if (typeof systemThemePreference.addEventListener === "function") {
            systemThemePreference.addEventListener("change", followSystemTheme);
        } else if (typeof systemThemePreference.addListener === "function") {
            systemThemePreference.addListener(followSystemTheme);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = body.classList.contains("light") ? "dark" : "light";
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    }

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    function setMenuOpen(isOpen) {
        if (!navbar || !menuToggle) {
            return;
        }

        navbar.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", () => {
            setMenuOpen(!navbar.classList.contains("open"));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navbar.contains(event.target);
            const clickedMenuButton = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedMenuButton) {
                setMenuOpen(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navbar.classList.contains("open")) {
                setMenuOpen(false);
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 700) {
                setMenuOpen(false);
            }
        });
    }

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;
        let activeSection = null;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        if (!activeSection) {
            return;
        }

        const activeHref = "#" + activeSection.id;
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === activeHref);
        });
    }

    const requestFrame = window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : (callback) => window.setTimeout(callback, 16);

    let scrollFrame = null;

    function updateScrollUi() {
        if (scrollFrame !== null) {
            return;
        }

        scrollFrame = requestFrame(() => {
            scrollFrame = null;
            updateActiveNav();

            if (backToTop) {
                backToTop.classList.toggle("show", window.scrollY > 500);
            }
        });
    }

    window.addEventListener("scroll", updateScrollUi, { passive: true });
    window.addEventListener("resize", updateScrollUi);
    updateScrollUi();

    if (typeof window.IntersectionObserver === "function") {
        const revealObserver = new window.IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotionPreference?.matches ? "auto" : "smooth"
            });
        });
    }

    document.querySelectorAll("img").forEach((image) => {
        image.addEventListener("error", () => {
            image.style.display = "none";
        }, { once: true });
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.getElementById(href.slice(1));
            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header?.offsetHeight || 0;
            const targetPosition = window.scrollY
                + target.getBoundingClientRect().top
                - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: reducedMotionPreference?.matches ? "auto" : "smooth"
            });
        });
    });

    console.log("%cĐức Toàn Portfolio", "font-size: 20px; font-weight: bold;");
    console.log("Welcome to my portfolio 🚀");
})();
