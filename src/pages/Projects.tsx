import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

import { ArrowRight, Award, Clock, Users, Zap, CheckCircle } from 'lucide-react';

const projects = [
  {
    id: "1",
    title: "Automated Warehouse Robot",
    category: "Automotive",
    year: "2024",
    description: "Autonomous mobile robot for warehouse automation",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=80",
    technologies: ["ROS", "Python", "Computer Vision"],
    status: "Completed"
  },
  {
    id: "2",
    title: "Smart Agriculture System",
    category: "Agriculture",
    year: "2024",
    description: "IoT-based crop monitoring and irrigation control",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80",
    technologies: ["IoT", "Sensors", "Cloud"],
    status: "Completed"
  },
  {
    id: "3",
    title: "E-commerce Platform",
    category: "Web Development",
    year: "2023",
    description: "Custom e-commerce solution with payment integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    status: "Completed"
  },
  {
    id: "4",
    title: "Mobile Banking App",
    category: "Finance",
    year: "2023",
    description: "Secure mobile banking application with biometric authentication",
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?w=800&auto=format&fit=crop&q=80",
    technologies: ["React Native", "Firebase", "Security"],
    status: "Completed"
  },
  {
    id: "5",
    title: "Industrial Automation System",
    category: "Manufacturing",
    year: "2024",
    description: "PLC-based automation for production line optimization",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
    technologies: ["PLC", "SCADA", "Industrial IoT"],
    status: "In Progress"
  },
  {
    id: "6",
    title: "Healthcare Monitoring Device",
    category: "Healthcare",
    year: "2024",
    description: "Wearable health monitoring system with real-time alerts",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    technologies: ["Embedded Systems", "Sensors", "Mobile App"],
    status: "In Progress"
  },
  {
    id: "7",
    title: "Smart Home Integration",
    category: "IoT",
    year: "2023",
    description: "Complete home automation system with voice control",
    image: "https://images.unsplash.com/photo-1558002038-1091a1661116?w=800&auto=format&fit=crop&q=80",
    technologies: ["IoT", "Alexa", "Home Automation"],
    status: "Completed"
  },
  {
    id: "8",
    title: "Robotics Arm Controller",
    category: "Robotics",
    year: "2023",
    description: "6-axis robotic arm controller for precision manufacturing",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    technologies: ["ROS", "Python", "Motion Control"],
    status: "Completed"
  },
];

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
