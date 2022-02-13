const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const passport = require("passport");
const errorHandler = require("../helpers/error-handler");

module.exports = {
  googleCallback: async (req, res) => {
    const profile = req.user._json;

    let user;
    try {
      user = await User.findOne({ where: { email: profile.email } });

      if (!user) {
        user = await User.create({
          email: profile.email,
          lastName: profile.family_name,
          firstName: profile.given_name,
          password: "",
        });
      }

      const token = generateToken({
        id: profile.id,
        email: profile.email,
      });
      res.redirect("/api/v1/user/" + token); // untuk success redirect
    } catch (error) {
      errorHandler(res, error);
    }
  },

  facebookCallback: async (req, res) => {
    const profile = req.user._json;
    let user;
    try {
      console.log(req.user._json);
      user = await User.findOne({ where: { email: profile.email } });
      console.log(user);
      if (!user) {
        user = await User.create({
          email: profile.email,
          firstName: profile.given_name,
          lastName: "",
          password: "",
        });
      }

      const token = generateToken({
        id: profile.id,
        email: profile.email,
      });
      res.redirect("/api/v1/user" + token);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
