const { Practica } = require('../models/practicas');
const { Op } = require('sequelize');

const getLibrary = async () => {
    // Assuming library practices have id_usuario = null or we fetch all distinct types/urls
    // For now, let's assume we fetch practices that are "templates" (maybe id_usuario is null)
    // Or we just return all unique practices available in the system if we don't have a separate "Library" table.
    // Requirement says: "catálogo de prácticas disponibles... a partir de la tabla practicas o una tabla de recursos maestros."
    // Let's assume we query practices where id_usuario is NULL (system practices).
    const practices = await Practica.findAll();
    return practices;
};

const createSession = async (userId, sessionData) => {
    const newSession = await Practica.create({
        id_usuario: userId,
        ...sessionData,
        fecha: new Date()
    });
    return newSession;
};

const getSessions = async (userId, filters) => {
    const { startDate, endDate } = filters;
    const where = { id_usuario: userId };

    if (startDate && endDate) {
        where.fecha = {
            [Op.between]: [new Date(startDate), new Date(endDate)]
        };
    }

    // We want to fetch "sessions", which are practices done by the user.
    // So we filter by id_usuario.
    const sessions = await Practica.findAll({
        where,
        order: [['fecha', 'DESC']]
    });

    return sessions;
};

module.exports = {
    getLibrary,
    createSession,
    getSessions
};
