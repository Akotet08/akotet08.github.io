/** Accessible navigation for the portfolio's mobile layout. */
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
    const setMenuOpen = (open) => {
        mobileToggle.classList.toggle('active', open);
        mobileToggle.setAttribute('aria-expanded', String(open));
        mobileNav.hidden = !open;
        mobileNav.setAttribute('aria-hidden', String(!open));
    };

    mobileToggle.addEventListener('click', () => {
        setMenuOpen(mobileToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setMenuOpen(false);
            const href = link.getAttribute('href');
            const target = href.startsWith('#') ? document.querySelector(href) : null;
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !mobileNav.hidden) {
            setMenuOpen(false);
            mobileToggle.focus();
        }
    });

    window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
        if (event.matches) setMenuOpen(false);
    });
}
