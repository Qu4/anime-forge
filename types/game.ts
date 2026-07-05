export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export type GameOption = {
  name: string;
  rarity: Rarity;
  stars: number;
  image: string;
};

export type GameStep = {
  key: string;
  title: string;
  options: GameOption[];
};

export type GameAnswers = Record<string, string>;