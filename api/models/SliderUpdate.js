import mongoose from 'mongoose';

const sliderUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  schoolName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    enum: ['Trophy', 'Users', 'Building', 'Settings', 'Award']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

sliderUpdateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const SliderUpdate = mongoose.model('SliderUpdate', sliderUpdateSchema);

export default SliderUpdate;
