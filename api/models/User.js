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
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password before saving
userSchema.pre('save', function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
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
    isActive: this.isActive,
    createdAt: this.createdAt
  };
};

// Delete cached model to prevent OverwriteModelError in dev
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', userSchema);

export default User;
