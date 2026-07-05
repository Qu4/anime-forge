type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function GameButton({
  children,
  onClick,
  disabled = false,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl border border-pink-300/40 bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3 font-black uppercase tracking-widest text-white shadow-lg shadow-pink-600/30 transition hover:scale-105 hover:shadow-pink-500/50 disabled:cursor-not-allowed disabled:from-gray-700 disabled:to-gray-800 disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}