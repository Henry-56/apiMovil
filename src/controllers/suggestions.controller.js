const suggestionsService = require('../services/suggestions.service');

const getSuggestions = async (req, res, next) => {
    try {
        // Trigger generation logic (optional, could be a background job)
        await suggestionsService.generateSuggestionsForUser(req.user.id);

        const suggestions = await suggestionsService.getSuggestions(req.user.id);
        res.status(200).json({
            success: true,
            data: suggestions
        });
    } catch (error) {
        next(error);
    }
};

const markAsRead = async (req, res, next) => {
    try {
        const suggestion = await suggestionsService.markAsRead(req.user.id, req.params.id);
        res.status(200).json({
            success: true,
            message: 'Suggestion marked as read',
            data: suggestion
        });
    } catch (error) {
        if (error.message === 'Suggestion not found or unauthorized') {
            return res.status(404).json({ success: false, message: error.message });
        }
        next(error);
    }
};

module.exports = {
    getSuggestions,
    markAsRead
};
