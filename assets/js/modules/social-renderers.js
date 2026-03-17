import { projectsData } from '../data/projectsData.js';

export function renderProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = projectsData.map((project, index) => `
        <div class="project-card fade-in" style="animation-delay: ${index * 0.1}s;">
            <div class="project-image" style="background-image: url('${project.image}');">
                <span class="project-status ${project.statusClass}">${project.status}</span>
            </div>
            <div class="project-content">
                <div class="project-meta">
                    <span><i class="ph ph-map-pin"></i> ${project.location}</span>
                    <span><i class="ph ph-users"></i> ${project.beneficiaries}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <a href="${project.linkUrl}" class="btn btn-outline">${project.linkText} <i class="ph ph-arrow-right"></i></a>
            </div>
        </div>
    `).join('');
}

