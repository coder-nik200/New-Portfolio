"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { experience, type ExperienceItem } from "@/config/experience";

const techIcons: Record<string, string> = {
  // IoT & Embedded Systems
  IoT: "arduino",
  "Internet of Things": "arduino",
  Arduino: "arduino",
  ESP32: "espressif",
  RaspberryPi: "raspberrypi",
  MQTT: "mqtt",
  "Embedded Systems": "raspberrypi",
  Sensors: "arduino",

  // Frontend Development
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
  "Responsive Design": "html5",

  // Backend & APIs
  "Node.js": "nodedotjs",
  Nodejs: "nodedotjs",
  Express: "express",
  "Express.js": "express",
  REST: "fastapi",
  "REST APIs": "fastapi",
  "REST API Integration": "fastapi",
  WebSockets: "socketdotio",
  "Real-time Communication": "socketdotio",

  // Databases & Cloud
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  Firebase: "firebase",
  Cloudinary: "cloudinary",
  AWS: "amazonwebservices",
  Docker: "docker",

  // AI & Data Processing
  Python: "python",
  "Machine Learning": "tensorflow",
  TensorFlow: "tensorflow",
  "Data Pipelines": "apacheairflow",
  "Feature Engineering": "scikitlearn",

  // Development Tools
  Git: "git",
  GitHub: "github",
  Postman: "postman",
  Vercel: "vercel",
  Linux: "linux",
};

function ExperienceItemCard({
  item,
  delay,
}: {
  item: ExperienceItem;
  delay: number;
}) {
  return (
    <article
      className="animate-in-up-on-view py-7"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="grid gap-4 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-start">
        {/* Company Logo */}
        <Link
          href="/work"
          aria-label={`View ${item.company} experience`}
          className="group relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-white p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <Image
            src={
              item.company.toLowerCase().includes("architech")
                ? "/assets/Architech-Labs.png"
                : "/assets/dav-college-logo.png"
            }
            alt={`${item.company} logo`}
            fill
            sizes="80px"
            className="rounded-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {/* Experience Details */}
        <div className="min-w-0">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {item.company}
          </h3>

          <p className="mt-1 text-xl text-foreground">{item.role}</p>
        </div>

        {/* Period and Location */}
        <div className="text-left text-base text-secondary sm:min-w-[190px] sm:text-right sm:text-lg">
          <p>{item.periodLong}</p>
          <p className="mt-1">{item.locationLong}</p>
        </div>
      </div>

      {/* Technologies */}
      {item.tech && item.tech.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-bold tracking-tight text-foreground">
            Technologies
          </h4>

          <div className="mt-4 flex flex-wrap gap-3">
            {item.tech.map((tech) => {
              const icon =
                techIcons[tech] ?? tech.toLowerCase().replaceAll(" ", "");

              return (
                <span
                  key={`${item.company}-${tech}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm"
                >
                  <Image
                    src={`https://cdn.simpleicons.org/${icon}`}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0"
                    unoptimized
                  />
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Responsibilities */}
      {item.details && item.details.length > 0 && (
        <ul className="mt-6 space-y-3 text-base leading-relaxed text-secondary sm:text-lg">
          {item.details.map((detail) => (
            <li key={detail} className="flex gap-3">
              <span className="mt-[0.65em] size-1.5 shrink-0 bg-secondary/70" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function FeaturedExperienceSection() {
  return (
    <Container>
      {/* Section Heading */}
      <div className="mb-8">
        <p className="text-sm text-secondary">My Journey</p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Experience
        </h2>
      </div>

      {/* Experience List */}
      <div className="divide-y divide-border/70">
        {experience.map((item, index) => (
          <ExperienceItemCard
            key={`${item.company}-${item.role}`}
            item={item}
            delay={0.08 + index * 0.08}
          />
        ))}
      </div>

      {/* View All */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/work"
          className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
        >
          View All Experience
        </Link>
      </div>
    </Container>
  );
}
