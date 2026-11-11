
/* =========================================
   FATIMA HASSAN — MAIN JAVASCRIPT
   Burgundy Royale + Champagne Gold
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- CURRENT YEAR ---------- */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ---------- PRELOADER ---------- */

    const preloader = document.querySelector(".preloader");

    const hidePreloader = () => {
        if (preloader) {
            preloader.classList.add("preloader-hidden");
        }
    };

    window.addEventListener("load", hidePreloader);

    // Safety fallback if an image takes too long to load.
    setTimeout(hidePreloader, 2500);


    /* ---------- MOBILE NAVIGATION ---------- */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });

        });
    }


    /* ---------- SCROLL REVEAL ---------- */

    const revealElements = document.querySelectorAll(
        ".reveal, .value-item, .gallery-card, .contact-grid > *"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    /* ---------- CONTACT FORM ---------- */

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            formStatus.textContent =
                "Thank you for your message! The form is currently a demo and is not connected to an email service.";

            formStatus.classList.add("success");

            contactForm.reset();

        });

    }


    /* ---------- SMOOTH INTERNAL LINKS ---------- */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ---------- SUBTLE GOLD SPARKLES ---------- */

    const sparkleContainer = document.querySelector(".hero-section");

    if (sparkleContainer) {

        for (let i = 0; i < 9; i++) {

            const sparkle = document.createElement("span");

            sparkle.className = "generated-sparkle";

            sparkle.style.left = `${8 + Math.random() * 84}%`;
            sparkle.style.top = `${8 + Math.random() * 84}%`;
            sparkle.style.animationDelay = `${Math.random() * 5}s`;
            sparkle.style.animationDuration = `${3 + Math.random() * 4}s`;

            sparkleContainer.appendChild(sparkle);

        }

    }

});
