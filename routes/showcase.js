const router = require("express").Router();
const { getOneShowcase, getAllShowcase } = require("../controllers/showcase");
const { isLogin } = require("../middlewares/userAuth");

router.get("/:id", getOneShowcase);
router.get("/", getAllShowcase);

module.exports = router;