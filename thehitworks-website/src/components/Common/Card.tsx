export default function PixelCard({ children, gold, className = "" }: { children: React.ReactNode; gold?: boolean; className?: string }) {
  return (
    <div className={`bg-paper ${gold ? "card-pixel-gold" : "card-pixel"} pixel-corners p-6 ${className}`}>
      {children}
    </div>
  );
}