import React from "react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";

interface StraightBananaProps {
  frame: number;
}

export const StraightBanana: React.FC<StraightBananaProps> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const localFrame = frame - 15;

  if (localFrame < 0) return null;

  const entryScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.8 },
    durationInFrames: 20,
  });

  const settleScale = interpolate(localFrame, [20, 35], [1.3, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const scale = localFrame <= 20 ? entryScale * 1.3 : settleScale;

  const bendProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  let controlOffset = -65 * bendProgress;
  if (frame >= 75 && frame < 105) {
    controlOffset =
      -65 + Math.sin(frame * 0.38) * 10 * Math.exp(-0.08 * (frame - 75));
  } else if (frame >= 105) {
    controlOffset = -65;
  }

  const cx = 960 + controlOffset;
  const w = 30;

  return (
    <g transform={`translate(960, 420) scale(${scale}) translate(-960, -420)`}>
      <path
        d={`M ${960 - w} 310 Q ${cx} 420 ${960 - w} 530 L ${960 + w} 530 Q ${cx} 420 ${960 + w} 310 Z`}
        fill="#FFD54F"
        stroke="#F9A825"
        strokeWidth={2}
      />
      <ellipse cx={960} cy={305} rx={18} ry={10} fill="#9CCC65" />
      <ellipse cx={960} cy={535} rx={22} ry={12} fill="#9CCC65" />
    </g>
  );
};

interface ShockwaveProps {
  frame: number;
}

export const Shockwave: React.FC<ShockwaveProps> = ({ frame }) => {
  if (frame < 45 || frame > 65) return null;
  const progress = (frame - 45) / 20;
  const radius = progress * 900;
  const opacity = 1 - progress;
  return (
    <circle
      cx={960}
      cy={420}
      r={radius}
      fill="none"
      stroke="#38bdf8"
      strokeWidth={6}
      opacity={opacity}
    />
  );
};
