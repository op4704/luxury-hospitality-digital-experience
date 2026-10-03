import Image from "next/image";
import Link from "next/link";
import {
  FadeUp,
  StaggerWords,
  ImageReveal,
} from "@/components/motion-primitives";

const IMG = {
  hero: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2400&auto=format&fit=crop",
  cliffside: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1800&auto=format&fit=crop",
  grove: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1800&auto=format&fit=crop",
  tide: "https://images.unsplash.com/photo-1734910619489-c68fede32351?q=80&w=1800&auto=format&fit=crop",
  horizon: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1800&auto=format&fit=crop",
  olive: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1800&auto=format&fit=crop",
};

const rooms = [
  {
    img: IMG.cliffside,
    name: "The Cliffside Suite",
    size: "72 m²",
    features: ["Private plunge pool", "Floor-to-ceiling sea view", "Outdoor rain shower"],
    description:
      "Perched at the edge of the escarpment, this suite trades walls for glass wherever the view allows. Mornings arrive here before they reach the rest of the island.",
  },
  {
    img: IMG.grove,
    name: "The Grove Villa",
    size: "110 m²",
    features: ["Two private terraces", "Outdoor soaking tub", "Dedicated breakfast nook"],
    description:
      "Set among old olive trees just back from the cliff line, the Grove Villa is built for slow mornings and longer stays. Its second terrace catches the evening light the main house never sees.",
  },
  {
    img: IMG.tide,
    name: "The Tide Room",
    size: "54 m²",
    features: ["Ground-level cove access", "Stone soaking tub", "Linen and travertine interiors"],
    description:
      "The smallest of our rooms and the closest to the water — step straight from the terrace onto the path down to the cove. Everything inside is built to disappear into quiet.",
  },
  {
    img: IMG.horizon,
    name: "The Horizon Loft",
    size: "88 m²",
    features: ["Double-height windows", "Private rooftop deck", "Reading mezzanine"],
    description:
      "A vertical suite built around a single uninterrupted view of the water, with a rooftop deck reserved for nothing but stars and late conversation. The mezzanine above the bed is where most guests end up reading.",
  },
  {
    img: IMG.olive,
    name: "The Olive Terrace",
    size: "65 m²",
    features: ["Private garden terrace", "Outdoor dining table", "Shaded daybed"],
    description:
      "Tucked into the terraced groves behind the main house, this room trades ocean views for total privacy among the olive trees. The terrace table has hosted more long lunches than any other spot on the property.",
  },
];

export default function Rooms() {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <ImageReveal className="absolute inset-0">
          <Image
            src={IMG.hero}
            alt="A sunlit suite at Alondra Cay"
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
              Stay
            </p>
          </FadeUp>
          <h1 className="font-display text-cream text-[15vw] md:text-[7.5vw] leading-[0.92] tracking-tight">
            <StaggerWords text="Rooms &" delay={0.15} />
            <br />
            <span className="italic font-light">
              <StaggerWords text="suites." delay={0.27} />
            </span>
          </h1>
          <FadeUp delay={0.6} className="max-w-md mt-10">
            <p className="text-cream/75 text-sm md:text-base leading-relaxed">
              Five rooms, each shaped by its place on the cliff rather than a
              floor plan — from a ground-level room steps from the cove to a
              two-terrace villa among the olive trees.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ROOM LISTINGS */}
      {rooms.map((room, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <section
            key={room.name}
            className={`px-6 md:px-10 py-20 md:py-32 ${
              i % 2 === 0 ? "bg-cream" : "bg-ink text-cream"
            }`}
          >
            <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center">
              <div
                className={`md:col-span-7 ${
                  imageFirst ? "md:order-1" : "md:order-2"
                }`}
              >
                <ImageReveal className="aspect-[4/5] md:aspect-[16/11]">
                  <Image
                    src={room.img}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                  />
                </ImageReveal>
              </div>

              <div
                className={`md:col-span-4 ${
                  imageFirst
                    ? "md:order-2 md:col-start-9"
                    : "md:order-1 md:col-start-1"
                }`}
              >
                <FadeUp>
                  <p
                    className={`text-[11px] uppercase tracking-[0.18em] mb-6 ${
                      i % 2 === 0 ? "text-brass" : "text-brass-light"
                    }`}
                  >
                    {room.size}
                  </p>
                </FadeUp>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight mb-6">
                  {room.name}
                </h2>
                <FadeUp delay={0.1}>
                  <p
                    className={`leading-relaxed mb-8 max-w-sm ${
                      i % 2 === 0 ? "text-stone" : "text-cream/75"
                    }`}
                  >
                    {room.description}
                  </p>
                </FadeUp>
                <FadeUp delay={0.18}>
                  <ul
                    className={`flex flex-col gap-2 mb-10 text-sm ${
                      i % 2 === 0 ? "text-stone" : "text-cream/70"
                    }`}
                  >
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <span
                          className={`w-4 h-px ${
                            i % 2 === 0 ? "bg-ink/30" : "bg-cream/40"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </FadeUp>
                <FadeUp delay={0.26}>
                  <Link
                    href="/booking"
                    data-cursor-hover
                    className={`inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] border-b pb-2 transition-colors ${
                      i % 2 === 0
                        ? "border-ink/30 hover:border-ink"
                        : "border-cream/40 hover:border-cream"
                    }`}
                  >
                    View suite &rarr;
                  </Link>
                </FadeUp>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-cream px-6 md:px-10 py-28 md:py-40 text-center">
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
            Reserve your stay
          </p>
        </FadeUp>
        <h2 className="font-display text-4xl md:text-7xl tracking-tight mb-10 max-w-4xl mx-auto leading-[1.02]">
          <StaggerWords text="Find your room" />
          <br />
          <span className="italic font-light text-stone">
            <StaggerWords text="on the cliff." delay={0.08} />
          </span>
        </h2>
        <FadeUp delay={0.3}>
          <Link
            href="/booking"
            data-cursor-hover
            className="inline-flex items-center gap-3 border border-ink px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:bg-ink hover:text-cream transition-colors duration-300"
          >
            Check availability &rarr;
          </Link>
        </FadeUp>
      </section>
    </main>
  );
}
