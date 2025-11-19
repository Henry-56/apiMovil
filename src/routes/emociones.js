const express = require("express");
const router = express.Router();
const emocionController = require('../controllers/emocionController');

router.get('/emociones/:id_usuario', async (req, res) => {
  try {
    const lista = await emocionController.listEmocionesPorUsuario(req.params.id_usuario);
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.get('/emocion/:id', async (req, res) => {
  try {
    const emocion = await emocionController.getEmocion(req.params.id);
    res.status(200).json(emocion);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/emocion', async (req, res) => {
  try {
    const nueva = await emocionController.createEmocion(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear emoción' });
  }
});

router.put('/emocion/:id', async (req, res) => {
  try {
    const actualizado = await emocionController.updateEmocion(req.params.id, req.body);
    res.status(200).json(actualizado);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar emoción' });
  }
});

router.delete('/emocion/:id', async (req, res) => {
  try {
    await emocionController.deleteEmocion(req.params.id);
    res.status(200).json({ message: 'Emoción eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar emoción' });
  }
});

module.exports = router;
