import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import logoBlue from "../../assets/logo-blue.png";
import logoWhite from "../../assets/logo-white.png";
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

  const headerRef = useRef<HTMLElement | null>(null);

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
  const logoSrc = isDark ? logoWhite : logoBlue;

  return (
    <header ref={headerRef} className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        className="max-w-7xl mx-auto rounded-2xl border border-white/15 overflow-visible"
        style={{
          backgroundColor: "transparent",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="relative flex items-center justify-between px-4 h-16">
          <button
            onClick={() => navigate(toPath("home"))}
            className="relative flex items-center shrink-0 h-full"
            aria-label="The HIT Works Home"
          >
            <img
              src={logoSrc}
              alt="The HIT Works"
              className="absolute top-1/2 left-0 -translate-y-1/2 h-24 w-auto object-contain transition-opacity duration-200"
            />
            <span className="opacity-0 pointer-events-none w-32" />
          </button>
          <nav className="hidden xl:flex items-center gap-1 font-term text-base">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  navigate(toPath(item.id))
                }
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
                  page === toPath(item.id)
                    ? "bg-royal text-milk"
                    : `${mutedClass} ${hoverBgClass}`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>



          <div className="hidden xl:flex items-center gap-2">
            <button
              onClick={() =>
                navigate(toPath("contact"))
              }
              className="font-term text-base px-4 py-2 rounded-full bg-royal text-milk hover:brightness-110 transition"
            >
              Book a Call
            </button>
          </div>



          <button
            className={`xl:hidden w-9 h-9 rounded-full flex items-center justify-center ${hoverBgClass} ${textClass}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>



        {open && (
          <div
            className="xl:hidden border-t border-white/15 px-4 py-4"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter:
                "blur(14px)",
            }}
          >
            <div className="flex flex-col gap-1 font-term text-lg">

              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(toPath(item.id));
                    setOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl ${
                    page === toPath(item.id)
                      ? "bg-royal text-milk"
                      : `${textClass} ${hoverBgClass}`
                  }`}
                >
                  {item.label}
                </button>
              ))}

            </div>

            <button
              onClick={() => {
                navigate(toPath("contact"));
                setOpen(false);
              }}
              className="mt-4 w-full font-term text-lg px-4 py-2.5 rounded-full bg-royal text-milk"
            >
              Book a Call
            </button>
          </div>
        )}
      </div>
    </header>
  );
}