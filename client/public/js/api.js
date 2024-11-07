export const getModulesByLevel = async (nivel) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/modules/${nivel}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los módulos');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getModulesByLevel:', error);
        throw error;
    }
};

export const getModuleById = async (moduleId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/module/${moduleId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el módulo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getModuleById:', error);
        throw error;
    }
};

export const addModule = async (moduleData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/modules', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(moduleData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar el módulo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en addModule:', error);
        throw error;
    }
};

export const editModule = async (moduleData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/modules/${moduleData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(moduleData)
        });

        if (!response.ok) {
            throw new Error('Error al editar el módulo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en editModule:', error);
        throw error;
    }
};

export const deleteModule = async (moduleId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/modules/${moduleId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el módulo');
        }
    } catch (error) {
        console.error('Error en deleteModule:', error);
        throw error;
    }
};
