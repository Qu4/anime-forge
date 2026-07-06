"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import { GameBackground } from "@/components/game/GameBackground";
import { GameButton } from "@/components/ui/GameButton";
import { steps } from "@/data/steps";
import type { GameAnswers, GameOption, Rarity } from "@/types/game";

type SavedResult = {
  playerName: string;
  answers: GameAnswers;
};

type SelectedOption = GameOption & {
  stepKey: string;
  stepTitle: string;
};

const panelClip =
  "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)";

const smallPanelClip =
  "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)";

const rarityScores: Record<Rarity, number> = {
  Common: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
};

const rarityLabels: Record<number, Rarity> = {
  1: "Common",
  2: "Rare",
  3: "Epic",
  4: "Legendary",
};

const rarityStyles: Record<
  Rarity,
  {
    text: string;
    glow: string;
    border: string;
    borderBg: string;
    bg: string;
  }
> = {
  Common: {
    text: "text-zinc-300",
    glow: "drop-shadow-[0_0_18px_rgba(161,161,170,0.55)]",
    border: "border-zinc-300/35",
    borderBg: "bg-zinc-300/35",
    bg: "from-zinc-500/12 via-zinc-300/6 to-zinc-500/12",
  },
  Rare: {
    text: "text-blue-200",
    glow: "drop-shadow-[0_0_20px_rgba(96,165,250,0.7)]",
    border: "border-blue-300/45",
    borderBg: "bg-blue-300/45",
    bg: "from-blue-500/14 via-blue-300/7 to-blue-500/14",
  },
  Epic: {
    text: "text-purple-200",
    glow: "drop-shadow-[0_0_24px_rgba(168,85,247,0.8)]",
    border: "border-purple-300/50",
    borderBg: "bg-purple-300/50",
    bg: "from-purple-500/18 via-fuchsia-300/8 to-purple-500/18",
  },
  Legendary: {
    text: "text-yellow-200",
    glow: "drop-shadow-[0_0_28px_rgba(250,204,21,0.85)]",
    border: "border-yellow-200/55",
    borderBg: "bg-yellow-200/55",
    bg: "from-yellow-400/16 via-purple-300/8 to-yellow-400/16",
  },
};

const groups = [
  {
    title: "Identity",
    subtitle: "Who you are",
    keys: ["universe", "origin", "species", "role"],
  },
  {
    title: "Combat",
    subtitle: "How you fight",
    keys: ["powerSource", "ability", "weapon", "fightingStyle"],
  },
  {
    title: "Bonds",
    subtitle: "Who shapes your path",
    keys: ["faction", "mentor", "rival", "companion"],
  },
  {
    title: "Legacy",
    subtitle: "What remains after you",
    keys: ["relic", "ambition"],
  },
];

type AngledPanelProps = {
  children: ReactNode;
  clipPath: string;
  className?: string;
  innerClassName?: string;
  borderClassName?: string;
};

function AngledPanel({
  children,
  clipPath,
  className = "",
  innerClassName = "",
  borderClassName = "bg-purple-200/30",
}: AngledPanelProps) {
  return (
    <div
      className={`relative p-[1px] ${borderClassName} ${className}`}
      style={{ clipPath }}
    >
      <div className={`relative h-full ${innerClassName}`} style={{ clipPath }}>
        {children}
      </div>
    </div>
  );
}

function findOption(stepKey: string, answerName: string): GameOption | null {
  const step = steps.find((item) => item.key === stepKey);
  if (!step) return null;

  return step.options.find((option) => option.name === answerName) ?? null;
}

function cleanStepTitle(title: string) {
  return title.replace("Your ", "");
}

function getAverageRarity(options: GameOption[]): Rarity {
  if (options.length === 0) return "Common";

  const total = options.reduce(
    (sum, option) => sum + rarityScores[option.rarity],
    0
  );

  const average = Math.round(total / options.length);

  return rarityLabels[average] ?? "Common";
}

