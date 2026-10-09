"use client";

import { useEffect, useState } from "react";

const titles = [
  "MERN Stack Developer",
  "Frontend Developer",
  "React & Next.js Developer",
  "MCA Student | Problem Solver",
];

export function RotatingTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((previous) => (previous + 1) % titles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      aria-live="polite"
      className="text-lg font-medium text-secondary sm:text-xl"
    >
      {titles[index]}
    </p>
  );
}
