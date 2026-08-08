import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  tone?: "royal" | "ink" | "gold";
}

export default function Chip({
  children,
  tone = "royal",
}: ChipProps) {
  const tones = {
    royal: "border-royal text-royal bg-paper",
    ink: "border-ink text-ink bg-milk-deep",
    gold: "border-ink text-ink bg-gold",
  };

  return (
    <span
      className={`pixel-corners-sm border-2 px-3 py-1 text-sm font-term inline-block ${tones[tone]}`}
    >
      {children}
    </span>
  );
}