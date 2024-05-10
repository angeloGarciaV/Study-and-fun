const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON y servir archivos estáticos
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conectar a MongoDB
mongoose.connect('tu_cadena_de_conexion_a_mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
  console.log("Conectado a MongoDB exitosamente!");
});

// Definir el esquema y modelo para el estado del juego
const gameSchema = new mongoose.Schema({
  stage: Number,
  state: String
});

const Game = mongoose.model('Game', gameSchema);

// Rutas
app.get('/api/gamestate/:stage', async (req, res) => {
  try {
    const stage = await Game.findOne({ stage: req.params.stage });
    res.json(stage);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/gamestate', async (req, res) => {
  try {
    const newGameState = new Game(req.body);
    const result = await newGameState.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/gamestate/:id', async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGame);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
