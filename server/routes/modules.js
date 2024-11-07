const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modules');

// Rutas para estudiantes
router.get('/:nivel', moduleController.getModulesByLevel); // Vista de estudiante

// Rutas para profesores (corrección)
router.post('/', moduleController.addModule); // Agregar módulo
router.put('/:id', moduleController.editModule); // Editar módulo
router.delete('/:id', moduleController.deleteModule); // Eliminar módulo

module.exports = router;
