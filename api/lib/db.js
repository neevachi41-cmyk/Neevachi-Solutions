import mongoose from 'mongoose';

const dbConnect = async () => {
  // If already connected, return existing connection
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected.');
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('❌ MONGODB_URI is not defined in your .env file');
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 sec timeout
      socketTimeoutMS: 45000,          // 45 sec socket timeout
    });

    console.log('✅ MongoDB Atlas connected via Mongoose');

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected!');
    });

    return mongoose.connection;
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    console.error('👉 Check your MONGODB_URI in the .env file');
    process.exit(1);
  }
};

export const getDB = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected. Call dbConnect() first.');
  }
  return mongoose.connection.db;
};

export default dbConnect;
