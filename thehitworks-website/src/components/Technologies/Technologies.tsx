import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  CSSProperties,
  MouseEvent,
  RefObject,
} from "react";

import PageHero from "../Common/Pagehero";
import { TECH_GROUPS } from "../../data/content";
import CtaBand from "../CTA/CTA";



type BurstParticle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
};

type BurstStyle = CSSProperties & {
  "--dx"?: string;
  "--dy"?: string;
  "--rot"?: string;
};

type TechCardProps = {
  name: string;
  index: number;
  inView: boolean;
};

type TechItem = {
  n: string;
  p: number;
};

type TechGroupData = {
  title: string;
  items: TechItem[];
};
type TechGroupProps = {
  group: TechGroupData;
  groupIndex: number;
};

type InViewResult = [
  RefObject<HTMLDivElement | null>,
  boolean
];



function useInView(
  threshold = 0.15
): InViewResult {
  const ref =
    useRef<HTMLDivElement | null>(null);

  const [inView, setInView] =
    useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(el);
          }
        },
        {
          threshold,
        }
      );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}


let burstId = 0;


function TechCard({
  name,
  index,
  inView,
}: TechCardProps) {
  const [bursts, setBursts] =
    useState<BurstParticle[]>([]);

  const handleClick = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const originX =
      e.clientX - rect.left;

    const originY =
      e.clientY - rect.top;

    const particles: BurstParticle[] =
      Array.from({ length: 8 }).map(() => {
        const angle =
          Math.random() *
          Math.PI *
          2;

        const dist =
          60 +
          Math.random() *
            50;

        return {
          id: burstId++,

          x: originX,
          y: originY,

          dx:
            Math.cos(angle) *
            dist,

          dy:
            Math.sin(angle) *
              dist -
            30,

          rot:
            (Math.random() - 0.5) *
            180,

          delay:
            Math.random() * 80,
        };
      });

    setBursts((previous) => [
      ...previous,
      ...particles,
    ]);

    window.setTimeout(() => {
      setBursts((previous) =>
        previous.filter(
          (particle) =>
            !particles.includes(
              particle
            )
        )
      );
    }, 800);
  };

  return (
    <div
      onClick={handleClick}
      className="
        relative
        overflow-visible
        cursor-pointer
        group
        flex
        items-center
        gap-3
        bg-paper
        border-2
        border-ink
        pixel-corners
        px-4
        py-3
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-[4px_4px_0_0_theme(colors.royal)]
        hover:border-royal
        active:scale-95
        opacity-0
      "
      style={{
        animation: inView
          ? "chip-in 0.45s ease-out forwards"
          : "none",

        animationDelay:
          `${index * 70}ms`,
      }}
    >
      {/* First letter */}
      <span className="font-pixel text-royal shrink-0">
        {name.charAt(0)}
      </span>

      {/* Technology name */}
      <span className="font-term">
        {name}
      </span>

      {/* Burst particles */}
      {bursts.map((particle) => {
        const burstStyle: BurstStyle = {
          left: particle.x,
          top: particle.y,

          "--dx":
            `${particle.dx}px`,

          "--dy":
            `${particle.dy}px`,

          "--rot":
            `${particle.rot}deg`,

          animation:
            "burst-out 0.75s ease-out forwards",

          animationDelay:
            `${particle.delay}ms`,
        };

        return (
          <span
            key={particle.id}
            className="
              pointer-events-none
              absolute
              font-pixel
              text-[10px]
              text-royal
              flex
              items-center
              justify-center
              w-6
              h-6
              bg-paper
              border
              border-royal
              pixel-corners
              z-20
            "
            style={burstStyle}
          >
            {name.charAt(0)}
          </span>
        );
      })}
    </div>
  );
}



