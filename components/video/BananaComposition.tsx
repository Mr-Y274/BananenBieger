import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { VideoProps } from "./types";
import { SceneFinale } from "./scenes/SceneFinale";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneScience } from "./scenes/SceneScience";
import { SceneWildWest } from "./scenes/SceneWildWest";

export type { VideoProps } from "./types";
export {
  VIDEO_DURATION_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "./types";

export const BananaComposition: React.FC<VideoProps> = ({
  showSubtitles,
  subtitleLanguage,
}) => {
  const frame = useCurrentFrame();

  const renderScene = () => {
    if (frame < 150) {
      return (
        <SceneIntro
          frame={frame}
          showSubtitles={showSubtitles}
          subtitleLanguage={subtitleLanguage}
        />
      );
    }
    if (frame < 750) {
      return (
        <SceneWildWest
          frame={frame}
          showSubtitles={showSubtitles}
          subtitleLanguage={subtitleLanguage}
        />
      );
    }
    if (frame < 2250) {
      return (
        <SceneScience
          frame={frame}
          showSubtitles={showSubtitles}
          subtitleLanguage={subtitleLanguage}
        />
      );
    }
    return (
      <SceneFinale
        frame={frame}
        showSubtitles={showSubtitles}
        subtitleLanguage={subtitleLanguage}
      />
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <svg
        viewBox="0 0 1920 1080"
        width={1920}
        height={1080}
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderScene()}
      </svg>
    </AbsoluteFill>
  );
};
