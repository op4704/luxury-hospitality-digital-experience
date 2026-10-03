import type { Metadata } from "next";
import { Explorer } from "@/components/three/Explorer";

export const metadata: Metadata = {
  title: "Explore the estate",
  description: "Walk Aranya Estate in 3D — the villas, the long pool, the Ayurveda pavilion, the fire kitchen, the shola forest and the lake.",
};

export default function ExplorePage() {
  return (
    <main>
      <Explorer />
    </main>
  );
}