function TechGroup({
  group,
  groupIndex,
}: TechGroupProps) {
  const [ref, inView] =
    useInView();

  return (
    <div
      ref={ref}
      className="relative"
    >
      {/* Group heading */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div
            className="
              font-pixel
              text-xs
              text-royal
              shrink-0
            "
          >
            {String(groupIndex + 1).padStart(
              2,
              "0"
            )}
          </div>

          <h2
            className="
              font-pixel
              text-xl
              sm:text-2xl
              text-ink
            "
          >
            {group.title.toUpperCase()}
          </h2>
        </div>

        <div
          className="
            font-term
            text-sm
            text-ink/60
            shrink-0
          "
        >
          {group.items.length} tools
        </div>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-3
        "
      >
        {group.items.map(
          (item: TechItem, index: number) => (
            <TechCard
              key={`${group.title}-${item.n}`}
              name={item.n}
              index={index}
              inView={inView}
            />
          )
        )}
      </div>
    </div>
  );
}



const STATS = [
  {
    label: "Technologies",
    value: "23+",
  },
  {
    label: "Projects & prototypes",
    value: "10+",
  },
  {
    label: "Core domains",
    value: "5",
  },
  {
    label: "Built in-house",
    value: "100%",
  },
];



export default function TechnologiesPage() {
  const navigate = useNavigate();

  const [
    statsRef,
    statsInView,
  ] = useInView();

  return (
    <div>

      <PageHero
        eyebrow="TECHNOLOGIES"
        title="OUR STACK"
      />

      <section className="bg-milk py-20">
        <div className="max-w-6xl mx-auto px-6">


          <div
            ref={statsRef}
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mb-16
            "
          >
            {STATS.map(
              (stat, index) => (
                <div
                  key={stat.label}
                  className="
                    bg-paper
                    border-2
                    border-ink
                    pixel-corners
                    px-5
                    py-6
                    text-center
                    opacity-0
                  "
                  style={{
                    animation:
                      statsInView
                        ? "chip-in 0.45s ease-out forwards"
                        : "none",

                    animationDelay:
                      `${index * 90}ms`,
                  }}
                >
                  <div
                    className="
                      font-pixel
                      text-2xl
                      text-royal
                      mb-1
                    "
                  >
                    {stat.value}
                  </div>

                  <div
                    className="
                      text-xs
                      text-ink/60
                      font-medium
                    "
                  >
                    {stat.label}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-14">
            {TECH_GROUPS.map(
              (group, groupIndex) => (
                <TechGroup
                  key={group.title}
                  group={group}
                  groupIndex={groupIndex}
                />
              )
            )}
          </div>

          <div
            className="
              mt-20
              bg-royal/5
              border-2
              border-dashed
              border-royal/30
              pixel-corners
              p-8
              grid
              md:grid-cols-3
              gap-8
            "
          >
            <div>
              <div
                className="
                  font-pixel
                  text-xs
                  text-royal
                  mb-2
                "
              >
                WHY THIS STACK
              </div>

              <p
                className="
                  text-sm
                  text-ink/70
                  leading-relaxed
                "
              >
                We pick boring,
                battle-tested tools on
                purpose. Fewer surprises
                in production means
                faster ships for you.
              </p>
            </div>

            <div>
              <div
                className="
                  font-pixel
                  text-xs
                  text-royal
                  mb-2
                "
              >
                ALWAYS EVOLVING
              </div>

              <p
                className="
                  text-sm
                  text-ink/70
                  leading-relaxed
                "
              >
                We evaluate new tools
                constantly, but only
                graduate them here once
                they've earned it on real
                client work.
              </p>
            </div>

            <div>
              <div
                className="
                  font-pixel
                  text-xs
                  text-royal
                  mb-2
                "
              >
                FULL OWNERSHIP
              </div>

              <p
                className="
                  text-sm
                  text-ink/70
                  leading-relaxed
                "
              >
                From frontend to infra,
                our team ships the whole
                stack — no handoffs
                between vendors.
              </p>
            </div>
          </div>

        </div>
      </section>

      <CtaBand navigate={navigate} />
    </div>
  );
}