const router = require("express").Router();
const {
  getOneShowcase,
  offset,
  getAllShowcase,
} = require("../controllers/showcase");

router.get("/:id", getOneShowcase);
router.get("/", getAllShowcase);

module.exports = router;
