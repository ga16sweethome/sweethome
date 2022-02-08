const router = require("express").Router()
const { getAllFavoriteByUserId, createFavorite,deleteFavorite } = require("../controllers/favorite")
const {isLogin} = require("../middlewares/userAuth")

router.get("/",isLogin,getAllFavoriteByUserId)  
router.post("/:showcaseId",isLogin,createFavorite)
router.delete("/:showcaseId",isLogin,deleteFavorite)

module.exports = router