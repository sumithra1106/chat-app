const express = require("express");
const route = express.Router();
const { authController } = require("../controllers/index");

route.get("/auth/check-email", authController.checkEmail);
route.get("/auth/check-username", authController.checkUsername);
route.get("/auth/register", authController.register);

module.exports = route;
