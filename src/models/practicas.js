const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Practica = sequelize.define("practicas", {
  id_practica: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: true // Can be null if it's a library practice, or specific to user? Requirement says "catalogo de practicas" so maybe no user_id for library items? But "sessions" have user_id.
    // Requirement: "Practica Campos: id_practica, id_usuario, tipo..."
    // If it's a library practice, maybe id_usuario is null or admin?
    // Let's keep it as per requirement.
  },
  tipo: {
    type: Sequelize.STRING, // 'video', 'audio', 'lectura'
    allowNull: false
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  url_contenido: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // Fields for a "session" (performed practice)
  fecha: {
    type: Sequelize.DATE,
    allowNull: true
  },
  duracion_min: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  resultado: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  estado: {
    type: Sequelize.STRING, // 'completada', 'incompleta'
    allowNull: true
  },
  intensidad_antes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  intensidad_despues: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  id_emocion_relacionada: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

Practica.sync()
  .then(() => console.log("Practica model initialized"))
  .catch(err => console.error("Error initializing Practica model: ", err));

module.exports = { Practica };
