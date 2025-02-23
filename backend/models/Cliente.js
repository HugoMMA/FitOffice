const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  peso: { type: Number, required: true },
  altura: { type: Number, required: true },
  objetivo: { 
    type: String, 
    enum: ["Pérdida de peso", "Ganancia muscular", "Mantenimiento", "Otro"], 
    required: true 
  },
  historialEntrenamiento: { type: [String], default: [] }, 
}, { timestamps: true });

// Eliminar las rutinas asociadas a un cliente al eliminar el cliente
ClienteSchema.pre('deleteOne', { document: false, query: true }, async function() {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
        await mongoose.model('Rutina').deleteMany({ cliente: doc._id });
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
