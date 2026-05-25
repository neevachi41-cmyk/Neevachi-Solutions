import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CircuitBoard, Box, FileText } from "lucide-react";

const quotations = [
  {
    icon: CircuitBoard,
    title: "PCB Quotation",
    description: "Get instant pricing for PCB manufacturing",
  },
  {
    icon: Box,
    title: "3D Printing Quotation",
    description: "Rapid prototyping cost estimates",
  },
  {
    icon: FileText,
    title: "Project Quotation",
    description: "Full project development quotes",
  },
];

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden text-gray-800">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80")',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Get instant quotations for PCB manufacturing and 3D printing services. Our team is ready to bring your ideas to life!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {quotations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Button
                variant="outline"
                className="w-full h-auto p-6 flex flex-col items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-5 mx-auto shadow-lg"
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
