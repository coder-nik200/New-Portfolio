"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaretDown, House, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import { headerNav, moreNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { LiquidGlassCard } from "@/lib/liquid-glass";

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
  const pathname = usePathname();

  const openCommand = () => {
    document.dispatchEvent(new CustomEvent("open-command-menu"));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground"
          >
            NK
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-4 text-sm font-medium sm:flex sm:gap-5"
            >
              {headerNav.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      active
                        ? "font-semibold text-foreground"
                        : "text-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <MoreMenu />
            </nav>

            <button
              type="button"
              onClick={openCommand}
              aria-label="Open search"
              className="hidden h-8 items-center gap-2 rounded-full border border-border bg-card/80 px-3 text-sm text-secondary shadow-sm transition-colors hover:text-foreground sm:inline-flex"
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

            <div className="hidden h-4 w-px bg-border sm:block" />

            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
        <LiquidGlassCard className="p-1.5" contentClassName="flex-row gap-2">
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full text-secondary",
              pathname === "/" && "bg-foreground text-background",
            )}
          >
            <House size={20} />
          </Link>

          <button
            type="button"
            onClick={openCommand}
            aria-label="Search portfolio"
            className="inline-flex h-10 min-w-36 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-foreground"
          >
            <MagnifyingGlass size={16} weight="bold" />
            Search
          </button>
        </LiquidGlassCard>
      </div>
    </>
  );
}
