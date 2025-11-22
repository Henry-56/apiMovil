const assessmentsService = require('../services/assessments.service');

const createPretest = async (req, res, next) => {
    try {
        const assessment = await assessmentsService.createAssessment(req.user.id, {
            ...req.body,
            tipo: 'pretest'
        });
        res.status(201).json({
            success: true,
            message: 'Pretest recorded successfully',
            data: assessment
        });
    } catch (error) {
        next(error);
    }
};

const createPosttest = async (req, res, next) => {
    try {
        const assessment = await assessmentsService.createAssessment(req.user.id, {
            ...req.body,
            tipo: 'postest'
        });
        res.status(201).json({
            success: true,
            message: 'Posttest recorded successfully',
            data: assessment
        });
    } catch (error) {
        next(error);
    }
};

const getSummary = async (req, res, next) => {
    try {
        const summary = await assessmentsService.getSummary(req.user.id);
        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPretest,
    createPosttest,
    getSummary
};
