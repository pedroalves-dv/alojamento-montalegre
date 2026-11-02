type Lang = { pt: string; en: string };

interface OgTexts {
  eyebrow?: Lang;
  headline: Lang;
  subline: Lang;
}

interface PageSeo {
  title: Lang;
  description: Lang;
  og: OgTexts;
}

export const seo: {
  site: {
    titleTemplate: string;
  };
  home: PageSeo;
  regiao: PageSeo;
  contacto: PageSeo;
} = {
  site: {
    titleTemplate: "%s | Alojamento Montalegre",
  },

  home: {
    title: {
      pt: "Alojamento Montalegre — Casa de Férias e Quartos perto do Gerês",
      en: "Holiday Accommodation in Montalegre | Alojamento Montalegre",
    },
    description: {
      pt: "Casa do Moinho, casa inteira para 10 à beira do rio Cávado, e Casa de Campo O Castelo, quartos junto ao castelo. Montalegre, perto do Gerês. Reserva direta.",
      en: "Casa do Moinho, a whole house for 10 on the Cávado river, and Casa de Campo O Castelo, rooms by the castle. Montalegre, near Gerês. Book direct, no fees.",
    },
    og: {
      headline: {
        pt: "Alojamento\nem Montalegre",
        en: "Holiday Accommodation\nin Montalegre",
      },
      subline: {
        pt: "Montalegre · Gerês · Portugal",
        en: "Montalegre · Gerês · Portugal",
      },
    },
  },

  regiao: {
    title: {
      pt: "O Que Fazer em Montalegre e no Gerês",
      en: "Things to Do in Montalegre and Gerês",
    },
    description: {
      pt: "O que ver e fazer em Montalegre: o castelo, o Parque Nacional da Peneda-Gerês, o Alto Rabagão, a Feira do Fumeiro, a Sexta 13 e a carne barrosã. Guia local.",
      en: "What to see and do in Montalegre: the castle, Peneda-Gerês National Park, Alto Rabagão, the Fumeiro Fair, Friday the 13th and Barrosã beef. A local guide.",
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
      pt: "Contacto e Reservas",
      en: "Contact and Bookings",
    },
    description: {
      pt: "Reserve as nossas casas em Montalegre diretamente, sem comissões: Casa do Moinho por WhatsApp ou telefone, Casa de Campo O Castelo por telefone.",
      en: "Book our houses in Montalegre direct, with no fees: Casa do Moinho by WhatsApp or phone, Casa de Campo O Castelo by phone. We reply within 24 hours.",
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
