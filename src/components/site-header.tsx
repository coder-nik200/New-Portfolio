"use client";

import Link from "next/link";
import Image from "next/image";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { moreNav, gooeyNavItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Pattern } from "@/components/theme-toggle";
import { GooeyNav } from "@/components/ui/gooey-nav";

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1 text-sm text-secondary transition-colors hover:text-foreground"
      >
        More
        <CaretDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-40 rounded-xl border border-border bg-card p-1.5 shadow-xl"
        >
          {moreNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const openCommand = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-(--portfolio-content-width) items-center justify-between gap-4 px-5 sm:px-0">
          {/* Logo */}
          <Link href="/" aria-label="Home">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={30}
              height={30}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 md:flex">
            <GooeyNav
              items={gooeyNavItems}
              size="sm"
              activeColor="var(--foreground)"
              activeLabelColor="var(--background)"
              aria-label="Main navigation"
            />

            {/* Existing More Dropdown */}
            <MoreMenu />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCommand}
              aria-label="Open search"
              className="hidden h-8 items-center gap-2 rounded-full border border-border bg-card/80 px-3 text-sm text-secondary shadow-sm transition-colors hover:text-foreground md:inline-flex"
            >
              <MagnifyingGlass size={16} weight="bold" />

              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
                  ⌘
                </kbd>
                <kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
                  K
                </kbd>
              </span>
            </button>

            <div className="hidden h-4 w-px bg-border md:block" />

            <Pattern />
          </div>
        </div>
      </header>
    </>
  );
}
