const router = require("express").Router();
const facebookCallback = require("../controllers/passportCont");
// const passport = require('../config/passport')

// router.get("/facebook",passport.authenticate("facebook",{scope: ['email'] } ))
// router.get("/facebook/callback",passport.authenticate('facebook', { failureRedirect: 'https://localhost:5000/api/v1/homepage/facebook' }), facebookCallback)
router.get("/", async (req, res) => {
  res.status(200).json({
    status: "SELAMAT DATANG",
  });
});

module.exports = router;
