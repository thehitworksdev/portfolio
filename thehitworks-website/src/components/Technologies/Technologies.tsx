import { useNavigate } from "react-router-dom";
import PageHero from "../Common/Pagehero";
import StatBar from "../Common/Statbar";
import { TECH_GROUPS } from "../../data/content";
import CtaBand from "../CTA/CTA";

export default function TechnologiesPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHero
        eyebrow="Our loadout"
        title="TECHNOLOGIES"
        sub="The stack we reach for by default — swapped out when your project calls for something else."
      />

      <section className="bg-milk py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          {TECH_GROUPS.map((g) => (
            <div key={g.title}>
              <div className="font-pixel text-sm text-royal mb-6">
                {g.title.toUpperCase()}
              </div>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1 bg-paper border-2 border-ink pixel-corners p-6">
                {g.items.map((it) => (
                  <StatBar
                    key={it.n}
                    label={it.n}
                    pct={it.p}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand navigate={navigate} />
    </div>
  );
}