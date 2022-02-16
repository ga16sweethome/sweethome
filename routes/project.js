const router = require("express").Router();
const {
  getAllProjectByUser,
  uploadReceiptClient,
  requestCancelProject,
  getAllProjectByAdmin,
} = require("../controllers/project");
const { uploadCloudinary } = require("../middlewares/uploadFile");
const { isLogin, isAdmin } = require("../middlewares/userAuth");

router.get("/", isLogin, getAllProjectByUser);
router.post(
  "/receipt/:id",
  isLogin,
  uploadCloudinary("uploadReceipt"),
  uploadReceiptClient
);
router.post("/requestcancel/:id", isLogin, requestCancelProject);

router.get("/admin", getAllProjectByAdmin);
module.exports = router;
