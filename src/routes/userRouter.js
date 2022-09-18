//Importo controlador
const userController = require("../controllers/usercontroller"); 

//Importo express
const express = require("express");

//Ejectuo método router
const router = express.Router();

//Ruteo (ruta + controlador.método)
router.get("/ingresa", userController.login);
router.get('/register', userController.register);

module.exports = router;