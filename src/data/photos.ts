import type { Photo } from "@/lib/types";

const U = (id: string) => `https://images.unsplash.com/photo-${id}`;

/** Curated, HTTP-verified Unsplash photos (free licence). */
export const PHOTOS = {
  mistValley: { src: U("1504252060324-1c76e2e09939"), alt: "Morning fog rolling over forested mountain ridges" },
  mistForest: { src: U("1486707471592-8e7eb7e36f78"), alt: "Grey forest dissolving into fog" },
  sunriseHill: { src: U("1723520774915-5fee930768b9"), alt: "Low sun breaking over a grassy hillside" },
  foggyValley: { src: U("1657038455205-905f4bf574be"), alt: "A valley of trees softened by mist" },

  villaHills: { src: U("1789591901246-2d6f0e538fdc"), alt: "Timber villas tucked into a steep, green tropical hillside" },
  villaForest: { src: U("1676794944553-399cade9cd39"), alt: "A villa sitting in the middle of lush forest" },
  poolForest: { src: U("1636484807510-bc2ffbaf3241"), alt: "A long pool edged by dense green trees" },
  poolLoungers: { src: U("1721222204632-bf9abe6f023f"), alt: "Two loungers beside a still pool" },
  poolTimber: { src: U("1596178067639-5c6e68aea6dc"), alt: "A timber villa opening onto a private pool" },
  poolGarden: { src: U("1654482278660-14a8cfd5589d"), alt: "A small plunge pool set inside a garden" },
  poolAerial: { src: U("1728049006343-9ee0187643d5"), alt: "Aerial view of a pool wrapped in greenery" },
  villaAerial: { src: U("1728049006562-236e5b0dddea"), alt: "Aerial view of a villa roof among the trees" },

  bedWindow: { src: U("1729605412184-8d796f9c6f66"), alt: "A wide bed facing a floor-to-ceiling window" },
  bedTimber: { src: U("1731336478850-6bce7235e320"), alt: "White linen against a warm wooden headboard" },
  bedLake: { src: U("1641133639375-f71c3c1220a1"), alt: "A bedroom with a large window over the water" },
  lounge: { src: U("1646974400439-321c4a9240b9"), alt: "A quiet living area with low seating and tall windows" },
  bedLinen: { src: U("1630999295881-e00725e1de45"), alt: "Crisp bed linen beside a linen curtain" },

  bathStone: { src: U("1717497043540-d45bf85e5d38"), alt: "A freestanding bath beside an indoor plant" },
  bathGreen: { src: U("1729638652129-ae17010946b6"), alt: "A soaking tub against a deep green wall" },
  bathTub: { src: U("1688786219616-598ed96aa19d"), alt: "A bathtub in a sunlit corner with greenery" },

  spaRoom: { src: U("1745327883290-1e9c6447b938"), alt: "A calm massage room prepared for a treatment" },
  spaDetail: { src: U("1630835425197-50feeba99ecd"), alt: "A pared-back treatment space in soft light" },

  diningCandle: { src: U("1772479020020-9bd8d2f577d0"), alt: "Dinner by candlelight with shared plates" },
  diningRoom: { src: U("1775340965436-55ddbea71d8f"), alt: "A dim dining room set for the evening" },
  diningOutdoor: { src: U("1781912823378-837f967146c1"), alt: "An open-air table framed by white drapes" },
  diningPlants: { src: U("1772479036537-2f24be392ab0"), alt: "Restaurant tables among plants and low lamps" },
  plateDark: { src: U("1499715217757-2aa48ed7e593"), alt: "A composed dish on a dark ceramic plate" },
  plateCraft: { src: U("1542197745-c70e10f66af8"), alt: "A plated course with fresh vegetables" },

  tea: { src: U("1758390286386-87c9d78cf9be"), alt: "Rows of tea bushes across a green hillside" },
  teaHills: { src: U("1711192702535-eac61a78ecb0"), alt: "Layered hills of tea under a pale sky" },
  waterfall: { src: U("1754593797753-cfd6b3d298b2"), alt: "A waterfall stepping down mossy rock" },
  stream: { src: U("1714234478549-34872438ad3e"), alt: "A stream running through dense forest" },
  falls: { src: U("1681129770298-71fe1faec7d1"), alt: "A small waterfall inside the forest" },

  kathakali: { src: U("1680204832081-6769d42b7a53"), alt: "A Kathakali performer in full costume and painted face" },
  theyyam: { src: U("1691075213372-ff9e2d6d7645"), alt: "A ritual performer in a vivid red costume" },
  backwater: { src: U("1704365159871-6bf63f00b9c8"), alt: "A boat moving along a river lined with palms" },

  lakeMist: { src: U("1605666649441-5f838029a11a"), alt: "A lake surface lost in fog" },
  lakeSunrise: { src: U("1755870344289-00ac1db1b144"), alt: "A small boat on the lake at sunrise" },
  lakeDusk: { src: U("1600254941405-c1abadfcf408"), alt: "A boat silhouetted on still water at dusk" },

  stars: { src: U("1718376282529-65d511527225"), alt: "A night sky full of stars above the treeline" },
  starsTrees: { src: U("1777659948114-be695e54ecbe"), alt: "Stars over silhouetted trees" },
  fire: { src: U("1558571196-0b0152de294c"), alt: "Wood burning in an open fire at night" },

  forestAerial: { src: U("1650458091994-22fda5da2da2"), alt: "A bird's-eye view of a house hidden in forest" },
  riverPool: { src: U("1787945836456-095ad9d899e1"), alt: "Aerial view of a pool beside a rocky forest river" },
} satisfies Record<string, Photo>;

export const PORTRAITS = {
  a: U("1489278353717-f64c6ee8a4d2"),
  b: U("1534180477871-5d6cc81f3920"),
  c: U("1506863530036-1efeddceb993"),
  d: U("1630939687530-241d630735df"),
  e: U("1564564295391-7f24f26f568b"),
};
