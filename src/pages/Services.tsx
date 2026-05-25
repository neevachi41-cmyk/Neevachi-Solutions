import { motion } from 'framer-motion';

import { Cpu, Package, Wrench, Printer } from 'lucide-react';

const services = [
  {
    id: 'robotics-parts',
    title: 'Robotics Parts',
    description: 'High-quality robotics components and parts for your projects',
    icon: <Cpu className="w-16 h-16 text-black" />
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Management',
    description: 'Efficient supply chain solutions for your business needs',
    icon: <Package className="w-16 h-16 text-black" />
  },
  {
    id: 'machining',
    title: 'Machining Services',
    description: 'Precision machining services for custom parts and components',
    icon: <Wrench className="w-16 h-16 text-black" />
  },
  {
    id: '3d-printing',
    title: '3D Printing Services',
    description: 'Rapid prototyping and production with advanced 3D printing',
    icon: <Printer className="w-16 h-16 text-black" />
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
              Comprehensive PCB and IoT solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-8 border border-gray-200"
            >
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;