const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const Joi = require('joi');

const registerSchema = Joi.object({
    nombre: Joi.string().required(),
    correo: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    genero: Joi.string().optional(),
    carrera: Joi.string().optional(),
    ciclo: Joi.string().optional(),
    consentimiento: Joi.boolean().required()
});

const loginSchema = Joi.object({
    correo: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
