const { Sugerencia } = require('../models/sugerencias');

// Obtener sugerencia por id
async function getSugerencia(id) {
  return Sugerencia.findOne({ where: { id_sugerencia: id } });
}

// Listar sugerencias por usuario
async function listSugerenciasPorUsuario(id_usuario) {
  return Sugerencia.findAll({ where: { id_usuario } });
}

// Crear sugerencia
async function createSugerencia(data) {
  return Sugerencia.create(data);
}

// Actualizar sugerencia
async function updateSugerencia(id_sugerencia, newData) {
  await Sugerencia.update(newData, { where: { id_sugerencia } });
  return Sugerencia.findByPk(id_sugerencia);
}

// Eliminar sugerencia
async function deleteSugerencia(id_sugerencia) {
  return Sugerencia.destroy({ where: { id_sugerencia } });
}

module.exports = {
  getSugerencia,
  listSugerenciasPorUsuario,
  createSugerencia,
  updateSugerencia,
  deleteSugerencia
};
