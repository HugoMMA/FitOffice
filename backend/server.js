require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de ProyectoInicial');
});
  

// Rutas
app.use('/clientes', require('./routes/clientes'));
app.use('/rutinas', require('./routes/rutinas'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
