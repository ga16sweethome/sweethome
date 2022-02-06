const router = require("express").Router()
const { getOne } = require("../controllers/user")

router.get("/", getOne)

module.exports = router