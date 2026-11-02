import type { LocalizedString } from "./common";

export interface RegiaoSection {
  title: LocalizedString;
  body: LocalizedString;
  image: string;
  distance: LocalizedString | null;
  /** Link to the house that suits this part of the region best. */
  stay?: { slug: string; text: LocalizedString };
}
