//Requiero express + controllador de API + ejecución de Router()
const express = require('express');
const router = express.Router();
const apiProductsController = require('../controllers/apiProductsController');

//ENDPOINTS
router.get('/productApi/:id', apiProductsController.product);

module.exports = router;