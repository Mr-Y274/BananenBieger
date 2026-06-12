import React from "react";
import { interpolate } from "remotion";

interface CowboyProps {
  frame: number;
}

export const Cowboy: React.FC<CowboyProps> = ({ frame }) => {
  const x = 480;
  const y = 702;

  const gunRotation =
    frame >= 270 ? 1800 : interpolate(frame, [150, 270], [0, 1800], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  let headScaleY = 1;
  let headScaleX = 1;
  let eyeRx = 8;
  let eyeRy = 8;
  let pupilR = 0;
  let pupilOffsetY = 0;

  if (frame >= 270 && frame < 274) {
    headScaleY = 0.52;
    headScaleX = 1 / headScaleY;
    eyeRx = 14;
    eyeRy = 3;
  } else if (frame >= 274 && frame < 284) {
    headScaleY = 1.45;
    headScaleX = 0.68;
    eyeRx = 26;
    eyeRy = 26;
    pupilR = 1.5;
    pupilOffsetY = 18;
  } else if (frame >= 284 && frame < 310) {
    const t = (frame - 284) / 26;
    const damp = Math.cos(t * Math.PI * 2) * Math.exp(-t * 4);
    headScaleY = 1 + damp * 0.2;
    headScaleX = 1 / headScaleY;
    eyeRx = 8 + damp * 4;
    eyeRy = 8 + damp * 4;
  }

  const mouthHeight =
    frame >= 270 && frame <= 330
      ? Math.abs(Math.sin(frame * 0.35)) * 28 + 4
      : 6;

  const showBubble = frame >= 270 && frame <= 330;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Legs */}
      <rect x={-20} y={80} width={18} height={70} fill="#5D4037" rx={4} />
      <rect x={8} y={80} width={18} height={70} fill="#5D4037" rx={4} />

      {/* Body */}
      <rect x={-35} y={10} width={70} height={80} fill="#8D6E63" rx={8} />

      {/* Right arm + banana gun */}
      <g transform={`translate(40, 30) rotate(${gunRotation})`}>
        <rect x={0} y={-6} width={55} height={12} fill="#FFCC80" rx={4} />
        <rect x={50} y={-10} width={18} height={20} fill="#FFD54F" rx={3} />
      </g>

      {/* Left arm */}
      <rect x={-55} y={25} width={25} height={12} fill="#FFCC80" rx={4} transform="rotate(-15)" />

      {/* Head group with squash/stretch */}
      <g transform={`translate(0, -30) scale(${headScaleX}, ${headScaleY})`}>
        {/* Hat */}
        <polygon
          points="-55,-55 -45,-90 45,-90 55,-55 70,-50 -70,-50"
          fill="#6D4C41"
        />
        <rect x={-45} y={-92} width={90} height={18} fill="#5D4037" rx={4} />

        {/* Head */}
        <rect x={-40} y={-55} width={80} height={70} fill="#FFCC80" rx={12} />

        {/* Eyes */}
        <ellipse cx={-18} cy={-20} rx={eyeRx} ry={eyeRy} fill="#FFFFFF" />
        <ellipse cx={18} cy={-20} rx={eyeRx} ry={eyeRy} fill="#FFFFFF" />
        {pupilR > 0 ? (
          <>
            <circle cx={-18} cy={-20 + pupilOffsetY} r={pupilR} fill="#000" />
            <circle cx={18} cy={-20 + pupilOffsetY} r={pupilR} fill="#000" />
          </>
        ) : (
          <>
            <circle cx={-18} cy={-20} r={5} fill="#000" />
            <circle cx={18} cy={-20} r={5} fill="#000" />
          </>
        )}

        {/* Mouth */}
        <ellipse cx={0} cy={5} rx={14} ry={mouthHeight / 2} fill="#5D4037" />
      </g>

      {/* Speech bubble */}
      {showBubble && (
        <g transform="translate(120, -120)">
          <ellipse cx={0} cy={0} rx={160} ry={55} fill="#FFFFFF" stroke="#000" strokeWidth={3} />
          <polygon points="-30,45 -50,70 -10,50" fill="#FFFFFF" stroke="#000" strokeWidth={3} />
        </g>
      )}
    </g>
  );
};
