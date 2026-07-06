type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const progress = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="mx-auto mt-5 h-[10px] w-full max-w-[440px] rounded-full border border-purple-200/20 bg-black/35 p-[2px]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-violet-500 shadow-[0_0_14px_rgba(217,70,239,0.75)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}