<p align="center">
  <img src="public/sam-favicon.svg" width="64" alt="SD logo"/>
</p>
<h1 align="center">
  Sam Dameg Portfolio - v3
</h1>
<p align="center">
  The third iteration of my personal portfolio. <a href="https://portfolio-hazel-eight-1eo8p12f3a.vercel.app/" target="_blank">Live site</a>. A lofi anime aesthetic split-panel portfolio built with Vite and React 19, featuring an interactive character, scroll-triggered animations, and light/dark theme.
</p>
<p align="center">
  <img src="public/readme-preview.png" width="100%" alt="samdameg-v3-preview"/>
</p>

## about

Personal portfolio for Sam Dameg, IT Specialist at the Hawaii State Department of Education and Computer Science Cybersecurity student at Oregon State University. Based in Maui, Hawaii.

The site uses a fixed left panel with stacked cards (profile, featured work, footer) and a scrollable right panel with sticky navigation. The character on the contact panel is interactive, opening suggested questions when clicked. Each section uses scroll-reveal animations for a polished feel.

## tech stack

- **Vite 7** + **React 19**
- **Tailwind CSS v4** with custom CSS variables for theming
- **CSS-only animations** (no animation library)
- **IntersectionObserver** for scroll reveals
- **Phaser 3** sub-page (Cyberrunner game at `/cyberrunner.html`)
- Deployed on **Vercel**

## set-up

1. Install the dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm run dev
   ```

## build and run for production

1. Generate a full static production build

   ```sh
   npm run build
   ```

2. Preview the production build locally

   ```sh
   npm run preview
   ```

## features

- Split-panel layout with a fixed left side and scrollable right side
- Card-stack visual system with staggered slide-in animations
- Light and dark theme toggle, persisted to localStorage
- Interactive character with click-to-reveal suggested questions in the contact panel
- AI-style prompt input that opens an email draft on submit
- Sticky right-panel navbar with scroll-spy tracking across Projects, Experience, Education, and Play
- Hi, I'm Sam typewriter intro animation
- Equal-height project cards with primary and secondary link buttons
- Scroll-triggered fade and lift reveals on every section
- Cyberrunner Phaser game as a separate page
- Lofi anime aesthetic with custom character art and background
- Mobile responsive layout

## color codes

| Color           | Hex                                                                |
| --------------- | ------------------------------------------------------------------ |
| Accent Orange   | ![#E8622A](https://placehold.co/15/E8622A/E8622A.png) `#E8622A`    |
| Accent Hover    | ![#d4541f](https://placehold.co/15/d4541f/d4541f.png) `#d4541f`    |
| Medium Orange   | ![#F4914A](https://placehold.co/15/F4914A/F4914A.png) `#F4914A`    |
| Light Peach     | ![#F4A261](https://placehold.co/15/F4A261/F4A261.png) `#F4A261`    |
| Light BG        | ![#ffffff](https://placehold.co/15/ffffff/ffffff.png) `#ffffff`    |
| Light Panel     | ![#f5f5f5](https://placehold.co/15/f5f5f5/f5f5f5.png) `#f5f5f5`    |
| Light Text      | ![#111111](https://placehold.co/15/111111/111111.png) `#111111`    |
| Dark BG         | ![#0e0e0e](https://placehold.co/15/0e0e0e/0e0e0e.png) `#0e0e0e`    |
| Dark Panel      | ![#141414](https://placehold.co/15/141414/141414.png) `#141414`    |
| Dark Text       | ![#f0f0f0](https://placehold.co/15/f0f0f0/f0f0f0.png) `#f0f0f0`    |

## project structure

```
portfolio/
├── public/                      # Static assets (images, favicon, character art)
├── src/
│   ├── components/
│   │   ├── LeftPanel.jsx        # Fixed left panel (profile, featured, contact)
│   │   ├── RightNavbar.jsx      # Sticky right-panel navbar
│   │   ├── Intro.jsx            # Hi, I'm Sam typewriter
│   │   ├── Projects.jsx         # Project cards grid
│   │   ├── Experience.jsx       # Experience, Education, Certifications
│   │   └── GlobalClock.jsx      # UTC clock in toolbar
│   ├── context/
│   │   └── ThemeContext.jsx     # Light / dark theme provider
│   ├── hooks/
│   │   └── useScrollReveal.js   # Shared scroll-reveal hook
│   ├── cyberrunner/             # Phaser game sub-page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # CSS variables, theme tokens, animations
├── cyberrunner.html             # Separate entry for the Phaser game
└── index.html
```

## license

MIT
