import React from "react";
import { Easing, interpolate } from "remotion";
import { BananaCharacter } from "../BananaCharacter";
import { Fairy } from "../Fairy";
import { SubtitleOverlay } from "../SubtitleOverlay";

interface SceneFinaleProps {
  frame: number;
  showSubtitles: boolean;
  subtitleLanguage: "de" | "en";
}

const EnemyVessel: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame - 2330;
  if (localFrame < 0 || localFrame > 80) return null;

  const x = interpolate(localFrame, [0, 50], [2100, 1305], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <g transform={`translate(${x}, 400)`}>
      <ellipse cx={0} cy={0} rx={120} ry={60} fill="#374151" />
      <polygon points="-80,-30 -120,-80 -60,-50" fill="#1F2937" />
      <polygon points="80,-30 120,-80 60,-50" fill="#1F2937" />
      <polygon points="-80,30 -110,70 -50,50" fill="#1F2937" />
      <polygon points="80,30 110,70 50,50" fill="#1F2937" />
      <rect x={-30} y={-20} width={60} height={40} fill="#111827" rx={4} />
    </g>
  );
};

const RocketExplosion: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame - 2460;
  if (localFrame < 0 || localFrame > 50) return null;

  const burstScale = interpolate(localFrame, [0, 8, 50], [0.2, 2.5, 3.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(localFrame, [0, 5, 40, 50], [0, 1, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const debris = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2 + localFrame * 0.15;
    const dist = localFrame * (6 + (i % 4) * 3);
    return {
      x: 960 + Math.cos(angle) * dist,
      y: 560 + Math.sin(angle) * dist,
      rotation: angle * (180 / Math.PI) + localFrame * 12,
      color: i % 3 === 0 ? "#22C55E" : i % 3 === 1 ? "#F97316" : "#FDE047",
      size: 8 + (i % 5) * 4,
    };
  });

  return (
    <g opacity={opacity}>
      <circle cx={960} cy={560} r={80 * burstScale} fill="#FDE047" opacity={0.9} />
      <circle cx={960} cy={560} r={55 * burstScale} fill="#F97316" opacity={0.85} />
      <circle cx={960} cy={560} r={30 * burstScale} fill="#EF4444" />
      {debris.map((d, i) => (
        <rect
          key={i}
          x={d.x - d.size / 2}
          y={d.y - d.size / 2}
          width={d.size}
          height={d.size}
          fill={d.color}
          transform={`rotate(${d.rotation}, ${d.x}, ${d.y})`}
        />
      ))}
      {localFrame < 20 && (
        <text
          x={960}
          y={480}
          textAnchor="middle"
          fontSize={64}
          fill="#FFFFFF"
          stroke="#000"
          strokeWidth={3}
          paintOrder="stroke"
          fontFamily="Impact, sans-serif"
        >
          BOOM!
        </text>
      )}
    </g>
  );
};

const GlassShards: React.FC<{ frame: number }> = ({ frame }) => {
  const localFrame = frame - 2460;
  if (localFrame < 0 || localFrame > 30) return null;

  const shards = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2 + localFrame * 0.3;
    const dist = localFrame * 8;
    return {
      x: 960 + Math.cos(angle) * dist,
      y: 640 + Math.sin(angle) * dist,
      scale: 1 - localFrame * 0.03,
      rotation: angle * (180 / Math.PI),
    };
  });

  return (
    <>
      {shards.map((s, i) => (
        <polygon
          key={i}
          points="-8,-12 8,-12 4,12 -4,12"
          fill="#94A3B8"
          opacity={0.8}
          transform={`translate(${s.x}, ${s.y}) rotate(${s.rotation}) scale(${s.scale})`}
        />
      ))}
    </>
  );
};

const DizzyStars: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame < 2460) return null;
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = frame * 0.15 + (i * Math.PI * 2) / 5;
        const cx = 960 + Math.cos(angle) * 60;
        const cy = 580 + Math.sin(angle) * 25;
        return (
          <polygon
            key={i}
            points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"
            fill="#FDE047"
            transform={`translate(${cx}, ${cy}) rotate(${frame * 5 + i * 72})`}
          />
        );
      })}
    </>
  );
};

const RocketDrift: React.FC<{ frame: number }> = ({ frame }) => {
  const driftX = 960 + Math.sin(frame * 0.03) * 40;
  const driftY = 500 + Math.cos(frame * 0.025) * 20;

  if (frame >= 2460) return null;

  return (
    <g transform={`translate(${driftX}, ${driftY})`}>
      <ellipse cx={0} cy={60} rx={55} ry={120} fill="#22C55E" />
      <ellipse cx={0} cy={-20} rx={45} ry={50} fill="#4ADE80" opacity={0.5} />
      <circle cx={0} cy={-30} r={38} fill="none" stroke="#94A3B8" strokeWidth={3} opacity={0.5} />
    </g>
  );
};

export const SceneFinale: React.FC<SceneFinaleProps> = ({
  frame,
  showSubtitles,
  subtitleLanguage,
}) => {
  const localFrame = frame - 2250;
  const fadeOpacity = interpolate(localFrame, [500, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 173) % 1920,
    y: (i * 97) % 1080,
    r: 1 + (i % 2),
  }));

  const fairyChewing = frame >= 2455 && frame < 2466;

  return (
    <>
      <rect width={1920} height={1080} fill="#020617" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={0.7} />
      ))}
      <RocketDrift frame={frame} />
      <EnemyVessel frame={frame} />
      {frame >= 2420 && frame < 2455 && (
        <Fairy frame={frame} variant="villain" wingSpeed={2.6} />
      )}
      {fairyChewing && (
        <g transform="translate(1050, 460) scale(1.4)">
          <Fairy frame={frame} variant="villain" wingSpeed={3.5} />
          <path
            d={`M 200 50 Q ${220 + Math.sin(frame * 0.8) * 18} 75 240 50`}
            fill="none"
            stroke="#E91E63"
            strokeWidth={8}
            strokeLinecap="round"
          />
        </g>
      )}
      {frame >= 2460 && (
        <>
          <RocketExplosion frame={frame} />
          <GlassShards frame={frame} />
          <DizzyStars frame={frame} />
        </>
      )}
      {frame >= 2466 && frame < 2550 && (
        <BananaCharacter frame={frame} mode="knocked" />
      )}
      {frame >= 2550 && (
        <Fairy frame={frame} variant="villain" wingSpeed={2.6} />
      )}
      {frame >= 2550 && frame <= 2850 && (
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="storyReveal"
          y={980}
          fontSize={36}
        />
      )}
      <rect width={1920} height={1080} fill="#000000" opacity={fadeOpacity} />
    </>
  );
};
