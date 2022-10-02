//Importo express-validator
const { body } = require("express-validator")
//Importo path
const path = require('path');

const upload = require('../middlewares/multer-products');

const errors = [
    body('nombre').notEmpty().withMessage('Debe completar el campo').bail()
        .isLength({min : 5}).withMessage('Minimo 5 Caracteres '),
    body('precio').notEmpty().withMessage('El producto debe tener un precio'),
    body('categoria').notEmpty().withMessage('Seleccione una categoría'),
    body('descripcion').notEmpty().withMessage('Debe agregar una descripción'),
    body('img').custom((value, {req}) =>{
        let file = req.file;
        let extensionesAceptadas = ['.jpg', '.png', '.gif' ];
        let fileExtension = path.extname(file.originalname)
        if (!file) {
            throw new Error('Debe agregar una imagen')
        }else{
            if (extensionesAceptadas.includes(fileExtension)) {
                throw new Error('Las extensiones de imagenes permitidas son ' + extensionesAceptadas.join(', '));
            }
        }
        return true;
    })
];  

module.exports = errors;