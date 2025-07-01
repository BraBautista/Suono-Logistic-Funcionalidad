const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventosRoutes = require('./routes/eventos');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/suono_logistic')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Rutas
app.use('/api/eventos', eventosRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
