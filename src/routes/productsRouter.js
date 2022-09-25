//Importo controlador
const productsController = require('../controllers/productsController');

//Importo express
const express = require('express');

//Ejectuo método router
const router = express.Router();

//Importo path

const path = require('path');

//Importo Multer
const multer = require('multer');

//Seteo multer (indico donde guardo file + nombre)
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/imagenes'))
    },
    filename: (req, file, cb) =>{
        //creo el nombre de la imagen (concateno el string + fecha en ms + extensión original)
        let nuevaImg = 'products-' + Date.now() + path.extname(file.originalname);
        cb(null, nuevaImg)
    }
})

//Ejecuto multer con la config anterior para agregarlo a la ruta
const upload = multer({storage : storage});

//Rutas

//Muestro productos 
router.get('/ofertas', productsController.ofertas);

//Creación de producto
router.get('/crear', productsController.crear);
router.post('/crear', productsController.guardar); // upload.método('name del input')

//Detalle de producto
router.get('/detalle/:id', productsController.detalle);

//Edición de producto
router.get('/editar/:id', productsController.editar);
router.put('/editar/:id', productsController.update);

//Borrado de producto
router.delete('/:id', productsController.borrar);


module.exports = router;