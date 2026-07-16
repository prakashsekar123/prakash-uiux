import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import PhilosophySection from "./sections/PhilosophySection";
import ContactSection from "./sections/ContactSection";
import Footer from "./Footer";

export default function HomePage() {
  const location = useLocation();

  // Deep-linking: /#projects should land on that section, whether arriving
  // fresh or navigated back from a case-study page.
  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.replace("#", "");
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <PhilosophySection />
      <ContactSection />
      <Footer />
    </>
  );
}
