import { motion } from 'framer-motion';

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

export function WhyChooseUsSection() {
  return (
    <section className="py-12 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Why Choose Neevachi Solutions?
          </h2>
          <p className="text-muted-foreground text-base max-w-3xl mx-auto">
            With over 5 years of experience in the tech industry, we combine cutting-edge technology with innovative solutions to bring your ideas to life. Our team of experts is dedicated to delivering high-quality, scalable, and efficient solutions that drive your business forward. From concept to deployment, we ensure excellence at every step of your project journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Expertise</h3>
            <p className="text-muted-foreground">Deep knowledge in robotics, IoT, embedded systems, PCB design, and 3D engineering with over 5 years of industry experience.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Innovation</h3>
            <p className="text-muted-foreground">Staying ahead with the latest technologies and trends to deliver cutting-edge solutions that give you a competitive edge.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Quality</h3>
            <p className="text-muted-foreground">Rigorous testing and quality assurance processes ensuring reliable, bug-free, and high-performance products every time.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Timely Delivery</h3>
            <p className="text-muted-foreground">Commitment to meeting deadlines without compromising on quality, ensuring your project stays on track and within budget.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Customer Support</h3>
            <p className="text-muted-foreground">24/7 dedicated support team ready to assist you with any questions, issues, or technical challenges you may face.</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-card-hover"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">Cost-Effective</h3>
            <p className="text-muted-foreground">Competitive pricing without compromising on quality, offering excellent value for your investment in technology solutions.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
