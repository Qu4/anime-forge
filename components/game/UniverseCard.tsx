"use client";

type Props = {
  name: string;
  rarity: string;
  selected: boolean;
  onSelect: () => void;
  image: string;
};

const rarityStyles = {
  Common: {
    stars: 2,
    border: "border-zinc-400/70",
    glow: "drop-shadow-[0_0_20px_rgba(161,161,170,0.5)]",
    selected: "drop-shadow-[0_0_32px_rgba(161,161,170,0.75)]",
    text: "text-zinc-300",
  },
  Rare: {
    stars: 3,
    border: "border-blue-300/80",
    glow: "drop-shadow-[0_0_22px_rgba(96,165,250,0.55)]",
    selected: "drop-shadow-[0_0_34px_rgba(96,165,250,0.85)]",
    text: "text-blue-200",
  },
  Epic: {
    stars: 4,
    border: "border-purple-300/80",
    glow: "drop-shadow-[0_0_24px_rgba(168,85,247,0.6)]",
    selected: "drop-shadow-[0_0_36px_rgba(168,85,247,0.9)]",
    text: "text-purple-200",
  },
  Legendary: {
    stars: 5,
    border: "border-yellow-300/90",
    glow: "drop-shadow-[0_0_26px_rgba(250,204,21,0.65)]",
    selected: "drop-shadow-[0_0_42px_rgba(250,204,21,0.95)]",
    text: "text-yellow-200",
  },
};

function getTextSize(name: string) {
  if (name.length >= 18) {
    return "text-[1rem] tracking-[0.04em]";
  }

  if (name.length >= 13) {
    return "text-[1.1rem] tracking-[0.05em]";
  }

  return "text-[1.25rem] tracking-[0.06em]";
}

export function UniverseCard({
  name,
  rarity,
  selected,
  onSelect,
  image,
}: Props) {
  const style =
    rarityStyles[rarity as keyof typeof rarityStyles] ??
    rarityStyles.Common;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect();
        }
      }}
      className={`group relative aspect-[3/4] w-full max-w-[310px] cursor-pointer border bg-[#08060d]/90 p-[10px] transition-transform duration-150 hover:-translate-y-1 hover:scale-[1.015] ${style.border
        } ${selected ? `-translate-y-1 scale-[1.015] ${style.selected}` : style.glow}`}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div className="absolute inset-0 border border-white/10" />

      <div className="relative h-full overflow-hidden bg-black">
        <img
          src={image}
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />

        <div className="absolute left-4 top-4 flex gap-1 rounded-sm border border-yellow-200/20 bg-black/45 px-2 py-1 shadow-[0_0_12px_rgba(0,0,0,0.55)] backdrop-blur-[1px]">
          {Array.from({ length: style.stars }).map((_, index) => (
            <span
              key={index}
              className="text-lg leading-none text-yellow-200 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]"
            >
              ★
            </span>
          ))}
        </div>

        <div className="absolute bottom-5 left-4 right-4 border border-white/15 bg-black/65 px-3 py-4 text-center backdrop-blur-[2px]">
          <h2
            className={`font-serif font-black uppercase leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] ${getTextSize(
              name
            )}`}
          >
            {name}
          </h2>

          <p
            className={`mt-3 text-xs font-black uppercase tracking-[0.22em] ${style.text}`}
          >
            {rarity}
          </p>
        </div>
      </div>

      <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/50" />
      <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/50" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/50" />
      <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/50" />
    </div>
  );
}