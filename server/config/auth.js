// config/auth.js
const jwt = require('jsonwebtoken');

// Función para generar un token JWT
const generateToken = (userId, userType) => {
    return jwt.sign({ id: userId, tipo: userType }, 'clave_secreta', { expiresIn: '1h' });
};

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token requerido');

    jwt.verify(token, 'clave_secreta', (err, decoded) => {
        if (err) return res.status(401).send('Token no válido');
        req.userId = decoded.id;
        req.userType = decoded.tipo;
        next();
    });
};

module.exports = { generateToken, verifyToken };
