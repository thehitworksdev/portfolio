export default function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`font-pixel text-10px tracking-widest inline-flex items-center gap-2 ${light ? "text-gold" : "text-royal"}`}>
      <span>◆</span>
      <span>{children}</span>
      <span>◆</span>
    </div>
  );
}