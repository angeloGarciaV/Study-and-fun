const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', // Cambia esto según sea necesario
  user: 'root',
  password: 'password',
  database: 'Study_and_fun'
});

module.exports = pool.promise();
