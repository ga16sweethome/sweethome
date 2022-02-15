const {
  getAllAppointment,
  getAllCountAppointment,
  getAllCountProject,
} = require("../controllers/overview");

const router = require("express").Router();

router.get("/", getAllAppointment);
router.get("/appointment", getAllCountAppointment);
router.get("/project", getAllCountProject);
module.exports = router;
