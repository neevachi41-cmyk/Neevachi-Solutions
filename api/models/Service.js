import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String 
  },
  imageUrl: {
    type: String
  },
  features: [{
    type: String
  }],
  order: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
