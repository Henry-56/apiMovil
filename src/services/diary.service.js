const { Emocion } = require('../models/emociones');
const { Op } = require('sequelize');

const getEntries = async (userId, filters) => {
    const { startDate, endDate, emocion } = filters;
    const where = { id_usuario: userId };

    if (startDate && endDate) {
        where.fecha = {
            [Op.between]: [new Date(startDate), new Date(endDate)]
        };
    }

    if (emocion) {
        where.emocion = emocion;
    }

    const entries = await Emocion.findAll({
        where,
        order: [['fecha', 'DESC']]
    });

    return entries;
};

const createEntry = async (userId, entryData) => {
    const newEntry = await Emocion.create({
        id_usuario: userId,
        ...entryData
    });
    return newEntry;
};

const updateEntry = async (userId, entryId, entryData) => {
    const entry = await Emocion.findOne({
        where: { id_emocion: entryId, id_usuario: userId }
    });

    if (!entry) {
        throw new Error('Entry not found or unauthorized');
    }

    await entry.update(entryData);
    return entry;
};

const deleteEntry = async (userId, entryId) => {
    const entry = await Emocion.findOne({
        where: { id_emocion: entryId, id_usuario: userId }
    });

    if (!entry) {
        throw new Error('Entry not found or unauthorized');
    }

    await entry.destroy();
    return true;
};

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};
