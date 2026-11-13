import { Composition } from "remotion";
import { LogoLoop, LOGO_LOOP_FPS, LOGO_LOOP_DURATION_SECONDS, LOGO_LOOP_SIZE } from "./LogoLoop";
import { PROMO_DURATION, SeklynPromo } from "./seklyn/SeklynPromo";
import { LOOP_DURATION, LoopAdesao, LoopAluno, LoopFicha, LoopLink } from "./seklyn/Loops";
import { FPS } from "./seklyn/theme";

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="LogoLoop"
        component={LogoLoop}
        durationInFrames={LOGO_LOOP_FPS * LOGO_LOOP_DURATION_SECONDS}
        fps={LOGO_LOOP_FPS}
        width={LOGO_LOOP_SIZE}
        height={LOGO_LOOP_SIZE}
      />

      {/* Seklyn — divulgação. Mesmo componente, duas orientações. */}
      <Composition id="SeklynPromo" component={SeklynPromo} durationInFrames={PROMO_DURATION} fps={FPS} width={1920} height={1080} />
      <Composition id="SeklynPromoVertical" component={SeklynPromo} durationInFrames={PROMO_DURATION} fps={FPS} width={1080} height={1920} />

      {/* Seklyn — loops de cada passo, usados na página /seklyn */}
      <Composition id="SeklynLoopFicha" component={LoopFicha} durationInFrames={LOOP_DURATION} fps={FPS} width={1080} height={1080} />
      <Composition id="SeklynLoopLink" component={LoopLink} durationInFrames={LOOP_DURATION} fps={FPS} width={1080} height={1080} />
      <Composition id="SeklynLoopAluno" component={LoopAluno} durationInFrames={LOOP_DURATION} fps={FPS} width={1080} height={1080} />
      <Composition id="SeklynLoopAdesao" component={LoopAdesao} durationInFrames={LOOP_DURATION} fps={FPS} width={1080} height={1080} />
    </>
  );
}
