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

  return (
    <g transform={`translate(${driftX}, ${driftY})`}>
      <ellipse cx={0} cy={60} rx={55} ry={120} fill="#22C55E" />
      <ellipse cx={0} cy={-20} rx={45} ry={50} fill="#4ADE80" opacity={0.5} />
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

  const fairyDash =
    frame >= 2460 && frame < 2466
      ? interpolate(frame, [2460, 2466], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <>
      <rect width={1920} height={1080} fill="#020617" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={0.7} />
      ))}
      <RocketDrift frame={frame} />
      <EnemyVessel frame={frame} />
      {frame >= 2420 && frame < 2550 && (
        <Fairy frame={frame} variant="villain" wingSpeed={2.6} />
      )}
      {frame >= 2460 && frame < 2466 && (
        <g
          transform={`translate(${1305 + fairyDash * 200}, ${540 + fairyDash * 100}) scale(${1 + fairyDash * 0.5}, ${1 - fairyDash * 0.3})`}
        >
          <Fairy frame={frame} variant="villain" wingSpeed={2.6} />
        </g>
      )}
      {frame >= 2466 && frame < 2550 && (
        <>
          <BananaCharacter frame={frame} mode="knocked" />
          <GlassShards frame={frame} />
          <DizzyStars frame={frame} />
        </>
      )}
      {frame >= 2550 && (
        <>
          <Fairy frame={frame} variant="villain" wingSpeed={2.6} />
          <SubtitleOverlay
            show={showSubtitles}
            language={subtitleLanguage}
            keyName="villain"
            y={980}
          />
        </>
      )}
      <rect width={1920} height={1080} fill="#000000" opacity={fadeOpacity} />
    </>
  );
};
