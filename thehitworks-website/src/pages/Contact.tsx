import { useState } from "react";
import type { FormEvent } from "react";
import PageHero from "../components/Common/Pagehero";
import PixelButton from "../components/Common/Button";
import PixelStars from "../components/Common/PixelStars";

import {
  MapPin,
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
  countryCode: string;
  phone: string;
  service: string;
  message: string;
}


const WHATSAPP_NUMBER = "919786292689";


const COUNTRY_CODES = [
  { country: "India", code: "+91", flag: "🇮🇳" },
  { country: "United States", code: "+1", flag: "🇺🇸" },
  { country: "Canada", code: "+1", flag: "🇨🇦" },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "Germany", code: "+49", flag: "🇩🇪" },
  { country: "France", code: "+33", flag: "🇫🇷" },
  { country: "Australia", code: "+61", flag: "🇦🇺" },
  { country: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { country: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { country: "Singapore", code: "+65", flag: "🇸🇬" },
  { country: "Malaysia", code: "+60", flag: "🇲🇾" },
  { country: "Japan", code: "+81", flag: "🇯🇵" },
  { country: "South Korea", code: "+82", flag: "🇰🇷" },
  { country: "China", code: "+86", flag: "🇨🇳" },
  { country: "Netherlands", code: "+31", flag: "🇳🇱" },
  { country: "Switzerland", code: "+41", flag: "🇨🇭" },
  { country: "New Zealand", code: "+64", flag: "🇳🇿" },
  { country: "South Africa", code: "+27", flag: "🇿🇦" },
  { country: "Brazil", code: "+55", flag: "🇧🇷" },
  { country: "Mexico", code: "+52", flag: "🇲🇽" },
];



const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Office",
    value: "Coimbatore, Tamil Nadu, India",
  },

  {
    icon: Mail,
    label: "Email",
    value: "hello@thehitworks.com",
  },

  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat | 10:00 AM – 5:00 PM",
  },
];


