"use client";

import { useSearchParams } from "next/navigation";

import { useGame } from "@/hooks/useGame";

import { GameBackground } from "@/components/game/GameBackground";
import { GameHeader } from "@/components/game/GameHeader";
import { StepTitle } from "@/components/game/StepTitle";
import { UniverseCard } from "@/components/game/UniverseCard";

import { GameButton } from "@/components/ui/GameButton";

function RerollIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mr-2 h-4 w-4 text-purple-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10" />
      <path d="M20.5 15a9 9 0 0 1-14.9 3.4L1 14" />
    </svg>
  );
}

function getStepSubject(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("universe")) return "universe";
  if (lower.includes("origin")) return "origin";
  if (lower.includes("faction")) return "faction";

  return "card";
}

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
  const subject = getStepSubject(currentStep.title);

  return (
    <GameBackground>
      <div className="mx-auto flex min-h-screen max-w-[980px] flex-col items-center px-4 py-5">
        <GameHeader
          playerName={playerName}
          currentStep={stepIndex + 1}
          totalSteps={totalSteps}
        />

        <StepTitle title={currentStep.title} />

        <div className="mt-6 grid w-full max-w-[760px] items-start gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col items-center">
            <UniverseCard
              {...left}
              selected={selected === left.name}
              onSelect={() => lockOption(left)}
            />

            <GameButton
              variant="secondary"
              className="mt-4 min-w-[170px]"
              onClick={() => reroll("left")}
              disabled={rerollsLeft === 0}
            >
              <RerollIcon />
              Reroll ({rerollsLeft})
            </GameButton>
          </div>

          <div className="flex h-full items-center justify-center pt-28">
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-purple-500/30 blur-xl" />
              <h2 className="relative font-serif text-5xl font-black uppercase text-white drop-shadow-[0_0_18px_rgba(168,85,247,1)]">
                VS
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <UniverseCard
              {...right}
              selected={selected === right.name}
              onSelect={() => lockOption(right)}
            />

            <GameButton
              variant="secondary"
              className="mt-4 min-w-[170px]"
              onClick={() => reroll("right")}
              disabled={rerollsLeft === 0}
            >
              <RerollIcon />
              Reroll ({rerollsLeft})
            </GameButton>
          </div>
        </div>

        <div className="mt-7 flex flex-col items-center text-center">
          <p className="mb-4 text-sm text-white/75">
            {selected
              ? `Selected: ${selected}`
              : `Choose one ${subject} to continue`}
          </p>

          <GameButton
            variant="continue"
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