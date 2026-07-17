// test-db.js — MongoDB connection test script
// Run: node test-db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

console.log('🔄 Connecting to MongoDB Atlas...');
console.log('   URI:', uri.replace(/:([^:@]{1,})@/, ':****@')); // Hide password

try {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  console.log('\n✅ MongoDB connection SUCCESSFUL!');
  console.log('   Database:', mongoose.connection.db.databaseName);
  console.log('   Host:', mongoose.connection.host);
  console.log('   State: Connected\n');

  // List all collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  if (collections.length === 0) {
    console.log('📋 No collections found yet. Run: node seed.js to add sample data.');
  } else {
    console.log(`📋 Found ${collections.length} collection(s):`);
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`   → ${col.name} (${count} documents)`);
    }
  }

  console.log('\n🎉 All tests passed! Your MongoDB is working correctly.');
} catch (err) {
  console.error('\n❌ MongoDB connection FAILED!');
  console.error('   Error:', err.message);
  console.error('\n💡 Troubleshooting tips:');
  console.error('   1. Check your MONGODB_URI in the .env file');
  console.error('   2. Make sure your IP is whitelisted on MongoDB Atlas');
  console.error('   3. Verify your MongoDB Atlas credentials');
} finally {
  await mongoose.disconnect();
  process.exit(0);
}
