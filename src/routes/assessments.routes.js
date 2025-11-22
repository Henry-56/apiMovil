const express = require('express');
const router = express.Router();
const assessmentsController = require('../controllers/assessments.controller');
const validate = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const Joi = require('joi');

const assessmentSchema = Joi.object({
    pss10_score: Joi.number().required(),
    satisfaccion_score: Joi.number().required(),
    respuestas_pss10: Joi.object().optional() // Or Joi.array() depending on structure
});

router.use(authMiddleware);

router.post('/pretest', validate(assessmentSchema), assessmentsController.createPretest);
router.post('/posttest', validate(assessmentSchema), assessmentsController.createPosttest);
router.get('/summary', assessmentsController.getSummary);

module.exports = router;
