"use client";

import Image from "next/image";
import { FadeUp, StaggerWords, ImageReveal } from "@/components/motion-primitives";

const IMG = {
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop",
  philosophy: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1800&auto=format&fit=crop",
  staff1: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop&crop=faces",
  staff2: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop&crop=faces",
  staff3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop&crop=faces",
};

const SERVICES = [
  {
    index: "01",
    name: "Private Transport & Transfers",
    desc: "From the airstrip or harbor to your suite, every transfer is arranged in advance — private boat, car, or helicopter, timed to the minute and never rushed.",
  },
  {
    index: "02",
    name: "Dining Reservations",
    desc: "A quiet word to our concierge secures the table, the chef's tasting, or the private terrace — on the island or anywhere along the coast.",
  },
  {
    index: "03",
    name: "Spa & Wellness Scheduling",
    desc: "Treatments, rituals, and practitioners arranged around your rhythm, not a printed schedule. Morning or midnight, the spa team is ready.",
  },
  {
    index: "04",
    name: "Bespoke Excursions",
    desc: "Sailing at dawn, a vineyard visit, a cliffside hike with a local historian — built around your interests and arranged without a single email from you.",
  },
];

const TEAM = [
  {
    img: IMG.staff1,
    name: "Marco Albani",
    role: "Head Concierge",
  },
  {
    img: IMG.staff2,
    name: "Elena Russo",
    role: "Guest Relations Lead",
  },
  {
    img: IMG.staff3,
    name: "Dario Conti",
    role: "Private Travel & Transfers",
  },
];

export default function ConciergePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <ImageReveal className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="Concierge desk at Alondra Cay"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
        </ImageReveal>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
          <FadeUp>
            <p className="text-cream/70 text-[11px] md:text-[12px] uppercase tracking-[0.2em] mb-5">
              Guest Services
            </p>
          </FadeUp>
          <h1 className="font-display text-cream text-[15vw] md:text-[7.5vw] leading-[0.92] tracking-tight">
            <StaggerWords text="Concierge" delay={0.2} />
          </h1>
          <FadeUp delay={0.5} className="max-w-md mt-8">
            <p className="text-cream/75 text-sm md:text-base leading-relaxed italic font-light">
              Anything you need, arranged quietly.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">
          <div className="md:col-span-5">
            <ImageReveal className="aspect-[4/5]">
              <Image
                src={IMG.philosophy}
                alt="Concierge arranging details for a guest"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
                The philosophy
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-tight mb-8">
              <StaggerWords text="Service that" />
              <br />
              <span className="italic font-light text-stone">
                <StaggerWords text="asks nothing" delay={0.08} />
              </span>
              <br />
              <StaggerWords text="of you." delay={0.16} />
            </h2>
            <FadeUp delay={0.3} className="max-w-md">
              <p className="text-stone leading-relaxed">
                Our concierge team works a day ahead of you, not beside you.
                Requests are often resolved before they&apos;re spoken aloud —
                a favorite wine chilled, a table held, a car waiting. This is
                hospitality practiced quietly, so your only task on the
                island is to rest.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="bg-ink text-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 md:mb-20">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-6">
                What we arrange
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl">
              <StaggerWords text="Every detail," />
              <br />
              <span className="italic font-light">
                <StaggerWords text="handled in advance." delay={0.08} />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-16">
            {SERVICES.map((service, i) => (
              <FadeUp key={service.name} delay={i * 0.08}>
                <div className="border-t border-cream/20 pt-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-4">
                    {service.index}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl mb-4">
                    {service.name}
                  </h3>
                  <p className="text-cream/60 leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 md:mb-20">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
                Meet the team
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl">
              <StaggerWords text="The people behind" />
              <br />
              <span className="italic font-light text-stone">
                <StaggerWords text="the quiet." delay={0.08} />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {TEAM.map((member, i) => (
              <div key={member.name}>
                <ImageReveal delay={i * 0.1} className="aspect-[4/5] mb-6">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </ImageReveal>
                <p className="font-display text-2xl">{member.name}</p>
                <p className="text-stone text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST FORM */}
      <section className="bg-ink text-cream px-6 md:px-10 py-28 md:py-40">
        <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10">
          <div className="md:col-span-5">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-6">
                Make a request
              </p>
            </FadeUp>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.04] tracking-tight mb-10">
              <StaggerWords text="Tell us what" />
              <br />
              <span className="italic font-light">
                <StaggerWords text="you need." delay={0.08} />
              </span>
            </h2>
            <FadeUp delay={0.3} className="max-w-sm">
              <p className="text-cream/60 leading-relaxed mb-12">
                Reach us directly, any hour. Our concierge desk is staffed
                around the clock for guests currently in residence, and
                happy to help in advance of your arrival.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="space-y-5">
                <a
                  href="tel:+39081234567"
                  data-cursor-hover
                  className="flex items-center justify-between border-b border-cream/20 pb-4 group"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">
                    Phone
                  </span>
                  <span className="text-cream group-hover:text-brass-light transition-colors">
                    +39 081 234 567
                  </span>
                </a>
                <a
                  href="mailto:concierge@alondracay.com"
                  data-cursor-hover
                  className="flex items-center justify-between border-b border-cream/20 pb-4 group"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">
                    Email
                  </span>
                  <span className="text-cream group-hover:text-brass-light transition-colors">
                    concierge@alondracay.com
                  </span>
                </a>
                <a
                  href="https://wa.me/39081234567"
                  data-cursor-hover
                  className="flex items-center justify-between border-b border-cream/20 pb-4 group"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">
                    WhatsApp
                  </span>
                  <span className="text-cream group-hover:text-brass-light transition-colors">
                    +39 081 234 567
                  </span>
                </a>
              </div>
            </FadeUp>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <FadeUp delay={0.15}>
              <form className="space-y-10">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[11px] uppercase tracking-[0.16em] text-cream/50 mb-4"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-cream outline-none py-3 text-cream placeholder:text-cream/30 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] uppercase tracking-[0.16em] text-cream/50 mb-4"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-cream outline-none py-3 text-cream placeholder:text-cream/30 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="details"
                    className="block text-[11px] uppercase tracking-[0.16em] text-cream/50 mb-4"
                  >
                    Request details
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    placeholder="Tell us what you'd like arranged&hellip;"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-cream outline-none py-3 text-cream placeholder:text-cream/30 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  data-cursor-hover
                  className="inline-flex items-center gap-3 bg-cream text-ink px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:bg-brass hover:text-cream transition-colors duration-300"
                >
                  Submit request &rarr;
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
