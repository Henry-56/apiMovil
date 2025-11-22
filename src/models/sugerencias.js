const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Sugerencia = sequelize.define("sugerencias", {
  id_sugerencia: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_emocion_relacionada: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  id_practica_relacionada: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  sugerencia: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  origen: {
    type: Sequelize.STRING, // 'sistema', 'manual'
    defaultValue: 'sistema'
  },
  leida: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  fecha: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
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

Sugerencia.sync()
  .then(() => console.log("Sugerencia model initialized"))
  .catch(err => console.error("Error initializing Sugerencia model: ", err));

module.exports = { Sugerencia };
