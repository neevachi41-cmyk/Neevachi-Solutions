import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User.js';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 
      $or: [
        { providerId: profile.id, provider: 'google' },
        { email: profile.emails[0].value }
      ]
    });

    if (user) {
      // Update existing user with Google info if needed
      if (!user.providerId) {
        user.provider = 'google';
        user.providerId = profile.id;
        user.name = user.name || profile.displayName;
        user.avatar = user.avatar || profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    // Create new user from Google profile
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      provider: 'google',
      providerId: profile.id,
      avatar: profile.photos[0]?.value,
      password: undefined // OAuth users don't need passwords
    });

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails', 'photos']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 
      $or: [
        { providerId: profile.id, provider: 'facebook' },
        { email: profile.emails?.[0]?.value }
      ]
    });

    if (user) {
      if (!user.providerId) {
        user.provider = 'facebook';
        user.providerId = profile.id;
        user.name = user.name || profile.displayName;
        user.avatar = user.avatar || profile.photos[0]?.value;
        await user.save();
      }
      return done(null, user);
    }

    user = await User.create({
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      provider: 'facebook',
      providerId: profile.id,
      avatar: profile.photos[0]?.value,
      password: undefined
    });

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
