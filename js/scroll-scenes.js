
/* =========================================
   FATIMA HASSAN — SCROLL ANIMATIONS
   Desktop + Smartphone Showcase
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const desktopScene = document.getElementById("desktop-scene");
    const desktopDevice = document.getElementById("desktop-device");
    const desktopScreen = document.getElementById("desktop-screen");
    const desktopTrack = document.getElementById("desktop-page-track");

    const mobileScene = document.getElementById("mobile-scene");
    const phoneDevice = document.getElementById("phone-device");
    const phoneScreen = document.getElementById("phone-screen");

    if (
        !desktopScene ||
        !desktopDevice ||
        !desktopScreen ||
        !desktopTrack ||
        !mobileScene ||
        !phoneDevice ||
        !phoneScreen
    ) {
        console.warn(
            "Showcase elements are missing. Check the IDs in index.html."
        );
        return;
    }

    /* ---------- HELPERS ---------- */

    const clamp = (value, min = 0, max = 1) => {
        return Math.min(Math.max(value, min), max);
    };

    const smoothStep = (value) => {
        const t = clamp(value);
        return t * t * (3 - 2 * t);
    };

    const getProgress = (section) => {
        const rect = section.getBoundingClientRect();
        const distance = section.offsetHeight - window.innerHeight;

        if (distance <= 0) return 0;

        return clamp(-rect.top / distance);
    };


    /* =====================================
       DESKTOP MONITOR
    ===================================== */

    const animateDesktop = (progress) => {

        // Monitor entrance.
        const entrance = smoothStep(progress / 0.18);

        // Monitor exit.
        const exit = smoothStep((progress - 0.91) / 0.09);

        const deviceScale = 0.90 + entrance * 0.10;
        const deviceY = 65 * (1 - entrance) - exit * 80;
        const deviceOpacity = entrance * (1 - exit);

        desktopDevice.style.setProperty(
            "--device-y",
            `${deviceY}px`
        );

        desktopDevice.style.setProperty(
            "--device-scale",
            deviceScale
        );

        desktopDevice.style.opacity = deviceOpacity;

        // Never enlarge the screen independently.
        desktopScreen.style.transform = "scale(1)";

        // Move the website content inside the monitor.
        const maxScroll = Math.max(
            0,
            desktopTrack.scrollHeight - desktopScreen.clientHeight
        );

        const websiteProgress = smoothStep(
            (progress - 0.10) / 0.78
        );

        const trackPosition = maxScroll * websiteProgress;

        desktopTrack.style.transform =
            `translate3d(0, -${trackPosition}px, 0)`;
    };


    /* =====================================
       SMARTPHONE ROTATION
    ===================================== */

   
    /* =====================================
       SMARTPHONE ROTATION
    ===================================== */

    const animatePhone = (progress) => {

        const entrance = smoothStep(progress / 0.15);

        const rotation = smoothStep(
            (progress - 0.08) / 0.55
        );

        const exit = smoothStep(
            (progress - 0.88) / 0.12
        );

        const phoneRotation = -17 + rotation * 107;

        const phoneScale = 0.82 + entrance * 0.18;
        const phoneY = 65 * (1 - entrance) - exit * 100;
        const phoneOpacity = entrance * (1 - exit);

        phoneDevice.style.setProperty(
            "--phone-rotation",
            `${phoneRotation}deg`
        );

        phoneDevice.style.setProperty(
            "--phone-scale",
            phoneScale
        );

        phoneDevice.style.setProperty(
            "--phone-y",
            `${phoneY}px`
        );

        phoneDevice.style.opacity = phoneOpacity;

        const screenReveal = smoothStep(
            (progress - 0.03) / 0.18
        );

        phoneScreen.style.opacity = screenReveal;

        // Scroll the full mobile webpage inside the phone.
        const mobilePreview = phoneScreen.querySelector(".mobile-preview");

        if (mobilePreview) {

            const maxScroll = Math.max(
                0,
                mobilePreview.offsetHeight - phoneScreen.clientHeight
            );

            const contentProgress = smoothStep(
                (progress - 0.12) / 0.72
            );

            const contentPosition = maxScroll * contentProgress;

            mobilePreview.style.transform =
                `translate3d(0, -${contentPosition}px, 0)`;
        }
    };


    /* =====================================
       SCROLL UPDATE
    ===================================== */

    let ticking = false;

    const updateAnimations = () => {

        animateDesktop(getProgress(desktopScene));
        animatePhone(getProgress(mobileScene));

        ticking = false;
    };

    const requestUpdate = () => {

        if (!ticking) {
            window.requestAnimationFrame(updateAnimations);
            ticking = true;
        }

    };

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestUpdate
    );

    // Initial positions.
    updateAnimations();

});
