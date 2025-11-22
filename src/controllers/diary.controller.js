const diaryService = require('../services/diary.service');

const getEntries = async (req, res, next) => {
    try {
        const entries = await diaryService.getEntries(req.user.id, req.query);
        res.status(200).json({
            success: true,
            data: entries
        });
    } catch (error) {
        next(error);
    }
};

const createEntry = async (req, res, next) => {
    try {
        const entry = await diaryService.createEntry(req.user.id, req.body);
        res.status(201).json({
            success: true,
            message: 'Entry created successfully',
            data: entry
        });
    } catch (error) {
        next(error);
    }
};

const updateEntry = async (req, res, next) => {
    try {
        const entry = await diaryService.updateEntry(req.user.id, req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Entry updated successfully',
            data: entry
        });
    } catch (error) {
        if (error.message === 'Entry not found or unauthorized') {
            return res.status(404).json({ success: false, message: error.message });
        }
        next(error);
    }
};

const deleteEntry = async (req, res, next) => {
    try {
        await diaryService.deleteEntry(req.user.id, req.params.id);
        res.status(200).json({
            success: true,
            message: 'Entry deleted successfully'
        });
    } catch (error) {
        if (error.message === 'Entry not found or unauthorized') {
            return res.status(404).json({ success: false, message: error.message });
        }
        next(error);
    }
};

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};
