import { useState } from "react";
import PageHero from "../Common/Pagehero";
import AccordionItem from "../Common/AccordionItem";
import { FAQS_FULL } from "../../data/content";

export default function FaqPage() {
  const categories = [...new Set(FAQS_FULL.map((f) => f.cat))];
  const [activeCat, setActiveCat] = useState("All");
  const [openIdx, setOpenIdx] = useState(0);
  const list = activeCat === "All" ? FAQS_FULL : FAQS_FULL.filter((f) => f.cat === activeCat);
  return (
    <div>
      <PageHero eyebrow="Good to know" title="FREQUENTLY ASKED QUESTIONS" sub="Pricing, timelines, ownership, and everything else that comes up before a project starts." />
      <section className="bg-milk py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {["All", ...categories].map((c) => (
              <button key={c} onClick={() => { setActiveCat(c); setOpenIdx(0); }} className={`font-pixel text-9px px-3 py-2 border-2 border-ink pixel-corners-sm ${activeCat === c ? "bg-royal text-milk" : "bg-paper text-ink"}`}>
                {c}
              </button>
            ))}
          </div>
          <div>
            {list.map((f, i) => (
              <AccordionItem key={f.q} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}