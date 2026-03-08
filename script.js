/**
 * High-Density Editorial Scripts
 * Focuses on lightweight IntersectionObserver to trigger CSS transitions
 */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Reveal Animations on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the viewport bottom
    };

    // Fallback if IntersectionObserver isn't supported or if user prefers reduced motion
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Unobserve after revealing to perform once
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    if (mobileToggle && mobileNav) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.hidden = true;

        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = mobileToggle.classList.toggle('active');
            mobileNav.hidden = !isActive;
            mobileNav.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', String(isActive));
            mobileNav.setAttribute('aria-hidden', String(!isActive));
        });

        // Close when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
                mobileNav.hidden = true;
            });
        });
    }

    // --- 3. Smooth Scroll offset for fixed header ---
    const getHeaderOffset = () => {
        let offset = 0;
        const rootStyles = window.getComputedStyle(document.documentElement);
        const headerVar = rootStyles.getPropertyValue('--header-h').trim();
        if (headerVar) {
            const parsed = parseFloat(headerVar);
            if (!Number.isNaN(parsed)) {
                offset = parsed;
            }
        }
        if (!offset) {
            const headerEl = document.querySelector('.site-header');
            if (headerEl) {
                offset = headerEl.getBoundingClientRect().height;
            }
        }
        return offset;
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = getHeaderOffset();
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
