import { useEffect, useRef } from "react";

export default function CursorLight() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMove = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "260px",
        marginLeft: "-130px",
        marginTop: "-130px",
        borderRadius: "9999px",
        background:
          "radial-gradient(circle, rgba(255,178,64,0.35) 0%, rgba(255,140,0,0.12) 45%, rgba(255,140,0,0) 70%)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  );
}