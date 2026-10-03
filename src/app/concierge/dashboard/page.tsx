import type { Metadata } from "next";
import { ConciergeBoard } from "@/components/concierge/ConciergeBoard";

export const metadata: Metadata = { title: "Concierge desk", robots: { index: false } };

export default function ConciergeDashboardPage() {
  return <ConciergeBoard />;
}
