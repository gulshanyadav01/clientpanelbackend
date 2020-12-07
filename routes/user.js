const { response } = require("express");

const express = require("express"); 

const router = express.Router();

const authController = require("../controller/user");
const { model } = require("../model/user");

router.post("/signup", authController.getSignup); 

router.post("/login", authController.Login);

module.exports = router; 