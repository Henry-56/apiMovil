const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diary.controller');
const validate = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const Joi = require('joi');

const createEntrySchema = Joi.object({
    emocion: Joi.string().required(),
    intensidad: Joi.number().min(1).max(5).required(),
    contexto: Joi.string().optional(),
    momento_dia: Joi.string().valid('manana', 'tarde', 'noche').optional(),
    reflexion: Joi.string().optional(),
    fecha: Joi.date().optional()
});

const updateEntrySchema = Joi.object({
    emocion: Joi.string().optional(),
    intensidad: Joi.number().min(1).max(5).optional(),
    contexto: Joi.string().optional(),
    momento_dia: Joi.string().valid('manana', 'tarde', 'noche').optional(),
    reflexion: Joi.string().optional(),
    fecha: Joi.date().optional()
});

router.use(authMiddleware);

router.get('/', diaryController.getEntries);
router.post('/', validate(createEntrySchema), diaryController.createEntry);
router.put('/:id', validate(updateEntrySchema), diaryController.updateEntry);
router.delete('/:id', diaryController.deleteEntry);

module.exports = router;
