import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Workflow = () => {
  const steps = [
    {
      number: 1,
      title: 'Discovery & Planning',
      icon: <Zap className="w-8 h-8" />,
      description: 'We begin by understanding your requirements, goals, and vision. Our team conducts thorough research and creates a detailed project plan with clear milestones.',
      details: [
        'Requirement gathering and analysis',
        'Market research and competitor analysis',
        'Technical feasibility assessment',
        'Project timeline and resource planning'
      ]
    },
    {
      number: 2,
      title: 'Design & Prototyping',
      icon: <Users className="w-8 h-8" />,
      description: 'Our designers create intuitive and visually appealing designs. We develop interactive prototypes to visualize the final product before development begins.',
      details: [
        'UI/UX design and wireframing',
        'Interactive prototyping',
        'Design system creation',
        'User testing and feedback integration'
      ]
    },
    {
      number: 3,
      title: 'Development',
      icon: <Clock className="w-8 h-8" />,
      description: 'Our developers build your solution using cutting-edge technologies. We follow agile methodology with regular sprints and continuous integration.',
      details: [
        'Clean code development',
        'Regular sprint deliveries',
        'Code reviews and quality checks',
        'Continuous integration and deployment'
      ]
    },
    {
      number: 4,
      title: 'Testing & QA',
      icon: <CheckCircle2 className="w-8 h-8" />,
      description: 'Comprehensive testing ensures your product is bug-free and performs optimally. We conduct various tests including functional, performance, and security testing.',
      details: [
        'Unit and integration testing',
        'Performance and load testing',
        'Security vulnerability scanning',
        'User acceptance testing'
      ]
    },
    {
      number: 5,
      title: 'Deployment & Launch',
      icon: <Zap className="w-8 h-8" />,
      description: 'We deploy your product to production with minimal downtime. Our team ensures a smooth launch and provides post-launch support.',
      details: [
        'Production deployment',
        'Performance monitoring',
        'Error tracking and logging',
        'Initial user support'
      ]
    },
    {
      number: 6,
      title: 'Maintenance & Support',
      icon: <Users className="w-8 h-8" />,
      description: 'We provide ongoing maintenance, updates, and support to ensure your product continues to perform optimally and stays up-to-date with latest technologies.',
      details: [
        'Regular updates and patches',
        '24/7 technical support',
        'Performance optimization',
        'Feature enhancements'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/services" 
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How We Work</h1>
            <p className="text-xl md:text-2xl max-w-3xl text-blue-100">
              Our systematic approach ensures successful project delivery
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Workflow Process</h2>
          <p className="text-lg text-gray-600">
            We follow a proven methodology that combines industry best practices with agile principles to deliver exceptional results. From initial concept to final deployment, we ensure transparency, quality, and timely delivery at every stage.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4 text-blue-600">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
              <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
                Let's work together to bring your vision to life. Our team is ready to help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Workflow;
