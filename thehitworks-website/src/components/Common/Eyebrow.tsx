import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  light?: boolean;
}

export default function Eyebrow({
  children,
  light = false,
}: EyebrowProps) {
  return (
    <div
      className={`font-pixel text-10px tracking-widest inline-flex items-center gap-2 ${
        light ? "text-gold" : "text-royal"
      }`}
    >
      <span>◆</span>

      <span>{children}</span>

      <span>◆</span>
    </div>
  );
}