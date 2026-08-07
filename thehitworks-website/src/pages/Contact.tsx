import { useState, FormEvent } from "react";
import PageHero from "../components/Common/Pagehero";
import PixelButton from "../components/Common/Button";
import PixelStars from "../components/Common/PixelStars";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Send,
} from "lucide-react";

import { SERVICES } from "../data/content";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Office",
    value: "Coimbatore, Tamil Nadu, India",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@thehitworks.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat | 10:00 AM – 7:00 PM",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0]?.title || "",
    message: "",
  });

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(form);

    setSent(true);
  }

  return (
    <div className="bg-milk min-h-screen">

      <PageHero
        eyebrow="Let's Build Together"
        title="CONTACT US"
        sub="Have an idea? Need a website, AI solution, mobile app or business automation? Let's discuss it."
      />

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2 flex flex-col gap-5">

            {CONTACT_INFO.map(({ icon: Icon, label, value }) => (

              <div
                key={label}
                className="bg-paper border-2 border-ink pixel-corners-sm p-5 flex gap-4"
              >

                <Icon
                  size={22}
                  className="text-royal shrink-0 mt-1"
                />

                <div>

                  <h3 className="font-pixel text-[11px] mb-2">
                    {label}
                  </h3>

                  {label === "Email" ? (
                    <a
                      href="mailto:hello@thehitworks.com"
                      className="font-term text-lg text-ink hover:text-royal"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-term text-lg text-ink">
                      {value}
                    </p>
                  )}

                </div>

              </div>

            ))}

            <div className="flex flex-wrap gap-3">

              <PixelButton
                variant="royal"
                icon={MessageCircle}
              >
                WhatsApp
              </PixelButton>

              <PixelButton
                variant="ghost"
                icon={Calendar}
              >
                Schedule Call
              </PixelButton>

            </div>

            <div className="relative h-56 bg-royal-deep border-2 border-ink pixel-corners-sm flex flex-col items-center justify-center overflow-hidden">

              <PixelStars />

              <MapPin
                size={34}
                className="text-gold relative"
              />

              <p className="relative mt-3 text-milk font-term text-lg">
                Office Location
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-3">

            <div className="bg-paper border-2 border-ink pixel-corners p-8">

              {sent ? (

                <div className="text-center py-12">

                  <CheckCircle2
                    size={50}
                    className="mx-auto text-royal mb-5"
                  />

                  <h2 className="font-pixel text-sm mb-3">
                    MESSAGE SENT
                  </h2>

                  <p className="font-term text-xl">
                    Thank you! We'll contact you within one business day.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>

                      <label className="font-term block mb-2">
                        Name
                      </label>

                      <input
                        required
                        className="w-full px-4 py-3 pixel-corners-sm"
                        value={form.name}
                        onChange={(e) =>
                          update("name", e.target.value)
                        }
                      />

                    </div>

                    <div>

                      <label className="font-term block mb-2">
                        Email
                      </label>

                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3 pixel-corners-sm"
                        value={form.email}
                        onChange={(e) =>
                          update("email", e.target.value)
                        }
                      />

                    </div>

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>

                      <label className="font-term block mb-2">
                        Phone
                      </label>

                      <input
                        className="w-full px-4 py-3 pixel-corners-sm"
                        value={form.phone}
                        onChange={(e) =>
                          update("phone", e.target.value)
                        }
                      />

                    </div>

                    <div>

                      <label className="font-term block mb-2">
                        Service
                      </label>

                      <select
                        className="w-full px-4 py-3 pixel-corners-sm"
                        value={form.service}
                        onChange={(e) =>
                          update("service", e.target.value)
                        }
                      >
                        {SERVICES.map((service) => (
                          <option
                            key={service.id}
                            value={service.title}
                          >
                            {service.title}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                  <div>

                    <label className="font-term block mb-2">
                      Message
                    </label>

                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 pixel-corners-sm"
                      value={form.message}
                      onChange={(e) =>
                        update("message", e.target.value)
                      }
                    />

                  </div>

                  <PixelButton
                    type="submit"
                    variant="royal"
                    size="lg"
                    icon={Send}
                  >
                    Send Message
                  </PixelButton>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}