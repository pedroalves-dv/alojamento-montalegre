// Credits for third-party photos, listed on /[locale]/creditos (linked from the footer).
// Creative Commons licences require: author, source, licence (with link) and a note of any
// changes. Add one entry for every photo that isn't the owners' own. Avoid NC (non-commercial)
// and ND (no-derivatives) licences; CC0 / public domain photos need no entry.
// Exception: the Sexta 13 and gastronomy photos are the Câmara Municipal de Montalegre's
// promotional photos ("DR"), used without a licence by the owners' choice and credited to the Câmara.
import type { LocalizedString } from "@/types/common";

export interface ImageCredit {
  /** Same path the data files use, e.g. "/images/montalegre-castelo.jpg". */
  image: string;
  subject: LocalizedString;
  author: string;
  /** The file's page, e.g. on Wikimedia Commons. */
  sourceUrl: string;
  license: string | LocalizedString;
  /** Omitted when there's no licence to link to (e.g. "all rights reserved"). */
  licenseUrl?: string;
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
    image: "/images/castelo-montalegre-vista.jpg",
    subject: { pt: "Montalegre e o castelo", en: "Montalegre and its castle" },
    author: "Vitor Oliveira",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Montalegre_-_Portugal_(12119473605).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    changes: { pt: "Recortada", en: "Cropped" },
  },
  {
    image: "/images/pitoes-das-junias-serra.jpg",
    subject: { pt: "Serra junto a Pitões das Júnias", en: "Hills near Pitões das Júnias" },
    author: "Panegyrics of Granovetter",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:30973_Rocky_landscape_in_northern_Portugal_(54955496664).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    changes: { pt: "Recortada", en: "Cropped" },
  },
  {
    image: "/images/alto-rabagao.jpg",
    subject: { pt: "Albufeira do Alto Rabagão", en: "Alto Rabagão reservoir" },
    author: "Vitor Oliveira",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Albufeira_da_Barragem_do_Alto_Rabag%C3%A3o_-_Portugal_(5553688816).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  {
    image: "/images/trilho-xertelo-sete-lagoas.jpg",
    subject: { pt: "Trilho de Xertelo para as Sete Lagoas, Cabril", en: "Trail from Xertelo to the Sete Lagoas, Cabril" },
    author: "Jjoaovvieira",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cabril_Xertelo_Trilho.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    changes: { pt: "Recortada", en: "Cropped" },
  },
  {
    image: "/images/fumeiro-pitoes-presuntos.jpg",
    subject: { pt: "Presuntos no fumeiro, Pitões das Júnias", en: "Presuntos in the smokehouse, Pitões das Júnias" },
    author: "Raazevedo",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fumeiro_Transmontano_(Presuntos_no_fumeiro).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    changes: { pt: "Recortada", en: "Cropped" },
  },
  {
    image: "/images/bruxas.jpg",
    subject: { pt: "Noite das Bruxas, Sexta 13, Castelo de Montalegre", en: "Night of the Witches, Friday the 13th, Montalegre Castle" },
    author: "Câmara Municipal de Montalegre",
    sourceUrl: "https://www.cm-montalegre.pt/",
    license: { pt: "Direitos reservados", en: "All rights reserved" },
  },
  {
    image: "/images/gastronomy.jpg",
    subject: { pt: "Fumeiro e pão à lareira", en: "Fumeiro and bread by the fire" },
    author: "Câmara Municipal de Montalegre",
    sourceUrl: "https://www.cm-montalegre.pt/",
    license: { pt: "Direitos reservados", en: "All rights reserved" },
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
