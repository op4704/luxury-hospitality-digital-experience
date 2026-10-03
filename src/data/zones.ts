import type { PropertyZone } from "@/lib/types";
import { PHOTOS as P } from "./photos";

export const ZONES: PropertyZone[] = [
  {
    id: "villas",
    index: "01",
    name: "The Villas",
    description:
      "Eighteen villas and suites spread along the contour of the ridge, each turned so that no two share a view of one another.",
    position: [-3.2, 0.9, -0.6],
    camera: [-7.5, 5.2, 3.6],
    photos: [P.villaHills, P.bedWindow],
    links: [
      { label: "Canopy Suite", href: "/rooms/canopy-suite" },
      { label: "Valley Pool Villa", href: "/rooms/valley-pool-villa" },
    ],
    map: { x: 26, y: 38 },
  },
  {
    id: "pool",
    index: "02",
    name: "The Long Pool",
    description:
      "Forty metres of spring-fed water at the lip of the ridge, warm enough to swim in at dawn.",
    position: [0.4, 0.35, 1.4],
    camera: [3.2, 4.2, 7.4],
    photos: [P.poolForest, P.poolLoungers],
    links: [{ label: "Valley Pool Villa", href: "/rooms/valley-pool-villa" }],
    map: { x: 52, y: 58 },
  },
  {
    id: "spa",
    index: "03",
    name: "Ayurveda Pavilion",
    description:
      "Six treatment rooms in a laterite courtyard, built around a 200-year-old jackfruit tree.",
    position: [3.4, 0.5, -1.6],
    camera: [8, 4.6, 0.8],
    photos: [P.spaRoom, P.bathStone],
    links: [
      { label: "The Ayurvedic Ritual", href: "/experiences/ayurvedic-ritual" },
      { label: "Forest Bathing", href: "/experiences/forest-bathing" },
    ],
    map: { x: 74, y: 34 },
  },
  {
    id: "restaurant",
    index: "04",
    name: "Agni, the Fire Kitchen",
    description:
      "An open-sided dining hall around one long hearth. Everything is cooked over wood and coconut husk.",
    position: [0.8, 0.6, -2.8],
    camera: [2.6, 4.8, -8.2],
    photos: [P.diningCandle, P.diningOutdoor],
    links: [
      { label: "Dinner by the Fire", href: "/experiences/private-dinner" },
      { label: "The Spice Garden Table", href: "/experiences/spice-garden-cooking" },
    ],
    map: { x: 50, y: 22 },
  },
  {
    id: "forest",
    index: "05",
    name: "The Shola",
    description:
      "Eighty acres of protected montane forest with walking trails, a stream, and a canopy platform.",
    position: [-2.4, 1.1, 3],
    camera: [-6.8, 5.6, 8.4],
    photos: [P.stream, P.waterfall],
    links: [
      { label: "Forest Bathing", href: "/experiences/forest-bathing" },
      { label: "Breakfast in the Canopy", href: "/experiences/canopy-breakfast" },
    ],
    map: { x: 22, y: 74 },
  },
  {
    id: "lake",
    index: "06",
    name: "The Lake",
    description:
      "A still reservoir at the foot of the estate with a jetty, two rowboats, and the Lake Pavilion.",
    position: [4.2, -0.15, 3.2],
    camera: [9.6, 3.6, 8.6],
    photos: [P.lakeSunrise, P.lakeMist],
    links: [
      { label: "Lake Pavilion", href: "/rooms/lake-pavilion" },
      { label: "Dawn on the Lake", href: "/experiences/dawn-on-the-lake" },
    ],
    map: { x: 78, y: 72 },
  },
];
