import { motion } from 'framer-motion';
import { useState } from 'react';

import { Bot, Box, CircuitBoard, Cpu, Layers, Wifi, X, ArrowRight, FileText } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: "Robotics",
    description: "Custom robotics solutions for automation and innovation",
    features: ["Industrial Robotics", "Service Robots", "Collaborative Robots"],
    details: "We provide end-to-end robotics solutions including design, development, and deployment of robotic systems for industrial automation, service robots, and collaborative robots (cobots). Our expertise spans from concept to production.",
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    description: "Advanced embedded system design and development",
    features: ["MCU Programming", "RTOS Development", "Hardware Integration"],
    details: "Specialized in embedded system development using various microcontrollers and processors. We offer firmware development, RTOS integration, and hardware-software co-design for optimized performance.",
  },
  {
    icon: Wifi,
    title: "IoT Solutions",
    description: "Internet of Things for smart connectivity",
    features: ["IoT Platforms", "Sensor Networks", "Cloud Integration"],
    details: "Complete IoT ecosystem development including sensor networks, edge computing, cloud integration, and data analytics. We build scalable and secure IoT solutions for smart homes, industries, and cities.",
  },
  {
    icon: CircuitBoard,
    title: "PCB Design",
    description: "Professional PCB and circuit design services",
    features: ["Schematic Design", "PCB Layout", "Prototyping"],
    details: "Expert PCB design services from schematic capture to final layout. We handle multi-layer boards, high-speed designs, and provide complete fabrication and assembly support.",
  },
  {
    icon: Layers,
    title: "3D Engineering",
    description: "CAD modeling and 3D engineering solutions",
    features: ["CAD Design", "FEA Analysis", "Prototyping"],
    details: "Comprehensive 3D engineering services including CAD modeling, finite element analysis (FEA), and rapid prototyping. We help bring your designs from concept to physical reality.",
  },
  {
    icon: Box,
    title: "3D Printing",
    description: "Rapid prototyping with advanced 3D printing",
    features: ["FDM Printing", "SLA Printing", "Multi-material"],
    details: "State-of-the-art 3D printing services using FDM, SLA, and multi-material technologies. We offer rapid prototyping, custom manufacturing, and production-grade printing solutions.",
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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleGetQuote = () => {
    // Navigate to quotes page with pre-selected service
    window.location.href = '/quotes';
    handleCloseModal();
  };

  const handleGetDetails = () => {
    // Navigate to contact page with service inquiry
    window.location.href = '/contact';
    handleCloseModal();
  };

  return (
    <section id="services" className="py-12 px-4 bg-gradient-subtle">
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
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
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
              onClick={() => handleServiceClick(service)}
              className="group relative bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/quotes';
                        }}
                        className="text-sm text-muted-foreground flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
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
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <selectedService.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {selectedService.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {selectedService.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">About This Service</h4>
                <p className="text-gray-600 leading-relaxed">
                  {selectedService.details}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.features.map((feature) => (
                    <div
                      key={feature}
                      onClick={() => {
                        window.location.href = '/quotes';
                      }}
                      className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-primary transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetQuote}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  Get Quotation
                </button>
                <button
                  onClick={handleGetDetails}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Get Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
