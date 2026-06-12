import React from "react";
import { interpolate } from "remotion";
import { BananaCharacter } from "../BananaCharacter";
import { SubtitleOverlay } from "../SubtitleOverlay";

interface SceneScienceProps {
  frame: number;
  showSubtitles: boolean;
  subtitleLanguage: "de" | "en";
}

const ChalkboardDrawing: React.FC = () => (
  <g transform="translate(1200, 200)">
    <rect x={0} y={0} width={500} height={350} fill="#065F46" stroke="#34D399" strokeWidth={3} rx={8} />
    <path
      d="M 80 280 L 120 120 L 200 200 L 280 80 L 350 250"
      fill="none"
      stroke="#FDE68A"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <circle cx={350} cy={80} r={35} fill="none" stroke="#FBBF24" strokeWidth={3} />
    <path d="M 200 200 L 250 280 L 300 240" fill="none" stroke="#FDE68A" strokeWidth={3} />
    <text x={250} y={40} textAnchor="middle" fill="#A7F3D0" fontSize={18} fontFamily="monospace">
      NUKLEAR-SONNE
    </text>
  </g>
);

const LivingRoom: React.FC<{ spineSag: number; yawnRadius: number; frame: number }> = ({
  spineSag,
  yawnRadius,
  frame,
}) => (
  <>
    <rect width={1920} height={1080} fill="#312e81" />
    <rect x={200} y={500} width={1520} height={400} fill="#4338CA" rx={20} opacity={0.3} />
    <path
      d="M 300 700 L 300 550 Q 960 520 1620 550 L 1620 700 Q 960 680 300 700 Z"
      fill="#6366F1"
      stroke="#818CF8"
      strokeWidth={3}
    />
    <rect x={280} y={700} width={80} height={120} fill="#4F46E5" rx={8} />
    <rect x={1560} y={700} width={80} height={120} fill="#4F46E5" rx={8} />
    <defs>
      <radialGradient id="phoneGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
      </radialGradient>
    </defs>
    <BananaCharacter frame={frame} mode="teen" spineSag={spineSag} yawnRadius={yawnRadius} />
  </>
);

const FruitBowlMontage: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <rect width={1920} height={1080} fill="#374151" />
    <ellipse cx={960} cy={700} rx={280} ry={80} fill="#9CA3AF" />
    <path d="M 680 700 Q 960 580 1240 700 L 1200 780 Q 960 720 720 780 Z" fill="#D1D5DB" />
    <BananaCharacter frame={frame} mode="fruitbowl" />
    {[0, 1].map((i) => {
      const bounce = 1 + Math.sin(frame * 0.22 + i * Math.PI) * 0.18;
      const cx = i === 0 ? 620 : 1300;
      return (
        <g key={i} transform={`translate(${cx}, 620) scale(1, ${bounce})`}>
          <circle cx={0} cy={0} r={40} fill="#7C3AED" />
          <circle cx={-10} cy={-5} r={5} fill="#FFF" />
          <circle cx={10} cy={-5} r={5} fill="#FFF" />
        </g>
      );
    })}
  </>
);

const ConcertMontage: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <rect width={1920} height={1080} fill="#0F172A" />
    {[0, 1, 2].map((i) => {
      const angle = Math.cos(frame * 0.05 + i * 2) * 25;
      return (
        <g key={i} transform={`translate(${480 + i * 480}, 100) rotate(${angle})`}>
          <polygon points="0,0 -60,400 60,400" fill="url(#spotlightGrad)" opacity={0.7} />
        </g>
      );
    })}
    <defs>
      <linearGradient id="spotlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
      </linearGradient>
    </defs>
    <BananaCharacter frame={frame} mode="scientist" />
    {Array.from({ length: 20 }, (_, index) => {
      const baseX = 100 + index * 90;
      const baseY = 900;
      const jumpY = baseY - Math.abs(Math.sin(frame * 0.28 + index * 0.45)) * 45;
      return <circle key={index} cx={baseX} cy={jumpY} r={18} fill="#22C55E" />;
    })}
  </>
);

