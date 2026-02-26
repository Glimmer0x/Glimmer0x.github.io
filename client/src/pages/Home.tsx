/*
 * Home Page — Quiet Luxury Minimalism
 * Liangxi Liu Personal Website
 * Sections: Hero → About → Blog → Research → Projects → Timeline → Exploring → GitHub → Contact → Footer
 */

import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import ResearchSection from "@/components/ResearchSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ExploringSection from "@/components/ExploringSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BlogPreviewSection />
      <ResearchSection />
      <ProjectsSection />
      <TimelineSection />
      <ExploringSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
