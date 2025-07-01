const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  id_evento: {
    type: String,
    required: [true, 'El ID del evento es obligatorio'],
    unique: true,
    trim: true
  },
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria'],
    match: [/^\d{2}\/\d{2}\/\d{4}$/, 'Formato inválido. Ej: 18/11/2025']
  },
  hora_inicio: {
    type: String,
    required: [true, 'La hora de inicio es obligatoria'],
    match: [/^\d{1,2}:\d{2}(am|pm)$/, 'Ej: 3:00pm']
  },
  hora_fin: {
    type: String,
    required: [true, 'La hora de finalización es obligatoria'],
    match: [/^\d{1,2}:\d{2}(am|pm)$/, 'Ej: 7:30pm']
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evento', eventoSchema);
