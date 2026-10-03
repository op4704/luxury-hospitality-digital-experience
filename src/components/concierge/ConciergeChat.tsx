"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PHOTOS, PORTRAITS } from "@/data/photos";
import { useBooking } from "@/lib/store";
import { EASE, cn } from "@/lib/utils";

interface Msg {
  id: number;
  from: "guest" | "concierge";
  text: string;
  time: string;
}

const QUICK = [
  { label: "Book a spa slot", reply: "Of course. The Ayurveda pavilion has a four-hand ritual free tomorrow at 4pm, or Thursday at 10am in the morning light. Shall I hold one for you?", add: "ayurvedic-ritual" },
  { label: "Arrange airport transfer", reply: "Our driver Biju will meet you at Kochi arrivals with a name card and cold coconut water. It's three hours to the estate — would you like a stop at the tea factory on the way?" },
  { label: "Dinner reservation", reply: "Agni has the table by the hearth at 8pm, or I can have Chef Meera set dinner on your own deck under the stars. Which feels right for tonight?", add: "private-dinner" },
  { label: "Plan my day", reply: "Here's a gentle one: the lake at dawn with our boatman, breakfast in the canopy, an afternoon in the shade with a book, then Kalari by lamplight at 6:30. I can book all four.", add: "dawn-on-the-lake" },
];

const now = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export function ConciergeChat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, from: "concierge", text: "Good evening, and welcome to Aranya. I'm Lakshmi — I'll be looking after you before and during your stay. What can I arrange?", time: "18:02" },
  ]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const addExperience = useBooking((s) => s.addExperience);
  const nextId = useRef(1);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function send(text: string, reply?: string, add?: string) {
    if (!text.trim() || typing) return;
    setMsgs((m) => [...m, { id: nextId.current++, from: "guest", text, time: now() }]);
    setDraft("");
    setTyping(true);
    const answer =
      reply ??
      "Thank you — I've noted that and will come back to you within a few minutes. In the meantime, is there anything you'd like waiting in your room when you arrive?";
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: nextId.current++, from: "concierge", text: answer, time: now() }]);
      if (add) addExperience(add);
    }, 1400 + Math.min(answer.length * 12, 1600));
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image src={PHOTOS.diningOutdoor.src} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-bg/30" />

      <div className="relative container-x grid min-h-[100svh] grid-cols-1 lg:grid-cols-12 items-center gap-12 pt-28 pb-16">
        <div className="lg:col-span-5">
          <p className="eyebrow text-gold mb-6">Concierge · Always on</p>
          <h1 className="font-display text-display">
            Ask for <span className="italic font-light">anything.</span>
          </h1>
          <p className="mt-8 max-w-md text-ivory/80 leading-relaxed">
            A real person, by private message, before you arrive and all through your stay. Most requests are answered in minutes; the strange ones take a little longer.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="glass rounded-[28px] overflow-hidden flex flex-col h-[min(680px,78svh)]">
            <header className="flex items-center gap-4 border-b border-white/10 px-6 py-4">
              <span className="relative h-11 w-11 overflow-hidden rounded-full">
                <Image src={PORTRAITS.b} alt="" fill sizes="44px" className="object-cover" />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl leading-none">Lakshmi Menon</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-ivory/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8fc79a]" />
                  Head concierge · online
                </p>
              </div>
            </header>

            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4" aria-live="polite" aria-label="Conversation" data-lenis-prevent>
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={cn("flex", m.from === "guest" ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("max-w-[82%] rounded-[20px] px-4 py-3", m.from === "guest" ? "rounded-br-md bg-ivory text-bg" : "rounded-bl-md bg-white/10 text-ivory")}>
                      <p className="leading-relaxed text-[0.95rem]">{m.text}</p>
                      <p className={cn("mt-1 text-[0.65rem]", m.from === "guest" ? "text-bg/55" : "text-ivory/50")}>{m.time}</p>
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div key="typing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex">
                    <div className="flex items-center gap-1.5 rounded-[20px] rounded-bl-md bg-white/10 px-4 py-4" aria-label="Lakshmi is typing">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-ivory/80" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-white/10 px-4 pt-3 pb-4">
              <div className="mb-3 flex gap-2 overflow-x-auto [scrollbar-width:none]">
                {QUICK.map((q) => (
                  <button key={q.label} onClick={() => send(q.label, q.reply, q.add)} disabled={typing} className="shrink-0 rounded-full border border-white/15 px-3.5 py-2 text-xs text-ivory/85 transition-colors hover:border-gold hover:text-gold disabled:opacity-40">
                    {q.label}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(draft);
                }}
                className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 pl-5 pr-1.5 py-1.5"
              >
                <label htmlFor="chat-input" className="sr-only">Message</label>
                <input id="chat-input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write to Lakshmi…" className="flex-1 bg-transparent py-2 text-ivory placeholder:text-ivory/45 outline-none" autoComplete="off" />
                <button type="submit" disabled={!draft.trim() || typing} aria-label="Send" className="grid h-10 w-10 place-items-center rounded-full bg-gold text-bg transition-colors hover:bg-ivory disabled:opacity-40">↑</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
