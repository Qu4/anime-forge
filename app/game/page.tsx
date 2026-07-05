"use client";

import { useSearchParams } from "next/navigation";

import { useGame } from "@/hooks/useGame";

import { GameBackground } from "@/components/game/GameBackground";
import { GameHeader } from "@/components/game/GameHeader";
import { StepTitle } from "@/components/game/StepTitle";
import { UniverseCard } from "@/components/game/UniverseCard";

import { GameButton } from "@/components/ui/GameButton";

export default function GamePage() {
  const searchParams = useSearchParams();
  const playerName = searchParams.get("name") || "ACE";

  const {
    stepIndex,
    totalSteps,
    currentStep,
    options,
    selected,
    rerollsLeft,
    lockOption,
    reroll,
    nextStep,
  } = useGame();

  if (!options) {
    return (
      <GameBackground>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl text-white">Rolling...</p>
        </div>
      </GameBackground>
    );
  }

  const left = options[0];
  const right = options[1];

  return (
    <GameBackground>
      <div className="mx-auto max-w-7xl">

        <GameHeader
          playerName={playerName}
          currentStep={stepIndex + 1}
          totalSteps={totalSteps}
        />

        <StepTitle title={currentStep.title} />

        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] items-start">

          <div>
            <UniverseCard
              {...left}
              selected={selected === left.name}
              onSelect={() => lockOption(left)}
            />

            <GameButton
              className="mx-auto mt-5 block"
              onClick={() => reroll("left")}
              disabled={rerollsLeft === 0}
            >
              🔄 Reroll ({rerollsLeft})
            </GameButton>
          </div>

          <div className="flex items-center justify-center pt-40">
            <h2 className="text-5xl font-black text-purple-300">VS</h2>
          </div>

          <div>
            <UniverseCard
              {...right}
              selected={selected === right.name}
              onSelect={() => lockOption(right)}
            />

            <GameButton
              className="mx-auto mt-5 block"
              onClick={() => reroll("right")}
              disabled={rerollsLeft === 0}
            >
              🔄 Reroll ({rerollsLeft})
            </GameButton>
          </div>

        </div>

        <div className="mt-10 text-center">
          <p className="mb-6 text-white/70">
            {selected
              ? `Locked: ${selected}`
              : "Choose one card to continue"}
          </p>

          <GameButton
            onClick={nextStep}
            disabled={!selected}
          >
            Continue
          </GameButton>
        </div>

      </div>
    </GameBackground>
  );
}