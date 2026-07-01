import { getDB } from '../lib/db.js';

const COLLECTION_NAME = 'posts';

// Create a new post
const createPost = async (postData) => {
  const db = getDB();
  
  const post = {
    ...postData,
    createdAt: new Date(),
    isActive: postData.isActive !== undefined ? postData.isActive : true
  };
  
  const result = await db.collection(COLLECTION_NAME).insertOne(post);
  
  return {
    _id: result.insertedId,
    ...post
  };
};

// Get all active posts
const getActivePosts = async () => {
  const db = getDB();
  const posts = await db.collection(COLLECTION_NAME).find({ isActive: true }).sort({ createdAt: -1 }).toArray();
  return posts;
};

// Get all posts (including inactive)
const getAllPosts = async () => {
  const db = getDB();
  const posts = await db.collection(COLLECTION_NAME).find({}).sort({ createdAt: -1 }).toArray();
  return posts;
};

// Get post by ID
const getPostById = async (id) => {
  const db = getDB();
  const post = await db.collection(COLLECTION_NAME).findOne({ _id: id });
  return post;
};

// Update post
const updatePost = async (id, updateData) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { _id: id },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) {
    return null;
  }
  
  return await getPostById(id);
};

// Delete post
const deletePost = async (id) => {
  const db = getDB();
  const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: id });
  
  return result.deletedCount > 0;
};

export default {
  createPost,
  getActivePosts,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
