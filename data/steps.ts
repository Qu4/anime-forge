import type { GameStep } from "@/types/game";

import { universes } from "@/data/universes";
import { origins } from "@/data/origins";
import { factions } from "@/data/factions";

export const steps: GameStep[] = [
  {
    key: "universe",
    title: "Your Universe",
    options: universes,
  },
  {
    key: "origin",
    title: "Your Origin",
    options: origins,
  },
  {
    key: "faction",
    title: "Your Faction",
    options: factions,
  },
];