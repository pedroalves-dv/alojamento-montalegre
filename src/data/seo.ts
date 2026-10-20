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
      pt: "Duas casas de turismo rural em Montalegre, no Barroso: uma à beira do rio Cávado, outra junto ao castelo medieval. Às portas do Parque Nacional da Peneda-Gerês. Reserva direta.",
      en: "Two rural holiday houses in Montalegre, northern Portugal: one by the Cávado river, one beside the medieval castle. On the edge of Peneda-Gerês National Park. Book direct, no fees.",
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
      pt: "Casa do Moinho, à beira do rio Cávado, e Casa do Castelo, no centro histórico de Montalegre. Duas casas para até 10 pessoas no Barroso, norte de Portugal. Reserve diretamente, sem comissões.",
      en: "Casa do Moinho by the Cávado river and Casa do Castelo in Montalegre's old town. Two houses for up to 10 guests in Barroso, northern Portugal. Book direct, no fees.",
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
        pt: "Montalegre · Barroso · Portugal",
        en: "Montalegre · Barroso · Portugal",
      },
    },
  },

  regiao: {
    title: {
      pt: "Montalegre, Trás-os-Montes — O Que Ver e Fazer",
      en: "Montalegre, Northern Portugal — What to See and Do",
    },
    description: {
      pt: "O que ver e fazer em Montalegre e no Barroso, em Trás-os-Montes: castelo medieval, Parque Nacional da Peneda-Gerês, Alto Rabagão, Feira do Fumeiro, Sexta 13 e carne barrosã.",
      en: "What to see and do in Montalegre and Barroso, northern Portugal: medieval castle, Peneda-Gerês National Park, Alto Rabagão, the Fumeiro Fair, Friday the 13th and Barrosã beef.",
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
        "barroso",
        "alto rabagão",
        "pitões das júnias",
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
        "barroso portugal",
        "alto rabagão",
        "pitões das júnias",
      ],
    },
    og: {
      eyebrow: {
        pt: "ALOJAMENTO MONTALEGRE · REGIÃO",
        en: "ALOJAMENTO MONTALEGRE · REGION",
      },
      headline: {
        pt: "Terras de Barroso",
        en: "The Land of Barroso",
      },
      subline: {
        pt: "Montalegre · Trás-os-Montes · Portugal",
        en: "Montalegre · Northern Portugal",
      },
    },
  },

  contacto: {
    title: {
      pt: "Contacto — Reserva Direta",
      en: "Contact — Direct Booking",
    },
    description: {
      pt: "Reserve diretamente por WhatsApp ou telefone. Respondemos em menos de 24 horas.",
      en: "Book directly by WhatsApp or phone. We respond within 24 hours.",
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
