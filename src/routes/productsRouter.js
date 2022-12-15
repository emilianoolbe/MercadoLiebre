//Importo express + ejecución Router
const express = require('express');
const router = express.Router();

// Middlewares 
const upload = require('../middlewares/multer-products');
const validationProducts = require('../middlewares/validation-form-products');
const authMiddleware = require('../middlewares/authMiddleware');

//Importo controlador
const productsController = require('../controllers/productsController');

//Rutas

//Muestro productos 
router.get('/ofertas', productsController.ofertas);

//Creación de producto
router.get('/crear', authMiddleware, productsController.crear);
router.post('/crear', upload.single('img'), validationProducts, productsController.guardar); // upload.método('name del input')

//Detalle de producto
router.get('/detalle/:id', productsController.detalle);

//Edición de producto
router.get('/editar/:id', authMiddleware, productsController.editar);
router.put('/editar/:id', upload.single('img'), validationProducts, productsController.update); // upload.método('name del input')

//Borrado de producto
router.delete('/:id', authMiddleware, productsController.borrar);

//Carrito de compras
router.get('/carrito', authMiddleware, productsController.carrito);

module.exports = router;