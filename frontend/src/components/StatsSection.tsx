import { motion } from 'framer-motion';

import { Briefcase, Calendar, Users, UsersRound } from 'lucide-react';

const stats = [
  { icon: Calendar, value: "2022", label: "Year Founded" },
  { icon: Briefcase, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "35+", label: "Happy Clients" },
  { icon: UsersRound, value: "12+", label: "Team Members" },
];

export function StatsSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group text-center p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
