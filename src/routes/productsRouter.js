//Importo express
const express = require('express');

//Ejectuo método router
const router = express.Router();

//Importo Multer 
const upload = require('../middlewares/multer-products');

//Importo controlador
const productsController = require('../controllers/productsController');

//Rutas

//Muestro productos 
router.get('/ofertas', productsController.ofertas);

//Creación de producto
router.get('/crear', productsController.crear);
router.post('/crear', upload.single('img'), productsController.guardar); // upload.método('name del input')

//Detalle de producto
router.get('/detalle/:id', productsController.detalle);

//Edición de producto
router.get('/editar/:id', productsController.editar);
router.put('/editar/:id', upload.single('img'), productsController.update); // upload.método('name del input')

//Borrado de producto
router.delete('/:id', productsController.borrar);


module.exports = router;