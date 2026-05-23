import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  layout?: 'grid' | 'list';
  className?: string;
  onEdit?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  layout = 'grid',
  className = '',
  onEdit,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Create URL-friendly ID for routing
  const projectId = project.id || 
    project.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(project.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-project.jpg';
  };

  const renderButtonContent = (text: string) => (
    <div className="flex items-center justify-center">
      <span>{text}</span>
      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
    </div>
  );

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-primary/30 transition-all duration-500 ${className}`}
      >
        {isAdmin && (
          <button 
            onClick={handleEditClick}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
            title="Edit Project"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <Link to={`/projects/${projectId}`} className="block h-full">
          <div className="md:flex h-full">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="relative h-48 md:h-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-500">{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="group/btn w-full" asChild>
                  <div>
                    {renderButtonContent('View Full Project')}
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default grid layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-primary/30 transition-all duration-500 h-full flex flex-col ${className}`}
    >
      {isAdmin && (
        <button 
          onClick={handleEditClick}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
          title="Edit Project"
          type="button"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
      
      <Link to={`/projects/${projectId}`} className="block flex-1 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium bg-primary/90 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">{project.year}</span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full group/btn" asChild>
              <div>
                {renderButtonContent('View Details')}
              </div>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;