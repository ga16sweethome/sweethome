const express = require("express");
const router = express.Router();
const showcase = require("./showcase");
const user = require("./user");
const content = require("./content");
const timeslot = require("./timeslot");
const project = require("./project");
const favorite = require("./favorite");
const appointment = require("./appointment");
const overview = require("./overview");
const customer = require("./customer");
const { getPicture } = require("../controllers/user");

router.use("/user", user);
router.use("/showcase", showcase);
router.use("/content", content);
router.use("/timeslot", timeslot);
router.use("/appointment", appointment);
router.use("/project", project);
router.use("/favorite", favorite);
router.use("/", getPicture);
router.use("/overview", overview);
router.use("/customer", customer);

module.exports = router;
