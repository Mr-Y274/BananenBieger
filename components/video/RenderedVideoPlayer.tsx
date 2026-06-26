"use client";

import type { FC } from "react";
import { Player } from "@remotion/player";
import {
  RenderedVideoComposition,
  RENDERED_DURATION_FRAMES,
  RENDERED_FPS,
  RENDERED_HEIGHT,
  RENDERED_WIDTH,
} from "./RenderedVideoComposition";

export const RenderedVideoPlayer: FC = () => (
  <Player
    component={RenderedVideoComposition}
    durationInFrames={RENDERED_DURATION_FRAMES}
    fps={RENDERED_FPS}
    compositionWidth={RENDERED_WIDTH}
    compositionHeight={RENDERED_HEIGHT}
    style={{ width: "100%", height: "100%" }}
    controls
    acknowledgeRemotionLicense
  />
);
