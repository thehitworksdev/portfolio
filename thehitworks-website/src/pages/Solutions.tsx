import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import PixelCard from "../components/Common/Pixelcard";
import Chip from "../components/Common/Chip";
import { INDUSTRIES } from "../data/content";
import CtaBand from "../components/CTA/CTA";

export default function Solutions() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHero eyebrow="Industry playbooks" title="SOLUTIONS BY INDUSTRY" sub="Different businesses, similar pattern: too much manual work standing between good data and good decisions." />
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {INDUSTRIES.map((ind) => (
            <PixelCard key={ind.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center">
                  <ind.icon className="text-milk" size={20} />
                </div>
                <h3 className="font-term text-2xl text-ink">{ind.title}</h3>
              </div>
              <div className="font-pixel text-10px text-royal mb-2">COMMON PROBLEMS</div>
              <ul className="flex flex-col gap-1 mb-4">
                {ind.problems.map((p) => <li key={p} className="text-ink-70 text-lg"> {p}</li>)}
              </ul>
              <div className="font-pixel text-10px text-royal mb-2">OUR SOLUTION</div>
              <p className="text-ink-70 text-lg mb-4">{ind.solution}</p>
              <div className="flex flex-wrap gap-2">
                {ind.benefits.map((b) => <Chip key={b} tone="ink">{b}</Chip>)}
              </div>
            </PixelCard>
          ))}
        </div>
      </section>
      <CtaBand navigate={navigate} />
    </div>
  );
}