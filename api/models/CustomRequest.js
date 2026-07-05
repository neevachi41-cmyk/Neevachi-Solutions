import mongoose from 'mongoose';

const customRequestSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  specialRequirements: { type: String },
  budget: { type: String },
  timeline: { type: String },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },

  // Admin status tracking
  status: {
    type: String,
    enum: ['New', 'Reviewing', 'Quoted', 'Accepted', 'Rejected'],
    default: 'New'
  },
  adminNotes: { type: String },

  createdAt: { type: Date, default: Date.now }
});

const CustomRequest = mongoose.models.CustomRequest || mongoose.model('CustomRequest', customRequestSchema);
export default CustomRequest;
