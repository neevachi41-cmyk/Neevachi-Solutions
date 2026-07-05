import mongoose from 'mongoose';

const printOrderSchema = new mongoose.Schema({
  // Customer info
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String },
  notes: { type: String },

  // Print settings
  printer: { type: String, required: true },
  material: { type: String, required: true },
  color: { type: String, required: true },
  infill: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  supports: { type: Boolean, default: true },
  postProcessing: { type: String, default: 'none' },

  // Uploaded files summary (names + sizes, no actual files)
  files: [{
    name: { type: String },
    size: { type: Number },
    volume: { type: Number },
    estimatedWeight: { type: Number },
    printTime: { type: String },
    dimensions: {
      x: Number,
      y: Number,
      z: Number
    }
  }],

  // Pricing
  totalPrice: { type: Number, required: true },

  // Order status
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Printing', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  createdAt: { type: Date, default: Date.now }
});

const PrintOrder = mongoose.models.PrintOrder || mongoose.model('PrintOrder', printOrderSchema);
export default PrintOrder;
