const router = require("express").Router();
const {
  getOneShowcase,
  offset,
  getAllShowcase,
} = require("../controllers/showcase");
const { getPicture } = require("../controllers/user");

router.get("/:id", getOneShowcase);
router.get("/", getAllShowcase);
router.get("/home/pic", getPicture);
module.exports = router;
