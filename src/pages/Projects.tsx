import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

import { ArrowRight, Award, Clock, Users, Zap, CheckCircle } from 'lucide-react';
import { projectsAPI } from '@/lib/api/admin';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback projects data
  const fallbackProjects = [
    {
      _id: '1',
      title: 'Industrial Automation Robot',
      description: 'Custom robotic arm for manufacturing automation with precision control and real-time monitoring.',
      category: 'Robotics',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
      technologies: ['Arduino', 'Python', 'Sensors'],
      status: 'completed'
    },
    {
      _id: '2',
      title: 'Smart Home IoT System',
      description: 'Complete home automation system with remote control, energy monitoring, and security features.',
      category: 'IoT',
      image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&auto=format&fit=crop',
      technologies: ['ESP32', 'MQTT', 'React'],
      status: 'completed'
    },
    {
      _id: '3',
      title: 'PCB Design for Medical Device',
      description: 'Custom PCB design for portable medical monitoring device with low power consumption.',
      category: 'PCB Design',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
      technologies: ['Altium', 'KiCad', 'Fusion 360'],
      status: 'completed'
    },
    {
      _id: '4',
      title: '3D Printed Prosthetic',
      description: 'Custom 3D printed prosthetic limb with adjustable fittings and lightweight design.',
      category: '3D Engineering',
      image: 'https://images.unsplash.com/photo-1562843299-f9c6c2b56b8e?w=800&auto=format&fit=crop',
      technologies: ['Fusion 360', 'PLA', 'PETG'],
      status: 'completed'
    },
    {
      _id: '5',
      title: 'Autonomous Drone',
      description: 'Self-flying drone with obstacle avoidance and GPS navigation for aerial surveillance.',
      category: 'Robotics',
      image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&auto=format&fit=crop',
      technologies: ['Raspberry Pi', 'OpenCV', 'Python'],
      status: 'completed'
    },
    {
      _id: '6',
      title: 'Smart Agriculture System',
      description: 'IoT-based agricultural monitoring system with soil sensors and automated irrigation.',
      category: 'IoT',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop',
      technologies: ['Arduino', 'Sensors', 'Cloud'],
      status: 'completed'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 mb-8">
              Showcasing our innovative solutions and successful implementations
            </p>
            <p className="text-lg max-w-3xl mx-auto text-blue-200">
              From robotics to IoT, we've delivered cutting-edge solutions across various industries. 
              Explore our portfolio to see how we transform ideas into reality.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
              >
                <ProjectCard 
                  project={project}
                  layout="grid"
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <Button asChild variant="heroOutline" size="lg">
            <Link to="/all-projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Our Project Approach */}
      <div className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our Project Approach
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We follow a systematic approach to ensure every project is delivered on time and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 mx-auto w-fit">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Planning</h4>
              <p className="text-muted-foreground">Detailed project planning and requirement analysis.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 mx-auto w-fit">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Design</h4>
              <p className="text-muted-foreground">Innovative design and prototyping phase.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 mx-auto w-fit">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Development</h4>
              <p className="text-muted-foreground">Agile development with regular updates.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 mx-auto w-fit">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Testing</h4>
              <p className="text-muted-foreground">Comprehensive testing and quality assurance.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-muted-foreground">
              Let's discuss your requirements and bring your vision to life.
            </p>
            <Button asChild variant="default" size="lg">
              <Link to="/contact">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
