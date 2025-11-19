const express = require('express');

const router = express.Router();
const practicaController = require('../controllers/practicaController');

// Listar prácticas de un usuario
router.get('/practicas/:id_usuario', async (req, res) => {
  try {
    const lista = await practicaController.listPracticasPorUsuario(req.params.id_usuario);
    res.status(200).json(lista);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener una práctica
router.get('/practica/:id', async (req, res) => {
  try {
    const practica = await practicaController.getPractica(req.params.id);
    res.status(200).json(practica);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear nueva práctica
router.post('/practica', async (req, res) => {
  try {
    const nueva = await practicaController.createPractica(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear práctica' });
  }
});

// Actualizar práctica existente
router.put('/practica/:id', async (req, res) => {
  try {
    const actualizado = await practicaController.updatePractica(req.params.id, req.body);
    res.status(200).json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar práctica' });
  }
});

// Eliminar práctica
router.delete('/practica/:id', async (req, res) => {
  try {
    await practicaController.deletePractica(req.params.id);
    res.status(200).json({ message: 'Práctica eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar práctica' });
  }
});

module.exports = router;
