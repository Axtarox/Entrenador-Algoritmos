// auth.js en `routes`
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
    authController.register(req, res)
        .catch(error => {
            console.error('Error en el registro:', error);
            res.status(500).json({ message: 'Error en el registro de usuario', error: error.message });
        });
});

// Ruta para iniciar sesión de usuario
router.post('/login', (req, res) => {
    authController.login(req, res)
        .catch(error => {
            console.error('Error en el inicio de sesión:', error);
            res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
        });
});

module.exports = router;