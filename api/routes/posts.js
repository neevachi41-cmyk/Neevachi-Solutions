import express from 'express';
import { ObjectId } from 'mongodb';
import Post from '../models/Post.js';

const router = express.Router();

// Get all active posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.getActivePosts();
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all posts (admin - includes inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.getPostById(new ObjectId(req.params.id));
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new post
router.post('/', async (req, res) => {
  try {
    const savedPost = await Post.createPost(req.body);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.updatePost(new ObjectId(req.params.id), req.body);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.deletePost(new ObjectId(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

export default router;
