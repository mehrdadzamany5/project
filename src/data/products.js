import { P, photo } from './images.js'

/**
 * Single source of truth for catalogue data.
 * The homepage, shop, category pages, search, product detail, wishlist and
 * cart all read from here so prices, names and imagery never diverge.
 */

export const CATEGORIES = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Sofas, coffee tables and calm.',
    intro:
      'Deep seats, warm oak and honest materials. Our living room pieces are built to be lived in — every day, for years.',
    image: P.catLiving,
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Quiet rooms, better rest.',
    intro:
      'Natural wood frames, breathable textiles and storage that keeps the calm. Everything you need for a slower morning.',
    image: P.catBedroom,
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    tagline: 'Gather around solid oak.',
    intro:
      'Tables and chairs made for long dinners. Solid timber, softened edges and finishes that age beautifully.',
    image: P.catDining,
  },
  {
    slug: 'office',
    name: 'Office',
    tagline: 'Focused, unhurried work.',
    intro:
      'Desks and seating designed to keep a clear head — minimal lines, generous surfaces, natural materials.',
    image: P.catOffice,
  },
  {
    slug: 'storage',
    name: 'Storage',
    tagline: 'A place for everything.',
    intro:
      'Sideboards, cabinets and shelving that hide the clutter and let the room breathe.',
    image: P.catStorage,
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    tagline: 'Warm light, softly placed.',
    intro:
      'Floor and table lamps with linen shades and hand-finished bases, tuned for a warm evening glow.',
    image: P.catLighting,
  },
  {
    slug: 'decor',
    name: 'Decor',
    tagline: 'The finishing details.',
    intro:
      'Ceramics, textiles and small objects — the quiet details that make a house feel considered.',
    image: P.catDecor,
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    tagline: 'Outside, all year round.',
    intro:
      'Weather-ready timber and seating for terraces, balconies and gardens.',
    image: P.catOutdoor,
  },
]

const DEFAULT_CARE = [
  'Dust weekly with a soft, dry cloth.',
  'Avoid direct sunlight and prolonged heat sources.',
  'Wipe spills immediately with a damp cloth and mild soap.',
  'Tighten fittings periodically.',
]

const WOOD_CARE = [
  'Dust with a soft, dry cloth along the grain.',
  'Re-oil solid oak once a year with a natural furniture oil.',
  'Blot spills immediately — never soak the surface.',
  'Use felt pads under objects to prevent marking.',
]

