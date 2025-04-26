document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Mobile menu toggle
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    
    function toggleMenu() {
        nav.classList.toggle('active');
        const isActive = nav.classList.contains('active');
        btnMobile.setAttribute('aria-expanded', isActive);
    }
    
    btnMobile.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('#nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servico-card, .qualificacao-item, .beneficio-item, .contato-form, .contato-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.servico-card, .qualificacao-item, .beneficio-item, .contato-form, .contato-info');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Form submission
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});