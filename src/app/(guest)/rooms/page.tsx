import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { RoomsListing } from "@/components/rooms/RoomsListing";
import { PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Rooms & villas",
  description: "Canopy suites, lake pavilions and pool villas on the ridge. Compare every room at Aranya Estate by view, size, guests and price.",
};

export default function RoomsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Stay · 18 rooms, 6 kinds"
        title={"Rooms that open\nto the forest."}
        intro="Every room at Aranya is turned toward something worth waking up to — the canopy, the lake, or the valley filling with mist."
        photo={PHOTOS.poolTimber}
      />
      <div className="h-16 md:h-24" />
      <RoomsListing />
    </main>
  );
}
