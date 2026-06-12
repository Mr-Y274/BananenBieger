import React from "react";
import { Easing, interpolate } from "remotion";
import { Shockwave, StraightBanana } from "../StraightBanana";
import { SubtitleOverlay } from "../SubtitleOverlay";

interface SceneIntroProps {
  frame: number;
  showSubtitles: boolean;
  subtitleLanguage: "de" | "en";
}

export const SceneIntro: React.FC<SceneIntroProps> = ({
  frame,
  showSubtitles,
  subtitleLanguage,
}) => {
  const stars = Array.from({ length: 25 }, (_, index) => {
    const baseX = 120 + (index % 5) * 380 + (index % 3) * 45;
    const baseY = 900 - (index * 37) % 800;
    const x = baseX + Math.sin(frame * 0.04 + index) * 12;
    const y = baseY - frame * 0.45;
    const opacity = Math.sin(frame * 0.07 + index) * 0.35 + 0.65;
    const radius = 1.5 + (index % 5) * 0.4;
    return { x, y: y % 1100, opacity, radius, index };
  });

  const logoScale = interpolate(frame, [75, 90, 105], [0, 1.15, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const logoY = interpolate(frame, [75, 105], [580, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <>
      <defs>
        <radialGradient id="introBg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#introBg)" />
      {stars.map((star) => (
        <circle
          key={star.index}
          cx={star.x}
          cy={star.y}
          r={star.radius}
          fill="#FFFFFF"
          opacity={star.opacity}
        />
      ))}
      {frame >= 15 && <StraightBanana frame={frame} />}
      <Shockwave frame={frame} />
      {frame >= 75 && (
        <g transform={`translate(960, ${logoY}) scale(${logoScale}) translate(-960, 0)`}>
          <text
            x={960}
            y={0}
            textAnchor="middle"
            fontFamily="Impact, Charcoal, sans-serif"
            fontSize={96}
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth={4}
            paintOrder="stroke"
            filter="drop-shadow(8px 8px 0px rgba(0,0,0,0.35))"
          >
            Bananenbieger
          </text>
        </g>
      )}
      {frame >= 75 && (
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="intro"
          y={680}
        />
      )}
    </>
  );
};
