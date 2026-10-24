"use client";

import { useRouter } from "next/navigation";

import CircularCarousel, {
  type CircularCarouselItem,
} from "@/components/CircularCarousel";

import { Container } from "@/components/container";
import { projects } from "@/config/projects";

export function ProjectsCarousel() {
  const router = useRouter();

  const items: CircularCarouselItem[] = projects.map((project) => ({
    src: project.cover ?? "/assets/projects/placeholder.png",
    alt: project.title,
    title: project.title,
  }));

  return (
    <section className="w-full overflow-hidden py-12">
      {/* Heading */}
      <Container className="mb-8">
        <p className="text-sm text-secondary">Selected Work</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          Projects
        </h2>
      </Container>

      {/* Circular Carousel */}
      <div className="relative h-[260px] w-full sm:h-[360px] lg:h-[440px]">
        <CircularCarousel
          items={items}
          preset="panorama"
          intro="rise"
          cardWidth={400}
          aspectRatio={16 / 9}
          gap={12}
          tilt={0}
          autoplay="drift"
          speed={8}
          draggable
          pauseOnHover
          focusOnClick={false}
          captions
          onItemClick={(_, index) => {
            router.push(`/projects/${projects[index].slug}`);
          }}
        />
      </div>

      {/* View All Projects */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/projects")}
          className="rounded-lg border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View All Projects
        </button>
      </div>
    </section>
  );
}
