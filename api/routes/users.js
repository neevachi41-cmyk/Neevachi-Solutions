import express from 'express';
import { ObjectId } from 'mongodb';
import User from '../models/User.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const db = User.getDB ? User.getDB() : (await import('../lib/db.js')).getDB();
    const users = await db.collection('users').find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const db = User.getDB ? User.getDB() : (await import('../lib/db.js')).getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) }, { projection: { password: 0 } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create user (admin only)
router.post('/', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;
    const user = await User.createUser({ email, password, role });
    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const db = User.getDB ? User.getDB() : (await import('../lib/db.js')).getDB();
    const { email, role } = req.body;
    
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { email, role, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) }, { projection: { password: 0 } });
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const db = User.getDB ? User.getDB() : (await import('../lib/db.js')).getDB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
