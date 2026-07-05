type Props = {
  children: React.ReactNode;
};

export function GameBackground({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090511] p-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.25),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.25),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative z-10">{children}</div>
    </main>
  );
}