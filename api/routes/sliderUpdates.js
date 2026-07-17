import express from 'express';
import SliderUpdate from '../models/SliderUpdate.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/slider-updates — Get all active slider items (public)
router.get('/', async (req, res) => {
  try {
    const updates = await SliderUpdate.find({ isActive: true }).sort({ order: 1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slider updates', error: error.message });
  }
});

// GET /api/slider-updates/admin/all — Get all incl. inactive (admin only)
router.get('/admin/all', authenticate, isAdmin, async (req, res) => {
  try {
    const updates = await SliderUpdate.find({}).sort({ order: 1 });
    res.json({ count: updates.length, updates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slider updates', error: error.message });
  }
});

// GET /api/slider-updates/:id — Get single slider item
router.get('/:id', async (req, res) => {
  try {
    const update = await SliderUpdate.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Slider update not found' });
    }
    res.json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slider update', error: error.message });
  }
});

// POST /api/slider-updates — Create slider item (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ message: 'Title and imageUrl are required.' });
    }
    const savedUpdate = await SliderUpdate.create(req.body);
    res.status(201).json(savedUpdate);
  } catch (error) {
    res.status(400).json({ message: 'Error creating slider update', error: error.message });
  }
});

// PUT /api/slider-updates/:id — Update slider item (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const update = await SliderUpdate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!update) {
      return res.status(404).json({ message: 'Slider update not found' });
    }
    res.json(update);
  } catch (error) {
    res.status(400).json({ message: 'Error updating slider update', error: error.message });
  }
});

// DELETE /api/slider-updates/:id — Delete slider item (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const update = await SliderUpdate.findByIdAndDelete(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Slider update not found' });
    }
    res.json({ message: 'Slider update deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting slider update', error: error.message });
  }
});

// PATCH /api/slider-updates/:id/toggle — Toggle active status (admin only)
router.patch('/:id/toggle', authenticate, isAdmin, async (req, res) => {
  try {
    const update = await SliderUpdate.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Slider update not found' });
    }
    update.isActive = !update.isActive;
    await update.save();
    res.json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling slider update', error: error.message });
  }
});

export default router;
