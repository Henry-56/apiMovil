const { Emocion } = require('../models/emociones');

// Obtener una emoción por id
async function getEmocion(id) {
  return Emocion.findOne({ where: { id_emocion: id } });
}

// Listar todas las emociones de un usuario
async function listEmocionesPorUsuario(id_usuario) {
  return Emocion.findAll({ where: { id_usuario } });
}

// Crear nueva emoción
async function createEmocion(data) {
  return Emocion.create(data);
}

// Actualizar emoción
async function updateEmocion(id_emocion, newData) {
  await Emocion.update(newData, { where: { id_emocion } });
  return Emocion.findByPk(id_emocion);
}

// Eliminar emoción
async function deleteEmocion(id_emocion) {
  return Emocion.destroy({ where: { id_emocion } });
}

module.exports = {
  getEmocion,
  listEmocionesPorUsuario,
  createEmocion,
  updateEmocion,
  deleteEmocion
};
