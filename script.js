document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link && mobileMenu && navMenu) {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        }
    });

    // All other scripts should be inside this block as well
    // ... rest of the JavaScript code from your original file ...

    // Smooth scrolling and active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const whatsappFloat = document.getElementById('whatsapp-float');

    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Show/hide WhatsApp float button
        if (whatsappFloat) {
            if (window.scrollY > 200) {
                whatsappFloat.classList.add('show');
            } else {
                whatsappFloat.classList.remove('show');
            }
        }
        
        highlightActiveLink();
    }

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.3s';
                entry.target.style.animationFillMode = 'both';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Enhanced scroll effects for hero section
    let ticking = false;

    function updateHeroParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .hero-overlay');
        
        parallaxElements.forEach(element => {
            if (element) {
                const speed = element.classList.contains('hero-content') ? 0.5 : 0.3;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeroParallax);
            ticking = true;
        }
    }

    // Only apply parallax on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallaxUpdate);
    }

    // Gallery image loading optimization
    const galleryImages = document.querySelectorAll('.gallery-item img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });

    galleryImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Service card hover effects enhancement
    document.querySelectorAll('.service-card').forEach(card => {
        if (card) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
    });

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    function rotateTestimonials() {
        if (testimonials.length > 0 && window.innerWidth > 768) {
            testimonials.forEach((testimonial, index) => {
                if (testimonial) {
                    testimonial.style.opacity = index === currentTestimonial ? '1' : '0.5';
                    testimonial.style.transform = index === currentTestimonial ? 'scale(1.05)' : 'scale(1)';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }

    // Auto-rotate testimonials every 4 seconds
    setInterval(rotateTestimonials, 4000);

    // Initialize on load
    window.addEventListener('load', () => {
        // Preload critical images
        const criticalImages = [
            'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1920'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Initialize scroll position
        handleScroll();
        
        // Add loaded class to body for CSS transitions
        if (document.body) {
            document.body.classList.add('loaded');
        }
    });

    // Ensure DOM is fully loaded before running scripts
    document.addEventListener('DOMContentLoaded', () => {
        // Re-initialize mobile menu functionality after DOM is ready
        const mobileMenuDOM = document.getElementById('mobile-menu');
        const navMenuDOM = document.getElementById('nav-menu');
        
        if (mobileMenuDOM && navMenuDOM) {
            mobileMenuDOM.addEventListener('click', () => {
                mobileMenuDOM.classList.toggle('active');
                navMenuDOM.classList.toggle('active');
            });
        }
        
        // Re-initialize WhatsApp float button
        const whatsappFloatDOM = document.getElementById('whatsapp-float');
        if (whatsappFloatDOM) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 200) {
                    whatsappFloatDOM.classList.add('show');
                } else {
                    whatsappFloatDOM.classList.remove('show');
                }
            });
        }
    });
});
