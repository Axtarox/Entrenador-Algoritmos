import { getModulesByLevel } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const moduleGrid = document.getElementById('moduleGrid');
    const nivelEntrenamiento = window.location.pathname.split('/').pop();

    try {
        const modules = await getModulesByLevel(nivelEntrenamiento);
        const levelTitle = document.getElementById('levelTitle');
        const levelDescription = document.getElementById('levelDescription');

        levelTitle.textContent = nivelEntrenamiento === 'basic' ? 'Módulos de Nivel Básico' : 'Módulos de Nivel Intermedio';
        levelDescription.textContent = nivelEntrenamiento === 'basic'
            ? 'Selecciona un módulo para comenzar con los conceptos fundamentales.'
            : 'Selecciona un módulo para profundizar en temas más avanzados.';

        modules.forEach(module => {
            const moduleCard = document.createElement('div');
            moduleCard.classList.add('module-card');
            moduleCard.innerHTML = `
                <h4>${module.nombre}</h4>
                <p>Progreso: ${module.progreso || 0}%</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${module.progreso || 0}%"></div>
                </div>
            `;
            moduleCard.addEventListener('click', () => {
                window.location.href = `/modulo/${module.id}`;
            });
            moduleGrid.appendChild(moduleCard);
        });
    } catch (error) {
        console.error('Error al cargar los módulos:', error);
    }
      // Evento de logout
      document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    });
});
