const reportsService = require('../services/reports.service');

const getOverview = async (req, res, next) => {
    try {
        const overview = await reportsService.getOverview(req.user.id);
        res.status(200).json({
            success: true,
            data: overview
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOverview
};
