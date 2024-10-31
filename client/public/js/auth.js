import { loginUser, registerUser } from './api.js';

// Manejo del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        console.log('Email:', email);  // Verificar el email
        console.log('Password:', password);  // Verificar la contraseña

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
});


// Manejo del formulario de registro


document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evitar que el formulario se envíe de forma normal

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const institution = document.getElementById('institution').value.trim(); // Captura el valor de institution
    const level = document.getElementById('level').value.trim(); // Captura el valor de level

    try {
        // Llamar a la función de registro
        await registerUser(name, email, password, institution, level);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = '/login';  // Redirigir a la página de inicio de sesión
    } catch (error) {
        alert(`Error al registrar: ${error.message}`);
    }
});