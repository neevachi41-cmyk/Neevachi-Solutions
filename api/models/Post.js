import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  excerpt: { 
    type: String 
  },
  author: { 
    type: String 
  },
  imageUrl: { 
    type: String 
  },
  category: { 
    type: String 
  },
  tags: [{ 
    type: String 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
