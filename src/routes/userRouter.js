//Importo controlador
const userController = require("../controllers/usercontroller"); 

//Importo express
const express = require("express");

//Ejectuo método router
const router = express.Router();

//Ruteo (ruta + controlador.método)
router.get("/ingresa", userController.login);
router.get('/register', userController.register);
router.get('/editar/:id', userController.edit);
router.put('/editar', userController.update);
router.delete('/editar/:id', userController.delete);

module.exports = router;