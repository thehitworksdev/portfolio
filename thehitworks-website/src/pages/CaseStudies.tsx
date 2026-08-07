import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import Chip from "../components/Common/Chip";
import { ChevronRight, Quote } from "lucide-react";
import { PROJECTS, TESTIMONIALS } from "../data/content";
import CtaBand from "../components/CTA/CTA";

const CASE_STUDY_FLOW = ["Problem", "Requirements", "Research", "Design", "Development", "Deployment", "Results"];

export default function CaseStudies() {
  const navigate = useNavigate();
  const studies = PROJECTS.slice(0, 3);
  return (
    <div>
      <PageHero eyebrow="Proof, not promises" title="CASE STUDIES" sub="The full path from problem to measurable result, for a few projects we're proud of." />
      <section className="bg-milk py-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
          {studies.map((p, idx) => (
            <div key={p.name}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <h3 className="font-pixel text-lg text-ink">{p.name}</h3>
                <Chip>{p.category}</Chip>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {CASE_STUDY_FLOW.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="font-term text-lg bg-milk-deep border-2 border-ink px-3 py-1">{step}</span>
                    {i < CASE_STUDY_FLOW.length - 1 ? <ChevronRight size={14} className="text-ink-70" /> : null}
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-4">
                  <p className="text-ink-70 text-lg"><span className="text-ink font-bold">Problem — </span>{p.problem}</p>
                  <p className="text-ink-70 text-lg"><span className="text-ink font-bold">Solution — </span>{p.solution}</p>
                  <div className="bg-royal-deep text-milk p-5 pixel-corners-sm">
                    <Quote size={18} className="text-gold mb-2" />
                    <p className="text-lg">{TESTIMONIALS[idx % TESTIMONIALS.length].quote}</p>
                    <p className="text-sm text-milk-70 mt-3">— {TESTIMONIALS[idx % TESTIMONIALS.length].name}, {TESTIMONIALS[idx % TESTIMONIALS.length].role}</p>
                  </div>
                </div>
                <div className="bg-gold border-2 border-ink pixel-corners-sm p-8 text-center">
                  <div className="font-pixel text-lg text-ink mb-2">RESULT</div>
                  <p className="font-term text-2xl text-ink">{p.result}</p>
                </div>
              </div>
              {idx < studies.length - 1 ? <div className="dash-path mt-16" /> : null}
            </div>
          ))}
        </div>
      </section>
      <CtaBand navigate={navigate} />
    </div>
  );
}