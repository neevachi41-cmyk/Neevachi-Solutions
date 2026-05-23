import jwt from 'jsonwebtoken';

// Mock user storage (in production, use a database)
let users = [];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
}
