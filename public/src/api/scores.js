const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../database/connection');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Crear o actualizar una puntuación
router.post('/', authenticateToken, [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('score').isInt().withMessage('Score must be an integer')
], async (req, res) => {
  const { user_id, score } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [existing] = await db.query('SELECT * FROM scores WHERE user_id = ?', [user_id]);
    if (existing.length === 0) {
      const [rows] = await db.query('INSERT INTO scores (user_id, score) VALUES (?, ?)', [user_id, score]);
      res.status(201).json({ id: rows.insertId, user_id, score });
    } else {
      await db.query('UPDATE scores SET score = ? WHERE user_id = ?', [score, user_id]);
      res.json({ user_id, score });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener la puntuación de un usuario específico
router.get('/:user_id', authenticateToken, async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const [rows] = await db.query('SELECT * FROM scores WHERE user_id = ?', [user_id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Puntuación no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
