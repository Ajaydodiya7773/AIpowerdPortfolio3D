// Portfolio Animations and Interactions
class PortfolioAnimations {
    constructor() {
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.setupSkillBars();
        this.setupCounterAnimations();
        this.setupHamburgerMenu();
        this.observeElementsInView();
    }

    setupScrollAnimations() {
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Hero section parallax
            gsap.to('.hero-content', {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Section titles animation
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.fromTo(title, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Project cards stagger animation
            gsap.fromTo('.project-card', {
                opacity: 0,
                y: 60,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            // About section content animation
            gsap.fromTo('.about-text p', {
                opacity: 0,
                x: -50
            }, {
                opacity: 1,
                x: 0,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Stats animation
            gsap.fromTo('.stat', {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.about-stats',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    }

    setupInteractiveElements() {
        // Project card hover effects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(button, {
                        scale: 1.05,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });

            button.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const skill = bar.getAttribute('data-skill');
                if (skill) {
                    bar.style.width = skill + '%';
                }
            });
        };

        // Use Intersection Observer to trigger skill bar animations
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateSkillBars, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(skillsSection);
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                } else {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        };

        // Use Intersection Observer to trigger counter animations
        const aboutStats = document.querySelector('.about-stats');
        if (aboutStats) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counters.forEach((counter, index) => {
                            setTimeout(() => animateCounter(counter), index * 200);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(aboutStats);
        }
    }

    setupHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    observeElementsInView() {
        // Add fade-in animation to elements as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        // Observe various elements
        const elementsToObserve = document.querySelectorAll(
            '.project-card, .skill-category, .contact-form, .about-text'
        );
        
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }

    // Smooth scroll to section
    static scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add floating animation to elements
    static addFloatingAnimation(selector, intensity = 10, duration = 3) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            if (typeof gsap !== 'undefined') {
                gsap.to(element, {
                    y: `+=${intensity}`,
                    duration: duration + (index * 0.1),
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.2
                });
            }
        });
    }

    // Particle cursor effect
    setupParticleCursor() {
        const cursor = document.querySelector('.cursor');
        if (!cursor) {
            const cursorElement = document.createElement('div');
            cursorElement.classList.add('cursor');
            document.body.appendChild(cursorElement);
        }

        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (cursor && typeof gsap !== 'undefined') {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1
                });
            }
        });
    }

    // Text typing effect
    static typeText(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }
}

// Form validation and submission
class FormHandler {
    constructor() {
        this.setupContactForm();
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    validateForm(data) {
        const { name, email, message } = data;
        
        if (!name.trim()) {
            alert('Please enter your name');
            return false;
        }
        
        if (!email.trim() || !this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        if (!message.trim()) {
            alert('Please enter your message');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    new FormHandler();
    
    // Add floating animation to project cards
    setTimeout(() => {
        PortfolioAnimations.addFloatingAnimation('.project-card', 5, 4);
    }, 1000);
});

// Add smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', () => {
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
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioAnimations, FormHandler };
}
