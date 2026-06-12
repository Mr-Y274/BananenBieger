import React from "react";
import { Composition } from "remotion";
import {
  BananaComposition,
  VIDEO_DURATION_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../components/video/BananaComposition";
import { defaultVideoProps, type VideoProps } from "../components/video/types";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition<VideoProps>
      id="BananaComposition"
      component={BananaComposition}
      durationInFrames={VIDEO_DURATION_FRAMES}
      fps={VIDEO_FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
      defaultProps={defaultVideoProps}
    />
  </>
);
