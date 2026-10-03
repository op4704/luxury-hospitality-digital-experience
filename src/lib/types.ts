export type Role = "guest" | "concierge" | "admin";

export interface Photo {
  src: string;
  alt: string;
}

export type RoomView = "Valley" | "Forest" | "Lake" | "Garden";

export interface Room {
  slug: string;
  name: string;
  kicker: string;
  view: RoomView;
  sizeSqm: number;
  maxGuests: number;
  beds: string;
  pricePerNight: number;
  summary: string;
  story: string;
  hero: Photo;
  gallery: Photo[];
  amenities: string[];
  floorPlan: FloorZone[];
  pairsWith: string[];
}

export interface FloorZone {
  id: string;
  label: string;
  note: string;
  /** SVG rect in a 400x260 viewBox */
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ExperienceCategory = "Wellness" | "Dining" | "Adventure" | "Culture";

export interface Experience {
  slug: string;
  name: string;
  category: ExperienceCategory;
  durationMins: number;
  price: number;
  summary: string;
  story: string;
  image: Photo;
  schedule: { time: string; detail: string }[];
  includes: string[];
}

export type ZoneId = "villas" | "pool" | "spa" | "restaurant" | "forest" | "lake";

export interface PropertyZone {
  id: ZoneId;
  index: string;
  name: string;
  description: string;
  position: [number, number, number];
  camera: [number, number, number];
  photos: Photo[];
  links: { label: string; href: string }[];
  /** % position on the 2D fallback map */
  map: { x: number; y: number };
}

export type BookingStatus = "confirmed" | "pending" | "checked-in" | "cancelled";

export interface Guest {
  id: string;
  name: string;
  email: string;
  country: string;
  visits: number;
  preferences: string[];
  avatar: string;
}

export interface Booking {
  ref: string;
  guestId: string;
  roomSlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  experiences: string[];
  total: number;
  status: BookingStatus;
}

export type RequestStatus = "new" | "in-progress" | "done";

export interface GuestRequest {
  id: string;
  guestId: string;
  roomSlug: string;
  type: string;
  detail: string;
  createdAt: string;
  status: RequestStatus;
}

export interface Testimonial {
  quote: string;
  name: string;
  from: string;
  stay: string;
}

export interface DayMoment {
  time: string;
  title: string;
  body: string;
  image: Photo;
  /** background tint for this hour */
  tint: string;
  ink: "light" | "dark";
}
