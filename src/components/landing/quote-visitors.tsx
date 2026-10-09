"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { quoteConfig } from "@/config/quote";
import { getOrdinalSuffix } from "@/lib/ordinal";

export function QuoteVisitorCard() {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const key = "visitor-counted";
    const alreadyCounted = sessionStorage.getItem(key);

    const load = async () => {
      try {
        if (!alreadyCounted) {
          const res = await fetch("/api/visitors", { method: "POST" });
          if (!res.ok) throw new Error("count failed");
          const data = (await res.json()) as { count: number };
          sessionStorage.setItem(key, "true");
          setCount(data.count);
          return;
        }

        const res = await fetch("/api/visitors");
        if (!res.ok) throw new Error("count failed");
        const data = (await res.json()) as { count: number };
        setCount(data.count);
      } catch {
        setFailed(true);
      }
    };

    void load();
  }, []);

  return (
    <Container>
      <LiquidGlassCard
        glowIntensity="sm"
        shadowIntensity="md"
        borderRadius="18px"
        blurIntensity="md"
        className="animate-in-up-on-view"
      >
        <div className="grid sm:grid-cols-[1fr_auto]">
          {/* Quote */}
          <figure className="relative p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1 select-none font-serif text-8xl leading-none text-emerald-600/25 dark:text-emerald-400/25 sm:left-7 sm:text-9xl"
            >
              &ldquo;
            </span>

            <blockquote className="relative pt-8 sm:pt-10">
              <p className="max-w-prose whitespace-pre-line font-serif text-lg italic leading-8 text-foreground sm:text-xl sm:leading-9">
                {quoteConfig.text}
              </p>
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-emerald-600/60 dark:bg-emerald-400/60"
              />
              {quoteConfig.author}
            </figcaption>
          </figure>

          {/* Visitor stub: a perforated edge, like a ticket */}
          <div
            className="flex min-w-[210px] flex-col items-center justify-center gap-1 border-t border-dashed border-border px-6 py-6 text-center sm:border-l sm:border-t-0 sm:px-8"
            aria-live="polite"
          >
            {count !== null ? (
              <>
                <p className="text-sm text-muted-foreground">You are visitor</p>
                <p className="flex items-start justify-center text-foreground">
                  <span className="text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl">
                    {count.toLocaleString()}
                  </span>
                  <sup className="ml-1 mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {getOrdinalSuffix(count)}
                  </sup>
                </p>
              </>
            ) : failed ? (
              <p className="max-w-[16ch] text-sm leading-6 text-muted-foreground">
                Thanks for visiting.
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Counting visitors
                </p>
                <span
                  aria-hidden="true"
                  className="mt-1 h-12 w-24 animate-pulse rounded-lg bg-foreground/10 motion-reduce:animate-none"
                />
              </>
            )}
          </div>
        </div>
      </LiquidGlassCard>
    </Container>
  );
}
