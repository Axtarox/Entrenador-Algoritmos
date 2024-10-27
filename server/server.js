const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Analiza solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Analiza solicitudes URL-encoded

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, '../client/public')));

// Rutas de autenticación (API) con respuesta en formato JSON
app.use('/api/auth', authRoutes);

// Rutas para vistas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/index.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/login.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/register.html'));
});

// Manejo de rutas no encontradas (404) con mensaje de error en JSON
app.use((req, res) => {
    res.status(404).json({ error: 'Página no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
