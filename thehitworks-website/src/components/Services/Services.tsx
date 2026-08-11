import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../Common/Pagehero";
import PixelButton from "../Common/Button";
import Chip from "../Common/Chip";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { SERVICES } from "../../data/content";
import CtaBand from "../CTA/CTA";

export default function ServicesPage({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  const [searchParams] = useSearchParams();

  const serviceFromUrl = searchParams.get("open");

  const [openId, setOpenId] = useState<string | null>(
    serviceFromUrl
  );

  // Open + scroll to requested service
  useEffect(() => {
    if (!serviceFromUrl) return;

    // Make sure the requested service actually exists
    const serviceExists = SERVICES.some(
      (service) => service.id === serviceFromUrl
    );

    if (!serviceExists) return;

    setOpenId(serviceFromUrl);

    // Wait for React to render the expanded section
    setTimeout(() => {
      const element = document.getElementById(
        `service-${serviceFromUrl}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  }, [serviceFromUrl]);

  return (
    <div>
      <PageHero
        eyebrow="What we build"
        title="SERVICES"
        sub="Ten disciplines, one team. Tap a service to see how we scope, build, and price it."
      />

      <section className="bg-milk py-20">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4">

          {SERVICES.map((s) => {
            const open = openId === s.id;

            return (
              <div
                key={s.id}
                id={`service-${s.id}`}
                className="bg-paper border-2 border-ink pixel-corners"
              >
                <button
                  onClick={() =>
                    setOpenId(open ? null : s.id)
                  }
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div className="w-11 h-11 bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center shrink-0">
                    <s.icon
                      className="text-milk"
                      size={20}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-term text-2xl text-ink">
                      {s.title}
                    </div>

                    <div className="text-ink-70 text-base">
                      {s.tagline}
                    </div>
                  </div>

                  <ChevronDown
                    className={`shrink-0 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {open && (
                  <div className="px-5 pb-6 pt-1 border-t-2 border-milk-deep grid md:grid-cols-2 gap-6">

                    {/* LEFT */}
                    <div>
                      <p className="text-ink-70 text-lg mb-4">
                        {s.overview}
                      </p>

                      <div className="font-pixel text-10px text-royal mb-3">
                        BENEFITS
                      </div>

                      <ul className="flex flex-col gap-2 mb-4">
                        {s.benefits.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-ink-70 text-lg"
                          >
                            <CheckCircle2
                              className="text-royal shrink-0 mt-1"
                              size={16}
                            />

                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* RIGHT */}
                    <div>
                      <div className="font-pixel text-10px text-royal mb-3">
                        OUR PROCESS
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {s.process.map((p, i) => (
                          <Chip
                            key={p}
                            tone="ink"
                          >
                            {i + 1}. {p}
                          </Chip>
                        ))}
                      </div>

                      <div className="font-pixel text-10px text-royal mb-3">
                        TECH STACK
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {s.tech.map((t) => (
                          <Chip key={t}>
                            {t}
                          </Chip>
                        ))}
                      </div>

                      <div className="font-pixel text-10px text-royal mb-3">
                        USE CASES
                      </div>

                      <p className="text-ink-70 text-lg mb-5">
                        {s.useCases.join(" · ")}
                      </p>

                      <div className="flex items-center justify-between border-t-2 border-milk-deep pt-4">

                        <PixelButton
                          variant="royal"
                          onClick={() => navigate("contact")}
                        >
                          Get a Quote
                        </PixelButton>

                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}

        </div>
      </section>

      <CtaBand navigate={navigate} />
    </div>
  );
}