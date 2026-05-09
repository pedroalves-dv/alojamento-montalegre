import type { LocalizedString } from "./common";

export interface RegiaoSection {
  title: LocalizedString;
  body: LocalizedString;
  image: string;
  distance: { pt: string; en: string } | null;
}
