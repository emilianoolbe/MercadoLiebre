//Importo controlador
const homeController = require("../controllers/homecontroller");

//Importo express
const express = require("express");

//Ejecuto método router
const router = express.Router();

//Ruteo (ruta + controlador.método)
router.get("/", homeController.home);

module.exports = router;