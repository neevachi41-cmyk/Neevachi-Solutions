import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProjectCard from '@/components/ProjectCard';

import { useAuth } from '@/contexts/AuthContext';

import { ArrowLeft, Plus } from 'lucide-react';

// This would typically come from an API
const allProjects = [
  {
    id: "1",
    title: "Automated Warehouse Robot",
    category: "Automotive",
    year: "2024",
    description: "Autonomous mobile robot for warehouse automation",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Smart Agriculture System",
    category: "Agriculture",
    year: "2024",
    description: "IoT-based crop monitoring and irrigation control",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "E-commerce Platform",
    category: "Web Development",
    year: "2023",
    description: "Custom e-commerce solution with payment integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Mobile Banking App",
    category: "Finance",
    year: "2023",
    description: "Secure mobile banking application with biometric authentication",
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Smart Home System",
    category: "IoT",
    year: "2024",
    description: "Centralized control for home automation devices",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Health Tracking App",
    category: "Healthcare",
    year: "2023",
    description: "Mobile application for tracking health metrics and fitness goals",
    image: "https://images.unsplash.com/photo-1505751172876-fa186e5a3f54?w=800&auto=format&fit=crop&q=80",
  },
];

const AllProjects = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleEditProject = (projectId: string) => {
    const project = allProjects.find(p => p.id === projectId);
    if (project) {
      setEditingProject(project);
      setIsEditDialogOpen(true);
    }
  };

  const handleAddNewProject = () => {
    setEditingProject(null);
    setIsEditDialogOpen(true);
  };
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
            <Link to="/projects" className="flex items-center text-primary hover:underline">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground text-center">
              All Projects
            </h1>
            {isAdmin && (
              <Button 
                onClick={handleAddNewProject}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            )}
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center">
              Explore our complete portfolio of innovative solutions
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-white">
              All Projects
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              Web Development
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              Mobile Apps
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              IoT Solutions
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              AI & ML
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard 
                  project={project}
                  layout="grid"
                  className="h-full"
                  onEdit={isAdmin ? handleEditProject : undefined}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">
                1
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Form fields would go here */}
            <p className="text-center py-8 text-gray-500">
              Project editing form will be implemented here
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle save logic here
              setIsEditDialogOpen(false);
            }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllProjects;
