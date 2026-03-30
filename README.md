<div align="center">
  <svg width="100%" height="180" viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nothing-style dot grid header">
    <defs>
      <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.18)"/>
      </pattern>
      <radialGradient id="redGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="rgba(215,25,33,0.28)"/>
        <stop offset="55%" stop-color="rgba(215,25,33,0.10)"/>
        <stop offset="100%" stop-color="rgba(215,25,33,0)"/>
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="900" height="180" fill="#070708"/>
    <rect x="0" y="0" width="900" height="180" fill="url(#dotgrid)"/>
    <rect x="0" y="0" width="900" height="180" fill="url(#redGlow)"/>
    <circle cx="450" cy="78" r="52" fill="rgba(215,25,33,0.10)"/>
    <circle cx="410" cy="92" r="6" fill="rgba(215,25,33,0.85)"/>
    <circle cx="500" cy="70" r="4.5" fill="rgba(215,25,33,0.70)"/>
    <circle cx="475" cy="102" r="3.5" fill="rgba(215,25,33,0.55)"/>
  </svg>

  <p style="margin-top:0;">
    <span style="display:inline-block; padding:6px 10px; border:1px solid rgba(215,25,33,0.35); border-radius:999px; color:#D71921; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; letter-spacing:0.22em; font-size:12px; text-transform:uppercase;">
      Nothing-style Bento Portfolio
    </span>
  </p>

  <h1 style="margin:6px 0 0; font-size:28px;">Keith Einlou Pogoy</h1>
  <p style="margin:8px 0 18px; max-width:720px; color:rgba(255,255,255,0.72);">
    Personal portfolio website built with <b>Astro</b> + <b>React</b>, featuring the animated “bento grid” layout and project previews.
  </p>
</div>

## Highlights

- Fast, component-driven UI (Astro + React)
- Animated project cards and previews (Framer Motion)
- Responsive layout with modern styling (Tailwind CSS)

## Tech Stack

- Astro
- React
- Tailwind CSS
- Framer Motion
- Lenis (smooth scrolling)

## Getting Started

### Prerequisites

- Node.js **>= 22.12.0**
- npm (comes with Node.js)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:4321`).

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Projects

Some of the projects featured on this site:

- Vertical Farming Monitoring System
- Multi-tenant Task Tracker
- Training & Seminar Management
- Vertical Farming Monitoring App
- UI/UX Design Portfolio
- 2D Adventure Game

## Deployment

This project can be deployed to any static hosting provider that supports Astro builds.

1. Run `npm run build`
2. Deploy the generated output from the `dist/` directory (handled by Astro for your adapter/target).

If you host on GitHub Pages or any site with a subpath, ensure the Astro `base`/routing is configured for your domain.

## Contact
- Email: `your-email@example.com`
- GitHub: `https://github.com/nloukei`

