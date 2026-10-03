"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Role } from "./types";

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  requests?: string;
}

interface BookingState {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  roomSlug: string | null;
  experiences: string[];
  details: GuestDetails | null;
  confirmedRef: string | null;
  setDates: (checkIn: string | null, checkOut: string | null) => void;
  setGuests: (adults: number, children: number) => void;
  setRoom: (slug: string | null) => void;
  toggleExperience: (slug: string) => void;
  addExperience: (slug: string) => void;
  setDetails: (d: GuestDetails) => void;
  confirm: () => string;
  reset: () => void;
}

const initial = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  roomSlug: null,
  experiences: [] as string[],
  details: null,
  confirmedRef: null,
};

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      ...initial,
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (adults, children) => set({ adults, children }),
      setRoom: (roomSlug) => set({ roomSlug }),
      toggleExperience: (slug) =>
        set((s) => ({
          experiences: s.experiences.includes(slug)
            ? s.experiences.filter((e) => e !== slug)
            : [...s.experiences, slug],
        })),
      addExperience: (slug) =>
        set((s) => (s.experiences.includes(slug) ? s : { experiences: [...s.experiences, slug] })),
      setDetails: (details) => set({ details }),
      confirm: () => {
        const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "";
        for (let i = 0; i < 5; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
        const ref = `AR-${code}`;
        set({ confirmedRef: ref });
        return ref;
      },
      reset: () => set({ ...initial }),
    }),
    { name: "aranya-booking", storage: createJSONStorage(() => localStorage), skipHydration: true }
  )
);

interface UIState {
  role: Role;
  setRole: (r: Role) => void;
}

export const useUI = create<UIState>()(
  persist((set) => ({ role: "guest", setRole: (role) => set({ role }) }), {
    name: "aranya-ui",
    storage: createJSONStorage(() => localStorage),
    skipHydration: true,
  })
);
