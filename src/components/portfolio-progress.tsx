"use client";

import ScrollProgress from "@/components/scroll-progress";
import { scrollProgressNav } from "@/config/navigation";

export function PortfolioProgress() {
  return <ScrollProgress sections={scrollProgressNav} />;
}
