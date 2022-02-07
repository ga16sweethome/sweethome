const router = require("express").Router()
const { getOne } = require("../controllers/showcase")

router.get("/:id", getOne)
router.post("/")

module.exports = router