"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarBlank,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  MediumLogo,
  SealCheck,
  XLogo,
} from "@phosphor-icons/react";

import { ProfileAvatar } from "@/components/profile-avatar";
import { Container } from "@/components/container";
import { RotatingTitle } from "@/components/landing/rotating-title";
import { SpotifyLastPlayed } from "@/components/landing/spotify-last-played";
import { TimezoneWidget } from "@/components/landing/timezone-widget";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { heroConfig, socialLinks } from "@/config/hero";

const iconMap = {
  x: XLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  medium: MediumLogo,
  mail: EnvelopeSimple,
  resume: FileText,
} as const;

export type SocialIconKey = keyof typeof iconMap;

export function Hero() {
  return (
    <Container className="pt-4 sm:pt-0">
      <div className="animate-in-up-on-view flex flex-col gap-5">
        {/* Cover Banner */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden border border-foreground/15 sm:h-56">
          <Image
            src="/assets/nitish-header.jpeg"
            alt="Nitish Kumar Bharti — Portfolio Cover"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 960px"
            className="object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>

        {/* Timezone */}
        <TimezoneWidget className="-mt-3 self-end" />

        {/* Overlapping Profile Picture */}
        <div className="-mt-[calc(var(--grid-cell-size)*2)] flex items-end gap-4">
          <div className="relative z-30 shrink-0 rounded-full bg-background p-1">
            <ProfileAvatar />
          </div>
        </div>

        {/* Name and Rotating Title */}
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {heroConfig.name}

            <SealCheck
              className="size-6 shrink-0 text-[#1D9BF0] sm:size-7"
              weight="fill"
              aria-label="Profile badge"
            />
          </h1>

          <RotatingTitle />

          {/* Contact Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              href={heroConfig.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:text-sm"
            >
              <CalendarBlank className="size-3.5 sm:size-4" weight="bold" />
              Book a call
            </Link>

            <a
              href={`mailto:${heroConfig.email}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:text-sm"
            >
              <EnvelopeSimple className="size-3.5 sm:size-4" weight="bold" />
              Email me
            </a>
          </div>
        </div>

        {/* Introduction */}
        <p className="max-w-xl text-sm leading-relaxed text-secondary sm:text-base">
          {heroConfig.bio}
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-0.5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const external = link.href.startsWith("https://");

            return (
              <Tooltip key={link.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.name}
                    className="flex items-center gap-2 p-1 text-secondary transition-colors hover:text-foreground"
                  >
                    <Icon className="size-5" />
                  </Link>
                </TooltipTrigger>

                <TooltipContent>{link.name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Spotify Activity */}
        <div className="max-w-full pt-1">
          <SpotifyLastPlayed />
        </div>
      </div>
    </Container>
  );
}
