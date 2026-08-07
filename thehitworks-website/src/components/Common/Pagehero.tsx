import PixelStars from "./PixelStars";
import Eyebrow from "./Eyebrow";

export default function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-royal-deep relative overflow-hidden">
      <PixelStars />
      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-24 text-center">
        <div className="mb-5"><Eyebrow light>{eyebrow}</Eyebrow></div>
        <h1 className="font-pixel text-xl sm:text-3xl md:text-4xl text-milk leading-relaxed">{title}</h1>
        {sub ? <p className="mt-5 text-xl text-milk-70 max-w-2xl mx-auto">{sub}</p> : null}
      </div>
    </section>
  );
}
