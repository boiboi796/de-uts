document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all sections for scroll-based animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    //handle the updatetext div
    const updateText = document.getElementById('updatetext');
    if (updateText.innerHTML.trim() === '') {
        updateText.style.display = 'none';
    }
    else {
        updateText.style.display = 'block';
    }

    
    // Micro-interaction for style cards
    const styleCards = document.querySelectorAll('.style-card');
    styleCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create a subtle glow effect that follows the mouse
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Carousel Functionality
    const carousel = document.getElementById('updates-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        let autoPlayInterval;
        const autoPlayDelay = 5000; // 5 seconds

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function showSlide(index) {
            // Hide all items
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Show selected item
            currentIndex = (index + items.length) % items.length;
            items[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Pause on hover, resume on mouse leave
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Show first slide and start auto-play
        showSlide(0);
        startAutoPlay();
    }

    // Handle Contact Form Submission via AJAX
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "Thanks for joining the movement!";
                    status.style.color = "var(--secondary-neon)";
                    form.reset();
                } else {
                    const data = await response.json();
                    status.innerHTML = data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem.";
                    status.style.color = "#ff4d4d";
                }
            } catch (error) {
                status.innerHTML = "Oops! There was a problem submitting your form";
                status.style.color = "#ff4d4d";
            }
        });
    }
});
