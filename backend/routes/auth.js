import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user (in a real app, this would be a database model)
const users = [];

// Register route
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // In a real app, you would hash the password before saving
  const user = { id: Date.now().toString(), email, password };
  users.push(user);
  
  // Create token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: '1h' }
  );
  
  res.status(201).json({ message: 'User registered', token });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email);
  
  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Create token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: '1h' }
  );
  
  res.json({ message: 'Login successful', token });
});

export default router;
