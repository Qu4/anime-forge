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

  if (lower.includes("universe")) {
    return "Every legend begins somewhere";
  }

  if (lower.includes("origin")) {
    return "Your story starts here";
  }

  if (lower.includes("faction")) {
    return "Choose who stands beside you";
  }

  if (lower.includes("species")) {
    return "Blood decides what the world sees first";
  }

  if (lower.includes("role")) {
    return "Every hero needs a place in the story";
  }

  if (lower.includes("power source")) {
    return "The force within you begins to awaken";
  }

  if (lower.includes("ability")) {
    return "Power takes shape in your hands";
  }

  if (lower.includes("weapon")) {
    return "A true weapon chooses its wielder";
  }

  if (lower.includes("fighting style")) {
    return "How you fight reveals who you are";
  }

  if (lower.includes("mentor")) {
    return "Even legends once needed guidance";
  }

  if (lower.includes("rival")) {
    return "The one who pushes you beyond your limits";
  }

  if (lower.includes("companion")) {
    return "No great journey is walked alone";
  }

  if (lower.includes("relic")) {
    return "Ancient power waits to be claimed";
  }

  if (lower.includes("ambition")) {
    return "The dream that keeps your fire alive";
  }

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