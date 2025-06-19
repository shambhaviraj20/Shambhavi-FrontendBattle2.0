// ========== ENHANCED THEME TOGGLE ==========
        const toggleBtn = document.getElementById("themeToggle");

        // Function to update the theme icon
        function updateThemeIcon() {
            const isDark = document.documentElement.classList.contains("dark");
            toggleBtn.querySelector("span").textContent = isDark ? "☀️" : "🌙";
        }

        toggleBtn.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark");
            const isDark = document.documentElement.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateThemeIcon();
            
            // Add a subtle animation feedback
            toggleBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggleBtn.style.transform = 'scale(1)';
            }, 150);
        });

        // Function to initialize theme on page load
        function initializeTheme() {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                if (savedTheme === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // If no saved theme, use system preference
                document.documentElement.classList.add("dark");
            }
            updateThemeIcon(); // Set initial icon based on theme
        }

        // ========== KEYBOARD SHORTCUT FOR THEME TOGGLE ==========
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                toggleBtn.click();
            }
        });

        // ========== SCROLL PROGRESS INDICATOR ==========
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            if (scrollIndicator) { // Check if element exists
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                scrollIndicator.style.width = `${scrollPercentage}%`;
            }
        });

        // ========== SMOOTH SCROLL FOR NAVIGATION ==========
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ========== NAVBAR BLUR EFFECT ON SCROLL (Improved) ==========
        // This functionality might need further refinement depending on desired behavior.
        // The original code had a hide/show effect based on scroll direction.
        // For a simple blur on scroll, you'd apply a class based on scroll position.
        // Keeping original scroll direction hide/show for now.
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) { // Check if header exists
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                    // Scrolling down and past header height
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up or at the very top
                    header.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            }
        });

        // ========== ON FULL PAGE LOAD ==========
        window.addEventListener("load", () => {
            initializeTheme(); // Initialize theme first
            
            // Loader logic - immediate hide for faster loading
            const loader = document.getElementById("loader");
            const mainContent = document.getElementById("mainContent");

            if (loader && mainContent) { // Check if elements exist
                // Fade out loader quickly
                loader.classList.add("hidden");
                document.body.classList.remove("loading");

                // After fade out, show homepage
                setTimeout(() => {
                    loader.style.display = "none";
                    mainContent.classList.remove("opacity-0");
                }, 700);
            }
        });

        // ========== FALLBACK LOADER HIDE ==========
        // Hide loader after maximum 2 seconds regardless of load state
        setTimeout(() => {
            const loader = document.getElementById("loader");
            const mainContent = document.getElementById("mainContent");
            if (loader && mainContent && !loader.classList.contains("hidden")) {
                loader.classList.add("hidden");
                document.body.classList.remove("loading");
                setTimeout(() => {
                    loader.style.display = "none";
                    mainContent.classList.remove("opacity-0");
                }, 700);
            }
        }, 2000); // 2 seconds


        // ========== LISTEN FOR SYSTEM THEME CHANGES ==========
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem("theme")) { // Only change if user hasn't manually set a theme
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                updateThemeIcon();
            }
        });

        // ========== CURSOR TRAIL EFFECT (Optional, from original) ==========
        // If you want to keep this, ensure the CSS for .cursor-ripple and @keyframes ripple is in your style.
        // This effect seems to be in customers.html style. If you want it site-wide, move to a shared CSS.
        document.addEventListener('mousemove', (e) => {
            const trail = document.createElement('div');
            trail.className = 'fixed pointer-events-none w-2 h-2 bg-blue-400 rounded-full opacity-60 z-50';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.animation = 'fadeOut 1s ease-out forwards';
            document.body.appendChild(trail);
            
            setTimeout(() => {
                trail.remove();
            }, 1000);
        });

        // Add fadeOut keyframe to a style element for dynamic trails
        // This is good for self-contained JS-driven effects
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    