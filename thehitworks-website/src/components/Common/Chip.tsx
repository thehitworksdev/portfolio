export default function Chip({ children, tone = "royal" }: { children: React.ReactNode; tone?: "royal" | "ink" | "gold" }) {
  const tones = {
    royal: "border-royal text-royal bg-paper",
    ink: "border-ink text-ink bg-milk-deep",
    gold: "border-ink text-ink bg-gold",
  };
  return (
    <span className={`pixel-corners-sm border-2 px-3 py-1 text-sm font-term inline-block ${tones[tone]}`}>
      {children}
    </span>
  );
}