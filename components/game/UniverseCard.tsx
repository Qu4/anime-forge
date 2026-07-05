"use client";

type Props = {
  name: string;
  rarity: string;
  selected: boolean;
  onSelect: () => void;
  image: string;
  stars: number;
};

const frameGlowStyles = {
  Common: {
    hover: "group-hover:drop-shadow-[0_0_18px_rgba(156,163,175,0.45)]",
    selected: "drop-shadow-[0_0_26px_rgba(156,163,175,0.75)]",
  },
  Rare: {
    hover: "group-hover:drop-shadow-[0_0_22px_rgba(59,130,246,0.65)]",
    selected: "drop-shadow-[0_0_32px_rgba(59,130,246,0.9)]",
  },
  Epic: {
    hover: "group-hover:drop-shadow-[0_0_26px_rgba(168,85,247,0.75)]",
    selected: "drop-shadow-[0_0_38px_rgba(168,85,247,0.95)]",
  },
  Legendary: {
    hover: "group-hover:drop-shadow-[0_0_30px_rgba(250,204,21,0.75)]",
    selected: "drop-shadow-[0_0_44px_rgba(250,204,21,0.95)]",
  },
};

function getFramePath(rarity: string) {
  return `/images/frames/${rarity.toLowerCase()}.webp`;
}

export function UniverseCard({
  name,
  rarity,
  selected,
  onSelect,
  image,
}: Props) {
  const glow =
    frameGlowStyles[rarity as keyof typeof frameGlowStyles] ??
    frameGlowStyles.Common;

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
      className={`group relative aspect-[4/3] w-full cursor-pointer bg-transparent p-0 outline-none transition-transform duration-150 hover:-translate-y-1 hover:scale-[1.01] ${selected ? "-translate-y-1 scale-[1.01]" : ""
        }`}
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Artwork area: ends in the frame */}
      <div className="absolute left-[8%] right-[8%] top-[14%] bottom-[21%] z-0 overflow-hidden">
        <img
          src={image}
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      </div>

      {/* Frame: goes over the entire card */}
      <img
        src={getFramePath(rarity)}
        alt=""
        draggable={false}
        className={`pointer-events-none absolute inset-0 z-20 h-full w-full object-fill transition-[filter] duration-150 ${glow.hover
          } ${selected ? glow.selected : ""}`}
      />

      {/* Name in the bottom field of the frame */}
      <div className="absolute bottom-[7%] left-[20%] right-[20%] z-30 flex h-[10%] items-center justify-center">
        <h2 className="max-w-full truncate text-center text-lg font-black uppercase tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)] md:text-xl">
          {name}
        </h2>
      </div>


    </div>
  );
}