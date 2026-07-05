import mongoose from 'mongoose';

const pcbOrderSchema = new mongoose.Schema({
  // Customer info
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },

  // PCB specs
  layers: { type: String, required: true },
  pcbQty: { type: String, required: true },
  differentDesign: { type: String },
  deliveryFormat: { type: String },
  pcbThickness: { type: String },
  pcbColor: { type: String },
  surfaceFinish: { type: String },
  outerCopperWeight: { type: String },
  removeOrderNumber: { type: String },
  pcbRemark: { type: String },

  // Uploaded file info
  uploadedFileName: { type: String },
  modelVolume: { type: String },
  modelDimensions: {
    x: String,
    y: String,
    z: String
  },

  // Calculated price
  calculatedPrice: { type: Number },

  // Order status
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'In Production', 'Completed', 'Cancelled'],
    default: 'Pending'
  },

  createdAt: { type: Date, default: Date.now }
});

const PcbOrder = mongoose.models.PcbOrder || mongoose.model('PcbOrder', pcbOrderSchema);
export default PcbOrder;
