type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}