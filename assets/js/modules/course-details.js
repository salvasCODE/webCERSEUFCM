
import { programsData } from '../data/programsData.js';

export function renderCourseDetails() {

    const titleElement = document.getElementById('course-title');
    if (!titleElement) return;

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    const course = programsData.find(p => p.id === courseId);
    if (!course) {
        window.location.href = 'programs.html';
        return;
    }

    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = `${course.title} - CERSEU FCM | UNMSM`;

    document.getElementById('course-badge').textContent = course.badge || course.type;
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('course-subtitle').textContent = course.description;

    document.getElementById('course-start-date').textContent = course.startDate || 'Por definir';
    document.getElementById('course-duration').textContent = course.duration || 'Por definir';
    document.getElementById('course-modality').textContent = course.modalityLabel || 'Por definir';

    document.getElementById('course-price').textContent = course.price || 'Consultar';
    document.getElementById('course-price-note').textContent = course.priceNote || '';

    const benefitsList = document.getElementById('course-benefits-list');
    if (benefitsList && course.benefits) {
        benefitsList.innerHTML = course.benefits.map(benefit =>
            `<li><i class="ph ph-check-circle"></i> ${benefit}</li>`
        ).join('');
    }

    const overviewContainer = document.getElementById('course-overview');
    if (overviewContainer && course.overview) {
        overviewContainer.innerHTML = course.overview.map(p => `<p>${p}</p>`).join('');
    }

    const goalsList = document.getElementById('course-goals-list');
    if (goalsList && course.goals) {
        goalsList.innerHTML = course.goals.map(goal => `<li>${goal}</li>`).join('');
    }

    const curriculumContainer = document.getElementById('course-curriculum-container');
    if (curriculumContainer && course.curriculum) {
        curriculumContainer.innerHTML = course.curriculum.map((item, index) => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <div class="mod-title">
                        <span class="mod-number">${item.module}</span>
                        <h4>${item.title}</h4>
                    </div>
                    <i class="ph ph-caret-down accordion-icon"></i>
                </div>
                <div class="accordion-content">
                    <ul>
                        ${item.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        initAccordionEvents();
    }

    const instructorsGrid = document.getElementById('course-instructors-grid');
    if (instructorsGrid && course.instructors) {
        instructorsGrid.innerHTML = course.instructors.map(inst => `
            <div class="instructor-card">
                <div class="inst-avatar" style="background-image: url('${inst.image}');"></div>
                <div class="inst-info">
                    <h4>${inst.name}</h4>
                    <p class="inst-role">${inst.role}</p>
                    <p class="inst-desc">${inst.description}</p>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('course-audience').textContent = course.audience || '';
    const requirementsList = document.getElementById('course-requirements-list');
    if (requirementsList && course.requirements) {
        requirementsList.innerHTML = course.requirements.map(req => `<li>${req}</li>`).join('');
    }
}

function initAccordionEvents() {
    const accHeaders = document.querySelectorAll('.accordion-header');

    accHeaders.forEach(header => {
        header.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

