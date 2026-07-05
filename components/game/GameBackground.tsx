import { BackgroundImage } from "./background/BackgroundImage";
import { MouseGlow } from "./background/MouseGlow";
import { Stars } from "./background/Stars";
import { LightRays } from "./background/LightRays";
import { Particles } from "./background/Particles";

type Props = {
  children: React.ReactNode;
};

export function GameBackground({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03020a] p-6 text-[var(--text)]">
      <BackgroundImage />

      <div className="absolute inset-0 bg-black/25" />

      <LightRays />
      <Stars />
      <Particles />
      <MouseGlow />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />

      <div className="relative z-10">{children}</div>
    </main>
  );
}