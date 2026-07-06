import { BackgroundImage } from "./background/BackgroundImage";
import { Stars } from "./background/Stars";
import { LightRays } from "./background/LightRays";
import { MouseGlow } from "./background/MouseGlow";

type Props = {
  children: React.ReactNode;
};

export function GameBackground({ children }: Props) {
  return (
    <main className="game-cursor-scope relative min-h-screen overflow-hidden bg-[#03020a] p-6 text-[var(--text)]">
      <BackgroundImage />

      <div className="absolute inset-0 bg-black/25" />

      <LightRays />
      <Stars />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />

      <MouseGlow />

      <div className="relative z-10">{children}</div>
    </main>
  );
}