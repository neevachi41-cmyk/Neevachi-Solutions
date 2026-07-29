import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

async function checkUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected!\n');

    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    
    for (const user of users) {
      console.log(`- Email: ${user.email}`);
      console.log(`  Name: ${user.name || 'N/A'}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Provider: ${user.provider}`);
      console.log(`  Has password: ${!!user.password}`);
      console.log(`  Password length: ${user.password?.length || 0}`);
      console.log('');
    }

    // Create a test user if none exist with valid passwords
    const testEmail = 'test@neevachi.com';
    const testUser = await User.findOne({ email: testEmail });
    
    if (!testUser) {
      console.log('Creating test user with manually hashed password...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      
      // Direct insertion to bypass pre-save hook
      await mongoose.connection.collection('users').insertOne({
        name: 'Test User',
        email: testEmail,
        password: hashedPassword,
        role: 'admin',
        provider: 'local',
        isActive: true,
        createdAt: new Date()
      });
      console.log('✅ Test user created:');
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: password123`);
    } else {
      console.log('Test user already exists:');
      console.log(`   Email: ${testEmail}`);
      console.log(`   Password: password123 (try resetting if it doesn't work)`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkUsers();
