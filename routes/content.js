const {
  getServiceType,
  createServiceType,
  getBuildingType,
  createBuildingType,
  getSection,
  createSection,
  getStyle,
  createStyle,
  getprojectType,
  createProjectType,
} = require("../controllers/content");
const { isAdmin } = require("../middlewares/userAuth");
const router = require("express").Router();

router.get("/servicetype", getServiceType);
router.post("/servicetype", isAdmin, createServiceType);
router.get("/buildingtype", getBuildingType);
router.post("/buildingtype", isAdmin, createBuildingType);
router.get("/section", getSection);
router.post("/section", isAdmin, createSection);
router.get("/style", getStyle);
router.post("/style", isAdmin, createStyle);
router.get("/projectType", getprojectType);
router.post("/projectType", isAdmin, createProjectType);
module.exports = router;
