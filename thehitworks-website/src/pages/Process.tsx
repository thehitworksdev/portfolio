import PageHero from "../components/Common/Pagehero";
import { PROCESS_STEPS } from "../data/content";
import CtaBand from "../components/CTA/CTA";
import { useNavigate } from "react-router-dom";

export default function ProcessPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        eyebrow="How we work"
        title="OUR PROCESS"
        sub="Seven levels, cleared in order, from first conversation to post-launch support."
      />

      <section className="bg-milk py-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.level}
              className="flex gap-6 items-start"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="w-14 h-14 bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center">
                  <step.icon
                    className="text-milk"
                    size={22}
                  />
                </div>

                {i < PROCESS_STEPS.length - 1 && (
                  <div className="w-3px h-16 bg-ink/20 mt-2" />
                )}
              </div>

              <div className="bg-paper border-2 border-ink pixel-corners-sm p-6 flex-1">
                <div className="font-pixel text-10px text-royal mb-2">
                  LEVEL {step.level}
                </div>

                <div className="font-term text-2xl text-ink mb-2">
                  {step.title}
                </div>

                <p className="text-ink-70 text-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand navigate={navigate} />
    </div>
  );
}