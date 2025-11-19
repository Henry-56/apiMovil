const Sequelize = require('sequelize');
const sequelize = require('../db/config');
const { Usuario } = require('./usuarios');

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
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  emocion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reflexion: {
    type: Sequelize.TEXT,
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

Emocion.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Emocion.sync()
  .then(() => console.log("Emocion model initialized"))
  .catch(err => console.error("Error initializing Emocion model: ", err));

module.exports = { Emocion };
