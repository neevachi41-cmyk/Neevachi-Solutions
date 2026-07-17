import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../lib/passport.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// ─────────────────────────────────────────────────
// POST /api/auth/register
// ─────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    
    // Create new user (password is hashed by pre-save hook)
    const user = await User.create({ email, password, name, provider: 'local' });
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ 
      message: 'User registered successfully!', 
      token, 
      user: user.toSafeObject() 
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─────────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if local account
    if (user.provider !== 'local') {
      return res.status(401).json({ 
        message: `This account uses ${user.provider} login. Please use that method.` 
      });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      message: 'Login successful!', 
      token, 
      user: user.toSafeObject() 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─────────────────────────────────────────────────
// GET /api/auth/me — Get current user profile
// ─────────────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─────────────────────────────────────────────────
// POST /api/auth/create-admin — Create admin user
// ─────────────────────────────────────────────────
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, name, secretKey } = req.body;
    
    // Validate secret key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid secret key.' });
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    
    // Create admin user
    const admin = await User.create({
      email,
      password,
      name: name || 'Admin',
      role: 'admin',
      provider: 'local'
    });
    
    res.status(201).json({ 
      message: 'Admin user created successfully!',
      user: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ─────────────────────────────────────────────────
// Google OAuth
// ─────────────────────────────────────────────────
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user;

      // Update last login
      await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toSafeObject()))}`);
    } catch (error) {
      console.error('Google callback error:', error);
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  }
);

// ─────────────────────────────────────────────────
// Facebook OAuth
// ─────────────────────────────────────────────────
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user;

      // Update last login
      await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toSafeObject()))}`);
    } catch (error) {
      console.error('Facebook callback error:', error);
      const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
    }
  }
);

export default router;
