export const loginUser = async (email, password) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo: email, contrasena: password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error en el inicio de sesión');
        }

        return data;
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw new Error(error.message || 'Error de red al iniciar sesión');
    }
};

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, correo: email, contrasena: password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar usuario');
        }

        return data;
    } catch (error) {
        console.error('Error en registerUser:', error);
        throw new Error(error.message || 'Error de red al registrar usuario');
    }
};
