import type { ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  gold?: boolean;
  className?: string;
}

export default function PixelCard({
  children,
  gold = false,
  className = "",
}: PixelCardProps) {
  return (
    <div
      className={`bg-paper ${
        gold ? "card-pixel-gold" : "card-pixel"
      } pixel-corners p-6 ${className}`}
    >
      {children}
    </div>
  );
}