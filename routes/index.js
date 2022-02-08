const express = require("express")
const router = express.Router()
const showcase = require("./showcase")
const appointment = require("./appointment")
const user = require('./user')
const content = require("./content")
const timeslot = require("./timeslot")

router.use("/user", user)
router.use("/appointment", appointment)
router.use("/showcase",showcase)
router.use("/content", content)
router.use("/timeslot", timeslot)

module.exports = router