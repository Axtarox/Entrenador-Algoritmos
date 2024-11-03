const db = require('../config/database');

const ModuleDetail = {
    async getModuleDetailById(moduleId) {
        try {
            // Consulta para obtener el nombre y la teoría del módulo
            const [moduleDetail] = await db.query(
                `SELECT nombre AS name, teoria AS theory 
                 FROM MODULO 
                 WHERE id = ?`, [moduleId]
            );

            if (moduleDetail.length === 0) {
                return null;
            }

            // Consulta para obtener los ejercicios asociados al módulo
            const [exercises] = await db.query(
                `SELECT id AS exerciseId, enunciado AS statement 
                 FROM EJERCICIO 
                 WHERE modulo_id = ?`, [moduleId]
            );

            return {
                name: moduleDetail[0].name,
                theory: moduleDetail[0].theory,
                exercises: exercises
            };
        } catch (error) {
            console.error("Error al obtener detalles del módulo:", error);
            throw new Error("Error al obtener los detalles del módulo");
        }
    }
};

module.exports = ModuleDetail;
