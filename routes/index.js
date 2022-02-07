const express = require("express")
const router = express.Router()
const showcase = require("./showcase")
const appointment = require("./appointment")
const user = require('./user')

router.use("/user", user)
router.use("/appointment", appointment)
router.use("/showcase",showcase)
module.exports = router