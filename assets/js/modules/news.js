
import { newsData } from '../data/newsData.js';

function resolveNewsLink(news) {
    if (news.link && news.link !== '#') return news.link;

    const anchor = `#noticia-${news.id}`;
    const currentPath = window.location.pathname;

    if (currentPath.endsWith('/news.html') || currentPath.endsWith('\\news.html')) {
        return anchor;
    }

    if (currentPath.includes('/pages/')) {
        return `news.html${anchor}`;
    }

    if (currentPath.includes('/public/')) {
        return `pages/news.html${anchor}`;
    }

    return `public/pages/news.html${anchor}`;
}

export function renderHomeCarousel() {
    const wrapper = document.getElementById('home-news-wrapper');
    if (!wrapper) return;

    const sortedNews = [...newsData].sort((a, b) => b.id - a.id);
    const carouselNews = sortedNews.slice(0, 4);

    wrapper.innerHTML = '';

    carouselNews.forEach(news => {
        const newsLink = resolveNewsLink(news);

        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        slide.innerHTML = `
            <div class="highlight-card">
                <div class="highlight-image"
                    style="background-image: url('${news.image}');">
                </div>
                <div class="highlight-content">
                    <span class="highlight-tag">${news.badge}</span>
                    <h3 class="highlight-title">${news.title}</h3>
                    <p class="highlight-desc">${news.excerpt}</p>
                    <a href="${newsLink}" class="btn btn-outline" style="margin-top: auto;">Leer más <i
                            class="ph ph-arrow-right"></i></a>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });
}

export function renderNewsGrid() {
    const featuredContainer = document.getElementById('news-featured-grid');
    const standardContainer = document.getElementById('news-standard-grid');

    if (!featuredContainer || !standardContainer) return;

    const sortedNews = [...newsData].sort(
        (a, b) => new Date(b.dateISO) - new Date(a.dateISO)
    );

    const featuredNews = sortedNews.slice(0, 3);
    const standardNews = sortedNews.slice(3);

    if (featuredNews.length > 0) {
        featuredContainer.innerHTML = '';

        const mainArticle = featuredNews[0];
        const mainArticleLink = resolveNewsLink(mainArticle);
        const sideArticles = featuredNews.slice(1, 3);

        const mainEl = document.createElement('article');
        mainEl.id = `noticia-${mainArticle.id}`;
        mainEl.className = 'news-card featured-news';
        const mainBadgeClass = mainArticle.badgeColor ? ` ${mainArticle.badgeColor}` : '';

        mainEl.innerHTML = `
            <div class="news-img-wrapper">
                <div class="news-badge${mainBadgeClass}">${mainArticle.badge}</div>
                <img src="${mainArticle.image}" alt="${mainArticle.title}" class="news-img">
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span><i class="ph ph-calendar-blank"></i> ${mainArticle.date}</span>
                    ${mainArticle.readTime ? `<span><i class="ph ph-clock"></i> ${mainArticle.readTime}</span>` : ''}
                </div>
                <h2 class="news-title-large"><a href="${mainArticleLink}">${mainArticle.title}</a></h2>
                <p class="news-excerpt">${mainArticle.excerpt}</p>
                <a href="${mainArticleLink}" class="news-link-btn">Leer nota completa <i class="ph ph-arrow-right"></i></a>
            </div>
        `;
        featuredContainer.appendChild(mainEl);

        if (sideArticles.length > 0) {
            const sideColumn = document.createElement('div');
            sideColumn.className = 'news-side-column';

            sideArticles.forEach(article => {
                const articleLink = resolveNewsLink(article);

                const sideEl = document.createElement('article');
                sideEl.id = `noticia-${article.id}`;
                sideEl.className = 'news-card compact';
                const badgeClass = article.badgeColor ? ` ${article.badgeColor}` : '';

                sideEl.innerHTML = `
                    <div class="news-img-wrapper">
                        <div class="news-badge${badgeClass}">${article.badge}</div>
                        <img src="${article.image}" alt="Imagen noticia" class="news-img">
                    </div>
                    <div class="news-content">
                        <div class="news-meta">
                            <span><i class="ph ph-calendar-blank"></i> ${article.date}</span>
                        </div>
                        <h3 class="news-title"><a href="${articleLink}">${article.title}</a></h3>
                    </div>
                `;
                sideColumn.appendChild(sideEl);
            });

            featuredContainer.appendChild(sideColumn);
        }
    }

    renderStandardCards(standardNews, standardContainer);
}

function renderStandardCards(newsArray, container) {
    container.innerHTML = '';

    if (newsArray.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No hay más noticias disponibles.</p>';
        return;
    }

    newsArray.forEach(news => {
        const newsLink = resolveNewsLink(news);

        const article = document.createElement('article');
        article.id = `noticia-${news.id}`;
        article.className = 'news-card fade-in-up';
        const badgeClass = news.badgeColor ? ` ${news.badgeColor}` : '';

        article.innerHTML = `
            <div class="news-img-wrapper">
                <div class="news-badge${badgeClass}">${news.badge}</div>
                <img src="${news.image}" alt="Imagen noticia" class="news-img">
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span><i class="ph ph-calendar-blank"></i> ${news.date}</span>
                </div>
                <h3 class="news-title"><a href="${newsLink}">${news.title}</a></h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="${newsLink}" class="news-link-btn">Leer nota completa <i class="ph ph-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(article);
    });
}

