import React from "react";
import { BananaCharacter } from "../BananaCharacter";
import { Cowboy } from "../Cowboy";
import { Fairy } from "../Fairy";
import { SubtitleOverlay } from "../SubtitleOverlay";

interface SceneWildWestProps {
  frame: number;
  showSubtitles: boolean;
  subtitleLanguage: "de" | "en";
}

export const SceneWildWest: React.FC<SceneWildWestProps> = ({
  frame,
  showSubtitles,
  subtitleLanguage,
}) => {
  const flash = frame === 512;

  return (
    <>
      <rect width={1920} height={1080} fill="#FFE082" />
      {frame >= 150 && frame < 450 && <Cowboy frame={frame} />}
      {frame >= 270 && frame <= 330 && (
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="cowboy"
          y={180}
        />
      )}
      {frame >= 330 && <Fairy frame={frame} />}
      {frame >= 420 && frame <= 480 && (
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="fairy"
          y={880}
        />
      )}
      {frame >= 480 && <BananaCharacter frame={frame} mode="assault" />}
      {flash && <rect width={1920} height={1080} fill="#FFFFFF" opacity={1} />}
    </>
  );
};
