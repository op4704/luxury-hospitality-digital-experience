import type { Room } from "@/lib/types";
import { PHOTOS as P } from "./photos";

export const ROOMS: Room[] = [
  {
    slug: "canopy-suite",
    name: "Canopy Suite",
    kicker: "Eye level with the treetops",
    view: "Forest",
    sizeSqm: 68,
    maxGuests: 2,
    beds: "One king",
    pricePerNight: 640,
    summary:
      "Raised on teak stilts into the rosewood canopy, with a reading daybed that hangs over the slope.",
    story:
      "Hornbills pass at window height in the morning. The suite is built from reclaimed teak and laterite stone, with one long glass wall that slides away entirely, so the room and the forest become the same space by nine o'clock.",
    hero: P.bedWindow,
    gallery: [P.bedWindow, P.lounge, P.bathGreen, P.villaForest],
    amenities: ["Hanging daybed", "Rain shower", "Outdoor tub", "Espresso & tea bar", "Binoculars & field guide", "Turndown with jasmine"],
    floorPlan: [
      { id: "bed", label: "Bedroom", note: "King bed facing the glass wall", x: 20, y: 20, w: 170, h: 130 },
      { id: "daybed", label: "Daybed deck", note: "Cantilevered over the slope", x: 200, y: 20, w: 180, h: 80 },
      { id: "bath", label: "Bath", note: "Stone tub + rain shower", x: 20, y: 160, w: 130, h: 80 },
      { id: "lounge", label: "Lounge", note: "Reading chair and tea bar", x: 160, y: 110, w: 220, h: 130 },
    ],
    pairsWith: ["forest-bathing", "canopy-breakfast", "ayurvedic-ritual"],
  },
  {
    slug: "valley-pool-villa",
    name: "Valley Pool Villa",
    kicker: "A private pool above the clouds",
    view: "Valley",
    sizeSqm: 140,
    maxGuests: 3,
    beds: "One king + daybed",
    pricePerNight: 1120,
    summary:
      "A twelve-metre heated pool that runs to the edge of the ridge, where the valley fills with mist each morning.",
    story:
      "Wake early and the valley below is a white sea; by ten it has burned back to tea gardens and the river. The villa is arranged around the pool, so every room, bath included, opens to it.",
    hero: P.poolTimber,
    gallery: [P.poolTimber, P.bedTimber, P.bathStone, P.mistValley],
    amenities: ["12 m heated pool", "Outdoor shower", "Sunken lounge", "Private dining pavilion", "Butler on call", "Stargazing deck"],
    floorPlan: [
      { id: "pool", label: "Pool", note: "12 m, heated, ridge-edge", x: 20, y: 180, w: 360, h: 60 },
      { id: "bed", label: "Bedroom", note: "Opens fully to the pool deck", x: 20, y: 20, w: 150, h: 140 },
      { id: "lounge", label: "Sunken lounge", note: "Fireplace and long sofa", x: 180, y: 20, w: 120, h: 140 },
      { id: "bath", label: "Bath", note: "Stone tub under a skylight", x: 310, y: 20, w: 70, h: 140 },
    ],
    pairsWith: ["sunrise-ridge-walk", "private-dinner", "kalari-evening"],
  },
  {
    slug: "lake-pavilion",
    name: "Lake Pavilion",
    kicker: "Built at the water's edge",
    view: "Lake",
    sizeSqm: 96,
    maxGuests: 2,
    beds: "One king",
    pricePerNight: 890,
    summary:
      "A low stone pavilion on the reservoir shore with its own jetty and a wooden boat for the mornings.",
    story:
      "The lake is still enough at dawn to hold the whole ridge in it. Take the boat out before breakfast, or don't: the bed faces the water and the shutters fold back completely.",
    hero: P.bedLake,
    gallery: [P.bedLake, P.lakeSunrise, P.bathTub, P.lakeMist],
    amenities: ["Private jetty & rowboat", "Lakeside tub", "Fireplace", "Writing desk", "Vinyl & record library", "Picnic hamper"],
    floorPlan: [
      { id: "bed", label: "Bedroom", note: "Folding shutters to the lake", x: 20, y: 20, w: 200, h: 120 },
      { id: "bath", label: "Bath", note: "Lakeside tub, open to the deck", x: 230, y: 20, w: 150, h: 120 },
      { id: "deck", label: "Deck", note: "Firepit and two loungers", x: 20, y: 150, w: 250, h: 90 },
      { id: "jetty", label: "Jetty", note: "Rowboat moored here", x: 280, y: 150, w: 100, h: 90 },
    ],
    pairsWith: ["dawn-on-the-lake", "private-dinner", "forest-bathing"],
  },
  {
    slug: "garden-cottage",
    name: "Garden Cottage",
    kicker: "Spice garden, slow mornings",
    view: "Garden",
    sizeSqm: 54,
    maxGuests: 2,
    beds: "One queen",
    pricePerNight: 480,
    summary:
      "A whitewashed cottage set in the estate's cardamom and pepper gardens, with a shaded verandah.",
    story:
      "The smallest of our rooms and, for many returning guests, the favourite. Mornings start with the gardener's knock and a basket of whatever is ripe.",
    hero: P.bedTimber,
    gallery: [P.bedTimber, P.poolGarden, P.bedLinen, P.tea],
    amenities: ["Shaded verandah", "Garden shower", "Hammock", "Morning harvest basket", "Library selection", "Bicycle"],
    floorPlan: [
      { id: "bed", label: "Bedroom", note: "Queen bed under a vaulted roof", x: 20, y: 20, w: 220, h: 140 },
      { id: "bath", label: "Garden shower", note: "Open-sky shower wall", x: 250, y: 20, w: 130, h: 140 },
      { id: "verandah", label: "Verandah", note: "Hammock and breakfast table", x: 20, y: 170, w: 360, h: 70 },
    ],
    pairsWith: ["spice-garden-cooking", "tea-estate-trail", "ayurvedic-ritual"],
  },
  {
    slug: "ridge-residence",
    name: "Ridge Residence",
    kicker: "Two bedrooms, one long view",
    view: "Valley",
    sizeSqm: 220,
    maxGuests: 5,
    beds: "Two kings + bunk room",
    pricePerNight: 1680,
    summary:
      "Our largest home, for families and friends travelling together — two pavilions joined by a pool courtyard.",
    story:
      "Built for long stays. A private chef's kitchen, a courtyard pool and two separate sleeping pavilions, so everyone has the same view and nobody shares a wall.",
    hero: P.villaHills,
    gallery: [P.villaHills, P.poolForest, P.lounge, P.bathStone],
    amenities: ["Courtyard pool", "Chef's kitchen", "Two pavilions", "Children's bunk room", "Dedicated host", "Cinema projector"],
    floorPlan: [
      { id: "east", label: "East pavilion", note: "Primary bedroom + bath", x: 20, y: 20, w: 130, h: 220 },
      { id: "court", label: "Pool courtyard", note: "Shared pool and dining", x: 160, y: 60, w: 80, h: 180 },
      { id: "west", label: "West pavilion", note: "Second king + bunk room", x: 250, y: 20, w: 130, h: 220 },
      { id: "kitchen", label: "Kitchen", note: "Chef's kitchen and bar", x: 160, y: 20, w: 80, h: 32 },
    ],
    pairsWith: ["spice-garden-cooking", "kalari-evening", "sunrise-ridge-walk"],
  },
  {
    slug: "mist-loft",
    name: "Mist Loft",
    kicker: "Sleep above the weather",
    view: "Forest",
    sizeSqm: 82,
    maxGuests: 2,
    beds: "One king",
    pricePerNight: 760,
    summary:
      "A double-height loft with the bed under a skylight and a copper bath on the mezzanine.",
    story:
      "In monsoon the cloud rolls in through the valley and sits at the loft's windows. Light the fire, run the copper bath, and watch the forest disappear.",
    hero: P.lounge,
    gallery: [P.lounge, P.bathGreen, P.mistForest, P.bedLinen],
    amenities: ["Skylight bed", "Copper bath", "Wood-burning stove", "Mezzanine study", "Record player", "Monsoon kit"],
    floorPlan: [
      { id: "living", label: "Living", note: "Double height, stove", x: 20, y: 20, w: 200, h: 220 },
      { id: "bed", label: "Skylight bed", note: "Under open glass", x: 230, y: 20, w: 150, h: 110 },
      { id: "bath", label: "Copper bath", note: "On the mezzanine", x: 230, y: 140, w: 150, h: 100 },
    ],
    pairsWith: ["forest-bathing", "ayurvedic-ritual", "stargazing"],
  },
];

export const getRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
