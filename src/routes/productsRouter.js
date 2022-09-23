//Importo controlador
const productsController = require('../controllers/productsController');

//Importo express
const express = require('express');

//Ejectuo método router
const router = express.Router();

/*Ruteo (ruta + controlador.método)

Muestro productos */
router.get('/ofertas', productsController.ofertas);


//Creación de producto
router.get('/crear', productsController.crear);
router.post('/crear', productsController.guardar);

//Detalle de producto
router.get('/detalle/:id?', productsController.detalle);

//Edición de producto
//router.get('/editar/:id', userController.edit);
//router.put('/editar', userController.update);

/*
//Borrado de producto
router.delete('/editar/:id', userController.delete);


*/
module.exports = router;