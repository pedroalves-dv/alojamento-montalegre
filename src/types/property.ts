import type { LocalizedString, LocalizedStringArray } from "./common";

export interface PropertyBooking {
  url: string | null;
  score: string | null;
  reviewCount: number | null;
}

export type ReviewPlatform = "Google" | "Booking.com" | "TripAdvisor" | "Airbnb";

export interface PropertyReview {
  /** Store as "First L." — the full surname is never shown (enforced at render time too). */
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

export interface PropertyGoogleScore {
  score: string;
  reviewCount: number | null;
  url: string | null;
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
  /** null: bookings by phone only (no WhatsApp buttons on this house). */
  whatsappMessage: LocalizedString | null;
  seasonal: LocalizedString;
  /** Show the date of the next Friday the 13th under the seasonal note (the town's busiest night). */
  showNextFriday13?: boolean;
  priceFrom: number | null;
  /** Whole house, or room by room (Casa de Campo O Castelo): sets the page's wording and what priceFrom buys. */
  rentedBy: "house" | "room";
  currency: string;
  minStay: number;
  minStayPeakSeason: number | null;
  checkinTime: string;
  checkoutTime: string;
  noPartiesNote: LocalizedString | null;
  /** null: not stated on the site. */
  petsAllowed: boolean | null;
  reviews: PropertyReviewsConfig | null;
  licenseNumber: string | null;
  languagesSpoken: string[] | null;
  nearby: { label: LocalizedString; distance: LocalizedString }[];
  address: LocalizedString;
  /** Search result title (used as-is, no site name appended) and meta description, ~150 characters. */
  seo: { title: LocalizedString; description: LocalizedString };
  google?: PropertyGoogleScore;
  restaurantInfo?: {
    name: LocalizedString;
    description: LocalizedString;
  };
  gettingHereNote: LocalizedString | null;
  images: string[];
}
