import { P } from './images.js'

/**
 * Site configuration + editorial content.
 *
 * NOTE ON HONESTY: every commercial value that the brand has not supplied is
 * `null` rather than invented. Components render a clearly-labelled
 * "needs configuring" state instead of fabricating a phone number, address or
 * social profile.
 */
export const SITE = {
  name: 'Nordic Living',
  wordmark: 'NORDIC LIVING',
  descriptor: 'Scandinavian furniture',
  tagline: 'Thoughtful furniture for a more beautiful, comfortable, and sustainable life.',
  freeShippingThreshold: 499,
  taxRate: 0.08,
  standardShipping: 29,
  contact: {
    email: 'hello@nordicliving.example',
    phone: null,
    address: null,
    hours: 'Monday – Friday, 09:00 – 17:00 CET',
  },
  social: {
    instagram: null,
    facebook: null,
    pinterest: null,
  },
}

/* ------------------------------------------------------------------ */
/* Trust + brand strips                                                */
/* ------------------------------------------------------------------ */

export const BENEFITS = [
  { icon: 'leaf', title: 'Sustainable Materials', text: 'Good for you, good for the planet.' },
  { icon: 'truck', title: 'Free Shipping', text: 'On qualifying orders over $499.' },
  { icon: 'return', title: '30-Day Returns', text: 'Hassle-free shopping.' },
  { icon: 'lock', title: 'Secure Payments', text: 'Safe and protected checkout.' },
]

export const BRAND_VALUES = [
  { icon: 'recycle', title: 'Eco-Friendly', text: 'Sustainable & responsible.' },
  { icon: 'award', title: 'High Quality', text: 'Built to last.' },
  { icon: 'sun', title: 'Modern Design', text: 'Minimal & timeless.' },
  { icon: 'heart', title: 'Loved by Customers', text: 'Trusted by thousands.' },
]

export const SUSTAINABILITY_POINTS = [
  { icon: 'tree', title: 'Sustainable Materials', text: 'FSC-certified timber and natural fibres.' },
  { icon: 'drop', title: 'Lower Carbon Footprint', text: 'Local production and sea freight.' },
  { icon: 'award', title: 'Built to Last', text: 'Solid joinery, repairable by design.' },
  { icon: 'globe', title: 'Ethically Sourced', text: 'Audited partners, fair wages.' },
]

export const HERO_SLIDES = [
  {
    id: 'living-room',
    eyebrow: 'NATURAL SPACES. BETTER LIVING.',
    title: 'Furniture for a Kinder, Calmer Home',
    text: 'Thoughtfully designed furniture that brings comfort, style and sustainability into your space.',
    primary: { label: 'SHOP NOW', to: '/shop' },
    secondary: { label: 'EXPLORE THE COLLECTION', to: '/category/living-room' },
    image: P.heroLiving,
    alt: 'Bright Scandinavian living room with a pale sofa, warm timber panelling and full-height windows',
    caption: 'Living Room',
  },
  {
    id: 'bedroom',
    eyebrow: 'QUIET ROOMS. BETTER REST.',
    title: 'A Bedroom That Lets You Slow Down',
    text: 'Natural wood frames, breathable textiles and calm storage for the best part of the day.',
    primary: { label: 'SHOP BEDROOM', to: '/category/bedroom' },
    secondary: { label: 'VIEW THE COLLECTION', to: '/shop' },
    image: P.heroBedroom,
    alt: 'Calm bedroom with an upholstered headboard, white bedding and soft daylight',
    caption: 'Bedroom',
  },
  {
    id: 'dining',
    eyebrow: 'GATHER. SHARE. STAY A WHILE.',
    title: 'Solid Oak, Made for Long Dinners',
    text: 'Contemporary dining furniture built from honest materials that only get better with age.',
    primary: { label: 'SHOP DINING', to: '/category/dining-room' },
    secondary: { label: 'BROWSE ALL FURNITURE', to: '/shop' },
    image: P.heroDining,
    alt: 'Warm dining area with an oval wooden table and upholstered chairs',
    caption: 'Dining',
  },
]

export const HERO_METRICS = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '100%', label: 'Sustainable Materials' },
]

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export const COLLECTION_BANNERS = [
  {
    id: 'modern-living-room',
    eyebrow: 'FEATURED COLLECTION',
    title: 'Modern Living Room Collection',
    text: 'Soft sofas, coffee tables and more — designed for real life.',
    cta: 'EXPLORE',
    to: '/category/living-room',
    image: P.catLiving,
    alt: 'Contemporary living room with a soft sofa and round wooden coffee table',
  },
  {
    id: 'restful-bedroom',
    eyebrow: 'BEDROOM ESSENTIALS',
    title: 'Restful. Stylish. Yours.',
    text: 'Beds and storage solutions for a better tomorrow.',
    cta: 'SHOP BEDROOM',
    to: '/category/bedroom',
    image: P.catBedroom,
    alt: 'Calm premium bedroom with an upholstered headboard and warm lighting',
  },
]

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

