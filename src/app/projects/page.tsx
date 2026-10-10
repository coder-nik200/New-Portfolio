import { Container } from "@/components/container";
import { ProjectsGrid } from "@/components/projects-grid";
import { projects } from "@/config/projects";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pageTitle("Projects"),
  description:
    "Explore my projects in full-stack development, interactive web experiences, browser extensions, and AI-powered applications.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-16 pt-8">
      <Container>
        <p className="text-sm text-secondary">Things I've built</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-secondary">
          A collection of projects I've built while exploring ideas,
          solving problems, and pushing my development skills further.
          From full-stack applications and browser extensions to
          interactive web experiences, each project represents something
          new I've learned along the way.
        </p>
      </Container>

      <ProjectsGrid items={projects} showHeading={false} />
    </div>
  );
}