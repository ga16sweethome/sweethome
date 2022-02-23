const router = require("express").Router();
const {
  getOne,
  register,
  login,
  updateProfile,
  forgotPass,
  resetPassword,
  createAdmin,
} = require("../controllers/user");
const { isLogin, isAdmin } = require("../middlewares/userAuth");
const { uploadCloudinary } = require("../middlewares/uploadFile");
const passport = require("../config/passport");
const {
  facebookCallback,
  googleCallback,
} = require("../controllers/passportCont");

router.get("/", isLogin, getOne);
router.post("/register", register);
router.post("/login", login);
router.post("/profile", isLogin, uploadCloudinary("picture"), updateProfile); //update profiles
router.post("/forgot", forgotPass);
router.post("/reset", resetPassword);
router.post("/admin", isAdmin, createAdmin);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://thesweethome.netlify.app/login",
  }),
  facebookCallback
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://thesweethome.netlify.app/login", //rediredct ke fe
  }),
  googleCallback
);

module.exports = router;
