
import { normativeData } from '../data/normativeData.js';

function getCategoryIcon(categoryKey) {
    if (categoryKey === 'reglamentos') return 'ph-scales';
    if (categoryKey === 'directivas') return 'ph-stamp';
    if (categoryKey === 'memorias') return 'ph-chart-bar';
    return 'ph-file-pdf';
}

function hasPublicLink(link) {
    return Boolean(link && link !== '#');
}

function renderDocumentItem(doc, showDate = false) {
    const metaDate = showDate ? ` | Publicado: ${doc.date}` : '';

    if (hasPublicLink(doc.link)) {
        return `
            <li>
                <a href="${doc.link}" class="document-link" target="_blank" rel="noopener noreferrer">
                    <div class="doc-info">
                        <i class="ph ${doc.icon} ${doc.iconClass}"></i>
                        <div>
                            <span class="doc-title">${doc.title}</span>
                            <span class="doc-meta">${doc.meta} | ${doc.size}${metaDate}</span>
                        </div>
                    </div>
                    <i class="ph ph-download-simple download-icon"></i>
                </a>
            </li>
        `;
    }

    return `
        <li>
            <div class="document-link document-link-disabled" aria-disabled="true">
                <div class="doc-info">
                    <i class="ph ${doc.icon} ${doc.iconClass}"></i>
                    <div>
                        <span class="doc-title">${doc.title}</span>
                        <span class="doc-meta">${doc.meta} | ${doc.size}${metaDate}</span>
                    </div>
                </div>
                <span class="download-icon">Próximamente</span>
            </div>
        </li>
    `;
}

function renderGroupedDocuments(docs, container) {
    const groupedDocs = docs.reduce((acc, doc) => {
        if (!acc[doc.category]) {
            acc[doc.category] = {
                label: doc.categoryLabel,
                items: []
            };
        }

        acc[doc.category].items.push(doc);
        return acc;
    }, {});

    container.innerHTML = '';

    for (const categoryKey in groupedDocs) {
        const group = groupedDocs[categoryKey];

        const categoryHTML = `
            <div class="document-category">
                <div class="doc-category-header">
                    <i class="ph ${getCategoryIcon(categoryKey)}"></i>
                    <h3>${group.label}</h3>
                </div>
                <ul class="document-list">
                    ${group.items.map(doc => renderDocumentItem(doc)).join('')}
                </ul>
            </div>
        `;

        container.innerHTML += categoryHTML;
    }
}

function renderFlatDocuments(docs, container) {
    container.innerHTML = `
        <div class="document-category">
            <ul class="document-list">
                ${docs.map(doc => renderDocumentItem(doc, true)).join('')}
            </ul>
        </div>
    `;
}

function bindNormativeSearch(container) {
    const searchInput = document.querySelector('.doc-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', event => {
        const query = event.target.value.toLowerCase();

        const filteredDocs = normativeData.filter(doc =>
            doc.title.toLowerCase().includes(query) ||
            doc.meta.toLowerCase().includes(query) ||
            doc.categoryLabel.toLowerCase().includes(query)
        );

        if (filteredDocs.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>No se encontraron documentos.</p>
                </div>
            `;
            return;
        }

        renderGroupedDocuments(filteredDocs, container);
    });
}

export function renderNormativeList(containerId, options = { grouped: true, limit: null }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sortedDocs = [...normativeData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const docsToRender = options.limit ? sortedDocs.slice(0, options.limit) : sortedDocs;

    if (options.grouped) {
        renderGroupedDocuments(docsToRender, container);
    } else {
        renderFlatDocuments(docsToRender, container);
    }

    bindNormativeSearch(container);
}

