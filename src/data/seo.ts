type Lang = { pt: string; en: string };

interface OgTexts {
  eyebrow?: Lang;
  headline: Lang;
  subline: Lang;
}

interface PageSeo {
  title: Lang;
  description: Lang;
  keywords?: { pt: string[]; en: string[] };
  og: OgTexts;
}

export const seo: {
  site: {
    titleDefault: Lang;
    titleTemplate: string;
    description: Lang;
    localBusinessDescription: Lang;
  };
  home: PageSeo;
  regiao: PageSeo;
  contacto: Omit<PageSeo, "keywords">;
} = {
  site: {
    titleDefault: {
      pt: "Alojamento Montalegre — Casas de Turismo Rural",
      en: "Alojamento Montalegre — Rural Holiday Houses",
    },
    titleTemplate: "%s | Alojamento Montalegre",
    description: {
      pt: "Duas casas de turismo rural em Montalegre, norte de Portugal. Junto ao castelo medieval e à beira do rio Cávado, a 40 min do Parque Nacional da Peneda-Gerês. Reserva direta.",
      en: "Two rural holiday houses in Montalegre, northern Portugal. By the medieval castle and the Cávado river, 40 min from Peneda-Gerês National Park. Book direct, no fees.",
    },
    localBusinessDescription: {
      pt: "Duas casas de turismo rural em Montalegre, norte de Portugal — Casa do Moinho à beira do rio e Casa do Castelo junto ao castelo medieval. Reserva direta disponível.",
      en: "Two rural holiday houses in Montalegre, northern Portugal — Casa do Moinho by the river and Casa do Castelo next to the medieval castle. Direct booking available.",
    },
  },

  home: {
    title: {
      pt: "Alojamento Montalegre — Casas de Turismo Rural",
      en: "Alojamento Montalegre — Rural Holiday Houses",
    },
    description: {
      pt: "Duas casas únicas em Montalegre, norte de Portugal — Casa do Moinho à beira do rio Cávado e Casa do Castelo junto às muralhas medievais. Reserve diretamente, sem comissões.",
      en: "Two unique holiday houses in Montalegre, northern Portugal — Casa do Moinho by the river and Casa do Castelo next to the medieval walls. Book direct with no fees.",
    },
    keywords: {
      pt: [
        "alojamento montalegre",
        "alojamento norte portugal",
        "alojamento rural montalegre",
        "casa de férias montalegre",
        "turismo rural montalegre",
        "turismo rural norte portugal",
        "alojamento geres",
        "casa de férias norte portugal",
        "casa rural montalegre",
        "alojamento rio cavado",
      ],
      en: [
        "accommodation montalegre",
        "guesthouse montalegre",
        "guesthouse northern portugal",
        "accommodation northern portugal",
        "rural accommodation montalegre",
        "holiday house montalegre",
        "holiday house montalegre portugal",
        "rural tourism montalegre",
        "rural tourism gerês",
        "holiday house near gerês",
        "accommodation near peneda geres",
        "montalegre holiday rental",
        "cávado river accommodation",
      ],
    },
    og: {
      headline: {
        pt: "Casas de Turismo Rural\nem Montalegre",
        en: "Rural Holiday Houses\nin Montalegre",
      },
      subline: {
        pt: "Trás-os-Montes · Portugal",
        en: "Trás-os-Montes · Portugal",
      },
    },
  },

  regiao: {
    title: {
      pt: "Montalegre, Trás-os-Montes — Descobrir a Região",
      en: "Montalegre, Trás-os-Montes — Discover the Region",
    },
    description: {
      pt: "Montalegre, Serra do Larouco, Parque Nacional da Peneda-Gerês — descubra o norte de Portugal: castelo medieval, Festival das Bruxas, trilhos pedestres e gastronomia transmontana.",
      en: "Montalegre, Serra do Larouco, Peneda-Gerês National Park — discover northern Portugal: medieval castle, Festival of the Witches, walking trails and traditional Transmontana cuisine.",
    },
    keywords: {
      pt: [
        "montalegre turismo",
        "trás-os-montes",
        "parque nacional gerês",
        "serra do larouco",
        "festival das bruxas montalegre",
        "dia das bruxas montalegre",
        "trilhos pedestres montalegre",
        "o que fazer montalegre",
        "castelo de montalegre",
      ],
      en: [
        "montalegre tourism",
        "trás-os-montes",
        "peneda gerês national park",
        "serra do larouco",
        "witches festival montalegre",
        "friday 13th montalegre",
        "hiking montalegre",
        "walking trails montalegre",
        "what to do montalegre",
      ],
    },
    og: {
      eyebrow: {
        pt: "ALOJAMENTO MONTALEGRE · REGIÃO",
        en: "ALOJAMENTO MONTALEGRE · REGION",
      },
      headline: {
        pt: "Trás-os-Montes, Portugal",
        en: "Trás-os-Montes, Portugal",
      },
      subline: {
        pt: "Das montanhas ao rio — o norte que não conhece",
        en: "From the mountains to the river — the north you don't know yet",
      },
    },
  },

  contacto: {
    title: {
      pt: "Contacto — Reserva Direta",
      en: "Contact — Direct Booking",
    },
    description: {
      pt: "Reserve diretamente via WhatsApp, telefone ou Booking.com. Respondemos em menos de 24 horas.",
      en: "Book directly via WhatsApp, phone or Booking.com. We respond within 24 hours.",
    },
    og: {
      eyebrow: {
        pt: "ALOJAMENTO MONTALEGRE · CONTACTO",
        en: "ALOJAMENTO MONTALEGRE · CONTACT",
      },
      headline: {
        pt: "Fale Connosco",
        en: "Get in Touch",
      },
      subline: {
        pt: "Reserva direta · Sem comissões · Resposta em 24h",
        en: "Direct booking · No fees · Reply within 24h",
      },
    },
  },
};
