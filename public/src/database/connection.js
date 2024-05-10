const mongoose = require('mongoose');

const connection = () => {
  const mongoURI = 'tu_cadena_de_conexion_a_mongodb'; // Asegúrate de reemplazar esto con tu cadena de conexión real

  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error conectando a MongoDB', err));
};

module.exports = connection;
