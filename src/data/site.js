/**
 * Global site configuration.
 *
 * Anything a real operator would need to fill in is `null` by default and is
 * surfaced in the UI as "not configured" rather than being invented.
 */

export const SITE = {
  name: 'KEGALI',
  wordmark: 'KEGALI',
  tagline: 'Architectural forest retreats',
  description:
    'A private architectural retreat where forest, fire and contemporary design come together.',
  /** Shown in the footer copyright row. */
  legalName: 'KEGALI Retreats',
  /** Demo content is illustrative until real operational data is connected. */
  demoContent: true,
}

/**
 * Business contact details. Fill these in and they appear everywhere
 * automatically (header, contact page, footer, policies).
 * Nothing here is invented for you.
 */
export const CONTACT = {
  email: null,
  phone: null,
  addressLines: null,
  mapsUrl: null,
  responseTime: null,
}

/**
 * Social profiles. Add `{ label, href }` entries to render the icon row in the
 * header and footer. Empty by default because we never invent external URLs.
 */
export const SOCIAL_LINKS = []

/**
 * Language selector options. Only `enabled: true` entries can be selected;
 * the rest render as disabled "soon" options instead of pretending to work.
 */
export const LANGUAGES = [
  { code: 'en', label: 'English', enabled: true },
  { code: 'no', label: 'Norsk', enabled: false },
  { code: 'de', label: 'Deutsch', enabled: false },
]

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Offers', to: '/offers' },
  { label: 'Explore', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS = [
  { label: 'Our Rooms', to: '/rooms' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Special Offers', to: '/offers' },
  { label: 'Explore', to: '/journal' },
  { label: 'About Us', to: '/about' },
]

export const FOOTER_SECONDARY = [
  { label: 'Booking & FAQ', to: '/faq' },
  { label: 'Policies', to: '/policies' },
  { label: 'Contact', to: '/contact' },
]

/** Booking engine configuration. */
export const BOOKING = {
  currency: 'USD',
  currencySymbol: '$',
  /** Cleaning fee charged once per stay. */
  cleaningFee: 45,
  /** Percentage service fee (0 = not charged). */
  serviceFeeRate: 0,
  /**
   * Tax rate as a fraction (e.g. 0.08). `null` means "not configured", and the
   * booking summary says so instead of showing an invented figure.
   */
  taxRate: null,
  minNights: 1,
  maxNights: 21,
  maxGuestsPerBooking: 8,
  /** Days ahead that may be booked. */
  bookingWindowDays: 540,
  /**
   * Payment provider. `null` means no provider is configured, so the booking
   * flow never claims a payment succeeded.
   */
  paymentProvider: null,
  /** Minimum lead time before check-in. */
  minLeadDays: 1,
}
