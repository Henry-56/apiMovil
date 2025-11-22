const express = require('express');
const router = express.Router();
const practicesController = require('../controllers/practices.controller');
const validate = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const Joi = require('joi');

const createSessionSchema = Joi.object({
    tipo: Joi.string().required(),
    descripcion: Joi.string().optional(),
    url_contenido: Joi.string().optional(),
    duracion_min: Joi.number().required(),
    intensidad_antes: Joi.number().optional(),
    intensidad_despues: Joi.number().optional(),
    id_emocion_relacionada: Joi.number().optional(),
    resultado: Joi.string().optional(),
    estado: Joi.string().optional()
});

router.use(authMiddleware);

router.get('/library', practicesController.getLibrary);
router.post('/sessions', validate(createSessionSchema), practicesController.createSession);
router.get('/sessions', practicesController.getSessions);

module.exports = router;
