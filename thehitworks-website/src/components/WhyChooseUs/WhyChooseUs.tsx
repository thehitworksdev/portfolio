import PageHero from "../Common/Pagehero";
import PixelCard from "../Common/Pixelcard";
import SectionHeader from "../Common/SectionHeader";
import PixelStars from "../Common/PixelStars";
import { Target, Rocket, Heart, Users } from "lucide-react";
import { TEAM } from "../../data/content";
import CtaBand from "../CTA/CTA";

interface AboutPageProps {
  navigate: (to: string) => void;
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div>
      {/* Page Hero */}
      <PageHero
        eyebrow="Who we are"
        title="ABOUT THE HIT WORKS"
        sub="A software studio helping businesses turn ideas, problems, and manual processes into reliable digital products."
      />

      {/* Mission / Vision / Values */}
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            [
              "Mission",
              Target,
              "Help growing businesses replace manual, error-prone work with software that just handles it — reliably, and on a budget that makes sense.",
            ],
            [
              "Vision",
              Rocket,
              "To be the studio founders and operators call first when an idea needs to become a working product, not just a pitch deck.",
            ],
            [
              "Core Values",
              Heart,
              "Honest timelines, clean handovers, and code we'd be comfortable maintaining ourselves five years from now.",
            ],
          ].map(([title, Icon, text]) => {
            const IconComponent = Icon as typeof Target;

            return (
              <PixelCard key={title as string}>
                <IconComponent
                  className="text-royal mb-4"
                  size={26}
                />

                <h3 className="font-term text-2xl text-ink mb-2">
                  {title as string}
                </h3>

                <p className="text-ink-70 text-lg">
                  {text as string}
                </p>
              </PixelCard>
            );
          })}
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-milk-deep py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            eyebrow="Founder story"
            title="WHY WE STARTED"
          />

          <p className="text-ink-70 text-xl leading-relaxed">
            THE HIT WORKS started the way most software studios do — with
            frustration. We kept meeting business owners running entire
            operations out of spreadsheets and group chats, not because they
            didn't know better, but because good software felt expensive,
            slow, and built for someone else's problem.
          </p>

          <p className="text-ink-70 text-xl leading-relaxed mt-6">
            We started this studio to fix that gap: senior-level engineering
            and design, scoped honestly, delivered on a timeline that respects
            your business.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Culture"
            title="HOW WE WORK TOGETHER"
            sub="Small team, high ownership, no hand-off-and-disappear projects."
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              [
                "Async by default",
                "Clear written updates over status-meeting theater — your time matters.",
              ],
              [
                "Ship in small pieces",
                "Weekly increments you can see and react to, not a single reveal at the end.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="bg-paper border-2 border-ink pixel-corners-sm p-6"
              >
                <div className="font-term text-2xl text-ink mb-2">
                  {title}
                </div>

                <p className="text-ink-70 text-lg">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-royal-deep py-20 relative overflow-hidden">
        <PixelStars />

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Meet the team"
            title="THE PEOPLE BEHIND THE BUILD"
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-milk border-2 border-gold pixel-corners-sm p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center mb-4">
                  <Users
                    className="text-milk"
                    size={24}
                  />
                </div>

                <div className="font-term text-xl text-ink">
                  {member.name}
                </div>

                <p className="text-ink-70 text-base mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-milk-70 text-base mt-6">
            Team photos & bios coming soon.
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Where we stand"
            title="ACHIEVEMENTS SO FAR"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["Founded", "2025"],
              ["Avg. response time", "<24h"],
              ["Support availability", "24/7"],
              ["Industries served", "8+"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-paper border-2 border-ink pixel-corners-sm p-6 text-center"
              >
                <div className="font-pixel text-lg text-royal mb-2">
                  {value}
                </div>

                <div className="text-ink-70 text-base font-term">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand navigate={navigate} />
    </div>
  );
}