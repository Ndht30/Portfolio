/* ============================================
   PORTFOLIO - SCRIPT JAVASCRIPT
   ============================================ */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll animation for cards on load
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--color-text)';
        if (link.getAttribute('href').includes(current)) {
            link.style.color = 'var(--color-accent)';
        }
    });
});

// LIGHTBOX + NAVIGATION SUR LES IMAGES DU CAROUSEL
document.addEventListener('DOMContentLoaded', function () {
    const carouselImages = Array.from(document.querySelectorAll('.carousel-slide img'));
    const lightbox = document.getElementById('img-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');
    const backdrop = document.querySelector('.lightbox-backdrop');

    if (!carouselImages.length || !lightbox || !lightboxImg) return;

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = carouselImages[currentIndex].src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // bloque le scroll
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = ''; // réactive le scroll
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carouselImages.length - 1;
        }
        lightboxImg.src = carouselImages[currentIndex].src;
    }

    function showNext() {
        if (currentIndex < carouselImages.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        lightboxImg.src = carouselImages[currentIndex].src;
    }

    // OUVERTURE : clic sur image slider
    carouselImages.forEach((img, index) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(index));
    });

    // NAVIGATION : boutons prev/next
    btnPrev?.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    btnNext?.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    // FERMETURE :
    // 1. Clic sur backdrop
    backdrop?.addEventListener('click', closeLightbox);

    // 2. Clic sur l'image ✅ NOUVEAU
    lightboxImg.addEventListener('click', closeLightbox);

    // 3. Touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
});

// ANIMATION COMPTEURS STATS
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 secondes
        let startTime = null;

        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const currentValue = Math.floor(finalValue * easeOutQuart(progress));
            stat.textContent = currentValue + '+';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Observer pour déclencher l'animation au scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.closest('.stat')?.classList.add('animate');
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

// Appliquer à toutes les stats
document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});
