import express from 'express';
import PrintOrder from '../models/PrintOrder.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/print-orders — Submit a new 3D print order (public)
router.post('/', async (req, res) => {
  try {
    const {
      customerName, customerEmail, customerPhone, customerAddress, notes,
      printer, material, color, infill, quantity, supports, postProcessing,
      files, totalPrice
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ message: 'Customer name, email and phone are required.' });
    }
    if (!printer || !material || !color) {
      return res.status(400).json({ message: 'Print settings (printer, material, color) are required.' });
    }
    if (!totalPrice) {
      return res.status(400).json({ message: 'Total price is required.' });
    }

    const order = await PrintOrder.create({
      customerName, customerEmail, customerPhone, customerAddress, notes,
      printer, material, color,
      infill: infill || 30,
      quantity: quantity || 1,
      supports: supports !== undefined ? supports : true,
      postProcessing: postProcessing || 'none',
      files: files || [],
      totalPrice,
      status: 'Pending'
    });

    res.status(201).json({
      message: 'Print order submitted successfully! We will contact you shortly.',
      orderId: order._id,
      order
    });
  } catch (error) {
    console.error('Create print order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/print-orders — Get all orders (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await PrintOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get print orders error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/print-orders/:id — Get single order (admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const order = await PrintOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/print-orders/:id/status — Update order status (admin only)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await PrintOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/print-orders/:id — Delete order (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const order = await PrintOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
