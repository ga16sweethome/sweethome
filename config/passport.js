const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require ('passport-facebook').Strategy;



passport.use(new GoogleStrategy({
    clientID: "process.env.GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "google.com"
    
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret:  process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: ""
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport