import jwt from 'jsonwebtoken';

// Mock user storage (in production, use a database)
let users = [];

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = { id: Date.now().toString(), email, password };
  users.push(user);

  // Create token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    { expiresIn: '1h' }
  );

  res.status(201).json({ message: 'User registered', token });
}
