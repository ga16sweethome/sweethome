const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require ('passport-facebook').Strategy;


passport.serializeUser((user, done)=>{
  done(null,user)
})
passport.deserializeUser((user, done)=>{
  done(null,user)
})

passport.use(new GoogleStrategy({
    clientID: "process.env.GOOGLE_CLIENT_ID",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://sweethome-app-api.herokuapp.com/api/v1/user/google/callback"
    
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, profile);
      if(err){
        console.log(err);
      }
    
    // });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret:  process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://sweethome-app-api.herokuapp.com/api/v1/user/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, home);
    // });
  }
));

module.exports = passport