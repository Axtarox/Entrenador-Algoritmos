import { getModulesProgress } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const moduleGrid = document.getElementById('moduleGrid');

    try {
        const modules = await getModulesProgress();
        modules.forEach(module => {
            const moduleCard = document.createElement('div');
            moduleCard.classList.add('module-card');
            moduleCard.innerHTML = `
                <h4>${module.name}</h4>
                <p>Progreso: ${module.progress}%</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${module.progress}%"></div>
                </div>
            `;
            moduleGrid.appendChild(moduleCard);
        });
    } catch (error) {
        console.error('Error al cargar los módulos:', error);
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');  // Eliminar el token de sesión
        window.location.href = '/login';   // Redirigir al login
    });
});
