document.addEventListener('DOMContentLoaded', function() {
    // Function to add target="_blank" to external links
    function addExternalTargets() {
        // Get all anchor elements with http or https links
        const links = document.querySelectorAll('a[href^="http"]');
        
        // Get current domain
        const currentDomain = window.location.hostname;
        
        // Loop through all links
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if the link is external
            if (href && !href.includes(currentDomain)) {
                // Add target="_blank" attribute
                link.setAttribute('target', '_blank');
                
                // For better security, also add rel="noopener noreferrer" if not already present
                const rel = link.getAttribute('rel') || '';
                if (!rel.includes('noopener')) {
                    const newRel = rel ? `${rel} noopener noreferrer` : 'noopener noreferrer';
                    link.setAttribute('rel', newRel);
                }
            }
        });
    }
    
    // Run the function when the page loads
    addExternalTargets();
    
    // Mobile navigation menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;
    const menuBackdrop = document.querySelector('.menu-backdrop');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle navigation
            nav.classList.toggle('nav-active');
            
            // Toggle body scroll lock
            body.classList.toggle('menu-open');
            
            // Toggle backdrop
            menuBackdrop.classList.toggle('active');
            
            // Animate links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Close mobile menu when clicking on backdrop
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                body.classList.remove('menu-open');
                menuBackdrop.classList.remove('active');
                burger.classList.remove('toggle');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    body.classList.remove('menu-open');
                    menuBackdrop.classList.remove('active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('#section1, #section2, #section3').forEach(section => {
        observer.observe(section);
    });
});