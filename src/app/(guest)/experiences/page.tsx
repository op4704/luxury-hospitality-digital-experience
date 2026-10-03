import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ExperiencesBrowser } from "@/components/experiences/ExperiencesBrowser";
import { PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Ayurveda, fire-cooked dinners, sunrise ridge walks and Kathakali — add any experience at Aranya Estate to your stay.",
};

export default function ExperiencesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Live · Eleven ways to spend a day"
        title={"Everything is\noptional here."}
        intro="Some of it is unforgettable. Add what calls to you, and your concierge will arrange the rest around how you like to spend your days."
        photo={PHOTOS.mistValley}
      />
      <ExperiencesBrowser />
    </main>
  );
}
