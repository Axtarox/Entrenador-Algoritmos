const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para parsear solicitudes JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, '../client/public')));

// Rutas de autenticación (API)
app.use('/api/auth', authRoutes);

// Rutas para servir vistas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/views/index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/views/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/views/register.html'));
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
