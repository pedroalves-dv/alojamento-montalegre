import type { Property } from "@/types/property";

// Unsplash placeholders — append ?w=1200&q=80 per brief
const U = {
  hero:     "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80",
  river:    "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
  village:  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80",
  forest:   "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
  castle:   "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1200&q=80",
  interior: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
};

export const properties: Property[] = [
  {
    slug: "casa-do-moinho",
    name: { pt: "Casa do Moinho", en: "Casa do Moinho" },
    tagline: {
      pt: "À beira do rio, longe do mundo",
      en: "Beside the river, far from the world",
    },
    description: {
      pt: "A Casa do Moinho fica à margem do rio Cávado, envolta pelo verde intenso das Terras de Barroso. Uma antiga casa de campo restaurada com cuidado, onde a pedra granítica e a madeira envelhecida se misturam com o conforto moderno. Acorde com o som da água e duerma com as estrelas a guiar-lhe o sono.\n\nEspaçosa e luminosa, a casa acomoda até 12 pessoas em 5 quartos — ideal para famílias grandes ou grupos de amigos que procuram um retiro verdadeiro. A cozinha totalmente equipada convida a longas refeições à lareira enquanto lá fora o vento dança nos carvalhos.\n\nEsta é a casa certa para quem quer desligar de verdade: sem semáforos, sem pressa, sem barulho — só a natureza, a brasa e o silêncio que só o Barroso sabe dar.",
      en: "Casa do Moinho sits on the banks of the Cávado river, surrounded by the deep green of Terras de Barroso. A lovingly restored farmhouse where granite stone and aged wood meet modern comfort. Wake to the sound of the water; sleep under a sky thick with stars.\n\nSpaçious and light-filled, the house sleeps up to 12 across 5 bedrooms — ideal for large families or groups of friends seeking a genuine retreat. The fully equipped kitchen invites long evenings by the fireplace while the wind moves through the oaks outside.\n\nThis is the house for those who truly want to disconnect: no traffic lights, no rush, no noise — just nature, embers, and the silence only Barroso can offer.",
    },
    capacity: 12,
    rooms: 5,
    location: {
      pt: "Montalegre, Terras de Barroso",
      en: "Montalegre, Terras de Barroso",
    },
    coordinates: { lat: 41.8229, lng: -7.7936 },
    amenities: {
      pt: ["WiFi", "Estacionamento", "Cozinha equipada", "Lareira", "Jardim", "Churrasco"],
      en: ["WiFi", "Parking", "Fully equipped kitchen", "Fireplace", "Garden", "BBQ"],
    },
    booking: {
      url: "https://www.booking.com/PLACEHOLDER_MOINHO",
      score: null,
      reviewCount: null,
    },
    airbnbUrl: null,
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Moinho",
      en: "Hello, I'd like to know more about Casa do Moinho",
    },
    seasonal: {
      pt: "Popular no verão — reserve com antecedência",
      en: "Popular in summer — book early",
    },
    images: [
      U.river,
      U.hero,
      U.interior,
      U.forest,
      U.village,
      U.river,
      U.interior,
      U.forest,
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
      pt: "A Casa do Castelo fica mesmo ao lado das muralhas medievais de Montalegre — uma localização única que poucos alojamentos em Portugal podem reivindicar. A casa foi recuperada com materiais locais e respeita o carácter histórico da aldeia: paredes de granito, tectos em madeira escura, janelas que enquadram o castelo como se fosse uma pintura.\n\nCom capacidade para 10 pessoas em 5 quartos confortáveis, é perfeita para famílias que querem explorar a vila a pé. O pequeno-almoço pode ser tomado na varanda com vista directa para as torres do castelo, e à noite a iluminação histórica transforma a paisagem numa cena de outro tempo.\n\nO centro histórico de Montalegre está a menos de dois minutos a pé: mercado, restaurantes, a feira medieval de verão — tudo acessível sem precisar de carro.",
      en: "Casa do Castelo stands immediately alongside the medieval walls of Montalegre — a location almost no other property in Portugal can claim. Restored using local materials, it honours the village's historic character: granite walls, dark timber ceilings, windows that frame the castle as if it were a painting.\n\nSleeping up to 10 across 5 comfortable bedrooms, it's perfect for families wanting to explore the village on foot. Breakfast on the balcony comes with a direct view of the castle towers; at night the historic lighting transforms the scene into something from another century.\n\nMontalegre's historic centre is less than two minutes on foot: market, restaurants, the summer medieval fair — all accessible without a car.",
    },
    capacity: 10,
    rooms: 5,
    location: {
      pt: "Montalegre, junto ao Castelo",
      en: "Montalegre, next to the Castle",
    },
    coordinates: { lat: 41.8241, lng: -7.7897 },
    amenities: {
      pt: ["WiFi", "Estacionamento", "Cozinha equipada", "Lareira", "Varanda", "Vista para o castelo"],
      en: ["WiFi", "Parking", "Fully equipped kitchen", "Fireplace", "Balcony", "Castle view"],
    },
    booking: {
      url: "https://www.booking.com/PLACEHOLDER_CASTELO",
      score: "9.4",
      reviewCount: 47,
    },
    airbnbUrl: null,
    whatsappMessage: {
      pt: "Olá, gostaria de saber mais sobre a Casa do Castelo",
      en: "Hello, I'd like to know more about Casa do Castelo",
    },
    seasonal: {
      pt: "Disponível todo o ano",
      en: "Available year-round",
    },
    images: [
      U.castle,
      U.village,
      U.interior,
      U.hero,
      U.forest,
      U.castle,
      U.interior,
      U.village,
    ],
  },
];
