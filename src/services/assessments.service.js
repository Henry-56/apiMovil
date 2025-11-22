const { Evaluacion } = require('../models/evaluaciones');
const { Op } = require('sequelize');

const createAssessment = async (userId, assessmentData) => {
    const newAssessment = await Evaluacion.create({
        id_usuario: userId,
        ...assessmentData,
        fecha: new Date()
    });
    return newAssessment;
};

const getSummary = async (userId) => {
    const pretest = await Evaluacion.findOne({
        where: { id_usuario: userId, tipo: 'pretest' },
        order: [['fecha', 'DESC']]
    });

    const posttest = await Evaluacion.findOne({
        where: { id_usuario: userId, tipo: 'postest' },
        order: [['fecha', 'DESC']]
    });

    let summary = {
        pretest: pretest ? { pss10: pretest.pss10_score, satisfaccion: pretest.satisfaccion_score } : null,
        posttest: posttest ? { pss10: posttest.pss10_score, satisfaccion: posttest.satisfaccion_score } : null,
        change: null
    };

    if (pretest && posttest) {
        const pss10Change = posttest.pss10_score - pretest.pss10_score;
        const pss10Percent = pretest.pss10_score !== 0 ? (pss10Change / pretest.pss10_score) * 100 : 0;

        const satChange = posttest.satisfaccion_score - pretest.satisfaccion_score;
        const satPercent = pretest.satisfaccion_score !== 0 ? (satChange / pretest.satisfaccion_score) * 100 : 0;

        summary.change = {
            pss10: { absolute: pss10Change, percent: pss10Percent },
            satisfaccion: { absolute: satChange, percent: satPercent }
        };
    }

    return summary;
};

module.exports = {
    createAssessment,
    getSummary
};
