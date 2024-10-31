const db = require('../config/database');

const Module = {
    async getModulesProgress(userId) {
        const [rows] = await db.query(
            `SELECT name, progress FROM MODULES 
            INNER JOIN USER_PROGRESS ON MODULES.id = USER_PROGRESS.module_id 
            WHERE USER_PROGRESS.user_id = ?`,
            [userId]
        );
        return rows;
    },
    // Otros métodos del modelo...
};

module.exports = Module;
