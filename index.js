// JavaScript Document

/*

TemplateMo 596 Electric Xtra

https://templatemo.com/tm-596-electric-xtra

*/

// Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            const particleCount = isMobile ? 10 : 18;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                // Randomly assign orange or blue color
                if (Math.random() > 0.5) {
                    particle.style.setProperty('--particle-color', '#00B2FF');
                    const before = particle.style.getPropertyValue('--particle-color');
                    particle.style.background = '#00B2FF';
                }
                
                particlesContainer.appendChild(particle);
            }
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    if (currentNav) currentNav.classList.add('active');
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            updateActiveNav();
        });

        // Initial active nav update
        updateActiveNav();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Feature tabs functionality
        const tabs = document.querySelectorAll('.tab-item');
        const panels = document.querySelectorAll('.content-panel');
        let activeTabIndex = 0;

        function activateFeatureTab(tab, index) {
            const tabId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            activeTabIndex = index;
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                activateFeatureTab(tab, index);
            });
        });

        if (tabs.length) {
            setInterval(() => {
                const nextIndex = (activeTabIndex + 1) % tabs.length;
                activateFeatureTab(tabs[nextIndex], nextIndex);
            }, 4500);
        }

        // Handle Formspree submit without redirecting.
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');

        function setFormStatus(message, type) {
            if (!formStatus) return;

            formStatus.textContent = message;
            formStatus.classList.remove('success', 'error', 'visible');

            if (type) {
                formStatus.classList.add(type);
            }

            if (message) {
                formStatus.classList.add('visible');
            }
        }

        if (contactForm) {
            contactForm.addEventListener('submit', async (event) => {
                event.preventDefault();

                const submitButton = contactForm.querySelector('.submit-btn');
                const originalButtonText = submitButton ? submitButton.textContent : '';
                const formData = new FormData(contactForm);

                setFormStatus('Sending your message...', null);

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Sending...';
                }

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Unable to send message right now.');
                    }

                    contactForm.reset();
                    setFormStatus('Message sent successfully. We will reach out to you soon.', 'success');
                } catch (error) {
                    setFormStatus('Message failed to send. Please try again in a moment.', 'error');
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                }
            });
        }

        // Animate gallery images in the first About visual box.
        const galleryContainer = document.getElementById('aboutGallery');

        if (galleryContainer) {
            const galleryImages = [
                'images/gallery/step-01.png',
                'images/gallery/step-02.png',
                'images/gallery/step-03.png',
                'images/gallery/step-04.png',
                'images/gallery/step-05.png',
                'images/gallery/step-06.png'
            ];

            const shuffledImages = [...galleryImages].sort(() => Math.random() - 0.5);
            const imageElements = [];
            let activeIndex = 0;

            shuffledImages.forEach((src, index) => {
                const image = document.createElement('img');
                image.className = 'gallery-image';
                image.src = src;
                image.alt = 'De Ultimate Steppers gallery image';
                image.loading = 'lazy';

                image.onerror = () => {
                    image.remove();
                };

                galleryContainer.appendChild(image);
                imageElements.push(image);

                if (index === 0) {
                    image.classList.add('active');
                }
            });

            setTimeout(() => {
                const availableImages = Array.from(galleryContainer.querySelectorAll('.gallery-image'));

                if (!availableImages.length) {
                    const fallback = document.createElement('div');
                    fallback.className = 'gallery-fallback';
                    fallback.textContent = 'Drop photos into images/gallery to power this live showcase.';
                    galleryContainer.appendChild(fallback);
                    return;
                }

                const rotateGallery = () => {
                    availableImages[activeIndex].classList.remove('active');
                    activeIndex = (activeIndex + 1) % availableImages.length;
                    availableImages[activeIndex].classList.add('active');
                };

                setInterval(rotateGallery, 2600);
            }, 300);
        }

        // Decorative particles were removed for a cleaner presentation.

        // Text rotation with character animation
        const textSets = document.querySelectorAll('.text-set');
        let currentIndex = 0;
        let isAnimating = false;

        function wrapTextInSpans(element) {
            const text = element.textContent;
            element.innerHTML = text.split('').map((char, i) => 
                `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        }

        function animateTextIn(textSet) {
            const glitchText = textSet.querySelector('.glitch-text');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Wrap text in spans for animation
            wrapTextInSpans(glitchText);
            
            // Update data attribute for glitch effect
            glitchText.setAttribute('data-text', glitchText.textContent);
            
            // Show subtitle after main text
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }

        function animateTextOut(textSet) {
            const chars = textSet.querySelectorAll('.char');
            const subtitle = textSet.querySelector('.subtitle');
            
            // Animate characters out
            chars.forEach((char, i) => {
                char.style.animationDelay = `${i * 0.02}s`;
                char.classList.add('out');
            });
            
            // Hide subtitle
            subtitle.classList.remove('visible');
        }

        function rotateText() {
            if (isAnimating) return;
            isAnimating = true;

            const currentSet = textSets[currentIndex];
            const nextIndex = (currentIndex + 1) % textSets.length;
            const nextSet = textSets[nextIndex];

            // Animate out current text
            animateTextOut(currentSet);

            // After out animation, switch sets
            setTimeout(() => {
                currentSet.classList.remove('active');
                nextSet.classList.add('active');
                animateTextIn(nextSet);
                
                currentIndex = nextIndex;
                isAnimating = false;
            }, 600);
        }

        // Initialize first text set
        textSets[0].classList.add('active');
        animateTextIn(textSets[0]);

        // Start rotation after initial display
        setTimeout(() => {
            setInterval(rotateText, 5000); // Change every 5 seconds
        }, 4000);

