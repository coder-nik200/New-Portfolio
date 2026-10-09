import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { experience } from "@/config/experience";

const techIcons: Record<string, string> = {
  IoT: "arduino",
  "Internet of Things": "arduino",
  Arduino: "arduino",
  ESP32: "espressif",
  RaspberryPi: "raspberrypi",
  MQTT: "mqtt",
  Sensors: "arduino",
  React: "react",
  "Next.js": "nextdotjs",
  Nextjs: "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML: "html5",
  CSS: "css",
  TailwindCSS: "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framer",
  "Node.js": "nodedotjs",
  Nodejs: "nodedotjs",
  Express: "express",
  "Express.js": "express",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  Firebase: "firebase",
  Cloudinary: "cloudinary",
  Git: "git",
  GitHub: "github",
  Postman: "postman",
  Docker: "docker",
  Linux: "linux",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 text-base font-semibold tracking-tight text-foreground">
      <span
        aria-hidden="true"
        className="h-4 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400"
      />
      {children}
    </h3>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-secondary">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function TechnologyBadge({ name }: { name: string }) {
  const icon = techIcons[name];

  return (
    <li className="group inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2 text-xs font-medium text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-600/40 hover:bg-emerald-500/5 hover:shadow-md">
      {icon ? (
        <Image
          src={`https://cdn.simpleicons.org/${icon}`}
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
          unoptimized
        />
      ) : (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-emerald-600"
        />
      )}

      <span className="whitespace-nowrap">{name}</span>
    </li>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-10">
      <Container>
        <Link
          href="/"
          className={`group mb-10 inline-flex items-center gap-2 rounded-md text-sm text-secondary transition-colors hover:text-foreground ${focusRing}`}
        >
          <span
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
          >
            ←
          </span>
          Back to home
        </Link>

        <header className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Professional experience
          </h1>

          <p className="mt-4 max-w-prose text-base leading-7 text-secondary">
            A look at my professional journey, technical skills, and growth
            through real-world learning experiences.
          </p>
        </header>

        <div className="space-y-16">
          {experience.map((item) => {
            const isArchitech = item.company
              .toLowerCase()
              .includes("architech");

            const logo = isArchitech
              ? "/assets/Architech-Labs.png"
              : "/assets/dav-college-logo.png";

            return (
              <article key={`${item.company}-${item.role}`}>
                {/* Company Header */}
                <div className="relative overflow-hidden rounded-2xl border border-emerald-700/15 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(5_150_105/0.28)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
                  />

                  <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
                    {/* Circular Company Logo */}
                    <div className="group relative size-20 shrink-0 overflow-hidden rounded-full border border-emerald-700/15 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:border-emerald-600/40 hover:shadow-md sm:size-24">
                      <Image
                        src={logo}
                        alt={`${item.company} logo`}
                        fill
                        sizes="(max-width: 640px) 80px, 96px"
                        className="rounded-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Company Information */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {item.company}
                      </h2>

                      <p className="mt-1.5 text-base text-foreground/80 sm:text-lg">
                        {item.role}
                      </p>

                      <dl className="mt-6 grid gap-x-10 gap-y-4 border-t border-emerald-700/15 pt-5 sm:grid-cols-[auto_auto_auto] sm:justify-start">
                        <MetaItem label="Type" value="Internship" />
                        <MetaItem label="Period" value={item.periodLong} />
                        <MetaItem label="Location" value={item.locationLong} />
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.8fr)] lg:gap-14">
                  {/* Main Content */}
                  <div className="min-w-0 space-y-10">
                    <section>
                      <SectionTitle>Overview</SectionTitle>

                      <p className="max-w-prose text-[0.95rem] leading-7 text-secondary">
                        During my time at {item.company}, I gained exposure to
                        frontend development, technical support, and
                        IoT-oriented technology workflows. This experience
                        helped me understand how web interfaces, software
                        troubleshooting, and connected-device concepts fit into
                        modern technology environments.
                      </p>
                    </section>

                    {/* Responsibilities */}
                    <section>
                      <SectionTitle>Responsibilities and learning</SectionTitle>

                      <ul className="divide-y divide-border/60 border-y border-border/60">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex gap-4 py-4 text-[0.95rem] leading-7 text-secondary"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.7rem] size-1.5 shrink-0 rounded-[2px] bg-emerald-600 dark:bg-emerald-400"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Key Takeaways */}
                    <section>
                      <SectionTitle>Key takeaways</SectionTitle>

                      <div className="grid gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-border/60">
                        <div className="sm:pr-8">
                          <h4 className="text-sm font-semibold text-foreground">
                            Technical growth
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-secondary">
                            Improved understanding of frontend development,
                            debugging, technical troubleshooting, and IoT
                            concepts.
                          </p>
                        </div>

                        <div className="sm:pl-8">
                          <h4 className="text-sm font-semibold text-foreground">
                            Professional growth
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-secondary">
                            Developed problem-solving, communication, debugging,
                            and software development workflow skills.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Navigation Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Link
                        href="/#contact"
                        className={`inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 ${focusRing}`}
                      >
                        Get in touch
                      </Link>

                      <Link
                        href="/"
                        className={`inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-emerald-600/50 hover:bg-emerald-500/5 ${focusRing}`}
                      >
                        Back to portfolio
                      </Link>
                    </div>
                  </div>

                  {/* Technology Sidebar */}
                  <aside className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6 lg:sticky lg:top-24">
                    <SectionTitle>Technologies and tools</SectionTitle>

                    <ul className="flex flex-wrap items-center gap-2.5">
                      {item.tech.map((tech) => (
                        <TechnologyBadge key={tech} name={tech} />
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-border/70 pt-5">
                      <p className="text-xs text-secondary">Role</p>

                      <p className="mt-1.5 text-sm font-medium leading-6 text-foreground">
                        Frontend development and technical support
                      </p>

                      <p className="mt-2 text-sm leading-6 text-secondary">
                        Working across user interfaces, troubleshooting, and
                        exposure to IoT-related concepts.
                      </p>
                    </div>
                  </aside>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
