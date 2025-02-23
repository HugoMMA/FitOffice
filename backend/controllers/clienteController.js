// backend/controllers/clienteController.js
const Cliente = require('../models/Cliente');

// Crear cliente (ya implementado)
exports.crearCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar clientes (ya implementado)
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Detalle de un cliente (ya implementado)
exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar cliente
exports.editarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!clienteActualizado)
      return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const resultado = await Cliente.deleteOne({ _id: req.params.id });
    
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: error.message });
  }
};
