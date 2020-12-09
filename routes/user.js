const { response } = require("express");

const express = require("express"); 

const router = express.Router();

const authController = require("../controller/user");
const auth = require("../middleware/checkAuth");
const { model } = require("../model/user");



router.post("/signup", authController.getSignup); 

router.post("/login", authController.Login);
router.get("/", auth, authController.getUserDetails);

module.exports = router; 