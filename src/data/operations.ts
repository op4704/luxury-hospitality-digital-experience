import type { Booking, Guest, GuestRequest } from "@/lib/types";
import { PORTRAITS } from "./photos";

export const GUESTS: Guest[] = [
  { id: "g1", name: "Clara Weiss", email: "clara.weiss@example.com", country: "Germany", visits: 3, preferences: ["Feather-free pillows", "Oat milk", "Late breakfast"], avatar: PORTRAITS.a },
  { id: "g2", name: "Ananya Rao", email: "ananya.rao@example.com", country: "India", visits: 1, preferences: ["Vegetarian", "Yoga at sunrise"], avatar: PORTRAITS.b },
  { id: "g3", name: "Marcus Osei", email: "marcus.osei@example.com", country: "United Kingdom", visits: 2, preferences: ["Whisky in villa", "Quiet room"], avatar: PORTRAITS.c },
  { id: "g4", name: "Sofia Fernandes", email: "sofia.f@example.com", country: "Portugal", visits: 4, preferences: ["Travelling with children", "Cot required"], avatar: PORTRAITS.d },
  { id: "g5", name: "Hana Sato", email: "hana.sato@example.com", country: "Japan", visits: 1, preferences: ["Gluten-free", "Anniversary"], avatar: PORTRAITS.e },
];

export const getGuest = (id: string) => GUESTS.find((g) => g.id === id);

export const BOOKINGS: Booking[] = [
  { ref: "AR-24K7Q", guestId: "g1", roomSlug: "lake-pavilion", checkIn: "2026-10-04", checkOut: "2026-10-09", guests: 2, experiences: ["dawn-on-the-lake", "private-dinner"], total: 5130, status: "checked-in" },
  { ref: "AR-31PZM", guestId: "g2", roomSlug: "canopy-suite", checkIn: "2026-10-06", checkOut: "2026-10-09", guests: 1, experiences: ["forest-bathing"], total: 2010, status: "confirmed" },
  { ref: "AR-58TRB", guestId: "g3", roomSlug: "ridge-residence", checkIn: "2026-10-03", checkOut: "2026-10-10", guests: 4, experiences: ["kalari-evening", "spice-garden-cooking"], total: 12280, status: "checked-in" },
  { ref: "AR-62LDX", guestId: "g4", roomSlug: "valley-pool-villa", checkIn: "2026-10-12", checkOut: "2026-10-17", guests: 3, experiences: ["canopy-breakfast"], total: 5720, status: "pending" },
  { ref: "AR-77HCN", guestId: "g5", roomSlug: "mist-loft", checkIn: "2026-10-15", checkOut: "2026-10-18", guests: 2, experiences: ["ayurvedic-ritual", "stargazing"], total: 2575, status: "confirmed" },
  { ref: "AR-80VWE", guestId: "g2", roomSlug: "garden-cottage", checkIn: "2026-10-20", checkOut: "2026-10-22", guests: 2, experiences: [], total: 960, status: "cancelled" },
  { ref: "AR-91GSA", guestId: "g1", roomSlug: "canopy-suite", checkIn: "2026-10-24", checkOut: "2026-10-28", guests: 2, experiences: ["ayurvedic-ritual"], total: 2780, status: "confirmed" },
];

export const REQUESTS: GuestRequest[] = [
  { id: "r1", guestId: "g1", roomSlug: "lake-pavilion", type: "Dinner reservation", detail: "Table on the jetty tonight, 8pm, for two.", createdAt: "2026-10-04T09:12:00", status: "new" },
  { id: "r2", guestId: "g3", roomSlug: "ridge-residence", type: "Airport transfer", detail: "Cochin airport pickup on the 10th, flight lands 14:20.", createdAt: "2026-10-04T08:40:00", status: "in-progress" },
  { id: "r3", guestId: "g3", roomSlug: "ridge-residence", type: "Spa slot", detail: "Two ayurvedic rituals tomorrow afternoon, back to back.", createdAt: "2026-10-04T07:55:00", status: "new" },
  { id: "r4", guestId: "g1", roomSlug: "lake-pavilion", type: "Plan my day", detail: "Something gentle for a rainy afternoon.", createdAt: "2026-10-03T18:30:00", status: "done" },
  { id: "r5", guestId: "g4", roomSlug: "valley-pool-villa", type: "Special request", detail: "Cot and a children's menu on arrival.", createdAt: "2026-10-03T11:05:00", status: "in-progress" },
];

/** Occupancy % per day for the admin chart (Oct 1–14). */
export const OCCUPANCY = [62, 66, 71, 78, 83, 80, 74, 69, 72, 81, 88, 93, 90, 85];
