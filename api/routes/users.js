import express from 'express';
import User from '../models/User.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/users — Get all users (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/users/:id — Get single user (admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/users — Create user (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { email, password, name, role = 'user' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const user = await User.create({ email, password, name, role, provider: 'local' });
    res.status(201).json(user.toSafeObject());
  } catch (error) {
    console.error('Create user error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/users/:id — Update user (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { email, name, role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, name, role, isActive },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/users/:id — Delete user (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    // Prevent deleting yourself
    if (req.params.id === req.user.userId) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
