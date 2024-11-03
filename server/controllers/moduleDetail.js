const ModuleDetail = require('../models/moduleDetail');

const getModuleDetailById = async (req, res) => {
    const { id } = req.params;

    try {
        const moduleDetail = await ModuleDetail.getModuleDetailById(id);

        if (!moduleDetail) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }

        res.json(moduleDetail);
    } catch (error) {
        console.error('Error al obtener los detalles del módulo:', error);
        res.status(500).json({ message: 'Error al obtener los detalles del módulo' });
    }
};

module.exports = { getModuleDetailById };
