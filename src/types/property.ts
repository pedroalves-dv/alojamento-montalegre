import type { LocalizedString, LocalizedStringArray } from "./common";

export interface PropertyBooking {
  url: string;
  score: string | null;
  reviewCount: number | null;
}

export interface Property {
  slug: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  capacity: number;
  rooms: number;
  location: LocalizedString;
  coordinates: { lat: number; lng: number };
  amenities: LocalizedStringArray;
  booking: PropertyBooking;
  airbnbUrl: string | null;
  whatsappMessage: LocalizedString;
  seasonal: LocalizedString;
  images: string[];
}
