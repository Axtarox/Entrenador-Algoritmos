// models/exercise.js
const db = require('../config/database');

class Exercise {
    constructor(id, nivel, enunciado, solucionEsperada, moduloId, nombreModulo) {
        this.id = id;
        this.nivel = nivel;
        this.enunciado = enunciado;
        this.solucionEsperada = solucionEsperada;
        this.moduloId = moduloId;
        this.nombreModulo = nombreModulo;
    }

    static async findAll() {
        const [rows] = await db.execute(`
            SELECT E.*, M.nombre AS nombreModulo
            FROM EJERCICIO E
            JOIN MODULO M ON E.modulo_id = M.id
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute(`
            SELECT E.id, E.enunciado, M.nombre AS nombreModulo
            FROM EJERCICIO E
            JOIN MODULO M ON E.modulo_id = M.id
            WHERE E.id = ?
        `, [id]);
        return rows[0];
    }
    
    static async create(exerciseData) {
        const { nivel, enunciado, solucionEsperada, moduloId } = exerciseData;
        const [result] = await db.execute(
            'INSERT INTO EJERCICIO (nivel, enunciado, solucion_esperada, modulo_id) VALUES (?, ?, ?, ?)',
            [nivel, enunciado, solucionEsperada, moduloId]
        );
        return result.insertId;
    }
}

module.exports = Exercise;
