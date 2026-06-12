export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_DURATION_FRAMES = 2850;

export interface VideoProps {
  showSubtitles: boolean;
  subtitleLanguage: "de" | "en";
}

export const defaultVideoProps: VideoProps = {
  showSubtitles: true,
  subtitleLanguage: "de",
};

export const SUBTITLES: Record<string, Record<"de" | "en", string>> = {
  intro: {
    de: "Bananenbieger Studios präsentiert",
    en: "Bananenbieger Studios presents",
  },
  cowboy: {
    de: "Warum ist die Banane krumm?",
    en: "Why is the banana curved?",
  },
  fairy: {
    de: "Weil niemand in den Urwald flog und sie wieder gerade bog!",
    en: "Because nobody flew to the jungle to bend it straight again!",
  },
  science: {
    de: "Reine Wissenschaft, Leute! Alles beginnt in der Pubertät...",
    en: "Pure science, folks! It all begins during puberty...",
  },
  teen: {
    de: "Chillt mal eure Vitamine... Ich mach heute gar nix.",
    en: "Chill your vitamins... I am doing absolutely nothing today.",
  },
  rocket: {
    de: "Abonniert meinen Kanal! Ich flieg in die Sonneee!",
    en: "Subscribe to my channel! I am flying straight into the sun!",
  },
  villain: {
    de: "Ist mir egal! Es ist nämlich alles mein fieser, fieser Plan, damit ich die Welt beherrschen kann!",
    en: "I do not care! Because it is all my evil, evil masterplan to dominate the entire world!",
  },
};

export const CINEMATIC_EASE = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
