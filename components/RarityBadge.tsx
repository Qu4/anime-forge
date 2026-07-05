type Props = {
  rarity: string;
};

const rarityStyles = {
  Common: "bg-gray-500 text-white",
  Rare: "bg-blue-600 text-white",
  Epic: "bg-purple-600 text-white",
  Legendary:
    "bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/40",
};

export function RarityBadge({ rarity }: Props) {
  return (
    <div
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
        rarityStyles[rarity as keyof typeof rarityStyles] ??
        rarityStyles.Common
      }`}
    >
      {rarity}
    </div>
  );
}