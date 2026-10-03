import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Reserve",
  description: "Choose your dates, room and experiences, and reserve your stay at Aranya Estate.",
};

export default function BookingPage() {
  return (
    <main>
      <BookingFlow />
    </main>
  );
}
