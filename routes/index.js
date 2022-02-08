const express = require("express")
const router = express.Router()
const showcase = require("./showcase")
const user = require('./user')
const project = require('./project')
const favorite = require("./favorite")

router.use("/user", user)
router.use("/showcase",showcase)
router.use("/project",project)
router.use("/favorite",favorite)
module.exports = router