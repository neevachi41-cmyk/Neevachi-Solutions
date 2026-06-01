import express from 'express';
import SliderUpdate from '../models/SliderUpdate.js';

const router = express.Router();

// Get all slider updates (public endpoint)
router.get('/', async (req, res) => {
  try {
    const updates = await SliderUpdate.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slider updates', error: error.message });
  }
});

// Get all slider updates (admin endpoint - includes inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const updates = await SliderUpdate.find()
      .sort({ order: 1, createdAt: -1 });
    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slider updates', error: error.message });
  }
});

// Get single slider update
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

// Create new slider update
router.post('/', async (req, res) => {
  try {
    const update = new SliderUpdate(req.body);
    const savedUpdate = await update.save();
    res.status(201).json(savedUpdate);
  } catch (error) {
    res.status(400).json({ message: 'Error creating slider update', error: error.message });
  }
});

// Update slider update
router.put('/:id', async (req, res) => {
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

// Delete slider update
router.delete('/:id', async (req, res) => {
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

// Toggle active status
router.patch('/:id/toggle', async (req, res) => {
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
