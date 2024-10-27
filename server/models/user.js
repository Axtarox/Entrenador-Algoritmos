const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
    // Crear un nuevo usuario
    async createUser({ nombre, correo, contrasena, tipo = 'estudiante', institucionEducativa = '', nivelEstudios = 'Básico', nivelEntrenamiento = 1, porcentajeCompletado = 0.0 }) {
        try {
            const [result] = await db.execute(
                'INSERT INTO USUARIO (nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)',
                [nombre, correo, contrasena, tipo]
            );
            const usuarioId = result.insertId;

            // Crear datos adicionales en la tabla correspondiente según el tipo de usuario
            if (tipo === 'estudiante') {
                await this.createEstudianteData(usuarioId, institucionEducativa, nivelEstudios, nivelEntrenamiento, porcentajeCompletado);
            } else if (tipo === 'profesor') {
                await this.createProfesorData(usuarioId, institucionEducativa, nivelEstudios);
            } else if (tipo === 'administrador') {
                await this.createAdministradorData(usuarioId);
            }

            return usuarioId;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw new Error('Error al registrar el usuario');
        }
    },

    // Crear datos adicionales para el usuario tipo 'estudiante'
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

    // Crear datos adicionales para el usuario tipo 'profesor'
    async createProfesorData(usuarioId, institucionEducativa, nivelEstudios) {
        try {
            await db.execute(
                'INSERT INTO PROFESOR (usuario_id, institucion_educativa, nivel_estudios) VALUES (?, ?, ?)',
                [usuarioId, institucionEducativa, nivelEstudios]
            );
        } catch (error) {
            console.error('Error al crear datos de profesor:', error);
            throw new Error('Error al registrar datos de profesor');
        }
    },

    // Crear datos adicionales para el usuario tipo 'administrador'
    async createAdministradorData(usuarioId) {
        try {
            await db.execute(
                'INSERT INTO ADMINISTRADOR (usuario_id) VALUES (?)',
                [usuarioId]
            );
        } catch (error) {
            console.error('Error al crear datos de administrador:', error);
            throw new Error('Error al registrar datos de administrador');
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

    // Verificar la contraseña del usuario encriptada
    async verifyPassword(correo, contrasena) {
        try {
            const user = await this.findUserByEmail(correo);
            if (!user) return null;

            // Comparar la contraseña encriptada
            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
            return isPasswordValid ? user : null;
        } catch (error) {
            console.error('Error al verificar contraseña:', error);
            throw error;
        }
    }
};

module.exports = User;
