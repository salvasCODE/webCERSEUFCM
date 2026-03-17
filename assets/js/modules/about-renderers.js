
import { teamData } from '../data/teamData.js';

export function renderTeam(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = teamData.map(member => `
        <div class="ceo-profile-card">
            <div class="ceo-image" style="background-image: url('${member.image}');"></div>
            <div class="ceo-content">
                <div class="ceo-header">
                    <h3 class="ceo-name">${member.name}</h3>
                    <span class="ceo-title">${member.title}</span>
                </div>
                <div class="ceo-bio">
                    ${member.bio.map(p => `<p>${p}</p>`).join('')}
                </div>
                <div class="ceo-quote">
                    <i class="ph ph-quotes highlight-quote"></i>
                    <blockquote>"${member.quote}"</blockquote>
                </div>
                <div class="ceo-credentials">
                    ${member.credentials.map(cred => `
                        <span class="credential"><i class="ph ${cred.icon}"></i> ${cred.text}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

