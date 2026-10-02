"use client";

import dynamic from "next/dynamic";

const PropertyScene = dynamic(() => import("@/components/PropertyScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[80vh] min-h-[520px] md:h-[88vh] bg-cream-soft flex items-center justify-center">
      <p className="text-[11px] uppercase tracking-[0.18em] text-stone">
        Loading the island…
      </p>
    </div>
  ),
});

export default function PropertyExplorerClient() {
  return <PropertyScene />;
}
