const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Rutas de registro e inicio de sesión
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
