const { Emocion } = require('../models/emociones');
const { Practica } = require('../models/practicas');
const { Op, Sequelize } = require('sequelize');

const getOverview = async (userId) => {
    // Stress average (from emotions intensity)
    const emotions = await Emocion.findAll({
        where: { id_usuario: userId },
        attributes: ['intensidad', 'emocion', 'fecha']
    });

    const totalIntensity = emotions.reduce((sum, e) => sum + e.intensidad, 0);
    const averageStress = emotions.length ? (totalIntensity / emotions.length).toFixed(2) : 0;

    // Most frequent emotions
    const emotionCounts = {};
    emotions.forEach(e => {
        emotionCounts[e.emocion] = (emotionCounts[e.emocion] || 0) + 1;
    });
    const frequentEmotions = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([emocion, count]) => ({ emocion, count }));

    // Practices count
    const practicesCount = await Practica.count({
        where: { id_usuario: userId }
    });

    // Diary compliance (entries in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEntries = await Emocion.count({
        where: {
            id_usuario: userId,
            fecha: { [Op.gte]: sevenDaysAgo }
        },
        group: [Sequelize.fn('DATE', Sequelize.col('fecha'))]
    });

    const complianceDays = recentEntries.length; // Number of unique days with entries

    return {
        averageStress,
        frequentEmotions,
        practicesCount,
        complianceDays
    };
};

module.exports = {
    getOverview
};
