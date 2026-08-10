import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import PixelButton from "../components/Common/Button";
import { CheckCircle2 } from "lucide-react";
import { PRICING_TIERS } from "../data/content";

const INR_TO_USD = 0.0117;

export default function Pricing() {
  const navigate = useNavigate();

  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const language = navigator.language || "";
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "";

    const isIndia =
      language.toLowerCase().includes("in") ||
      timezone === "Asia/Calcutta" ||
      timezone === "Asia/Kolkata";

    if (isIndia) {
      setCurrency("INR");
    }
  }, []);

  const formatPrice = (price: string | number) => {
  if (typeof price === "string" && isNaN(Number(price))) {
    return price;
  }

  const numericPrice = Number(price);

  const convertedPrice =
    currency === "USD"
      ? numericPrice * INR_TO_USD
      : numericPrice;

  return new Intl.NumberFormat(
    currency === "USD" ? "en-US" : "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(convertedPrice);
};
  return (
    <>
      <PageHero
        eyebrow="◆ PRICING ◆"
        title="SIMPLE, TRANSPARENT PRICING"
        sub="Choose a starting point and let's build something that works."
      />

      <section className="py-20 bg-royal-deep">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 p-1 bg-paper border-2 border-gold pixel-corners-sm">

              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-5 py-2 font-pixel text-sm transition-all ${
                  currency === "USD"
                    ? "bg-royal text-white"
                    : "text-ink hover:bg-royal/10"
                }`}
              >
                $ USD
              </button>

              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-5 py-2 font-pixel text-sm transition-all ${
                  currency === "INR"
                    ? "bg-royal text-white"
                    : "text-ink hover:bg-royal/10"
                }`}
              >
                ₹ INR
              </button>

            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-paper pixel-corners p-6 flex flex-col ${
                  tier.popular
                    ? "card-pixel-gold"
                    : "card-pixel"
                }`}
              >
                  {tier.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="font-pixel text-xs bg-gold text-ink px-3 py-1 pixel-corners-sm">
                      MOST PICKED
                    </span>
                  </div>
                )}

                <h3 className="font-term text-2xl text-ink mb-2">
                  {tier.name}
                </h3>

                <p className="text-ink-70 mb-6">
                  {tier.desc}
                </p>

                <div className="mb-2">
                  <span className="font-sans font-bold text-4xl text-royal tracking-tight">
                    {formatPrice(tier.price)}
                  </span>
                </div>

                <p className="text-sm text-ink-70 mb-6">
                  {currency === "USD"
                      ? "International pricing · transfer fees may apply"
                      : "Starting price · GST applicable where required"}
                </p>

                <div className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-royal mt-0.5 shrink-0"
                      />

                      <span className="text-ink">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <PixelButton
                  variant={tier.popular ? "gold" : "royal"}
                  onClick={() => navigate("/contact")}
                >
                  GET A QUOTE
                </PixelButton>

              </div>
            ))}

          </div>

          <p className="text-center text-white/70 text-sm mt-10">
            Prices shown are starting estimates. Final quotes depend on
            scope, integrations, features, and timeline.
          </p>

        </div>
      </section>
    </>
  );
}