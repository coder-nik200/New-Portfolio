# Nitish Kumar Bharti — Portfolio

Personal portfolio of Nitish Kumar Bharti, an MCA student and full-stack developer passionate about building modern web applications and real-world products.

Built with **Next.js, TypeScript, Tailwind CSS, GSAP, and MDX** — a minimal, interactive space showcasing my projects, experience, skills, and everything I'm learning along the way.

### Portfolio Preview

<img width="2464" height="1728" alt="Gemini_Generated_Image_idcm7hidcm7hidcm" src="https://github.com/user-attachments/assets/52403ee2-3f5c-403b-9d47-354e5c5fafa8" />

**Live:** [Portfolio](https://nitversedev.vercel.app/) · **GitHub:** [@coder-nik200](https://github.com/coder-nik200/nitish-portfolio)

---

## ✨ Highlights

- **Home** — Hero, tech stack, experience, featured projects, achievements, and personal widgets.
- **About** — My journey, education, interests, and development story.
- **Projects** — Interactive project cards with GitHub repositories, live demos, and detailed writeups.
- **Work** — Professional experience, internships, and contributions.
- **Blog** — MDX-powered articles and development notes.
- **Resume** — Resume viewer with download option.
- **Command Palette** — Quickly navigate pages using `⌘K / Ctrl+K`.
- **Theme Toggle** — Light and dark mode.
- **Interactive UI** — Smooth transitions, animations, and hover effects.
- **Music Widget** — A little space dedicated to my favourite tracks.
- **Responsive Design** — Optimized for desktop, tablet, and mobile.

---

## 🛠 Tech Stack

| Layer | Tools |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Animations | GSAP, React Bits |
| Content | MDX |
| Icons | Phosphor Icons |
| Theme | next-themes |
| Deployment | Netlify / Vercel |

---

## 🚀 Getting Started

**Requirements:** Node.js 20+

Clone the repository:

```bash
git clone https://github.com/coder-nik200/nitish-portfolio.git
cd nitish-portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint (if configured) |

---

## 📁 Project Structure

```text
nitish-portfolio/
├── src/
│   ├── app/                 # Pages and routes
│   │   ├── about/
│   │   ├── projects/
│   │   │   └── [slug]/      # Dynamic project pages
│   │   ├── work/
│   │   └── page.tsx         # Homepage
│   │
│   ├── components/          # Reusable UI components
│   ├── config/              # Portfolio content and configuration
│   └── lib/                 # Utilities, metadata and helpers
│
├── content/
│   └── projects/            # MDX project writeups
│
├── public/
│   └── assets/              # Images and static files
│
├── package.json
└── README.md
```

---

## 🧭 Routes

| Page | Path |
|---|---|
| Home | `/` |
| About | `/about` |
| Projects | `/projects` |
| Project Details | `/projects/[slug]` |
| Work | `/work` |

Additional routes depend on the enabled sections.

---

## ⚙️ Customizing Content

Most portfolio information can be updated through the configuration files without modifying the main UI components.

| Content | What to Update |
|---|---|
| Hero | Name, description, avatar, social links |
| Projects | Title, description, GitHub URL, live demo |
| Experience | Internships and work history |
| Tech Stack | Technologies and icons |
| Navigation | Navbar links and command menu |
| Resume | Resume PDF |
| Theme | Colors and appearance |

### Adding a New Project

Add your project information to the relevant project configuration.

Example:

```ts
{
  slug: "my-project",
  title: "My Project",
  description: "A short description of the project.",
  href: "https://github.com/username/repository",
  website: "https://my-project.vercel.app",
  cover: "/assets/projects/my-project.png",
  tech: ["Next.js", "TypeScript", "MongoDB"],
}
```

### Project Writeups

Detailed project pages use MDX.

Add a new `.mdx` file inside:

```text
content/projects/
```

Example:

```text
content/projects/my-project.mdx
```

This keeps project content separate from the UI.

### Images

Place static images inside:

```text
public/assets/
```

Reference them using:

```text
/assets/your-image.png
```

---

## 🌐 Deployment

The application can be deployed on Vercel, Netlify, or another compatible Node.js hosting platform.

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

If external services are configured, add the required environment variables to `.env.local` and your hosting provider.

Never commit API keys or sensitive credentials to GitHub.

---

## 🤝 Connect With Me

| Platform | Link |
|---|---|
| GitHub | [@coder-nik200](https://github.com/coder-nik200) |
| LinkedIn | [Nitish Kumar Bharti](https://www.linkedin.com/in/nitish-kumar-bharti-631a37359/) |
| Instagram | [@wohh.nitish](https://instagram.com/wohh.nitish) |
| X | [@code_Bharti07](https://x.com/code_Bharti07) |

---

## 📄 License

This project is open for learning and inspiration. Please check the repository's LICENSE file for reuse permissions.

If you find something useful, consider giving the repository a ⭐.

---

<div align="center">

**Still learning. Still building. Still figuring things out.**

Built with late nights, music, and curiosity.

Made by **Nitish Kumar Bharti** © 2026

</div>
