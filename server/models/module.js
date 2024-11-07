const db = require('../config/database');

// Función para agregar un módulo
const addModule = async ({ nombre, nivel, teoria }) => {
    const [result] = await db.execute(
        'INSERT INTO MODULO (nombre, nivel, teoria) VALUES (?, ?, ?)',
        [nombre, nivel, teoria]
    );
    return result.insertId; // Retorna el ID del módulo insertado automáticamente
};

// Función para obtener un módulo por su ID
const getModuleById = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM MODULO WHERE id = ?',
        [id]
    );
    return rows[0] || null; // Retorna el módulo si existe, de lo contrario null
};

// Función para editar un módulo
const editModule = async (id, { nombre, nivel, teoria }) => {
    await db.execute(
        'UPDATE MODULO SET nombre = ?, nivel = ?, teoria = ? WHERE id = ?',
        [nombre, nivel, teoria, id]
    );
};

// Función para eliminar un módulo
const deleteModule = async (id) => {
    await db.execute('DELETE FROM MODULO WHERE id = ?', [id]);
};

// Exportar todas las funciones del modelo
module.exports = { addModule, getModuleById, editModule, deleteModule };
