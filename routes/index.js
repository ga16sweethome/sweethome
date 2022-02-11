const express = require("express");
const router = express.Router();
const homepage = require("./homepage");
const showcase = require("./showcase");
const user = require("./user");
const content = require("./content");
const timeslot = require("./timeslot");
const project = require("./project");
const favorite = require("./favorite");
const appointment = require("./appointment");

router.use("/homepage", homepage);
router.use("/user", user);
router.use("/showcase", showcase);
router.use("/content", content);
router.use("/timeslot", timeslot);
router.use("/appointment", appointment);
router.use("/project", project);
router.use("/favorite", favorite);

module.exports = router;
