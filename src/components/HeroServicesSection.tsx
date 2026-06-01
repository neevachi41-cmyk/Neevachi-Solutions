import { motion } from 'framer-motion';

import { Cpu, Truck, Wrench, Box } from 'lucide-react';

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

const services = [
  { icon: Cpu, text: "Robotics Parts", description: "High-quality components" },
  { icon: Truck, text: "Supply Chain Management", description: "Efficient logistics" },
  { icon: Wrench, text: "Machining Services", description: "Precision engineering" },
  { icon: Box, text: "3D Printing Services", description: "Rapid prototyping" },
];

export function HeroServicesSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.text}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{service.text}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
