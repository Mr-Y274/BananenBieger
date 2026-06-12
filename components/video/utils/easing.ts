import { Easing } from "remotion";

export const CINEMATIC_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

export const ELASTIC_SETTLE = Easing.elastic(1.2);

export const clampBoth = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
