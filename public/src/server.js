const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/connection');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('../public'));

// Crear un estado inicial del juego
app.post('/api/gamestate', async (req, res) => {
  const { stage, state } = req.body;

  try {
    const [rows] = await db.query('INSERT INTO game_state (stage, state) VALUES (?, ?)', [stage, state]);
    res.status(201).json({ id: rows.insertId, stage, state });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener el estado del juego para una etapa específica
app.get('/api/gamestate/:stage', async (req, res) => {
  const stage = req.params.stage;

  try {
    const [rows] = await db.query('SELECT * FROM game_state WHERE stage = ?', [stage]);
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
