const router = require("express").Router()
const { getSlot, getAllByServiceType, create } = require("../controllers/timeslot")
const { isAdmin } = require("../middlewares/userAuth")

router.get("/", getSlot)
router.get("/:servicetype", getAllByServiceType)
router.post("/:servicetype", isAdmin, create)

module.exports = router