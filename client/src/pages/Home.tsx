/*
 * Home Page — Quiet Luxury Minimalism
 * Liangxi Liu Personal Website
 * Sections: Hero → About → Experience → Research → Projects → Skills → GitHub → Blog → Contact → Footer
 */

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import GitHubSection from "@/components/GitHubSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ResearchSection />
      <ProjectsSection />
      <SkillsSection />
      <GitHubSection />
      <BlogPreviewSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
