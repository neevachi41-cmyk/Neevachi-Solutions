import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../lib/passport.js';
import User from '../models/User.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user (password will be hashed by the model pre-save hook)
    const user = await User.create({ email, password, name, provider: 'local' });
    
    // Create token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ message: 'User registered', token, user: user.toSafeObject() });
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Verify password using the model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ message: 'Login successful', token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create admin user (temporary endpoint for initial setup)
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;
    
    // Check for secret key to prevent unauthorized admin creation
    if (secretKey !== process.env.ADMIN_SECRET_KEY && secretKey !== 'neevachi-admin-setup-2024') {
      return res.status(403).json({ message: 'Invalid secret key' });
    }
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }
    
    // Create admin user
    const admin = await User.create({
      email,
      password,
      role: 'admin'
    });
    
    res.status(201).json({ 
      message: 'Admin user created successfully',
      user: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      // Redirect to frontend with token
      res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:5173'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toSafeObject()))}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:5173'}/login?error=auth_failed`);
    }
  }
);

// Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:5173'}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user.toSafeObject()))}`);
    } catch (error) {
      console.error('Facebook callback error:', error);
      res.redirect(`${process.env.CORS_ORIGIN || 'http://localhost:5173'}/login?error=auth_failed`);
    }
  }
);

export default router;
