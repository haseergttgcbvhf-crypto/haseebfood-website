// MOBILE NAVIGATION TOGGLE
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// NAVBAR BACKGROUND ON SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 10px 25px rgba(0, 0, 0, 0.15)'
            : '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            window.scrollTo({
                top: document.querySelector(href).offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// REVEAL ANIMATIONS
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.product-card, .step, .contact-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
        observer.observe(el);
    });
}

// PAGE LOAD
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// KEYBOARD SUPPORT
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));

// WHATSAPP / BUTTON ACCESSIBILITY
document.querySelectorAll('.btn').forEach(button => {
    if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
    }
});

const floatingWhatsAppButton = document.querySelector('.floating-whatsapp');
if (floatingWhatsAppButton) {
    floatingWhatsAppButton.addEventListener('click', () => {
        console.log('Floating WhatsApp button clicked');
    });
}

function updateWhatsAppLinks(phoneNumber) {
    const baseUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const currentHref = link.getAttribute('href');
        const hasMessage = currentHref.includes('?text=');
        if (hasMessage) {
            const message = currentHref.split('?text=')[1];
            link.setAttribute('href', `${baseUrl}?text=${message}`);
        } else {
            link.setAttribute('href', baseUrl);
        }
    });
}

console.log('HaseebFood website loaded successfully');
