import { useNavigate } from "react-router-dom";
import PageHero from "../components/Common/Pagehero";
import PixelCard from "../components/Common/Pixelcard";
import Chip from "../components/Common/Chip";
import CtaBand from "../components/CTA/CTA";
import { BLOG_POSTS } from "../data/content";
import { Clock, BookOpen, ChevronRight } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHero eyebrow="Notes from the studio" title="BLOG" sub="What we're learning about AI, software, and running a small dev studio." />
      <section className="bg-milk py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <PixelCard key={post.title} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Chip>{post.cat}</Chip>
                <span className="text-sm text-ink-70 flex items-center gap-1"><Clock size={13} />{post.read}</span>
              </div>
              <BookOpen className="text-royal mb-3" size={22} />
              <h3 className="font-term text-2xl text-ink mb-2 leading-snug">{post.title}</h3>
              <p className="text-ink-70 text-lg mb-4">{post.excerpt}</p>
              <span className="mt-auto font-pixel text-10px text-royal inline-flex items-center gap-2">READ ARTICLE <ChevronRight size={12} /></span>
            </PixelCard>
          ))}
        </div>
      </section>
      <CtaBand navigate={navigate} />
    </div>
  );
}