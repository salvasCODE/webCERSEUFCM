
export function setupAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => animateOnScrollObserver.observe(el));

    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in, .hero .fade-in-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

