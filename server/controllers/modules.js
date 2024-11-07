const db = require('../config/database');
const Module = require('../models/module');

const getModulesByLevel = async (req, res) => {
    const { nivel } = req.params;
    const levelMap = { basic: 1, intermediate: 2 };
    const mappedLevel = levelMap[nivel];

    if (!mappedLevel) {
        return res.status(400).json({ message: 'Nivel no válido. Los niveles válidos son "basic" o "intermediate".' });
    }

    try {
        const [modules] = await db.execute(
            'SELECT id, nombre, teoria FROM MODULO WHERE nivel = ?',
            [mappedLevel]
        );
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error al obtener los módulos:', error);
        res.status(500).json({ message: 'Error al obtener los módulos' });
    }
};

const addModule = async (req, res) => {
    const { nombre, nivel, teoria } = req.body;

    // Validación de parámetros
    if (!nombre || !nivel || !teoria) {
        return res.status(400).json({ message: 'Todos los campos (nombre, nivel, teoria) son obligatorios' });
    }

    try {
        const moduleId = await Module.addModule({ nombre, nivel, teoria });
        res.status(201).json({ message: 'Módulo agregado exitosamente', id: moduleId });
    } catch (error) {
        console.error('Error al agregar módulo:', error);
        res.status(500).json({ message: 'Error al agregar módulo' });
    }
};

const editModule = async (req, res) => {
    const { id } = req.params;
    const { nombre, nivel, teoria } = req.body;

    // Validación de parámetros
    if (!id || !nombre || !nivel || !teoria) {
        return res.status(400).json({ message: 'Todos los campos (id, nombre, nivel, teoria) son obligatorios' });
    }

    try {
        const moduleExists = await Module.getModuleById(id);
        if (!moduleExists) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }

        await Module.editModule(id, { nombre, nivel, teoria });
        res.status(200).json({ message: 'Módulo actualizado correctamente' });
    } catch (error) {
        console.error('Error al editar módulo:', error);
        res.status(500).json({ message: 'Error al editar módulo' });
    }
};

const deleteModule = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID del módulo es obligatorio' });
    }

    try {
        const moduleExists = await Module.getModuleById(id);
        if (!moduleExists) {
            return res.status(404).json({ message: 'Módulo no encontrado' });
        }

        await Module.deleteModule(id);
        res.status(200).json({ message: 'Módulo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar módulo:', error);
        res.status(500).json({ message: 'Error al eliminar módulo' });
    }
};

module.exports = { getModulesByLevel, addModule, editModule, deleteModule };
