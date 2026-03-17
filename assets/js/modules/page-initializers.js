
import { setupCarousel } from './carousel.js';
import { setupProgramsFilter } from './programs-filter.js';

import { renderHomeCarousel, renderNewsGrid } from './news.js';
import { renderProgramsGrid } from './programs.js';
import { renderCourseDetails } from './course-details.js';
import { renderNormativeList } from './normative.js';
import { renderImpactDashboard, renderTestimonials } from './home-renderers.js';
import { renderTeam } from './about-renderers.js';
import { renderCalendar, renderFAQ } from './extension-renderers.js';
import { renderProjects } from './social-renderers.js';
import { setupContactForm } from './contact.js';

const pageInitializers = {
    home() {
        renderHomeCarousel();
        renderProgramsGrid('programs-home-container', 3);
        setupProgramsFilter();
        renderImpactDashboard('impact-container');
        renderTestimonials('testimonials-container');
        setupCarousel();
    },

    programs() {
        renderProgramsGrid('programs-all-container');
        setupProgramsFilter();
    },

    'course-details'() {
        renderCourseDetails();
    },

    'about-us'() {
        renderTeam('team-container');
        renderNormativeList('recent-normative-container', {
            grouped: false,
            limit: 4
        });
    },

    extension() {
        renderCalendar('calendar-container');
        renderFAQ('faq-container');
    },

    news() {
        renderNewsGrid();
    },

    normative() {
        renderNormativeList('normative-all-container', {
            grouped: true
        });
    },

    social() {
        renderProjects('projects-container');
    },

    contact() {
        setupContactForm();
    }
};

export function initializeCurrentPage() {
    const page = document.body.dataset.page;

    if (!page) {
        console.warn('La pÃ¡gina no tiene atributo data-page en <body>.');
        return;
    }

    const init = pageInitializers[page];

    if (!init) {
        console.warn(`No existe inicializador para la pÃ¡gina: ${page}`);
        return;
    }

    init();
}