// Sample demonstration content for the development environment — these are
// not presented as verified purchases because no order records back them.
export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Elin H.',
    location: 'Copenhagen',
    initials: 'EH',
    rating: 5,
    quote:
      'The Luna sofa is the first piece of furniture I have bought that looks better in person. Two years in and the linen has softened rather than sagged.',
  },
  {
    id: 't2',
    name: 'Marcus B.',
    location: 'Hamburg',
    initials: 'MB',
    rating: 5,
    quote:
      'Assembly took about fifteen minutes and everything lined up perfectly. The oak dining table has already survived two birthday parties.',
  },
  {
    id: 't3',
    name: 'Sofie L.',
    location: 'Rotterdam',
    initials: 'SL',
    rating: 4,
    quote:
      'Delivery was careful and the packaging was entirely cardboard. Our living room finally feels calm instead of crowded.',
  },
]

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export const JOURNAL = [
  {
    slug: 'layering-natural-textures',
    title: 'Layering Natural Textures Without the Clutter',
    category: 'Styling',
    date: '2026-09-18',
    readTime: '5 min read',
    excerpt:
      'Linen, oak, wool and stone — how to combine natural materials so a room feels considered rather than busy.',
    image: P.journal1,
    alt: 'Layered natural textures in a warm neutral living room',
    body: [
      'Natural materials work best when you let them disagree slightly. A crisp linen against a rough ceramic, or a smooth oak surface beside a wool throw, reads as considered. Repeating one texture everywhere is what makes a room feel flat.',
      'Start with three materials and stop. In most Nordic interiors that is wood, a textile and a ceramic or stone. Anything else is a guest, not a resident.',
      'Keep a single tone family. Warm whites, oatmeal, clay and muted olive sit comfortably together; adding one cool grey will fight everything around it.',
      'Finally, leave a surface empty. Negative space is a material too, and it is the one most rooms run out of first.',
    ],
  },
  {
    slug: 'small-space-living-room',
    title: 'A Small Living Room That Feels Generous',
    category: 'Interiors',
    date: '2026-08-30',
    readTime: '4 min read',
    excerpt:
      'Low furniture, one strong light source and a single piece of art — the practical rules for compact spaces.',
    image: P.journal2,
    alt: 'Compact living room styled with low furniture and warm lighting',
    body: [
      'Height is the enemy of a small room. Low seating keeps sightlines open, and a low coffee table lets you move around it without turning sideways.',
      'Choose one light source and commit to it. A single floor lamp with a linen shade does more for a small room than six recessed spots.',
      'Rugs should reach at least under the front legs of every seat. A rug that floats in the middle of the floor makes a room read as smaller, not larger.',
      'Then remove one object. There is almost always one.',
    ],
  },
  {
    slug: 'caring-for-solid-oak',
    title: 'How to Care for Solid Oak (Properly)',
    category: 'Care',
    date: '2026-08-04',
    readTime: '6 min read',
    excerpt:
      'Oiling, humidity and the marks you should not worry about — a straightforward care routine for timber furniture.',
    image: P.journal3,
    alt: 'Built-in timber shelving in a bright, high-ceilinged room',
    body: [
      'Solid oak is forgiving, but it does respond to its environment. Keep indoor humidity between 40% and 60% and the timber will stay dimensionally stable through the seasons.',
      'Dust along the grain with a dry cloth. Re-oil once a year with a natural furniture oil — a thin coat, left for twenty minutes, then buffed off.',
      'Water rings and small dents are normal. Most water marks lift with a dry cloth and a little patience; deeper marks can be sanded back and re-oiled at home.',
      'Avoid silicone polishes and all-purpose sprays. They build a film that is difficult to remove and dulls the surface over time.',
    ],
  },
  {
    slug: 'sustainable-furniture-guide',
    title: 'What "Sustainable Furniture" Actually Means',
    category: 'Sustainability',
    date: '2026-07-15',
    readTime: '7 min read',
    excerpt:
      'Certification, repairability and transport — the three questions worth asking before you buy anything for your home.',
    image: P.journal4,
    alt: 'Detail of a solid timber staircase',
    body: [
      'Ask where the timber comes from and whether it is certified. FSC certification is a reasonable minimum standard, not a marketing badge.',
      'Ask whether it can be repaired. A chair with a replaceable seat pad and bolted joinery will outlive one that is glued and stapled.',
      'Ask how it travels. Sea freight and flat, efficient packaging cut the carbon cost of a piece dramatically compared with air freight.',
      'If a retailer cannot answer those three questions, that is your answer.',
    ],
  },
  {
    slug: 'building-a-calm-bedroom',
    title: 'Building a Calm Bedroom in Four Moves',
    category: 'Interiors',
    date: '2026-06-22',
    readTime: '4 min read',
    excerpt:
      'Bedding in one tone, bedside surfaces cleared, blackout layers and a place for everything else.',
    image: P.journal5,
    alt: 'Calm neutral bedroom with soft bedding and a wooden bedside table',
    body: [
      'Keep bedding in a single tone family. Contrast belongs in texture — a waffle weave against a smooth cotton — not in colour.',
      'Clear the bedside surfaces down to a lamp and one book. Everything else belongs in a drawer.',
      'Layer for darkness. A linen curtain alone will not hold back a summer morning; add a blackout lining.',
      'Give every object a home. Visible clutter is the single biggest thing that stops a bedroom feeling restful.',
    ],
  },
  {
    slug: 'dining-room-that-invites',
    title: 'The Dining Room That Invites People In',
    category: 'Styling',
    date: '2026-05-09',
    readTime: '5 min read',
    excerpt:
      'Seating comfort, table proportions and lighting height — the three details guests notice without knowing why.',
    image: P.journal6,
    alt: 'Kitchen island with wooden stools in a warm open-plan room',
    body: [
      'Guests remember how long they could sit, not how the table looked. Aim for 45 cm of seat height and a chair that lets you lean back without hitting the wall.',
      'Leave 60 cm of table surface per person. Below that, elbows start a war.',
      'Hang a pendant so the bottom of the shade sits around 75 cm above the table. It is the difference between a glow and a glare.',
      'Use a rug that extends at least 60 cm past the table edge, so chairs stay on it when pulled out.',
    ],
  },
]

