const registerController = require("../controllers/registercontroller");
const express = require("express");
const routerRegister = express.Router();

routerRegister.get("/register", registerController.register);
module.exports = routerRegister;