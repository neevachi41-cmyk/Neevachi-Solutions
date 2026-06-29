import bcrypt from 'bcryptjs';
import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'users';

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Helper function to compare password
const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

// Create a new user
const createUser = async (userData) => {
  const db = getDB();
  const { email, password, role = 'user' } = userData;
  
  // Check if user already exists
  const existingUser = await db.collection(COLLECTION_NAME).findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Hash password
  const hashedPassword = await hashPassword(password);
  
  // Create user document
  const user = {
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role,
    createdAt: new Date()
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(user);
  
  return {
    _id: result.insertedId,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};

// Find user by email
const findUserByEmail = async (email) => {
  const db = getDB();
  const user = await db.collection(COLLECTION_NAME).findOne({ email: email.toLowerCase().trim() });
  return user;
};

// Find user by ID
const findUserById = async (userId) => {
  const db = getDB();
  const user = await db.collection(COLLECTION_NAME).findOne({ _id: userId });
  return user;
};

// Verify user credentials
const verifyUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }
  
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return null;
  }
  
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  verifyUser
};
