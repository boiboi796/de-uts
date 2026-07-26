document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile nav toggle ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Hero text rotator ---------- */
    const textSets = document.querySelectorAll('.text-set');
    const dots = document.querySelectorAll('.rotator-dots .dot');
    let rotatorIndex = 0;
    let rotatorTimer;

    function showRotator(index) {
        textSets.forEach((set, i) => set.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        rotatorIndex = index;
    }

    function nextRotator() {
        showRotator((rotatorIndex + 1) % textSets.length);
    }

    function startRotator() {
        clearInterval(rotatorTimer);
        rotatorTimer = setInterval(nextRotator, 4500);
    }

    if (textSets.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                showRotator(parseInt(dot.dataset.index, 10));
                startRotator();
            });
        });
        startRotator();
    }

    /* ---------- Feature tabs ---------- */
    const tabItems = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');

    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            tabItems.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            panels.forEach(panel => {
                panel.classList.toggle('active', panel.id === targetId);
            });
        });
    });

    /* ---------- Contact form ---------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Message sent — we'll get back to you soon.";
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (err) {
                formStatus.textContent = 'Something went wrong. Please try again or email us directly.';
                formStatus.classList.add('error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    /* ---------- About galleries: rotate showcase and poster ---------- */
    function initRotatingGallery(containerId, galleryImages, fallbackText, imageAlt) {
        const galleryContainer = document.getElementById(containerId);

        if (!galleryContainer) return;

        const shuffled = [...galleryImages].sort(() => Math.random() - 0.5);

        shuffled.forEach((src, index) => {
            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = src;
            img.alt = imageAlt;
            img.loading = 'lazy';
            if (index === 0) img.classList.add('active');

            img.addEventListener('error', () => img.remove());

            galleryContainer.appendChild(img);
        });

        setTimeout(() => {
            const loaded = Array.from(galleryContainer.querySelectorAll('.gallery-image'));

            if (!loaded.length) {
                const fallback = document.createElement('p');
                fallback.className = 'gallery-fallback';
                fallback.textContent = fallbackText;
                galleryContainer.appendChild(fallback);
                return;
            }

            let activeIndex = loaded.findIndex(img => img.classList.contains('active'));
            if (activeIndex === -1) activeIndex = 0;

            setInterval(() => {
                loaded[activeIndex].classList.remove('active');
                activeIndex = (activeIndex + 1) % loaded.length;
                loaded[activeIndex].classList.add('active');
            }, 2600);
        }, 300);
    }

    initRotatingGallery(
        'aboutGallery',
        [
            'images/gallery/step-01.png',
            'images/gallery/step-02.png',
            'images/gallery/step-03.png',
            'images/gallery/step-04.png',
            'images/gallery/step-05.png',
            'images/gallery/step-06.png'
        ],
        'Drop photos into images/gallery/ to power this showcase.',
        'De Ultimate Steppers gallery image'
    );

    initRotatingGallery(
        'updateGallery',
        ['poster.jpg'],
        'Replace poster.jpg to change this update showcase.',
        'De Ultimate Steppers update poster'
    );

    /* ---------- Scroll-reveal for sections ---------- */
    const revealTargets = document.querySelectorAll('.about-content, .feature-content, .contact-container');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(target => {
            target.style.opacity = '0';
            target.style.transform = 'translateY(24px)';
            target.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
            observer.observe(target);
        });
    }
});
