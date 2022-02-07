const router = require("express").Router()
const { getOne } = require("../controllers/appointment")

router.get("/:id", getOne)
module.exports = router