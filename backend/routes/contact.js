import express from 'express';

const router = express.Router();

// In-memory storage for contacts (in a real app, this would be a database)
let contacts = [];

// Submit contact form
router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  // In a real app, you would save this to a database
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  
  contacts.push(newContact);
  
  res.status(201).json({ 
    message: 'Contact form submitted successfully',
    contact: newContact 
  });
});

// Get all contacts (protected route, would require authentication in a real app)
router.get('/', (req, res) => {
  res.json(contacts);
});

export default router;
