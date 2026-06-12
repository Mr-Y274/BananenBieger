# Bananenbieger – Interactive Video Engine & Streaming Platform

Production-ready **Next.js + Remotion** monolith hosting the procedural 95-second animation  
**„Warum ist die Banane krumm?“** – a YouTube-style watch page with real-time subtitle sync.

Repository: [github.com/Mr-Y274/BananenBieger](https://github.com/Mr-Y274/BananenBieger)

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| Video Engine | Remotion 4 + `@remotion/player` |
| Language | TypeScript (strict) |
| Graphics | 100% procedural inline SVG – no external image assets |

## Quick Start

```bash
git clone https://github.com/Mr-Y274/BananenBieger.git
cd BananenBieger
npm install
npm run dev
```

Open [http://localhost:3000/watch](http://localhost:3000/watch)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run remotion:studio` | Open Remotion Studio for frame inspection |
| `npm run remotion:render` | Render MP4 to `out/video.mp4` |

## Project Structure

```
app/
  layout.tsx          Root layout
  page.tsx            Redirect → /watch
  watch/page.tsx      YouTube-style watch UI + Remotion Player
  icon.tsx            Dynamic favicon
  globals.css         Tailwind + custom animations

components/video/
  BananaComposition.tsx   Main composition orchestrator
  BananaCharacter.tsx     Humanoid banana rig (6 modes)
  Cowboy.tsx              Wild West cowboy + shock deformation
  Fairy.tsx               Urwald fairy + villain close-up
  StraightBanana.tsx      Intro banana + shockwave
  SubtitleOverlay.tsx     DE/EN subtitle renderer
  types.ts                VideoProps, constants, subtitle map
  index.ts                Public exports
  utils/
    physics.ts            Squash/stretch, decaying sine, jitter
    easing.ts             Cinematic bezier + elastic presets
  scenes/
    SceneIntro.tsx        Frames 0–150: Kurzgesagt intro
    SceneWildWest.tsx     Frames 150–750: Cowboy showdown & slap
    SceneScience.tsx      Frames 750–2250: Science montage
    SceneFinale.tsx       Frames 2250–2850: Villain betrayal & fade

remotion/
  Root.tsx            Remotion Studio entry point
remotion.config.ts    Remotion CLI config
vercel.json           Vercel deployment preset
.github/workflows/    CI build on push
```

## Video Specification

| Property | Value |
|----------|-------|
| Resolution | 1920 × 1080 px |
| Framerate | 30 fps |
| Duration | 2850 frames (95.00 s) |
| Props | `showSubtitles: boolean`, `subtitleLanguage: 'de' \| 'en'` |

### Scene Timeline (Regiebuch)

| Scene | Frames | Duration | Content |
|-------|--------|----------|---------|
| 0 – Intro | 0–150 | 5 s | Starfield, straight banana bend, shockwave, logo |
| 1 – Wild West | 150–750 | 20 s | Cowboy, fairy dialogue, fly swatter assault |
| 2 – Science | 750–2250 | 50 s | Chalkboard, teen couch, montage, cucumber rocket |
| 4 – Finale | 2250–2850 | 20 s | Enemy vessel, villain fairy, fade to black |

### Physics Rules

- **Squash & Stretch:** `scaleX = 1 / scaleY` on impact
- **Easing:** `Easing.bezier(0.25, 0.1, 0.25, 1)` for cinematic motion
- **Organic deformation:** SVG path `d` attributes computed from `useCurrentFrame()`

## Real-Time Subtitle Sync

The watch page toolbar passes `inputProps` directly into `<Player />`:

```tsx
inputProps={{
  showSubtitles: subtitlesEnabled,
  subtitleLanguage: subtitleLang,
}}
```

Toggling **CC Subtitles** or switching **DE/EN** updates the active composition loop instantly.

## Deployment

Deploy to Vercel with one click – `vercel.json` is included.  
Alternatively: `npm run build && npm run start`

## License

MIT – see [LICENSE](./LICENSE)
