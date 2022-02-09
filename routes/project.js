const router = require("express").Router();
const {
  getAllProjectByUser,
  uploadReceipt,
  requestCancelProject,
} = require("../controllers/project");
const { isLogin } = require("../middlewares/userAuth");

router.get("/", isLogin, getAllProjectByUser);
router.post("/receipt/:id", isLogin, uploadReceipt);
router.post("/requestcancel/:id", isLogin, requestCancelProject);
module.exports = router;
