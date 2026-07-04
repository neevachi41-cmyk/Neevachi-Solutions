import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  year: { 
    type: String 
  },
  image: { 
    type: String 
  },
  technologies: [{ 
    type: String 
  }],
  status: { 
    type: String, 
    enum: ['Completed', ' In Progress', 'Upcoming'],
    default: 'Completed'
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
  }
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
