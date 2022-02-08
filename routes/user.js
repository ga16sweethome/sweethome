// const express = require("express");
const router = require("express").Router()
const { getOne, register, login } = require("../controllers/user")

router.get("/", getOne)
router.put("/register", register)
router.get("/login", login)

module.exports = router