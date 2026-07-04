import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Save to MongoDB using Mongoose
    const newContact = await Contact.create({ name, email, message });
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contact: newContact 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contacts (protected route, would require authentication in a real app)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
