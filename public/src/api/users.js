const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/connection');
const router = express.Router();

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ id: rows.insertId, username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
