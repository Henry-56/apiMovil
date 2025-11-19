const Sequelize = require('sequelize');
const sequelize = require('../db/config');
const { Usuario } = require('./usuarios');

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
  sugerencia: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fecha: {
    type: Sequelize.DATEONLY,
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

Sugerencia.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Sugerencia.sync()
  .then(() => console.log("Sugerencia model initialized"))
  .catch(err => console.error("Error initializing Sugerencia model: ", err));

module.exports = { Sugerencia };
