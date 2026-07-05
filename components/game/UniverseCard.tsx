"use client";

type Props = {
  name: string;
  rarity: string;
  selected: boolean;
  onSelect: () => void;
  image: string;
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

const artworkLayouts = {
  Common: {
    left: "8%",
    right: "8%",
    top: "14%",
    bottom: "11%",
    x: "50%",
    y: "50%",
    scale: 1,
  },
  Rare: {
    left: "8%",
    right: "8%",
    top: "14%",
    bottom: "11%",
    x: "50%",
    y: "50%",
    scale: 1,
  },
  Epic: {
    left: "8%",
    right: "8%",
    top: "14%",
    bottom: "5%",
    x: "50%",
    y: "50%",
    scale: 1,
  },
  Legendary: {
    left: "8%",
    right: "8%",
    top: "14%",
    bottom: "7%",
    x: "50%",
    y: "50%",
    scale: 0.89,
  },
};

const nameplateLayouts = {
  Common: {
    left: "24%",
    right: "24%",
    bottom: "3%",
    height: "14%",
  },
  Rare: {
    left: "29%",
    right: "29%",
    bottom: "7.3%",
    height: "10.5%",
  },
  Epic: {
    left: "28%",
    right: "28%",
    bottom: "8.2%",
    height: "10%",
  },
  Legendary: {
    left: "30%",
    right: "30%",
    bottom: "7%",
    height: "9%",
  },
};

function getFramePath(rarity: string) {
  return `/images/frames/${rarity.toLowerCase()}.webp`;
}

function getTextStyle(name: string) {
  const length = name.length;

  if (length >= 22) {
    return {
      fontSize: "clamp(0.58rem, 1.2vw, 0.78rem)",
      letterSpacing: "0.06em",
    };
  }

  if (length >= 17) {
    return {
      fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)",
      letterSpacing: "0.08em",
    };
  }

  if (length >= 12) {
    return {
      fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)",
      letterSpacing: "0.1em",
    };
  }

  return {
    fontSize: "clamp(0.95rem, 2.1vw, 1.3rem)",
    letterSpacing: "0.13em",
  };
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

  const artwork =
    artworkLayouts[rarity as keyof typeof artworkLayouts] ??
    artworkLayouts.Common;

  const nameplate =
    nameplateLayouts[rarity as keyof typeof nameplateLayouts] ??
    nameplateLayouts.Common;

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
      {/* Artwork area */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          left: artwork.left,
          right: artwork.right,
          top: artwork.top,
          bottom: artwork.bottom,
        }}
      >
        <img
          src={image}
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
          style={{
            objectPosition: `${artwork.x} ${artwork.y}`,
            transform: `scale(${artwork.scale})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      </div>

      {/* Frame */}
      <img
        src={getFramePath(rarity)}
        alt=""
        draggable={false}
        className={`pointer-events-none absolute inset-0 z-20 h-full w-full object-fill transition-[filter] duration-150 ${glow.hover
          } ${selected ? glow.selected : ""}`}
      />

      {/* Nameplate text */}
      <div
        className="absolute z-30 flex items-center justify-center overflow-hidden"
        style={{
          left: nameplate.left,
          right: nameplate.right,
          bottom: nameplate.bottom,
          height: nameplate.height,
        }}
      >
        <h2
          className="max-w-full whitespace-nowrap text-center font-black uppercase leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,1)]"
          style={getTextStyle(name)}
        >
          {name}
        </h2>
      </div>
    </div>
  );
}