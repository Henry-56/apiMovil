const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', async (req, res) => {
  try {
    const lista = await usuarioController.listUsuarios();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});
// Obtener usuario por id
router.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await usuarioController.getUsuario(req.params.id);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.post('/usuario', async (req, res) => {
  try {
    const nuevo = await usuarioController.createUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuario' });
  }
});
// Actualizar usuario
router.put('/usuario/:id', async (req, res) => {
  try {
    const actualizado = await usuarioController.updateUsuario(req.params.id, req.body);
    res.status(200).json(actualizado);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
});

router.delete('/usuario/:id', async (req, res) => {
  try {
    await usuarioController.deleteUsuario(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});
// Login de usuario
router.post('/usuario/login', async (req, res) => {
  try {
    const { correo, clave_hash } = req.body; // nombre de los campos según tu modelo
    const usuario = await usuarioController.loginUsuario(correo, clave_hash);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});


module.exports = router;
