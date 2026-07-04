import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: false 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: 'user' 
  },
  avatar: {
    type: String
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'twitter'],
    default: 'local'
  },
  providerId: {
    type: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    if (typeof next === 'function') next();
    return;
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    if (typeof next === 'function') next();
  } catch (error) {
    if (typeof next === 'function') next(error);
    throw error;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get safe user data (without password)
userSchema.methods.toSafeObject = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    provider: this.provider,
    createdAt: this.createdAt
  };
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Ensure hooks are registered if model already exists
if (mongoose.models.User) {
  delete mongoose.models.User;
  delete mongoose.connection.models.User;
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
