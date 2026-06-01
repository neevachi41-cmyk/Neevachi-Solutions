import { IndustriesSection } from "@/components/IndustriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CTASection } from "@/components/CTASection";
import { TrustSection } from "@/components/TrustSection";
import LatestUpdatesSlider from "@/components/LatestUpdatesSlider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <LatestUpdatesSlider />
        <ServicesSection clickable={false} />
        <WhyChooseUsSection />
        <TrustSection />
        <ProjectsSection />
        <CTASection />
        <IndustriesSection />
      </main>
    </div>
  );
};

export default Index;
