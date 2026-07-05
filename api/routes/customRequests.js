import express from 'express';
import CustomRequest from '../models/CustomRequest.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/custom-requests — Submit a custom product request (public)
router.post('/', async (req, res) => {
  try {
    const {
      productType, description, quantity,
      specialRequirements, budget, timeline,
      contactEmail, contactPhone
    } = req.body;

    if (!productType || !description || !contactEmail) {
      return res.status(400).json({ message: 'Product type, description and email are required.' });
    }

    const request = await CustomRequest.create({
      productType, description,
      quantity: quantity || 1,
      specialRequirements, budget, timeline,
      contactEmail, contactPhone,
      status: 'New'
    });

    res.status(201).json({
      message: 'Custom product request submitted! Our team will review and contact you within 24 hours.',
      requestId: request._id,
      request
    });
  } catch (error) {
    console.error('Create custom request error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/custom-requests — Get all requests (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const requests = await CustomRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/custom-requests/:id (admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const request = await CustomRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/custom-requests/:id/status — Update status (admin only)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const request = await CustomRequest.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/custom-requests/:id (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const request = await CustomRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