export default function Contact() {

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+1",
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setSending(true);
  setError("");

  try {
    const fullPhone = `${form.countryCode} ${form.phone}`.trim();

    const API_URL = "/api/contact";

    console.log("Sending contact form to:", API_URL);
    const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      countryCode: form.countryCode,
      phone: fullPhone,
      service: form.service,
      message: form.message,
    }),
  });

    const data = await response.json();

    console.log("Contact API response:", data);

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to send message."
      );
    }
    setSent(true);
    setForm({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      service: SERVICES[0]?.title || "",
      message: "",
    });

  } catch (error) {
    console.error("Contact form error:", error);

    setError(
      error instanceof Error
        ? error.message
        : "We couldn't send your message. Please try again or contact us through WhatsApp."
    );
  } finally {
    setSending(false);
  }
}
  function openWhatsApp() {

    const message = encodeURIComponent(
      "Hi THE HIT WORKS! I'd like to discuss a project."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  }


  function scheduleCall() {

    const message = encodeURIComponent(
      "Hi THE HIT WORKS! I'd like to schedule a call to discuss a project."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  }
  return (
    <>
      <PageHero
        eyebrow="Let's Build Together"
        title="CONTACT US"
        sub="Have an idea? Need a website, AI solution, mobile app or business automation? Let's discuss it."
      />
      <section className="py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 min-w-0">
          <div className="min-w-0 w-full lg:col-span-2 flex flex-col gap-5">
            {CONTACT_INFO.map(
              ({ icon: Icon, label, value }) => (
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
                      <p className="normal-text mt-1">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
            <div className="flex flex-wrap gap-3">
              <PixelButton
                variant="royal"
                icon={MessageCircle}
                onClick={openWhatsApp}
              >
                WhatsApp
              </PixelButton>
              <PixelButton
                variant="royal"
                icon={Calendar}
                onClick={scheduleCall}
              >
                Schedule Call
              </PixelButton>
            </div>
            <div
              className="relative h-56 bg-royal-deep border-2 border-ink pixel-corners-sm flex flex-col items-center justify-center overflow-hidden"
            >
              <PixelStars />
              <MapPin
                size={34}
                className="text-gold relative"
              />
              <p className="relative mt-3 text-milk font-term text-lg">
                Coimbatore, Tamil Nadu
              </p>
            </div>
          </div>
          <div className="min-w-0 w-full lg:col-span-3">
            <div className="w-full max-w-full min-w-0 bg-paper border-2 border-ink pixel-corners p-4 sm:p-6 lg:p-8">
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
                    Thanks for reaching out!
                    We'll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-royal underline font-term"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="contact-form w-full min-w-0 flex flex-col gap-6"
                >
                  {/* =========================
                      NAME + EMAIL
                  ========================== */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-w-0">

                    {/* Name */}
                    <div className="min-w-0">
                      <label className="font-term block mb-2">
                        Name
                      </label>

                      <input
                        required
                        type="text"
                        autoComplete="name"
                        className="
                          block
                          w-full
                          max-w-full
                          min-w-0
                          px-4
                          py-3
                          font-sans
                          text-base
                          text-ink
                          bg-white
                          pixel-corners-sm
                          border
                          border-ink/20
                          outline-none
                          focus:border-royal
                          focus:ring-2
                          focus:ring-royal/20
                          transition
                        "
                        value={form.name}
                        onChange={(e) =>
                          update("name", e.target.value)
                        }
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div className="min-w-0">
                      <label className="font-term block mb-2">
                        Email
                      </label>

                      <input
                        required
                        type="email"
                        autoComplete="email"
                        className="
                          block
                          w-full
                          max-w-full
                          min-w-0
                          px-4
                          py-3
                          font-sans
                          text-base
                          text-ink
                          bg-white
                          pixel-corners-sm
                          border
                          border-ink/20
                          outline-none
                          focus:border-royal
                          focus:ring-2
                          focus:ring-royal/20
                          transition
                        "
                        value={form.email}
                        onChange={(e) =>
                          update("email", e.target.value)
                        }
                        placeholder="you@example.com"
                      />
                    </div>

                  </div>


                  {/* =========================
                      PHONE
                  ========================== */}
                  <div className="min-w-0">
                    <label className="font-term block mb-2">
                      Phone
                    </label>

                    <div className="flex w-full min-w-0 gap-2">

                      {/* Country code */}
                      <select
                        value={form.countryCode}
                        onChange={(e) =>
                          update(
                            "countryCode",
                            e.target.value
                          )
                        }
                        className="
                          w-28
                          sm:w-[145px]
                          shrink-0
                          px-2
                          sm:px-3
                          py-3
                          font-sans
                          text-base
                          text-ink
                          bg-white
                          pixel-corners-sm
                          border
                          border-ink/20
                          outline-none
                          focus:border-royal
                          focus:ring-2
                          focus:ring-royal/20
                          transition
                        "
                      >
                        {COUNTRY_CODES.map((country) => (
                          <option
                            key={`${country.country}-${country.code}`}
                            value={country.code}
                          >
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>

                      {/* Phone number */}
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="97862 92689"
                        className="
                          block
                          flex-1
                          min-w-0
                          w-full
                          px-4
                          py-3
                          font-sans
                          text-base
                          text-ink
                          bg-white
                          pixel-corners-sm
                          border
                          border-ink/20
                          outline-none
                          focus:border-royal
                          focus:ring-2
                          focus:ring-royal/20
                          transition
                        "
                        value={form.phone}
                        onChange={(e) =>
                          update(
                            "phone",
                            e.target.value
                          )
                        }
                      />

                    </div>
                  </div>


                  {/* =========================
                      SERVICE
                  ========================== */}
                  <div className="min-w-0">
                    <label className="font-term block mb-2">
                      Service
                    </label>

                    <select
                      className="
                        block
                        w-full
                        max-w-full
                        min-w-0
                        px-4
                        py-3
                        font-sans
                        text-base
                        text-ink
                        bg-white
                        pixel-corners-sm
                        border
                        border-ink/20
                        outline-none
                        focus:border-royal
                        focus:ring-2
                        focus:ring-royal/20
                        transition
                      "
                      value={form.service}
                      onChange={(e) =>
                        update(
                          "service",
                          e.target.value
                        )
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


                  {/* =========================
                      MESSAGE
                  ========================== */}
                  <div className="min-w-0">
                    <label className="font-term block mb-2">
                      Message
                    </label>

                    <textarea
                      required
                      rows={6}
                      autoComplete="off"
                      className="
                        block
                        w-full
                        max-w-full
                        min-w-0
                        px-4
                        py-3
                        font-sans
                        text-base
                        leading-relaxed
                        text-ink
                        bg-white
                        pixel-corners-sm
                        border
                        border-ink/20
                        outline-none
                        resize-none
                        focus:border-royal
                        focus:ring-2
                        focus:ring-royal/20
                        transition
                      "
                      placeholder="Tell us a little about what you'd like to build..."
                      value={form.message}
                      onChange={(e) =>
                        update(
                          "message",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* =========================
                      ERROR
                  ========================== */}
                  {error && (
                    <div
                      className="
                        w-full
                        border-2
                        border-red-500
                        bg-red-50
                        text-red-700
                        px-4
                        py-3
                        font-sans
                        text-sm
                        pixel-corners-sm
                      "
                      role="alert"
                    >
                      {error}
                    </div>
                  )}


                  {/* =========================
                      SUBMIT
                  ========================== */}
                  <div className="flex w-full">
                    <PixelButton
                      type="submit"
                      variant="royal"
                      size="lg"
                      icon={Send}
                      disabled={sending}
                    >
                      {sending
                        ? "SENDING..."
                        : "SEND MESSAGE"}
                    </PixelButton>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}