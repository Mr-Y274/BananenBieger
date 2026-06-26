import React from "react";
import { AbsoluteFill, Video } from "remotion";

export const RENDERED_FPS = 30;
export const RENDERED_WIDTH = 1920;
export const RENDERED_HEIGHT = 1080;
/** 94.06s @ 30fps — matches public/rendered/banana.mp4 */
export const RENDERED_DURATION_FRAMES = 2820;

// Prefix with the deploy base path (e.g. "/BananenBieger" on GitHub Pages,
// "" in local dev) so the asset resolves on both.
const RENDERED_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rendered/banana.mp4`;

export const RenderedVideoComposition: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video src={RENDERED_SRC} />
  </AbsoluteFill>
);
