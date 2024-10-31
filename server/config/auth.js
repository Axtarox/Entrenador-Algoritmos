const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta'; // Usa variable de entorno para la clave secreta

// Función para generar un token JWT
const generateToken = (userId, userType) => {
    return jwt.sign({ id: userId, tipo: userType }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del encabezado "Bearer token"

    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err.message);
            return res.status(401).json({ message: 'Token no válido' });
        }
        req.userId = decoded.id;
        req.userType = decoded.tipo;
        next();
    });
    
};

module.exports = { generateToken, verifyToken };


