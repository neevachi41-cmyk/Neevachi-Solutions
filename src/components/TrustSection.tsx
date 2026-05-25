import { Users, Package, Briefcase, Handshake } from 'lucide-react';

const stats = [
  { icon: Users, value: "5000+", label: "CUSTOMERS" },
  { icon: Package, value: "200+", label: "SKU'S" },
  { icon: Briefcase, value: "25+", label: "PROJECTS" },
  { icon: Handshake, value: "50+", label: "B2B PARTNERS" },
];

export function TrustSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background with fixed scrolling effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Static Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            THE TRUST WE GAINED
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Technobotix has established itself as a trusted partner in the technology industry, 
            delivering innovative solutions and building lasting relationships with clients worldwide. 
            Our commitment to excellence and customer satisfaction has earned us the trust of 
            thousands of customers and partners across the globe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative group text-center p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-black/50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 border border-white/10">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm font-medium">
                {stat.label}
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
