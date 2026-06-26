"use client";

import type { FC } from "react";
import { Player } from "@remotion/player";
import {
  BananaComposition,
  VIDEO_DURATION_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./BananaComposition";
import type { VideoProps } from "./types";

export const VideoPlayer: FC<VideoProps> = (inputProps) => (
  <Player
    component={BananaComposition as unknown as FC<Record<string, unknown>>}
    durationInFrames={VIDEO_DURATION_FRAMES}
    fps={VIDEO_FPS}
    compositionWidth={VIDEO_WIDTH}
    compositionHeight={VIDEO_HEIGHT}
    style={{ width: "100%", height: "100%" }}
    controls
    acknowledgeRemotionLicense
    inputProps={inputProps}
  />
);
