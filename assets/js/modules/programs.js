
import { programsData } from '../data/programsData.js';

function resolveCourseLink(fileName, id) {
    const path = window.location.pathname;
    let basePath;
    if (path.includes('/pages/')) {
        basePath = '';
    } else if (path.includes('/public/')) {
        basePath = 'pages/';
    } else {
        basePath = 'public/pages/';
    }
    return `${basePath}${fileName}?id=${id}`;
}

export function renderProgramsGrid(containerId, limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sortedPrograms = [...programsData].sort((a, b) => b.id - a.id);
    const programsToRender = limit ? sortedPrograms.slice(0, limit) : sortedPrograms;

    container.innerHTML = '';

    programsToRender.forEach(program => {
        const card = document.createElement('div');
        card.className = 'program-card fade-in-up';
        card.setAttribute('data-category', program.type);
        card.setAttribute('data-modality', program.modality);

        const categoryLabels = {
            reforzamiento: 'Reforzamiento',
            especializaciones: 'EspecializaciÃ³n',
            diplomados: 'Diplomatura',
            capacitacion: 'CapacitaciÃ³n',
            curso: 'Curso',
            taller: 'Taller'
        };

        const categoryLabel = categoryLabels[program.type] || 'Programa';

        let modalityIcon = 'ph-monitor-play';
        if (
            program.modalityLabel.toLowerCase() === 'hÃ­brido' ||
            program.modalityLabel.toLowerCase() === 'semipresencial'
        ) {
            modalityIcon = 'ph-buildings';
        }

        const detailsLink = resolveCourseLink(program.link, program.id);

        card.innerHTML = `
            <div class="card-image-wrapper">
                <div class="card-category">${categoryLabel}</div>
                <div class="card-image" style="background-image: url('${program.image}');"></div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${program.title}</h3>
                <p class="card-text">${program.description}</p>
                <div class="card-meta">
                    <span><i class="ph ph-calendar-blank"></i> ${program.duration}</span>
                    <span><i class="ph ${modalityIcon}"></i> ${program.modalityLabel}</span>
                </div>
            </div>
            <div class="card-footer">
                <span class="card-price">Inicio: ${program.startDate}</span>
                <a href="${detailsLink}" class="card-link">Ver detalles <i class="ph ph-arrow-right"></i></a>
            </div>
        `;

        container.appendChild(card);
    });
}

