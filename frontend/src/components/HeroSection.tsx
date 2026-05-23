import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

import { CheckCircle, MessageSquare, Rocket } from 'lucide-react';

const badges = [
  { icon: Rocket, text: "50+ Projects Delivered" },
  { icon: CheckCircle, text: "35+ Happy Clients" },
  { icon: MessageSquare, text: "24/7 Support" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl animate-float animation-delay-2000" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gray-200/30 rounded-full blur-2xl animate-float animation-delay-3000" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm mb-8 border border-gray-200"
          >
            <span className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
            <span className="text-sm text-gray-700">Innovation Hub Since 2022</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4 leading-tight"
          >
            Transforming Ideas into
            <br />
            <span className="text-gradient">Technological Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            We specialize in Robotics, Embedded Systems, IoT, PCB Design, 3D Engineering, 
            and end-to-end prototyping solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="relative group">
                <Button 
                  size="lg" 
                  className="px-10 h-14 text-base font-medium bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="relative">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></span>
                      <span className="relative">Get Started</span>
                    </span>
                    <Rocket className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 h-14 text-base font-medium border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Stats badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-10"
          >
            {badges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow transition-all duration-200"
              >
                <badge.icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
