import PixelButton from "../Common/Button";
import { ArrowRight } from "lucide-react";

export default function CtaBand({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  return (
    <section className="bg-gold py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-pixel text-lg sm:text-2xl text-ink leading-relaxed mb-6">
          LET'S BUILD SOMETHING WORTH SHIPPING
        </h2>

        <PixelButton
          variant="royal"
          size="lg"
          icon={ArrowRight}
          onClick={() => navigate("/contact")}
        >
          Book a Free Consultation
        </PixelButton>
      </div>
    </section>
  );
}