function getCharacterTitle(options: SelectedOption[]) {
  const byKey = Object.fromEntries(
    options.map((option) => [option.stepKey, option.name])
  );

  const role = byKey.role ?? "Hero";
  const ability = byKey.ability ?? "Unknown Power";
  const ambition = byKey.ambition ?? "Hidden Dream";

  if (ambition === "Surpass the Gods") return "The Godbreaker";
  if (ambition === "Free the World") return "The Liberator";
  if (ability === "World Breaker") return "The World Breaker";
  if (ability === "Time Fracture") return "The Fractured Legend";
  if (role === "Chosen Hero") return "The Chosen Legend";
  if (role === "Shadow Assassin") return "The Violet Shadow";

  return "The Rising Legend";
}

function getDestinyText(options: SelectedOption[], finalRarity: Rarity) {
  const byKey = Object.fromEntries(
    options.map((option) => [option.stepKey, option.name])
  );

  const universe = byKey.universe ?? "your world";
  const ambition = byKey.ambition ?? "your dream";
  const rival = byKey.rival ?? "your greatest enemy";

  if (finalRarity === "Legendary") {
    return `Born into ${universe}, you are destined to reshape the balance of power itself. Your ambition, "${ambition}", will drive you beyond every limit — even ${rival} may become only a footnote in your legend.`;
  }

  if (finalRarity === "Epic") {
    return `Your path through ${universe} burns with rare potential. You are not yet a myth, but your ambition, "${ambition}", will force the world to remember your name.`;
  }

  if (finalRarity === "Rare") {
    return `Your journey begins with hidden strength. In ${universe}, your ambition, "${ambition}", may become the spark that turns an ordinary fighter into something far greater.`;
  }

  return `Your story starts quietly in ${universe}. But even a quiet soul can rise when "${ambition}" becomes the reason to keep moving forward.`;
}

function getGroupedOptions(options: SelectedOption[], keys: string[]) {
  return keys
    .map((key) => options.find((option) => option.stepKey === key))
    .filter(Boolean) as SelectedOption[];
}

type ShareModalProps = {
  playerName: string;
  characterTitle: string;
  finalRarity: Rarity;
  destinyText: string;
  selectedOptions: SelectedOption[];
  onClose: () => void;
};

