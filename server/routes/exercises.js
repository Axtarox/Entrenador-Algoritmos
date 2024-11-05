// routes/exercises.js
const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');

// Ruta para obtener todos los ejercicios
router.get('/', exercisesController.getAllExercises);

// Ruta para obtener un ejercicio por ID
router.get('/:id', exercisesController.getExerciseById);

// Ruta para crear un nuevo ejercicio
router.post('/', exercisesController.createExercise);


// Ruta para evaluar el código del ejercicio
router.post('/:id/evaluate', exercisesController.evaluateExercise);

module.exports = router;
