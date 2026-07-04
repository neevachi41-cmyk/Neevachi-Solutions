import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all active projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all projects (admin - includes inactive)
router.get('/admin/all', async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single project
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

// Create new project
router.post('/', async (req, res) => {
  try {
    const savedProject = await Project.create(req.body);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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

// Delete project
router.delete('/:id', async (req, res) => {
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
