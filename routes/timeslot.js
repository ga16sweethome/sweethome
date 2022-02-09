const router = require("express").Router()
const { getSlot } = require("../controllers/timeslot")

router.get("/", getSlot)

module.exports = router