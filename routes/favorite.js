const router = require("express").Router()
const { getAllFavoriteByUserId, createFavorite,deleteFavorite } = require("../controllers/favorite")

router.get("/:id",getAllFavoriteByUserId)   //sementara userId :id ngambil dari params, nunggu tokennya dibuat
router.post("/:showcaseId",createFavorite)
router.delete(":showcaseId/",deleteFavorite)

module.exports = router