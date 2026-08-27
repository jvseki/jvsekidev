import { Composition } from "remotion";
import { LogoLoop, LOGO_LOOP_FPS, LOGO_LOOP_DURATION_SECONDS, LOGO_LOOP_SIZE } from "./LogoLoop";

export function RemotionRoot() {
  return (
    <Composition
      id="LogoLoop"
      component={LogoLoop}
      durationInFrames={LOGO_LOOP_FPS * LOGO_LOOP_DURATION_SECONDS}
      fps={LOGO_LOOP_FPS}
      width={LOGO_LOOP_SIZE}
      height={LOGO_LOOP_SIZE}
    />
  );
}
