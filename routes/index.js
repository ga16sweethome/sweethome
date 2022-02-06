const express = require("express")
const router = express.Router()
const user = require("./user")
const appointment = require("./appointment")

router.use("/user", user)
router.use("/appointment", appointment)

module.exports = router