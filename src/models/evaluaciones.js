const Sequelize = require('sequelize');
const sequelize = require('../db/config');

const Evaluacion = sequelize.define("evaluaciones", {
    id_evaluacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING, // 'pretest', 'postest', 'seguimiento'
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    pss10_score: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    satisfaccion_score: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    respuestas_pss10: {
        type: Sequelize.JSON, // Store answers as JSON
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

Evaluacion.sync()
    .then(() => console.log("Evaluacion model initialized"))
    .catch(err => console.error("Error initializing Evaluacion model: ", err));

module.exports = { Evaluacion };
