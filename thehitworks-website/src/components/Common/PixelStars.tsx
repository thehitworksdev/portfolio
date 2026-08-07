export default function PixelStars() {
  const stars = [
    [6, 12], [18, 30], [30, 8], [50, 22], [70, 10], [86, 26], [94, 14],
    [12, 55], [40, 70], [64, 60], [82, 72], [96, 50], [4, 80], [56, 88],
  ];
  return (
    <svg className="absolute inset-0 w-full h-full opacity-60" preserveAspectRatio="none">
      {stars.map(([x, y], i) => (
        <rect key={i} x={`${x}%`} y={`${y}%`} width="4" height="4" fill={i % 3 === 0 ? "#F5B301" : "#FBF9F1"} opacity={i % 2 ? 0.5 : 0.9} />
      ))}
    </svg>
  );
}