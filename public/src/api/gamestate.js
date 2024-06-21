const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/connection');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Crear un estado inicial del juego
router.post('/', authenticateToken, [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('stage').isInt().withMessage('Stage must be an integer'),
  body('state').isString().withMessage('State must be a string')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, stage, state } = req.body;

  try {
    const [rows] = await db.query('INSERT INTO game_state (user_id, stage, state) VALUES (?, ?, ?)', [user_id, stage, state]);
    res.status(201).json({ id: rows.insertId, user_id, stage, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener el estado del juego para una etapa específica de un usuario
router.get('/:user_id/:stage', authenticateToken, async (req, res) => {
  const { user_id, stage } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM game_state WHERE user_id = ? AND stage = ?', [user_id, stage]);
    if (rows.length === 0) return res.status(404).json({ error: 'Estado no encontrado para esta etapa' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un estado específico del juego
router.put('/:id', authenticateToken, [
  body('stage').isInt().withMessage('Stage must be an integer'),
  body('state').isString().withMessage('State must be a string')
], async (req, res) => {
  const id = req.params.id;
  const { stage, state } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await db.query('UPDATE game_state SET stage = ?, state = ? WHERE id = ?', [stage, state, id]);
    res.json({ id, stage, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
