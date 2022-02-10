const { getServiceType, createServiceType, getBuildingType, createBuildingType, getSection, createSection, getStyle, createStyle } = require("../controllers/content")

const router = require("express").Router()

router.get("/servicetype", getServiceType)
router.post("/:servicetype", createServiceType)
router.get("/buildingtype", getBuildingType)
router.post("/:buildingtype", createBuildingType)
router.get("/section", getSection)
router.post("/:section", createSection)
router.get("/style", getStyle)
router.post("/:style", createStyle)

module.exports = router