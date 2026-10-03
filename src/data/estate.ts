import type { DayMoment, Testimonial } from "@/lib/types";
import { PHOTOS as P } from "./photos";

export const ESTATE = {
  name: "Aranya Estate",
  place: "Western Ghats · Kerala",
  stats: [
    { value: 120, label: "Acres of shola forest" },
    { value: 18, label: "Villas & suites" },
    { value: 92, label: "Years in one family" },
  ],
};

export const DAY: DayMoment[] = [
  {
    time: "05:40",
    title: "First light",
    body: "Mist fills the valley below the ridge. The forest is loud with birdsong before the sun clears the hills.",
    image: P.mistValley,
    tint: "#2a2f33",
    ink: "light",
  },
  {
    time: "07:30",
    title: "Morning",
    body: "Filter coffee on the deck. The boatman is already back from the lake with the morning's catch for the kitchen.",
    image: P.lakeSunrise,
    tint: "#e9e2d6",
    ink: "dark",
  },
  {
    time: "13:00",
    title: "Midday",
    body: "Lunch on banana leaf, a swim, and the long, deliberate nothing of a hot afternoon in the shade.",
    image: P.poolForest,
    tint: "#f3eee6",
    ink: "dark",
  },
  {
    time: "18:10",
    title: "Dusk",
    body: "The lamps are lit in the kalari. Smoke from the kitchen fire drifts across the garden.",
    image: P.lakeDusk,
    tint: "#4a3220",
    ink: "light",
  },
  {
    time: "22:00",
    title: "Night",
    body: "No light for forty kilometres. The galaxy rises over the ridge, and the forest goes quiet.",
    image: P.starsTrees,
    tint: "#0e0d0b",
    ink: "light",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We came for three nights and stayed for nine. I have never slept like that anywhere.",
    name: "Clara & Jonas W.",
    from: "Hamburg",
    stay: "Lake Pavilion, March",
  },
  {
    quote: "The kind of place that changes your idea of what a holiday is supposed to feel like.",
    name: "Ananya R.",
    from: "Mumbai",
    stay: "Canopy Suite, December",
  },
  {
    quote: "Nobody asked us to do anything. Every single thing we wanted was simply already done.",
    name: "Marcus O.",
    from: "London",
    stay: "Ridge Residence, January",
  },
  {
    quote: "Our children still talk about breakfast in the tree. So, honestly, do we.",
    name: "The Fernandes family",
    from: "Lisbon",
    stay: "Ridge Residence, August",
  },
];

export const MARQUEE = [
  "Shola forest",
  "Private pools",
  "Ayurveda",
  "Lake mornings",
  "Fire-cooked dinners",
  "Tea gardens",
  "Dark skies",
];
