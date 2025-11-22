const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Usuario = sequelize.define("usuarios", {
  id_usuario: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  correo: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  clave_hash: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: true
  },
  carrera: {
    type: Sequelize.STRING,
    allowNull: true
  },
  ciclo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  consentimiento: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  fecha_registro: {
    type: Sequelize.DATE,
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

Usuario.sync({ alter: true })
  .then(() => console.log("Usuario model initialized"))
  .catch(err => console.error("Error initializing Usuario model: ", err));

module.exports = { Usuario };
