import { ProgressBar } from "./ProgressBar";
import { Panel } from "@/components/ui/Panel";

type Props = {
  playerName: string;
  currentStep: number;
  totalSteps: number;
};

export function GameHeader({ playerName, currentStep, totalSteps }: Props) {
  return (
    <Panel className="mx-auto max-w-4xl p-6">
      <p className="text-center text-sm font-black uppercase tracking-[0.5em] text-purple-300">
        Anime Forge
      </p>

      <h2 className="mt-2 text-center text-2xl font-black uppercase tracking-widest text-white">
        Build Your Destiny
      </h2>

      <p className="mt-3 text-center text-sm font-bold uppercase tracking-widest text-white/70">
        {playerName.toUpperCase()} • STEP {currentStep} OF {totalSteps}
      </p>

      <ProgressBar current={currentStep} total={totalSteps} />
    </Panel>
  );
}