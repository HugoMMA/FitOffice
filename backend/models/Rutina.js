const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  importante: { type: Boolean, default: false }
}, { _id: false });

const RutinaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  meta: { type: String, required: true },
  semanas: { type: Number, default: 12 },
  tipo: { 
    type: String, 
    enum: ["Hipertrofia", "Fuerza", "Resistencia", "Otro"], 
    required: true 
  },
  plan: { type: Array, required: true },
  notas: { type: [NotaSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Rutina', RutinaSchema);
