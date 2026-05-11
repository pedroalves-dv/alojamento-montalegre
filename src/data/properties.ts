// src/data/properties.ts
import type { Property } from "@/types/property";

export const properties: Property[] = [
  {
    slug: "casa-do-moinho",
    name: { pt: "Casa do Moinho", en: "Casa do Moinho" },
    tagline: {
      pt: "À beira do rio, longe do mundo",
      en: "Beside the river, far from the world",
    },
    description: {
      pt: "A Casa do Moinho fica à margem do rio Cávado, envolta pelo verde intenso da Serra do Larouco. Um antigo moinho restaurado com cuidado, onde a pedra granítica e a madeira envelhecida se misturam com o conforto moderno. Acorde com o som da água e duerma com as estrelas a guiar-lhe o sono.\n\nEspaçosa e luminosa, a casa acomoda até 10 pessoas em 5 quartos — ideal para famílias grandes ou grupos de amigos que procuram um retiro verdadeiro. A cozinha totalmente equipada convida a longas refeições à lareira enquanto lá fora o vento dança nos carvalhos.\n\nEsta é a casa certa para quem quer desligar de verdade: sem semáforos, sem pressa, sem barulho — só a natureza, a brasa e o silêncio que só o Barroso sabe dar.",
      en: "Casa do Moinho sits on the banks of the Cávado river, surrounded by the deep green of Serra do Larouco. A lovingly restored water mill where granite stone and aged wood meet modern comfort. Wake to the sound of the water; sleep under a sky thick with stars.\n\nSpacious and light-filled, the house sleeps up to 10 across 5 bedrooms — ideal for large families or groups of friends seeking a genuine retreat. The fully equipped kitchen invites long evenings by the fireplace while the wind moves through the oaks outside.\n\nThis is the house for those who truly want to disconnect: no traffic lights, no rush, no noise — just nature, embers, and the silence only Barroso can offer.",
    },
    capacity: 10,
    rooms: 5,
    bathrooms: 5,
    sqm: 160,
    location: {
      pt: "Montalegre, à beira do rio Cávado",
      en: "Montalegre, beside the Cávado river",
    },
    coordinates: { lat: 41.8185444, lng: -7.8241824 },
    amenities: {
      pt: [
        "WiFi gratuito",
        "Cozinha totalmente equipada",
        "Lareira",
        "Jardim",
        "Churrasco",
        "Terraço",
        "Varanda",
        "Vista para o rio",
        "Vista para a montanha",
        "Televisão de ecrã plano",
        "Máquina de café",
        "Entrada privativa",
        "Roupa de cama incluída",
        "Toalhas incluídas",
      ],
      en: [
        "Free WiFi",
        "Fully equipped kitchen",
        "Fireplace",
        "Garden",
        "BBQ",
        "Terrace",
        "Balcony",
        "River view",
        "Mountain view",
        "Flat-screen TV",
        "Coffee machine",
        "Private entrance",
        "Bed linen included",
        "Towels included",
      ],
    },
    booking: {
      url: "https://www.booking.com/hotel/pt/casa-do-moinho-montalegre.html",
      score: "9.5",
      reviewCount: 4,
    },
    google: {
      score: "5.0",
      reviewCount: 4,
      url: "https://www.google.com/maps?cid=13868799469826190841",
    },
    airbnbUrl: null,
    phone: "+351 935 663 060",
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Moinho",
      en: "Hello, I'd like to know more about Casa do Moinho",
    },
    seasonal: {
      pt: "Popular no verão — reserve com antecedência",
      en: "Popular in summer — book early",
    },
    priceFrom: 300,
    currency: "EUR",
    minStay: 2,
    minStayPeakSeason: 3,
    checkinTime: "16:00–22:00",
    checkoutTime: "08:00–11:00",
    noPartiesNote: {
      pt: "Festas e eventos não são permitidos nesta propriedade.",
      en: "Parties and events are not permitted on this property.",
    },
    reviews: {
      allReviewsUrl: "https://www.google.com/maps?cid=13868799469826190841",
      items: [
        {
          author: "Sergio Tavares",
          text: {
            pt: "Obrigado pela simpática recepção ao sr. João e sr. Nuno.",
            en: "Thank you for the warm welcome from Mr. João and Mr. Nuno.",
          },
          platform: "Google",
          rating: 5,
        },
        {
          author: "Lidia Cardoso",
          text: {
            pt: "Local tranquilo para um momento de relax.",
            en: "A tranquil spot for a moment of relaxation.",
          },
          platform: "Google",
          rating: 5,
        },
        {
          author: "Manuel Morais",
          text: {
            pt: "Espectacular.",
            en: "Spectacular.",
          },
          platform: "Google",
          rating: 5,
        },
      ],
    },
    licenseNumber: "120536/AL",
    languagesSpoken: ["Português", "English", "Español", "Français"],
    nearby: [
      {
        label: {
          pt: "Parque Nacional Peneda-Gerês",
          en: "Peneda-Gerês National Park",
        },
        distance: { pt: "~45 min", en: "~45 min" },
      },
      {
        label: { pt: "Barragem do Alto Rabagão", en: "Alto Rabagão Dam" },
        distance: { pt: "~20 min", en: "~20 min" },
      },
      {
        label: { pt: "Braga", en: "Braga" },
        distance: { pt: "~1h30", en: "~1h30" },
      },
      {
        label: { pt: "Porto", en: "Porto" },
        distance: { pt: "~2h", en: "~2h" },
      },
      {
        label: { pt: "Montalegre centro", en: "Montalegre centre" },
        distance: { pt: "~5 min", en: "~5 min" },
      },
    ],
    address: {
      pt: "Cambezes do Rio, Montalegre, 5470-041",
      en: "Cambezes do Rio, Montalegre, 5470-041",
    },
    gettingHereNote: {
      pt: "O GPS leva-o até à estrada principal em Cambezes do Rio. A casa fica no fim do caminho de terra à esquerda.",
      en: "GPS will take you to the main road in Cambezes do Rio. The house is at the end of the dirt track on the left.",
    },
    keywords: {
      pt: [
        "Casa do Moinho",
        "montalegre",
        "alojamento montalegre",
        "casa de férias montalegre",
        "turismo rural",
        "trás-os-montes",
        "norte de portugal",
        "casa junto ao rio",
        "casa de campo",
      ],
      en: [
        "Casa do Moinho",
        "montalegre",
        "accommodation montalegre",
        "holiday house montalegre",
        "rural tourism",
        "northern portugal",
        "trás-os-montes",
        "riverside house",
        "country house",
      ],
    },
    images: [
      "/images/casa-do-moinho/1.jpg",
      "/images/casa-do-moinho/2.jpg",
      "/images/casa-do-moinho/3.jpg",
      "/images/casa-do-moinho/4.jpeg",
      "/images/casa-do-moinho/5.jpg",
      "/images/casa-do-moinho/6.png",
      "/images/casa-do-moinho/7.png",
      "/images/casa-do-moinho/8.png",
      "/images/casa-do-moinho/9.png",
      "/images/casa-do-moinho/10.png",
      "/images/casa-do-moinho/11.jpg",
      "/images/casa-do-moinho/12.jpg",
      "/images/casa-do-moinho/13.jpg",
    ],
  },
  {
    slug: "casa-do-castelo",
    name: { pt: "Casa do Castelo", en: "Casa do Castelo" },
    tagline: {
      pt: "Sombra do castelo, alma da aldeia",
      en: "In the shadow of the castle, heart of the village",
    },
    description: {
      pt: "A Casa do Castelo fica mesmo ao lado das muralhas medievais de Montalegre — uma localização única que poucos alojamentos em Portugal podem reivindicar. A casa foi recuperada com materiais locais e respeita o carácter histórico da aldeia: paredes de granito, tectos em madeira escura, janelas que enquadram o castelo como se fosse uma pintura.\n\nCom capacidade para 10 pessoas em 5 quartos confortáveis, é perfeita para famílias que querem explorar a vila a pé. Tome o pequeno-almoço na varanda com vista directa para as torres medievais, usufrua do serviço de quartos ou do bar, e à noite a iluminação histórica transforma a paisagem numa cena de outro tempo.\n\nO centro histórico de Montalegre está a menos de dois minutos a pé: mercado, restaurantes tradicionais, a feira medieval de verão — tudo acessível sem precisar de carro. Os hóspedes que chegam de viatura têm acesso a estacionamento gratuito.",

      en: "Casa do Castelo stands immediately alongside the medieval walls of Montalegre — a location almost no other property in Portugal can claim. Restored using local materials, it honours the village's historic character: granite walls, dark timber ceilings, windows that frame the castle as if it were a painting.\n\nSleeping up to 10 across 5 comfortable bedrooms, it's perfect for families wanting to explore the village on foot. Have breakfast on the balcony with a direct view of the castle towers, make use of the room service or bar, and at night the historic floodlighting transforms the scene into something from another century.\n\nMontalegre's historic centre is less than two minutes on foot: market, traditional restaurants, the summer medieval fair — all accessible without a car. Guests arriving by car have access to free parking.",
    },
    capacity: 10,
    rooms: 5,
    bathrooms: 5,
    sqm: null,
    location: {
      pt: "Montalegre, junto ao Castelo",
      en: "Montalegre, next to the Castle",
    },
    coordinates: { lat: 41.8261156, lng: -7.7915704 },
    amenities: {
      pt: [
        "WiFi gratuito",
        "Estacionamento gratuito",
        "Cozinha totalmente equipada",
        "Lareira",
        "Varanda",
        "Vista para o castelo",
        "Bar/lounge",
        "Serviço de quartos",
        "Restaurante no rés-do-chão",
        "Propriedade para não fumadores",
      ],
      en: [
        "Free WiFi",
        "Free parking",
        "Fully equipped kitchen",
        "Fireplace",
        "Balcony",
        "Castle view",
        "Bar/lounge",
        "Room service",
        "On-site restaurant",
        "Non-smoking property",
      ],
    },
    booking: {
      url: null,
      score: null,
      reviewCount: null,
    },
    google: {
      score: "4.7",
      reviewCount: 23,
      url: "https://www.google.com/maps/place/Casa+de+Campo+O+Castelo/@41.8261196,-7.7941453,17z/data=!4m11!3m10!1s0xd2532b19c23ee53:0xbf89864b23fad590!5m2!4m1!1i2!8m2!3d41.8261156!4d-7.7915704!9m1!1b1!16s%2Fg%2F1hc1dhhmc",
    },
    airbnbUrl: null,
    phone: "+351 276 511 237",
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Castelo",
      en: "Hello, I'd like to know more about Casa do Castelo",
    },
    seasonal: {
      pt: "Popular no verão — especialmente durante a Feira Medieval de Montalegre.",
      en: "Popular in summer — especially during Montalegre's Medieval Fair.",
    },
    priceFrom: 80,
    currency: "EUR",
    minStay: 2,
    minStayPeakSeason: 3,
    checkinTime: "15:00–22:00",
    checkoutTime: "11:00",
    noPartiesNote: null,
    reviews: {
      allReviewsUrl:
        "https://www.google.com/maps/place/Casa+de+Campo+O+Castelo/@41.8261196,-7.7941453,17z/data=!4m11!3m10!1s0xd2532b19c23ee53:0xbf89864b23fad590!5m2!4m1!1i2!8m2!3d41.8261156!4d-7.7915704!9m1!1b1!16s%2Fg%2F1hc1dhhmc",
      items: [
        {
          author: "Hugo Catarino",
          text: {
            pt: "Adorei o Castelo — a proprietária muito simpática, quartos muito aconchegantes, vista para a Vila de Montalegre e terraço junto ao castelo. Ficou a promessa de voltar novamente.",
            en: "Loved O Castelo — very friendly owner, wonderfully cosy rooms, views over Montalegre, and a terrace right next to the castle. We promised ourselves we'd be back.",
          },
          platform: "Google",
          rating: 5,
        },
        {
          author: "MáriaJose Sanchez Blasco",
          text: {
            pt: "Um lugar precioso e com encanto. Muito limpo e bem cuidado. Um atendimento de excelência. Voltaremos!",
            en: "A beautiful, charming place. Very clean and well maintained. Outstanding service. We'll be back!",
          },
          platform: "Google",
          rating: 5,
        },
        {
          author: "pedro S",
          text: {
            pt: "Óptimo para passar um fim de semana e desfrutar de uma boa refeição a dois ou em família. Muito boa limpeza e atendimento. Localização excelente mesmo ao lado do Castelo e com vistas deslumbrantes.",
            en: "Perfect for a weekend getaway — great food for two or with the family, excellent cleanliness and service, outstanding location right next to the Castle with superb views.",
          },
          platform: "TripAdvisor",
          rating: 5,
        },
        {
          author: "Aurora Tomaz",
          text: {
            pt: "Excelente experiência de uma refeição saborosa num local de bom gosto. As sugestões da proprietária na escolha do menu permitem conhecer a variedade e riqueza da culinária da região. Recomendo vivamente.",
            en: "An excellent experience — a delicious meal in a tasteful setting. The owner's menu suggestions let you discover the variety and richness of the region's cuisine. Highly recommended.",
          },
          platform: "Google",
          rating: 5,
        },
        {
          author: "Diogo Martel",
          text: {
            pt: "Um espaço de qualidade e bom gosto, que alia o conforto e a estética da sala a uma cozinha de excelência. Tem além do mais uma relação qualidade-preço muito boa. Recomendo vivamente!",
            en: "A quality space with refined taste — combining comfort and elegant décor with outstanding cuisine. Excellent value for money. Highly recommended!",
          },
          platform: "Google",
          rating: 5,
        },
      ],
    },
    licenseNumber: null,
    languagesSpoken: ["Português", "English", "Español", "Français"],
    nearby: [
      {
        label: { pt: "Castelo de Montalegre", en: "Montalegre Castle" },
        distance: { pt: "2 min a pé", en: "2 min walk" },
      },
      {
        label: {
          pt: "Igreja Santa Maria do Castelo",
          en: "Igreja Santa Maria do Castelo",
        },
        distance: { pt: "2 min a pé", en: "2 min walk" },
      },
      {
        label: { pt: "Tasca do Açougue", en: "Tasca do Açougue" },
        distance: { pt: "0,1 km", en: "0.1 km" },
      },
      {
        label: {
          pt: "Parque Nacional Peneda-Gerês",
          en: "Peneda-Gerês National Park",
        },
        distance: { pt: "~45 min", en: "~45 min" },
      },
      {
        label: { pt: "Barragem do Alto Rabagão", en: "Alto Rabagão Dam" },
        distance: { pt: "~20 min", en: "~20 min" },
      },
      {
        label: { pt: "Braga", en: "Braga" },
        distance: { pt: "~1h30", en: "~1h30" },
      },
      {
        label: { pt: "Porto", en: "Porto" },
        distance: { pt: "~2h", en: "~2h" },
      },
    ],
    address: {
      pt: "Terreiro Açougue nº1, Montalegre, 5470-250",
      en: "Terreiro Açougue nº1, Montalegre, 5470-250",
    },
    gettingHereNote: {
      pt: "A casa fica no coração histórico de Montalegre, mesmo ao lado do Castelo. O GPS funciona bem até à propriedade. Estacionamento gratuito disponível no local.",
      en: "The house is in Montalegre's historic centre, right next to the Castle. GPS works well to the property. Free parking available on site.",
    },
    keywords: {
      pt: [
        "Casa do Castelo",
        "montalegre",
        "alojamento montalegre",
        "casa de férias montalegre",
        "turismo rural",
        "trás-os-montes",
        "norte de portugal",
        "vista para o castelo",
        "perto do castelo",
      ],
      en: [
        "Casa do Castelo",
        "montalegre",
        "accommodation montalegre",
        "holiday house montalegre",
        "rural tourism",
        "northern portugal",
        "trás-os-montes",
        "castle view",
        "near the castle",
      ],
    },
    restaurantInfo: {
      name: { pt: "Restaurante O Castelo", en: "O Castelo Restaurant" },
      description: {
        pt: "No rés-do-chão funciona o Restaurante O Castelo, gerido pela mesma família. Cozinha transmontana tradicional, logo na sua casa.",
        en: "The ground floor is home to O Castelo restaurant, run by the same family. Traditional Transmontana cuisine, right on your doorstep.",
      },
    },
    images: [
      "/images/casa-do-castelo/0.jpg",
      "/images/casa-do-castelo/1.jpg",
      "/images/casa-do-castelo/2.jpg",
      "/images/casa-do-castelo/3.jpg",
      "/images/casa-do-castelo/4.jpg",
      "/images/casa-do-castelo/5.jpg",
      "/images/casa-do-castelo/6.jpg",
      "/images/casa-do-castelo/7.jpg",
    ],
  },
];
