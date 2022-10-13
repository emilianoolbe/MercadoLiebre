const { body } = require('express-validator');

let errors = [
    body('email').notEmpty().withMessage('Complete el campo email')
        .isEmail().withMessage('Ingrese un valor de tipo email'),
    body('password').notEmpty().withMessage('Ingrese su contraseña')
];

module.exports = errors;