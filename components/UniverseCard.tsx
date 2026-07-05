import { RarityBadge } from "./RarityBadge";

type Props = {
  name: string;
  rarity: string;
  selected: boolean;
  onSelect: () => void;
  image: string;
  stars: number;
};

const borderStyles = {
  Common: "border-gray-400 shadow-gray-500/30",
  Rare: "border-blue-400 shadow-blue-500/40",
  Epic: "border-purple-400 shadow-purple-500/50",
  Legendary: "border-yellow-300 shadow-yellow-500/60",
};

export function UniverseCard({
  name,
  rarity,
  selected,
  onSelect,
  image,
  stars,
}: Props) {
  return (
    <button
      onClick={onSelect}
      className={`group relative h-[390px] w-full overflow-hidden rounded-[2rem] border-2 bg-black shadow-2xl transition duration-300 hover:-translate-y-2 hover:scale-[1.02] ${
        borderStyles[rarity as keyof typeof borderStyles] ??
        borderStyles.Common
      } ${selected ? "ring-4 ring-green-400" : ""}`}
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

      <div className="absolute left-5 top-5 flex gap-1">
        {Array.from({ length: stars }).map((_, index) => (
          <span
            key={index}
            className="text-xl text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]"
          >
            ★
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/45 p-6 backdrop-blur-sm">
        <h2 className="text-3xl font-black uppercase tracking-wide text-white drop-shadow-2xl">
          {name}
        </h2>

        <div className="mt-3">
          <RarityBadge rarity={rarity} />
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
          {selected ? "Locked" : "Choose"}
        </p>
      </div>
    </button>
  );
}