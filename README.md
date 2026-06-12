# Bananenbieger – Interactive Video Engine

Production-ready Next.js + Remotion platform hosting the procedural 95-second animation **"Warum ist die Banane krumm?"**.

## Stack

- **Next.js 15** (App Router)
- **Remotion Player** – frame-by-frame SVG animation engine
- **Tailwind CSS 4**
- **TypeScript**

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000/watch](http://localhost:3000/watch)

## Architecture

| Path | Purpose |
|------|---------|
| `app/watch/page.tsx` | YouTube-style watch page with synced subtitle controls |
| `components/video/BananaComposition.tsx` | Main Remotion composition (2850 frames @ 30fps) |
| `components/video/scenes/` | Scene directors (Intro, Wild West, Science, Finale) |
| `components/video/*.tsx` | Character rigs (Cowboy, Fairy, BananaCharacter, etc.) |

## Video Spec

- Resolution: 1920×1080
- Duration: 2850 frames (95 seconds)
- All graphics are procedural inline SVG – no external image assets

Subtitle toggles in the web UI sync in real-time with the Remotion `inputProps`.
