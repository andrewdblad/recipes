const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // You can save user data to your database here or perform other actions.
        return done(null, profile);
      }
    )
  );
};

module.exports = setupPassport;


