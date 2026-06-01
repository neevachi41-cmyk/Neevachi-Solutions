import { motion } from 'framer-motion';
import { Bot, Cpu, Wifi, CircuitBoard, Layers, Target, Users, Award, Zap, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const services = [
    { icon: Bot, title: "Robotics", desc: "Custom robotics solutions for automation" },
    { icon: Cpu, title: "Embedded Systems", desc: "Advanced embedded system design" },
    { icon: Wifi, title: "IoT Solutions", desc: "Smart connectivity solutions" },
    { icon: CircuitBoard, title: "PCB Design", desc: "Professional circuit design services" },
    { icon: Layers, title: "3D Engineering", desc: "CAD modeling and engineering" },
    { icon: Zap, title: "Prototyping", desc: "End-to-end prototyping solutions" },
  ];

  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "500+", label: "Projects Delivered" },
    { value: "200+", label: "Happy Clients" },
    { value: "24/7", label: "Support" },
  ];

  const values = [
    { icon: Target, title: "Mission", desc: "To transform innovative ideas into technological reality through cutting-edge robotics, embedded systems, and IoT solutions." },
    { icon: Award, title: "Vision", desc: "To be the leading technology partner for businesses worldwide, driving innovation and excellence in engineering solutions." },
    { icon: Users, title: "Values", desc: "We believe in quality, innovation, and customer satisfaction. Our team is dedicated to delivering excellence in every project." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">About Neevachi Solutions</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 mb-8">
              Pioneering Innovation in Robotics, Embedded Systems & IoT
            </p>
            <p className="text-lg max-w-3xl mx-auto text-blue-200">
              We are a technology company dedicated to transforming ideas into reality through cutting-edge engineering solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Who We Are</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Founded with a passion for innovation, Neevachi Solutions has grown into a trusted technology partner for businesses worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-lg"
              >
                <div className="p-4 rounded-lg bg-blue-100 text-blue-600 mb-4 inline-block">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-6">
                Neevachi Solutions was born from a simple idea: to make advanced technology accessible to everyone. Starting as a small team of passionate engineers, we have grown into a comprehensive technology solutions provider.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Our journey began with a focus on robotics and embedded systems. Over the years, we expanded our expertise to include IoT solutions, PCB design, 3D engineering, and complete prototyping services. Today, we serve clients across various industries, helping them bring their innovative ideas to life.
              </p>
              <p className="text-gray-600 text-lg">
                What sets us apart is our commitment to quality, innovation, and customer satisfaction. We don't just build products; we build relationships and partnerships that last.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-gray-800">Innovation Hub Since 2022</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We offer comprehensive technology solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-lg"
              >
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mb-4 inline-block">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background with fixed scrolling effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Static Content */}
        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Numbers that speak for our commitment and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group text-center p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-black/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {stat.label}
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Work With Us?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Let's bring your ideas to life. Contact us today to discuss your project and see how we can help you achieve your goals.
            </p>
            <Button 
              size="lg" 
              className="px-8 h-14 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Get in Touch
              <Rocket className="ml-3 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
