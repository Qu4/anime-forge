import { BackgroundImage } from "./background/BackgroundImage";
import { Stars } from "./background/Stars";
import { LightRays } from "./background/LightRays";
import { MouseGlow } from "./background/MouseGlow";

type Props = {
  children: React.ReactNode;
  variant?: "full" | "static";
};

export function GameBackground({ children, variant = "full" }: Props) {
  const isFull = variant === "full";

  return (
    <main className="game-cursor-scope relative min-h-screen overflow-hidden bg-[#03020a] p-6 text-[var(--text)]">
      <BackgroundImage />

      <div className="absolute inset-0 bg-black/30" />

      {isFull && (
        <>
          <LightRays />
          <Stars />
          <MouseGlow />
        </>
      )}

      {!isFull && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/90" />
      )}

      {isFull && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />
      )}

      <div className="relative z-10">{children}</div>
    </main>
  );
}