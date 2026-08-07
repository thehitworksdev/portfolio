import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import PixelButton from "../components/Common/Button";
import { CheckCircle2 } from "lucide-react";
import { PRICING_TIERS } from "../data/content";

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHero eyebrow="Choose your class" title="PRICING" sub="Starting ranges, not final quotes — every project gets a fixed number after a free scoping call." />
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div key={tier.name} className={`relative bg-paper pixel-corners p-6 flex flex-col ${tier.popular ? "card-pixel-gold" : "card-pixel"}`}>
              {tier.popular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold border-2 border-ink px-3 py-1 font-pixel text-9px whitespace-nowrap">MOST PICKED</div>
              ) : null}
              <div className="font-term text-2xl text-ink mt-2 mb-1">{tier.name}</div>
              <p className="text-ink-70 text-base mb-4">{tier.desc}</p>
              <div className="font-pixel text-lg text-royal mb-1">{tier.price}</div>
              <div className="text-sm text-ink-70 mb-5">{tier.note}</div>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-ink-70 text-lg"><CheckCircle2 className="text-royal shrink-0 mt-1" size={16} />{f}</li>
                ))}
              </ul>
              <PixelButton variant={tier.popular ? "gold" : "royal"} onClick={() => navigate("contact")}>Get a Quote</PixelButton>
            </div>
          ))}
        </div>
        <p className="text-center text-ink-70 text-lg mt-10">All prices in INR. Final quotes depend on scope, integrations, and timeline.</p>
      </section>
    </div>
  );
}