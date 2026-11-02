import type { LocalizedString } from "./common";

export interface RegiaoSection {
  title: LocalizedString;
  body: LocalizedString;
  image: string;
  distance: LocalizedString | null;
}
