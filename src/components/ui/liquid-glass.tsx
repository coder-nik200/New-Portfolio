import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Intensity = "sm" | "md" | "lg";

const blurMap: Record<Intensity, string> = {
  sm: "18px",
  md: "28px",
  lg: "38px",
};

const shadowMap: Record<Intensity, string> = {
  sm: "shadow-md",
  md: "shadow-lg",
  lg: "shadow-2xl",
};

const glowMap: Record<Intensity, string> = {
  sm: "before:opacity-20",
  md: "before:opacity-40",
  lg: "before:opacity-60",
};

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  style?: CSSProperties;
  glowIntensity?: Intensity;
  shadowIntensity?: Intensity;
  blurIntensity?: Intensity;
  borderRadius?: string;
  draggable?: boolean;
}

export function LiquidGlassCard({
  children,
  className,
  contentClassName,
  style,
  glowIntensity = "md",
  shadowIntensity = "md",
  blurIntensity = "md",
  borderRadius = "16px",
  draggable = false,
}: LiquidGlassCardProps) {
  return (
    <div
      draggable={draggable}
      className={cn(
        "relative isolate overflow-hidden border border-black/10 bg-white/35 ring-1 ring-white/20 backdrop-blur-md dark:border-white/15 dark:bg-black/30 dark:ring-white/10",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-white/70 before:via-transparent before:to-transparent before:content-['']",
        glowMap[glowIntensity],
        shadowMap[shadowIntensity],
        className,
      )}
      style={{
        borderRadius,
        backdropFilter: `blur(${blurMap[blurIntensity]}) saturate(1.8) contrast(1.04)`,
        WebkitBackdropFilter: `blur(${blurMap[blurIntensity]}) saturate(1.8) contrast(1.04)`,
        ...style,
      }}
    >
      <div
        className={cn("relative z-10 flex h-full flex-col", contentClassName)}
      >
        {children}
      </div>
    </div>
  );
}
