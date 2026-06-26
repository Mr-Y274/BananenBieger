import React from "react";
import { AbsoluteFill, Video, staticFile } from "remotion";

export const RENDERED_FPS = 30;
export const RENDERED_WIDTH = 1920;
export const RENDERED_HEIGHT = 1080;
/** 94.06s @ 30fps — matches public/rendered/banana.mp4 */
export const RENDERED_DURATION_FRAMES = 2820;

export const RenderedVideoComposition: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Video src={staticFile("rendered/banana.mp4")} />
  </AbsoluteFill>
);
