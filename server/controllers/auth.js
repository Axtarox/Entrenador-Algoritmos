const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateToken } = require('../config/auth');

const authController = {
    async register(req, res) {
        const { nombre, correo, contrasena, institucionEducativa, nivelEstudios } = req.body;

        try {
            const existingUser = await User.findUserByEmail(correo);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const userId = await User.createUser({
                nombre,
                correo,
                contrasena: hashedPassword,
                tipo: 'estudiante',
                institucionEducativa,
                nivelEstudios
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente', userId });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    },

    async login(req, res) {
        const { correo, contrasena } = req.body;
    
        try {
            const user = await User.findUserByEmail(correo);
            console.log('Usuario encontrado:', user); // Verificar el usuario encontrado
            if (!user) {
                return res.status(401).json({ auth: false, message: 'Credenciales incorrectas' });
            }
    
            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
            console.log('Contraseña válida:', isPasswordValid); // Verificar si la contraseña es válida
            if (!isPasswordValid) {
                return res.status(401).json({ auth: false, message: 'Credenciales incorrectas' });
            }
    
            const token = generateToken(user.id, user.tipo);
            res.json({ auth: true, token, tipo: user.tipo });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    }
    
    
};

module.exports = authController;
