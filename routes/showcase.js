const router = require("express").Router()
const { createFavorite } = require("../controllers/favorite")
const { getOneShowcase, getAllShowcase } = require("../controllers/showcase")

router.get("/:id", getOneShowcase)
router.get("/", getAllShowcase)

router.post("/favorite/:showcaseId",createFavorite)

module.exports = router