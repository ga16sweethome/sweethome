const router = require("express").Router()
const { getAllProjectByUser, uploadReceipt, check } = require("../controllers/project")
const { isLogin } = require("../middlewares/userAuth")

router.get("/",isLogin, getAllProjectByUser)
router.post("/receipt/:id",isLogin, uploadReceipt)
router.get("/a",check)
module.exports = router