export const getArticle = (slug) => JOURNAL.find((a) => a.slug === slug) || null

export const JOURNAL_CATEGORIES = [...new Set(JOURNAL.map((a) => a.category))]

/* ------------------------------------------------------------------ */
/* Social gallery                                                      */
/* ------------------------------------------------------------------ */

export const SOCIAL_GALLERY = [
  { image: P.gallery1, alt: 'Living room with timber ceiling beams and soft seating', handle: '@nordicliving' },
  { image: P.gallery2, alt: 'Modern house exterior in warm timber cladding', handle: '@nordicliving' },
  { image: P.gallery3, alt: 'Garden view of a modern home', handle: '@nordicliving' },
  { image: P.gallery4, alt: 'Pale sofas in a bright, high-windowed room', handle: '@nordicliving' },
  { image: P.gallery5, alt: 'Bedroom styled with indoor plants', handle: '@nordicliving' },
  { image: P.gallery6, alt: 'Sectional sofa on a patterned rug', handle: '@nordicliving' },
]

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQS = [
  {
    group: 'Shipping',
    items: [
      {
        q: 'How much is shipping?',
        a: 'Standard delivery is $29 and free on orders over $499. Oversized items such as sofas and bed frames are delivered by a two-person team and are always free.',
      },
      {
        q: 'How long will my order take?',
        a: 'In-stock items are dispatched within two working days. Small parcels arrive in 3–5 working days; furniture deliveries are scheduled within 2–3 weeks depending on your postcode.',
      },
      {
        q: 'Do you deliver outside the EU?',
        a: 'We currently deliver within the EU, the UK, Norway and Switzerland. Duties and local taxes for non-EU destinations are calculated at checkout.',
      },
    ],
  },
  {
    group: 'Returns',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'You have 30 days from delivery to return an item in its original condition. We collect large furniture free of charge.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are issued to the original payment method within 5 working days of the item arriving back with us.',
      },
      {
        q: 'Can I exchange a colour?',
        a: 'Yes. Exchanges are treated as a return plus a new order, so stock is reserved for you immediately.',
      },
    ],
  },
  {
    group: 'Materials',
    items: [
      {
        q: 'Where does your timber come from?',
        a: 'All solid timber is FSC-certified and sourced from European forests, predominantly oak and beech from Germany, Denmark and Poland.',
      },
      {
        q: 'Are your textiles natural?',
        a: 'Our upholstery linens are 72% linen or higher, blended only with recycled polyester for durability. We do not use virgin synthetic fills.',
      },
      {
        q: 'Do you use harmful finishes?',
        a: 'No. We use water-based lacquers and natural hard-wax oils, all low-VOC and free from added formaldehyde.',
      },
    ],
  },
  {
    group: 'Product care',
    items: [
      {
        q: 'How often should I oil solid oak?',
        a: 'Once a year is plenty for normal use. In a kitchen or a busy dining room, twice a year will keep the surface sealed.',
      },
      {
        q: 'Are the covers removable?',
        a: 'Yes — all sofa and armchair covers are removable and can be dry-cleaned or, for linen covers, washed cold on a delicate cycle.',
      },
      {
        q: 'What should I do about a water mark?',
        a: 'Leave it to dry naturally. Most marks lift on their own. If one remains, a light sand and re-oil will restore the surface.',
      },
    ],
  },
  {
    group: 'Ordering',
    items: [
      {
        q: 'Can I change my order after placing it?',
        a: 'Orders can be amended within two hours of placing them by contacting our team. After dispatch, an oversized delivery can usually be rescheduled.',
      },
      {
        q: 'Do you offer assembly?',
        a: 'Most pieces assemble in under 30 minutes with the supplied tool. A white-glove assembly service is available for beds and large sofas at checkout.',
      },
      {
        q: 'Do you have a trade programme?',
        a: 'Yes — architects, interior designers and hospitality projects get trade pricing and dedicated support. Contact us for the current terms.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Policies – clearly labelled sample text, pending business review     */
/* ------------------------------------------------------------------ */

export const POLICY_DRAFT_NOTICE =
  'Sample policy text for development. These terms have not been reviewed by the business or by legal counsel and must be replaced with approved policy wording before launch.'

export const SHIPPING_POLICY = [
  {
    heading: 'Delivery times',
    body: [
      'Small parcels are dispatched within two working days and typically arrive within 3–5 working days.',
      'Furniture deliveries are booked with a two-hour arrival window. Our carrier will contact you to arrange a date once your order reaches the local depot.',
    ],
  },
  {
    heading: 'Delivery costs',
    body: [
      'Standard delivery is $29. Orders over $499 ship free.',
      'Oversized items — sofas, bed frames and dining tables — are always delivered free of charge by a two-person team.',
    ],
  },
  {
    heading: 'Receiving your order',
    body: [
      'Please check the packaging on arrival and note any damage on the delivery paperwork before signing.',
      'If an item arrives damaged, contact us within 48 hours with photographs and we will arrange a replacement or repair.',
    ],
  },
]

export const RETURNS_POLICY = [
  {
    heading: '30-day returns',
    body: [
      'You may return any item within 30 days of delivery, provided it is unused and in its original packaging.',
      'Large furniture is collected free of charge. Small parcels can be returned with a prepaid label we email to you.',
    ],
  },
  {
    heading: 'Refunds',
    body: [
      'Refunds are issued to the original payment method within 5 working days of the returned item arriving at our warehouse.',
      'Original delivery charges are refunded only where the whole order is returned.',
    ],
  },
  {
    heading: 'Exclusions',
    body: [
      'Made-to-order and custom-upholstered pieces cannot be returned unless faulty.',
      'Items showing signs of use, or returned without their original packaging, may be subject to a restocking fee.',
    ],
  },
]

export const PRIVACY_SECTIONS = [
  {
    heading: 'What we collect',
    body: [
      'We collect the information you give us when you place an order, create an account, subscribe to the newsletter or contact us: your name, email address, delivery address and order history.',
      'We also collect limited technical data — pages viewed, device type and approximate location — to keep the store working and to understand which products people are looking for.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Your data is used to fulfil orders, provide customer support, prevent fraud and — only with your consent — to send marketing emails.',
      'We do not sell personal data, and we do not share it with third parties beyond the processors required to run the store.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You may request a copy of your data, ask us to correct it, or ask us to delete it. You can withdraw marketing consent at any time using the unsubscribe link in any email.',
      'Requests can be made through our contact page and are answered within 30 days.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'Essential cookies keep your bag and session working. Analytics cookies are optional and only set with your agreement.',
    ],
  },
]

export const TERMS_SECTIONS = [
  {
    heading: 'Using this store',
    body: [
      'By placing an order you confirm that you are able to enter into a binding contract and that the information you provide is accurate.',
      'Prices are shown in US dollars and include applicable taxes unless stated otherwise at checkout.',
    ],
  },
  {
    heading: 'Orders and acceptance',
    body: [
      'Your order is an offer to buy. A contract is formed when we confirm dispatch.',
      'If an item is unavailable or mispriced, we will contact you before charging and you may cancel without penalty.',
    ],
  },
  {
    heading: 'Product descriptions',
    body: [
      'Natural materials vary in grain, tone and texture. Slight variation between the photography and the delivered piece is expected and is not a defect.',
      'Dimensions are given in centimetres with a tolerance of ±2 cm.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'We are responsible for loss you suffer that is a foreseeable result of our breach of these terms. We are not liable for losses that were not foreseeable.',
      'Nothing in these terms limits your statutory rights as a consumer.',
    ],
  },
]
