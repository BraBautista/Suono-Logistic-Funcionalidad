const Evento = require('../models/eventos');

exports.crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    await nuevoEvento.save();
    res.status(201).json({ mensaje: 'Evento creado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
