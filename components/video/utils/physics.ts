/** Squash & stretch: preserve mass — scaleX = 1 / scaleY */
export const squashStretch = (scaleY: number): { scaleX: number; scaleY: number } => ({
  scaleX: 1 / scaleY,
  scaleY,
});

export const decayingSine = (
  frame: number,
  startFrame: number,
  frequency: number,
  amplitude: number,
  decay: number
): number =>
  Math.sin(frame * frequency) * amplitude * Math.exp(-decay * (frame - startFrame));

export const pseudoRandomJitter = (
  frame: number,
  amplitudeA: number,
  freqA: number,
  amplitudeB: number,
  freqB: number
): number =>
  Math.sin(frame * freqA) * amplitudeA + Math.cos(frame * freqB) * amplitudeB;
