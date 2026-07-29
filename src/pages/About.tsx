import { motion } from 'framer-motion';
import { Bot, Cpu, Wifi, CircuitBoard, Layers, Target, Users, Award, Zap, Rocket, Linkedin, Github, Mail, MapPin } from 'lucide-react';
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

  const teamMembers = [
    {
      name: "Prathamesh Mali",
      role: "Founder & Chief Executive Officer (CEO)",
      image: "https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=PM",
      bio: "Leading the strategic vision and overall operations of Neevachi Solutions with expertise in business development and technology innovation.",
      linkedin: "#",
      github: "#",
      email: "prathamesh@neevachi.in"
    },
    {
      name: "Mandar Patil",
      role: "Chief Operating Officer (COO) & Manager",
      image: "https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=MP",
      bio: "Overseeing daily operations and ensuring efficient project delivery with strong management and organizational skills.",
      linkedin: "#",
      github: "#",
      email: "mandar@neevachi.in"
    },
    {
      name: "Harshal Sonawane",
      role: "Chief Marketing Officer (CMO) & AI/ML Engineer",
      image: "https://via.placeholder.com/150x150/EC4899/FFFFFF?text=HS",
      bio: "Combining marketing expertise with AI/ML engineering to drive brand growth and develop intelligent solutions.",
      linkedin: "#",
      github: "#",
      email: "harshal@neevachi.in"
    },
    {
      name: "Chaitanya Patil",
      role: "Lead IoT Developer",
      image: "https://via.placeholder.com/150x150/10B981/FFFFFF?text=CP",
      bio: "Specializing in IoT architecture and development, creating connected solutions for smart applications and industrial automation.",
      linkedin: "#",
      github: "#",
      email: "chaitanya@neevachi.in"
    },
    {
      name: "Piyush Bhoi",
      role: "Hardware Engineer",
      image: "https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=PB",
      bio: "Expert in hardware design, PCB development, and embedded systems with a focus on reliable and efficient electronic solutions.",
      linkedin: "#",
      github: "#",
      email: "piyush@neevachi.in"
    },
    {
      name: "Pranit Patil",
      role: "Website Developer",
      image: "https://via.placeholder.com/150x150/6366F1/FFFFFF?text=PP",
      bio: "Full-stack developer specializing in web applications and digital platforms, ensuring seamless user experiences and robust functionality.",
      linkedin: "#",
      github: "#",
      email: "pranit@neevachi.in"
    },
    {
      name: "Kalpesh Khalane",
      role: "Social Media Head",
      image: "https://via.placeholder.com/150x150/EF4444/FFFFFF?text=KK",
      bio: "Manages our online presence and community engagement, ensuring our innovations reach a wider audience across digital platforms.",
      linkedin: "#",
      github: "#",
      email: "kalpesh@neevachi.in"
    },
    {
      name: "Vaibhav Patil",
      role: "Mentor",
      image: "https://via.placeholder.com/150x150/14B8A6/FFFFFF?text=VP",
      bio: "Provides invaluable guidance and expertise, shaping the next generation of technological advancements and strategic direction.",
      linkedin: "#",
      github: "#",
      email: "vaibhav@neevachi.in"
    },
  ];

  const teamDescription = "Our diverse team comprises visionary leaders, skilled engineers, and experienced mentors, all dedicated to pushing the boundaries of technology and delivering exceptional solutions.";

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

      {/* Mission Details */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Engineering innovative hardware that empowers industries, improves lives, and contributes to a better future
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200"
            >
              <ul className="space-y-4">
                {[
                  "Engineer innovative hardware solutions that push the boundaries of technology",
                  "Empower industries with cutting-edge automation and robotics systems",
                  "Improve lives through smart IoT and embedded system applications",
                  "Contribute to a sustainable and better future through responsible technology",
                  "Transform visionary concepts into intelligent engineering solutions",
                  "Solve real-world challenges with practical and scalable technology"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-1 rounded-full bg-blue-600 text-white mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
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

      {/* Leadership & Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Leadership & Team</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {teamDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="relative">
                  <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.github}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white transition-colors"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
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
      {/* Contact Information */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600">Get in touch with us for any inquiries or project requirements</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">Flat No. S No 50, Survey Number :50, Office No 1 15/1, Samarth Sankul near Bank of Maharashtra, Pune Pune, MAHARASHTRA, 411041</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">info@neevachi.in</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600 text-sm">+91 9922552891, +91 9403497065</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-2">GSTIN</h3>
              <p className="text-gray-600 text-sm">27GYTPM3198G1ZK</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Thank You for Your Interest</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              We are committed to delivering excellence in every project and building lasting partnerships with our clients. Your trust drives us to innovate and exceed expectations.
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto text-blue-200">
              Together, let's create solutions that make a difference and shape the future of technology.
            </p>
          </motion.div>
        </div>
      </section>

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
              onClick={() => window.location.href = '/contact'}
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
