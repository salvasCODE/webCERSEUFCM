
import { impactData } from '../data/impactData.js';
import { testimonialsData } from '../data/testimonialsData.js';

export function renderImpactDashboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = impactData.map((item, index) => `
        <div class="impact-card fade-in-up" style="animation-delay: ${index * 0.1}s;">
            <i class="ph ${item.icon}"></i>
            <span class="impact-number">${item.number}</span>
            <span class="impact-label">${item.label}</span>
            <p class="impact-desc">${item.description}</p>
        </div>
    `).join('');
}

export function renderTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = testimonialsData.map((testimonial, index) => `
        <div class="testimonial-card fade-in-up" style="animation-delay: ${index * 0.1}s;">
            <div class="testimonial-content">
                <i class="ph-fill ph-quotes"></i>
                <p>${testimonial.quote}</p>
            </div>
            <div class="testimonial-author">
                <div class="author-avatar" style="background-image: url('${testimonial.image}');"></div>
                <div class="author-info">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        </div>
    `).join('');
}

