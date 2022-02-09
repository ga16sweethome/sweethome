const router = require("express").Router();
const {
  getAllFavoriteByUserId,
  createFavorite,
  deleteFavorite,
  checkFavorite,
} = require("../controllers/favorite");
const { isLogin } = require("../middlewares/userAuth");

router.get("/", isLogin, getAllFavoriteByUserId);
router.post("/:showcaseId", isLogin, createFavorite);
router.delete("/:showcaseId", isLogin, deleteFavorite);
// router.get("/check/:id",isLogin,checkFavorite) perlukah dibuat checkFavorite?
module.exports = router;
