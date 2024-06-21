const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./database/connection');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const usersRoutes = require('./routes/users');
const gameStateRoutes = require('./routes/gamestate');
const scoresRoutes = require('./routes/scores');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('../public'));

app.use('/api/users', usersRoutes);
app.use('/api/gamestate', gameStateRoutes);
app.use('/api/scores', scoresRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
