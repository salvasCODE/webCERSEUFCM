import { setupNavigation } from './modules/navigation.js';
import { loadComponents } from './modules/components-loader.js';
import { setupAnimations } from './modules/animations.js';
import { initializeCurrentPage } from './modules/page-initializers.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    await loadComponents();

    
    setupNavigation();

    
    initializeCurrentPage();

    
    setupAnimations();
});
