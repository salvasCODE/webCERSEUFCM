
export function setupNavigation() {

    window.addEventListener('scroll', () => {

        const currentNavbar = document.getElementById('navbar');

        if (currentNavbar) {

            if (window.scrollY > 50) {
                currentNavbar.classList.add('scrolled');
            } else {
                currentNavbar.classList.remove('scrolled');
            }
        }
    });

    document.addEventListener('click', (e) => {

        const mobileMenuBtn = e.target.closest('#mobile-menu-btn');

        if (mobileMenuBtn) {

            const navLinks = document.querySelector('.nav-links');

            if (navLinks) {

                navLinks.classList.toggle('active');

                const isOpen = navLinks.classList.contains('active');

                mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                mobileMenuBtn.setAttribute(
                    'aria-label',
                    isOpen ? 'Cerrar menÃº de navegaciÃ³n' : 'Abrir menÃº de navegaciÃ³n'
                );

                const icon = mobileMenuBtn.querySelector('i');

                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');

                    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('expanded'));
                }
            }

            return;
        }

        const dropdownToggle = e.target.closest('.dropdown-toggle');

        if (dropdownToggle && window.innerWidth <= 1024) {

            e.preventDefault();

            const dropdownParent = dropdownToggle.closest('.nav-dropdown');

            if (dropdownParent) {

                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== dropdownParent) d.classList.remove('expanded');
                });

                dropdownParent.classList.toggle('expanded');

                const icon = dropdownToggle.querySelector('i');

                if (icon) {
                    if (dropdownParent.classList.contains('expanded')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            }
        }
    });
}

