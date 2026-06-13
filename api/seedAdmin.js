import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB using the same connection as the backend
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-web-dream');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@neevachi.in' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      email: 'admin@neevachi.in',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@neevachi.in');
    console.log('Password: admin123');
    console.log('Role: admin');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
