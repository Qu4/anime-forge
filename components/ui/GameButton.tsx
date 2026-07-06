import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "continue";
};

const variantStyles = {
  primary:
    "rounded-full border border-purple-300/45 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 px-7 py-3 text-sm text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(236,72,153,0.55)]",
  secondary:
    "rounded-md border border-purple-300/35 bg-[#170d2b]/80 px-6 py-2.5 text-sm text-purple-100 shadow-[0_0_16px_rgba(168,85,247,0.18)] hover:border-purple-200/60 hover:bg-[#241044]/90 hover:text-white hover:shadow-[0_0_26px_rgba(168,85,247,0.35)]",
};

const continuePoints = "44,5 356,5 388,34 356,63 44,63 12,34";

export function GameButton({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}: Props) {
  if (variant === "continue") {
    return (
      <button
        disabled={disabled}
        className={`group relative isolate h-[68px] w-full min-w-[280px] max-w-[360px] overflow-visible bg-transparent text-base font-black uppercase tracking-[0.18em] text-white transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 sm:min-w-[360px] ${className}`}
        {...props}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-visible"
          viewBox="0 0 400 68"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="continue-body" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#2a0d4d" stopOpacity="0.48" />
              <stop offset="50%" stopColor="#6d28d9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2a0d4d" stopOpacity="0.48" />
            </linearGradient>

            <linearGradient id="continue-border" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f5d0fe" stopOpacity="1" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <polygon points={continuePoints} fill="url(#continue-body)" />

          <polygon
            points={continuePoints}
            fill="none"
            stroke="#c084fc"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            style={{
              filter:
                "drop-shadow(0 0 5px rgba(245,208,254,0.9)) drop-shadow(0 0 14px rgba(168,85,247,0.75)) drop-shadow(0 0 26px rgba(168,85,247,0.45))",
            }}
          />

          <polygon
            points={continuePoints}
            fill="none"
            stroke="url(#continue-border)"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <span
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center leading-none"
          style={{
            transform: "translateY(-3px)",
          }}
        >
          <span className="relative z-50 block leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {children}
          </span>
        </span>

        <span
          className="pointer-events-none absolute left-[17%] top-1/2 z-50 text-xl leading-none text-purple-100/80 transition-transform duration-150 group-hover:-translate-x-1 sm:left-[22%]"
          style={{
            transform: "translateY(calc(-50% - 5px))",
          }}
        >
          ‹
        </span>

        <span
          className="pointer-events-none absolute right-[17%] top-1/2 z-50 text-xl leading-none text-purple-100/80 transition-transform duration-150 group-hover:translate-x-1 sm:right-[22%]"
          style={{
            transform: "translateY(calc(-50% - 5px))",
          }}
        >
          ›
        </span>
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-black uppercase tracking-[0.12em] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-35 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}