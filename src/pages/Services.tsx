import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Bot, Box, CircuitBoard, Cpu, Layers, Wifi, Zap, Truck, Wrench, Printer, Package, X, ArrowRight, FileText } from 'lucide-react';
import { servicesAPI } from '@/lib/api/admin';

const iconMap: Record<string, any> = {
  Bot,
  Box,
  CircuitBoard,
  Cpu,
  Layers,
  Wifi,
  Zap,
  Truck,
  Wrench,
  Printer,
  Package,
};

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

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleGetQuote = () => {
    if (selectedService?.title === '3D Printing') {
      window.location.href = '/printing-service';
    } else if (selectedService?.title === 'PCB Design') {
      window.location.href = '/pcb-quotation';
    } else {
      window.location.href = '/quotes';
    }
    handleCloseModal();
  };

  const handleGetDetails = () => {
    window.location.href = '/contact';
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 mb-8">
              Comprehensive technological solutions tailored to your needs
            </p>
            <p className="text-lg max-w-3xl mx-auto text-blue-200">
              We specialize in Robotics, Embedded Systems, IoT, PCB Design, 3D Engineering, 
              and end-to-end prototyping solutions to bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-20">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Box;
              return (
                <motion.div
                  key={service._id}
                  variants={itemVariants}
                  onClick={() => handleServiceClick(service)}
                  className="group relative bg-gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Why Choose Us Section */}
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
              Why Choose Neevachi Solutions?
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              With over 5 years of experience in the tech industry, we combine cutting-edge technology with innovative solutions to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Expertise</h3>
              <p className="text-muted-foreground">Deep knowledge in robotics, IoT, and embedded systems.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-muted-foreground">Staying ahead with the latest technologies and trends.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Quality</h3>
              <p className="text-muted-foreground">Rigorous testing and quality assurance for reliable products.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
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
                    {(() => {
                      const IconComponent = iconMap[selectedService.icon] || Box;
                      return <IconComponent className="w-8 h-8" />;
                    })()}
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
                  {selectedService.description}
                </p>
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
      </AnimatePresence>
    </div>
  );
};

export default Services;