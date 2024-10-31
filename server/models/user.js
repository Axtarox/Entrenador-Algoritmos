const db = require('../config/database');
const bcrypt = require('bcryptjs');



const User = {
    async createUser({ nombre, correo, contrasena, tipo = 'estudiante', institucionEducativa, nivelEstudios, nivelEntrenamiento = 1, porcentajeCompletado = 0.0 }) {
        try {
            const [result] = await db.execute(
                'INSERT INTO USUARIO (nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)',
                [nombre, correo, contrasena, tipo]
            );
            const usuarioId = result.insertId;

            if (tipo === 'estudiante') {
                await this.createEstudianteData(usuarioId, institucionEducativa, nivelEstudios, nivelEntrenamiento, porcentajeCompletado);
            }

            return usuarioId;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('Error al registrar el usuario');
        }
    },

    async createEstudianteData(usuarioId, institucionEducativa, nivelEstudios, nivelEntrenamiento, porcentajeCompletado) {
        try {
            await db.execute(
                'INSERT INTO ESTUDIANTE (usuario_id, institucion_educativa, nivel_estudios, nivel_entrenamiento, porcentaje_completado) VALUES (?, ?, ?, ?, ?)',
                [usuarioId, institucionEducativa, nivelEstudios, nivelEntrenamiento, porcentajeCompletado]
            );
        } catch (error) {
            console.error('Error al crear datos de estudiante:', error);
            throw new Error('Error al registrar datos de estudiante');
        }
    },

    async findUserByEmail(correo) {
        try {
            const [rows] = await db.execute('SELECT * FROM USUARIO WHERE correo = ?', [correo]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al buscar usuario por correo:', error);
            throw error; // Mantener este throw permite que el error se maneje más arriba
        }
    }
    
};

module.exports = User;
