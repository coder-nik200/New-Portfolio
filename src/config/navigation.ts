export const headerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export const moreNav = [
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
  { label: "Favourites", href: "/favourites" },
  { label: "Books", href: "/books" },
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
