import React from "react";
import { interpolate } from "remotion";

interface CowboyProps {
  frame: number;
  side?: "left" | "right" | "solo";
}

const BananaGun: React.FC<{ rotation: number }> = ({ rotation }) => (
  <g transform={`rotate(${rotation})`}>
    <rect x={0} y={-6} width={55} height={12} fill="#FFCC80" rx={4} />
    <rect x={50} y={-10} width={18} height={20} fill="#FFD54F" rx={3} />
    <path d="M 58 -8 Q 68 -14 72 -6 Q 68 2 58 -2 Z" fill="#F9A825" />
  </g>
);

export const Cowboy: React.FC<CowboyProps> = ({ frame, side = "solo" }) => {
  const isShootout = side !== "solo" && frame >= 150 && frame < 270;
  const isLeft = side === "left";
  const isRight = side === "right";

  let x = 480;
  let y = 702;
  let facingFlip = 1;

  if (isShootout && isLeft) {
    x = 340 + Math.sin(frame * 0.18) * 100 + Math.cos(frame * 0.09) * 40;
    y = 702 + Math.abs(Math.sin(frame * 0.35)) * 45;
    facingFlip = 1;
  } else if (isShootout && isRight) {
    x = 1580 - Math.sin(frame * 0.16) * 110 - Math.cos(frame * 0.11) * 35;
    y = 702 + Math.abs(Math.cos(frame * 0.32)) * 50;
    facingFlip = -1;
  }

  const gunRotation = isShootout
    ? isLeft
      ? -15 + Math.sin(frame * 0.6) * 25
      : 195 + Math.sin(frame * 0.55 + 1) * 25
    : frame >= 270
      ? 1800
      : interpolate(frame, [150, 270], [0, 1800], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const isShooting =
    isShootout && Math.sin(frame * 0.85 + (isLeft ? 0 : Math.PI)) > 0.65;

  let headScaleY = 1;
  let headScaleX = 1;
  let eyeRx = 8;
  let eyeRy = 8;
  let pupilR = 0;
  let pupilOffsetY = 0;

  if (side === "solo" && frame >= 270 && frame < 274) {
    headScaleY = 0.52;
    headScaleX = 1 / headScaleY;
    eyeRx = 14;
    eyeRy = 3;
  } else if (side === "solo" && frame >= 274 && frame < 284) {
    headScaleY = 1.45;
    headScaleX = 0.68;
    eyeRx = 26;
    eyeRy = 26;
    pupilR = 1.5;
    pupilOffsetY = 18;
  } else if (side === "solo" && frame >= 284 && frame < 310) {
    const t = (frame - 284) / 26;
    const damp = Math.cos(t * Math.PI * 2) * Math.exp(-t * 4);
    headScaleY = 1 + damp * 0.2;
    headScaleX = 1 / headScaleY;
    eyeRx = 8 + damp * 4;
    eyeRy = 8 + damp * 4;
  } else if (isShooting) {
    headScaleY = 0.88;
    headScaleX = 1.12;
  }

  const mouthHeight =
    side === "solo" && frame >= 270 && frame <= 330
      ? Math.abs(Math.sin(frame * 0.35)) * 28 + 4
      : isShooting
        ? 14
        : 6;

  const showBubble = side === "solo" && frame >= 270 && frame <= 330;
  const gunArmX = isLeft || side === "solo" ? 40 : -40;

  return (
    <g transform={`translate(${x}, ${y}) scale(${facingFlip}, 1)`}>
      <rect x={-20} y={80} width={18} height={70} fill="#5D4037" rx={4} />
      <rect x={8} y={80} width={18} height={70} fill="#5D4037" rx={4} />
      <rect x={-35} y={10} width={70} height={80} fill="#8D6E63" rx={8} />

      <g transform={`translate(${gunArmX}, 30)`}>
        <BananaGun rotation={gunRotation} />
        {isShooting && (
          <circle cx={72} cy={0} r={18} fill="#FFEB3B" opacity={0.85} />
        )}
      </g>

      <rect
        x={isLeft || side === "solo" ? -55 : 30}
        y={25}
        width={25}
        height={12}
        fill="#FFCC80"
        rx={4}
        transform={`rotate(${isLeft || side === "solo" ? -15 : 15})`}
      />

      <g transform={`translate(0, -30) scale(${headScaleX}, ${headScaleY})`}>
        <polygon points="-55,-55 -45,-90 45,-90 55,-55 70,-50 -70,-50" fill="#6D4C41" />
        <rect x={-45} y={-92} width={90} height={18} fill="#5D4037" rx={4} />
        <rect x={-40} y={-55} width={80} height={70} fill="#FFCC80" rx={12} />
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
        <ellipse cx={0} cy={5} rx={14} ry={mouthHeight / 2} fill="#5D4037" />
      </g>

      {showBubble && (
        <g transform="translate(120, -120)">
          <ellipse cx={0} cy={0} rx={160} ry={55} fill="#FFFFFF" stroke="#000" strokeWidth={3} />
          <polygon points="-30,45 -50,70 -10,50" fill="#FFFFFF" stroke="#000" strokeWidth={3} />
        </g>
      )}
    </g>
  );
};

export const BananaBullets: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 170 || frame >= 270) return null;

  return (
    <>
      {Array.from({ length: 6 }, (_, i) => {
        const shotFrame = 175 + i * 14;
        if (frame < shotFrame || frame > shotFrame + 18) return null;
        const t = (frame - shotFrame) / 18;
        const fromLeft = i % 2 === 0;
        const startX = fromLeft ? 420 : 1500;
        const endX = fromLeft ? 1500 : 420;
        const cx = interpolate(t, [0, 1], [startX, endX]);
        const cy = 620 + Math.sin(t * Math.PI) * -80 + (i % 3) * 30;
        const rotation = fromLeft ? 90 : -90;
        return (
          <g key={i} transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
            <ellipse cx={0} cy={0} rx={14} ry={6} fill="#FFD54F" stroke="#F9A825" strokeWidth={2} />
          </g>
        );
      })}
    </>
  );
};
