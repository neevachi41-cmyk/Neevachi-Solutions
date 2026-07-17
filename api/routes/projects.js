import express from 'express';
import Project from '../models/Project.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/projects — Get all active projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/projects/admin/all — Get all projects incl. inactive (admin only)
router.get('/admin/all', authenticate, isAdmin, async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    res.json({ count: projects.length, projects });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/admin/projects/:id — Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/admin/projects — Create project (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description and category are required.' });
    }
    const savedProject = await Project.create(req.body);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// PUT /api/admin/projects/:id — Update project (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
});

// DELETE /api/admin/projects/:id — Delete project (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
