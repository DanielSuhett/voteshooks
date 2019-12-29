const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/singup", controller.createUser);

router.post("/singin", controller.login);

module.exports = app => app.use(router);
