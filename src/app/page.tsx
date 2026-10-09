import { Hero } from "@/components/landing/hero";
import { TechStackSection } from "@/components/landing/tech-stack-section";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-24 pt-0 sm:space-y-16 sm:pb-20 sm:pt-8">
      <Hero />
      <TechStackSection />
    </div>
  );
}
