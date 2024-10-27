const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta'; // Usa una variable de entorno

const authController = {
    async register(req, res) {
        const { nombre, correo, contrasena, institucionEducativa, nivelEstudios } = req.body;
    
        try {
            // Verificar si el usuario ya existe
            const existingUser = await User.findUserByEmail(correo);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
    
            // Cifrar la contraseña y registrar el usuario
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const userId = await User.createUser({
                nombre,
                correo,
                contrasena: hashedPassword,
                tipo: 'estudiante',
                institucionEducativa,
                nivelEstudios
            });
    
            // Registrar información adicional en la tabla ESTUDIANTE
            await User.createEstudianteData(userId, institucionEducativa, nivelEstudios);
    
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
        }
    },
    
    

    async login(req, res) {
        const { correo, contrasena } = req.body;

        try {
            // Buscar usuario por correo
            const user = await User.findUserByEmail(correo);
            if (!user) {
                return res.status(401).json({ auth: false, message: 'Credenciales incorrectas' });
            }

            // Verificar la contraseña encriptada
            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
            if (!isPasswordValid) {
                return res.status(401).json({ auth: false, message: 'Credenciales incorrectas' });
            }

            // Generar token JWT
            const token = jwt.sign({ id: user.id, tipo: user.tipo }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ auth: true, token, tipo: user.tipo });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    }
};

module.exports = authController;
