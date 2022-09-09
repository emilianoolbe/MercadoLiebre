const loginController = require("../controllers/logincontroller"); 
const express = require("express");
const routerLogin = express.Router();

routerLogin.get("/ingresa", loginController.login);

module.exports = routerLogin;