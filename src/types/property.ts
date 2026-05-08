import type { LocalizedString, LocalizedStringArray } from "./common";

export interface PropertyBooking {
  url: string | null;
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
  phone?: string;
  whatsappMessage: LocalizedString;
  seasonal: LocalizedString;
  restaurantInfo?: {
    name: { pt: string; en: string };
    description: { pt: string; en: string };
  };
  images: string[];
}
