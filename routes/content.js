const { getServiceType, getBuildingType, getSection, getStyle } = require("../controllers/content")

const router = require("express").Router()

router.get("/servicetype", getServiceType)
router.get("/buildingtype", getBuildingType)
router.get("/section", getSection)
router.get("/style", getStyle)

module.exports = router