import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const projectDetails = {
  "automated-warehouse-robot": {
    id: "1",
    title: "Automated Warehouse Robot",
    category: "Automotive",
    year: "2024",
    description: "Autonomous mobile robot for warehouse automation",
    longDescription: "Our Automated Warehouse Robot is a cutting-edge solution designed to revolutionize inventory management and order fulfillment in large-scale warehouses. The robot utilizes advanced LIDAR and computer vision to navigate complex environments, avoiding obstacles and optimizing picking routes in real-time.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&auto=format&fit=crop&q=80",
    technologies: ["ROS (Robot Operating System)", "LIDAR", "Computer Vision", "AI Pathfinding"],
    features: [
      "Autonomous navigation in dynamic environments",
      "Real-time inventory tracking",
      "Multi-robot coordination",
      "Cloud-based fleet management",
      "Battery life: 12+ hours"
    ],
    client: "Global Logistics Inc.",
    duration: "6 months",
    teamSize: "8 members"
  },
  "smart-agriculture-system": {
    id: "2",
    title: "Smart Agriculture System",
    category: "Agriculture",
    year: "2024",
    description: "IoT-based crop monitoring and irrigation control",
    longDescription: "Our Smart Agriculture System leverages IoT technology to provide farmers with real-time data on soil conditions, weather patterns, and crop health. The system helps optimize water usage, reduce waste, and increase crop yields through precision agriculture techniques.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&auto=format&fit=crop&q=80",
    technologies: ["IoT Sensors", "LoRaWAN", "Cloud Computing", "Data Analytics"],
    features: [
      "Real-time soil moisture monitoring",
      "Automated irrigation control",
      "Crop health analysis",
      "Weather forecasting integration",
      "Mobile app for remote monitoring"
    ],
    client: "Green Fields Agritech",
    duration: "4 months",
    teamSize: "5 members"
  },
  "e-commerce-platform": {
    id: "3",
    title: "E-commerce Platform",
    category: "Web Development",
    year: "2023",
    description: "Custom e-commerce solution with payment integration",
    longDescription: "A fully-featured e-commerce platform built with modern web technologies to provide a seamless shopping experience. The platform includes product management, shopping cart, secure checkout, and order tracking features.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
    features: [
      "Responsive design for all devices",
      "Secure payment processing",
      "User authentication and profiles",
      "Product search and filtering",
      "Order management system"
    ],
    client: "StyleHub Fashion",
    duration: "5 months",
    teamSize: "6 members"
  },
  "mobile-banking-app": {
    id: "4",
    title: "Mobile Banking App",
    category: "Finance",
    year: "2023",
    description: "Secure mobile banking application with biometric authentication",
    longDescription: "A secure and user-friendly mobile banking application that allows customers to manage their finances on the go. The app includes features like fund transfers, bill payments, investment tracking, and biometric authentication for enhanced security.",
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?w=1200&auto=format&fit=crop&q=80",
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric Auth"],
    features: [
      "Fingerprint and face recognition",
      "Real-time transaction alerts",
      "Budget tracking and analytics",
      "Bill payment and money transfer",
      "24/7 customer support"
    ],
    client: "Metro Bank",
    duration: "7 months",
    teamSize: "9 members"
  },
  "smart-home-system": {
    id: "5",
    title: "Smart Home System",
    category: "IoT",
    year: "2024",
    description: "Centralized control for home automation devices",
    longDescription: "A comprehensive smart home solution that allows users to control and automate various aspects of their home environment. The system integrates with smart lights, thermostats, security cameras, and other IoT devices through a single, intuitive interface.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&auto=format&fit=crop&q=80",
    technologies: ["MQTT", "WebSockets", "React Native", "Raspberry Pi", "Zigbee"],
    features: [
      "Voice control integration (Alexa, Google Assistant)",
      "Energy usage monitoring",
      "Automated routines and schedules",
      "Remote access and control",
      "Real-time notifications"
    ],
    client: "Smart Living Solutions",
    duration: "5 months",
    teamSize: "7 members"
  },
  "health-tracking-app": {
    id: "6",
    title: "Health Tracking App",
    category: "Healthcare",
    year: "2023",
    description: "Mobile application for tracking health metrics and fitness goals",
    longDescription: "A comprehensive health and fitness tracking application that helps users monitor their physical activity, nutrition, and overall wellbeing. The app syncs with wearable devices and provides personalized insights and recommendations.",
    image: "https://images.unsplash.com/photo-1505751172876-fa186e5a3f54?w=1200&auto=format&fit=crop&q=80",
    technologies: ["Flutter", "Firebase", "HealthKit", "Google Fit", "GraphQL"],
    features: [
      "Activity and workout tracking",
      "Nutrition and calorie counter",
      "Sleep analysis",
      "Heart rate monitoring",
      "Personalized health insights"
    ],
    client: "Vitality Health",
    duration: "6 months",
    teamSize: "8 members"
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectId ? projectDetails[projectId as keyof typeof projectDetails] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/all-projects" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/all-projects" 
            className="inline-flex items-center text-primary hover:underline mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Hero Image */}
            <div className="h-80 md:h-96 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-6 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
                  <p className="text-lg text-gray-600">{project.description}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl min-w-64">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">PROJECT DETAILS</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Client</span>
                      <p className="font-medium">{project.client}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Duration</span>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Team Size</span>
                      <p className="font-medium">{project.teamSize}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Year</span>
                      <p className="font-medium">{project.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
                  <div className="prose max-w-none text-gray-700 mb-8">
                    <p className="mb-4">{project.longDescription}</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:pl-8">
                  <div className="bg-gray-50 p-6 rounded-xl sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Have a similar project in mind?</h3>
                    <p className="text-gray-600 mb-6">Let's discuss how we can help bring your idea to life with our expertise.</p>
                    <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      Contact Us
                    </button>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Share this project</h4>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Facebook</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
