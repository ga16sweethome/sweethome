<<<<<<< HEAD
// const express = require("express");
const router = require("express").Router();
const {
  getOne,
  register,
  login,
  updateProfile,
} = require("../controllers/user");
const { isLogin } = require("../middlewares/userAuth");
const { uploadCloudinary } = require("../middlewares/uploadFile");

router.get("/", isLogin, getOne);
router.post("/register", register);
router.post("/login", login);
router.post("/profile", isLogin, uploadCloudinary("picture"), updateProfile); //update profiles
module.exports = router;
=======
const router = require("express").Router()
const { getOne, getPicture } = require("../controllers/user")
const passport = require("../config/passport")
const {facebookCallback, googleCallback} = require('../controllers/passportCont')

router.get("/facebook",passport.authenticate("facebook",{scope: ['email'] } ))
router.get("/facebook/callback",passport.authenticate('facebook', { failureRedirect: 'https://localhost:3000/api/v1/facebook' }), facebookCallback)
router.get("/", getOne)
router.get("/gallery", getPicture)

router.get("/google",passport.authenticate('google', { scope: ['profile','email'] }))
router.get("/google/callback",passport.authenticate('google', { failureRedirect: '/api/v1/auth/google' }), googleCallback)

module.exports = router
>>>>>>> features/mvp/oauth
