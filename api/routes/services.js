import express from 'express';
import Service from '../models/Service.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/services — Get all active services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/services/admin/all — Get all services incl. inactive (admin only)
router.get('/admin/all', authenticate, isAdmin, async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1 });
    res.json({ count: services.length, services });
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/services/:id — Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/services — Create service (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    const savedService = await Service.create(req.body);
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(400).json({ message: 'Error creating service', error: error.message });
  }
});

// PUT /api/admin/services/:id — Update service (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(400).json({ message: 'Error updating service', error: error.message });
  }
});

// DELETE /api/admin/services/:id — Delete service (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;
