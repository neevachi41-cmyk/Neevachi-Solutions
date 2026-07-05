import express from 'express';
import PcbOrder from '../models/PcbOrder.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/pcb-orders — Submit a PCB order (public)
router.post('/', async (req, res) => {
  try {
    const {
      customerName, customerEmail, customerPhone,
      layers, pcbQty, differentDesign, deliveryFormat,
      pcbThickness, pcbColor, surfaceFinish, outerCopperWeight,
      removeOrderNumber, pcbRemark,
      uploadedFileName, modelVolume, modelDimensions,
      calculatedPrice
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ message: 'Customer name, email and phone are required.' });
    }
    if (!layers || !pcbQty) {
      return res.status(400).json({ message: 'PCB layers and quantity are required.' });
    }

    const order = await PcbOrder.create({
      customerName, customerEmail, customerPhone,
      layers, pcbQty, differentDesign, deliveryFormat,
      pcbThickness, pcbColor, surfaceFinish, outerCopperWeight,
      removeOrderNumber, pcbRemark,
      uploadedFileName, modelVolume, modelDimensions,
      calculatedPrice,
      status: 'Pending'
    });

    res.status(201).json({
      message: 'PCB order submitted successfully! Our team will review and contact you within 24 hours.',
      orderId: order._id,
      order
    });
  } catch (error) {
    console.error('Create PCB order error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/pcb-orders — Get all orders (admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const orders = await PcbOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/pcb-orders/:id — Get single order (admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const order = await PcbOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/pcb-orders/:id/status — Update order status (admin only)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await PcbOrder.findByIdAndUpdate(
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

// DELETE /api/pcb-orders/:id — Delete order (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const order = await PcbOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
