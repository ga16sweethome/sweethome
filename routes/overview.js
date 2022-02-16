const {
  getAllAppointment,
  getAllCountAppointment,
  getAllCountProject,
} = require("../controllers/overview");
const { isAdmin } = require("../middlewares/userAuth");

const router = require("express").Router();

router.get("/", isAdmin, getAllAppointment);
router.get("/appointment", isAdmin, getAllCountAppointment);
router.get("/project", isAdmin, getAllCountProject);
module.exports = router;
