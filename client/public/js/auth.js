import { loginUser, registerUser } from './api.js';

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const data = await loginUser(email, password);
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        } else {
            throw new Error('No se recibió un token de autenticación.');
        }
    } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
    }
});

// Manejo del formulario de registro
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        await registerUser(name, email, password);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = '/login';
    } catch (error) {
        alert(`Error en el registro: ${error.message}`);
    }
});
