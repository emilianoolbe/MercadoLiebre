//Importo express-validator
const { body } = require("express-validator")
//Importo path
const path = require('path');

//Validaciones form productos
const errors = [
    body('nombre').notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({min : 5}).withMessage('Minimo 5 Caracteres '),
    body('precio').notEmpty().withMessage('El producto debe tener un precio'),
    body('categoria').notEmpty().withMessage('Seleccione una categoría'),
    body('descripcion').notEmpty().withMessage('Debe agregar una descripción'),
    body('img').custom((value, {req}) =>{
        let file = req.file;
        if (!file) {
            throw new Error('Debe agregar una imagen, (*) Las extensiones de imagenes permitidas son: .jpg  .png .gif')
        }
        return true;
    })
];
  

module.exports = errors;