// controllers/exercises.js
const Exercise = require('../models/exercise');
const judge = require('../utils/judge');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ejercicios', error });
    }
};

const getExerciseById = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);
        if (!exercise) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }
        res.json({
            id: exercise.id,
            nombreModulo: exercise.nombreModulo,
            enunciado: exercise.enunciado
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el ejercicio', error });
    }
};


const createExercise = async (req, res) => {
    try {
        const exerciseId = await Exercise.create(req.body);
        res.status(201).json({ message: 'Ejercicio creado', id: exerciseId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear ejercicio', error });
    }
};

// Evaluar el código del usuario usando el juez automático


const evaluateExercise = async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;

    try {
        // Obtener el ejercicio y la solución esperada desde la base de datos
        const exercise = await Exercise.findById(id);
        if (!exercise) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }

        // Evaluar el código del usuario usando el juez automático
        const output = await judge.evaluate(code, exercise.solucion_esperada);
        res.json({ output });
    } catch (error) {
        res.status(500).json({ message: 'Error al evaluar el ejercicio', error });
    }
};


module.exports = {
    getAllExercises,
    getExerciseById,
    createExercise,
    evaluateExercise,
};
