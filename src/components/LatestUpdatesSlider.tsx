import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestUpdatesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updates = [
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      title: "New Robotics Project",
      description: "Advanced automation system launched"
    },
    {
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=400&fit=crop",
      title: "IoT Integration",
      description: "Smart home solutions now available"
    },
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
      title: "PCB Design Update",
      description: "New circuit design tools released"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      title: "3D Printing Service",
      description: "Rapid prototyping now faster"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [updates.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % updates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          </div>

          {/* Image Slider */}
          <div className="relative h-64">
            {updates.map((update, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : index < currentIndex ? -50 : 50
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-2xl mb-2">{update.title}</h4>
                  <p className="text-gray-200 text-base">{update.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 py-4 bg-white">
            {updates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestUpdatesSlider;
