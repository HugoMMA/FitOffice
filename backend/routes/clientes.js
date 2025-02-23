const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// POST /clientes → Crear cliente
router.post('/', clienteController.crearCliente);

// GET /clientes → Listar clientes
router.get('/', clienteController.obtenerClientes);

// GET /clientes/:id → Obtener cliente por ID
router.get('/:id', clienteController.obtenerClientePorId);

// PUT /clientes/:id → Actualizar cliente
router.put('/:id', clienteController.editarCliente);

// DELETE /clientes/:id → Eliminar cliente
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
