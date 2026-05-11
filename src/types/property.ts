import type { LocalizedString, LocalizedStringArray } from "./common";

export interface PropertyBooking {
  url: string | null;
  score: string | null;
  reviewCount: number | null;
}

export type ReviewPlatform = "Google" | "Booking.com" | "TripAdvisor" | "Airbnb";

export interface PropertyReview {
  author: string;
  country?: LocalizedString;
  text: LocalizedString;
  platform: ReviewPlatform;
  rating: number; // out of 5
}

export interface PropertyReviewsConfig {
  items: PropertyReview[];
  allReviewsUrl: string | null;
}

export interface Property {
  slug: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  capacity: number;
  rooms: number;
  bathrooms: number;
  sqm: number | null;
  location: LocalizedString;
  coordinates: { lat: number; lng: number };
  amenities: LocalizedStringArray;
  booking: PropertyBooking;
  airbnbUrl: string | null;
  phone?: string;
  whatsappMessage: LocalizedString;
  seasonal: LocalizedString;
  priceFrom: number | null;
  currency: string;
  minStay: number;
  minStayPeakSeason: number | null;
  checkinTime: string;
  checkoutTime: string;
  noPartiesNote: LocalizedString | null;
  reviews: PropertyReviewsConfig | null;
  licenseNumber: string | null;
  languagesSpoken: string[] | null;
  nearby: { label: { pt: string; en: string }; distance: { pt: string; en: string } }[];
  address: { pt: string; en: string };
  keywords: { pt: string[]; en: string[] };
  restaurantInfo?: {
    name: { pt: string; en: string };
    description: { pt: string; en: string };
  };
  gettingHereNote: { pt: string; en: string } | null;
  images: string[];
}
