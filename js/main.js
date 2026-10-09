/* ==================================================
   ĐỨC TOÀN PORTFOLIO
   JAVASCRIPT
================================================== */


/* ================= ELEMENTS ================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("navbar");

const navLinks =
    document.querySelectorAll(".nav-link");

const backToTop =
    document.getElementById("backToTop");

const revealElements =
    document.querySelectorAll(".reveal");

const currentYear =
    document.getElementById("currentYear");


/* ================= CURRENT YEAR ================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}

/* ================= DARK / LIGHT MODE ================= */

const savedTheme =
    localStorage.getItem("theme");

const prefersLight =
    window.matchMedia("(prefers-color-scheme: light)").matches;


/* FIRST VISIT → FOLLOW DEVICE */

if (savedTheme === "light") {

    body.classList.add("light");
    themeIcon.textContent = "☀";

} else if (savedTheme === "dark") {

    body.classList.remove("light");
    themeIcon.textContent = "☾";

} else {

    if (prefersLight) {

        body.classList.add("light");
        themeIcon.textContent = "☀";

    } else {

        body.classList.remove("light");
        themeIcon.textContent = "☾";

    }

}

/* ================= FOLLOW SYSTEM THEME ================= */

const systemThemeMedia = window.matchMedia(
    "(prefers-color-scheme: light)"
);

systemThemeMedia.addEventListener("change", (event) => {

    /* Chỉ tự đổi nếu người dùng chưa tự chọn theme */
    if (!localStorage.getItem("theme")) {

        if (event.matches) {

            body.classList.add("light");

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }

        } else {

            body.classList.remove("light");

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

        }

    }

});


/* CHANGE THEME */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    const isLight =
        body.classList.contains("light");


    if (isLight) {

        themeIcon.textContent = "☀";

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        themeIcon.textContent = "☾";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

});


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("open");

});


/* CLOSE MENU AFTER CLICK */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add(
                    "active"
                );

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* ================= SCROLL REVEAL ================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* ================= BACK TO TOP ================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* ================= CLOSE MENU WHEN CLICK OUTSIDE ================= */

document.addEventListener(
    "click",
    (event) => {

        const clickedInsideMenu =
            navbar.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navbar.classList.remove(
                "open"
            );

        }

    }
);


/* ================= IMAGE FALLBACK ================= */

/*
    Nếu chưa có avatar.jpg,
    website sẽ hiển thị chữ DT.
*/

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.style.display =
                    "none";

            }
        );

    });


/* ================= SMOOTH LINK ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const headerHeight =
                        document
                            .getElementById("header")
                            .offsetHeight;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }

            }
        );

    });


/* ================= CONSOLE ================= */

console.log(
    "%cĐức Toàn Portfolio",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "Welcome to my portfolio 🚀"
);