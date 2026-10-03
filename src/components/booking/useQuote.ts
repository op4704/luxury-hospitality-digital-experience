"use client";

import { getRoom } from "@/data/rooms";
import { getExperience } from "@/data/experiences";
import { nightsBetween } from "@/lib/utils";
import { useBooking } from "@/lib/store";

export const TAX_RATE = 0.12;

/** Derived, itemised pricing for the current booking. */
export function useQuote() {
  const s = useBooking();
  const room = s.roomSlug ? getRoom(s.roomSlug) : undefined;
  const nights = nightsBetween(s.checkIn, s.checkOut);
  const guests = s.adults + s.children;
  const exps = s.experiences.map((e) => getExperience(e)).filter((e): e is NonNullable<typeof e> => !!e);
  const roomTotal = room ? room.pricePerNight * nights : 0;
  const expTotal = exps.reduce((t, e) => t + e.price * Math.max(1, s.adults), 0);
  const subtotal = roomTotal + expTotal;
  const taxes = Math.round(subtotal * TAX_RATE);
  return { ...s, room, nights, guests, exps, roomTotal, expTotal, subtotal, taxes, total: subtotal + taxes };
}
