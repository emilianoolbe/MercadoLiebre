const userController = require("../controllers/usercontroller"); 
const express = require("express");
const routerUser = express.Router();

routerUser.get("/ingresa", userController.login);
routerUser.get('/register', userController.register);

module.exports = routerUser;