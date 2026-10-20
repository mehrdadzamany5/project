/**
 * Policies.
 *
 * Every policy is `status: 'draft'` because none has been supplied by the
 * operator. Draft policies are rendered with a visible review notice and must
 * never be presented as binding terms.
 */

export const POLICIES = [
  {
    slug: 'booking-terms',
    title: 'Booking Terms',
    status: 'draft',
    updated: null,
    sections: [
      {
        heading: 'Rates and availability',
        body: 'Rates shown on this website are sample rates for demonstration. They are not a quotation and are not guaranteed until a reservation is confirmed in writing by the retreat.',
      },
      {
        heading: 'Reservation requests',
        body: 'Submitting the booking form creates a reservation request. A stay exists only once the retreat has confirmed it. No payment is taken on this website.',
      },
      {
        heading: 'Minimum stay',
        body: 'Minimum stay rules vary by room and season and are applied when dates are selected.',
      },
    ],
  },
  {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    status: 'draft',
    updated: null,
    sections: [
      {
        heading: 'Cancellation terms',
        body: 'The cancellation terms have not been supplied. This section must be completed before the site goes live, including notice periods, refund handling and any non-refundable periods.',
      },
      {
        heading: 'Changes to a stay',
        body: 'Date changes, shortening a stay and transferring a booking are handled by the retreat directly until a booking system is connected.',
      },
      {
        heading: 'Cancellation by the retreat',
        body: 'Not yet defined. This should cover force majeure, weather and maintenance closures, and the remedy offered to the guest.',
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    status: 'draft',
    updated: null,
    sections: [
      {
        heading: 'What we collect',
        body: 'The forms on this website collect the details you enter: name, email address, and — for booking requests — phone number, stay dates and any notes you add.',
      },
      {
        heading: 'Where it is stored',
        body: 'In this demonstration build, submissions are stored only in your own browser and are never transmitted anywhere. Once a backend is connected, this section must be replaced with the real storage location, retention period and legal basis.',
      },
      {
        heading: 'Your rights',
        body: 'Not yet defined. This section must set out how a guest can access, correct or delete their data and who to contact.',
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    status: 'draft',
    updated: null,
    sections: [
      {
        heading: 'Use of this website',
        body: 'This website is provided as a demonstration build. Content, photography and rates are illustrative and may change without notice.',
      },
      {
        heading: 'Liability',
        body: 'Not yet defined. This section must be reviewed by the operator and their legal adviser before publication.',
      },
      {
        heading: 'Governing law',
        body: 'Not yet defined. Specify the jurisdiction whose law governs these terms.',
      },
    ],
  },
]

export const getPolicy = (slug) => POLICIES.find((policy) => policy.slug === slug) || null
