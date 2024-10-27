export const loginUser = async (email, password) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contrasena: password })
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json(); // Intenta leer el cuerpo de la respuesta
            throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        // Verifica si la respuesta es en formato JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en loginUser:', error.message || error);
        throw new Error(error.message || 'Error de red al iniciar sesión');
    }
};

export const registerUser = async (name, email, password, tipo = 'estudiante') => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, correo: email, contrasena: password, tipo })
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json(); // Intenta leer el cuerpo de la respuesta
            throw new Error(errorData.message || 'Error al registrar usuario');
        }

        // Verifica si la respuesta es en formato JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en registerUser:', error.message || error);
        throw new Error(error.message || 'Error de red al registrar usuario');
    }
};
