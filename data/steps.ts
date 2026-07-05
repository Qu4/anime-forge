export type GameOption = {
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  stars: number;
  image: string;
};

export const steps = [
  {
    key: "universe",
    title: "🌌 Your Universe",
    options: [
      { name: "Attack on Titan", rarity: "Legendary", stars: 5, image: "/images/universes/attack-on-titan.webp" },
      { name: "Naruto", rarity: "Legendary", stars: 5, image: "/images/universes/naruto.webp" },
      { name: "One Piece", rarity: "Legendary", stars: 5, image: "/images/universes/one-piece.webp" },
      { name: "Bleach", rarity: "Epic", stars: 4, image: "/images/universes/bleach.webp" },
      { name: "Jujutsu Kaisen", rarity: "Epic", stars: 4, image: "/images/universes/jujutsu-kaisen.webp" },
      { name: "Tokyo Ghoul", rarity: "Epic", stars: 4, image: "/images/universes/tokyo-ghoul.webp" },
      { name: "Demon Slayer", rarity: "Rare", stars: 3, image: "/images/universes/demon-slayer.webp" },
      { name: "Black Clover", rarity: "Rare", stars: 3, image: "/images/universes/black-clover.webp" },
      { name: "Blue Exorcist", rarity: "Common", stars: 2, image: "/images/universes/blue-exorcist.webp" },
      { name: "The Fire Hunter", rarity: "Common", stars: 2, image: "/images/universes/the-fire-hunter.webp" },
    ],
  },
  {
    key: "origin",
    title: "🏯 Your Origin",
    options: [
      { name: "Konoha", rarity: "Legendary", stars: 5, image: "/images/origins/konoha.webp" },
      { name: "Shiganshina", rarity: "Epic", stars: 4, image: "/images/origins/shiganshina.webp" },
      { name: "Soul Society", rarity: "Epic", stars: 4, image: "/images/origins/soul-society.webp" },
      { name: "Clover Kingdom", rarity: "Rare", stars: 3, image: "/images/origins/clover-kingdom.webp" },
      { name: "Abandoned Island", rarity: "Common", stars: 2, image: "/images/origins/abandoned-island.webp" },
      { name: "Underground City", rarity: "Common", stars: 2, image: "/images/origins/underground-city.webp" },
    ],
  },
  {
    key: "faction",
    title: "⚔️ Your Faction",
    options: [
      { name: "Akatsuki", rarity: "Legendary", stars: 5, image: "/images/factions/akatsuki.webp" },
      { name: "Straw Hat Pirates", rarity: "Legendary", stars: 5, image: "/images/factions/straw-hat-pirates.webp" },
      { name: "Survey Corps", rarity: "Epic", stars: 4, image: "/images/factions/survey-corps.webp" },
      { name: "Demon Slayer Corps", rarity: "Rare", stars: 3, image: "/images/factions/demon-slayer-corps.webp" },
      { name: "Marines", rarity: "Common", stars: 2, image: "/images/factions/marines.webp" },
      { name: "Lone Mercenary", rarity: "Common", stars: 2, image: "/images/factions/lone-mercenary.webp" },
    ],
  },
];