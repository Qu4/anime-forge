"use client";

import { useEffect, useState } from "react";
import { steps } from "@/data/steps";
import { getTwoRandomItems } from "@/lib/random";
import type { GameAnswers, GameOption } from "@/types/game";

export function useGame() {
  const [stepIndex, setStepIndex] = useState(0);
  const [options, setOptions] = useState<[GameOption, GameOption] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<GameAnswers>({});
  const [rerollsLeft, setRerollsLeft] = useState(1);

  const currentStep = steps[stepIndex];

  useEffect(() => {
    setOptions(getTwoRandomItems(currentStep.options));
    setSelected(null);
    setRerollsLeft(1);
  }, [stepIndex, currentStep.options]);

  function lockOption(option: GameOption) {
    setSelected(option.name);
    setAnswers((oldAnswers) => ({
      ...oldAnswers,
      [currentStep.key]: option.name,
    }));
  }

  function reroll(side: "left" | "right") {
    if (rerollsLeft === 0 || !options) return;

    const oldOption = side === "left" ? options[0] : options[1];
    const otherOption = side === "left" ? options[1] : options[0];

    const possibleReplacements = currentStep.options.filter(
      (option) =>
        option.name !== oldOption.name &&
        option.name !== otherOption.name
    );

    if (possibleReplacements.length === 0) return;

    const randomReplacement =
      possibleReplacements[
        Math.floor(Math.random() * possibleReplacements.length)
      ];

    setOptions(
      side === "left"
        ? [randomReplacement, options[1]]
        : [options[0], randomReplacement]
    );

    setSelected(null);
    setRerollsLeft(0);
  }

  function nextStep() {
    if (!selected) return;

    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => current + 1);
    } else {
      alert("Result screen coming next.");
      console.log(answers);
    }
  }

  return {
    stepIndex,
    totalSteps: steps.length,
    currentStep,
    options,
    selected,
    rerollsLeft,
    lockOption,
    reroll,
    nextStep,
  };
}