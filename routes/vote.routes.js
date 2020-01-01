const router = require("express").Router();
const controller = require("../controllers/polls.controller");

router.get("/:id", controller.getPoll);
router.put("/:id", controller.updatePoll)

module.exports = app => app.use("/vote", router);
