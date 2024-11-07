import { addModule, editModule, deleteModule, getModulesByLevel, getModuleById } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const moduleList = document.getElementById('moduleList');
    const moduleFormModal = document.getElementById('moduleFormModal');
    const moduleForm = document.getElementById('moduleForm');
    const addModuleBtn = document.getElementById('addModuleBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const nivelEntrenamiento = window.location.pathname.split('/').pop();
    let editingModuleId = null;

    // Función para cargar módulos según el nivel
    const loadModulesByLevel = async () => {
        try {
            const modules = await getModulesByLevel(nivelEntrenamiento);
            moduleList.innerHTML = ''; 

            const levelTitle = document.getElementById('levelTitle');
            const levelDescription = document.getElementById('levelDescription');
            levelTitle.textContent = nivelEntrenamiento === 'basic' ? 'Módulos de Nivel Básico' : 'Módulos de Nivel Intermedio';
            levelDescription.textContent = nivelEntrenamiento === 'basic' ? 'Selecciona un módulo para comenzar con los conceptos fundamentales.' : 'Selecciona un módulo para profundizar en temas más avanzados.';

            modules.forEach(module => {
                const moduleCard = document.createElement('div');
                moduleCard.classList.add('module-card');
                moduleCard.innerHTML = `
                    <h4>${module.nombre}</h4>
                    <button class="edit-btn" data-id="${module.id}">Editar</button>
                    <button class="delete-btn" data-id="${module.id}">Eliminar</button>
                `;
                moduleList.appendChild(moduleCard);

                moduleCard.querySelector('.edit-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    editingModuleId = module.id;
                    const moduleDetails = await getModuleById(editingModuleId);
                    document.getElementById('moduleId').value = moduleDetails.id;
                    document.getElementById('moduleName').value = moduleDetails.nombre;
                    document.getElementById('moduleLevel').value = moduleDetails.nivel;
                    document.getElementById('moduleTheory').value = moduleDetails.teoria;
                    document.getElementById('formTitle').textContent = 'Editar Módulo';
                    moduleFormModal.style.display = 'block';
                });

                moduleCard.querySelector('.delete-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await deleteModule(module.id);
                    await loadModulesByLevel();
                });
            });
        } catch (error) {
            console.error('Error al cargar los módulos:', error);
        }
    };

    addModuleBtn.addEventListener('click', () => {
        editingModuleId = null;
        moduleForm.reset();
        document.getElementById('formTitle').textContent = 'Agregar Módulo';
        moduleFormModal.style.display = 'block';
    });

    moduleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(moduleForm);
        const moduleData = Object.fromEntries(formData.entries());

        try {
            if (editingModuleId) {
                await editModule({ ...moduleData, id: editingModuleId });
            } else {
                await addModule(moduleData);
            }
            moduleFormModal.style.display = 'none';
            await loadModulesByLevel();
        } catch (error) {
            console.error('Error al guardar el módulo:', error);
        }
    });

    cancelBtn.addEventListener('click', () => {
        moduleFormModal.style.display = 'none';
    });

    await loadModulesByLevel();

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    });
});
