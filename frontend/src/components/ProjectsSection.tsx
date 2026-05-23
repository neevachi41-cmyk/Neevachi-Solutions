import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

import { ArrowRight } from 'lucide-react';

const projects = [
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
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
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
            Showcasing our latest innovations and solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

        {/* Additional Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Our Project Approach
          </h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            We follow a systematic approach to ensure every project is delivered on time and exceeds expectations. From concept to deployment, we work closely with our clients to bring their vision to reality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="p-6 bg-gradient-card rounded-xl border border-border text-center">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Planning</h4>
              <p className="text-muted-foreground">Detailed project planning and requirement analysis.</p>
            </div>
            <div className="p-6 bg-gradient-card rounded-xl border border-border text-center">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Design</h4>
              <p className="text-muted-foreground">Innovative design and prototyping phase.</p>
            </div>
            <div className="p-6 bg-gradient-card rounded-xl border border-border text-center">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Development</h4>
              <p className="text-muted-foreground">Agile development with regular updates.</p>
            </div>
            <div className="p-6 bg-gradient-card rounded-xl border border-border text-center">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Testing</h4>
              <p className="text-muted-foreground">Comprehensive testing and quality assurance.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
