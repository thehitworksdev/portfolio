export default function PixelButton({ children, onClick, variant = "royal", size = "md", type = "button", icon: Icon }: { children: React.ReactNode; onClick?: () => void; variant?: "royal" | "gold" | "ghost" | "ghostMilk"; size?: "md" | "lg"; type?: "button" | "submit" | "reset"; icon?: React.ComponentType<{ size?: number }> }) {
  const palette = {
    royal: "bg-royal text-milk border-ink",
    gold: "bg-gold text-ink border-ink",
    ghost: "bg-transparent text-ink border-ink",
    ghostMilk: "bg-transparent text-milk border-milk",
  };
  const sizes = size === "lg" ? "px-6 py-4 text-sm" : "px-5 py-3 text-xs";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-pixel font-pixel ${sizes} ${palette[variant]} inline-flex items-center justify-center gap-2 whitespace-nowrap`}
    >
      {children}
      {Icon ? <Icon size={14} /> : null}
    </button>
  );
}