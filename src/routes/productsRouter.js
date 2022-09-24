//Importo controlador
const productsController = require('../controllers/productsController');

//Importo express
const express = require('express');

//Ejectuo método router
const router = express.Router();

//Rutas

//Muestro productos 
router.get('/ofertas', productsController.ofertas);

//Creación de producto
router.get('/crear', productsController.crear);
router.post('/crear', productsController.guardar);

//Detalle de producto
router.get('/detalle/:id', productsController.detalle);

//Edición de producto
router.get('/editar/:id', productsController.editar);
router.put('/editar/:id', productsController.update);

//Borrado de producto
router.delete('/:id', productsController.borrar);


module.exports = router;