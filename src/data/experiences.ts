import type { Experience } from "@/lib/types";
import { PHOTOS as P } from "./photos";

export const EXPERIENCES: Experience[] = [
  {
    slug: "ayurvedic-ritual",
    name: "The Ayurvedic Ritual",
    category: "Wellness",
    durationMins: 120,
    price: 220,
    summary: "Warm herbal oils, a steam of estate-grown herbs, and two hands working in rhythm.",
    story:
      "Our physician meets you first, reads your constitution, and blends the oils for you that morning. Then two therapists work in synchrony — abhyanga, followed by a herbal steam and a long, quiet rest on the pavilion.",
    image: P.spaRoom,
    schedule: [
      { time: "0:00", detail: "Consultation with the resident vaidya" },
      { time: "0:20", detail: "Four-hand abhyanga massage" },
      { time: "1:20", detail: "Herbal steam with estate-grown tulsi" },
      { time: "1:40", detail: "Rest and warm jeera water on the pavilion" },
    ],
    includes: ["Personal oil blend to take home", "Physician consultation", "Pavilion rest"],
  },
  {
    slug: "forest-bathing",
    name: "Forest Bathing",
    category: "Wellness",
    durationMins: 90,
    price: 90,
    summary: "A slow, guided walk through the shola forest with no destination and no phones.",
    story:
      "Led by our naturalist, the walk covers less than a kilometre. That is the point. You stop often, listen for the whistling thrush, and end at the stream with a cup of lemongrass tea.",
    image: P.stream,
    schedule: [
      { time: "6:30", detail: "Meet at the forest gate" },
      { time: "6:45", detail: "Silent walk through the shola" },
      { time: "7:45", detail: "Tea at the stream" },
    ],
    includes: ["Naturalist guide", "Lemongrass tea", "Field notebook"],
  },
  {
    slug: "private-dinner",
    name: "Dinner by the Fire",
    category: "Dining",
    durationMins: 150,
    price: 340,
    summary: "Seven courses cooked over coconut-husk embers, served wherever on the estate you choose.",
    story:
      "Chef Meera's tasting menu follows the estate's garden and the morning's catch from the lake. Choose the clearing, the jetty, or your own deck — the fire comes to you.",
    image: P.diningCandle,
    schedule: [
      { time: "19:00", detail: "Aperitif and a walk through the kitchen garden" },
      { time: "19:30", detail: "Seven courses over open fire" },
      { time: "21:30", detail: "Desserts and digestifs under the stars" },
    ],
    includes: ["Seven-course menu", "Wine pairing", "Private chef and server"],
  },
  {
    slug: "canopy-breakfast",
    name: "Breakfast in the Canopy",
    category: "Dining",
    durationMins: 75,
    price: 120,
    summary: "Appam, stew and filter coffee on a platform twenty metres up a rosewood tree.",
    story:
      "The platform is reached by a gentle rope stair. Breakfast is waiting when you arrive, and the hornbills usually are too.",
    image: P.plateCraft,
    schedule: [
      { time: "7:00", detail: "Ascend to the canopy platform" },
      { time: "7:10", detail: "Kerala breakfast and filter coffee" },
    ],
    includes: ["Breakfast for two", "Naturalist on call"],
  },
  {
    slug: "spice-garden-cooking",
    name: "The Spice Garden Table",
    category: "Dining",
    durationMins: 180,
    price: 160,
    summary: "Harvest pepper, cardamom and curry leaf, then cook a sadya lunch with our chef.",
    story:
      "Start in the garden with a basket. By noon you'll have made four dishes, eaten all of them on a banana leaf, and learned why fresh pepper tastes nothing like the jar.",
    image: P.plateDark,
    schedule: [
      { time: "9:30", detail: "Harvest walk in the spice garden" },
      { time: "10:30", detail: "Cooking class in the open kitchen" },
      { time: "12:30", detail: "Sadya lunch on banana leaf" },
    ],
    includes: ["Recipes printed on estate paper", "Spice box to take home"],
  },
  {
    slug: "sunrise-ridge-walk",
    name: "Sunrise Ridge Walk",
    category: "Adventure",
    durationMins: 150,
    price: 70,
    summary: "A pre-dawn climb to the ridge to watch the valley fill and empty of mist.",
    story:
      "Leave by torchlight at 5:15. The last stretch is steep, but the reward is the sunrise from above the cloud line, with hot chai poured from a flask.",
    image: P.sunriseHill,
    schedule: [
      { time: "5:15", detail: "Depart from the lodge by torchlight" },
      { time: "6:10", detail: "Sunrise from the ridge, chai served" },
      { time: "7:45", detail: "Return through the tea gardens" },
    ],
    includes: ["Guide", "Headlamps", "Flask chai and banana bread"],
  },
  {
    slug: "tea-estate-trail",
    name: "The Tea Estate Trail",
    category: "Adventure",
    durationMins: 240,
    price: 110,
    summary: "Cycle through neighbouring tea gardens to a 1920s factory for a private tasting.",
    story:
      "Electric bikes make the hills gentle. The route ends at a working factory where the manager walks you from withering racks to the cup.",
    image: P.teaHills,
    schedule: [
      { time: "8:00", detail: "Bike fitting and route briefing" },
      { time: "8:30", detail: "Ride through the tea gardens" },
      { time: "10:30", detail: "Factory tour and tasting" },
    ],
    includes: ["E-bike", "Guide", "Tasting of six teas"],
  },
  {
    slug: "dawn-on-the-lake",
    name: "Dawn on the Lake",
    category: "Adventure",
    durationMins: 90,
    price: 85,
    summary: "A wooden boat, a boatman who knows the birds, and the lake before anyone else.",
    story:
      "Kingfishers and cormorants work the water at first light. Bring a sweater; the mist is cold until the sun clears the ridge.",
    image: P.lakeSunrise,
    schedule: [
      { time: "5:45", detail: "Meet at the jetty" },
      { time: "6:00", detail: "Row across the reservoir" },
      { time: "7:15", detail: "Coffee on the far bank" },
    ],
    includes: ["Boatman and naturalist", "Blankets", "Coffee"],
  },
  {
    slug: "kalari-evening",
    name: "Kalari at Dusk",
    category: "Culture",
    durationMins: 60,
    price: 60,
    summary: "A private demonstration of Kalaripayattu, Kerala's ancient martial art, by oil-lamp light.",
    story:
      "Performed in our sunken kalari pit by a family that has taught the form for four generations. Stay after to try the first stances yourself.",
    image: P.theyyam,
    schedule: [
      { time: "18:30", detail: "Lamp-lighting in the kalari" },
      { time: "18:40", detail: "Demonstration" },
      { time: "19:15", detail: "Learn the opening stances" },
    ],
    includes: ["Private performance", "Short lesson"],
  },
  {
    slug: "kathakali-story",
    name: "The Kathakali Story",
    category: "Culture",
    durationMins: 120,
    price: 90,
    summary: "Watch an artist paint his face over an hour, then perform a chapter of the Mahabharata.",
    story:
      "The make-up is half the performance. Sit with the artist as the green and red is built up in rice paste, then watch the story told entirely with eyes and hands.",
    image: P.kathakali,
    schedule: [
      { time: "17:00", detail: "Make-up ritual, with commentary" },
      { time: "18:15", detail: "Performance in the courtyard" },
    ],
    includes: ["Seats in the courtyard", "Story notes"],
  },
  {
    slug: "stargazing",
    name: "Night Sky Session",
    category: "Culture",
    durationMins: 90,
    price: 75,
    summary: "No light pollution for forty kilometres. A telescope, an astronomer, and the Milky Way.",
    story:
      "On clear nights between November and April the band of the galaxy rises over the ridge. Our astronomer brings the telescope and the old stories that go with the stars.",
    image: P.stars,
    schedule: [
      { time: "21:00", detail: "Meet at the observation deck" },
      { time: "21:10", detail: "Telescope session and sky tour" },
    ],
    includes: ["Astronomer", "Blankets and hot chocolate"],
  },
];

export const CATEGORIES = ["Wellness", "Dining", "Adventure", "Culture"] as const;

export const getExperience = (slug: string) => EXPERIENCES.find((e) => e.slug === slug);
