const express = require('express');
const router = express.Router();
const Evento = require('../models/eventos');

// ✅ Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eventos', error });
  }
});

// ✅ Crear un nuevo evento
router.post('/', async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.status(201).json({ mensaje: 'Evento creado exitosamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear evento', error });
  }
});

// ✅ Eliminar un evento por su ID en Mongo (_id)
router.delete('/:id', async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar evento', error });
  }
});

module.exports = router;
