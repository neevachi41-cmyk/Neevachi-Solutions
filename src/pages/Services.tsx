import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import ProjectSubmissionForm from '@/components/ProjectSubmissionForm';

import { ArrowRight, Code, Cpu, Database, Globe, Lock, Shield, Smartphone } from 'lucide-react';

type ServiceIcon = '🌐' | '📱' | '🔒' | '💻' | '⚙️' | '📊' | '🔐';

const serviceIcons: Record<ServiceIcon, JSX.Element> = {
  '🌐': <Globe className="w-8 h-8 text-blue-600" />,
  '📱': <Smartphone className="w-8 h-8 text-green-600" />,
  '🔒': <Shield className="w-8 h-8 text-red-600" />,
  '💻': <Code className="w-8 h-8 text-purple-600" />,
  '⚙️': <Cpu className="w-8 h-8 text-yellow-600" />,
  '📊': <Database className="w-8 h-8 text-indigo-600" />,
  '🔐': <Lock className="w-8 h-8 text-pink-600" />,
};

const services = [
  {
    id: 'robotics',
    title: 'Robotics',
    description: 'Cutting-edge robotics solutions for automation and innovation',
    icon: '🤖',
    features: [
      'Custom Robot Design',
      'Industrial Automation',
      'Robotic Process Automation',
      'AI Integration',
      'Prototype Development',
      'Maintenance & Support'
    ]
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    description: 'Custom embedded solutions for specialized applications',
    icon: '💻',
    features: [
      'Firmware Development',
      'Hardware Design',
      'RTOS Implementation',
      'Low-power Design',
      'IoT Integration',
      'Testing & Validation'
    ]
  },
  {
    id: 'iot-solutions',
    title: 'IoT Solutions',
    description: 'End-to-end Internet of Things solutions',
    icon: '🌐',
    features: [
      'Sensor Integration',
      'Edge Computing',
      'Cloud Connectivity',
      'Data Analytics',
      'Remote Monitoring',
      'Security Implementation'
    ]
  },
  {
    id: 'pcb-design',
    title: 'PCB Design',
    description: 'High-quality printed circuit board design services',
    icon: '🔌',
    features: [
      'Schematic Design',
      'PCB Layout',
      'Signal Integrity Analysis',
      'High-Speed Design',
      'DFM/DFA',
      'Prototype Support'
    ]
  },
  {
    id: '3d-printing',
    title: '3D Printing',
    description: 'Rapid prototyping and production with 3D printing',
    icon: '🖨️',
    features: [
      'Rapid Prototyping',
      'Functional Parts',
      'Multiple Materials',
      'High Precision',
      'Design Optimization',
      'Post-Processing'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Turn your data into actionable insights',
    icon: '📊',
    features: [
      'Data Visualization',
      'Business Intelligence',
      'Predictive Analytics',
      'Reports'
    ]
  }
];

const Services = () => {
  const getServiceIcon = (icon: string) => {
    return serviceIcons[icon as ServiceIcon] || <span className="text-2xl">{icon}</span>;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-opacity-10 bg-blue-500 mb-4">
                  {typeof service.icon === 'string' ? getServiceIcon(service.icon) : service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg 
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Link 
                  to={`/services/${service.id}`}
                  className="group w-full inline-flex items-center justify-center px-5 py-2.5 border-2 border-blue-600 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 transition-all duration-300"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your project?</h2>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
                Let's discuss how we can help you achieve your business goals with our expert services.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="#project-form" 
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white text-base font-semibold rounded-lg text-white bg-transparent hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a 
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white text-base font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all duration-200"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Submission Form */}
        <motion.div 
          id="project-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Start Your Project</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours to discuss your project requirements.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <ProjectSubmissionForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;