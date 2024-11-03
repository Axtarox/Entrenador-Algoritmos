import { getModuleDetails } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const moduleId = window.location.pathname.split('/').pop();
    const moduleName = document.getElementById('moduleName');
    const theoryText = document.getElementById('theoryText');
    const exerciseGrid = document.getElementById('exerciseGrid');

    try {
        const moduleDetails = await getModuleDetails(moduleId);
        moduleName.textContent = moduleDetails.name;
        theoryText.textContent = moduleDetails.theory;

        moduleDetails.exercises.forEach(exercise => {
            const exerciseCard = document.createElement('div');
            exerciseCard.classList.add('exercise-card');
            exerciseCard.innerHTML = `<h4>Ejercicio ${exercise.exerciseId}</h4>`;

            // Agregar evento de clic para redirigir a la vista del ejercicio
            exerciseCard.addEventListener('click', () => {
                window.location.href = `/ejercicio/${exercise.exerciseId}`;
            });

            exerciseGrid.appendChild(exerciseCard);
        });
    } catch (error) {
        console.error('Error al cargar los detalles del módulo:', error);
    }

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
});
