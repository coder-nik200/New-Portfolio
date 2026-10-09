"use client";

import { useEffect, useState } from "react";
import { heroConfig } from "@/config/hero";
import { cn } from "@/lib/utils";

function formatTime(timeZone: string, date: Date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
}

function getTimeParts(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  return { hour, minute };
}

export function TimezoneWidget({ className }: { className?: string }) {
  const [visitorTz, setVisitorTz] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setNow(new Date());

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1_000);

    return () => window.clearInterval(interval);
  }, []);

  if (!visitorTz || !now) {
    return (
      <div
        className={cn("min-w-0 text-right text-xs text-secondary", className)}
        aria-hidden="true"
      >
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const myTz = heroConfig.timezone;

  const visitorTime = getTimeParts(visitorTz, now);
  const myTimeParts = getTimeParts(myTz, now);

  const sameTime =
    visitorTime.hour === myTimeParts.hour &&
    visitorTime.minute === myTimeParts.minute;

  const myTime = formatTime(myTz, now);
  const yourTime = formatTime(visitorTz, now);

  return (
    <div className={cn("min-w-0 text-right text-xs text-secondary", className)}>
      {sameTime ? (
        <p className="min-w-0 leading-tight">
          <span className="font-semibold text-foreground">{myTime}</span>
          <span className="mx-1">·</span>
          same time
        </p>
      ) : (
        <div className="space-y-1 leading-tight">
          <p>
            <span className="uppercase tracking-wide">Your</span>{" "}
            <span className="font-semibold text-foreground">{yourTime}</span>
          </p>

          <p>
            <span className="uppercase tracking-wide">My</span>{" "}
            <span className="font-semibold text-foreground">{myTime}</span>
          </p>
        </div>
      )}
    </div>
  );
}
