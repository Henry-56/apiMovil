const practicesService = require('../services/practices.service');

const getLibrary = async (req, res, next) => {
    try {
        const library = await practicesService.getLibrary();
        res.status(200).json({
            success: true,
            data: library
        });
    } catch (error) {
        next(error);
    }
};

const createSession = async (req, res, next) => {
    try {
        const session = await practicesService.createSession(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: 'Session recorded successfully',
            data: session
        });
    } catch (error) {
        next(error);
    }
};

const getSessions = async (req, res, next) => {
    try {
        const sessions = await practicesService.getSessions(req.user.id, req.query);
        res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLibrary,
    createSession,
    getSessions
};
