import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { SCENE_MUSIC, SOUND_EFFECTS, type SoundCue } from "./utils/soundTimeline";

const Sound: React.FC<{ cue: SoundCue }> = ({ cue }) => (
  <Audio
    src={staticFile(`sounds/${cue.file}`)}
    volume={cue.volume ?? 0.5}
    loop={cue.loop}
  />
);

export const AudioLayer: React.FC = () => (
  <>
    <Audio src={staticFile("Luisenschule.m4a")} volume={1} />

    {SCENE_MUSIC.map((cue) => (
      <Sequence
        key={cue.id}
        from={cue.from}
        durationInFrames={cue.durationInFrames}
        name={cue.id}
      >
        <Sound cue={cue} />
      </Sequence>
    ))}

    {SOUND_EFFECTS.map((cue) => (
      <Sequence key={cue.id} from={cue.from} name={cue.id}>
        <Sound cue={cue} />
      </Sequence>
    ))}
  </>
);
