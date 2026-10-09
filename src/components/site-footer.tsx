"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

import { Container } from "@/components/container";
import { siteConfig } from "@/config/meta";
import { GitHubButton } from "@/components/ui/github-button";

const footerSocial = [
  {
    name: "GitHub",
    href: "https://github.com/coder-nik200",
    icon: GithubLogo,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nitish-kumar-bharti-631a37359/",
    icon: LinkedinLogo,
  },
  {
    name: "X",
    href: "https://x.com/code_Bharti07",
    icon: XLogo,
  },
];

export function SiteFooter() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center font-mono text-sm text-secondary sm:text-left">
          <p>
            © {year ?? "2026"} {siteConfig.name}
          </p>

          <p className="mt-1">Built with curiosity, code, and coffee.</p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <GitHubButton />

          <div className="flex items-center gap-2">
            {footerSocial.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  title={link.name}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-secondary transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
