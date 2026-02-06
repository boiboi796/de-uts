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
