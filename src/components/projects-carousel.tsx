"use client";

import { useRouter } from "next/navigation";
import { Container } from "@/components/container";
import FlexCarousel, { type FlexCarouselItem } from "@/components/FlexCarousel";

import { projects } from "@/config/projects";

export function ProjectsCarousel() {
  const router = useRouter();

  const items: FlexCarouselItem[] = projects.map((project) => ({
    src: project.cover ?? "/assets/projects/placeholder.png",
    alt: project.title,
    title: project.title,
    // subtitle: project.description,
  }));

  return (
    <section className="w-full overflow-hidden py-12">
      {/* Heading */}
      <div className="mx-auto mb-8 max-w-6xl px-4">
        <Container className="mb-8">
          <p className="text-sm text-secondary">Selected Work</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
        </Container>
      </div>

      {/* Carousel */}
      <div className="relative h-[450px] w-full md:h-[600px]">
        <FlexCarousel
          items={items}
          preset="liquid"
          intro="rise"
          fit="landscape"
          cardHeight={0.65}
          gap={20}
          radius={16}
          bend={0.34}
          dispersion={0.45}
          squeeze={0.2}
          focusOnClick={false}
          autoplay={false}
          captions={true}
          captureWheel={false}
          onSelect={(index) => {
            router.push(`/projects/${projects[index].slug}`);
          }}
        />
      </div>

      {/* View All */}
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
