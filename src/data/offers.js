/**
 * Special offers.
 *
 * Every offer is explicitly `status: 'sample'` until an operator configures
 * real terms, and the UI labels it that way — no offer is presented as a
 * verified promotion.
 */

export const OFFERS = [
  {
    slug: 'the-family-retreat',
    title: 'The Family Retreat',
    kicker: 'Offer A',
    status: 'sample',
    image: { src: '/images/welcome-interior.jpg', alt: 'Bright dining area with natural wood and forest views' },
    summary:
      'A private stay arranged around shared meals, generous accommodation and a slow woodland rhythm.',
    terms: [
      'Three nights or more in the Woodland Residence.',
      'Daily breakfast basket delivered to the door.',
      'One guided forest walk for the whole party.',
    ],
    note: 'Sample offer — terms are illustrative and must be configured before publishing.',
  },
  {
    slug: 'book-direct-stay-better',
    title: 'Book Direct, Stay Better',
    kicker: 'Offer B',
    status: 'sample',
    image: { src: '/images/offer-direct.jpg', alt: 'Styled kitchen and dining area in matte black cabinetry' },
    summary:
      'A configurable direct-booking benefit that rewards guests who reserve through the official website.',
    terms: [
      'Applies to bookings made on this website only.',
      'Benefit value is configured by the retreat, not calculated here.',
      'Not combinable with other promotions unless stated.',
    ],
    note: 'Sample offer — no discount amount is applied or displayed until it is configured.',
  },
  {
    slug: 'your-seasonal-escape',
    title: 'Your Seasonal Escape',
    kicker: 'Offer C',
    status: 'sample',
    image: { src: '/images/offer-seasonal.jpg', alt: 'Premium bedroom with natural fabrics and warm lighting' },
    summary:
      'A seasonal accommodation offer for the quieter weeks either side of the peak season.',
    terms: [
      'Available outside peak summer and the winter holidays.',
      'Minimum stay of two nights.',
      'Subject to availability in the selected room.',
    ],
    note: 'Sample offer — the seasonal window is not yet configured.',
  },
]

export const getOffer = (slug) => OFFERS.find((offer) => offer.slug === slug) || null
