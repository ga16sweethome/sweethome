const router = require("express").Router()
const { getAllProjectById } = require("../controllers/project")

router.get("/:id", getAllProjectById) //sementara userId :id ngambil dari params, nunggu tokennya dibuat
module.exports = router