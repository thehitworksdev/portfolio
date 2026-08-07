import { useState } from "react";
import PixelButton from "../Common/Button";
import { Gamepad2, X, Menu } from "lucide-react";
import { NAV_ITEMS } from "../../data/content";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname;
  return (
    <header className="sticky top-0 z-50 bg-milk border-b-3 border-ink">
      <div className="h-3px bg-gold w-full" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-20 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-3 shrink-0">
          <span className="w-10 h-10 bg-royal border-2 border-ink pixel-corners-sm flex items-center justify-center">
            <Gamepad2 className="text-milk" size={20} />
          </span>
          <span className="font-pixel text-11px sm:text-xs text-ink leading-tight text-left">
            THE HIT<br />WORKS
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6 font-term text-lg uppercase tracking-wide">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`pb-1 border-b-2 transition-colors ${page === item.id ? "text-royal border-gold" : "text-ink border-transparent hover:text-royal"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <PixelButton variant="ghost" onClick={() => navigate("pricing")}>Get a Quote</PixelButton>
          <PixelButton variant="royal" onClick={() => navigate("contact")}>Book Consultation</PixelButton>
        </div>

        <button className="lg:hidden w-11 h-11 border-2 border-ink bg-milk-deep pixel-corners-sm flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden bg-milk border-t-2 border-ink px-5 py-6">
          <div className="flex flex-col gap-4 font-term text-xl uppercase">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { navigate(item.id); setOpen(false); }}
                className={`text-left ${page === item.id ? "text-royal" : "text-ink"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <PixelButton variant="ghost" onClick={() => { navigate("pricing"); setOpen(false); }}>Get a Quote</PixelButton>
            <PixelButton variant="royal" onClick={() => { navigate("contact"); setOpen(false); }}>Book Consultation</PixelButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}