import type { GameStep } from "@/types/game";

import { universes } from "@/data/universes";
import { origins } from "@/data/origins";
import { factions } from "@/data/factions";
import { species } from "@/data/species";
import { roles } from "@/data/roles";
import { powerSources } from "@/data/powerSources";
import { abilities } from "@/data/abilities";
import { weapons } from "@/data/weapons";
import { fightingStyles } from "@/data/fightingStyles";
import { mentors } from "@/data/mentors";
import { rivals } from "@/data/rivals";
import { companions } from "@/data/companions";
import { relics } from "@/data/relics";
import { destinies } from "@/data/destinies";

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
  {
    key: "species",
    title: "Your Species",
    options: species,
  },
  {
    key: "role",
    title: "Your Role",
    options: roles,
  },
  {
    key: "powerSource",
    title: "Your Power Source",
    options: powerSources,
  },
  {
    key: "ability",
    title: "Your Main Ability",
    options: abilities,
  },
  {
    key: "weapon",
    title: "Your Weapon",
    options: weapons,
  },
  {
    key: "fightingStyle",
    title: "Your Fighting Style",
    options: fightingStyles,
  },
  {
    key: "mentor",
    title: "Your Mentor",
    options: mentors,
  },
  {
    key: "rival",
    title: "Your Rival",
    options: rivals,
  },
  {
    key: "companion",
    title: "Your Companion",
    options: companions,
  },
  {
    key: "relic",
    title: "Your Relic",
    options: relics,
  },
  {
    key: "destiny",
    title: "Your Destiny",
    options: destinies,
  },
];