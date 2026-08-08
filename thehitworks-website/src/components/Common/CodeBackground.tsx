const SYMBOLS = [
  "{ }",
  "</>",
  "01",
  "( )",
  "=>",
  "const",
  "[ ]",
  "!=",
  "fn()",
  "AI",
  "10",
  "&&",
  "||",
  "npm",
  "git",
  "API",
  "CSS",
  "JS",
  "TS",
  "C++",
  "Python",
  "React",
  "Django",
  "Node",
  "AWS",
  "Docker",
  "K8s",
  "SQL",
  "JSON",
  "HTTP",
  "GET",
  "POST",
  "404",
  "200",
  "sudo",
  "root",
  "true",
  "false",
  "null",
  "async",
  "await",
  "AI",
  "</>",
  "{...}",
  "++",
  "--",
];

const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  symbol: SYMBOLS[i % SYMBOLS.length],

  // Spread across entire width
  left: (i * 19.37) % 100,

  // Spread starting positions across entire screen
  top: (i * 17.81) % 100,

  // Slower movement
  duration: 18 + (i % 7) * 2,

  // Stagger animation
  delay: -(i * 1.8),

  // Different sizes
  size: 12 + (i % 5) * 2,

  // Slightly different opacity
  opacity: 0.22 + (i % 4) * 0.06,
}));

export default function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="drift-particle absolute font-term text-gold select-none whitespace-nowrap"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}