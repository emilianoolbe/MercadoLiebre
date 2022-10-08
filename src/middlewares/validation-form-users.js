// Importo express-validator
const { body } = require('express-validator');

//Importo path
const path = require('path');

const errors = [
    body('nombre').notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isLength({min: 5}).withMessage('El nombre debe contener al menos 5 caractéres'),
    body('usuario').notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isLength({min: 2}).withMessage('El usuario debe contener al menos 2 caractéres'),
    body('fechanacimiento').notEmpty().withMessage('Seleccione una fecha de nacimiento'),
    body('tipotransaccion').notEmpty().withMessage('Debe seleccionar si va a comprar o vender'),
    body('interes').notEmpty().withMessage('Seleccione al menos un interés :'),
    body('img').custom((value, {req}) =>{
        if (!req.file) {
            throw new Error('Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif')
        }
        return true;
    }),
    body('password').notEmpty().withMessage('Ingrese una contraseña')
        .isLength({min : 6}).withMessage('Debe contener al menos 6 carctéres')
    
];

module.exports = errors;
