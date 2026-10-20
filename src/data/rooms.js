/**
 * Room data model.
 *
 * `slug` is the stable identifier used by URLs, reservations and pricing.
 * Rates below are sample rates: they are labelled as such in the UI until real
 * pricing and seasonal rules are configured.
 */

export const ROOM_TYPES = ['Suite', 'Cabin', 'Loft', 'Residence']

export const AMENITIES = [
  'Forest view',
  'Fireplace',
  'Private terrace',
  'Sauna',
  'Full kitchen',
  'Espresso machine',
  'Rain shower',
  'Bathtub',
  'Underfloor heating',
  'Workspace',
  'Lake access',
  'Outdoor fire pit',
  'EV charger',
  'Pet friendly',
]

/**
 * Seasonal rate rules. `from`/`to` are MM-DD and are inclusive; a rule that
 * wraps the new year is expressed with `from` > `to`.
 */
export const SEASONS = [
  { id: 'peak-summer', label: 'Peak summer', from: '06-15', to: '08-31', multiplier: 1.3 },
  { id: 'winter-holidays', label: 'Winter holidays', from: '12-20', to: '01-05', multiplier: 1.25 },
  { id: 'shoulder', label: 'Shoulder season', from: '04-01', to: '06-14', multiplier: 1.0 },
]

const img = (src, alt) => ({ src: `/images/${src}`, alt })

