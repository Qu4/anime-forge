import { ProgressBar } from "./ProgressBar";

type Props = {
  playerName: string;
  currentStep: number;
  totalSteps: number;
};

const headerClip =
  "polygon(4% 0%, 96% 0%, 100% 14%, 100% 86%, 96% 100%, 4% 100%, 0% 86%, 0% 14%)";

export function GameHeader({ playerName, currentStep, totalSteps }: Props) {
  return (
    <section className="relative mx-auto w-full max-w-[650px] px-10 py-7 text-center">
      {/* Header body */}
      <div
        className="absolute inset-0 bg-[#080414]/55 backdrop-blur-sm"
        style={{ clipPath: headerClip }}
      />

      {/* Soft inner glow */}
      <div
        className="absolute inset-[2px] bg-gradient-to-b from-purple-300/8 via-transparent to-purple-900/10"
        style={{ clipPath: headerClip }}
      />

      {/* Angled glowing frame */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-visible"
        viewBox="0 0 650 190"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="header-border" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#f5d0fe" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <polygon
          points="26,1 624,1 649,27 649,163 624,189 26,189 1,163 1,27"
          fill="none"
          stroke="#a855f7"
          strokeOpacity="0.35"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(168,85,247,0.45)) drop-shadow(0 0 22px rgba(168,85,247,0.18))",
          }}
        />

        <polygon
          points="26,1 624,1 649,27 649,163 624,189 26,189 1,163 1,27"
          fill="none"
          stroke="url(#header-border)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Background magic circle */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/15 shadow-[0_0_55px_rgba(168,85,247,0.18)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/10" />

      <p className="relative text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">
        Anime Forge
      </p>

      <h2 className="relative mt-2 font-serif text-4xl font-black uppercase tracking-[0.06em] text-white drop-shadow-[0_0_18px_rgba(216,180,254,0.55)]">
        Build Your Destiny
      </h2>

      <p className="relative mt-3 text-sm font-bold uppercase tracking-[0.3em] text-white/80">
        {playerName.toUpperCase()} <span className="text-purple-200">•</span>{" "}
        STEP {currentStep} OF {totalSteps}
      </p>

      <div className="relative">
        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      {/* Bottom diamond */}
      <div className="absolute bottom-[-8px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border border-purple-200/60 bg-[#160726] shadow-[0_0_12px_rgba(216,180,254,0.7)]" />
    </section>
  );
}