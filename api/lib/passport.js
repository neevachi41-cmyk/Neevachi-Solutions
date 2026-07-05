import passport from 'passport';
import User from '../models/User.js';

// Only register Google OAuth if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  const { Strategy: GoogleStrategy } = await import('passport-google-oauth20');
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
        if (!user.providerId) {
          user.provider = 'google';
          user.providerId = profile.id;
          user.name = user.name || profile.displayName;
          user.avatar = user.avatar || profile.photos[0]?.value;
          await user.save();
        }
        return done(null, user);
      }

      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        provider: 'google',
        providerId: profile.id,
        avatar: profile.photos[0]?.value,
        password: undefined
      });

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
  console.log('✅ Google OAuth strategy registered');
} else {
  console.log('⚠️  Google OAuth skipped (GOOGLE_CLIENT_ID not set)');
}

// Only register Facebook OAuth if credentials are provided
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  const { Strategy: FacebookStrategy } = await import('passport-facebook');
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
  console.log('✅ Facebook OAuth strategy registered');
} else {
  console.log('⚠️  Facebook OAuth skipped (FACEBOOK_APP_ID not set)');
}

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
