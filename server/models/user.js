const db = require('../config/database');

const User = {
    // Crear un nuevo usuario
    async createUser({ nombre, correo, contrasena, tipo = 'estudiante' }) {
        try {
            const [result] = await db.execute(
                'INSERT INTO USUARIO (nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)',
                [nombre, correo, contrasena, tipo]
            );
            const usuarioId = result.insertId;

            // Si el usuario es de tipo 'estudiante', crear datos adicionales en la tabla ESTUDIANTE
            if (tipo === 'estudiante') {
                await this.createEstudianteData(usuarioId);
            }

            return usuarioId;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    },

    // Buscar usuario por correo electrónico
    async findUserByEmail(correo) {
        try {
            const [rows] = await db.execute('SELECT * FROM USUARIO WHERE correo = ?', [correo]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al buscar usuario por correo:', error);
            throw error;
        }
    },

    // Crear datos adicionales para el usuario tipo 'estudiante'
    async createEstudianteData(usuarioId, institucionEducativa = '', nivelEstudios = 'Básico', nivelEntrenamiento = 1, porcentajeCompletado = 0.0) {
        try {
            await db.execute(
                'INSERT INTO ESTUDIANTE (usuario_id, institucion_educativa, nivel_estudios, nivel_entrenamiento, porcentaje_completado) VALUES (?, ?, ?, ?, ?)',
                [usuarioId, institucionEducativa, nivelEstudios, nivelEntrenamiento, porcentajeCompletado]
            );
        } catch (error) {
            console.error('Error al crear datos de estudiante:', error);
            throw error;
        }
    },

    // Verificar la contraseña del usuario
    async verifyPassword(correo, contrasena) {
        try {
            const user = await this.findUserByEmail(correo);
            return user && user.contrasena === contrasena ? user : null;
        } catch (error) {
            console.error('Error al verificar contraseña:', error);
            throw error;
        }
    }
};

module.exports = User;
