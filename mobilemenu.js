document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        navMenu.classList.toggle('mobile-active');
        document.body.style.overflow = navMenu.classList.contains('mobile-active') ? 'hidden' : '';
        mobileMenuBtn.innerHTML = navMenu.classList.contains('mobile-active') ? '×' : '☰';
    }

    function closeMobileMenu() {
        navMenu.classList.remove('mobile-active');
        document.body.style.overflow = '';
        mobileMenuBtn.innerHTML = '☰';
    }

    // Event Listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            if (href === '#menu-page') {
                closeMobileMenu();
                openMenu();
            } else if (href === '#reservation') {
                closeMobileMenu();
                openReservation();
            } else {
                const target = document.querySelector(href);
                closeMobileMenu();
                
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});