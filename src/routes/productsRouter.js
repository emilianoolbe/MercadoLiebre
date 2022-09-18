//Importo controlador
const productsController = require('../controllers/productsController');

//Importo express
const express = require('express');

//Ejectuo método router
const router = express.Router();

//Ruteo (ruta + controlador.método)
router.get('/ofertas', productsController.ofertas);
router.get('/detalle/:id?', productsController.detalle)

module.exports = router;