function ShareModal({
  playerName,
  characterTitle,
  finalRarity,
  destinyText,
  selectedOptions,
  onClose,
}: ShareModalProps) {
  const rarityStyle = rarityStyles[finalRarity];

  const shareUrl =
    typeof window === "undefined" ? "" : window.location.href;

  const shareText = `${playerName} forged ${characterTitle} — ${finalRarity} rarity in Anime Forge.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const highlightOptions = selectedOptions.slice(0, 6);

  async function handleNativeShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Anime Forge Result",
          text: shareText,
          url: shareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("Result copied to clipboard.");
    } catch {
      // User cancelled sharing.
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    alert("Result copied to clipboard.");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-8">
      <button
        className="absolute inset-0"
        aria-label="Close share popup"
        onClick={onClose}
      />

      <AngledPanel
        clipPath={panelClip}
        borderClassName={rarityStyle.borderBg}
        className="relative z-10 w-full max-w-[760px] shadow-[0_0_70px_rgba(168,85,247,0.35)]"
        innerClassName="max-h-[88vh] overflow-y-auto bg-[#080414]/95 p-6 text-center"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-4 z-20 text-2xl leading-none text-white/60 transition hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-xs font-black uppercase tracking-[0.36em] text-purple-200">
          Share Your Result
        </p>

        <div className="mx-auto mt-5 max-w-[430px] border border-purple-200/25 bg-black/50 p-6 shadow-[0_0_38px_rgba(168,85,247,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-purple-200/80">
            Anime Forge
          </p>

          <h2 className="mt-3 font-serif text-4xl font-black uppercase tracking-[0.08em] text-white drop-shadow-[0_0_20px_rgba(216,180,254,0.6)]">
            {playerName}
          </h2>

          <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/75">
            {characterTitle}
          </p>

          <div className="my-5 h-px bg-purple-200/25" />

          <p
            className={`font-serif text-3xl font-black uppercase tracking-[0.08em] ${rarityStyle.text} ${rarityStyle.glow}`}
          >
            {finalRarity}
          </p>

          <p className="mx-auto mt-5 max-w-[340px] text-sm leading-6 text-white/72">
            {destinyText}
          </p>

          <div className="mt-6 grid gap-2 text-left sm:grid-cols-2">
            {highlightOptions.map((option) => {
              const optionStyle = rarityStyles[option.rarity];

              return (
                <div
                  key={`${option.stepKey}-${option.name}`}
                  className={`border ${optionStyle.border} bg-black/45 px-3 py-2`}
                >
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.18em] text-purple-200/65">
                    {option.stepTitle}
                  </p>

                  <p className="mt-1 text-xs font-black uppercase tracking-[0.06em] text-white">
                    {option.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-[560px] gap-3 sm:grid-cols-2">
          <button
            onClick={handleNativeShare}
            className="border border-purple-200/30 bg-purple-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-purple-500/25"
          >
            Native Share
          </button>

          <button
            onClick={handleCopy}
            className="border border-purple-200/30 bg-purple-500/15 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-purple-500/25"
          >
            Copy Link
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="border border-purple-200/25 bg-black/40 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/85 transition hover:border-purple-200/50 hover:text-white"
          >
            X / Twitter
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="border border-purple-200/25 bg-black/40 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/85 transition hover:border-purple-200/50 hover:text-white"
          >
            Facebook
          </a>

          <a
            href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="border border-purple-200/25 bg-black/40 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/85 transition hover:border-purple-200/50 hover:text-white"
          >
            WhatsApp
          </a>

          <a
            href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noreferrer"
            className="border border-purple-200/25 bg-black/40 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/85 transition hover:border-purple-200/50 hover:text-white"
          >
            Telegram
          </a>

          <a
            href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`}
            target="_blank"
            rel="noreferrer"
            className="border border-purple-200/25 bg-black/40 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-white/85 transition hover:border-purple-200/50 hover:text-white sm:col-span-2"
          >
            Reddit
          </a>
        </div>
      </AngledPanel>
    </div>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<SavedResult | null>(null);
  const [aiDestinyText, setAiDestinyText] = useState<string | null>(null);
  const [isGeneratingDestiny, setIsGeneratingDestiny] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("anime-forge-result");

    if (!saved) return;

    try {
      setResult(JSON.parse(saved));
    } catch {
      setResult(null);
    }
  }, []);

  const selectedOptions = useMemo(() => {
    if (!result) return [];

    return steps
      .map((step) => {
        const answer = result.answers[step.key];
        if (!answer) return null;

        const option = findOption(step.key, answer);
        if (!option) return null;

        return {
          stepKey: step.key,
          stepTitle: cleanStepTitle(step.title),
          ...option,
        };
      })
      .filter(Boolean) as SelectedOption[];
  }, [result]);

  const finalRarity = getAverageRarity(selectedOptions);
