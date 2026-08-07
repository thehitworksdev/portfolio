import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import SectionHeader from "../components/Common/SectionHeader";
import PixelButton from "../components/Common/Button";
import { MapPin, Target, Award, Briefcase } from "lucide-react";
import { JOBS } from "../data/content";

export default function Careers() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHero eyebrow="Join the party" title="CAREERS" sub="Small team, real ownership, and projects that ship — not sit in backlog forever." />
      <section className="bg-milk py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-16">
          {[
            ["Remote-friendly", MapPin, "Work from Coimbatore or wherever you do your best work."],
            ["Real ownership", Target, "You'll ship features that go live, not sit in a backlog."],
            ["Learning budget", Award, "Courses, conferences, and certifications, covered."],
          ].map(([t, Icon, d]) => (
            <div key={t} className="bg-paper border-2 border-ink pixel-corners-sm p-6">
              <Icon className="text-royal mb-3" size={22} />
              <div className="font-term text-2xl text-ink mb-2">{t}</div>
              <p className="text-ink-70 text-lg">{d}</p>
            </div>
          ))}
        </div>

        <SectionHeader eyebrow="Open roles" title="CURRENT OPENINGS" align="left" />
        <div className="max-w-6xl mx-auto flex flex-col gap-4 mb-14">
          {JOBS.map((job) => (
            <div key={job.title} className="bg-paper border-2 border-ink pixel-corners-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-term text-2xl text-ink flex items-center gap-2"><Briefcase size={18} className="text-royal" />{job.title}</div>
                <div className="text-ink-70 text-base mt-1">{job.type} · {job.loc}</div>
              </div>
              <PixelButton variant="royal" onClick={() => navigate("contact")}>Apply Now</PixelButton>
            </div>
          ))}
        </div>
        <p className="text-ink-70 text-lg">Don't see a fit? We also take on a few internships each year — reach out via the <button onClick={() => navigate("contact")} className="text-royal underline">contact page</button> and tell us what you'd want to work on.</p>
      </section>
    </div>
  );
}