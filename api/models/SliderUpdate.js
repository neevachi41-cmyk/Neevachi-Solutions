import mongoose from 'mongoose';

const sliderUpdateSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  link: { 
    type: String 
  },
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

const SliderUpdate = mongoose.models.SliderUpdate || mongoose.model('SliderUpdate', sliderUpdateSchema);

export default SliderUpdate;
