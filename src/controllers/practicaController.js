const { Practica } = require('../models/practicas');

// Obtener una práctica por su id
async function getPractica(id) {
  return Practica.findOne({ where: { id_practica: id } });
}

// Listar todas las prácticas de un usuario
async function listPracticasPorUsuario(id_usuario) {
  return Practica.findAll({ where: { id_usuario } });
}

async function listPracticas() {
  return Practica.findAll();
}
// Crear nueva práctica
async function createPractica(data) {
  return Practica.create(data); // data debe contener los campos requeridos
}

// Actualizar una práctica
async function updatePractica(id_practica, newData) {
  await Practica.update(newData, { where: { id_practica } });
  return Practica.findByPk(id_practica);
}

// Eliminar una práctica
async function deletePractica(id_practica) {
  return Practica.destroy({ where: { id_practica } });
}

module.exports = {
  getPractica,
  listPracticasPorUsuario,
  createPractica,
  updatePractica,
  deletePractica,
  listPracticas

};
