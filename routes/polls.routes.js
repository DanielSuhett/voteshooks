const router = require("express").Router();
const controller = require("../controllers/polls.controller");

router.get("/", controller.getPolls);

router.get("/:id", controller.getPoll);

router.delete('/:id', controller.deletePoll);

router.put("/:id", controller.updatePoll);

router.post("/create", controller.createPoll);



module.exports = (app, verifyJWT) => app.use("/poll", verifyJWT, router);
