export default function StatBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 font-term">
        <span className="text-ink">{label}</span>
        <span className="text-royal">{pct}%</span>
      </div>
      <div className="h-3 w-full bg-milk-deep border-2 border-ink pixel-corners-sm overflow-hidden">
        <div className="h-full bg-royal" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
