import { motion } from 'framer-motion';

import { Bot, Box, CircuitBoard, Cpu, Layers, Wifi } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: "Robotics",
    description: "Custom robotics solutions for automation and innovation",
    features: ["Industrial Robotics", "Service Robots", "Collaborative Robots"],
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    description: "Advanced embedded system design and development",
    features: ["MCU Programming", "RTOS Development", "Hardware Integration"],
  },
  {
    icon: Wifi,
    title: "IoT Solutions",
    description: "Internet of Things for smart connectivity",
    features: ["IoT Platforms", "Sensor Networks", "Cloud Integration"],
  },
  {
    icon: CircuitBoard,
    title: "PCB Design",
    description: "Professional PCB and circuit design services",
    features: ["Schematic Design", "PCB Layout", "Prototyping"],
  },
  {
    icon: Layers,
    title: "3D Engineering",
    description: "CAD modeling and 3D engineering solutions",
    features: ["CAD Design", "FEA Analysis", "Prototyping"],
  },
  {
    icon: Box,
    title: "3D Printing",
    description: "Rapid prototyping with advanced 3D printing",
    features: ["FDM Printing", "SLA Printing", "Multi-material"],
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

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive technological solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
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
            Why Choose NeevachiTech?
          </h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            With over 5 years of experience in the tech industry, we combine cutting-edge technology with innovative solutions to bring your ideas to life. Our team of experts is dedicated to delivering high-quality, scalable, and efficient solutions that drive your business forward.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gradient-card rounded-xl border border-border">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Expertise</h4>
              <p className="text-muted-foreground">Deep knowledge in robotics, IoT, and embedded systems.</p>
            </div>
            <div className="p-6 bg-gradient-card rounded-xl border border-border">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Innovation</h4>
              <p className="text-muted-foreground">Staying ahead with the latest technologies and trends.</p>
            </div>
            <div className="p-6 bg-gradient-card rounded-xl border border-border">
              <h4 className="text-xl font-heading font-semibold text-foreground mb-2">Quality</h4>
              <p className="text-muted-foreground">Rigorous testing and quality assurance for reliable products.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
