import express from 'express';
import Contact from '../models/Contact.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact — Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    
    // Save to MongoDB
    const newContact = await Contact.create({ name, email, phone, subject, message });
    
    res.status(201).json({ 
      message: 'Thank you! Your message has been received. We will contact you shortly.',
      contact: newContact 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/contact — Get all contacts (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json({ count: contacts.length, contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/contact/:id/status — Update contact status (admin only)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Read', 'Replied'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be New, Read, or Replied.' });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/contact/:id (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
