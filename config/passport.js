const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require ('passport-facebook').Strategy;
const passport = require('passport')

passport.serializeUser((user, done)=>{
  done(null,user)
})
passport.deserializeUser((user, done)=>{
  done(null,user)
})

passport.use(new GoogleStrategy({
    clientID: "155031898561-jovck60ogljfk0venctel4bndt3pov7p.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://sweethome-app-api.herokuapp.com"
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
    clientID: "909484406435930",
    clientSecret: "efe5b8e6df5b71e518be13cb73e855ca",
    callbackURL: "https://sweethome-app-api.herokuapp.com/api/v1/user/facebook/callback" //facebook oauth nya ga bisa pake localhost kalo pake passport.js,
    //jadi di deploy dulu ya sweetie sweetie ku
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, home);
    // });
  }
));

module.exports = passport