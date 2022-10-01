//Importo express
const express = require("express");

//Ejectuo método router
const router = express.Router();

//Importo Multer
const upload = require('../middlewares/multer-users');

//Importo controlador
const userController = require("../controllers/usercontroller"); 

//Ruteo (ruta + controlador.método)

//Todos los usuarios
router.get('/allUsers', userController.allUsers);

//Nuevo usuario
router.get('/form-crear-usuario', userController.register);
router.post('/form-crear-usuario', upload.single('img'), userController.newUser);

//Edición usuario
router.get('/form-editar-usuario/:id', userController.edit);
router.put('/form-editar-usuario/:id', upload.single('img'), userController.update);

//Borrado usuario
router.delete('/:id', userController.delete);

//Vista login
router.get('/ingresa', userController.login);


module.exports = router;