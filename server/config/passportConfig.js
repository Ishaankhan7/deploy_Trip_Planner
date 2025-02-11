const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const AppleStrategy = require('passport-apple');
const dotenv = require('dotenv')
dotenv.config();
const UserModel = require('../Models/userModel');

// Serialize and deserialize users
passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize user by its unique ID (or use email, googleId)
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  

// Google Strategy
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if a user already exists with the Google email
          const existingUser = await UserModel.findOne({ email: profile.emails[0].value });
  
          if (existingUser) {
            // If user exists, return the user
            return done(null, existingUser);
          }
  
          // If user does not exist, create a new one
          const newUser = await UserModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            location: '', 
            googleId: profile.id, 
          });
  
          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  
  
  


// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserModel.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await UserModel.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          userName: profile.id,
          location: '',
        });
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Apple Strategy
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
      callbackURL: '/auth/apple/callback',
    },
    async (accessToken, refreshToken, idToken, profile, done) => {
      try {
        const existingUser = await UserModel.findOne({ userName: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await UserModel.create({
          name: profile.name || 'Apple User',
          email: profile.email || `${profile.id}@apple.com`,
          userName: profile.id,
          location: '',
        });
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
