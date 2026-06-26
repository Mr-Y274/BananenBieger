import React from "react";
import { Easing, interpolate } from "remotion";

interface SceneCreditsProps {
  frame: number;
}

const CREDITS: ReadonlyArray<{ role: string; name: string }> = [
  { role: "Schnitt und Video Produktion", name: "Max Ritschel" },
  { role: "Idee", name: "Sophie Lüttgens" },
  { role: "Banane", name: "Jonathan Knüdeler" },
  { role: "Fee", name: "Hugo Frank" },
  { role: "Cowboy", name: "Max Ritschel" },
  { role: "Produciert mit", name: "Cursour" },
  { role: "Unterstütz von", name: "ML WebStudios" },
];

const TITLE_FRAMES = 45;
const SCROLL_START = 30;
const SCROLL_END = 220;

export const SceneCredits: React.FC<SceneCreditsProps> = ({ frame }) => {
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, TITLE_FRAMES], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const titleOpacity = interpolate(frame, [0, 15, TITLE_FRAMES, TITLE_FRAMES + 20], [0, 1, 1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scrollY = interpolate(frame, [SCROLL_START, SCROLL_END], [820, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const scrollOpacity = interpolate(frame, [SCROLL_START, SCROLL_START + 15, SCROLL_END - 20, SCROLL_END], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endFade = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: (i * 137) % 1920,
    y: (i * 89 + frame * (0.3 + (i % 5) * 0.1)) % 1080,
    r: 1 + (i % 3),
    opacity: 0.3 + (i % 4) * 0.15,
  }));

  return (
    <>
      <rect width={1920} height={1080} fill="#050505" opacity={fadeIn} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FDE047" opacity={s.opacity * fadeIn} />
      ))}

      <g opacity={titleOpacity * fadeIn} transform={`translate(960, 280) scale(${titleScale})`}>
        <text
          x={0}
          y={0}
          textAnchor="middle"
          fill="#FDE047"
          fontSize={72}
          fontFamily="Impact, Charcoal, sans-serif"
          letterSpacing={4}
        >
          BANANENBIEGER STUDIOS
        </text>
        <text
          x={0}
          y={50}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize={28}
          fontFamily="Impact, Charcoal, sans-serif"
          letterSpacing={8}
        >
          präsentiert
        </text>
      </g>

      <g opacity={scrollOpacity * fadeIn} transform={`translate(0, ${scrollY})`}>
        {CREDITS.map((credit, i) => {
          const lineDelay = i * 8;
          const lineOpacity = interpolate(frame, [SCROLL_START + lineDelay, SCROLL_START + lineDelay + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = 520 + i * 90;

          return (
            <g key={credit.role} opacity={lineOpacity}>
              <text
                x={960}
                y={y}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize={26}
                fontFamily="Impact, Charcoal, sans-serif"
                letterSpacing={2}
              >
                {credit.role}
              </text>
              <text
                x={960}
                y={y + 38}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={40}
                fontFamily="Impact, Charcoal, sans-serif"
              >
                {credit.name}
              </text>
            </g>
          );
        })}
      </g>

      <rect width={1920} height={1080} fill="#000000" opacity={endFade} />
    </>
  );
};
