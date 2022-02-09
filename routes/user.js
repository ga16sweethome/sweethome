// const express = require("express");
const router = require("express").Router()
const { getOne, register, login } = require("../controllers/user")
const {  isAdmin } = require("../middlewares/userAuth")

router.get("/", isAdmin,getOne)
router.post("/register", register)
router.post("/login", login)

module.exports = router