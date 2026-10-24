import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface ArrowButtonProps {
  direction?: "left" | "right";
  variant?: "ghost" | "default";
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ArrowButton({
  direction = "right",
  variant = "default",
  href,
  children,
  className,
}: ArrowButtonProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-4 py-2",
        "text-sm font-medium transition-all duration-300 ease-out",
        "hover:scale-[1.03] active:scale-95",
        variant === "ghost"
          ? "text-foreground hover:bg-muted"
          : "bg-foreground text-background hover:opacity-90",
        className,
      )}
    >
      {direction === "left" && (
        <Icon
          size={18}
          weight="bold"
          className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
        />
      )}

      <span className="transition-transform duration-300">{children}</span>

      {direction === "right" && (
        <Icon
          size={18}
          weight="bold"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        />
      )}
    </Link>
  );
}
