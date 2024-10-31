const Module = require('../models/module');

const modulesController = {
    async getModulesProgress(req, res) {
        try {
            const modulesProgress = await Module.getModulesProgress(req.user.id); // Asumiendo que tienes el id del usuario autenticado
            res.json(modulesProgress);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el progreso de los módulos' });
        }
    },
    // Otros métodos del controlador...
};

module.exports = modulesController;
