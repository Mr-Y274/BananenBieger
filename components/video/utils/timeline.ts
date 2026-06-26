/** Gelöschte Bereiche in der Original-Timeline (30 fps). */
const DELETED_RANGES: ReadonlyArray<readonly [number, number]> = [
  [720, 780], // Sekunde 24–25
  [930, 1170], // Sekunde 31–38
];

const TOTAL_DELETED_FRAMES = DELETED_RANGES.reduce(
  (sum, [start, end]) => sum + (end - start),
  0
);

export const ORIGINAL_DURATION_FRAMES = 2850;
export const CUT_DURATION_FRAMES = ORIGINAL_DURATION_FRAMES - TOTAL_DELETED_FRAMES;
export const MAIN_CONTENT_FRAMES = CUT_DURATION_FRAMES;
export const CREDITS_DURATION_FRAMES = 270;
export const TOTAL_DURATION_FRAMES = MAIN_CONTENT_FRAMES + CREDITS_DURATION_FRAMES;

/** Wandelt die abgespielte Frame-Nummer in die Original-Content-Frame-Nummer um. */
export function mapPlaybackToContent(playbackFrame: number): number {
  let contentFrame = playbackFrame;
  for (const [start, end] of DELETED_RANGES) {
    if (contentFrame >= start) {
      contentFrame += end - start;
    }
  }
  return contentFrame;
}

/** Kehrt mapPlaybackToContent um – für Sound-Cues an Content-Events. */
export function mapContentToPlayback(contentFrame: number): number {
  let playback = contentFrame;
  if (contentFrame >= 1170) {
    playback -= 240;
  }
  if (contentFrame >= 780) {
    playback -= 60;
  }
  return playback;
}
