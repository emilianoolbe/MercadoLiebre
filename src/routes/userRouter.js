const userController = require("../controllers/usercontroller"); 
const express = require("express");
const router = express.Router();

router.get("/ingresa", userController.login);
router.get('/register', userController.register);

module.exports = router;