export const PRODUCTS = [
  {
    id: 'luna-sofa',
    slug: 'luna-sofa',
    name: 'Luna Sofa',
    price: 899,
    compareAt: 1049,
    category: 'living-room',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 214,
    blurb: 'A low, deep three-seater in oatmeal linen.',
    description:
      'The Luna is our most-loved sofa: a low, deep three-seater with a soft, rounded silhouette and feather-blend cushions that hold their shape. Upholstered in a heavyweight oatmeal linen over a solid beech frame.',
    material: 'Solid beech frame, heavyweight linen blend (72% linen), feather-blend seat cushions',
    dimensions: 'W 224 × D 96 × H 78 cm · Seat height 42 cm',
    colors: [
      { name: 'Oatmeal', hex: '#D9CFC0' },
      { name: 'Warm Sand', hex: '#C7B49B' },
      { name: 'Muted Olive', hex: '#8A8C70' },
    ],
    care: DEFAULT_CARE,
    images: [P.lunaSofa, P.lunaSofaAlt],
    tags: ['sofa', 'linen', 'three seater', 'living room'],
    createdAt: '2024-02-11',
  },
  {
    id: 'oak-dining-chair',
    slug: 'oak-dining-chair',
    name: 'Oak Dining Chair',
    price: 199,
    category: 'dining-room',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 168,
    blurb: 'Steam-bent oak with a woven paper-cord seat.',
    description:
      'Steam-bent solid oak with a hand-woven paper-cord seat that softens with use. Stackable, light to move and comfortable enough for a three-hour dinner.',
    material: 'Solid FSC-certified oak, natural paper cord seat',
    dimensions: 'W 48 × D 52 × H 78 cm · Seat height 45 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Smoked Oak', hex: '#8A6A46' },
    ],
    care: WOOD_CARE,
    images: [P.oakChair, P.oakChairAlt],
    tags: ['chair', 'oak', 'dining', 'wood'],
    createdAt: '2024-01-22',
  },
  {
    id: 'reno-coffee-table',
    slug: 'reno-coffee-table',
    name: 'Reno Coffee Table',
    price: 349,
    compareAt: 399,
    category: 'living-room',
    badge: 'Bestseller',
    rating: 4.7,
    reviews: 132,
    blurb: 'Rounded oak top on a sculpted pedestal base.',
    description:
      'A generous rounded top on a sculpted pedestal base, finished by hand with a matte natural oil. The proportions are low and wide, so the room stays open around it.',
    material: 'Solid oak top, oak veneer pedestal, natural matte oil finish',
    dimensions: 'Ø 96 × H 36 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Walnut', hex: '#6B4A34' },
    ],
    care: WOOD_CARE,
    images: [P.renoTable, P.renoTableAlt],
    tags: ['coffee table', 'oak', 'living room', 'round'],
    createdAt: '2024-03-04',
  },
  {
    id: 'nordic-bed-frame',
    slug: 'nordic-bed-frame',
    name: 'Nordic Bed Frame',
    price: 799,
    category: 'bedroom',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 96,
    blurb: 'Low solid-oak frame with a woven headboard.',
    description:
      'A low solid-oak frame with a softly woven headboard. Slatted base included, no box spring required, and it assembles in under twenty minutes with the supplied tool.',
    material: 'Solid oak, woven linen-blend headboard, beech slatted base',
    dimensions: 'Queen: W 168 × L 212 × H 92 cm · Fits mattress 160 × 200 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Smoked Oak', hex: '#8A6A46' },
      { name: 'Warm Sand', hex: '#C7B49B' },
    ],
    care: WOOD_CARE,
    images: [P.nordicBed, P.nordicBedAlt],
    tags: ['bed', 'oak', 'bedroom', 'frame'],
    createdAt: '2024-02-28',
  },
  {
    id: 'solvay-armchair',
    slug: 'solvay-armchair',
    name: 'Solvay Armchair',
    price: 449,
    category: 'living-room',
    badge: 'New',
    rating: 4.6,
    reviews: 41,
    blurb: 'A sculpted lounge chair in bouclé.',
    description:
      'A sculpted lounge chair with a gently curved back and a deep seat, upholstered in a soft ivory bouclé. Small enough for a corner, comfortable enough to claim.',
    material: 'Moulded foam over hardwood frame, ivory bouclé (polyester/wool blend)',
    dimensions: 'W 78 × D 82 × H 74 cm · Seat height 40 cm',
    colors: [
      { name: 'Ivory Bouclé', hex: '#EDE7DC' },
      { name: 'Muted Olive', hex: '#8A8C70' },
    ],
    care: DEFAULT_CARE,
    images: [P.armchair, P.armchairAlt],
    tags: ['armchair', 'lounge', 'boucle', 'living room'],
    createdAt: '2024-06-02',
  },
  {
    id: 'fjord-dining-table',
    slug: 'fjord-dining-table',
    name: 'Fjord Dining Table',
    price: 1249,
    category: 'dining-room',
    rating: 4.8,
    reviews: 74,
    blurb: 'Solid oak plank top, seats six.',
    description:
      'A solid oak plank top on tapered legs, wide enough for six. The surface is finished with a hard-wax oil that resists everyday marks and can be refreshed at home.',
    material: 'Solid FSC-certified oak, hard-wax oil finish',
    dimensions: 'W 200 × D 95 × H 75 cm · Seats 6',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Smoked Oak', hex: '#8A6A46' },
    ],
    care: WOOD_CARE,
    images: [P.diningTable, P.diningTableAlt],
    tags: ['dining table', 'oak', 'six seater', 'dining room'],
    createdAt: '2024-04-18',
  },
  {
    id: 'halo-floor-lamp',
    slug: 'halo-floor-lamp',
    name: 'Halo Floor Lamp',
    price: 179,
    compareAt: 219,
    category: 'lighting',
    rating: 4.5,
    reviews: 58,
    blurb: 'Linen shade on a hand-finished oak stem.',
    description:
      'A tall, quiet floor lamp with a natural linen shade that diffuses light into a warm, even glow. The oak stem is turned by hand and finished with clear lacquer.',
    material: 'Turned solid oak, natural linen shade, black fabric cord (2.5 m)',
    dimensions: 'Ø 45 × H 158 cm · E27 fitting, bulb not included',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Charcoal', hex: '#3C3A36' },
    ],
    care: DEFAULT_CARE,
    images: [P.floorLamp, P.floorLampAlt],
    tags: ['lamp', 'lighting', 'floor lamp', 'linen'],
    createdAt: '2024-05-09',
  },
  {
    id: 'embla-bedside-table',
    slug: 'embla-bedside-table',
    name: 'Embla Bedside Table',
    price: 229,
    category: 'bedroom',
    rating: 4.7,
    reviews: 63,
    blurb: 'Two soft-close drawers in solid oak.',
    description:
      'A compact bedside table with two soft-close drawers and a small open shelf. Rounded corners and a hand-oiled finish make it feel settled rather than sharp.',
    material: 'Solid oak carcass, oak veneer drawer bases, brass fittings',
    dimensions: 'W 48 × D 40 × H 55 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Warm Sand', hex: '#C7B49B' },
    ],
    care: WOOD_CARE,
    images: [P.bedside, P.bedsideAlt],
    tags: ['bedside', 'nightstand', 'oak', 'bedroom', 'storage'],
    createdAt: '2024-03-27',
  },
  {
    id: 'vika-storage-cabinet',
    slug: 'vika-storage-cabinet',
    name: 'Vika Storage Cabinet',
    price: 599,
    category: 'storage',
    rating: 4.6,
    reviews: 37,
    blurb: 'Fluted doors, adjustable shelving.',
    description:
      'A low sideboard with fluted oak doors and adjustable shelving inside. Cable cut-outs at the back make it work as a media cabinet too.',
    material: 'Solid oak frame, fluted oak doors, adjustable shelves',
    dimensions: 'W 140 × D 42 × H 72 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Muted Olive', hex: '#8A8C70' },
    ],
    care: WOOD_CARE,
    images: [P.cabinet, P.cabinetAlt],
    tags: ['cabinet', 'sideboard', 'storage', 'oak'],
    createdAt: '2024-04-30',
  },
  {
    id: 'astra-desk',
    slug: 'astra-desk',
    name: 'Astra Desk',
    price: 429,
    category: 'office',
    rating: 4.5,
    reviews: 29,
    blurb: 'A calm work surface with a discreet cable tray.',
    description:
      'A slim oak-topped desk with a powder-coated steel frame and a discreet cable tray underneath. Sized to fit a laptop, a monitor and a clear head.',
    material: 'Solid oak top, powder-coated steel frame, integrated cable tray',
    dimensions: 'W 130 × D 62 × H 74 cm',
    colors: [
      { name: 'Natural Oak', hex: '#C79A63' },
      { name: 'Charcoal', hex: '#3C3A36' },
    ],
    care: WOOD_CARE,
    images: [P.desk, P.deskAlt],
    tags: ['desk', 'office', 'work', 'oak'],
    createdAt: '2024-05-21',
  },
  {
    id: 'terra-vase',
    slug: 'terra-vase',
    name: 'Terra Vase',
    price: 49,
    category: 'decor',
    badge: 'New',
    rating: 4.4,
    reviews: 88,
    blurb: 'Hand-thrown stoneware in a matte clay glaze.',
    description:
      'Hand-thrown stoneware with a soft matte glaze. Each piece varies slightly in tone and shape — that is the point. Watertight and equally happy empty.',
    material: 'Hand-thrown stoneware, food-safe matte glaze',
    dimensions: 'Ø 16 × H 26 cm',
    colors: [
      { name: 'Clay', hex: '#C2A38B' },
      { name: 'Warm Sand', hex: '#C7B49B' },
    ],
    care: ['Hand wash with warm water and mild soap.', 'Not suitable for the dishwasher or microwave.'],
    images: [P.vase, P.vaseAlt],
    tags: ['vase', 'ceramic', 'decor', 'stoneware'],
    createdAt: '2024-06-14',
  },
  {
    id: 'bjorn-outdoor-bench',
    slug: 'bjorn-outdoor-bench',
    name: 'Bjorn Outdoor Bench',
    price: 329,
    category: 'outdoor',
    rating: 4.5,
    reviews: 22,
    blurb: 'Teak slats, weather-ready all year.',
    description:
      'Solid teak slats on a powder-coated aluminium frame. Left untreated it weathers to a soft silver-grey; oil it annually to keep the warm honey tone.',
    material: 'Solid teak slats, powder-coated aluminium frame',
    dimensions: 'W 150 × D 45 × H 45 cm · Seats 2',
    colors: [
      { name: 'Natural Teak', hex: '#B98C55' },
      { name: 'Charcoal', hex: '#3C3A36' },
    ],
    care: [
      'Clean with mild soapy water and a soft brush.',
      'Oil annually to retain the original honey tone.',
      'Store cushions indoors when not in use.',
    ],
    images: [P.outdoorBench, P.outdoorBenchAlt],
    tags: ['bench', 'outdoor', 'teak', 'garden'],
    createdAt: '2024-05-30',
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const getProduct = (idOrSlug) =>
  PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug) || null

export const productsByCategory = (slug) => PRODUCTS.filter((p) => p.category === slug)

export const relatedProducts = (product, limit = 4) =>
  PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit)

/** Free-text match across name, category, description, material and tags. */
export const matchesQuery = (product, query) => {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    product.name,
    product.blurb,
    product.description,
    product.material,
    product.category,
    getCategory(product.category)?.name || '',
    ...product.tags,
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export const searchProducts = (query) => {
  const q = query.trim()
  if (!q) return []
  return PRODUCTS.filter((product) => matchesQuery(product, q))
}

/** The one filtering/sorting pipeline used by Shop, Category and Search. */
export const filterProducts = ({
  category = 'all',
  query = '',
  maxPrice = Infinity,
  sort = 'featured',
} = {}) => {
  const list = PRODUCTS.filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      product.price <= maxPrice &&
      matchesQuery(product, query),
  )
  return sortProducts(list, sort)
}

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export const sortProducts = (list, sort) => {
  const out = [...list]
  switch (sort) {
    case 'newest':
      return out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price)
    case 'rating':
      return out.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    default:
      return out
  }
}

export const PRICE_BOUNDS = {
  min: 0,
  max: Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 100) * 100,
}
