import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

import { ArrowLeft, Plus, Filter, Calendar, FolderOpen } from 'lucide-react';
import { projectsAPI } from '@/lib/api/admin';

const MyProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, in-progress, upcoming

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getProjects();
      
      // Filter projects by user if user has a role or specific projects assigned
      // For now, we'll show all active projects since there's no user-project relationship
      const userProjects = data.filter(project => project.isActive);
      setMyProjects(userProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? myProjects 
    : myProjects.filter(project => {
        const status = project.status?.toLowerCase().replace(' ', '-');
        return status === filter;
      });

  const getStatusCount = (status: string) => {
    return myProjects.filter(project => 
      project.status?.toLowerCase().replace(' ', '-') === status
    ).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-center">
                My Projects
              </h1>
              <Button 
                onClick={() => navigate('/request-custom-product')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
              Manage and track your project portfolio
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Projects</p>
                  <p className="text-3xl font-bold text-gray-900">{myProjects.length}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{getStatusCount('completed')}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{getStatusCount('in-progress')}</p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 text-sm">⏳</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Upcoming</p>
                  <p className="text-3xl font-bold text-purple-600">{getStatusCount('upcoming')}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['all', 'completed', 'in-progress', 'upcoming'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  filter === filterType
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filterType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                {filterType !== 'all' && ` (${getStatusCount(filterType)})`}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FolderOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all' 
                  ? "You don't have any projects yet. Start by creating a new project!" 
                  : `No ${filter.replace('-', ' ')} projects found.`}
              </p>
              {filter === 'all' && (
                <Button onClick={() => navigate('/request-custom-product')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <ProjectCard 
                    project={project}
                    layout="grid"
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Project?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Have an innovative idea? Let us help you bring it to life with our expertise in robotics, embedded systems, and IoT solutions.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/request-custom-product')}
                  size="lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Project
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MyProjects;
