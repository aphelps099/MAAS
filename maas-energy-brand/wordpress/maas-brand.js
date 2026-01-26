/**
 * MAAS Energy Works Brand JavaScript
 * WordPress Integration Scripts
 *
 * Add this to your WordPress theme or use a plugin like
 * "Simple Custom CSS and JS" to include these scripts.
 *
 * Usage:
 * 1. Copy this file to your theme's directory
 * 2. Enqueue in functions.php: wp_enqueue_script('maas-brand', get_template_directory_uri() . '/maas-brand.js', array(), '1.0', true);
 */

(function() {
    'use strict';

    /**
     * MAAS Brand Utilities
     * Global namespace for brand-related JavaScript functionality
     */
    window.MAASTBrand = {

        /**
         * Initialize all brand components
         */
        init: function() {
            this.initAnimations();
            this.initCounters();
            this.initNavScroll();
            this.initSmoothScroll();
        },

        /**
         * Scroll-triggered fade-up animations
         * Add class "maas-fade-up" to elements you want to animate
         */
        initAnimations: function() {
            const animatedElements = document.querySelectorAll('.maas-fade-up');

            if (animatedElements.length === 0) return;

            // Set initial state
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(el => observer.observe(el));
        },

        /**
         * Animated counters for statistics
         * Add data-counter="100" attribute to elements
         */
        initCounters: function() {
            const counterElements = document.querySelectorAll('[data-counter]');

            if (counterElements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            counterElements.forEach(el => observer.observe(el));
        },

        /**
         * Animate a single counter element
         * @param {HTMLElement} element - Element with data-counter attribute
         */
        animateCounter: function(element) {
            const target = parseInt(element.dataset.counter, 10);
            const duration = parseInt(element.dataset.duration, 10) || 2000;
            const prefix = element.dataset.prefix || '';
            const suffix = element.dataset.suffix || '';
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);

                element.textContent = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        },

        /**
         * Navigation scroll effect
         * Adds "scrolled" class to .maas-nav when page is scrolled
         */
        initNavScroll: function() {
            const nav = document.querySelector('.maas-nav');

            if (!nav) return;

            let ticking = false;

            function updateNav() {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            }

            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateNav);
                    ticking = true;
                }
            });

            // Check on load
            updateNav();
        },

        /**
         * Smooth scroll for anchor links
         */
        initSmoothScroll: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');

                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);

                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        },

        /**
         * Utility: Convert hex to rgba
         * @param {string} hex - Hex color code
         * @param {number} alpha - Alpha value (0-1)
         * @returns {string} RGBA color string
         */
        hexToRgba: function(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        },

        /**
         * Utility: Debounce function
         * @param {Function} func - Function to debounce
         * @param {number} wait - Wait time in ms
         * @returns {Function} Debounced function
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Utility: Check if element is in viewport
         * @param {HTMLElement} element - Element to check
         * @returns {boolean} True if element is visible
         */
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.MAASTBrand.init();
        });
    } else {
        window.MAASTBrand.init();
    }

})();

/**
 * WordPress-specific integrations
 * These functions work with common WordPress plugins and themes
 */

// Elementor integration - reinitialize after Elementor loads content
if (typeof elementorFrontend !== 'undefined') {
    jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
            window.MAASTBrand.initAnimations();
            window.MAASTBrand.initCounters();
        });
    });
}

// WPBakery/Visual Composer integration
if (typeof vc !== 'undefined') {
    jQuery(document).on('vc-full-width-row-single', function() {
        window.MAASTBrand.initAnimations();
        window.MAASTBrand.initCounters();
    });
}

// Gutenberg block editor - reinitialize after block updates
if (typeof wp !== 'undefined' && wp.domReady) {
    wp.domReady(function() {
        // For frontend display of Gutenberg blocks
        window.MAASTBrand.init();
    });
}