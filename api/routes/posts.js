import express from 'express';
import Post from '../models/Post.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/posts — Get all active posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/posts/admin/all — Get all posts incl. inactive (admin only)
router.get('/admin/all', authenticate, isAdmin, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json({ count: posts.length, posts });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/posts/:id — Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/posts — Create post (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
    const savedPost = await Post.create(req.body);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
});

// PUT /api/admin/posts/:id — Update post (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
});

// DELETE /api/admin/posts/:id — Delete post (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

export default router;
