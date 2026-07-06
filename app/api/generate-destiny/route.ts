import { GoogleGenAI } from "@google/genai";
import type { Rarity } from "@/types/game";

type SelectedOption = {
  stepKey: string;
  stepTitle: string;
  name: string;
  rarity: Rarity;
  image: string;
};

type RequestBody = {
  playerName: string;
  characterTitle: string;
  finalRarity: Rarity;
  selectedOptions: SelectedOption[];
};

const strengthGuide: Record<Rarity, string> = {
  Common:
    "Grounded strength. The character is not world-breaking, but has courage, resilience, and the potential to survive against impossible odds.",
  Rare:
    "Hidden potential. The character is stronger than most realize and may grow into a major force if pushed by conflict.",
  Epic:
    "Dangerous power. The character is already feared, influential, and capable of changing the course of wars or nations.",
  Legendary:
    "Mythic power. The character stands at the edge of godhood and can reshape worlds, eras, and fate itself.",
};

function getChoice(options: SelectedOption[], key: string) {
  return options.find((option) => option.stepKey === key)?.name ?? "Unknown";
}

function getChoiceRarity(options: SelectedOption[], key: string) {
  return options.find((option) => option.stepKey === key)?.rarity ?? "Common";
}

function cleanGeneratedText(text: string) {
  return text
    .replace(/^["“”]+|["“”]+$/g, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as RequestBody;

    const ai = new GoogleGenAI({
      apiKey,
    });

    const universe = getChoice(body.selectedOptions, "universe");
    const origin = getChoice(body.selectedOptions, "origin");
    const faction = getChoice(body.selectedOptions, "faction");
    const species = getChoice(body.selectedOptions, "species");
    const role = getChoice(body.selectedOptions, "role");
    const powerSource = getChoice(body.selectedOptions, "powerSource");
    const ability = getChoice(body.selectedOptions, "ability");
    const weapon = getChoice(body.selectedOptions, "weapon");
    const fightingStyle = getChoice(body.selectedOptions, "fightingStyle");
    const mentor = getChoice(body.selectedOptions, "mentor");
    const rival = getChoice(body.selectedOptions, "rival");
    const companion = getChoice(body.selectedOptions, "companion");
    const relic = getChoice(body.selectedOptions, "relic");
    const ambition = getChoice(body.selectedOptions, "ambition");

    const rarestChoices = body.selectedOptions
      .filter(
        (option) =>
          option.rarity === "Legendary" || option.rarity === "Epic"
      )
      .map(
        (option) =>
          `${option.stepTitle}: ${option.name} (${option.rarity})`
      )
      .join("\n");

    const allChoices = body.selectedOptions
      .map(
        (option) =>
          `- ${option.stepTitle}: ${option.name} (${option.rarity})`
      )
      .join("\n");

    const prompt = `
You are writing the final destiny text for an anime character generator called Anime Forge.

Write one cinematic anime-style destiny result for the character below.

STRICT OUTPUT RULES:
- Write in English.
- Write exactly 3 paragraphs.
- Total length: 170 to 230 words.
- Do not use bullet points.
- Do not use markdown.
- Do not use headings.
- Do not mention "AI", "generator", "selected options", or "rarity score".
- Do not simply list the choices.
- Do not sound childish or comedic.
- Do not overuse generic phrases like "your name will be remembered", "the world will never forget", or "destiny awaits".
- Use second person perspective: "You were born...", "You carry...", "Your fate..."
- The final sentence must feel powerful and conclusive.

STYLE:
- Epic, emotional, mysterious, serious.
- Similar feeling to a dramatic anime narration before a final arc.
- Use vivid but controlled language.
- Make the character feel unique based on their choices.
- Mention strength naturally through the final rarity.
- The strength level must influence the scale of the fate.

STRENGTH INTERPRETATION:
Final Rarity: ${body.finalRarity}
Meaning: ${strengthGuide[body.finalRarity]}

CHARACTER CORE:
Name: ${body.playerName}
Title: ${body.characterTitle}
Universe: ${universe}
Origin: ${origin}
Species: ${species}
Role: ${role}
Faction: ${faction}

POWER AND COMBAT:
Power Source: ${powerSource} (${getChoiceRarity(body.selectedOptions, "powerSource")})
Main Ability: ${ability} (${getChoiceRarity(body.selectedOptions, "ability")})
Weapon: ${weapon} (${getChoiceRarity(body.selectedOptions, "weapon")})
Fighting Style: ${fightingStyle} (${getChoiceRarity(body.selectedOptions, "fightingStyle")})

STORY FORCES:
Mentor: ${mentor}
Rival: ${rival}
Companion: ${companion}
Relic: ${relic}
Ambition: ${ambition}

MOST IMPORTANT HIGH-RARITY ELEMENTS:
${rarestChoices || "None"}

ALL CHARACTER CHOICES:
${allChoices}

PARAGRAPH STRUCTURE:
Paragraph 1: Describe the character's origin, identity, and what kind of presence they have in their universe.
Paragraph 2: Describe their power, fighting style, weapon, relic, mentor, rival, and companion as part of their journey.
Paragraph 3: Describe their ambition and final fate. The ending must scale with their final rarity.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      return Response.json(
        { error: "No destiny text generated" },
        { status: 500 }
      );
    }

    return Response.json({
      destinyText: cleanGeneratedText(rawText),
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to generate destiny text" },
      { status: 500 }
    );
  }
}