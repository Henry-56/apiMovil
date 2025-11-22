const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Emocion = sequelize.define("emociones", {
  id_emocion: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  emocion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  intensidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  contexto: {
    type: Sequelize.STRING,
    allowNull: true
  },
  momento_dia: {
    type: Sequelize.STRING, // 'manana', 'tarde', 'noche'
    allowNull: true
  },
  reflexion: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  fuente_registro: {
    type: Sequelize.STRING, // 'manual', 'post_practica'
    defaultValue: 'manual'
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

Emocion.sync()
  .then(() => console.log("Emocion model initialized"))
  .catch(err => console.error("Error initializing Emocion model: ", err));

module.exports = { Emocion };
