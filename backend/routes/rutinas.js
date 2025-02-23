// backend/routes/rutinas.js
const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

// Obtener todas las rutinas de un cliente
router.get('/:clienteId', rutinaController.obtenerRutinas);

// Generar una nueva rutina para un cliente
router.post('/:clienteId', rutinaController.generarRutina);

// Obtener el detalle de una rutina
router.get('/detail/:rutinaId', rutinaController.obtenerRutinaDetalle);

module.exports = router;

