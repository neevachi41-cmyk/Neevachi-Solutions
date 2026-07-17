import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Replied'],
    default: 'New'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
