
function normalizeValue(value = '') {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function normalizeModality(value = '') {
    const normalized = normalizeValue(value);

    if (normalized === 'hibrido') return 'semipresencial';

    return normalized;
}

export function setupProgramsFilter() {
    const filterBtn = document.getElementById('btn-apply-filters');
    const searchInput = document.getElementById('course-search');
    const typeSelect = document.getElementById('type-filter');
    const modalitySelect = document.getElementById('modality-filter');

    if (!filterBtn) return;

    const applyFilters = () => {
        const programCards = document.querySelectorAll('.program-card');
        if (programCards.length === 0) return;

        const searchTerm = normalizeValue(searchInput ? searchInput.value : '');
        const typeValue = normalizeValue(typeSelect ? typeSelect.value : 'all');
        const modalityValue = normalizeModality(modalitySelect ? modalitySelect.value : 'all');

        programCards.forEach(card => {
            const cardType = normalizeValue(card.getAttribute('data-category') || '');
            const cardModality = normalizeModality(card.getAttribute('data-modality') || '');
            const cardTitle = normalizeValue(card.querySelector('.card-title')?.textContent || '');
            const cardText = normalizeValue(card.querySelector('.card-text')?.textContent || '');

            const matchesSearch =
                searchTerm === '' ||
                cardTitle.includes(searchTerm) ||
                cardText.includes(searchTerm);

            const matchesType = typeValue === 'all' || cardType === typeValue;
            const matchesModality = modalityValue === 'all' || cardModality === modalityValue;

            if (matchesSearch && matchesType && matchesModality) {
                card.style.display = 'flex';
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') applyFilters();
        });
    }

    filterBtn.addEventListener('click', applyFilters);
}
