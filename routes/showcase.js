const router = require("express").Router()
const { createFavorite } = require("../controllers/favorite")
const { getOneShowcase, getAllShowcase } = require("../controllers/showcase")
const {isLogin} = require("../middlewares/userAuth")

router.get("/:id", isLogin,getOneShowcase)
router.get("/", getAllShowcase)


module.exports = router