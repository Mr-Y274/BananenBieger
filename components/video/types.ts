import { TOTAL_DURATION_FRAMES } from "./utils/timeline";

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_DURATION_FRAMES = TOTAL_DURATION_FRAMES;

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
  storyReveal: {
    de: "Nein!! Wenn das rauskommt, wird meine Geschichte nicht mehr erzählt",
    en: "No!! If this gets out, my story will no longer be told",
  },
  scienceIntro: {
    de: "Das stimmt doch gar nicht, da gibt es eine Wissenschaftliche Erklärung für",
    en: "That is not true at all, there is a scientific explanation for that",
  },
  growthStage: {
    de: "Im Anfangstadium wachsen die Bananen noch normal nach unten",
    en: "In the early stage, bananas still grow normally downward",
  },
  spotlightGrow: {
    de: "Das Rampenlicht hilft mir zu wachsen",
    en: "The spotlight helps me grow",
  },
  lightLove: {
    de: "Das Licht ist soooo toll! Ich will ihm entgegen.",
    en: "The light is soooo great! I want to reach for it.",
  },
  flyToSun: {
    de: "Ich flieg jetzt zur Sonne. Dann werd ich noch größer",
    en: "I am flying to the sun now. Then I will get even bigger",
  },
};

export const CINEMATIC_EASE = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
