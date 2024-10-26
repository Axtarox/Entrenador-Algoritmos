const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',       // Cambia esto si tienes una contraseña configurada
    database: 'algorithm_trainer'
});

module.exports = db;
