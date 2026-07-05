"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "@/data/steps";
import { getTwoRandomItems } from "@/lib/random";
import { UniverseCard } from "@/components/UniverseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { GameBackground } from "@/components/GameBackground";
import { Panel } from "@/components/ui/Panel";
import { GameButton } from "@/components/ui/GameButton";

type Option = {
    name: string;
    rarity: string;
};

export default function GamePage() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "ACE";

    const [stepIndex, setStepIndex] = useState(0);
    const [options, setOptions] = useState<[Option, Option] | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [rerollsLeft, setRerollsLeft] = useState(1);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const currentStep = steps[stepIndex];

    useEffect(() => {
        setOptions(getTwoRandomItems(currentStep.options));
        setSelected(null);
        setRerollsLeft(1);
    }, [stepIndex, currentStep.options]);

    function lockOption(optionName: string) {
        setSelected(optionName);
        setAnswers((oldAnswers) => ({
            ...oldAnswers,
            [currentStep.key]: optionName,
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
            setStepIndex(stepIndex + 1);
        } else {
            alert("Fertig! Ergebnis kommt als Nächstes.");
            console.log(answers);
        }
    }

    if (!options) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-purple-950 to-black text-white">
                <p>Rolling options...</p>
            </main>
        );
    }

    const leftOption = options[0];
    const rightOption = options[1];

    return (
        <GameBackground>
            <div className="mx-auto max-w-5xl">
                <div className="rounded-3xl border border-purple-500/30 bg-white/5 p-5 shadow-2xl backdrop-blur">
                    <Panel className="mx-auto max-w-4xl p-6">
                        <p className="text-center text-sm font-black uppercase tracking-[0.5em] text-purple-300">
                            Anime Forge
                        </p>

                        <h2 className="mt-2 text-center text-2xl font-black uppercase tracking-widest text-white">
                            Build Your Destiny
                        </h2>

                        <p className="mt-3 text-center text-sm font-bold uppercase tracking-widest text-white/70">
                            {name.toUpperCase()} • STEP {stepIndex + 1} OF {steps.length}
                        </p>

                        <ProgressBar current={stepIndex + 1} total={steps.length} />
                    </Panel>

                    <h1 className="mt-8 text-center text-4xl font-extrabold">
                        {currentStep.title}
                    </h1>
                </div>

                <h1 className="mt-8 text-center text-4xl font-extrabold">
                    {currentStep.title}
                </h1>

                <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-start">
                    <div className="w-full">
                        <UniverseCard
                            name={leftOption.name}
                            image={leftOption.image}
                            stars={leftOption.stars}
                            rarity={leftOption.rarity}
                            selected={selected === leftOption.name}
                            onSelect={() => lockOption(leftOption.name)}
                        />

                        <GameButton
                            onClick={() => reroll("left")}
                            disabled={rerollsLeft === 0}
                            className="mx-auto mt-4 block"
                        >
                            🔄 Reroll ({rerollsLeft})
                        </GameButton>
                    </div>

                    <div className="pt-16 text-center text-3xl font-black text-purple-300">
                        VS
                    </div>

                    <div className="w-full">
                        <UniverseCard
                            name={rightOption.name}
                            image={rightOption.image}
                            stars={rightOption.stars}
                            rarity={rightOption.rarity}
                            selected={selected === rightOption.name}
                            onSelect={() => lockOption(rightOption.name)}
                        />

                        <GameButton
                            onClick={() => reroll("right")}
                            disabled={rerollsLeft === 0}
                            className="mx-auto mt-4 block"
                        >
                            🔄 Reroll ({rerollsLeft})
                        </GameButton>
                    </div>
                </div>

                <p className="mt-10 text-center text-gray-300">
                    {selected ? `Locked: ${selected}` : "Tap an option to lock it in"}
                </p>

                <GameButton
                    onClick={nextStep}
                    disabled={!selected}
                    className="mx-auto mt-6 block"
                >
                    Continue
                </GameButton>
            </div>
        </GameBackground>
    );
}