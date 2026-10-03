import Image from "next/image";
import Link from "next/link";
import {
  FadeUp,
  StaggerWords,
  ImageReveal,
} from "@/components/motion-primitives";

const IMG = {
  hero: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2400&auto=format&fit=crop",
  sailing: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1600&auto=format&fit=crop",
  dining: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
  spa: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
  yoga: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop",
  cooking: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop",
  night: "https://images.unsplash.com/photo-1722404557005-00b57aeb5126?q=80&w=1600&auto=format&fit=crop",
};

const EXPERIENCES = [
  {
    img: IMG.sailing,
    number: "01",
    name: "Sunset Sailing",
    description:
      "Board our teak day-boat for a slow glide along the cove as the coast turns gold, with local wine poured on deck.",
    duration: "2.5 hours",
    size: "Up to 6 guests",
  },
  {
    img: IMG.dining,
    number: "02",
    name: "Cliffside Dining",
    description:
      "A private table set at the edge of the terrace, a tasting menu built around the day's catch and estate olive oil.",
    duration: "3 hours",
    size: "2–8 guests",
  },
  {
    img: IMG.spa,
    number: "03",
    name: "Private Spa Ritual",
    description:
      "An hour of hot-stone and citrus-oil massage inside our cliffside treatment pavilion, windows open to the sea air.",
    duration: "75 minutes",
    size: "1–2 guests",
  },
  {
    img: IMG.yoga,
    number: "04",
    name: "Sunrise Yoga on the Point",
    description:
      "A quiet mat session on the rocky outcrop above the water, led before the island wakes, ending in a honey-lemon tea.",
    duration: "60 minutes",
    size: "Up to 10 guests",
  },
  {
    img: IMG.cooking,
    number: "05",
    name: "Lemon Grove Cooking Class",
    description:
      "Harvest citrus from the estate grove, then learn the family recipes for handmade pasta and limoncello in our open kitchen.",
    duration: "3 hours",
    size: "2–6 guests",
  },
  {
    img: IMG.night,
    number: "06",
    name: "Night Dive & Stargazing",
    description:
      "A guided twilight dive through the reef just offshore, surfacing to a blanket, a telescope, and a sky with no city light.",
    duration: "2 hours",
    size: "2–4 guests",
  },
];

export default function ExperiencesPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[70svh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={IMG.hero}
          alt="Guests enjoying the coastline at Alondra Cay"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-ink/40" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
          <FadeUp>
            <p className="text-cream/70 text-[11px] md:text-[12px] uppercase tracking-[0.2em] mb-5">
              Life on the island
            </p>
          </FadeUp>
          <h1 className="font-display text-cream text-[15vw] md:text-[7.5vw] leading-[0.92] tracking-tight">
            <StaggerWords text="Experiences" delay={0.2} />
          </h1>
          <FadeUp delay={0.5} className="max-w-md mt-8">
            <p className="text-cream/75 text-sm md:text-base leading-relaxed">
              Curated, unhurried, and arranged around you. Each experience at
              Alondra Cay is a small production — a boat, a chef, a therapist
              — built for the day you&apos;re actually having.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-cream px-6 md:px-10 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeUp>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
              Six ways to spend your days
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl">
              <StaggerWords text="Nothing on a" />
              <br />
              <span className="italic font-light text-stone">
                <StaggerWords text="schedule, everything" delay={0.08} />
              </span>
              <br />
              <StaggerWords text="on request." delay={0.16} />
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              href="/concierge"
              data-cursor-hover
              className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] border-b border-ink/30 pb-2 hover:border-ink transition-colors"
            >
              Speak with the concierge &rarr;
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* EXPERIENCES LIST — alternating editorial rows */}
      <section className="bg-cream px-6 md:px-10 pb-28 md:pb-40">
        <div className="mx-auto max-w-[1600px] flex flex-col gap-20 md:gap-28">
          {EXPERIENCES.map((exp, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={exp.name}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 items-center"
              >
                <div
                  className={`md:col-span-7 ${
                    reversed ? "md:col-start-6 md:order-2" : "md:order-1"
                  }`}
                >
                  <ImageReveal delay={0.05} className="aspect-[16/10]">
                    <Image
                      src={exp.img}
                      alt={exp.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                </div>

                <div
                  className={`md:col-span-4 ${
                    reversed
                      ? "md:col-start-1 md:order-1"
                      : "md:col-start-9 md:order-2"
                  }`}
                >
                  <FadeUp delay={0.1}>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-5">
                      {exp.number} — Experiences
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-5">
                      {exp.name}
                    </h3>
                    <p className="text-stone leading-relaxed mb-7 max-w-sm">
                      {exp.description}
                    </p>
                    <div className="flex gap-10 hairline border-t pt-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-stone-light mb-1">
                          Duration
                        </p>
                        <p className="text-sm text-ink">{exp.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-stone-light mb-1">
                          Group size
                        </p>
                        <p className="text-sm text-ink">{exp.size}</p>
                      </div>
                    </div>
                  </FadeUp>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-cream px-6 md:px-10 py-28 md:py-40 text-center">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-6">
            Plan your days
          </p>
        </FadeUp>
        <h2 className="font-display text-4xl md:text-7xl tracking-tight mb-10 max-w-4xl mx-auto leading-[1.02]">
          <StaggerWords text="Let us arrange" />
          <br />
          <span className="italic font-light">
            <StaggerWords text="your island." delay={0.08} />
          </span>
        </h2>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/booking"
              data-cursor-hover
              className="inline-flex items-center gap-3 bg-cream text-ink px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:bg-brass hover:text-cream transition-colors duration-300"
            >
              Check availability &rarr;
            </Link>
            <Link
              href="/concierge"
              data-cursor-hover
              className="inline-flex items-center gap-3 border border-cream/40 px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:border-cream transition-colors duration-300"
            >
              Talk to the concierge &rarr;
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
