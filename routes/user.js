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
