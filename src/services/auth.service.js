const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuarios');

const register = async (userData) => {
    const { nombre, correo, password, genero, carrera, ciclo, consentimiento } = userData;

    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usuario.create({
        nombre,
        correo,
        clave_hash: hashedPassword,
        genero,
        carrera,
        ciclo,
        consentimiento,
        fecha_registro: new Date()
    });

    return newUser;
};

const login = async (correo, password) => {
    const user = await Usuario.findOne({ where: { correo } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.clave_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id_usuario, correo: user.correo },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '24h' }
    );

    return { user, token };
};

const getMe = async (userId) => {
    const user = await Usuario.findByPk(userId, {
        attributes: { exclude: ['clave_hash'] }
    });
    return user;
};

module.exports = {
    register,
    login,
    getMe
};
