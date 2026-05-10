# Sam Dameg's Portfolio

Personal developer portfolio for Sam Dameg. Built with React 19, Vite, and Tailwind CSS v4.

**Live site:** https://portfolio-hazel-eight-1eo8p12f3a.vercel.app

## About

Single page portfolio with a page swap navigation model (clicking a nav link replaces the active view, no scrolling between sections). Sections:

- **Hero** with an animated canvas globe and orbiting satellites
- **About Me** with a flat tech stack and short bio
- **Projects** featuring recent work (STEM Achievers, Maui Fire Research, Climate Change at Mantokuji, NASA Harvest, Coastal Erosion Monitor)
- **On the Horizon** for upcoming events and study abroad (SANS San Francisco 2026, Seoul and Tokyo Study Abroad)
- **Experience** timeline of work, education, internships, and research
- **Contact** form and links

## Notable Features

- **Boot loading screen** with hexagonal auth scanner, scrambling SHA256 fingerprint, ED25519 / X25519 / TLSv1.3 / AES-256-GCM cipher line, scanning beam, and live timecode. Click anywhere or press space, enter, or escape to skip.
- **Live UTC clock** in the navbar updates every second
- **Ice blue palette** with subtle scanline texture and glassmorphism cards
- **Page swap navigation** powered by a small NavContext rather than scroll anchors
- **Animated canvas globe** with orbiting satellites in the hero
- **Typewriter heading**, fade in animations, and cyan to ice gradient text

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS v4
- Canvas API for the globe animation
- Custom CSS keyframes for fade, pulse, and float

## Run Locally

```bash
git clone https://github.com/SammyCode002/portfolio.git
cd portfolio
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Build for Production

```bash
npm run build
npm run preview
```

## Deployment

Deployed automatically to Vercel on every push to `main`.

## License

Personal project. All rights reserved.
