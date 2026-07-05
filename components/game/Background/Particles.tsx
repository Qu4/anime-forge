const particles = Array.from({ length: 28 });

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white/70 shadow-[0_0_12px_rgba(168,85,247,0.9)] animate-particle-float"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 53) % 100}%`,
            animationDelay: `${index * 0.4}s`,
            animationDuration: `${8 + (index % 7)}s`,
          }}
        />
      ))}
    </div>
  );
}