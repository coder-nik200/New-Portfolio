export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  href: string;
  website?: string;
  featured?: boolean;
  cover?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "studyhub",
    title: "StudyHub",
    date: "2026",
    description:
      "A role-based academic management platform connecting students, faculty, and administrators through organized learning workflows and secure authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "EmailJS"],
    href: "https://github.com/coder-nik200/Study-Hub.git",
    website: "https://study-frontend-pi.vercel.app/",
    featured: true,
    cover: "/assets/projects/studyhub.png",
    gradient: "from-blue-500/25 via-indigo-500/15 to-violet-500/25",
  },
  {
    slug: "medicity",
    title: "Medicity",
    date: "2026",
    description:
      "A healthcare web project focused on presenting medical information and services through a responsive, user-friendly interface.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    href: "https://github.com/coder-nik200",
    website: "https://medicity-frontend-zysc.vercel.app/",
    featured: true,
    cover: "/assets/projects/medicity.png",
    gradient: "from-cyan-500/25 via-sky-500/15 to-blue-500/25",
  },
  {
    slug: "bookmart",
    title: "BookMart",
    date: "2026",
    description:
      "A book-focused web application designed to provide a streamlined browsing experience with an emphasis on accessible content and clean UI.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    href: "https://github.com/coder-nik200",
    website: "https://book-mart-frontend.vercel.app/",
    cover: "/assets/projects/bookmart.png",
    gradient: "from-amber-500/25 via-orange-500/15 to-yellow-500/25",
  },
  {
    slug: "gfg-github-sync",
    title: "GFG GitHub Sync",
    date: "10.2026",
    description:
      "A Chrome extension that automatically syncs accepted GeeksforGeeks C++17 submissions to GitHub, helping developers maintain an organized coding portfolio.",
    tech: ["JavaScript", "GitHub API", "Chrome Extension API", "Manifest V3"],
    href: "https://github.com/coder-nik200/Gfg-Github-Sync",
    website: "https://gfg-github-sync-live.vercel.app/",
    featured: true,
    cover: "/assets/projects/gfg-github-sync.png",
    gradient: "from-green-500/25 via-emerald-500/15 to-lime-500/25",
  },
  {
    slug: "the-weekend",
    title: "The Weekend",
    date: "2026",
    description:
      "A cinematic, retro-inspired music player inspired by The Weeknd's After Hours era, featuring YouTube playlist playback, immersive visuals, custom audio controls, a live clock, and atmospheric VHS effects.",
    tech: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "YouTube IFrame Player API",
    ],
    href: "https://github.com/coder-nik200/The-Weekend",
    website: "https://theweekend-17.netlify.app/",
    featured: true,
    cover: "/assets/projects/the-weekend.png",
    gradient: "from-red-500/25 via-rose-500/15 to-purple-500/25",
  },
  {
    slug: "taylor-swift",
    title: "Taylor Swift | Eras After Midnight",
    date: "2026",
    description:
      "A cinematic, retro-inspired music player featuring Taylor Swift artwork, YouTube playlist playback, custom audio controls, a live clock, rotating quotes, and immersive VHS-style visual effects.",
    tech: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "YouTube IFrame Player API",
    ],
    href: "https://github.com/coder-nik200/Taylor-Swift",
    website: "https://taylorswift17.netlify.app/",
    featured: true,
    cover: "/assets/projects/taylor-swift.png",
    gradient: "from-rose-500/25 via-purple-500/15 to-indigo-500/25",
  },
];
