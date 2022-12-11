//express + Router()
const express = require("express");
const router = express.Router();

//Middlewares
const validationUsers = require('../middlewares/validation-form-users');
const upload = require('../middlewares/multer-users');
const validationLoggin = require('../middlewares/validation-Loggin');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Controlador
const userController = require("../controllers/usercontroller"); 

// ---> Ruteo <---

//Nuevo usuario
router.get('/form-crear-usuario', guestMiddleware, userController.register);
router.post('/form-crear-usuario', upload.single('img'), validationUsers, userController.newUser);

//Edición usuario
router.get('/form-editar-usuario/:id', authMiddleware, userController.edit);
router.put('/form-editar-usuario/:id', upload.single('img'), validationUsers, userController.update);

//Borrado usuario
router.delete('/delete/:id',authMiddleware, userController.delete);

//Recuperar usuario
router.get('/recuperar-usuario', guestMiddleware, userController.restoreUserView);
router.post('/recuperar-usuario', guestMiddleware, userController.restoreUser);
//Login
router.get('/ingresa', guestMiddleware, userController.login);
router.post('/ingresa', validationLoggin, userController.processLogin);

//Profile
router.get('/profile', authMiddleware, userController.profile);

//Logout
router.get('/logout', authMiddleware, userController.logout);

module.exports = router;