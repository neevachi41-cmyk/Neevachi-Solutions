import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { Rocket } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center px-4 py-12 overflow-hidden bg-white">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-40 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-40 blur-xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-30 blur-lg"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight text-gray-900"
          >
            Innovation in
            <br />
            <span className="text-blue-600">Technology</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            We specialize in Robotics, Embedded Systems, IoT, PCB Design, 3D Engineering, 
            and end-to-end prototyping solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button 
              size="lg" 
              className="px-8 h-14 text-base font-medium bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
            >
              Get Started
              <Rocket className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 h-14 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-300 rounded-2xl shadow-md hover:shadow-lg"
            >
              Learn More
            </Button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
