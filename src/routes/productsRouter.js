const productsController = require('../controllers/productsController');
const express = require('express');
const router = express.Router();

router.get('/ofertas', productsController.ofertas);

module.exports = router;