import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Get all active services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all services (admin - includes inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single service
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

// Create new service
router.post('/', async (req, res) => {
  try {
    const savedService = await Service.create(req.body);
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(400).json({ message: 'Error creating service', error: error.message });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
  	  req.body,
  	  { new: true }
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

// Delete service
router.delete('/:id', async (req, res) => {
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
