import { useState, useRef, useEffect } from "react";
import PixelStars from "../Common/PixelStars";
import CodeBackground from "../Common/CodeBackground";
import Eyebrow from "../Common/Eyebrow";
import PixelButton from "../Common/Button";
import { ArrowRight,ChevronRight,Users,Sparkles,ShieldCheck,Workflow,Award, Rocket, LifeBuoy, Quote } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Chip from "../Common/Chip";
import PixelCard from "../Common/Pixelcard";
import { SERVICES, PROJECTS, PROCESS_STEPS, TECH_GROUPS, FAQS_HOME, TESTIMONIALS } from "../../data/content";
import AccordionItem from "../Common/AccordionItem";

function FadeSection({
  children,
  className,
  initiallyVisible = false,
  characterSection,
}: {
  children: React.ReactNode;
  className?: string;
  initiallyVisible?: boolean;
  characterSection?: string;
})  {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(initiallyVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Consider a section "visible" once a meaningful slice of it is
        // on screen, and "hidden" again once it's mostly scrolled past —
        // this is what produces the fade-out-then-fade-in feel.
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          setVisible(true);
        } else if (entry.intersectionRatio < 0.05) {
          setVisible(false);
        }
      },
      { threshold: [0, 0.05, 0.15, 0.3, 0.6, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-character-section={characterSection}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(32px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}

export default function Hero({ navigate }: { navigate: (to: string) => void }) {
  const [openFaq, setOpenFaq] = useState(-1);
  const toPath = (id: string) => (id === "home" ? "/" : `/${id}`);
  return (
    <section >
      
      <FadeSection
        initiallyVisible
        characterSection="hero"
        className="bg-royal-deep relative overflow-hidden min-h-screen flex items-center"
      >
        <PixelStars />
        <CodeBackground />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2">
            <Eyebrow light>Software Studio</Eyebrow>
            <span className="cursor-blink text-gold font-pixel text-xs">_</span>
          </div>
          <h1 className="font-pixel text-2xl sm:text-3xl lg:text-4xl text-milk leading-relaxed">
            The HIT Works
          </h1>
          <div className="w-16 h-[2px] bg-gold my-6" />
          <p className="text-xl sm:text-2xl text-milk-70 font-term max-w-2xl">
            AI Solutions • Web Applications • Mobile Apps • Automation • Cloud Infrastructure
          </p>
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            <PixelButton variant="gold" size="lg" icon={ArrowRight} onClick={() => navigate(toPath("contact"))}>
              ▶ Book Free Consultation
            </PixelButton>
            <PixelButton variant="ghostMilk" size="lg" onClick={() => navigate(toPath("portfolio"))}>
              View Our Work
            </PixelButton>
          </div>
        </div>
      </FadeSection>

      {/* TRUSTED BY */}
      <FadeSection characterSection="trusted" className="bg-milk-deep border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
          <span className="font-pixel text-10px text-ink shrink-0">BUILT FOR TEAMS IN</span>
          <div className="flex flex-wrap justify-center gap-3">
            {["Startups", "Healthcare", "Retail", "Manufacturing", "Education", "Enterprises"].map((t) => (
              <Chip key={t} tone="ink">{t}</Chip>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* SERVICES SNAPSHOT */}
      <FadeSection characterSection="services" className="bg-milk py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="What we build" title="SERVICES SNAPSHOT" sub="Ten ways we help businesses turn ideas into shipped software." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <PixelCard key={s.id} className="flex flex-col">
                <div className="w-11 h-11 bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center mb-4">
                  <s.icon className="text-milk" size={20} />
                </div>
                <h3 className="font-term text-2xl text-ink mb-2">{s.title}</h3>
                <p className="text-ink-70 text-lg mb-4">{s.tagline}</p>
                <button onClick={() => navigate(toPath("services"))} className="mt-auto font-pixel text-10px text-royal inline-flex items-center gap-2">
                  LEARN MORE <ChevronRight size={12} />
                </button>
              </PixelCard>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* WHY CHOOSE US */}
      <FadeSection characterSection="why-us" className="bg-royal-deep py-20 sm:py-24 relative overflow-hidden">
        <PixelStars />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Why THE HIT WORKS" title="BUILT DIFFERENT, DELIVERED RELIABLY" light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["Dedicated Team", Users], ["Latest Technologies", Sparkles], ["Secure Development", ShieldCheck],
              ["Agile Process", Workflow], ["Affordable Pricing", Award], ["Fast Delivery", Rocket],
              ["Long-Term Support", LifeBuoy],
            ].map(([label, Icon]) => (
              <div key={label} className="bg-royal-mid border-2 border-milk pixel-corners-sm p-5 flex items-center gap-3">
                <Icon className="text-gold shrink-0" size={22} />
                <span className="font-term text-xl text-milk">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* FEATURED PROJECTS */}
      <FadeSection characterSection="projects" className="bg-milk py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Recent work" title="FEATURED PROJECTS" sub="A few builds we're proud of — full write-ups in Case Studies." />
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p) => (
              <PixelCard key={p.name}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-term text-2xl text-ink">{p.name}</h3>
                  <Chip>{p.category}</Chip>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => <span key={t} className="text-sm font-term text-ink-70 bg-milk-deep px-2 py-1">{t}</span>)}
                </div>
                <p className="text-ink-70 text-lg mb-2"><span className="text-ink font-bold">Problem: </span>{p.problem}</p>
                <p className="text-ink-70 text-lg mb-2"><span className="text-ink font-bold">Solution: </span>{p.solution}</p>
                <p className="text-royal text-lg mb-4 font-bold">{p.result}</p>
                <button onClick={() => navigate(toPath("case-studies"))} className="font-pixel text-10px text-royal inline-flex items-center gap-2">
                  VIEW CASE STUDY <ChevronRight size={12} />
                </button>
              </PixelCard>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* PROCESS — level map (signature element) */}
      <FadeSection characterSection="process" className="bg-milk-deep py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="How we work" title="THE DEVELOPMENT QUEST MAP" sub="Seven levels between your idea and a live product. Order matters — each level clears before the next starts." />
          <div className="hidden lg:block relative">
            <div className="absolute top-1/2 left-0 right-0 dash-path" />
            <div className="relative grid grid-cols-7 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.level} className={`flex flex-col items-center ${i % 2 === 0 ? "" : "mt-20"}`}>
                  <div className="bg-paper border-2 border-ink pixel-corners-sm p-4 text-center mb-3">
                    <div className="font-pixel text-9px text-royal mb-2">LVL {step.level}</div>
                    <step.icon className="mx-auto text-ink mb-2" size={20} />
                    <div className="font-term text-lg text-ink">{step.title}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative grid grid-cols-7 gap-4 mt-3">
              {PROCESS_STEPS.map((step) => (
                <p key={step.level} className="text-sm text-ink-70 text-center px-1">{step.desc}</p>
              ))}
            </div>
          </div>
          <div className="lg:hidden flex flex-col gap-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.level} className="bg-paper border-2 border-ink pixel-corners-sm p-5 flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="font-pixel text-9px text-royal mb-2">LVL {step.level}</div>
                  <step.icon className="text-ink" size={22} />
                </div>
                <div>
                  <div className="font-term text-xl text-ink mb-1">{step.title}</div>
                  <p className="text-ink-70 text-base">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* TECHNOLOGIES (compact) */}
      <FadeSection characterSection="technologies" className="bg-milk py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Our loadout" title="TECHNOLOGIES WE USE" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {TECH_GROUPS.map((g) => (
              <div key={g.title} className="bg-paper border-2 border-ink pixel-corners-sm p-4">
                <div className="font-pixel text-10px text-royal mb-3">{g.title.toUpperCase()}</div>
                <div className="flex flex-col gap-2">
                  {g.items.map((it) => (
                    <span key={it.n} className="text-lg font-term text-ink border-b border-milk-deep pb-1">{it.n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate(toPath("technologies"))} className="font-pixel text-10px text-royal inline-flex items-center gap-2">
              SEE FULL STACK <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </FadeSection>

      {/* TESTIMONIALS */}
      <FadeSection characterSection="testimonials" className="bg-royal-deep py-20 sm:py-24 relative overflow-hidden">
        <PixelStars />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader eyebrow="Client feedback" title="WHAT CLIENTS SAY" light />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-milk border-2 border-gold pixel-corners-sm p-6">
                <Quote className="text-royal mb-3" size={22} />
                <p className="text-ink text-lg mb-5">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-royal text-milk font-pixel text-10px flex items-center justify-center pixel-corners-sm">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-term text-lg text-ink">{t.name}</div>
                    <div className="text-sm text-ink-70">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* FAQ preview */}
      <FadeSection characterSection="faq" className="bg-milk py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader eyebrow="Good to know" title="FREQUENTLY ASKED QUESTIONS" />
          <div>
            {FAQS_HOME.map((f, i) => (
              <AccordionItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate(toPath("faq"))} className="font-pixel text-10px text-royal inline-flex items-center gap-2">
              VIEW ALL FAQS <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </FadeSection>

      {/* CTA */}
      <FadeSection characterSection="cta" className="bg-gold py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-pixel text-xl sm:text-3xl text-ink leading-relaxed mb-6">
            READY TO BUILD YOUR<br />NEXT SOFTWARE?
          </h2>
          <p className="text-xl text-ink-70 mb-9">Free consultation. No pressure, no jargon — just a clear plan for what to build first.</p>
          <PixelButton variant="royal" size="lg" icon={ArrowRight} onClick={() => navigate(toPath("contact"))}>
            Book a Free Consultation
          </PixelButton>
        </div>
      </FadeSection>
    </section>
  );
}