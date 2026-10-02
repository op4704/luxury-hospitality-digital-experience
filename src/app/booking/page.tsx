"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeUp, StaggerWords, ImageReveal } from "@/components/motion-primitives";

const ROOMS = [
  {
    name: "The Cliffside Suite",
    price: 1250,
    detail: "72 m² · Private plunge pool",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "The Grove Villa",
    price: 1680,
    detail: "110 m² · Two terraces",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "The Tide Room",
    price: 980,
    detail: "48 m² · Sea-level terrace",
    img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "The Horizon Loft",
    price: 1420,
    detail: "85 m² · Panoramic deck",
    img: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "The Olive Terrace",
    price: 1120,
    detail: "60 m² · Private olive grove",
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop",
  },
] as const;

export default function Booking() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [guests, setGuests] = useState(2);
  const selectedRoom = ROOMS[roomIndex];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <main>
      {/* HEADER */}
      <section className="bg-ink text-cream px-6 md:px-10 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1600px]">
          <FadeUp>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brass-light mb-6">
              Reservations
            </p>
          </FadeUp>
          <h1 className="font-display text-4xl md:text-7xl tracking-tight leading-[1.02] max-w-3xl">
            <StaggerWords text="Reserve your" />{" "}
            <span className="italic font-light">
              <StaggerWords text="stay." delay={0.08} />
            </span>
          </h1>
          <FadeUp delay={0.3} className="mt-8 max-w-md">
            <p className="text-cream/70 leading-relaxed">
              Share your dates and a few details — our concierge team will
              confirm your reservation personally, usually within a day.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FORM + SUMMARY */}
      <section className="bg-cream px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10">
          {/* FORM */}
          <div className="md:col-span-7">
            <FadeUp>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="checkin"
                      className="text-[10px] uppercase tracking-[0.16em] text-stone"
                    >
                      Check-in
                    </label>
                    <input
                      id="checkin"
                      name="checkin"
                      type="date"
                      required
                      className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="checkout"
                      className="text-[10px] uppercase tracking-[0.16em] text-stone"
                    >
                      Check-out
                    </label>
                    <input
                      id="checkout"
                      name="checkout"
                      type="date"
                      required
                      className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink transition-colors"
                    />
                  </div>
                </div>

                {/* Guests + Room */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.16em] text-stone">
                      Guests
                    </label>
                    <div className="flex items-center justify-between border-b border-ink/20 py-2">
                      <button
                        type="button"
                        data-cursor-hover
                        aria-label="Decrease guests"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                      >
                        &minus;
                      </button>
                      <span className="text-ink">{guests}</span>
                      <button
                        type="button"
                        data-cursor-hover
                        aria-label="Increase guests"
                        onClick={() => setGuests((g) => Math.min(8, g + 1))}
                        className="w-7 h-7 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="room"
                      className="text-[10px] uppercase tracking-[0.16em] text-stone"
                    >
                      Room / Suite
                    </label>
                    <select
                      id="room"
                      name="room"
                      value={roomIndex}
                      onChange={(e) => setRoomIndex(Number(e.target.value))}
                      data-cursor-hover
                      className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink transition-colors appearance-none cursor-pointer"
                    >
                      {ROOMS.map((room, i) => (
                        <option key={room.name} value={i}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="h-px bg-ink/10 my-2" />

                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-[10px] uppercase tracking-[0.16em] text-stone"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] uppercase tracking-[0.16em] text-stone"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-[10px] uppercase tracking-[0.16em] text-stone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 212 555 0100"
                      className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="requests"
                    className="text-[10px] uppercase tracking-[0.16em] text-stone"
                  >
                    Special requests
                  </label>
                  <textarea
                    id="requests"
                    name="requests"
                    rows={4}
                    placeholder="Anniversary, dietary notes, late arrival..."
                    className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 text-ink placeholder:text-ink/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor-hover
                  className="mt-4 inline-flex items-center justify-center gap-3 bg-ink text-cream px-10 py-4 text-[12px] uppercase tracking-[0.16em] hover:bg-brass transition-colors duration-300 self-start"
                >
                  Request reservation &rarr;
                </button>
              </form>
            </FadeUp>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="md:col-span-5">
            <FadeUp delay={0.15}>
              <div className="sticky top-28">
                <ImageReveal className="aspect-[4/5] mb-6">
                  <Image
                    src={selectedRoom.img}
                    alt={selectedRoom.name}
                    fill
                    className="object-cover"
                  />
                </ImageReveal>

                <p className="text-[10px] uppercase tracking-[0.14em] text-stone mb-2">
                  Your selection
                </p>
                <p className="font-display text-2xl mb-1">{selectedRoom.name}</p>
                <p className="text-stone text-sm mb-6">{selectedRoom.detail}</p>

                <div className="flex items-baseline gap-2 border-t border-ink/10 pt-6 mb-6">
                  <span className="font-display text-3xl">
                    &euro;{selectedRoom.price.toLocaleString()}
                  </span>
                  <span className="text-stone text-sm">/ night, from</span>
                </div>

                <p className="text-stone text-sm leading-relaxed border-t border-ink/10 pt-6">
                  This is a request, not an instant booking. Our concierge
                  team reviews every reservation personally and confirms
                  availability — along with any arrangements for your stay —
                  within 24 hours.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
