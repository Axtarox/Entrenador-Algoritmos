const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const moduleDetailsRoutes = require('./routes/moduleDetail'); // Nueva importación para detalles del módulo

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, '../client/public')));

// Rutas de autenticación (API) con respuesta en formato JSON
app.use('/api/auth', authRoutes);

// Rutas de módulos (API) para obtener módulos por nivel
app.use('/api/modules', moduleRoutes);

// Rutas de detalles de módulos específicos (API) para obtener teoría y ejercicios del módulo
app.use('/api/module', moduleDetailsRoutes);

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
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/dashboard.html'));
});
router.get('/ejercicio/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/exercise.html'));
});

// Ruta para la vista de módulos según el nivel
app.get('/modulos/:nivel', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/module.html'));
});

// Ruta para la vista del módulo específico, con teoría y ejercicios
app.get('/modulo/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/views/moduleDetail.html'));
});

// Manejo de rutas no encontradas (404) con mensaje de error en JSON
app.use((req, res) => {
    res.status(404).json({ error: 'Página no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
