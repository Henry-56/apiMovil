const express = require('express');
const router = express.Router();
const suggestionsController = require('../controllers/suggestions.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', suggestionsController.getSuggestions);
router.patch('/:id/read', suggestionsController.markAsRead);

module.exports = router;
