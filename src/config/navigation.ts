export const gooeyNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
];

export const moreNav = [
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Favourites", href: "/favourites" },
  { label: "Books", href: "/books" },
];

export const scrollProgressNav = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "work", label: "Work", href: "/work" },
  { id: "resume", label: "Resume", href: "/resume" },
  { id: "favourites", label: "Favourites", href: "/favourites" },
  { id: "books", label: "Books", href: "/books" },
];

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
  { label: "Books", href: "/books" },
  { label: "Favourites", href: "/favourites" },
] as const;

export const commandItems = [
  ...footerNav.map((item) => ({ label: item.label, href: item.href })),
  {
    label: "X",
    href: "https://x.com/code_Bharti07",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/coder-nik200",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nitish-kumar-bharti-631a37359/",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:YOUR_EMAIL@example.com",
    external: true,
  },
];
