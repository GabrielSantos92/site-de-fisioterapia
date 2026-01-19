document.addEventListener('DOMContentLoaded', function () {
    // ===== Header scroll effect =====
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // ===== Mobile menu toggle =====
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    if (btnMobile && nav) {
        function toggleMenu() {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            btnMobile.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        }

        btnMobile.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('#nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !btnMobile.contains(e.target) && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ===== Smooth scrolling for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                let offsetAdjustment = 80;

                if (targetId === '#contato') {
                    offsetAdjustment = 125;
                }

                window.scrollTo({
                    top: targetElement.offsetTop - offsetAdjustment,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ===== Animate elements when scrolling =====
    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            '.servico-card, .qualificacao-item, .beneficio-item, .contato-form, .contato-info, .sobre-img, .sobre-texto, .depoimento-card, .blog-card'
        );

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
    const animatedElements = document.querySelectorAll(
        '.servico-card, .qualificacao-item, .beneficio-item, .contato-form, .contato-info, .sobre-img, .sobre-texto, .depoimento-card, .blog-card'
    );
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // ===== Form submission =====
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            // Basic validation
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Success message
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }

    // ===== Update current year in footer =====
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ===== Add smooth scroll to top button =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #0D1C43;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 9998;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.backgroundColor = '#2c3e73';
        scrollToTopBtn.style.transform = 'scale(1.1)';
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.backgroundColor = '#0D1C43';
        scrollToTopBtn.style.transform = 'scale(1)';
    });

    // ===== Add loading state to buttons =====
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    });
});
