const { Sugerencia } = require('../models/sugerencias');
const { Emocion } = require('../models/emociones');
const { Practica } = require('../models/practicas');
const { Op } = require('sequelize');

const getSuggestions = async (userId) => {
    const suggestions = await Sugerencia.findAll({
        where: { id_usuario: userId, leida: false },
        order: [['fecha', 'DESC']]
    });
    return suggestions;
};

const markAsRead = async (userId, suggestionId) => {
    const suggestion = await Sugerencia.findOne({
        where: { id_sugerencia: suggestionId, id_usuario: userId }
    });

    if (!suggestion) {
        throw new Error('Suggestion not found or unauthorized');
    }

    suggestion.leida = true;
    await suggestion.save();
    return suggestion;
};

const generateSuggestionsForUser = async (userId) => {
    // Analyze last N emotions
    const recentEmotions = await Emocion.findAll({
        where: { id_usuario: userId },
        limit: 5,
        order: [['fecha', 'DESC']]
    });

    // Simple logic: if average intensity > 3, suggest a practice
    let highStressCount = 0;
    recentEmotions.forEach(e => {
        if (e.intensidad > 3) highStressCount++;
    });

    if (highStressCount >= 3) {
        // Create a suggestion
        await Sugerencia.create({
            id_usuario: userId,
            sugerencia: 'Hemos notado que has tenido momentos intensos recientemente. Te recomendamos realizar una práctica de respiración.',
            tipo: 'recomendacion',
            origen: 'sistema',
            fecha: new Date()
        });
    }
};

module.exports = {
    getSuggestions,
    markAsRead,
    generateSuggestionsForUser
};
