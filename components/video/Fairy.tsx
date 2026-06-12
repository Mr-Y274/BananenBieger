import React from "react";
import { Easing, interpolate } from "remotion";

interface FairyProps {
  frame: number;
  variant?: "normal" | "villain" | "knocked";
  wingSpeed?: number;
}

export const Fairy: React.FC<FairyProps> = ({
  frame,
  variant = "normal",
  wingSpeed = 1.35,
}) => {
  let x = 1382;
  let y = 302;
  let rotation = 0;
  let scaleX = 1;
  let scaleY = 1;
  let pupilOffsetX = 0;

  if (frame >= 330 && frame < 420) {
    const progress = interpolate(frame, [330, 420], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    x = interpolate(progress, [0, 1], [2208, 1382]);
    y = interpolate(progress, [0, 1], [162, 302]);
    y += Math.sin(frame * 0.14) * 18;
    pupilOffsetX = -6;
  } else if (frame >= 420 && frame < 426) {
    x = 1382;
    y = 302 + Math.sin(frame * 0.14) * 18;
    pupilOffsetX = interpolate(frame, [420, 426], [4, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  } else if (frame >= 426 && frame < 480) {
    x = 1382;
    y = 302 + Math.sin(frame * 0.14) * 18;
  } else if (frame >= 512 && frame < 530) {
    const t = (frame - 512) / 18;
    x = interpolate(t, [0, 1], [1382, 4608]);
    y = interpolate(t, [0, 1], [302, -1512]);
    rotation = frame * 28;
    scaleY = 0.12 + t * 3.68;
    scaleX = interpolate(t, [0, 0.15, 1], [1, 0.2, 0.2]);
  } else if (frame >= 2420) {
    x = 1305;
    y = 540;
  }

  const wingScale = Math.sin(frame * wingSpeed) * 0.9 + 0.1;
  const mouthOpen =
    frame >= 420 && frame < 480
      ? Math.abs(Math.sin(frame * 0.4)) * 12 + 4
      : frame >= 2550
        ? 8 + Math.abs(Math.sin(frame * 0.8)) * 20
        : 4;

  const closeUpScale =
    frame >= 2550
      ? interpolate(frame, [2550, 2650], [1, 5.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      : 1;

  const zigzagMouth =
    frame >= 2550
      ? `M -20 15 L -10 ${15 - mouthOpen} L 0 15 L 10 ${15 + mouthOpen} L 20 15 L 10 ${15 - mouthOpen} L 0 15 L -10 ${15 + mouthOpen} Z`
      : null;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scaleX * closeUpScale}, ${scaleY * closeUpScale})`}
    >
      {/* Wings */}
      <ellipse
        cx={-70}
        cy={0}
        rx={45}
        ry={18}
        fill="#B3E5FC"
        opacity={0.85}
        transform={`scale(${wingScale}, 1)`}
      />
      <ellipse
        cx={70}
        cy={0}
        rx={45}
        ry={18}
        fill="#B3E5FC"
        opacity={0.85}
        transform={`scale(${-wingScale}, 1)`}
      />

      {/* Body */}
      <ellipse cx={0} cy={30} rx={22} ry={35} fill="#80DEEA" />

      {/* Head */}
      <circle cx={0} cy={0} r={48} fill="#E0F7FA" />

      {/* Villain mask */}
      {variant === "villain" && frame >= 2420 && (
        <polygon
          points="-40,-10 40,-10 35,15 -35,15"
          fill="#1a1a1a"
          stroke="#000"
          strokeWidth={2}
        />
      )}

      {/* Eyes */}
      <ellipse cx={-16} cy={-5} rx={16} ry={22} fill="#FFFFFF" />
      <ellipse cx={16} cy={-5} rx={16} ry={22} fill="#FFFFFF" />
      <circle cx={-16 + pupilOffsetX} cy={-2} r={10} fill="#0091EA" />
      <circle cx={16 + pupilOffsetX} cy={-2} r={10} fill="#0091EA" />

      {/* Mouth */}
      {zigzagMouth ? (
        <path d={zigzagMouth} fill="#E91E63" />
      ) : (
        <ellipse cx={0} cy={18} rx={10} ry={mouthOpen / 2} fill="#E91E63" />
      )}
    </g>
  );
};
