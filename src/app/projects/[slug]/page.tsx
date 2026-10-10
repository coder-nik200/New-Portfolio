import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Code,
  GithubLogo,
  Globe,
  Stack,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/container";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { projects } from "@/config/projects";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const instant = false;

const highlightClass = "font-medium text-teal-600 dark:text-cyan-400";
const highlightColor = "text-teal-600 dark:text-cyan-400";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return createPageMetadata({
    title: pageTitle(project.title),
    description: project.description,
    path: `/projects/${slug}`,
    type: "article",
  });
}

function getRepoName(url?: string) {
  if (!url) return null;
  try {
    const [owner, repo] = new URL(url).pathname.split("/").filter(Boolean);
    return owner && repo ? `${owner}/${repo}` : null;
  } catch {
    return null;
  }
}

function getHost(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);

  if (index === -1) notFound();

  const project = projects[index];
  const {
    title,
    description,
    date,
    cover,
    tech = [],
    href: repoHref,
    website: websiteHref,
  } = project;

  const host = getHost(websiteHref);
  const repoName = getRepoName(repoHref);
  const projectNumber = String(index + 1).padStart(2, "0");

  const total = projects.length;
  const prev = total > 1 ? projects[(index - 1 + total) % total] : null;
  const next = total > 1 ? projects[(index + 1) % total] : null;

  const hasFacts = Boolean(date) || tech.length > 0 || Boolean(host);

  return (
    <div className="overflow-x-clip pb-24 pt-8">
      <Container>
        {/* Back */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>

        {/* Hero */}
        <section className="relative mt-12 sm:mt-16">
          {/* The one bold gesture: an oversized index numeral behind the title */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -right-2 -top-16 select-none text-[11rem] font-bold leading-none tracking-tighter opacity-[0.14] sm:-top-24 sm:text-[20rem] ${highlightColor}`}
          >
            {projectNumber}
          </span>

          <div className="relative max-w-4xl">
            <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              {title}
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-secondary sm:text-xl sm:leading-9">
              {description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {websiteHref && (
                <Link
                  href={websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-background transition-all hover:gap-3 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Globe className="size-4" weight="bold" />
                  Visit live site
                  <ArrowUpRight className="size-4" weight="bold" />
                </Link>
              )}

              {repoHref && (
                <Link
                  href={repoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <GithubLogo className="size-4" weight="bold" />
                  View source
                  <ArrowUpRight className="size-4" weight="bold" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Cover in a browser frame */}
        {cover && (
          <section className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 -bottom-6 top-20 -z-10 rounded-[3rem] bg-primary/10 blur-3xl"
            />

            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="md"
              borderRadius="20px"
              blurIntensity="md"
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 border-b border-border/60 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                </div>

                <div className="mx-auto w-full max-w-xs truncate rounded-full bg-muted/60 px-4 py-1 text-center text-xs text-muted-foreground">
                  {host ?? title}
                </div>

                <div className="hidden w-12 sm:block" aria-hidden="true" />
              </div>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={cover}
                  alt={`Screenshot of ${title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover object-top"
                />
              </div>
            </LiquidGlassCard>
          </section>
        )}

        {/* About + details */}
        <section className="mt-24 grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
          <article className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight">
              About this project
            </h2>

            <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-secondary">
              <p>{description}</p>
              <p>
                This project reflects my approach to building software:
                exploring ideas, solving practical problems, and applying
                technical concepts to create useful digital experiences.
              </p>
            </div>

            {(websiteHref || repoHref) && (
              <ul className="mt-10 max-w-2xl divide-y divide-border border-y border-border">
                {websiteHref && (
                  <li>
                    <Link
                      href={websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 text-base font-medium transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Globe className="size-5 text-muted-foreground" />
                        Explore the live website
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                )}

                {repoHref && (
                  <li>
                    <Link
                      href={repoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 text-base font-medium transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="inline-flex items-center gap-3">
                        <GithubLogo className="size-5 text-muted-foreground" />
                        View the source code on GitHub
                      </span>
                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LiquidGlassCard
              glowIntensity="sm"
              shadowIntensity="sm"
              borderRadius="20px"
              blurIntensity="sm"
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-400"
              />

              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    At a glance
                  </h2>
                  <p className="text-sm tabular-nums text-muted-foreground">
                    <span className={highlightClass}>{projectNumber}</span> of{" "}
                    {String(total).padStart(2, "0")}
                  </p>
                </div>

                <dl className="mt-6 space-y-5">
                  {date && (
                    <div className="flex items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 dark:bg-cyan-400/10">
                        <CalendarBlank
                          className={`size-[18px] ${highlightColor}`}
                        />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">
                          Released
                        </dt>
                        <dd className={`mt-0.5 text-sm ${highlightClass}`}>
                          {date}
                        </dd>
                      </div>
                    </div>
                  )}

                  {tech.length > 0 && (
                    <div className="flex items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 dark:bg-cyan-400/10">
                        <Code className={`size-[18px] ${highlightColor}`} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">
                          Core stack
                        </dt>
                        <dd className="mt-1.5 flex flex-wrap gap-1.5">
                          {tech.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className={`rounded-md bg-teal-500/10 px-2 py-0.5 text-xs dark:bg-cyan-400/10 ${highlightClass}`}
                            >
                              {item}
                            </span>
                          ))}
                          {tech.length > 4 && (
                            <span className="px-1 py-0.5 text-xs text-muted-foreground">
                              +{tech.length - 4} more
                            </span>
                          )}
                        </dd>
                      </div>
                    </div>
                  )}

                  {host && (
                    <div className="flex items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 dark:bg-cyan-400/10">
                        <Globe className={`size-[18px] ${highlightColor}`} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">
                          Live site
                        </dt>
                        <dd className="mt-0.5 truncate text-sm">
                          <Link
                            href={websiteHref!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline-offset-4 hover:underline ${highlightClass}`}
                          >
                            {host}
                          </Link>
                        </dd>
                      </div>
                    </div>
                  )}

                  {repoName && (
                    <div className="flex items-start gap-3.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 dark:bg-cyan-400/10">
                        <GithubLogo
                          className={`size-[18px] ${highlightColor}`}
                        />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">
                          Repository
                        </dt>
                        <dd className="mt-0.5 truncate text-sm">
                          <Link
                            href={repoHref!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline-offset-4 hover:underline ${highlightClass}`}
                          >
                            {repoName}
                          </Link>
                        </dd>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 dark:bg-cyan-400/10">
                      <Stack className={`size-[18px] ${highlightColor}`} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs text-muted-foreground">
                        Availability
                      </dt>
                      <dd className={`mt-0.5 text-sm ${highlightClass}`}>
                        {websiteHref && repoHref
                          ? "Live and open source"
                          : websiteHref
                            ? "Live"
                            : repoHref
                              ? "Open source"
                              : "In development"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </LiquidGlassCard>
          </aside>
        </section>

        {/* Tech stack */}
        {tech.length > 0 && (
          <section className="mt-24 grid gap-8 md:grid-cols-[220px_1fr] md:gap-16">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Built with
              </h2>
              <p className="mt-2 text-sm leading-6 text-secondary">
                The tools behind {title}.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {tech.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm transition-colors hover:bg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Previous / next */}
        {prev && next && (
          <nav
            aria-label="More projects"
            className="mt-20 grid gap-3 sm:grid-cols-2"
          >
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-foreground/30 group-hover:bg-primary group-hover:text-background">
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </span>

              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">
                  Previous
                </span>
                <span className="mt-0.5 block truncate text-base font-medium tracking-tight">
                  {prev.title}
                </span>
              </span>
            </Link>

            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-row-reverse items-center gap-4 rounded-2xl border border-border p-4 text-right transition-all duration-300 hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-foreground/30 group-hover:bg-primary group-hover:text-background">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>

              <span className="min-w-0">
                <span className="block text-xs text-muted-foreground">
                  Next
                </span>
                <span className="mt-0.5 block truncate text-base font-medium tracking-tight">
                  {next.title}
                </span>
              </span>
            </Link>
          </nav>
        )}
      </Container>
    </div>
  );
}
