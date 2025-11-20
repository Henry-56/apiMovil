const Sequelize = require('sequelize');
const sequelize = require('../db/config');
const { Usuario } = require('./usuarios');

const Practica = sequelize.define("practicas", {
  id_practica: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING,
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
  fecha: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  duracion_min: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  resultado: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  emocion: { // <-- CAMPO PARA FILTRAR POR EMOCIÓN
    type: Sequelize.STRING,
    allowNull: false
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


Practica.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Practica.sync()
  .then(() => console.log("Practica model initialized"))
  .catch(err => console.error("Error initializing Practica model: ", err));

module.exports = { Practica };
