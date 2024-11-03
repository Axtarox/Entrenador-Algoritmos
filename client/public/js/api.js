// Realiza la solicitud al servidor para iniciar sesión
export const loginUser = async (email, password) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contrasena: password })
        });
        

        if (!response.ok) {
            const errorData = await response.json(); // Solo aquí
            throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en loginUser:', error.message || error);
        throw new Error(error.message || 'Error de red al iniciar sesión');
    }
};



// Realiza la solicitud al servidor para registrar un usuario
export const registerUser = async (name, email, password, institucionEducativa, nivelEstudios) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: name,
                correo: email,
                contrasena: password,
                institucionEducativa, // Enviando institution
                nivelEstudios,        // Enviando level
                tipo: 'estudiante' // Tipo fijo para estudiante
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en registerUser:', error.message || error);
        throw new Error(error.message || 'Error de red al registrar usuario');
    }
};

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
export const getModuleDetails = async (moduleId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`/api/module/${moduleId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los detalles del módulo');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getModuleDetails:', error);
        throw error;
    }
};
