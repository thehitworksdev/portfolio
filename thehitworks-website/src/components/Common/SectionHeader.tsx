import Eyebrow from "./Eyebrow";

export default function SectionHeader({ eyebrow, title, sub, light, align = "center" }: { eyebrow?: string; title: string; sub?: string; light?: boolean; align?: "center" | "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow ? <div className="mb-4"><Eyebrow light={light}>{eyebrow}</Eyebrow></div> : null}
      <h2 className={`font-pixel text-xl sm:text-2xl md:text-3xl leading-relaxed ${light ? "text-milk" : "text-ink"}`}>
        {title}
      </h2>
      {sub ? <p className={`mt-4 text-lg sm:text-xl ${light ? "text-milk-70" : "text-ink-70"}`}>{sub}</p> : null}
    </div>
  );
}