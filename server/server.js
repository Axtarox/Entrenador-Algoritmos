const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const moduleDetailsRoutes = require('./routes/moduleDetail');
const exercisesRoutes = require('./routes/exercises');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/module', moduleDetailsRoutes);
app.use('/api/exercises', exercisesRoutes);

const sendHtmlFile = (res, filePath) => {
    res.sendFile(path.join(__dirname, '../client/public/views', filePath));
};

app.get('/', (req, res) => sendHtmlFile(res, 'index.html'));
app.get('/login', (req, res) => sendHtmlFile(res, 'login.html'));
app.get('/register', (req, res) => sendHtmlFile(res, 'register.html'));
app.get('/dashboard', (req, res) => sendHtmlFile(res, 'dashboard.html'));
app.get('/profesor/dashboard', (req, res) => sendHtmlFile(res, 'dashboard_teacher.html'));
app.get('/ejercicio/:id', (req, res) => sendHtmlFile(res, 'exercise.html'));
app.get('/modulos/:nivel', (req, res) => sendHtmlFile(res, 'module.html'));
app.get('/modulo/:id', (req, res) => sendHtmlFile(res, 'moduleDetail.html'));
app.get('/profesor/modulos/:nivel', (req, res) => sendHtmlFile(res, 'modules_teacher.html'));


app.use((req, res) => {
    res.status(404).json({ error: 'Página no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
