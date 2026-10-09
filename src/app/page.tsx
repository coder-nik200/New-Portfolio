import { Hero } from "@/components/landing/hero";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { FeaturedExperienceSection } from "@/components/landing/experience-section";
import { GitHubContributions } from "@/components/landing/github";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-24 pt-0 sm:space-y-16 sm:pb-20 sm:pt-8">
      <Hero />
      <TechStackSection />
      <FeaturedExperienceSection />
      <GitHubContributions />
    </div>
  );
}
