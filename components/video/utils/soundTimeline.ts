import {
  CREDITS_DURATION_FRAMES,
  MAIN_CONTENT_FRAMES,
  mapContentToPlayback,
} from "./timeline";

export interface SoundCue {
  id: string;
  file: string;
  /** Playback-Frame, ab dem der Sound startet */
  from: number;
  /** Dauer in Playback-Frames (optional, sonst bis Ende der Datei) */
  durationInFrames?: number;
  volume?: number;
  loop?: boolean;
}

/** Szenen-Musik: loopend über die jeweilige Playback-Spanne */
export const SCENE_MUSIC: SoundCue[] = [
  {
    id: "intro-music",
    file: "intro-music.wav",
    from: 0,
    durationInFrames: mapContentToPlayback(150),
    volume: 0.28,
    loop: true,
  },
  {
    id: "western-music",
    file: "western-music.wav",
    from: mapContentToPlayback(150),
    durationInFrames: mapContentToPlayback(750) - mapContentToPlayback(150),
    volume: 0.22,
    loop: true,
  },
  {
    id: "science-music",
    file: "science-music.wav",
    from: mapContentToPlayback(750),
    durationInFrames: mapContentToPlayback(2250) - mapContentToPlayback(750),
    volume: 0.2,
    loop: true,
  },
  {
    id: "finale-music",
    file: "finale-music.wav",
    from: mapContentToPlayback(2250),
    durationInFrames: MAIN_CONTENT_FRAMES - mapContentToPlayback(2250),
    volume: 0.24,
    loop: true,
  },
  {
    id: "outro-music",
    file: "outro-music.wav",
    from: MAIN_CONTENT_FRAMES,
    durationInFrames: CREDITS_DURATION_FRAMES,
    volume: 0.32,
    loop: true,
  },
];

/** Einzelne Sound-Effekte an visuellen Momenten */
export const SOUND_EFFECTS: SoundCue[] = [
  { id: "logo-ding", file: "ding.wav", from: mapContentToPlayback(75), volume: 0.55 },
  { id: "banana-entry", file: "sparkle.wav", from: mapContentToPlayback(15), volume: 0.4 },
  ...[175, 189, 203, 217, 231, 245].map((f, i) => ({
    id: `gunshot-${i}`,
    file: "gunshot.wav",
    from: mapContentToPlayback(f),
    volume: 0.65,
  })),
  { id: "cowboy-shock", file: "slap.wav", from: mapContentToPlayback(270), volume: 0.5 },
  { id: "fairy-enter", file: "magic-chime.wav", from: mapContentToPlayback(330), volume: 0.45 },
  { id: "fairy-flap", file: "whoosh.wav", from: mapContentToPlayback(420), volume: 0.35 },
  { id: "fairy-swat", file: "slap.wav", from: mapContentToPlayback(424), volume: 0.7 },
  { id: "banana-charge", file: "whoosh.wav", from: mapContentToPlayback(480), volume: 0.4 },
  { id: "scene-flash", file: "explosion.wav", from: mapContentToPlayback(512), volume: 0.35 },
  { id: "rocket-launch", file: "rocket-launch.wav", from: mapContentToPlayback(1950), volume: 0.5 },
  { id: "ship-approach", file: "whoosh.wav", from: mapContentToPlayback(2330), volume: 0.3 },
  { id: "flyswatter-slap", file: "slap.wav", from: mapContentToPlayback(2458), volume: 0.85 },
  { id: "rocket-boom", file: "explosion.wav", from: mapContentToPlayback(2460), volume: 0.95 },
  { id: "knockout-thud", file: "thud.wav", from: mapContentToPlayback(2466), volume: 0.6 },
];
