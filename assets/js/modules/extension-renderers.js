
import { calendarData } from '../data/calendarData.js';
import { faqData } from '../data/faqData.js';

export function renderCalendar(containerId) {
    const tbody = document.getElementById(containerId);
    if (!tbody) return;

    tbody.innerHTML = calendarData.map(item => `
        <tr class="board-row">
            <td class="col-desc"><strong>${item.program}</strong></td>
            <td class="col-date ${item.closingSoon ? 'text-danger' : ''}">${item.closingDate}</td>
            <td class="col-date">${item.startDate}</td>
            <td>${item.modality}</td>
        </tr>
    `).join('');
}

export function renderFAQ(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = faqData.map(item => `
        <div class="accordion-item">
            <div class="accordion-header">
                <h4>${item.question}</h4>
                <i class="ph ph-caret-down accordion-icon"></i>
            </div>
            <div class="accordion-content">
                <div class="faq-answer-wrapper" style="padding: var(--sp-4);">
                    <p style="color: var(--color-text-muted); line-height: 1.6;">${item.answer}</p>
                </div>
            </div>
        </div>
    `).join('');

    initAccordionEvents();

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

