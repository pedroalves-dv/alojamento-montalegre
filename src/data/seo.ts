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
      pt: "Casas de turismo rural em Montalegre, Portugal. Reserva direta disponível.",
      en: "Rural holiday houses in Montalegre, Portugal. Direct booking available.",
    },
    localBusinessDescription: {
      pt: "Duas casas de turismo rural em Montalegre, Portugal. Reserva direta disponível.",
      en: "Two rural holiday houses in Montalegre, Portugal. Direct booking available.",
    },
  },

  home: {
    title: {
      pt: "Alojamento Montalegre — Casas de Turismo Rural",
      en: "Alojamento Montalegre — Rural Holiday Houses",
    },
    description: {
      pt: "Duas casas únicas em Montalegre, Terras de Barroso. Casa do Moinho e Casa do Castelo. Reserva direta sem comissões.",
      en: "Two unique holiday houses in Montalegre, Terras de Barroso. Casa do Moinho and Casa do Castelo. Book direct with no fees.",
    },
    keywords: {
      pt: [
        "alojamento montalegre",
        "alojamento norte portugal",
        "alojamento rural montalegre",
        "casa de férias montalegre",
        "turismo rural montalegre",
        "turismo rural norte portugal",
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
      pt: "Trás-os-Montes e Alto Douro — Descobrir a Região",
      en: "Trás-os-Montes and High Douro — Discover the Region",
    },
    description: {
      pt: "Montalegre, Parque Natural do Gerês, Barragem do Alto Rabagão — descubra o norte selvagem de Portugal nas Terras de Barroso.",
      en: "Montalegre, Peneda-Gerês National Park, Alto Rabagão — explore the wild north of Portugal in Terras de Barroso.",
    },
    keywords: {
      pt: [
        "tras-os-montes",
        "trás-os-montes tourism",
        "alto douro",
        "montalegre turismo",
        "parque natural gerês",
        "turismo rural barroso",
      ],
      en: [
        "trás-os-montes",
        "trás-os-montes tourism",
        "high douro",
        "montalegre tourism",
        "peneda gerês national park",
        "rural tourism portugal",
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
