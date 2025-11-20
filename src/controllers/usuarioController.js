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


async function loginUsuario(correo, clave_hash) {
  try {
    // Busca usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });

    // Si no existe el usuario
    if (!usuario) return null;

    // Validación simple (puedes mejorar con bcrypt si usas claves cifradas)
    if (usuario.clave_hash === clave_hash) {
      return usuario; // Opcional: filtra los campos sensibles antes de devolver
    } else {
      return null; // Clave incorrecta
    }
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getUsuario,
  listUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
};
