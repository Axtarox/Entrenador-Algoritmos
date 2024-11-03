const db = require('../config/database');

const Module = {
    async getModulesProgress(userId) {
        const [rows] = await db.query(
            `SELECT M.nombre AS name, E.porcentaje_completado AS progress
            FROM MODULO M
            JOIN ESTUDIANTE E ON E.nivel_entrenamiento = M.nivel
            WHERE E.usuario_id = ?`,
            [userId]
        );
        return rows;
    },
    // Otros métodos del modelo...
};

module.exports = Module;
