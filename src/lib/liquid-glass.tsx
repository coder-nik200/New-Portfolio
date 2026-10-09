import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  contentClassName?: string;
}

export function LiquidGlassCard({
  children,
  className,
  contentClassName,
  ...props
}: LiquidGlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-full border border-white/30 bg-white/15 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70",
        className,
      )}
    >
      <div className={cn("flex items-center", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
