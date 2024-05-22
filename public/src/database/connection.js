const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Cambia esto según sea necesario
  user: 'root',
  password: 'tu_contraseña',
  database: 'gatito_leon'
});

module.exports = pool.promise();
