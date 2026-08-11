import { useState } from "react";
import PageHero from "../Common/Pagehero";
import PixelCard from "../Common/Pixelcard";
import Chip from "../Common/Chip";
import PixelStars from "../Common/PixelStars";
import { Filter } from "lucide-react";
import { PROJECTS } from "../../data/content";
import CtaBand from "../CTA/CTA";

const PORTFOLIO_FILTERS = [
  "All",
  "Web",
  "Mobile",
  "AI / ML",
  "Education",
  "AI Social Platform",
];
export default function PortfolioPage({ navigate }: { navigate: (to: string) => void }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  return (
    <div>
      <PageHero eyebrow="Selected work" title="PORTFOLIO" sub="A sample of what we've shipped across AI, web, mobile, and automation." />
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-pixel text-10px px-4 py-3 border-2 border-ink pixel-corners-sm inline-flex items-center gap-2 ${filter === f ? "bg-royal text-milk" : "bg-paper text-ink"}`}
              >
                {f === "All" ? <Filter size={12} /> : null}{f}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PixelCard key={p.name} className="flex flex-col">
                <div className="h-28 mb-4 bg-royal-deep border-2 border-ink flex items-center justify-center relative overflow-hidden">
                  <PixelStars />
                  <span className="font-pixel text-milk text-sm relative">{p.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-term text-2xl text-ink">{p.name}</h3>
                  <Chip>{p.category}</Chip>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((t) => <span key={t} className="text-sm font-term text-ink-70 bg-milk-deep px-2 py-1">{t}</span>)}
                </div>
                <p className="text-ink-70 text-lg mb-3">{p.solution}</p>
                <p className="text-royal text-lg font-bold mt-auto">{p.result}</p>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>
      <CtaBand navigate={navigate} />
    </div>
  );
}