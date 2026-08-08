interface StatBarProps {
  label: string;
  pct: number;
}

export default function StatBar({
  label,
  pct,
}: StatBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-term text-lg text-ink">
          {label}
        </span>

        <span className="font-term text-lg text-royal">
          {pct}%
        </span>
      </div>

      <div className="h-3 bg-milk-deep border-2 border-ink">
        <div
          className="h-full bg-royal"
          style={{
            width: `${Math.min(100, Math.max(0, pct))}%`,
          }}
        />
      </div>
    </div>
  );
}