const RedCarpetMontage: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <rect width={1920} height={1080} fill="#1E1B4B" />
    <path d="M 0 850 L 1920 850 L 1920 1080 L 0 1080 Z" fill="#DC2626" />
    <BananaCharacter frame={frame} mode="celebrity" />
    {[680, 1240].map((cx) => (
      <g key={cx} transform={`translate(${cx}, 720)`}>
        <rect x={-40} y={-80} width={80} height={120} fill="#78350F" rx={16} />
        <rect x={-25} y={-60} width={50} height={12} fill="#000" rx={2} />
      </g>
    ))}
  </>
);

const SpaceExpedition: React.FC<{ frame: number }> = ({ frame }) => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 137) % 1920,
    y: (i * 89) % 1080,
    r: 1 + (i % 3),
  }));

  const jitterX =
    frame >= 1880 && frame < 1920
      ? Math.sin(frame * 2.3) * 6 + Math.cos(frame * 1.8) * 4
      : 0;

  const rocketY =
    frame >= 1920
      ? 700 - Math.pow((frame - 1920) / 30, 3) * 400
      : 700;

  return (
    <>
      <rect width={1920} height={1080} fill="#020617" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#FFFFFF" opacity={0.8} />
      ))}
      {frame >= 1950 && (
        <circle cx={960} cy={200} r={180} fill="url(#sunGrad)" opacity={0.9} />
      )}
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="exhaust1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="exhaust2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="exhaust3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
        </linearGradient>
      </defs>
      <g transform={`translate(${960 + jitterX}, ${rocketY})`}>
        <ellipse cx={0} cy={60} rx={55} ry={120} fill="#22C55E" />
        <ellipse cx={0} cy={-20} rx={45} ry={50} fill="#4ADE80" opacity={0.5} />
        <circle cx={0} cy={-30} r={38} fill="none" stroke="#94A3B8" strokeWidth={3} opacity={0.5} />
        {frame >= 1880 && frame < 1950 && (
          <>
            <path
              d={`M -20 120 Q ${Math.sin(frame) * 10} 180 0 220 Q ${Math.cos(frame) * 10} 180 20 120`}
              fill="url(#exhaust1)"
            />
            <path
              d={`M -10 120 Q ${Math.sin(frame * 1.5) * 8} 170 0 200 Q ${Math.cos(frame * 1.5) * 8} 170 10 120`}
              fill="url(#exhaust2)"
            />
            <path
              d={`M -5 120 Q ${Math.sin(frame * 2) * 6} 160 0 185 Q ${Math.cos(frame * 2) * 6} 160 5 120`}
              fill="url(#exhaust3)"
            />
          </>
        )}
        <BananaCharacter frame={frame} mode="astronaut" />
      </g>
    </>
  );
};

export const SceneScience: React.FC<SceneScienceProps> = ({
  frame,
  showSubtitles,
  subtitleLanguage,
}) => {
  const localFrame = frame - 750;

  const spineSag = interpolate(localFrame, [300, 450], [0, 155], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const yawnRadius = localFrame >= 430 && localFrame <= 450 ? 32 : 0;

  if (localFrame < 200) {
    return (
      <>
        <rect width={1920} height={1080} fill="#064e3b" />
        <ChalkboardDrawing />
        <BananaCharacter frame={frame} mode="scientist" />
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="science"
          y={950}
        />
      </>
    );
  }

  if (localFrame < 600) {
    return (
      <>
        <LivingRoom spineSag={spineSag} yawnRadius={yawnRadius} frame={frame} />
        {localFrame >= 430 && (
          <SubtitleOverlay
            show={showSubtitles}
            language={subtitleLanguage}
            keyName="teen"
            y={950}
          />
        )}
      </>
    );
  }

  if (localFrame < 750) {
    return <FruitBowlMontage frame={frame} />;
  }

  if (localFrame < 900) {
    return <ConcertMontage frame={frame} />;
  }

  if (localFrame < 1050) {
    return <RedCarpetMontage frame={frame} />;
  }

  return (
    <>
      <SpaceExpedition frame={frame} />
      {localFrame >= 1200 && (
        <SubtitleOverlay
          show={showSubtitles}
          language={subtitleLanguage}
          keyName="rocket"
          y={950}
        />
      )}
    </>
  );
};
