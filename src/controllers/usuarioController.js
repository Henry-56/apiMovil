const { Usuario } = require('../models/usuarios');

// Obtener usuario por id
async function getUsuario(id) {
  return Usuario.findOne({ where: { id_usuario: id } });
}

// Listar todos los usuarios
async function listUsuarios() {
  return Usuario.findAll();
}

// Crear usuario
async function createUsuario(data) {
  return Usuario.create(data);
}

// Actualizar usuario
async function updateUsuario(id_usuario, newData) {
  await Usuario.update(newData, { where: { id_usuario } });
  return Usuario.findByPk(id_usuario);
}

// Eliminar usuario
async function deleteUsuario(id_usuario) {
  return Usuario.destroy({ where: { id_usuario } });
}

module.exports = {
  getUsuario,
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
