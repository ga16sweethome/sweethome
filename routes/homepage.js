const router = require('express').Router()
const facebookCallback = require('../controllers/passportCont')

router.get("/facebook",passport.authenticate("facebook",{scope: ['email'] } ))
router.get("/facebook/callback",passport.authenticate('facebook', { failureRedirect: 'https://localhost:3000/api/v1/facebook' }), facebookCallback)
router.get("/",async(req,res)=>{
    res.status(200).json({
      status : "SELAMAT DATANG"
    })
  })

module.exports = router