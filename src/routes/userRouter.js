//Importo express
const express = require("express");

//Ejectuo método router
const router = express.Router();

//Importo Validaciones
const validationUsers = require('../middlewares/validation-form-users');
const upload = require('../middlewares/multer-users');
const validationLoggin = require('../middlewares/validation-Loggin');

//Importo controlador
const userController = require("../controllers/usercontroller"); 

//Ruteo (ruta + controlador.método)

//Todos los usuarios
router.get('/allUsers', userController.allUsers);

//Nuevo usuario
router.get('/form-crear-usuario', userController.register);
router.post('/form-crear-usuario', upload.single('img'), validationUsers, userController.newUser);

//Edición usuario
router.get('/form-editar-usuario/:id', userController.edit);
router.put('/form-editar-usuario/:id', upload.single('img'), validationUsers, userController.update);

//Borrado usuario
router.delete('/:id', userController.delete);

//Login
router.get('/ingresa', userController.login);
router.post('/ingresa', validationLoggin, userController.processLogin);


module.exports = router;