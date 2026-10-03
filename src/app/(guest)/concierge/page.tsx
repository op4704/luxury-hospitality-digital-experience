import type { Metadata } from "next";
import { ConciergeChat } from "@/components/concierge/ConciergeChat";

export const metadata: Metadata = {
  title: "Concierge",
  description: "Message the Aranya concierge to book spa treatments, transfers, dinners or to plan your day.",
};

export default function ConciergePage() {
  return (
    <main>
      <ConciergeChat />
    </main>
  );
}
