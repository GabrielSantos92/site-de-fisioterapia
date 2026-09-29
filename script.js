// ===== Configuração de contato (fonte única) =====
// Número no formato internacional, apenas dígitos: 55 + DDD + número.
const WHATSAPP_NUMBER = '5521976952733';
const WHATSAPP_DEFAULT_MSG = 'Olá, Bruna! Vim pelo site e gostaria de agendar uma avaliação.';

function whatsappUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

document.addEventListener('DOMContentLoaded', function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Links de WhatsApp com mensagem pré-preenchida.
    // data-wa="" usa a mensagem padrão; data-wa="texto" acrescenta um complemento.
    document.querySelectorAll('[data-wa]').forEach(function (link) {
        const extra = link.getAttribute('data-wa');
        link.href = whatsappUrl(extra ? WHATSAPP_DEFAULT_MSG + ' ' + extra : WHATSAPP_DEFAULT_MSG);
    });

    // Header: sombra ao rolar
    const header = document.getElementById('header');
    const waFloat = document.getElementById('wa-float');
    const hero = document.getElementById('inicio');

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('is-scrolled', y > 8);
        // Botão flutuante aparece depois do hero (onde já existe o CTA principal)
        if (waFloat) {
            const threshold = hero ? hero.offsetHeight * 0.6 : 400;
            waFloat.classList.toggle('is-visible', y > threshold && !document.body.classList.contains('menu-open'));
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Menu mobile
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');

    if (btnMobile && nav) {
        const desktopQuery = window.matchMedia('(min-width: 1120px)');

        function setMenu(open) {
            nav.classList.toggle('is-open', open);
            document.body.classList.toggle('menu-open', open);
            btnMobile.setAttribute('aria-expanded', String(open));
            btnMobile.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            if (open) {
                const first = nav.querySelector('a');
                if (first) first.focus();
            }
            onScroll();
        }

        function isOpen() {
            return nav.classList.contains('is-open');
        }

        btnMobile.addEventListener('click', function () {
            setMenu(!isOpen());
        });

        // Fecha ao clicar em um link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (isOpen()) setMenu(false);
            });
        });

        // Fecha com Esc e devolve o foco ao botão
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) {
                setMenu(false);
                btnMobile.focus();
            }
        });

        // Fecha ao clicar fora
        document.addEventListener('click', function (e) {
            if (isOpen() && !nav.contains(e.target) && !btnMobile.contains(e.target)) {
                setMenu(false);
            }
        });

        // Ao mudar para desktop, garante estado fechado
        desktopQuery.addEventListener('change', function () {
            if (isOpen()) setMenu(false);
        });
    }

    // Destaca no menu a seção visível
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    if ('IntersectionObserver' in window && navLinks.length) {
        const byId = {};
        navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
                const link = byId[entry.target.id];
                if (link) link.setAttribute('aria-current', 'true');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        Object.keys(byId).forEach(function (id) {
            const section = document.getElementById(id);
            if (section) sectionObserver.observe(section);
        });
    }

    // Animação de entrada suave
    const revealEls = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        revealEls.forEach(function (el) {
            // pequeno atraso escalonado entre itens irmãos
            const index = Array.prototype.indexOf.call(el.parentElement.children, el);
            el.style.transitionDelay = Math.min(index, 5) * 70 + 'ms';
            revealObserver.observe(el);
        });
    }

    // Formulário: monta a mensagem e abre o WhatsApp.
    // Nenhum dado é enviado a servidores ou armazenado pelo site.
    const form = document.getElementById('form-contato');
    if (form) {
        const nome = form.querySelector('#nome');
        const nomeErro = form.querySelector('#nome-erro');
        const status = document.getElementById('form-status');

        function showNameError(show) {
            nome.setAttribute('aria-invalid', show ? 'true' : 'false');
            nomeErro.hidden = !show;
        }

        nome.addEventListener('input', function () {
            if (nome.value.trim()) showNameError(false);
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = nome.value.trim();
            if (!name) {
                showNameError(true);
                nome.focus();
                return;
            }
            showNameError(false);

            const interesse = form.querySelector('#interesse').value;
            const periodo = form.querySelector('#periodo').value;
            const mensagem = form.querySelector('#mensagem').value.trim();

            const lines = ['Olá, Bruna! Meu nome é ' + name + '. Vim pelo site e gostaria de agendar uma avaliação.'];
            if (interesse) lines.push('Interesse: ' + interesse);
            if (periodo) lines.push('Melhor período: ' + periodo);
            if (mensagem) lines.push('', mensagem);

            const url = whatsappUrl(lines.join('\n'));
            // Sem 'noopener' nos parâmetros: com ele o navegador sempre retorna null
            const win = window.open(url, '_blank');
            if (win) {
                win.opener = null;
            } else {
                window.location.href = url; // pop-up bloqueado
            }

            if (status) {
                status.textContent = 'Abrimos o WhatsApp com a sua mensagem. Agora é só tocar em enviar por lá.';
            }
        });
    }

    // Ano atual no rodapé
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
