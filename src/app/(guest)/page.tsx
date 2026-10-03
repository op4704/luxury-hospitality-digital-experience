import { Hero } from "@/components/home/Hero";
import { Arrival } from "@/components/home/Arrival";
import { Estate } from "@/components/home/Estate";
import { RoomsTeaser } from "@/components/home/RoomsTeaser";
import { ExperiencesMasonry } from "@/components/home/ExperiencesMasonry";
import { DayTimeline } from "@/components/home/DayTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { BeginCTA } from "@/components/home/BeginCTA";
import { ChapterRail } from "@/components/home/ChapterRail";

const CHAPTERS = [
  { id: "hero", label: "Aranya" },
  { id: "arrival", label: "Arrival" },
  { id: "estate", label: "The Estate" },
  { id: "stay", label: "Stay" },
  { id: "experiences", label: "Live" },
  { id: "day", label: "A day here" },
  { id: "voices", label: "Voices" },
  { id: "begin", label: "Reserve" },
];

/** The home page is one continuous story, chapter by chapter. */
export default function Home() {
  return (
    <main>
      <ChapterRail chapters={CHAPTERS} />
      <Hero />
      <Arrival />
      <Estate />
      <RoomsTeaser />
      <ExperiencesMasonry />
      <DayTimeline />
      <Testimonials />
      <BeginCTA />
    </main>
  );
}
