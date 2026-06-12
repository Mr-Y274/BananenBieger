import React from "react";
import { SUBTITLES } from "./types";

interface SubtitleOverlayProps {
  show: boolean;
  language: "de" | "en";
  keyName: keyof typeof SUBTITLES;
  y?: number;
}

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  show,
  language,
  keyName,
  y = 920,
}) => {
  if (!show) return null;
  return (
    <text
      x={960}
      y={y}
      textAnchor="middle"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth={3}
      paintOrder="stroke"
      fontSize={42}
      fontFamily="Impact, Charcoal, sans-serif"
      filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.8))"
    >
      {SUBTITLES[keyName][language]}
    </text>
  );
};
