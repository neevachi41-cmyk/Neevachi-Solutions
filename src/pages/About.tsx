import { HeroSection } from "@/components/HeroSection";
import { IndustriesSection } from "@/components/IndustriesSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <IndustriesSection />
      </main>
    </div>
  );
};

export default About;
