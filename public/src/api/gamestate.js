const router = require('express').Router();
const db = require('../database/');

// Obtener todos los estados de juego
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM game_state');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un estado de juego específico por user_id y stage
router.get('/:user_id/:stage', async (req, res) => {
    const { user_id, stage } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM game_state WHERE user_id = ? AND stage = ?', [user_id, stage]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Game state not found' });
        }
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo estado de juego
router.post('/', async (req, res) => {
    const { user_id, stage, state } = req.body;
    try {
        const [result] = await db.query('INSERT INTO game_state (user_id, stage, state) VALUES (?, ?, ?)', [user_id, stage, state]);
        res.status(201).json({ id: result.insertId, user_id, stage, state });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un estado de juego
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { stage, state } = req.body;
    try {
        await db.query('UPDATE game_state SET stage = ?, state = ? WHERE id = ?', [stage, state, id]);
        res.json({ message: "Game state updated", id, stage, state });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
