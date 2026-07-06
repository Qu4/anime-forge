type Props = {
  title: string;
};

function getDisplayTitle(title: string) {
  if (title.startsWith("Choose")) return title;
  if (title.startsWith("Your")) return `Choose ${title}`;
  return title;
}

function getSubtitle(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("universe")) return "Every legend begins somewhere";
  if (lower.includes("origin")) return "Your story starts here";
  if (lower.includes("faction")) return "Choose who stands beside you";

  return "Forge your destiny";
}

export function StepTitle({ title }: Props) {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-black uppercase tracking-[0.32em] text-white drop-shadow-[0_0_16px_rgba(216,180,254,0.35)] md:text-3xl">
        {getDisplayTitle(title)}
      </h1>

      <p className="mt-3 text-sm tracking-[0.08em] text-purple-200/80">
        {getSubtitle(title)}
      </p>
    </div>
  );
}