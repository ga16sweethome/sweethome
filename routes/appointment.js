const router = require("express").Router()
const { getAll, create } = require("../controllers/appointment")
const { isLogin } = require("../middlewares/userAuth")

router.get("/", isLogin, getAll)
router.post("/", isLogin, create)

module.exports = router