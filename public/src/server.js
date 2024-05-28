const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./database/connection');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('../public'));

// Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ id: rows.insertId, username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un estado inicial del juego
app.post('/api/gamestate', async (req, res) => {
  const { user_id, stage, state } = req.body;

  try {
    const [rows] = await db.query('INSERT INTO game_state (user_id, stage, state) VALUES (?, ?, ?)', [user_id, stage, state]);
    res.status(201).json({ id: rows.insertId, user_id, stage, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener el estado del juego para una etapa específica de un usuario
app.get('/api/gamestate/:user_id/:stage', async (req, res) => {
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
app.put('/api/gamestate/:id', async (req, res) => {
  const id = req.params.id;
  const { stage, state } = req.body;

  try {
    await db.query('UPDATE game_state SET stage = ?, state = ? WHERE id = ?', [stage, state, id]);
    res.json({ id, stage, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear o actualizar una puntuación
app.post('/api/scores', async (req, res) => {
  const { user_id, score } = req.body;

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
app.get('/api/scores/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const [rows] = await db.query('SELECT * FROM scores WHERE user_id = ?', [user_id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Puntuación no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
