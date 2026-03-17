
export async function loadComponents() {
    try {


        let bp = "";
        if (window.location.pathname.includes("/pages/")) {
            bp = "../";
        } else if (!window.location.pathname.includes("/public/")) {
            bp = "public/";
        }
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            const headerResponse = await fetch(bp + 'components/header.html');
            if (headerResponse.ok) {
                headerContainer.innerHTML = await headerResponse.text();
                if (bp) {
                    headerContainer.querySelectorAll('a[href]').forEach(link => {
                        const href = link.getAttribute('href');
                        if (
                            href &&
                            !href.startsWith('http') &&
                            !href.startsWith('#') &&
                            !href.startsWith('mailto:') &&
                            !href.startsWith('/')
                        ) {
                            if (bp === 'public/' && href === 'index.html') return;
                            link.setAttribute('href', bp + href);
                        }
                    });

                    headerContainer.querySelectorAll('img[src]').forEach(img => {
                        const src = img.getAttribute('src');
                        if (
                            src &&
                            !src.startsWith('http') &&
                            !src.startsWith('data:') &&
                            !src.startsWith('/')
                        ) {
                            img.setAttribute('src', bp + src);
                        }
                    });
                }
            }
        }

        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            const footerResponse = await fetch(bp + 'components/footer.html');
            if (footerResponse.ok) {
                footerContainer.innerHTML = await footerResponse.text();
                if (bp) {
                    footerContainer.querySelectorAll('a[href]').forEach(link => {
                        const href = link.getAttribute('href');
                        if (
                            href &&
                            !href.startsWith('http') &&
                            !href.startsWith('#') &&
                            !href.startsWith('mailto:') &&
                            !href.startsWith('/')
                        ) {
                            link.setAttribute('href', bp + href);
                        }
                    });

                    footerContainer.querySelectorAll('img[src]').forEach(img => {
                        const src = img.getAttribute('src');
                        if (
                            src &&
                            !src.startsWith('http') &&
                            !src.startsWith('data:') &&
                            !src.startsWith('/')
                        ) {
                            img.setAttribute('src', bp + src);
                        }
                    });
                }
            }
        }

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

