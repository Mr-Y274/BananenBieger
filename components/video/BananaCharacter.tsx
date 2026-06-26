import React from "react";
import { Easing, interpolate } from "remotion";

interface BananaCharacterProps {
  frame: number;
  mode?: "assault" | "scientist" | "teen" | "celebrity" | "fruitbowl" | "astronaut" | "knocked" | "boarding";
  spineSag?: number;
  yawnRadius?: number;
  characterScale?: number;
  showMuscles?: boolean;
}

export const BananaCharacter: React.FC<BananaCharacterProps> = ({
  frame,
  mode = "assault",
  spineSag = 0,
  yawnRadius = 0,
  characterScale = 1,
  showMuscles = false,
}) => {
  let x = -864;
  let y = 1080;
  let bodyTilt = 0;
  let weaponAngle = -65;
  let showSwatter = true;
  let showGlasses = false;
  let showHelmet = false;
  let crossedEyes = false;

  if (mode === "assault") {
    if (frame >= 480 && frame < 495) {
      const t = (frame - 480) / 15;
      x = interpolate(t, [0, 1], [-864, 806]);
      y = interpolate(t, [0, 1], [1080, 594]);
    } else if (frame >= 495) {
      x = 806;
      y = 594;
    }
    if (frame >= 495 && frame < 508) {
      bodyTilt = -28;
      weaponAngle = -65;
    } else if (frame >= 508 && frame <= 512) {
      const t = (frame - 508) / 4;
      weaponAngle = interpolate(t, [0, 1], [-65, 95], {
        easing: Easing.in(Easing.quad),
      });
      bodyTilt = interpolate(t, [0, 1], [-28, 35]);
    } else if (frame > 512) {
      bodyTilt = 35;
      weaponAngle = 95;
    }
  } else if (mode === "scientist") {
    x = 960;
    y = 620;
    showSwatter = false;
    showGlasses = true;
  } else if (mode === "teen") {
    x = 960;
    y = 680;
    showSwatter = false;
  } else if (mode === "fruitbowl") {
    x = 960;
    y = 580;
    showSwatter = false;
  } else if (mode === "celebrity") {
    x = interpolate(
      frame,
      [1650, 1800],
      [400, 1200],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    y = 750;
    showSwatter = false;
    bodyTilt = Math.sin(frame * 0.15) * 8;
  } else if (mode === "boarding") {
    const boardT = interpolate(frame, [1860, 1915], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    x = interpolate(boardT, [0, 0.4, 0.7, 1], [820, 900, 960, 960]);
    y = interpolate(boardT, [0, 0.4, 0.7, 1], [900, 780, 720, 680]);
    bodyTilt = interpolate(boardT, [0, 0.5, 1], [0, -20, 0]);
    showSwatter = false;
    showHelmet = boardT > 0.5;
  } else if (mode === "astronaut") {
    x = 960;
    y = 700;
    showSwatter = false;
    showHelmet = true;
  } else if (mode === "knocked") {
    x = 960;
    y = 700;
    showSwatter = false;
    showHelmet = false;
    crossedEyes = true;
  }

  const spineMidY = 580 + spineSag;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${bodyTilt}) scale(${characterScale})`}>
      {showMuscles && (
        <>
          <ellipse cx={-75} cy={-10} rx={28} ry={40} fill="#F9A825" stroke="#E65100" strokeWidth={2} />
          <ellipse cx={75} cy={-10} rx={28} ry={40} fill="#F9A825" stroke="#E65100" strokeWidth={2} />
          <path d="M -55 -30 Q -75 -50 -90 -25" fill="none" stroke="#E65100" strokeWidth={3} strokeLinecap="round" />
          <path d="M 55 -30 Q 75 -50 90 -25" fill="none" stroke="#E65100" strokeWidth={3} strokeLinecap="round" />
        </>
      )}

      <path
        d={
          mode === "teen"
            ? `M -120 0 Q 0 ${spineMidY - y} 120 0 L 100 80 Q 0 ${spineMidY - y + 40} -100 80 Z`
            : `M -50 -80 Q 0 -120 50 -80 L 40 60 Q 0 100 -40 60 Z`
        }
        fill="#FFD54F"
        stroke="#F9A825"
        strokeWidth={2}
      />

      <circle cx={0} cy={mode === "teen" ? -20 : -30} r={35} fill="#FFE082" />

      {showGlasses && (
        <g transform="translate(0, -30)">
          <circle cx={-18} cy={0} r={16} fill="none" stroke="#000" strokeWidth={4} />
          <circle cx={18} cy={0} r={16} fill="none" stroke="#000" strokeWidth={4} />
          <line x1={-2} y1={0} x2={2} y2={0} stroke="#000" strokeWidth={3} />
        </g>
      )}

      {showHelmet && (
        <circle cx={0} cy={-30} r={55} fill="none" stroke="#94A3B8" strokeWidth={4} opacity={0.6} />
      )}

      {crossedEyes ? (
        <g transform="translate(0, -30)">
          <line x1={-20} y1={-10} x2={-8} y2={5} stroke="#000" strokeWidth={3} />
          <line x1={8} y1={5} x2={20} y2={-10} stroke="#000" strokeWidth={3} />
        </g>
      ) : (
        <>
          <circle cx={-12} cy={mode === "teen" ? -25 : -35} r={5} fill="#000" />
          <circle cx={12} cy={mode === "teen" ? -25 : -35} r={5} fill="#000" />
        </>
      )}

      {yawnRadius > 0 && (
        <circle cx={0} cy={-15} r={yawnRadius} fill="#5D4037" />
      )}

      {mode === "teen" && (
        <g transform="translate(80, -10)">
          <rect x={0} y={0} width={30} height={50} fill="#1E293B" rx={4} />
          <circle cx={15} cy={25} r={40} fill="url(#phoneGlow)" opacity={0.5} />
        </g>
      )}

      {showSwatter && (
        <g transform={`translate(30, -20) rotate(${weaponAngle})`}>
          <line x1={0} y1={0} x2={80} y2={0} stroke="#8D6E63" strokeWidth={4} />
          <rect x={80} y={-35} width={50} height={70} fill="#EF4444" stroke="#B91C1C" strokeWidth={2} />
          <g stroke="#FCA5A5" strokeWidth={1}>
            {[0, 10, 20, 30, 40, 50].map((offset) => (
              <line key={`h-${offset}`} x1={80 + offset} y1={-35} x2={80 + offset} y2={35} />
            ))}
            {[-35, -25, -15, -5, 5, 15, 25, 35].map((offset) => (
              <line key={`v-${offset}`} x1={80} y1={offset} x2={130} y2={offset} />
            ))}
          </g>
        </g>
      )}

      {mode === "scientist" && (
        <g transform="translate(40, -10) rotate(-30)">
          <line x1={0} y1={0} x2={120} y2={-80} stroke="#8D6E63" strokeWidth={5} />
        </g>
      )}

      {mode === "astronaut" && frame >= 1950 && (
        <g transform="translate(60, -40) rotate(15)">
          <rect x={0} y={0} width={35} height={60} fill="#1E293B" rx={5} />
          <rect x={4} y={6} width={27} height={48} fill="#38BDF8" rx={2} />
        </g>
      )}
    </g>
  );
};
