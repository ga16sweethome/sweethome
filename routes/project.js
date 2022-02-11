const router = require("express").Router();
const {
  getAllProjectByUser,
  uploadReceiptClient,
  requestCancelProject,
} = require("../controllers/project");
const { uploadCloudinary } = require("../middlewares/uploadFile");
const { isLogin } = require("../middlewares/userAuth");

router.get("/", isLogin, getAllProjectByUser);
router.post(
  "/receipt/:id",
  isLogin,
  uploadCloudinary("uploadReceipt"),
  uploadReceiptClient
);
router.post("/requestcancel/:id", isLogin, requestCancelProject);
module.exports = router;
