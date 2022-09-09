const homeController = require("../controllers/homecontroller");
const express = require("express");
const router = express.Router();

router.get("/", homeController.home);

module.exports = router;