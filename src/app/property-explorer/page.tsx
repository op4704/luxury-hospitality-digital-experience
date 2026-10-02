import type { Metadata } from "next";
import PropertyExplorerClient from "./PropertyExplorerClient";
import { FadeUp, StaggerWords } from "@/components/motion-primitives";

export const metadata: Metadata = {
  title: "Property Explorer — Alondra Cay",
};

export default function PropertyExplorerPage() {
  return (
    <main>
      <section className="bg-cream px-6 md:px-10 pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brass mb-6">
              Property Explorer
            </p>
          </FadeUp>
          <h1 className="font-display text-4xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            <StaggerWords text="Walk the island" />
            <br />
            <span className="italic font-light text-stone">
              <StaggerWords text="before you book." delay={0.08} />
            </span>
          </h1>
          <FadeUp delay={0.3} className="mt-8 max-w-md">
            <p className="text-stone leading-relaxed">
              An interactive map of the property. Select a hotspot to move
              through the cliffside — from the suite terraces down to the
              private cove.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-28 md:pb-40">
        <div className="mx-auto max-w-[1600px]">
          <PropertyExplorerClient />
        </div>
      </section>
    </main>
  );
}