const characterTitle = getCharacterTitle(selectedOptions);
const destinyText = getDestinyText(selectedOptions, finalRarity);
const displayedDestinyText = aiDestinyText ?? destinyText;
const rarityStyle = rarityStyles[finalRarity];
  useEffect(() => {
    if (!result || selectedOptions.length === 0) return;

    let cancelled = false;

    async function generateDestiny() {
      try {
        setIsGeneratingDestiny(true);

        const response = await fetch("/api/generate-destiny", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playerName: result?.playerName,
            characterTitle,
            finalRarity,
            selectedOptions,
          }),
        });

        if (!response.ok) return;

        const data = (await response.json()) as {
          destinyText?: string;
        };

        if (!cancelled && data.destinyText) {
          setAiDestinyText(data.destinyText);
        }
      } finally {
        if (!cancelled) {
          setIsGeneratingDestiny(false);
        }
      }
    }

    generateDestiny();

    return () => {
      cancelled = true;
    };
  }, [result, selectedOptions, characterTitle, finalRarity]);

  if (!result) {
    return (
      <GameBackground variant="static">
        <div className="flex min-h-screen items-center justify-center text-center">
          <AngledPanel
            clipPath={panelClip}
            borderClassName="bg-purple-200/35"
            innerClassName="max-w-xl bg-black/55 p-8"
          >
            <h1 className="font-serif text-3xl font-black uppercase tracking-widest text-white">
              No Result Found
            </h1>

            <p className="mt-4 text-white/70">
              Start a new adventure to forge your anime character.
            </p>

            <Link href="/">
              <GameButton className="mt-8">Start Over</GameButton>
            </Link>
          </AngledPanel>
        </div>
      </GameBackground>
    );
  }

  return (
    <GameBackground variant="static">
      <div className="result-page mx-auto flex min-h-screen max-w-[1120px] flex-col items-center px-4 py-8">
        <section className="w-full text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.42em] text-purple-200">
            Anime Forge Result
          </p>

          <h1 className="mt-3 font-serif text-5xl font-black uppercase tracking-[0.08em] text-white drop-shadow-[0_0_24px_rgba(216,180,254,0.65)] md:text-6xl">
            {result.playerName}
          </h1>

          <p className="mt-3 text-base font-black uppercase tracking-[0.28em] text-white/80 md:text-lg">
            {characterTitle}
          </p>
        </section>

        <section className="mt-8 grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <AngledPanel
            clipPath={panelClip}
            borderClassName={rarityStyle.borderBg}
            className="shadow-[0_0_55px_rgba(168,85,247,0.2)]"
            innerClassName="overflow-hidden bg-[#080414]/62 p-8 text-center"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${rarityStyle.bg}`}
            />

            <p className="relative text-xs font-black uppercase tracking-[0.36em] text-purple-200">
              Final Rarity
            </p>

            <h2
              className={`relative mt-5 font-serif text-5xl font-black uppercase tracking-[0.08em] ${rarityStyle.text} ${rarityStyle.glow} md:text-6xl`}
            >
              {finalRarity}
            </h2>

            <div className="relative mx-auto mt-6 h-px w-36 bg-purple-200/40" />

            <p className="relative mt-6 text-sm leading-7 text-white/76">
              {displayedDestinyText}
            </p>

            {isGeneratingDestiny && (
              <p className="relative mt-4 text-xs font-black uppercase tracking-[0.22em] text-purple-200/70">
                Writing your fate...
              </p>
            )}
          </AngledPanel>

          <div className="grid gap-5">
            {groups.map((group) => {
              const groupOptions = getGroupedOptions(
                selectedOptions,
                group.keys
              );

              return (
                <AngledPanel
                  key={group.title}
                  clipPath={smallPanelClip}
                  borderClassName="bg-purple-200/25"
                  className="shadow-[0_0_28px_rgba(168,85,247,0.12)]"
                  innerClassName="overflow-hidden bg-black/38 p-5"
                >
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-black uppercase tracking-[0.08em] text-white">
                        {group.title}
                      </h3>

                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-purple-200/70">
                        {group.subtitle}
                      </p>
                    </div>

                    <div className="h-px flex-1 bg-purple-200/20" />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {groupOptions.map((option) => {
                      const optionStyle = rarityStyles[option.rarity];

                      return (
                        <div
                          key={`${option.stepKey}-${option.name}`}
                          className={`border ${optionStyle.border} bg-black/36 px-4 py-3`}
                        >
                          <p className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-purple-200/65">
                            {option.stepTitle}
                          </p>

                          <p className="mt-1 text-sm font-black uppercase tracking-[0.06em] text-white">
                            {option.name}
                          </p>

                          <p
                            className={`mt-2 text-[0.65rem] font-black uppercase tracking-[0.18em] ${optionStyle.text}`}
                          >
                            {option.rarity}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </AngledPanel>
              );
            })}
          </div>
        </section>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <GameButton
            variant="secondary"
            onClick={() => setIsShareOpen(true)}
          >
            Share
          </GameButton>

          <Link href="/">
            <GameButton variant="continue">Start Over</GameButton>
          </Link>
        </div>
      </div>

      {isShareOpen && (
        <ShareModal
          playerName={result.playerName}
          characterTitle={characterTitle}
          finalRarity={finalRarity}
          destinyText={displayedDestinyText}
          selectedOptions={selectedOptions}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </GameBackground>
  );
}