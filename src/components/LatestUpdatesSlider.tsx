import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { ChevronLeft, ChevronRight, Trophy, Users, Building, Settings, Award } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Users,
  Building,
  Settings,
  Award
};

const LatestUpdatesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || '/api';
        const response = await axios.get(`${API_URL}/slider-updates`);
        setUpdates(response.data);
      } catch (error) {
        console.error('Error fetching slider updates:', error);
        // Fallback to hardcoded data if API fails
        setUpdates([
          {
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
            title: "Transforming Ideas into Technological Reality",
            teamName: "Neevachi Solutions",
            position: "Our Mission",
            schoolName: "Neevachi Solutions",
            category: "Company Vision",
            icon: "Building"
          },
          {
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
            title: "IRC League 2025",
            teamName: "The Strangers",
            position: "First Runner Up",
            schoolName: "Neevachi Solutions",
            category: "Middle Level",
            icon: "Trophy"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  useEffect(() => {
    if (updates.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [updates.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % updates.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#0E3995] to-[#0E3995]">
      <div className="w-full px-4 py-12">
        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 p-4 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-all duration-300 group shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex-1 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                style={{ height: '450px' }}
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image Section */}
                  <div className="md:w-1/2 h-full">
                    <img
                      src={updates[currentIndex].image}
                      alt={updates[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-full bg-blue-100">
                        {(() => {
                          const iconName = updates[currentIndex].icon || 'Trophy';
                          const IconComponent = iconMap[iconName] || Trophy;
                          return <IconComponent className="w-6 h-6 text-[#0E3995]" />;
                        })()}
                      </div>
                      <span className="text-sm font-semibold text-[#0E3995] uppercase tracking-wider">
                        Achievement
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-6">
                      {updates[currentIndex].title}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-gray-500 w-32">Team Name:</span>
                        <span className="text-base font-semibold text-gray-900">{updates[currentIndex].teamName}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-gray-500 w-32">Position:</span>
                        <span className="text-base font-semibold text-[#0E3995]">{updates[currentIndex].position}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-gray-500 w-32">School Name:</span>
                        <span className="text-base font-semibold text-gray-900">{updates[currentIndex].schoolName}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-gray-500 w-32">Category:</span>
                        <span className="text-base font-semibold text-gray-900">{updates[currentIndex].category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            className="flex-shrink-0 p-4 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 transition-all duration-300 group shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {updates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdatesSlider;
