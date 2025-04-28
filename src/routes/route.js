const express = require("express");
const route = express.Router();
const { authController } = require("../controllers/index");

route.get("/auth/check-email", authController.checkEmail);
route.get("/auth/check-username", authController.checkUsername);
route.post("/auth/register", authController.register);
route.get("/auth/verify", authController.verifyToken);
route.get("/auth/login", authController.login);

module.exports = route;
