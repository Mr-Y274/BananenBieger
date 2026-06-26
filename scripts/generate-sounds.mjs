import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SAMPLE_RATE = 44100;
const OUT_DIR = join(process.cwd(), "public", "sounds");

function writeWav(filename, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  writeFileSync(join(OUT_DIR, filename), buffer);
}

function env(t, attack, decay, sustain, release, duration) {
  if (t < attack) return t / attack;
  if (t < attack + decay) {
    const d = (t - attack) / decay;
    return 1 - d * (1 - sustain);
  }
  if (t < duration - release) return sustain;
  return sustain * (1 - (t - (duration - release)) / release);
}

function sine(freq, t) {
  return Math.sin(2 * Math.PI * freq * t);
}

function noise() {
  return Math.random() * 2 - 1;
}

function render(durationSec, fn) {
  const len = Math.floor(durationSec * SAMPLE_RATE);
  const out = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = fn(i / SAMPLE_RATE, i);
  }
  return out;
}

function mix(...tracks) {
  const len = Math.max(...tracks.map((t) => t.length));
  const out = new Float64Array(len);
  for (const track of tracks) {
    for (let i = 0; i < track.length; i++) out[i] += track[i];
  }
  let peak = 0.001;
  for (let i = 0; i < out.length; i++) {
    const abs = Math.abs(out[i]);
    if (abs > peak) peak = abs;
  }
  if (peak > 0.95) {
    for (let i = 0; i < out.length; i++) out[i] *= 0.9 / peak;
  }
  return out;
}

function melodyLoop(notes, bpm, loopSec) {
  const beat = 60 / bpm;
  return render(loopSec, (t) => {
    const pos = t % loopSec;
    let sample = 0;
    for (let i = 0; i < notes.length; i++) {
      const start = i * beat;
      const end = start + beat * 0.85;
      if (pos >= start && pos < end) {
        const local = pos - start;
        const e = env(local, 0.02, 0.08, 0.6, 0.05, beat * 0.85);
        sample += sine(notes[i], local) * e * 0.35;
        sample += sine(notes[i] * 2, local) * e * 0.12;
      }
    }
    return sample;
  });
}

mkdirSync(OUT_DIR, { recursive: true });

writeWav(
  "intro-music.wav",
  melodyLoop([261.63, 329.63, 392, 523.25, 392, 329.63], 120, 4)
);

writeWav(
  "western-music.wav",
  mix(
    melodyLoop([146.83, 174.61, 196, 174.61, 146.83, 130.81], 100, 6),
    render(6, (t) => sine(73.42, t) * 0.08 * (0.5 + 0.5 * Math.sin(t * 2)))
  )
);

writeWav(
  "science-music.wav",
  melodyLoop([220, 277.18, 329.63, 369.99, 329.63, 277.18, 220, 196], 130, 5)
);

writeWav(
  "finale-music.wav",
  mix(
    render(8, (t) => sine(55 + Math.sin(t * 0.5) * 8, t) * 0.15),
    render(8, (t) => {
      const pulse = 0.5 + 0.5 * Math.sin(t * 3);
      return sine(110, t) * 0.08 * pulse;
    })
  )
);

writeWav(
  "outro-music.wav",
  melodyLoop([196, 246.94, 293.66, 349.23, 293.66, 246.94], 90, 6)
);

writeWav(
  "gunshot.wav",
  render(0.35, (t) => {
    const e = env(t, 0.001, 0.04, 0.1, 0.25, 0.35);
    return (noise() * 0.7 + sine(120, t) * 0.5 + sine(80, t) * 0.4) * e;
  })
);

writeWav(
  "explosion.wav",
  render(1.8, (t) => {
    const e = env(t, 0.005, 0.15, 0.25, 1.2, 1.8);
    const rumble = sine(45 + 30 * Math.exp(-t * 4), t);
    return (noise() * 0.85 + rumble * 0.6) * e;
  })
);

writeWav(
  "slap.wav",
  render(0.25, (t) => {
    const e = env(t, 0.001, 0.02, 0.05, 0.2, 0.25);
    return (noise() * 0.5 + sine(180, t) * 0.8 + sine(90, t) * 0.4) * e;
  })
);

writeWav(
  "whoosh.wav",
  render(0.6, (t) => {
    const e = env(t, 0.05, 0.1, 0.4, 0.35, 0.6);
    const freq = 800 * Math.exp(-t * 6) + 120;
    return (noise() * 0.35 + sine(freq, t) * 0.25) * e;
  })
);

writeWav(
  "magic-chime.wav",
  render(1.2, (t) => {
    const e = env(t, 0.01, 0.2, 0.3, 0.8, 1.2);
    return (
      sine(880, t) * 0.25 +
      sine(1174.66, t) * 0.2 +
      sine(1318.51, t) * 0.15 +
      sine(1760, t) * 0.1
    ) * e;
  })
);

writeWav(
  "rocket-launch.wav",
  render(2.5, (t) => {
    const e = env(t, 0.1, 0.3, 0.7, 0.8, 2.5);
    const sweep = 200 + t * 350;
    return (noise() * 0.4 + sine(sweep, t) * 0.35 + sine(sweep * 0.5, t) * 0.2) * e;
  })
);

writeWav(
  "ding.wav",
  render(0.8, (t) => {
    const e = env(t, 0.005, 0.15, 0.4, 0.55, 0.8);
    return (sine(523.25, t) * 0.4 + sine(783.99, t) * 0.25 + sine(1046.5, t) * 0.15) * e;
  })
);

writeWav(
  "thud.wav",
  render(0.5, (t) => {
    const e = env(t, 0.002, 0.08, 0.15, 0.35, 0.5);
    return (sine(60, t) * 0.7 + noise() * 0.2) * e;
  })
);

writeWav(
  "sparkle.wav",
  render(0.4, (t) => {
    const e = env(t, 0.005, 0.05, 0.2, 0.3, 0.4);
    return (
      sine(1200 + t * 800, t) * 0.3 +
      sine(1600 + t * 600, t) * 0.2 +
      noise() * 0.15
    ) * e;
  })
);

console.log(`Generated ${14} sound files in public/sounds/`);
