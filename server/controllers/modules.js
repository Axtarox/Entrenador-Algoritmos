const db = require('../config/database'); // Conexión a la base de datos

const getModulesByLevel = async (req, res) => {
    let { nivel } = req.params;
    const levelMap = { basic: 1, intermediate: 2 };

    // Convertir nivel en el valor correspondiente
    nivel = levelMap[nivel] || null;

    if (!nivel) {
        return res.status(400).json({ message: 'Nivel no válido' });
    }

    try {
        const [modules] = await db.execute(
            'SELECT id, nombre, teoria FROM MODULO WHERE nivel = ?',
            [nivel]
        );
        res.json(modules);
    } catch (error) {
        console.error('Error al obtener los módulos:', error);
        res.status(500).json({ message: 'Error al obtener los módulos' });
    }
};

module.exports = { getModulesByLevel };
