const joi = require("joi");
const {User, Profile} = require("../models");
const {hashPassword, comparePassword} = require("../helpers/bcrypt");
const {generateToken} = require("../helpers/jwt");

module.exports = {
googleCallback : async (req,res) => {
    const profile = req.user._json
    let user
    try {
      console.log(req.user._json)
      user = await User.findOne({where :{email:profile.email}});
      console.log(user)
      if (!user){
        user = await User.create({email : profile.email,lastName : profile.family_name,firstName:profile.given_name , password :""})
      }

      const token = generateToken({
        id: profile.id,
        email: profile.email,
      });
      res.redirect("/api/v1/home" + token) //redirect tinggal di ubah mau ke api yg mana? disini ke halaman events
    } catch (error) {
      
      errorHandler (res,error)
    }
  },

  facebookCallback : async (req,res) => {
    const profile = req.user._json
    let user
    try {
      console.log(req.user._json)
      user = await User.findOne({where :{email:profile.email}});
      console.log(user)
      if (!user){
        user = await User.create({
          email : profile.email,
          firstName:profile.given_name ,
          lastName : "",
           password :""})
      }

      const token = generateToken({
        id: profile.id,
        email: profile.email,
      });
      res.redirect("/api/v1/home" + token)
    } catch (error) {
      
      errorHandler (res,error)
    }
  },
};
