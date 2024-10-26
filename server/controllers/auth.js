const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
    // Controlador para registrar un nuevo usuario
    async register(req, res) {
        const { nombre, correo, contrasena } = req.body;

        try {
            // Verificar si el usuario ya existe
            const existingUser = await User.findUserByEmail(correo);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            // Cifrar la contraseña antes de guardar en la base de datos
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Crear el usuario en la tabla USUARIO
            const userId = await User.createUser({ nombre, correo, contrasena: hashedPassword, tipo: 'estudiante' });

            // Agregar el usuario a la tabla ESTUDIANTE con datos por defecto
            await User.createEstudianteData(userId);

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error al registrar el usuario', error });
        }
    },

    // Controlador para iniciar sesión
    async login(req, res) {
        const { correo, contrasena } = req.body;

        try {
            const user = await User.findUserByEmail(correo);

            // Verificar si el usuario existe y si la contraseña es correcta
            if (user && await bcrypt.compare(contrasena, user.contrasena)) {
                // Crear el token JWT
                const token = jwt.sign(
                    { id: user.id, tipo: user.tipo },
                    'clave_secreta',  // Cambia esta clave en producción
                    { expiresIn: '1h' }
                );

                res.json({ auth: true, token, tipo: user.tipo });
            } else {
                res.status(401).json({ auth: false, message: 'Credenciales incorrectas' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    },

    // Controlador para verificar el token de autenticación
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({ auth: false, message: 'No se proporcionó un token' });

        try {
            const decoded = jwt.verify(token, 'clave_secreta');  // Cambia esta clave en producción
            req.userId = decoded.id;
            req.userTipo = decoded.tipo;
            next();
        } catch (error) {
            res.status(500).json({ auth: false, message: 'Token inválido' });
        }
    }
};

module.exports = authController;
