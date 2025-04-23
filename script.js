// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations with simpler settings
    AOS.init({
        duration: 600,
        easing: 'ease',
        once: true,
        disable: 'mobile'
    });

    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add active class to nav items when scrolling (scroll spy)
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const navLink = document.querySelector('.navbar-nav a[href*=' + sectionId + ']');
                if (navLink) navLink.classList.add('active');
            } else {
                const navLink = document.querySelector('.navbar-nav a[href*=' + sectionId + ']');
                if (navLink) navLink.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for all links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            if(this.getAttribute('href') === '#') return;
            
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation for contact forms
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });
            
            // If form is valid, you can submit it or show success message
            if (isValid) {
                // Show loading spinner
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(function() {
                    // Create success alert
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you for your message! We will get back to you soon.';
                    form.appendChild(successAlert);
                    
                    // Reset the form
                    form.reset();
                    
                    // Reset validation classes
                    requiredFields.forEach(field => {
                        field.classList.remove('is-valid');
                    });
                    
                    // Reset button
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successAlert.remove();
                    }, 5000);
                }, 1500);
            }
        });
    });

    // Simpler skill bars animation
    const skillBars = document.querySelectorAll('.progress-bar');
    
    if (skillBars.length > 0) {
        // Set initial width to 0
        skillBars.forEach(bar => {
            bar.style.width = '0';
        });
        
        // Animate skill bars after a short delay
        setTimeout(() => {
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('aria-valuenow') + '%';
            });
        }, 500);
    }
    
    // Typing animation for hero section (if on home page)
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const words = ['Amazing', 'Creative', 'Innovative', 'Passionate'];
        let wordIndex = 0;
        const highlightSpan = heroTitle.querySelector('.highlight');
        
        if(highlightSpan) {
            setInterval(() => {
                // Change word
                wordIndex = (wordIndex + 1) % words.length;
                highlightSpan.textContent = words[wordIndex];
            }, 3000);
        }
    }
    
    // Theme toggler (if it exists)
    const themeToggler = document.getElementById('themeToggler');
    if (themeToggler) {
        const body = document.body;
        const icon = themeToggler.querySelector('i');
        
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.toggle('light-theme', savedTheme === 'light');
            updateThemeIcon(savedTheme === 'light');
        }
        
        themeToggler.addEventListener('click', () => {
            // Toggle theme
            body.classList.toggle('light-theme');
            const isLightTheme = body.classList.contains('light-theme');
            
            // Update icon
            updateThemeIcon(isLightTheme);
            
            // Save theme preference to local storage
            localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
        });
        
        function updateThemeIcon(isLightTheme) {
            if (isLightTheme) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }
    
    // Add a class to navbar when scrolled
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}); 