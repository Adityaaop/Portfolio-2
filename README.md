# Aditya Ranjan — Personal Portfolio & Engineering Showcase

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A high-performance, responsive personal portfolio and interactive engineering showcase built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Designed with modern dark-mode glassmorphism, custom canvas animations, interactive telemetry visualizations, and real-time community engagement.

---

## ✨ Key Highlights & Features

- 🦖 **Canvas Dino & Glitch Intro Sequence**: Custom-built HTML5 Canvas recreation of the classic offline T-Rex jump sequence featuring sound effects, audio sync, and screen glitch phase transitions.
- 🌌 **Space Starfield Parallax Canvas**: High-performance interactive 2D starfield engine with depth tiers, twinkling algorithms, smooth scroll parallax, and `prefers-reduced-motion` compliance.
- 🔤 **Dynamic Multi-Typography Hero**: Animated greeting that seamlessly cycles across diverse curated typefaces with spring-physics mouse tracking spotlight effects.
- 🛡️ **Interactive Projects Showcase**: Detailed project deep-dives including problem statements, architectural highlights, tech tags, and live repository links (e.g., SIEM Log Monitoring Dashboard, Timetable Generator, YBI Internship portal).
- 💬 **Wall of Thoughts (Interactive Guestbook)**: Real-time community board featuring sticky notes with deterministic rotation angles, reply threads, like/dislike reactions, and Supabase backend persistence with local JSON fallback.
- 📜 **Interactive Milestones & Timeline**: Comprehensive educational and professional progression timeline with scroll-driven progress markers.
- 🖼️ **Milestone Gallery**: Modal-driven media gallery showcasing national hackathon podium honors (Dark Buster Hackathon at IIT BHU), internship certifications, and technical workshops.
- 📬 **Contact System**: Production-grade contact form with Web3Forms API submission and seamless email client fallback.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) |
| **UI Library** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom design tokens |
| **Motion & Physics** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Canvas & VFX** | Vanilla HTML5 Canvas 2D API (Dino Game, Starfield particles) |
| **Database & Storage** | [Supabase](https://supabase.com/) (`@supabase/supabase-js`) & local fallback storage |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Next Font (`Abril Fatface`, `JetBrains Mono`, `Doto`, `Pixelify Sans`, `Kalam`, etc.) |

---

## 📁 Project Structure

```text
Portfolio-2/
├── public/                  # Static assets (images, certificates, resume, audio)
│   ├── Aditya.pdf           # Downloadable resume
│   ├── gallary/milestones/  # Event & hackathon certification images
│   ├── projects/            # Project showcase previews
│   ├── glitch.mp3           # Audio effect for intro sequence
│   └── portrait.webp        # Optimized profile portrait
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes (contact, thoughts CRUD)
│   │   ├── gallery/         # Dedicated gallery route
│   │   ├── history/         # Career & education timeline page
│   │   ├── wall-of-thoughts/# Interactive guestbook page
│   │   ├── globals.css      # Tailwind v4 theme & glassmorphic styling
│   │   ├── layout.tsx       # Root layout & font orchestration
│   │   └── page.tsx         # Main portfolio single-page layout
│   ├── components/          # Reusable UI components
│   │   ├── Hero.tsx         # Dynamic hero section with spotlight effect
│   │   ├── IntroSequence.tsx# Canvas Dino & glitch animation
│   │   ├── SpaceBackground.tsx # Canvas starfield particle background
│   │   ├── Projects.tsx     # Project cards with problem statements
│   │   ├── Skills.tsx       # Categorized interactive skills tabs
│   │   ├── WallOfThoughts.tsx # Interactive sticky note guestbook
│   │   ├── HistoryTimeline.tsx# Milestone timeline with scroll progress
│   │   ├── Gallery.tsx      # Modal image gallery with slideshow
│   │   ├── Contact.tsx      # Contact form with Web3Forms integration
│   │   └── ui/              # Atom components (Toast, Icons, GlassCard)
│   └── lib/                 # Utilities (Supabase client, storage helpers)
├── data/                    # Fallback JSON data (thoughts.json)
└── package.json             # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.18+ or 20+ recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)

### 1. Clone the repository

```bash
git clone https://github.com/Adityaaop/Portfolio-2.git
cd Portfolio-2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env.local
```

Configure the following variables:

```env
# Contact Form (Web3Forms - https://web3forms.com)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here

# (Optional) Supabase Configuration for Wall of Thoughts
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **Note:** The application includes automatic graceful fallbacks (e.g. `mailto:` fallback for contact and local storage/JSON fallback for the Wall of Thoughts) if API keys are not provided.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the portfolio.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 👤 Author

**Aditya Ranjan**
- **GitHub:** [@Adityaaop](https://github.com/Adityaaop)
- **LinkedIn:** [Aditya Ranjan](https://www.linkedin.com/in/aditya-ranjan-a52344248)
- **LeetCode:** [Aditya_1901](https://leetcode.com/u/Aditya_1901/)
- **Email:** [adityamishra0578@gmail.com](mailto:adityamishra0578@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the [LICENSE](LICENSE) file for details.
