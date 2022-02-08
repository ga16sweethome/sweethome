const router = require("express").Router()
const { getAll } = require("../controllers/appointment")

router.get("/", getAll)

module.exports = router