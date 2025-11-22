const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(409).json({ success: false, message: error.message });
        }
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { correo, password } = req.body;
        const { user, token } = await authService.login(correo, password);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { user, token }
        });
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ success: false, message: error.message });
        }
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe
};
