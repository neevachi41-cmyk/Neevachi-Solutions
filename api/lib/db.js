import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not defined in your .env file');
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB Atlas connected via Mongoose');
    return mongoose.connection;
  } catch (err) {
    console.error('Mongoose connection error:', err.message);
    console.error('Make sure MongoDB is running or check your MONGODB_URI in .env file');
    process.exit(1);
  }
};

const getDB = () => {
  if (!isConnected) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return mongoose.connection.db;
};

export default connectDB;
export { getDB };
