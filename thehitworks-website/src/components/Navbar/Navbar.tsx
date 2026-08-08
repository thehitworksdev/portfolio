import { useEffect, useRef, useState } from "react";
import { Gamepad2, X, Menu } from "lucide-react";
import { NAV_ITEMS } from "../../data/content";
import { useNavigate, useLocation } from "react-router-dom";

function getLuminance(r: number, g: number, b: number) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function parseRgb(color: string) {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(",").map((v) => parseFloat(v.trim()));
  const [r, g, b, a = 1] = parts;
  if (a === 0) return null;
  return { r, g, b };
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname;
  const toPath = (id: string) => (id === "home" ? "/" : `/${id}`);

  useEffect(() => {
    let ticking = false;

    const sample = () => {
      ticking = false;
      const header = headerRef.current;
      if (!header) return;

      const rect = header.getBoundingClientRect();
      const x = window.innerWidth / 2;
      const y = rect.top + rect.height / 2;

      const stack = document.elementsFromPoint(x, y) as HTMLElement[];
      const behind = stack.find((el) => !header.contains(el));
      if (!behind) return;

      let node: HTMLElement | null = behind;
      while (node) {
        const bg = getComputedStyle(node).backgroundColor;
        const rgb = parseRgb(bg);
        if (rgb) {
          setIsDark(getLuminance(rgb.r, rgb.g, rgb.b) < 0.55);
          return;
        }
        node = node.parentElement;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sample);
      }
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  const textClass = isDark ? "text-milk" : "text-ink";
  const mutedClass = isDark ? "text-milk-70" : "text-ink-70";
  const hoverBgClass = isDark ? "hover:bg-white/10" : "hover:bg-milk-deep";

  return (
    <header ref={headerRef} className="sticky top-3 z-[999] isolate px-3 sm:px-6">
      <div
        className="max-w-7xl mx-auto rounded-2xl border border-white/15"
        style={{ backgroundColor: "transparent", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      >
        <div className="h-14 px-4 sm:px-5 flex items-center justify-between">
          <button onClick={() => navigate(toPath("home"))} className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 bg-royal rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-milk" size={16} />
            </span>
            <span className={`font-pixel text-9px leading-tight text-left hidden sm:block ${textClass}`}>
              THE HIT<br />WORKS
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-1 font-term text-base">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(toPath(item.id))}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
                  page === toPath(item.id) ? "bg-royal text-milk" : `${mutedClass} ${hoverBgClass}`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <button
              onClick={() => navigate(toPath("contact"))}
              className="font-term text-base px-4 py-2 rounded-full bg-royal text-milk hover:brightness-110 transition"
            >
              Book a Call
            </button>
          </div>

          <button
            className={`xl:hidden w-9 h-9 rounded-full flex items-center justify-center ${hoverBgClass} ${textClass}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open ? (
          <div
            className="xl:hidden border-t border-white/15 px-4 py-4"
            style={{ backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
          >
            <div className="flex flex-col gap-1 font-term text-lg">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { navigate(toPath(item.id)); setOpen(false); }}
                  className={`text-left px-3 py-2 rounded-xl ${
                    page === toPath(item.id) ? "bg-royal text-milk" : `${textClass} ${hoverBgClass}`
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => { navigate(toPath("contact")); setOpen(false); }}
              className="mt-4 w-full font-term text-lg px-4 py-2.5 rounded-full bg-royal text-milk"
            >
              Book a Call
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}