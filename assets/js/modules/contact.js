
export function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const fullName = form.querySelector('#nombres')?.value?.trim() || '';
        const email = form.querySelector('#email')?.value?.trim() || '';
        const phone = form.querySelector('#telefono')?.value?.trim() || '';
        const interest = form.querySelector('#interes')?.value?.trim() || '';
        const message = form.querySelector('#mensaje')?.value?.trim() || '';

        const interestLabels = {
            curso_datos: 'Cursos',
            proyeccion_social: 'ProyecciÃ³n Social',
            propuestas: 'Propuestas',
            otros: 'Otras consultas'
        };

        const whatsappMessage = [
            'Hola, quiero realizar una consulta a CERSEU FCM.',
            '',
            `Nombre: ${fullName}`,
            `Correo: ${email}`,
            `TelÃ©fono: ${phone}`,
            `Ãrea de interÃ©s: ${interestLabels[interest] || interest}`,
            `Mensaje: ${message}`
        ].join('\n');

        const whatsappURL = `https://wa.me/51910430894?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    });
}

