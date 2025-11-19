const express = require("express");
const router = express.Router();
const sugerenciaController = require('../controllers/sugerenciaController');

router.get('/sugerencias/:id_usuario', async (req, res) => {
  try {
    const lista = await sugerenciaController.listSugerenciasPorUsuario(req.params.id_usuario);
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.get('/sugerencia/:id', async (req, res) => {
  try {
    const sugerencia = await sugerenciaController.getSugerencia(req.params.id);
    res.status(200).json(sugerencia);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/sugerencia', async (req, res) => {
  try {
    const nueva = await sugerenciaController.createSugerencia(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear sugerencia' });
  }
});

router.put('/sugerencia/:id', async (req, res) => {
  try {
    const actualizado = await sugerenciaController.updateSugerencia(req.params.id, req.body);
    res.status(200).json(actualizado);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar sugerencia' });
  }
});

router.delete('/sugerencia/:id', async (req, res) => {
  try {
    await sugerenciaController.deleteSugerencia(req.params.id);
    res.status(200).json({ message: 'Sugerencia eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar sugerencia' });
  }
});

module.exports = router;