export const ROOMS = [
  {
    slug: 'shelter-room',
    name: 'Shelter Room',
    type: 'Suite',
    featured: true,
    baseRate: 199,
    cleaningFee: 45,
    capacity: 2,
    size: 38,
    beds: '1 king bed',
    summary:
      'An intimate architectural hideaway designed for slow mornings, warm evenings and uninterrupted connection with nature.',
    description:
      'The Shelter Room is the quietest corner of the retreat. A single volume of blackened timber and pale concrete, it opens onto the treeline through a full-height glazed wall. The fireplace sits at the centre of the room rather than against it, so the fire is visible from the bed, the bath and the low bench by the window.',
    checkIn: '15:00',
    checkOut: '11:00',
    amenities: [
      'Forest view',
      'Fireplace',
      'Full kitchen',
      'Rain shower',
      'Underfloor heating',
      'Espresso machine',
      'Workspace',
    ],
    images: [
      img('featured-room.jpg', 'Dark minimalist kitchen and fireplace inside the Shelter Room'),
      img('gallery-kitchen.jpg', 'Kitchen cabinetry in dark stained timber'),
      img('gallery-stove.jpg', 'Wood burning stove with a low chair beside it'),
      img('gallery-living.jpg', 'Living area with a fireplace and soft seating'),
    ],
  },
  {
    slug: 'forest-suite',
    name: 'Forest Suite',
    type: 'Suite',
    featured: false,
    baseRate: 249,
    cleaningFee: 55,
    capacity: 2,
    size: 46,
    beds: '1 king bed',
    summary:
      'A wide, light-filled suite with a deep window seat facing the pine line and a private terrace under the canopy.',
    description:
      'The Forest Suite is arranged around a long, low window seat that runs the full width of the room. Bedrooms and bathing areas sit behind slatted timber screens, so the suite can be opened into one continuous space or closed into a quiet, private retreat.',
    checkIn: '15:00',
    checkOut: '11:00',
    amenities: [
      'Forest view',
      'Private terrace',
      'Fireplace',
      'Sauna',
      'Bathtub',
      'Underfloor heating',
      'Pet friendly',
    ],
    images: [
      img('room-forest-suite.jpg', 'Minimalist suite bedroom with a neatly made bed'),
      img('gallery-bedroom.jpg', 'Bedroom with a low bed and a side table'),
      img('gallery-detail.jpg', 'Lamp on a timber nightstand'),
      img('gallery-living.jpg', 'Living area with soft seating'),
    ],
  },
  {
    slug: 'lake-cabin',
    name: 'Lake Cabin',
    type: 'Cabin',
    featured: false,
    baseRate: 289,
    cleaningFee: 65,
    capacity: 4,
    size: 62,
    beds: '1 king bed + 2 single beds',
    summary:
      'A freestanding cabin at the water’s edge, with its own jetty, outdoor fire pit and a rowing boat.',
    description:
      'Set apart from the main retreat, the Lake Cabin is reached by a boardwalk through the reeds. The living room faces west across the water; a covered deck, fire pit and jetty extend the interior outdoors for most of the year.',
    checkIn: '16:00',
    checkOut: '11:00',
    amenities: [
      'Lake access',
      'Outdoor fire pit',
      'Private terrace',
      'Fireplace',
      'Full kitchen',
      'Sauna',
      'Pet friendly',
      'EV charger',
    ],
    images: [
      img('room-lake-cabin.jpg', 'Timber boat moored on a still forest lake'),
      img('hero-lake.jpg', 'Lake and treeline at first light'),
      img('gallery-canoe.jpg', 'Two people paddling a canoe on the lake'),
      img('gallery-boat.jpg', 'Wooden boat resting on calm water'),
    ],
  },
  {
    slug: 'nordic-loft',
    name: 'Nordic Loft',
    type: 'Loft',
    featured: false,
    baseRate: 229,
    cleaningFee: 50,
    capacity: 3,
    size: 44,
    beds: '1 queen bed + 1 single bed',
    summary:
      'A double-height loft above the workshop, with a sleeping gallery, a long desk and the best light in the retreat.',
    description:
      'The Nordic Loft occupies the upper floor of the old workshop building. Exposed trusses, a sleeping gallery and a long oak desk make it the natural choice for longer stays that mix work and rest.',
    checkIn: '15:00',
    checkOut: '11:00',
    amenities: [
      'Forest view',
      'Workspace',
      'Full kitchen',
      'Rain shower',
      'Underfloor heating',
      'Espresso machine',
    ],
    images: [
      img('room-nordic-loft.jpg', 'Bed with striped blanket against a slatted timber headboard'),
      img('offer-seasonal.jpg', 'Premium bedroom with white linen and warm lighting'),
      img('gallery-bedroom.jpg', 'Bedroom with a low bed and side table'),
      img('gallery-detail.jpg', 'Lamp on a timber nightstand'),
    ],
  },
  {
    slug: 'woodland-residence',
    name: 'Woodland Residence',
    type: 'Residence',
    featured: false,
    baseRate: 349,
    cleaningFee: 85,
    capacity: 6,
    size: 96,
    beds: '2 king beds + 1 bunk bed',
    summary:
      'A three-bedroom residence for families and small groups, arranged around a double-sided fireplace and a long dining table.',
    description:
      'The Woodland Residence is the largest house on the site. Three bedrooms open off a central hall, with a double-sided fireplace between the living room and the long dining table. A covered outdoor kitchen and fire pit sit directly behind the glazed wall.',
    checkIn: '16:00',
    checkOut: '11:00',
    amenities: [
      'Forest view',
      'Fireplace',
      'Outdoor fire pit',
      'Full kitchen',
      'Private terrace',
      'Sauna',
      'EV charger',
      'Pet friendly',
      'Workspace',
    ],
    images: [
      img('room-woodland-residence.jpg', 'Timber cabin standing among tall trees'),
      img('welcome-exterior.jpg', 'Log cabin in dense forest'),
      img('gallery-living.jpg', 'Living area with a fireplace'),
      img('gallery-kitchen.jpg', 'Kitchen cabinetry in dark stained timber'),
    ],
  },
]

export const getRoom = (slug) => ROOMS.find((room) => room.slug === slug) || null

export const getFeaturedRoom = () => ROOMS.find((room) => room.featured) || ROOMS[0]

export const relatedRooms = (slug, limit = 3) =>
  ROOMS.filter((room) => room.slug !== slug).slice(0, limit)
