const router = require("express").Router();
const { getOneShowcase, getAllShowcase } = require("../controllers/showcase");
const { isLogin } = require("../middlewares/userAuth");

router.get("/:id", isLogin, getOneShowcase);
router.get("/", isLogin, getAllShowcase);

module.exports = router;
