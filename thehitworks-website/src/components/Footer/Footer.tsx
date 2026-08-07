import { useState } from "react";
import PixelButton from "../Common/Button";
import PixelStars from "../Common/PixelStars";
import { Gamepad2, Github, Linkedin, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="bg-royal-deep text-milk relative">
      <div className="h-2 w-full" style={{ background: "repeating-linear-gradient(90deg, #F5B301 0 10px, #12175E 10px 20px)" }} />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 bg-gold border-2 border-milk pixel-corners-sm flex items-center justify-center">
              <Gamepad2 className="text-ink" size={18} />
            </span>
            <span className="font-pixel text-11px text-milk">THE HIT WORKS</span>
          </div>
          <p className="text-milk-70 text-lg max-w-sm mb-5">
            We design and build AI-powered software, web platforms, and mobile apps for businesses that want to move faster than their spreadsheets.
          </p>
          <div className="flex gap-3">
            {[Github, Linkedin, Twitter, Instagram, Youtube].map((Icon, i) => (
              <span key={i} className="w-9 h-9 border-2 border-milk pixel-corners-sm flex items-center justify-center hover:bg-milk hover:text-royal-deep cursor-pointer transition-colors">
                <Icon size={15} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-pixel text-10px text-gold mb-4">QUICK LINKS</div>
          <div className="flex flex-col gap-3 text-lg font-term text-milk-70">
            <button onClick={() => navigate("process")} className="text-left hover:text-milk">Our Process</button>
            <button onClick={() => navigate("pricing")} className="text-left hover:text-milk">Pricing</button>
            <button onClick={() => navigate("careers")} className="text-left hover:text-milk">Careers</button>
            <button onClick={() => navigate("faq")} className="text-left hover:text-milk">FAQ</button>
            <button onClick={() => navigate("blog")} className="text-left hover:text-milk">Blog</button>
          </div>
        </div>

        <div>
          <div className="font-pixel text-10px text-gold mb-4">CONTACT</div>
          <div className="flex flex-col gap-3 text-lg font-term text-milk-70">
            <span className="flex items-center gap-2"><MapPin size={16} /> Coimbatore, Tamil Nadu, IN</span>
            <span className="flex items-center gap-2"><Phone size={16} /> +91 00000 00000</span>
            <span className="flex items-center gap-2"><Mail size={16} /> hello@thehitworks.com</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="border-2 border-milk pixel-corners p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-royal-mid">
          <div>
            <div className="font-pixel text-11px text-milk mb-2">GET THE FREE AI GUIDE</div>
            <p className="text-milk-70 text-lg">Business automation checklist + software planning template, straight to your inbox.</p>
          </div>
          {subscribed ? (
            <div className="font-term text-xl text-gold">✓ Subscribed — check your inbox!</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex w-full sm:w-auto gap-2">
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="px-3 py-3 pixel-corners-sm w-full sm:w-64 text-ink" />
              <PixelButton type="submit" variant="gold">Send</PixelButton>
            </form>
          )}
        </div>
      </div>

      <div className="border-t-2 border-milk/30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-term text-milk-70">
          <span>© 2026 THE HIT WORKS. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <span>Privacy Policy</span><span>Terms & Conditions</span><span>Refund Policy</span><span>Cookie Policy</span><span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
