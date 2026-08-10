import type { ReactNode} from "react";
import type { LucideIcon } from "lucide-react";
interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "royal" | "gold" | "ghost" | "ghostMilk";
  size?: "md" | "lg";
  type?: "button" | "submit" | "reset";
  icon?: LucideIcon;
  disabled?: boolean;
}

export default function PixelButton({
  children,
  onClick,
  variant = "royal",
  size = "md",
  type = "button",
  icon: Icon,
}: PixelButtonProps) {
  const palette = {
    royal: "bg-royal text-milk border-ink",
    gold: "bg-gold text-ink border-ink",
    ghost: "bg-transparent text-ink border-ink",
    ghostMilk: "bg-transparent text-milk border-milk",
  };

  const sizes =
    size === "lg"
      ? "px-6 py-4 text-sm"
      : "px-5 py-3 text-xs";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-pixel font-pixel ${sizes} ${palette[variant]} inline-flex items-center justify-center gap-2 text-center whitespace-normal max-w-full`}
    >
      <span className="break-words">{children}</span>
      {Icon && <Icon size={16} className="shrink-0" />}
    </button>
  );
}