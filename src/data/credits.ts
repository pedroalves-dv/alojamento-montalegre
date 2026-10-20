// Credits for third-party photos, listed on /[locale]/creditos (linked from the footer).
// Creative Commons licences require: author, source, licence (with link) and a note of any
// changes. Add one entry for every photo that isn't the owners' own. Avoid NC (non-commercial)
// and ND (no-derivatives) licences; CC0 / public domain photos need no entry.
import type { LocalizedString } from "@/types/common";

export interface ImageCredit {
  /** Same path the data files use, e.g. "/images/montalegre-castelo.jpg". */
  image: string;
  subject: LocalizedString;
  author: string;
  /** The file's page, e.g. on Wikimedia Commons. */
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  /** Edits beyond resizing, e.g. a crop. */
  changes?: LocalizedString;
}

export const credits: ImageCredit[] = [
  {
    image: "/images/montalegre-castelo.jpg",
    subject: { pt: "Castelo de Montalegre", en: "Montalegre Castle" },
    author: "Gabriel González",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Montalegre_(25376042593).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  {
    image: "/images/garranos-peneda-geres.jpg",
    subject: { pt: "Garranos no Parque Nacional da Peneda-Gerês", en: "Garrano horses in Peneda-Gerês National Park" },
    author: "João Malho",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Garranos_Parque_Nacional_da_Peneda-Ger%C3%AAs_PTCON0001.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    changes: { pt: "Recortada", en: "Cropped" },
  },
];
