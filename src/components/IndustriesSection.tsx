import { motion } from "framer-motion";
import { CircuitBoard, Wifi, Box, Cpu, Layers, Factory } from "lucide-react";

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

const industries = [
  {
    icon: <CircuitBoard className="w-8 h-8 text-blue-600" />,
    title: "PCB Design",
    description: "Professional PCB and circuit design services for electronic products.",
    solutions: ["Schematic Design", "PCB Layout", "Multi-layer Boards", "Prototyping"]
  },
  {
    icon: <Wifi className="w-8 h-8 text-blue-600" />,
    title: "IoT Solutions",
    description: "Internet of Things for smart connectivity and automation.",
    solutions: ["Sensor Networks", "Cloud Integration", "Edge Computing", "Data Analytics"]
  },
  {
    icon: <Box className="w-8 h-8 text-blue-600" />,
    title: "3D Printing",
    description: "Rapid prototyping with advanced 3D printing technologies.",
    solutions: ["FDM Printing", "SLA Printing", "Multi-material", "Production Parts"]
  },
  {
    icon: <Cpu className="w-8 h-8 text-blue-600" />,
    title: "Embedded Systems",
    description: "Advanced embedded system design and development.",
    solutions: ["MCU Programming", "RTOS Development", "Hardware Integration", "Firmware"]
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-600" />,
    title: "3D Engineering",
    description: "CAD modeling and 3D engineering solutions.",
    solutions: ["CAD Design", "FEA Analysis", "Product Design", "Engineering"]
  },
  {
    icon: <Factory className="w-8 h-8 text-blue-600" />,
    title: "Manufacturing",
    description: "Industry 4.0 solutions for smart manufacturing.",
    solutions: ["Automation", "Quality Control", "Process Optimization", "Smart Factory"]
  }
];

export function IndustriesSection() {
  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Industries
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            We deliver tailored technology solutions across various industries to help businesses thrive in the digital age.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              variants={itemVariants}
              className="group relative bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 mb-4">
                  {industry.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-4">
                  {industry.description}
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Solutions:</h4>
                  <ul className="space-y-1.5">
                    {industry.solutions.map((solution, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute inset-0 transform scale-95 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
