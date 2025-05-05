// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Theme Switcher
    const themeSwitch = document.querySelector('.theme-switch');
    const body = document.body;

    // Check for saved theme in localStorage
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeSwitch.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon
        if (body.classList.contains('dark-mode')) {
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('dark-mode', 'true');
        } else {
            themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('dark-mode', 'false');
        }
    });

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        
        // Change icon
        if (nav.style.display === 'block') {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && window.innerWidth <= 992) {
            nav.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                nav.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            nav.style.display = 'block';
        } else {
            nav.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.querySelector('.copyright p');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.textContent = `© ${year} Ống Hút Tre. Đã đăng ký bản quyền.`;
    }
});

// Reveal content on scroll (backup for browsers where AOS doesn't work)
if (typeof AOS === 'undefined') {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    function revealOnScroll() {
        const sections = document.querySelectorAll('.section, .conclusion');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('visible');
            }
        });
    }
} 