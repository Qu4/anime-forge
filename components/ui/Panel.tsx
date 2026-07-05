type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-[2rem] border border-purple-400/25 bg-white/[0.06] shadow-2xl shadow-purple-950/50 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}