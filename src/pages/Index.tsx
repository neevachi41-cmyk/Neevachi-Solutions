import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CTASection } from "@/components/CTASection";
import { TrustSection } from "@/components/TrustSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <TrustSection />
        <ProjectsSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
