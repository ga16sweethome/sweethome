const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require ('passport-facebook').Strategy;
const passport = require('passport')


passport.use(new GoogleStrategy({
    clientID: "155031898561-jovck60ogljfk0venctel4bndt3pov7p.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: "909484406435930",
    clientSecret: "efe5b8e6df5b71e518be13cb73e855ca",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport