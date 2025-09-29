export type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  image: any;
  category: string;
  rating: number;
  reviews: number;
  price?: string;
  date?: string;
};

export const heroEvents: ShowcaseItem[] = [
  {
    id: 'catedral-leon',
    title: 'Catedral de León',
    description: 'Descubre la historia y la vista panorámica de la Basílica Catedral de la Asunción.',
    image: require('../../resources/84179-Puerto-Salvador-Allende.png'),
    category: 'Cultura',
    rating: 4.9,
    reviews: 128,
    price: 'Desde $12',
  },
  {
    id: 'volcan-boarding',
    title: 'Cerro Negro Boarding',
    description: 'Deslízate sobre la arena volcánica y siente la adrenalina única de Nicaragua.',
    image: require('../../resources/volcano-boarding-en-volcan-cerro-negro-visit-leon-nicaragua_1.jpg'),
    category: 'Aventura',
    rating: 4.8,
    reviews: 96,
    price: 'Desde $25',
  },
];

export const curatedActivities: ShowcaseItem[] = [
  {
    id: 'nicaragua-disena',
    title: 'Nicaragua Diseña 2024',
    description: 'Moda, arte y diseño emergente en un festival único.',
    image: require('../../resources/Nicaragua-disena-2024.jpg'),
    category: 'Eventos',
    rating: 4.7,
    reviews: 54,
    date: '12 Oct',
  },
  {
    id: 'patron-salvador',
    title: 'Puerto Salvador Allende',
    description: 'Gastronomía, música y vistas al lago Xolotlán.',
    image: require('../../resources/84181-Puerto-Salvador-Allende.png'),
    category: 'Gastronomía',
    rating: 4.6,
    reviews: 76,
    price: 'Gratis',
  },
  {
    id: 'cultura',
    title: 'Ruta Cultural de León',
    description: 'Museos, galerías y tradiciones locales en un solo recorrido.',
    image: require('../../resources/celebracion-de-la-griteria-chiquita-en-leon-nicaragua.jpg'),
    category: 'Cultura',
    rating: 4.9,
    reviews: 87,
    price: 'Desde $15',
  },
];

export const quickFilters = ['Todo', 'Eventos', 'Cultura', 'Gastronomía', 'Aventura', 'Naturaleza'];

export const profileShortcuts = [
  { id: 'favorites', label: 'Favoritos', icon: '♡' },
  { id: 'reservations', label: 'Reservas', icon: '⏱' },
  { id: 'tickets', label: 'Boletos', icon: '🎟' },
  { id: 'settings', label: 'Ajustes', icon: '⚙' },
];

export const experienceHighlights = [
  {
    id: 'vista-360',
    title: 'Vista panorámica 360°',
    description: 'Acceso exclusivo a la cúpula principal con guías certificados.',
    icon: '🔭',
  },
  {
    id: 'tour-guiado',
    title: 'Tour histórico guiado',
    description: 'Recorrido por las capillas y criptas con historias locales.',
    icon: '📜',
  },
  {
    id: 'degustacion',
    title: 'Degustación local',
    description: 'Prueba de café artesanal y dulces tradicionales al finalizar.',
    icon: '🍮',
  },
];

export const sampleItinerary = [
  { id: 'bienvenida', hour: '09:00', title: 'Recepción y registro', description: 'Entrega de credenciales y bienvenida del guía.' },
  {
    id: 'tour-interior',
    hour: '09:30',
    title: 'Recorrido por el interior',
    description: 'Visita a las capillas, criptas y salas históricas de la catedral.',
  },
  {
    id: 'ascenso',
    hour: '10:30',
    title: 'Ascenso al techo principal',
    description: 'Sesión fotográfica y explicación arquitectónica en la terraza blanca.',
  },
  {
    id: 'taller',
    hour: '11:15',
    title: 'Taller sensorial',
    description: 'Degustación guiada de café y postres locales en el claustro.',
  },
];
